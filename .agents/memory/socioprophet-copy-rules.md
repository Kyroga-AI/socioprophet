---
name: SocioProphet marketing copy rules
description: Compliance and messaging rules for all copy on the SocioProphet marketing site, sourced from the Product Marketing Master Doc.
---

Rules that must hold in all site copy (source: attached_assets/sp_master_final_*.md, validation table §"NEEDS VALIDATION"):

- Never name competitors: TrueFoundry, Palantir, Credo AI, Holistic AI, WitnessAI. Use categories instead ("AI gateways", "governance platforms").
- Never mention GAIA, SourceOS, NASDAQ, Capital One, or IFM.
- No pricing for SocioProphet anywhere. (Third-party "pricing documents" as customer data being governed is fine.)
- No performance/benchmark figures (MMLU etc.) until officially published — use "Publication pending".
- Regulatory phrasing: "provides structural support for", never "ensures/guarantees compliance". Regulations OK to name: SR 26-2, APRA CPS 230, EU AI Act, FCA, MAS — plus "you bring your regulatory interpretation".
- Adoption paths (public AI / single vendor / in-house agents) are always "incomplete", never "wrong" or "inadequate". SocioProphet is "the fourth path".
- Product naming: "Prophet Platform" (slug prophet-platform, formerly "profit"). Products: Noetica, Prophet Platform, SCOPE-D, Hellagraph; also-on-platform: SocioSphere, Lattice Forge.
- Team: Keith Haller bio may cite Databricks/Informatica only.
- Evidence Fabric is the headline moat — never flatten it into equal-weight feature bullets.
- Skip any doc content marked NEEDS VALIDATION (e.g. "production-ready" claims).

**Why:** These come from legal/positioning review in the master doc; violations were flagged in code review.
**How to apply:** Any time copy on artifacts/socioprophet is edited, sweep with grep for the banned terms before sign-off. Note: the slides deck (artifacts/socioprophet-deck) has NOT been updated to this messaging.
