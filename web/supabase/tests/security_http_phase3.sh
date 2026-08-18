#!/usr/bin/env bash
set -euo pipefail

api_url="${API_URL:?local API_URL required}"
anon_key="${ANON_KEY:?local ANON_KEY required}"
service_key="${SERVICE_ROLE_KEY:?local SERVICE_ROLE_KEY required}"
db_url="${DB_URL:?local DB_URL required}"
app_url="http://127.0.0.1:3000"
results_dir="$(mktemp -d)"
app_log="${results_dir}/app.log"

case "$api_url|$db_url" in
  http://127.0.0.1:*\|postgresql://postgres:postgres@127.0.0.1:*) ;;
  *) echo "HTTP tests accept only disposable loopback Supabase services." >&2; exit 1 ;;
esac

cleanup() {
  local status=$?
  if [[ -n "${app_pid:-}" ]]; then kill "$app_pid" 2>/dev/null || true; fi
  if [[ "$status" -ne 0 ]]; then
    echo 'Sanitized local application log follows:' >&2
    tail -n 80 "$app_log" >&2 || true
  fi
  return "$status"
}
trap cleanup EXIT

signup() {
  local email="$1"
  curl --silent --show-error --fail-with-body \
    -H "apikey: $anon_key" -H 'Content-Type: application/json' \
    -d "{\"email\":\"${email}\",\"password\":\"Local-Test-Password-2030!\"}" \
    "$api_url/auth/v1/signup"
}

user_a="$(signup phase3-a@example.test)"
user_b="$(signup phase3-b@example.test)"
user_admin="$(signup phase3-admin@example.test)"
token_a="$(jq -r .access_token <<<"$user_a")"; id_a="$(jq -r .user.id <<<"$user_a")"
token_b="$(jq -r .access_token <<<"$user_b")"; id_b="$(jq -r .user.id <<<"$user_b")"
token_admin="$(jq -r .access_token <<<"$user_admin")"; id_admin="$(jq -r .user.id <<<"$user_admin")"
test -n "$token_a"; test "$token_a" != null

export NEXT_PUBLIC_SUPABASE_URL="$api_url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="$anon_key"
export SUPABASE_SERVICE_ROLE_KEY="$service_key"
npm run dev >"$app_log" 2>&1 & app_pid=$!
for _ in {1..60}; do
  if curl -fsS "$app_url" >/dev/null 2>&1; then break; fi
  sleep 1
done
curl -fsS "$app_url" >/dev/null

response_body=""
request() {
  local method="$1" path="$2" token="$3" body="${4:-}"
  local output="${results_dir}/response.json"
  local args=(--silent --show-error --output "$output" --write-out '%{http_code}' -X "$method")
  [[ -n "$token" ]] && args+=(-H "Authorization: Bearer $token")
  [[ -n "$body" ]] && args+=(-H 'Content-Type: application/json' --data "$body")
  local status
  status="$(curl "${args[@]}" "$app_url$path")"
  response_body="$(cat "$output")"
  printf '%s' "$status"
}

assert_status() {
  local expected="$1" actual="$2" label="$3"
  if [[ "$actual" != "$expected" ]]; then
    echo "not ok - $label (expected $expected, got $actual; response suppressed)" >&2
    exit 1
  fi
  echo "ok - $label"
}

new_uuid() { cat /proc/sys/kernel/random/uuid; }

assert_status 401 "$(request POST /api/process/create '' '{"process_type":"test"}')" '1 route without token'
assert_status 401 "$(request POST /api/process/create invalid-token '{"process_type":"test"}')" '2 invalid token'
assert_status 400 "$(request POST /api/process/create "$token_a" "{\"process_type\":\"test\",\"user_id\":\"$id_b\"}")" '3 client user_id rejected'
assert_status 400 "$(request POST /api/process/create "$token_a" '{"process_type":"test","actor_hash":"forged"}')" '4 client actor_hash rejected'

