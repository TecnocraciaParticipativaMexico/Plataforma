import { DEMO_RECORDS } from "./data"; import type { ElectionRecord } from "./types";
const KEY="tp-observacion-electoral-v1";
export function loadRecords(){ if(typeof window==="undefined") return DEMO_RECORDS; try { const raw=localStorage.getItem(KEY); if(!raw) return DEMO_RECORDS; const parsed=JSON.parse(raw) as {version:number;records:ElectionRecord[]}; return parsed.version===1&&Array.isArray(parsed.records)?parsed.records:DEMO_RECORDS; } catch { throw new Error("No fue posible leer los registros locales."); } }
export function saveRecords(records:ElectionRecord[]){ try { localStorage.setItem(KEY,JSON.stringify({version:1,records})); } catch { throw new Error("No fue posible guardar en este dispositivo."); } }
export function resetRecords(){ localStorage.removeItem(KEY); return DEMO_RECORDS; }
