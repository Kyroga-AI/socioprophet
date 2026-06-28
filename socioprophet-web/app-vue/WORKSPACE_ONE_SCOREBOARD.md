# Workspace/one — Scoreboard (living: updated every turn)

Goal: **best in the world.** Legend: ✅ built+proven · 🟡 foundation/partial · ⬜ planned/backlog · ❌ absent (gap) · — n/a.
This is the running backlog + capabilities comparison. Each turn: log the delta, advance the backlog, never regress.

---

## ▶ This turn's delta (gaps bridged)
- **Mail bridge runs over HTTP** (`mail-bridge-server.ts`) matching the Vue `mailApi` contract — webmail works with zero client changes.
- **3-agent reassessment (robustness / UX / deploy) + hardened the top findings:**
  - 🔒 broker **enrollment now self-signed** (`verifyCredential`) + no silent overwrite → closes the impersonation hole
  - 🔒 OIDC verify pins **alg=EdDSA**, rejects future `iat`, enforces optional `nonce`
  - 🔒 `loadOrCreateRoot` only creates on **ENOENT + `wx`** → no more silent root-loss on a transient error
  - 🔒 HTTP **body caps + request timeouts** (both servers); mail **scoped CORS + OPTIONS**; broker **fail-closed** on missing signing key in prod
  - ✅ mail thread-id collision fixed (group by subject+sender); `mergeGraphs` prefers real nodes over stubs + dedupes edges
  - 🎨 choir error path no longer shows green "grounded"; Code iframe fallback banner; Market empty state
  - 📝 honest config: broker isn't an OIDC auth-code IdP yet → Gitea SSO marked TODO (local auth); broker replicas→1 (in-memory store)
- All green: **54/54 lib tests, TS 0, lint 0, vue-tsc 0, helm lint clean.** See "Reassessment" below for what's fixed vs tracked.

### (prev) T-14 delta
- Mail bridge core (`mail-bridge.ts`, 5/5) — IMAP↔REST, Hey model + Screener + IMAP-mutating actions.

