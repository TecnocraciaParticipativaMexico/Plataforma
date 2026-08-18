#!/usr/bin/env bash
set -euo pipefail

db_url="${1:-}"
if [[ "$db_url" != postgresql://postgres:postgres@127.0.0.1:54322/postgres ]]; then
  echo "Concurrency test accepts only the disposable local Supabase database." >&2
  exit 1
fi

user_id="41000000-0000-4000-8000-000000000001"
proposal_id="42000000-0000-4000-8000-000000000001"
attempt_id="43000000-0000-4000-8000-000000000001"

psql "$db_url" -v ON_ERROR_STOP=1 <<SQL
insert into auth.users(id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at)
values ('$user_id','authenticated','authenticated','concurrent@example.test','x',now(),now(),now());
insert into public.committee_proposals(id,owner_user_id,user_id,module_id,title,status)
values ('$proposal_id','$user_id','$user_id',1,'Concurrent vote test','active');
insert into public.committee_exam_attempts(
  id,user_id,module_id,bank_version,status,expires_at,score,approved,
  question_selection,option_order,attempt_number,submitted_at
) values (
  '$attempt_id','$user_id',1,'test','submitted',now()+interval '1 day',10,true,
  '[]','{}',1,now()
);
SQL

run_vote() {
  local choice="$1"
  local key="$2"
  psql "$db_url" -v ON_ERROR_STOP=1 >/dev/null 2>&1 <<SQL
begin;
set local role authenticated;
select set_config('request.jwt.claim.sub','$user_id',true);
select pg_sleep(1);
select public.cast_citizen_vote(
  '$proposal_id','$choice','$attempt_id','$key',null
);
commit;
SQL
}

set +e
run_vote for "44000000-0000-4000-8000-000000000001" &
first_pid=$!
run_vote against "44000000-0000-4000-8000-000000000002" &
second_pid=$!
wait "$first_pid"; first_status=$?
wait "$second_pid"; second_status=$?
set -e

if ! { [[ $first_status -eq 0 && $second_status -ne 0 ]] ||
       [[ $first_status -ne 0 && $second_status -eq 0 ]]; }; then
  echo "Expected exactly one successful concurrent operation." >&2
  exit 1
fi

persisted="$(psql "$db_url" -Atqc \
  "select count(*) from public.proposal_votes where user_id='$user_id' and proposal_id='$proposal_id'")"
if [[ "$persisted" != "1" ]]; then
  echo "Expected exactly one persisted vote; observed ${persisted}." >&2
  exit 1
fi

echo "Concurrent duplicate-vote protection passed: one success, one conflict, one persisted row."