key_a="$(new_uuid)"; assert_status 201 "$(request POST /api/process/create "$token_a" "{\"process_type\":\"report\",\"title\":\"A\",\"idempotency_key\":\"$key_a\"}")" 'process A created'
process_a="$(jq -r .process_id "${results_dir}/response.json")"
key_b="$(new_uuid)"; assert_status 201 "$(request POST /api/process/create "$token_b" "{\"process_type\":\"report\",\"title\":\"B\",\"idempotency_key\":\"$key_b\"}")" 'process B created'
process_b="$(jq -r .process_id "${results_dir}/response.json")"
assert_status 404 "$(request GET "/api/process/$process_b/events" "$token_a")" '5 user A cannot read process B'
assert_status 404 "$(request POST "/api/process/$process_b/event" "$token_a" "{\"note\":\"foreign note\",\"idempotency_key\":\"$(new_uuid)\"}")" '6 user A cannot add note to process B'
assert_status 403 "$(request POST "/api/process/$process_a/event" "$token_a" "{\"event_type\":\"StatusChanged\",\"payload\":{\"note\":\"forged\"}}")" '7 direct StatusChanged rejected'

proposal_1="$(new_uuid)"; proposal_2="$(new_uuid)"; proposal_3="$(new_uuid)"; proposal_other="$(new_uuid)"
attempt_1="$(new_uuid)"; attempt_2="$(new_uuid)"; attempt_b="$(new_uuid)"
report_other="$(new_uuid)"
psql "$db_url" -v ON_ERROR_STOP=1 -v a="$id_a" -v b="$id_b" -v admin="$id_admin" \
  -v p1="$proposal_1" -v p2="$proposal_2" -v p3="$proposal_3" -v po="$proposal_other" \
  -v at1="$attempt_1" -v at2="$attempt_2" -v atb="$attempt_b" -v ro="$report_other" <<'SQL'
insert into public.committee_proposals(id,owner_user_id,user_id,module_id,title,status) values
 (:'p1',:'a',:'a',1,'HTTP vote','active'),(:'p2',:'a',:'a',1,'HTTP concurrent','active'),
 (:'p3',:'a',:'a',1,'HTTP report','active'),(:'po',:'b',:'b',2,'Other module','active');
insert into public.committee_exam_attempts(id,user_id,module_id,bank_version,status,expires_at,score,approved,question_selection,option_order,attempt_number,submitted_at) values
 (:'at1',:'a',1,'test','submitted',now()+interval '1 day',10,true,'[]','{}',1,now()),
 (:'at2',:'a',1,'test','submitted',now()+interval '1 day',9,true,'[]','{}',2,now()),
 (:'atb',:'b',1,'test','submitted',now()+interval '1 day',10,true,'[]','{}',1,now());
insert into public.committee_memberships(user_id,module_id,membership_role,status,created_by) values
 (:'a',1,'reviewer','active',:'admin'),(:'b',1,'member','active',:'admin'),(:'admin',1,'admin','active',:'a');
insert into public.committee_reports(id,proposal_id,module_id,created_by,status) values (:'ro',:'po',2,:'admin','under_review');
SQL

assert_status 400 "$(request POST /api/comites/votos "$token_a" "{\"proposal_id\":\"$proposal_1\",\"choice\":\"for\",\"attempt_id\":\"$attempt_1\",\"score\":10}")" '8 fabricated score rejected'
vote_key="$(new_uuid)"; assert_status 201 "$(request POST /api/comites/votos "$token_a" "{\"proposal_id\":\"$proposal_1\",\"choice\":\"for\",\"attempt_id\":\"$attempt_1\",\"idempotency_key\":\"$vote_key\"}")" '9 valid citizen vote'
assert_status 409 "$(request POST /api/comites/votos "$token_a" "{\"proposal_id\":\"$proposal_1\",\"choice\":\"against\",\"attempt_id\":\"$attempt_1\",\"idempotency_key\":\"$(new_uuid)\"}")" '10 duplicate vote rejected'

concurrent_vote() { request POST /api/comites/votos "$token_a" "{\"proposal_id\":\"$proposal_2\",\"choice\":\"$1\",\"attempt_id\":\"$attempt_2\",\"idempotency_key\":\"$(new_uuid)\"}" >"$2"; }
concurrent_vote for "${results_dir}/vote1.status" & pid1=$!
concurrent_vote against "${results_dir}/vote2.status" & pid2=$!
wait "$pid1"; wait "$pid2"
statuses="$(sort "${results_dir}/vote1.status" "${results_dir}/vote2.status" | tr '\n' ' ')"
[[ "$statuses" == "201 409 " ]] || { echo 'not ok - concurrent HTTP vote statuses' >&2; exit 1; }
count="$(psql "$db_url" -Atqc "select count(*) from public.proposal_votes where proposal_id='$proposal_2'")"
[[ "$count" == 1 ]] || { echo 'not ok - concurrent HTTP vote persistence' >&2; exit 1; }
echo 'ok - 11 simultaneous votes persist one row'

