# Workspace/one — competitive audit (2026 H1): Google, Microsoft, Apple, Notion, Proton, Nextcloud, Zoho, Atlassian, Slack, Coda/ClickUp

Four parallel audits, one consistent verdict. This is the honest version — no pitch.

## The maturity reality (say it first)
We are **~5% built**: one stubbed Mail UI (Vue shell on fake data — the IMAP/JMAP bridge is NOT built), two
deployable backends (Postfix/Dovecot + Radicale), and an identity *architecture* (now with a proven crypto core).
Every other app is a `planned` registry tile. The #1 self-named blocker — the identity runtime — is just starting.
Every "win" below is a **positioning** win, not a shipped one. We are comparing a v0.1 against the most mature
software on earth.

## The thesis that broke under audit
WORKSPACE_ONE_GAP_ANALYSIS.md said *"the apps are the easy part — embed OSS."* **Half-wrong, and the wrong half is
strategic.** It holds for mail/calendar/office-files/chat (Dovecot/Radicale/Collabora/Matrix are real). It **fails**
for the categories that actually differentiate modern workspaces — and there is no clean OSS to "just embed" at parity:
- **Connected docs/database/wiki (Notion/Coda/Confluence):** Collabora gives us *Word/Excel clones*, the OLD model.
  Notion's whole thesis — docs, wikis, tasks, databases as one linked, queryable substrate — we do **not** have.
- **Work-management (Jira/ClickUp/Trello):** no tile, no plan, no data model. Embedding Plane/Focalboard = inheriting
  a second product, not wiring a UI.
- **Team-chat depth (Slack):** Matrix gives rooms/threads/presence/federation — NOT canvas, huddle-AI-notes, or a
  no-code workflow builder.

## Where each competitor stands (compressed)
- **Google / Microsoft:** we lose on everything *shipped* (real-time co-edit, Copilot/Gemini agents, Agent 365
  governance, Purview compliance, mobile, SLA). Win only on sovereignty/cost/AI-ownership/identity — and only as a
  pitch until we ship. Don't ever claim collaboration-depth or desktop-Excel parity; it dies on first power-user contact.
- **Apple:** we win decisively on sovereignty/federation/openness; lose decisively on cross-device polish and
  *shipped, free, on-device* AI (Apple Intelligence is on a billion devices; our choir is `planned`). No Notes/Freeform analog.
- **Notion:** the most important gap. Collabora ≠ Notion. **The knowledge GRAPH is the one asset that could leapfrog
  it** — a block editor where every doc/db/entity is a graph node (relations = edges, rollups = queries),
  ontology-governed, AI-native, CRDT-synced = "Notion, but the database is a real knowledge graph, self-hosted." But
  it's **net-new product**, not an embed. This is our best offensive move.
- **Proton / Nextcloud (our CLOSEST peers — the verdict that matters):** they have *already won* "sovereign private
  office suite." Proton = polished hosted **E2E** (Mail/Calendar/Drive/Docs/Sheets/Meet + Lumo AI + SimpleLogin
  aliasing). Nextcloud = mature **shipped self-host** (Files/Talk-with-federation/Office/Groupware + Assistant AI +
  LDAP/SAML/OIDC + 400 apps). **Sovereignty is NOT our differentiator against them — it's table stakes.**
- **Zoho / Atlassian / Slack / Coda/ClickUp:** Zoho already ships the integrated, cross-app-AI, BYOK-to-Claude,
  no-train suite we *specced*. Atlassian owns work-mgmt+wiki+Rovo agents. Slack owns chat depth + Agentforce.

## What actually survives scrutiny — our REAL moats (only two)
Of six claimed edges, four collapse against Proton/Nextcloud (sovereignty = table stakes; federation ≈ matched by
NC Talk; AI = both ship local AI now; cost = real but minor). **Two survive:**
1. **Anonymous-first, UNLINKABLE-by-construction identity.** Proton aliases *email*; nobody pseudonymizes the *whole
   identity graph* by construction, consumes any external ID, and defeats Senzing/MDM correlation. This is **inverse
   to the entire industry** (everyone else is built *for* correlation: Entra, Okta, NC's LDAP/SAML, Proton accounts).
   It is the one thing we are *ahead* on — and the core is now built + proven (`sovereign-id.ts`).
2. **Ontology-governed sharing + the SocioProphet platform** (banking/case/governance/graph) as the substrate. Real,
   uncopied — but it's the *sovereign-enterprise* story, not the *replace-my-Gmail* story.

## The strategic call (the reframe)
**Stop competing as a from-scratch suite. We will not out-suite Nextcloud + Proton + Zoho — they shipped; we specced.**
Reposition as the **sovereign identity + AI-governance + graph-native knowledge layer** — optionally *fronting* a
commodity suite (Nextcloud Hub / Mailcow+Collabora already = most of our planned backend) rather than rebuilding it.
Spend the scarce build budget on the two moats, not on re-deriving Dovecot.

## Improvements (ranked, actionable)
1. **Build the sovereign broker → IdP and make the "Senzing sees N people, not one" demo the wedge.** It's the only
   build where we are *ahead*, and neither Proton nor Nextcloud can show it. (Core done this session; next = IdP + relay.)
2. **Decide build-vs-front the suite.** Seriously evaluate fronting Nextcloud Hub (it already has the apps + SAML/OIDC
   to point at our broker) vs hand-rolling. If we keep building, the **mail-API bridge is the critical path** (and
   Mailcow/Mailu prove it's off-the-shelf — build or adopt now).
3. **Make the knowledge layer graph-native — the Notion leapfrog.** A block editor backed by HellGraph (+ sherlock +
   choir), not a Collabora clone. This is the one place we could be *better*, not behind. Add Wiki + Notes as graph-native.
4. **Add the missing app categories** to the registry: **Projects** (work-mgmt), **Wiki** (graph-native knowledge),
   **Whiteboard** (Excalidraw/tldraw — genuinely embeddable), **Automation/Flows** (choir-agent steps), **Notes**.
5. **Settle the encryption posture honestly.** We are at-rest, not E2E. Either commit to client-side E2E for
   Drive/Docs (table stakes vs Proton) or explicitly stop implying "more private than Proton" and compete on
   identity + AI-governance + graph instead. Don't market E2E we don't have.
6. **Wire the choir INTO apps (Mail/Drive/Docs) as governed agents**, not a separate "AI Studio" tile — or drop the
   "AI-native" claim, because Nextcloud Assistant + Zoho Zia already make it.

## One-line bottom line
The suite race is lost; the **identity + graph-native-knowledge + governance** race is wide open and ours to take —
because it's the one race built the way nobody else's architecture can follow.
