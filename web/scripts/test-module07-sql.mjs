// Local PostgreSQL/WASM tests only. No remote connection or credentials.
// Fixtures imitate the #112 helper signatures; they do NOT audit that release.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const { PGlite } = await import(pathToFileURL(resolve(process.argv[2])).href);
const db = new PGlite();
let checks = 0;
const pass = (value, expected) => {
  assert.deepEqual(value, expected);
  checks++;
};
const uid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const migration = await readFile(
  new URL(
    "../supabase/migrations/20261013213210_module07_closed_foundation.sql",
    import.meta.url,
  ),
  "utf8",
);
await assert.rejects(
  () => db.exec(migration),
  /MODULE07_REQUIRES_VERIFIED_SECURITY_RELEASE_112/,
);
checks++;
await db.exec(`create role anon; create role authenticated; create role service_role;
create schema auth; create schema private; create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
create function private.has_platform_role(text[]) returns boolean language sql stable as $$ select current_setting('test.auditor',true)='active' and auth.uid() is not null $$;
create function private.has_committee_membership(integer,text[] default array['member','reviewer','admin']) returns boolean language sql stable as $$ select current_setting('test.membership',true)='active' and auth.uid() is not null $$;
grant usage on schema auth,private,public to authenticated,anon,service_role;`);
await db.exec(migration);
const tables = (
  await db.query(
    "select relname,relrowsecurity,relforcerowsecurity from pg_class where relname like 'tai_%' and relkind='r' order by relname",
  )
).rows;
pass(tables.length, 9);
pass(
  tables.every((t) => t.relrowsecurity && t.relforcerowsecurity),
  true,
);
for (const role of ["anon", "authenticated", "service_role"]) {
  const grants = (
    await db.query(
      `select bool_or(has_table_privilege('${role}',oid,'SELECT,INSERT,UPDATE,DELETE')) allowed from pg_class where relname like 'tai_%' and relkind='r'`,
    )
  ).rows;
  pass(grants[0].allowed, false);
}
await db.exec(`insert into auth.users values ('${uid(1)}'),('${uid(2)}'),('${uid(3)}');
insert into public.tai_cases(id,owner_user_id,court) values('${uid(100)}','${uid(1)}','Constitucional');
insert into public.tai_versions(case_id,version,payload,content_hash,actor_user_id) values('${uid(100)}',1,'{}','${"a".repeat(64)}','${uid(1)}');`);
// Temporary SELECT grants exercise RLS without making production grants.
await db.exec(
  "begin; grant select on public.tai_cases,public.tai_versions,public.tai_assignments,public.tai_experts to authenticated;",
);
async function asUser(userId, query) {
  await db.exec(
    `set local role authenticated; set local request.jwt.claim.sub='${userId}';`,
  );
  try {
    return (await db.query(query)).rows;
  } finally {
    await db.exec("reset role");
  }
}
pass((await asUser(uid(1), "select id from public.tai_cases")).length, 1);
pass((await asUser(uid(2), "select id from public.tai_cases")).length, 0);
pass(
  (await asUser(uid(2), "select case_id from public.tai_versions")).length,
  0,
);
pass(
  (await asUser(uid(1), "select case_id from public.tai_versions")).length,
  1,
);
await db.exec("rollback");
// Assigned expert reads require module membership and a live assignment.
await db.exec(`insert into public.tai_experts(user_id,status,specialties,ethics_accepted_at,accredited_by,valid_until) values('${uid(2)}','accredited',array['Constitucional'],now(),'${uid(3)}',now()+interval '30 days');
insert into public.tai_conflicts values('${uid(100)}','${uid(2)}','clear',now(),'${uid(3)}');
insert into public.tai_panels values('${uid(100)}',1,'standard',9,66,false,false,now(),now()+interval '1 day');
insert into public.tai_assignments values('${uid(100)}',1,'${uid(2)}','member',1,now()+interval '30 days',null);`);
await db.exec(
  "begin; grant select on public.tai_cases,public.tai_versions,public.tai_assignments,public.tai_experts to authenticated;",
);
await db.exec("set local test.membership='active'");
pass((await asUser(uid(2), "select id from public.tai_cases")).length, 1);
await db.exec("set local test.membership='inactive'");
pass((await asUser(uid(2), "select id from public.tai_cases")).length, 0);
await db.exec(
  "set local test.membership='active'; update public.tai_assignments set revoked_at=now()",
);
pass((await asUser(uid(2), "select id from public.tai_cases")).length, 0);
await db.exec("rollback");
await db.exec(
  `insert into public.tai_technical_votes values('${uid(100)}',1,'${uid(2)}','consistent','concurrent','${"Razonamiento técnico de prueba. ".repeat(4)}','["https://example.org/precedente"]','${uid(300)}',now())`,
);
await assert.rejects(
  () =>
    db.exec(
      `insert into public.tai_technical_votes values('${uid(100)}',1,'${uid(2)}','consistent','dissent','${"Otro razonamiento de prueba. ".repeat(4)}','["https://example.org/precedente"]','${uid(301)}',now())`,
    ),
  (error) => error.code === "23505",
);
checks++;
await assert.rejects(
  () =>
    db.exec(
      `insert into public.tai_panels values('${uid(100)}',2,'standard',8,66,false,false,now(),now()+interval '1 day')`,
    ),
  (error) => error.code === "23514",
);
checks++;
await assert.rejects(
  () =>
    db.exec(
      `insert into public.tai_panels values('${uid(100)}',2,'reinforced',5,66,false,false,now(),now()+interval '1 day')`,
    ),
  (error) => error.code === "23514",
);
checks++;
await db.exec(
  `insert into public.tai_priorities(case_id,user_id,idempotency_key) values('${uid(100)}','${uid(2)}','${uid(200)}')`,
);
await assert.rejects(() =>
  db.exec(
    `insert into public.tai_priorities(case_id,user_id,idempotency_key) values('${uid(100)}','${uid(2)}','${uid(201)}')`,
  ),
);
checks++;
await assert.rejects(() =>
  db.exec(
    `insert into public.tai_versions(case_id,version,payload,content_hash,actor_user_id) values('${uid(100)}',1,'{}','${"a".repeat(64)}','${uid(1)}')`,
  ),
);
checks++;
await db.exec(
  `begin; set local role authenticated; set local request.jwt.claim.sub='${uid(1)}';`,
);
await assert.rejects(
  () => db.exec("update public.tai_cases set state_version=100"),
  /permission denied/,
);
checks++;
await db.exec("rollback");
await db.close();
console.log(
  `${checks} comprobaciones SQL locales pasan. Sin ejecución remota; sin prueba de concurrencia productiva ni auditoría del release #112.`,
);
