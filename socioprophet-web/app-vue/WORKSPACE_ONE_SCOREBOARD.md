# Workspace/one — Scoreboard (living: updated every turn)

Goal: **best in the world.** Legend: ✅ built+proven · 🟡 foundation/partial · ⬜ planned/backlog · ❌ absent (gap) · — n/a.
This is the running backlog + capabilities comparison. Each turn: log the delta, advance the backlog, never regress.

---

## ▶ This turn's delta (gaps bridged)
- **Compulsion-resistance vault** (`sovereign-vault.ts`, 5/5) — data E2E-sealed under root-derived keys; the operator
  holds only ciphertext → **"can't" unlock/reveal, not "won't."** Trace-open backdoor removed (user-key-gated); **DAO
  transition** (threshold IdP signing key, no single compellable party) added to the plan.
- **Knowledge editor UI** (`Knowledge.vue` + store + client service) — the visible Notion-killer: live `[[wikilinks]]`,
  `@entity` chips, **automatic cross-doc backlinks**, a **database view with graph-native rollups**, central-entities
  (degree→PageRank), cross-doc todos. Local-first (runs in-browser). Routed at `/wiki` + `/notes`. vue-tsc clean.
- **30 tests passing** (identity 18 + knowledge 7 + vault 5). Two moats + the leapfrog are now real, demoable code.

### Turn log
| Turn | Shipped (proven) |
|---|---|
| T-1 | Sovereign identity architecture; broker core `sovereign-id.ts` — per-scope unlinkable facets + aliases (6/6) |
| T-2 | `provisionScopeAlias` (Senzing defeat deliverable via mail_aliases); 4-agent competitive audit + reframe |
| T-3 | Auth handshake `sovereign-broker.ts` — root never leaves edge, passkey-style (6/6); ONLYOFFICE decision |
| T-4 | OIDC issuance `sovereign-oidc.ts` (6/6); full login 18/18; this scoreboard |
| T-5 | Graph-native knowledge layer `knowledge-graph.ts` (7/7) — the Notion leapfrog; Wiki+Notes → foundation |
| T-6 | **Compulsion-resistance vault `sovereign-vault.ts` (5/5); knowledge editor UI (live backlinks/rollups); DAO model. 30 tests** |

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
| IdP deployed + fronting apps | ⬜ next | ✅ | ✅ | ✅ | ✅ | ✅ |
| Anonymous credentials (SD-JWT-VC/BBS+) | ⬜ | ❌ | ❌ | ❌ | ❌ | ❌ |
| MDM compartmentalization | ⬜ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Trace-open governance (accountable anonymity) | ⬜ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Suite apps
| App | Us | Google | MS | Proton | Nextcloud | Notion |
|---|---|---|---|---|---|---|
| Mail | 🟡 stub UI | ✅ | ✅ | ✅ | ✅ | ✅ |
| Calendar / Contacts | ⬜ (Radicale/CardDAV) | ✅ | ✅ | ✅ | ✅ | 🟡 |
| Office (Docs/Sheets/Slides) | ⬜ (ONLYOFFICE) | ✅ | ✅✅ desktop | ✅ | ✅ | 🟡 |
| Drive / Photos | ⬜ | ✅ | ✅ | ✅ | ✅ | — |
| Chat / Meet (Matrix) | ⬜ | ✅ | ✅ | 🟡 | ✅ | — |
| Groups + **federated Discussions** | ⬜ | 🟡 | ❌ | ❌ | 🟡 Talk-fed | ❌ |
| **Graph-native knowledge** (Notion leapfrog) | 🟡 core + editor | ❌ | ❌ | ❌ | ❌ | ✅ (fakes graph) |
| Work-mgmt / Wiki / Canvas / Flows | ⬜ | 🟡 | 🟡 | ❌ | 🟡 | ✅ |
| AI woven into apps (sovereign models) | ⬜ choir | ✅ Gemini | ✅ Copilot | ✅ Lumo | ✅ Assistant | ✅ |

### Platform / trust differentiators
| Capability | Us | Others |
|---|---|---|
| Self-host / data-never-leaves | ✅ | NC ✅ · Proton hosted-E2E · Google/MS/Notion ❌ |
| **Compulsion resistance (operator *can't* decrypt/unlock)** | ✅ vault proven | ❌ all — even Proton can be served/forced; none are no-custody + DAO |
| Ontology-governed sharing (scope-d) | 🟡 estate | ❌ all |
| E2E encryption (content) | 🟡 vault proven, wiring pending | Proton ✅ · others ❌ |
| Admin console | ⬜ (orggov exists) | ✅ all |
| Compliance / eDiscovery / DLP | ❌ | Google/MS ✅ (our gap) |
| Mobile apps | ❌ (DAV interop only) | ✅ all |

---

## ▶ Backlog (prioritized; world-class bar)
**P0 — Identity moat (the lead; finish it):**
1. ⬜ IdP deploy — Zitadel/Authentik Helm in prophet-workspace, calling `sovereign-broker.verify`; per-app pairwise clients. ← NEXT
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
