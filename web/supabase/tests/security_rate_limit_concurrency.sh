#!/usr/bin/env bash
set -euo pipefail

db_url="${1:?local database URL required}"
case "$db_url" in postgresql://postgres:postgres@127.0.0.1:*) ;; *) echo 'Loopback database required.' >&2; exit 1;; esac

actor='47000000-0000-4000-8000-000000000007'
psql "$db_url" -v ON_ERROR_STOP=1 -q <<SQL
insert into auth.users(id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at)
values ('$actor','authenticated','authenticated','rate-concurrency@example.test','x',now(),now(),now()) on conflict(id) do nothing;
delete from private.rate_limit_buckets where actor_user_id='$actor' and action='evidence.upload';
SQL

results="$(mktemp -d)"
cleanup(){ rm -rf "$results"; }
trap cleanup EXIT
for index in $(seq 1 20); do
  (
    psql "$db_url" -Atq -v ON_ERROR_STOP=1 -c "set role authenticated; select set_config('request.jwt.claim.sub','$actor',false); select allowed from public.consume_rate_limit('evidence.upload');" \
      | tail -n 1 > "$results/$index"
  ) &
done
wait

allowed="$(grep -l '^t$' "$results"/* | wc -l | tr -d ' ')"
denied="$(grep -l '^f$' "$results"/* | wc -l | tr -d ' ')"
consumed="$(psql "$db_url" -Atq -c "select consumed from private.rate_limit_buckets where actor_user_id='$actor' and action='evidence.upload' order by window_started_at desc limit 1")"
[[ "$allowed" == 10 && "$denied" == 10 && "$consumed" == 20 ]] || {
  echo "Rate-limit concurrency failed; allowed=$allowed denied=$denied consumed=$consumed" >&2; exit 1;
}
echo 'RATE_LIMIT_CONCURRENCY=PASS allowed=10 denied=10 consumed=20'