### Turn log
| Turn | Shipped (proven) |
|---|---|
| T-1 | Sovereign identity architecture; broker core `sovereign-id.ts` — per-scope unlinkable facets + aliases (6/6) |
| T-2 | `provisionScopeAlias` (Senzing defeat deliverable via mail_aliases); 4-agent competitive audit + reframe |
| T-3 | Auth handshake `sovereign-broker.ts` — root never leaves edge, passkey-style (6/6); ONLYOFFICE decision |
| T-4 | OIDC issuance `sovereign-oidc.ts` (6/6); full login 18/18; this scoreboard |
| T-5 | Graph-native knowledge layer `knowledge-graph.ts` (7/7) — the Notion leapfrog; Wiki+Notes → foundation |
| T-6 | Compulsion-resistance vault `sovereign-vault.ts` (5/5); knowledge editor UI (live backlinks/rollups); DAO model. 30 tests |
| T-7 | Sealed HellGraph write-path `knowledge-persist.ts` (4/4) — durable + GDS-on-ciphertext + content sealed under root. 34 tests |
| T-8 | GDS live in editor: PageRank "central ideas" + pathBetween "what connects A↔B" (9/9); stub-node fix; sealed persist wired. 36 tests |
| T-9 | Broker HTTP service `sovereign-broker-service.ts` (5/5) — enroll→challenge→verify→token, public-only storage; Helm chart (lint clean). 41 tests |
| T-10 | Gitea Code app (OIDC'd, Helm); cross-vendor cloud broker services layer (12/12) + Cloud panel; deployment cloud-agnostic (one chart, any cloud) |
| T-11 | Broker container entrypoint (`sovereign-broker-server` + Dockerfile, 2/2 live-HTTP) — IdP boots & serves OIDC end-to-end. Identity suite 25 |
| T-12 | Linux-first marketplace core (`marketplace.ts`, 7/7) — Flatpak-native, sandbox-permission governance, Flathub federation + sovereign OSTree; Market panel + dev-program doc |
| T-13 | Choir AI woven in — graph-grounded + governed (`choir-grounding.ts`, 4/4): cites real nodes, scope-d gating, structural anti-hallucination; in-editor AI panel |
| T-14 | Mail bridge core (`mail-bridge.ts`, 5/5) — IMAP↔REST, Hey model (Imbox/Feed/Paper Trail) + Screener + actions mutating IMAP; gate on leaving Google |
| T-15 | **Mail bridge runs (HTTP); 3-agent reassessment + hardening (impersonation/DoS/root-loss/OIDC/CORS fixes); 54/54** |

## ▶ Reassessment (T-15) — fixed vs tracked
**Fixed this turn (security/correctness/UX):** broker impersonation (self-signed enroll), OIDC alg/iat/nonce, root-loss on transient error, HTTP body caps + timeouts, mail CORS+OPTIONS, broker fail-closed key, mail thread collisions, mergeGraphs stub/dedupe, choir error signal, Code iframe fallback, Market empty state.

**Tracked (not yet done) — before any real deploy:**
- **P0 deploy:** build/push the `workspace-broker` + a `workspace-mail-bridge` image (Dockerfiles/CI); Postgres-backed broker store (so >1 replica + durable enrollments); broker signing-key Secret created in-chart; TLS non-optional for the IdP; PVC backups.
- **P0 SSO:** broker OIDC authorization-code endpoints + Gitea OAuth2 auth source (real sovereign SSO into Gitea/Matrix).
- **P0 data plane:** real Dovecot `ImapStore` adapter + persisted Screener allow-list (replace the demo store).
- **P1 UX:** Knowledge editor render-in-place + autosave + block delete/reorder; Mail compose/reply wiring + keyboard (scroll-into-view, chords, `?` help); one shared Workspace shell; a11y pass (focus rings, aria, keyboard-activable chips).
- **P1:** wire `VITE_*` at web build time; knowledge-persist transactional write; marketplace signature verification + argv-not-shell install.

---

## ▶ Capabilities vs the world
### Identity & trust — OUR MOAT (we lead; nobody else is built this way)
| Capability | Us | Google | MS | Proton | Nextcloud | Notion |
|---|---|---|---|---|---|---|
| Sovereign root, user-held key | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Per-scope **unlinkable** pseudonyms | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Per-scope alias (defeat entity-resolution) | ✅ | ❌ | ❌ | 🟡 email-only | ❌ | ❌ |
| Root-never-leaves-edge auth (passkey-derived) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Standard OIDC issuance (RP-consumable) | ✅ | ✅ | ✅ | 🟡 | ✅ | ✅ |
| IdP deployed + fronting apps | 🟡 service+Helm+container boot, cluster pending | ✅ | ✅ | ✅ | ✅ | ✅ |
| Anonymous credentials (SD-JWT-VC/BBS+) | ⬜ | ❌ | ❌ | ❌ | ❌ | ❌ |
| MDM compartmentalization | ⬜ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Trace-open governance (accountable anonymity) | ⬜ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Suite apps
| App | Us | Google | MS | Proton | Nextcloud | Notion |
|---|---|---|---|---|---|---|
| Mail | 🟡 stub UI + bridge core (5/5) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Calendar / Contacts | ⬜ (Radicale/CardDAV) | ✅ | ✅ | ✅ | ✅ | 🟡 |
| Office (Docs/Sheets/Slides) | ⬜ (ONLYOFFICE) | ✅ | ✅✅ desktop | ✅ | ✅ | 🟡 |
| Drive / Photos | ⬜ | ✅ | ✅ | ✅ | ✅ | — |
| Chat / Meet (Matrix) | ⬜ | ✅ | ✅ | 🟡 | ✅ | — |
| Groups + **federated Discussions** | ⬜ | 🟡 | ❌ | ❌ | 🟡 Talk-fed | ❌ |
| **Graph-native knowledge** (Notion leapfrog) | 🟡 core + editor | ❌ | ❌ | ❌ | ❌ | ✅ (fakes graph) |
| Work-mgmt / Wiki / Canvas / Flows | ⬜ | 🟡 | 🟡 | ❌ | 🟡 | ✅ |
| AI woven into apps (sovereign models) | 🟡 choir grounded+governed | ✅ Gemini | ✅ Copilot | ✅ Lumo | ✅ Assistant | ✅ |
| **AI grounded in a real graph + anti-hallucination + governed** | ✅ unique | ❌ vector RAG | ❌ | ❌ | ❌ | ❌ |
| **Code / Git + dev workspace** | 🟡 Gitea OIDC'd (Helm) | 🟡 (Cloud Source) | ✅ GitHub | ❌ | ❌ | ❌ |
| **Cloud console (cross-vendor)** | 🟡 broker panel | ✅ (own cloud) | ✅ (own) | ❌ | ❌ | ❌ |

### Platform / trust differentiators
| Capability | Us | Others |
|---|---|---|
| Self-host / data-never-leaves | ✅ | NC ✅ · Proton hosted-E2E · Google/MS/Notion ❌ |
| **Cloud-vendor agnostic / cross-vendor broker** | ✅ one chart any cloud + service broker | ❌ — they ARE the vendor (lock-in by design) |
| **Linux-first marketplace + dev program** | ✅ Flatpak-native, permission-governed (core) | app stores tied to their OS/cloud; none govern Flatpak perms by policy |
| **Compulsion resistance (operator *can't* decrypt/unlock)** | ✅ vault proven | ❌ all — even Proton can be served/forced; none are no-custody + DAO |
| Ontology-governed sharing (scope-d) | 🟡 estate | ❌ all |
| E2E encryption (content) | 🟡 vault proven, wiring pending | Proton ✅ · others ❌ |
| Admin console | ⬜ (orggov exists) | ✅ all |
| Compliance / eDiscovery / DLP | ❌ | Google/MS ✅ (our gap) |
| Mobile apps | ❌ (DAV interop only) | ✅ all |

---

## ▶ Backlog (prioritized; world-class bar)
**P0 — Identity moat (the lead; finish it):**
1. 🟡 IdP deploy — broker service + Helm + **container entrypoint (boots, serves OIDC) DONE**; remaining: build/push the
   `workspace-broker` image (Dockerfile.broker) + apply to a cluster + front Gitea/Matrix/mail/DAV on it.
2. ⬜ External-IdP relay (consume Google/corp/passkey → bind to root, strip correlation) + wire `scopeAlias`→`mail_aliases` live.
3. ⬜ Anonymous credentials (SD-JWT-VC) + `AnonymousReputationReceipt` runtime.
4. ⬜ MDM work-facet compartmentalization.
4a. ✅ Compulsion-resistance vault (`sovereign-vault.ts`) — E2E seal under root keys.
4b. ⬜ **Wire the vault into app data** (mail/drive/docs/knowledge sealed under root keys) — make "we can't read it" true end-to-end.
4c. ⬜ **User-gated trace-open** (threshold guardians; operator/DAO hold none) + social/threshold recovery.
4d. ⬜ **DAO transition** — threshold (k-of-n) IdP signing key across independent operators; no single compellable party.

**P0 — Mail to real (the cutover gate):**
5. ⬜ `workspace-mailapi` IMAP/JMAP↔REST bridge; wire Vue Mail off stub; choir summary/draft actions.

**P1 — The offensive leapfrog + suite breadth:**
6. ⬜ Graph-native knowledge layer (block editor on HellGraph; docs/db/entities = nodes; choir-native; CRDT-synced).
7. ⬜ ONLYOFFICE (WOPI) + LibreOffice-headless conv · Matrix deploy · object-store Drive/Photos · Radicale Calendar/Contacts UIs.

**P2 — Glue + new categories:**
8. ⬜ Unified search (wire sherlock) · Admin console (surface orggov) · Notifications (Matrix push).
9. ⬜ Work-mgmt (Projects) · Wiki · Canvas (Excalidraw/tldraw) · Flows (choir agents).
10. ⬜ E2E encryption posture decision (vs Proton) · governed sharing UI (scope-d).

**P3 — Reach:**
11. ⬜ Mobile (native DAV/IMAP first) · Linux-first developer program + app marketplace · compliance/DLP.
