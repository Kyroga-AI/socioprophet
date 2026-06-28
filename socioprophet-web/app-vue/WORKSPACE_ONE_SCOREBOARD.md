# Workspace/one — Scoreboard (living: updated every turn)

Goal: **best in the world.** Legend: ✅ built+proven · 🟡 foundation/partial · ⬜ planned/backlog · ❌ absent (gap) · — n/a.
This is the running backlog + capabilities comparison. Each turn: log the delta, advance the backlog, never regress.

---

## ▶ This turn's delta (gaps bridged)
- **OIDC issuance layer** (`sovereign-oidc.ts`) — verify → signed EdDSA ID token (pairwise `sub` + per-scope alias) + JWKS. 6/6 proven. → standard RPs (Matrix/ONLYOFFICE/mail/web) can consume our sovereign login with zero custom code.
- **Full sovereign login proven end-to-end** (edge sign → IdP verify → standard token → RP verify): identity suite now **18/18**.
- Decisions locked: **ONLYOFFICE** (not Collabora) for office; **Nextcloud rejected** (bloat) — build our own lean layer on primitives.

### Turn log
| Turn | Shipped (proven) |
|---|---|
| T-1 | Sovereign identity architecture; broker core `sovereign-id.ts` — per-scope unlinkable facets + aliases (6/6) |
| T-2 | `provisionScopeAlias` (Senzing defeat deliverable via mail_aliases); 4-agent competitive audit + reframe |
| T-3 | Auth handshake `sovereign-broker.ts` — root never leaves edge, passkey-style (6/6); ONLYOFFICE decision |
| T-4 | **OIDC issuance `sovereign-oidc.ts` (6/6); full login 18/18; this scoreboard** |

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
| **Graph-native knowledge** (Notion leapfrog) | ⬜ offensive | ❌ | ❌ | ❌ | ❌ | ✅ |
| Work-mgmt / Wiki / Canvas / Flows | ⬜ | 🟡 | 🟡 | ❌ | 🟡 | ✅ |
| AI woven into apps (sovereign models) | ⬜ choir | ✅ Gemini | ✅ Copilot | ✅ Lumo | ✅ Assistant | ✅ |

### Platform / trust differentiators
| Capability | Us | Others |
|---|---|---|
| Self-host / data-never-leaves | ✅ | NC ✅ · Proton hosted-E2E · Google/MS/Notion ❌ |
| Ontology-governed sharing (scope-d) | 🟡 estate | ❌ all |
| E2E encryption (content) | ❌ at-rest only | Proton ✅ (our gap) |
| Admin console | ⬜ (orggov exists) | ✅ all |
| Compliance / eDiscovery / DLP | ❌ | Google/MS ✅ (our gap) |
| Mobile apps | ❌ (DAV interop only) | ✅ all |

---

## ▶ Backlog (prioritized; world-class bar)
**P0 — Identity moat (the lead; finish it):**
1. ⬜ IdP deploy — Zitadel/Authentik Helm in prophet-workspace, calling `sovereign-broker.verify`; per-app pairwise clients. ← NEXT
2. ⬜ External-IdP relay (consume Google/corp/passkey → bind to root, strip correlation) + wire `scopeAlias`→`mail_aliases` live.
3. ⬜ Anonymous credentials (SD-JWT-VC) + `AnonymousReputationReceipt` runtime.
4. ⬜ MDM work-facet compartmentalization + `TraceOpenRequest` governance via scope-d.

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