assert_status 403 "$(request POST /api/comites/votos "$token_a" "{\"proposal_id\":\"$proposal_2\",\"choice\":\"for\",\"attempt_id\":\"$attempt_b\",\"idempotency_key\":\"$(new_uuid)\"}")" '12 foreign qualification attempt rejected'
assert_status 403 "$(request POST /api/comites/dictamenes/votos "$token_b" "{\"report_id\":\"$report_other\",\"choice\":\"approve\",\"reasoning\":\"Sufficient technical reasoning for the test\",\"idempotency_key\":\"$(new_uuid)\"}")" '13 member cannot vote in another committee'

assert_status 201 "$(request POST /api/comites/dictamenes "$token_a" "{\"proposal_id\":\"$proposal_3\"}")" 'committee report created by reviewer'
report_1="$(jq -r .report_id "${results_dir}/response.json")"
assert_status 201 "$(request POST /api/comites/dictamenes/observaciones "$token_a" "{\"report_id\":\"$report_1\",\"content\":\"A sufficiently detailed committee observation\",\"idempotency_key\":\"$(new_uuid)\"}")" 'committee observation accepted'
psql "$db_url" -v ON_ERROR_STOP=1 -v a="$id_a" -v admin="$id_admin" -v p="$proposal_3" <<'SQL'
insert into public.committee_member_conflicts(user_id,module_id,proposal_id,status,reason_code,recorded_by)
values (:'a',1,:'p','active','HTTP_TEST',:'admin');
SQL
assert_status 403 "$(request POST /api/comites/dictamenes/votos "$token_a" "{\"report_id\":\"$report_1\",\"choice\":\"approve\",\"reasoning\":\"Sufficient technical reasoning for the test\",\"idempotency_key\":\"$(new_uuid)\"}")" '14 conflicted member cannot vote'
assert_status 503 "$(request POST /comites/dictamenes/cerrar "$token_admin" "{\"report_id\":\"$report_1\",\"expected_version\":1}")" '15 closure without active quorum policy rejected'
assert_status 403 "$(request POST /comites/dictamenes/cerrar "$token_a" "{\"report_id\":\"$report_1\",\"expected_version\":1}")" '16 insufficient closure role rejected'
assert_status 400 "$(request POST /api/reputacion "$token_a" '{"points":100}')" '17 client reputation rejected'

evidence_id="$(new_uuid)"; object_name="$evidence_id"
psql "$db_url" -v ON_ERROR_STOP=1 -v e="$evidence_id" -v a="$id_a" -v p="$process_a" <<'SQL'
insert into public.evidence_pointers(id,owner_user_id,process_id,storage_path,sha256,size_bytes,mime_type,review_status)
values (:'e',:'a',:'p',:'e',repeat('a',64),4,'image/png','accepted');
SQL
curl --silent --show-error --fail -X POST -H "Authorization: Bearer $service_key" -H "apikey: $service_key" \
  -H 'Content-Type: image/png' --data-binary 'test' "$api_url/storage/v1/object/evidence/$object_name" >/dev/null
public_status="$(curl --silent --output /dev/null --write-out '%{http_code}' "$api_url/storage/v1/object/public/evidence/$object_name")"
[[ "$public_status" != 200 ]] || { echo 'not ok - evidence public URL' >&2; exit 1; }
echo 'ok - 18 evidence has no public URL'
assert_status 200 "$(request GET "/api/process/$process_a/evidence/$evidence_id/download" "$token_a")" '19 own evidence signed URL allowed'
assert_status 404 "$(request GET "/api/process/$process_a/evidence/$evidence_id/download" "$token_b")" '20 foreign evidence signed URL rejected'
assert_status 410 "$(request POST /comites/solicitudes '' '{}')" '21 legacy committee application route remains gone'
assert_status 403 "$(request GET /api/mapa/reportes "$token_a")" '22 unsafe map remains closed'

echo 'HTTP_PHASE3_TESTS=22 PASS'
