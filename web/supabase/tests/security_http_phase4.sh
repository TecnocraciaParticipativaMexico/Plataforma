#!/usr/bin/env bash
set -euo pipefail

api_url="${API_URL:?local API URL required}"; anon_key="${ANON_KEY:?local anon key required}"
db_url="${DB_URL:?local DB URL required}"; app_url='http://127.0.0.1:3000'
case "$api_url|$db_url" in http://127.0.0.1:*\|postgresql://postgres:postgres@127.0.0.1:*) ;; *) echo 'Loopback services required.' >&2; exit 1;; esac
work="$(mktemp -d)"; app_log="$work/app.log"
cleanup(){
  local status=$?
  [[ -n "${app_pid:-}" ]] && kill "$app_pid" 2>/dev/null || true
  if [[ "$status" -ne 0 ]]; then tail -n 80 "$app_log" >&2 || true; fi
  rm -rf "$work"
  return "$status"
}
trap cleanup EXIT

signup(){ curl -fsS -H "apikey: $anon_key" -H 'Content-Type: application/json' -d "{\"email\":\"$1\",\"password\":\"Local-Phase4-Password!\"}" "$api_url/auth/v1/signup"; }
a="$(signup phase4-a@example.test)"; b="$(signup phase4-b@example.test)"; reviewer="$(signup phase4-reviewer@example.test)"; outsider="$(signup phase4-outsider@example.test)"
token_a="$(jq -r .access_token<<<"$a")"; id_a="$(jq -r .user.id<<<"$a")"; token_b="$(jq -r .access_token<<<"$b")"; id_b="$(jq -r .user.id<<<"$b")"
token_reviewer="$(jq -r .access_token<<<"$reviewer")"; id_reviewer="$(jq -r .user.id<<<"$reviewer")"; token_outsider="$(jq -r .access_token<<<"$outsider")"; id_outsider="$(jq -r .user.id<<<"$outsider")"

export NEXT_PUBLIC_SUPABASE_URL="$api_url" NEXT_PUBLIC_SUPABASE_ANON_KEY="$anon_key" SUPABASE_SERVICE_ROLE_KEY="${SERVICE_ROLE_KEY:?local service key required}"
npm run dev >"$app_log" 2>&1 & app_pid=$!
for _ in {1..60}; do curl -fsS "$app_url" >/dev/null 2>&1 && break; sleep 1; done
curl -fsS "$app_url" >/dev/null

request(){ local method="$1" path="$2" token="$3" body="${4:-}" output="$work/response.json"; local args=(-sS -o "$output" -w '%{http_code}' -X "$method"); [[ -n "$token" ]]&&args+=(-H "Authorization: Bearer $token"); [[ -n "$body" ]]&&args+=(-H 'Content-Type: application/json' --data "$body"); curl "${args[@]}" "$app_url$path"; }
expect(){ [[ "$2" == "$1" ]]||{ echo "not ok - $3 expected=$1 got=$2" >&2; exit 1; }; echo "ok - $3"; }
uuid(){ cat /proc/sys/kernel/random/uuid; }

headers="$(curl -sSI "$app_url")"
grep -qi '^content-security-policy:'<<<"$headers"; grep -qi "frame-ancestors 'none'"<<<"$headers"; grep -qi '^x-content-type-options: nosniff'<<<"$headers"; grep -qi '^referrer-policy:'<<<"$headers"
echo 'ok - 1 security headers present'

expect 201 "$(request POST /api/process/create "$token_a" "{\"process_type\":\"evidence\",\"idempotency_key\":\"$(uuid)\"}")" '2 process for evidence created'
process_a="$(jq -r .process_id "$work/response.json")"
expect 201 "$(request POST /api/process/create "$token_b" "{\"process_type\":\"foreign\",\"idempotency_key\":\"$(uuid)\"}")" 'foreign process created'
process_b="$(jq -r .process_id "$work/response.json")"

