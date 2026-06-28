# Workspace/one — does it bridge the gaps, and what are we missing?

Short answer: **the apps are the easy part** (embed OSS). The gaps are the **cross-cutting platform plumbing** that
makes a dozen apps feel like *one* product. Get that right and Workspace/one reaches Google parity on the suite
*and* overshoots it on sovereignty, federation, AI-native, and governed sharing — things Google can't do.

## The suite (apps → existing backend; we embed/wire, not rebuild)
Mail (Postfix/Dovecot) · Calendar (Radicale) · Contacts (CardDAV) · **Photos** (object storage + thumbs/EXIF) ·
Drive (object storage) · Docs/Sheets/Slides (**Collabora** via the platform's WOPI) · Meet (Jitsi) · Chat (Matrix) ·
**Groups** (mailing-list mgr) · **Discussions** (Usenet/NNTP-style, federated) · Forms · **AI Studio** (the choir).

## What we're MISSING — the real gaps (ranked; these are the work)
1. **Unified identity / SSO — the #1 gap.** Google is "one account, everything." Today mail uses Postgres users,
   DAV uses htpasswd, the web app uses Firebase — three identity stores. We need **one IdP** (Keycloak / Authentik /
   Zitadel) that fronts the web apps *and* IMAP/SMTP/CalDAV/CardDAV/NNTP (LDAP/OIDC backends). Nothing else feels
   unified until this exists. **Build this first.**
2. **Mail-API bridge** — IMAP/JMAP↔REST so the Vue mail talks to Dovecot (the gate on leaving Google).
3. **Storage service** — Drive + Photos need a real object store + a metadata DB (sharing, versions, thumbnails,
   EXIF, albums). One service powers both.
4. **Unified search** — across mail/files/people/messages. **We have `sherlock-search` in the estate** — wire it.
5. **Notifications + presence (real-time)** — WebSocket/SSE fabric for Chat/Meet/Calendar-invites/new-mail. Missing.
6. **Sharing & permissions model** — who-can-see-what across Drive/Docs/Calendar/Groups. Google's is basic ACLs;
   **ours can be ontology-governed via scope-d** — a differentiator, not just parity.
7. **Admin console** — provision users/groups/policies. **The platform already has the orggov control plane** — surface it.
8. **Mobile/interop** — IMAP/CalDAV/CardDAV already work with native phone clients (a sovereign win); the CRDT edge
   sync gives offline.

## Groups + Usenet — the part that beats Google
- **Groups** = mailing lists + shared/collaborative inboxes (mlmmj/Sympa) with the group as a graph entity (members,
   policy, history). Google Groups parity.
- **Discussions (Usenet-style)** = threaded, store-and-forward, **federated** discussion. Architecturally this is
   our **S0 CRDT sync engine** (`sync-engine.ts` / `sync-transport.ts`) + a thread data model, optionally with an
   **NNTP gateway** for interop. Result: offline-capable, sovereign, federated discussion across edges + the
   managed service — **Google has no equivalent.** This is where the sync work I built pays off as a product feature.

## Does it bridge the gaps? (vs the competitive analysis)
- **vs Google Workspace:** at parity on the suite once 1–8 land; **ahead** on sovereignty (self-hosted, data never
   leaves), **federation** (CRDT/usenet), **AI-native** (the choir woven into every app, not a bolt-on Gemini),
   **governed sharing** (scope-d/ontology vs flat ACLs). Plus flat-cost vs per-seat (the cost analysis).
- **vs Palantir/enterprise:** Workspace/one is the *productivity* surface; combined with the platform
   (banking/case/governance) it's the integrated sovereign-enterprise story. Groups/Discussions + the graph =
   organizational knowledge that compounds — closer to "ontology of how the org actually communicates."

## Build sequence (dependency-ordered)
1. **Identity/SSO (IdP)** — fronts everything. Nothing is "one product" without it.
2. **Mail bridge** + Gmail-grade mail (unblocks Google cutover).
3. **AI Studio** (choir) — the differentiator, no new backend.
4. **Storage service** → Drive + Photos.
5. **Collabora embed** → Docs/Sheets/Slides (via existing WOPI).
6. **Calendar/Contacts** (Radicale/CardDAV thin UIs).
7. **Groups** (list manager) → **Discussions** (CRDT/NNTP — reuses the sync engine).
8. **Unified search** (sherlock) + **notifications** + **sharing** (scope-d) + **admin** (orggov) — the glue that
   makes it feel like Google.

## Estate assets that make this faster than it looks
graph (entities for people/groups/files) · scope-d (governed sharing) · sherlock-search (unified search) · the choir
(AI in every app) · the S0 CRDT sync (federation/offline + Discussions) · orggov control plane (admin) · the
existing Postfix/Dovecot/Radicale/WOPI in prophet-platform. The differentiators aren't apps — they're these.
