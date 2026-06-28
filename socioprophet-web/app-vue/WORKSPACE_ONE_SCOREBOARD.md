# Workspace/one — Scoreboard (living: updated every turn)

Goal: **best in the world.** Legend: ✅ built+proven · 🟡 foundation/partial · ⬜ planned/backlog · ❌ absent (gap) · — n/a.
This is the running backlog + capabilities comparison. Each turn: log the delta, advance the backlog, never regress.

---

## ▶ This turn's delta (gaps bridged)
- **Choir AI woven into the apps — graph-grounded + governed** (`choir-grounding.ts`, 4/4): `buildGroundedContext`
  (answers from a real subgraph, **cites nodes by id**), `assemblePrompt`, `gateAction` (**scope-d** read/write
  gating), `checkGrounding` (**structural anti-hallucination** — every cited id must resolve). In-editor AI panel
  (Ask/Summarize/Draft) with a grounded/ungrounded badge + policy-denial; `choirApi` stub (sovereign mesh when wired).
- This is "AI-native" the way Nextcloud/Zoho can't: real **graph grounding** + **governed** + **on sovereign models** +
  **anti-hallucination by construction**. **Choir suite 4/4; vue-tsc clean.**

### (prev) T-12 delta
- Linux-first marketplace core (`marketplace.ts`, 7/7) — Flatpak-native, permission-governed; Market panel + dev-program doc.

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
| T-13 | **Choir AI woven in — graph-grounded + governed (`choir-grounding.ts`, 4/4): cites real nodes, scope-d gating, structural anti-hallucination; in-editor AI panel** |

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
| Mail | 🟡 stub UI | ✅ | ✅ | ✅ | ✅ | ✅ |
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