printf '\x89PNG\r\n\x1a\nlocal-safe-test' > "$work/valid.png"
printf 'not-a-png' > "$work/invalid.png"
cp "$work/valid.png" "$work/lied.jpg"
upload(){ curl -sS -o "$work/response.json" -w '%{http_code}' -H "Authorization: Bearer $1" -F "file=@$2" "$app_url/api/process/$3/evidence/upload"; }
expect 202 "$(upload "$token_a" "$work/valid.png" "$process_a")" '3 allowed evidence enters quarantine'
evidence_id="$(jq -r .evidence_id "$work/response.json")"
expect 400 "$(upload "$token_a" "$work/lied.jpg" "$process_a")" '4 lying MIME/extension rejected'
expect 400 "$(upload "$token_a" "$work/invalid.png" "$process_a")" '5 invalid magic bytes rejected'
dd if=/dev/zero of="$work/large.pdf" bs=1M count=11 status=none
expect 400 "$(upload "$token_a" "$work/large.pdf" "$process_a")" '6 oversized evidence rejected'
expect 404 "$(upload "$token_a" "$work/valid.png" "$process_b")" '7 foreign process upload rejected'
expect 404 "$(request GET "/api/process/$process_a/evidence/$evidence_id/download" "$token_a")" '8 quarantined evidence cannot be signed'
expected_hash="$(sha256sum "$work/valid.png"|cut -d' ' -f1)"; stored_hash="$(psql "$db_url" -Atq -c "select sha256 from public.evidence_pointers where id='$evidence_id'")"
[[ "$expected_hash" == "$stored_hash" ]]||{ echo 'not ok - server-side hash' >&2; exit 1; }; echo 'ok - 9 server-side hash persisted'
psql "$db_url" -q -c "update public.evidence_pointers set review_status='accepted' where id='$evidence_id'"
expect 404 "$(request GET "/api/process/$process_a/evidence/$evidence_id/download" "$token_b")" '10 foreign accepted evidence cannot be signed'
expect 200 "$(request GET "/api/process/$process_a/evidence/$evidence_id/download" "$token_a")" '11 owner receives attachment signed URL'
grep -q 'download=' "$work/response.json"

expect 200 "$(request GET "/api/process/$process_a/verify" "$token_a")" '12 valid chain verified'
[[ "$(jq -r .result "$work/response.json")" == valid ]]||exit 1
expect 404 "$(request GET "/api/process/$process_a/verify" "$token_b")" '13 foreign chain verification rejected'
psql "$db_url" -q -c "update public.process_events set payload='{\"tampered\":true}' where process_id='$process_a' and event_sequence=1"
expect 200 "$(request GET "/api/process/$process_a/verify" "$token_a")" '14 altered chain request completes'
[[ "$(jq -r .result "$work/response.json")" == broken ]]||exit 1

application="$(uuid)"
psql "$db_url" -q -v app="$application" -v applicant="$id_b" -v reviewer="$id_reviewer" -v outsider="$id_outsider" <<'SQL'
insert into public.committee_memberships(user_id,module_id,membership_role,status,created_by) values
 (:'reviewer',1,'reviewer','active',:'outsider'),(:'outsider',2,'reviewer','active',:'reviewer');
insert into public.committee_applications(id,user_id,owner_user_id,module_id,module_name,level,participation_type,expertise_area,experience_summary,motivation,conflict_interest,ethics_accepted,is_public_figure,review_status)
values(:'app',:'applicant',:'applicant',1,'Module','national','technical','security','Experience details','Motivation details','None',true,false,'Revisión ética');
SQL
review_body="{\"id\":\"$application\",\"action\":\"qualify\",\"expected_version\":1,\"idempotency_key\":\"$(uuid)\"}"
expect 403 "$(request PATCH /api/comites/solicitudes "$token_a" "$review_body")" '15 citizen without reviewer role rejected'
expect 403 "$(request PATCH /api/comites/solicitudes "$token_b" "$review_body")" '16 self-review rejected'
expect 403 "$(request PATCH /api/comites/solicitudes "$token_outsider" "$review_body")" '17 other-module reviewer rejected'
expect 200 "$(request PATCH /api/comites/solicitudes "$token_reviewer" "$review_body")" '18 same-module reviewer accepted'

rate_user="$(signup phase4-rate@example.test)"; rate_token="$(jq -r .access_token<<<"$rate_user")"
for index in $(seq 1 10); do expect 201 "$(request POST /api/process/create "$rate_token" "{\"process_type\":\"rate\",\"idempotency_key\":\"$(uuid)\"}")" "rate request $index"; done
status="$(request POST /api/process/create "$rate_token" "{\"process_type\":\"rate\",\"idempotency_key\":\"$(uuid)\"}")"; expect 429 "$status" '19 distributed limit returns 429'
grep -qi '^retry-after:' < <(curl -sSI -X POST -H "Authorization: Bearer $rate_token" -H 'Content-Type: application/json' --data "{\"process_type\":\"rate\",\"idempotency_key\":\"$(uuid)\"}" "$app_url/api/process/create")

echo 'HTTP_PHASE4_TESTS=19 PASS'
