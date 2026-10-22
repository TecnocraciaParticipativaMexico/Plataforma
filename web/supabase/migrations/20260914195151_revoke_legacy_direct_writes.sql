-- Defense-in-depth closure for inherited tables that have no client policies.
-- Legitimate canonical writes use guarded SECURITY DEFINER RPCs or service_role;
-- neither requires direct table-write privileges for browser roles.
revoke insert, update, delete, truncate
  on table public.civic_reputation
  from anon, authenticated;

revoke insert, update, delete, truncate
  on table public.committee_report_events
  from anon, authenticated;
