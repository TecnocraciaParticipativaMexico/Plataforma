# Dependency risk register

Audit date: 2026-08-18. Command: npm 11.6.0 `audit --json`, without forced repair.

## Result

The inherited baseline reported 10 vulnerabilities: 9 high, 1 low, 0 critical. A scoped compatible update moved direct runtime `next` and dev `eslint-config-next` from 16.1.6 to 16.3.1. The intermediate audit reported 6 vulnerabilities: 5 high and 1 low. Updating only the compatible transitive versions in the lockfile then produced 0 vulnerabilities: 0 critical, high, moderate or low.

| Package | Direct | Scope and exploitability here | Advisory class | Compatible remediation | Status |
|---|---:|---|---|---|---|
| `next` 16.1.6 | yes | Production framework; request-processing issues are runtime-relevant. | Multiple high advisories reported by npm. | 16.3.1, non-major; build/regression validation required. | Remediated |
| `brace-expansion` | no | ESLint/TypeScript dev toolchain; untrusted glob patterns are not accepted by production routes. DoS affects build/lint inputs. | Unbounded/exponential expansion DoS. | Patched 1.1.18 and 5.0.9 within parent ranges. | Remediated |
| `flatted` | no | ESLint dev toolchain; application runtime does not parse attacker-controlled flatted payloads. | Recursion DoS and prototype pollution. | Patched compatible transitive release. | Remediated |
| `js-yaml` | no | ESLint configuration dev path; production APIs do not parse user YAML. | Quadratic CPU DoS in merge/omap handling. | 4.3.1 within the parent range. | Remediated |
| `picomatch` | no | ESLint/TypeScript dev globbing; production does not expose glob compilation. | ReDoS/method injection. | 4.0.4 within the parent range. | Remediated |
| `ws` | no | Runtime transitive of Supabase Realtime and optional OpenAI transport. Exploitable only where an attacker can control fragmented WebSocket traffic, so it is production-relevant. | Memory disclosure/exhaustion DoS. | 8.21.0 within `^8` ranges. | Remediated |
| `@babel/core` | no | ESLint dev path; arbitrary source maps are not accepted from platform users. | Low local arbitrary file read through `sourceMappingURL`. | Compatible patched transitive release. | Remediated |

No advisory was marked resolved by suppression or ignore. No `npm audit fix --force`, major dependency sweep or paid service was used. The lockfile remains authoritative and CI installs it with `npm ci`; a fresh real audit is retained as a non-mutating CI check because registry advisories can change after this record.
