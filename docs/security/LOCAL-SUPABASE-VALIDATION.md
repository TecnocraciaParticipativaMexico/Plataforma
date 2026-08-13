# Reproducing local Supabase validation

These instructions operate only on a disposable local stack. Do not run `supabase link`, `db push`, `migration repair`, remote `secrets`, or any command with `--linked`.

## GitHub Actions (recommended for this repository)

Susan does **not** need Docker, WSL, Ubuntu or virtualization on her computer. `.github/workflows/security-supabase-validation.yml` runs the complete disposable validation on GitHub's temporary `ubuntu-latest` runner for relevant pull-request changes or through `workflow_dispatch`.

The workflow has only `contents: read`, consumes no repository secrets, pins Supabase CLI 2.111.0, and uses only the local Supabase addresses and credentials generated/expected inside the runner. It never invokes `supabase link`, `db push` or a remote project operation.

During the run it:

1. creates a temporary directory outside the checkout;
2. copies local configuration, real migrations and tests;
3. copies `historical_baseline.sql` into that temporary directory under the earlier test-only timestamp `20260729000000`;
4. starts local Supabase and resets it from zero;
5. executes 31 authorization and 14 catalog pgTAP assertions;
6. opens two concurrent `psql` sessions and requires one persisted vote plus one rejected duplicate;
7. runs Node security tests, TypeScript, build, focused lint, diff checks and a non-mutating dependency audit; and
8. stops the stack without a backup. The runner and its local credentials are then destroyed by GitHub.

The fixture never enters `migrations/` in Git, and the workflow verifies this invariant. GitHub job summaries contain counts and versions only—no database, `.env`, generated keys or raw service logs are uploaded as artifacts.

## Prerequisites

- Docker Desktop or Podman running locally.
- Node.js and the official Supabase CLI 2.111.0 or a reviewed newer version.
- PowerShell 7+ for the isolated-baseline procedure below.

The repository config contains only loopback URLs and local ports. It has no project ref, database password, API key or production URL.

## Why an isolated copy is required

The earliest production migration depends on historical `committee_applications` DDL that is absent from `migrations/`. The fixture must precede that migration for local validation, but it must never become a production migration. The procedure therefore builds a temporary Supabase project and renames only the copied fixture there.

From the repository root:

```powershell
$validationRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("tp-supabase-" + [guid]::NewGuid())
$validationSupabase = Join-Path $validationRoot 'supabase'
New-Item -ItemType Directory -Path $validationSupabase | Out-Null
Copy-Item web/supabase/config.toml $validationSupabase/config.toml
Copy-Item web/supabase/migrations $validationSupabase/migrations -Recurse
Copy-Item web/supabase/tests $validationSupabase/tests -Recurse
Copy-Item web/supabase/tests/fixtures/historical_baseline.sql `
  $validationSupabase/migrations/20260729000000_local_historical_baseline.sql
```

Inspect the resolved temporary path before continuing. Then run the official CLI against that copy:

```powershell
npx supabase --workdir $validationRoot start
npx supabase --workdir $validationRoot db reset --local --no-seed
npx supabase --workdir $validationRoot test db `
  supabase/tests/security_authorization.sql `
  supabase/tests/security_catalog_audit.sql --local
```

The expected plans are 31 authorization assertions and 14 catalog assertions, 45 total. A plan line alone is not success: every assertion must report `ok`, with no SQL error before `finish()`.

For reproducibility, stop and delete the disposable stack, remove the inspected temporary directory, recreate it from scratch and repeat:

```powershell
npx supabase --workdir $validationRoot stop --no-backup
```

Use PowerShell `Remove-Item` only after verifying that `$validationRoot` resolves under the system temporary directory and contains the `tp-supabase-` prefix.

## Required catalog evidence

`security_catalog_audit.sql` fails when a sensitive table is absent or lacks RLS, anon has writes, authenticated has prohibited direct writes, Storage is public/overwriteable, a definer has PUBLIC execution, private schema helpers are directly addressable, a critical RPC has an excessive/missing grant, or historical tables are reopened by a policy.

Review the catalog manually as well for unexpected pre-existing policies or overloads. A passing fixture proves compatibility only with the narrow fixture, never with an uninspected remote schema.

## Web validation

From `web/`, using the committed lockfile:

```sh
npm ci
npm test
npm run lint
npm run typecheck
npm run build
```

Report global lint separately from lint on modified TypeScript/JavaScript files. A build failure caused only by blocked Google Fonts network access is distinct from a TypeScript or bundling failure and must not be hidden.

## Current execution record

- Official Supabase CLI 2.111.0: available through the bundled Node/pnpm runtime.
- `supabase start`: blocked before database creation because neither Docker nor Podman is installed/on `PATH`.
- `supabase db reset --local --no-seed`: failed before migrations with `LegacyDbBootstrapError` because the local service does not exist.
- `supabase test db ... --local`: failed to connect to loopback PostgreSQL port 54322. Thus pgTAP and catalog queries were not executed.
- `npm test`: 25/25 Node tests passed. These are static/application contracts, not SQL execution.
- `npm run typecheck`: passed after adding exact `react-leaflet` 5.0.0.
- `npm run build`: passed with ephemeral, explicitly fake loopback Supabase placeholders; no `.env` file was written and no connection was made.
- Global `npm run lint`: 59 existing findings (42 errors, 17 warnings). Lint on the modified JavaScript test passed.
- `npm audit`: 9 findings in the full dependency tree (1 low, 8 high); no automatic or forced update was applied in this focused phase.
- No remote connection, schema download or remote mutation was attempted.

The GitHub Actions run record is the authoritative execution evidence once the workflow completes. A passing fixture-based run proves reproducibility against the narrow repository fixture, not compatibility with an unknown production baseline.
