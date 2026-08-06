# Reproducing local Supabase validation

These instructions operate only on a disposable local stack. Do not run `supabase link`, `db push`, `migration repair`, remote `secrets`, or any command with `--linked`.

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

## Current execution record (2026-08-05)

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
