# SocioProphet  
## Product Positioning and Marketing Document  
**Version 1.0 | 25 June 2026 | CONFIDENTIAL**  
*Prepared by KYROGA AI (Claude, Chief of Staff)*  
*Sources: Michael Heller (Founder/CEO/CTO) | Gus Quiroga (President/CRO)*  
*For internal use and Michael Heller review before any external application*

---

> **Validation gate:** This document is a product marketing synthesis. All technical claims require Michael Heller sign-off before external use. All financial figures flagged [UNVERIFIED] must not appear in investor materials without explicit Michael confirmation.

---

## PART ONE: THE MARKET PROBLEM

### 1.1 The Binary Trap

Every regulated enterprise in financial services, healthcare, and legal is caught between two choices, and neither is acceptable.

**Choice one: use a public AI.** Adopt Claude, ChatGPT, or Gemini. Get frontier capability immediately. But your data leaves. Your clients' confidential strategies, your proprietary research, your 30 years of institutional knowledge — all of it flows to a third-party server that you do not control, cannot audit, and cannot prove clean to a regulator. When McKinsey signs an enterprise deal with Anthropic, every strategy their consultants develop using Claude enters Anthropic's infrastructure. McKinsey's clients should be asking what that means for their confidential mandates. They mostly aren't, yet.

**Choice two: build your own.** Keep everything in-house. Build and train your own models. Total sovereignty, total control. But you need a team of machine learning engineers you don't have, a budget of $300,000 just to run a training cycle, and 18 to 24 months before you have something production-ready. And the moment you finish, the frontier has moved. You are permanently behind.

These are not theoretical positions. They are the actual choices facing every CIO, CRO, and CDO in every bank, hospital, and law firm right now. The regulatory pressure — SR 26-2 (US), APRA CPS 230 (Australia), EU AI Act (August 2026 enforcement), FCA AI Framework (UK) — is arriving simultaneously, and none of it has a clean answer within either of these two choices.

**No product in market resolves both sides of this trap simultaneously.**

That is what SocioProphet is built to do.

---

### 1.2 The Governance Gap

There is a second problem that compounds the first.

Even organisations that have taken the private-build path, or that have ringfenced their frontier AI use, cannot answer the question that every regulator is now asking: **Prove what your AI did, whether it was authorised, and how confident it was.**

Logs are not provenance. A log tells you that a model was called. It does not tell you whether the output was retrieved from a document, inferred from a pattern, deduced from a chain of reasoning, or generated without any grounding at all. A dashboard is not replay. An aggregated risk signal does not let you reconstruct, step by step, why a particular AI-assisted decision was made and what the model's uncertainty was at each point.

The governance products that exist today — Credo AI, Holistic AI, Modulos — govern on paper. They produce risk registers and model cards. They answer the question "what is our AI risk policy?" rather than "prove what your AI actually did." Palantir collapses uncertainty into a traffic light and calls it governance. Hyperscaler in-tenant deployments (AWS Bedrock, Azure AI Foundry) provide some data residency but no evidence fabric, no provenance chain, no frontier currency service.

The gap no competitor occupies is the intersection of three things that have never been delivered together:

1. **Sovereignty** — data and models stay inside the organisation's own environment, always
2. **Governance by architecture** — every decision is signed, evidenced, and replayable; uncertainty is carried with provenance to the decision surface, not collapsed into a green light
3. **Managed frontier currency** — the organisation never falls behind; SocioProphet continuously hardens and deploys new capability on a controlled cadence

This is the position SocioProphet owns.

---

## PART TWO: THE PRODUCT

### 2.1 What SocioProphet Is

SocioProphet installs a governed AI control plane inside an organisation's own environment — on their hardware, in their private cloud (AWS, Azure, GCP, IBM), or on their on-premise server. It runs a curated set of AI models, builds a structured knowledge graph of the organisation's domain, and produces a cryptographically signed, replayable evidence record of every decision the system makes.

The organisation gets frontier-grade AI capability without their data ever leaving, and with every AI action provable to any auditor or regulator.

There are three named product components and one infrastructure layer.

---

### 2.2 Noetica — The Governed AI Workspace

Noetica is the entry product. It is a local-first, on-device AI workspace — governed multi-model interface that runs on the user's own hardware. Its defining characteristic: **data does not leave the user's environment.**

The one-line frame: *"ChatGPT you can hand to a regulator."*

**What ships with Noetica:**

A **model choir** — not one model, but a curated ensemble of open-source LLMs selected and optimised for the deployment tier. The choir runs in parallel; the neurosymbolic harness arbitrates between them and tracks which reasoning mode produced each piece of output.

**Pre-configured external LLM integrations** — Claude (Anthropic), GPT (OpenAI), Gemini (Google), Meta (Llama), Mistral, and Perplexity are all integrated out of the box. The user adds their existing API key. This is a deliberate adoption strategy: organisations can start without abandoning tools they already rely on, and migrate to their own sovereign models as confidence builds.

**Offline capability** — when there is no internet, the on-device models continue to function. This is material for air-gapped environments in defence, government, and regulated industries.

**The Hellagraph knowledge layer** — as the user interacts, the neurosymbolic harness builds a structured knowledge graph of the organisation's domain, terminology, decisions, and reasoning. This graph lives in the organisation's environment. It grows automatically. It is owned entirely by the client.

**Full graph export** — the entire knowledge graph can be exported at any time, in standard formats. No lock-in. Michael Heller: *"It's your brain. If that's your brain, it's not our brain. It's sitting in your network. You built it. You own it."*

**Exodus (releasing at launch)** — migration tooling that imports an organisation's existing Claude, ChatGPT, and other AI conversation history and context into Noetica's Hellagraph. The objection "I've built all my workflows in Claude" is answered by Exodus. Named after the biblical departure from Egypt.

**What Noetica is not:** Noetica is not headless infrastructure. It is not a RAG backend that third-party apps query while presenting their own interface. The product requires users to interact through Noetica's own interface. This is the product boundary, and it matters for prospect qualification.

---

### 2.3 The Profit Platform — Enterprise Intelligence Layer

The Profit Platform is the enterprise layer above Noetica. It is what enables organisations to go beyond governed chat into fully customised, domain-specific AI that is maintained and evolved on a managed cadence.

The Profit Platform enables:

**Custom model fine-tuning** — training or adapting a model on the organisation's specific data, terminology, and domain. The result is not a generic model that knows your organisation's name. It is a model that has ingested your institutional knowledge and reasons within your context.

**Model maintenance and upgrade management** — when new model families are released, the Profit Platform supports the decision of whether and how to migrate. Fine-tuned weights are not trivially portable; this is a recurring, high-value managed service.

**Team-level agent orchestration** — multiple users share and coordinate agents, with governance controls enforced at the platform level: Chinese walls between teams, access permissions, task assignment, and a full audit trail of every agent action.

**The brain-build as a managed service** — for organisations that cannot do the knowledge graph construction themselves, SocioProphet runs the structured discovery and ingestion engagement. This is the enterprise entry engagement: define the ontology, map the domain, ingest the institutional knowledge, and deliver an organisation-specific brain.

**Provenance enforcement at every level** — the Profit Platform makes the distinction between retrieved, inferred, deduced, and generated content structurally enforceable, not just aspirationally stated.

Michael Heller: *"You can't have the frontier tier without the Profit Platform."*

---

### 2.4 Hellagraph — The Knowledge Infrastructure

Hellagraph is the proprietary hypergraph database that underpins both Noetica and the Profit Platform. It is architecturally distinct from conventional vector databases and property graph databases like Neo4j.

**What makes Hellagraph different:**

It stores structured conceptual relationships across a 22-dimension domain model, not just embedding proximity. A vector database finds things that are semantically similar. Hellagraph stores what things mean to each other within the context of your organisation's specific domain — the relationships between your concepts, your decision history, your terminology, your regulatory obligations, and your operational processes.

**Vector packs as a commercial product** — the domain vector packs built on top of Hellagraph are sellable assets in their own right. A financial services client who deploys Noetica gets not just the software but a finance-domain starter brain grounded in academic knowledge (MIT OpenCourseWare corpus, ~58GB, ~577 courses across finance, business, and STEM). They do not start from zero.

**The brain-build sequence:** Getting an organisation's knowledge into Hellagraph cannot be shortcut. It follows a defined sequence: (1) a foundation layer grounded in hard academic knowledge — common-sense reasoning that prevents hallucination; (2) a domain layer covering the organisation's vertical (finance, law, medicine, supply chain); (3) an organisation-specific layer — the client's own data, terminology, decision history. Michael Heller: *"If I don't ground it in hard science and finance first, and then layer the client's idioms on top, we're going to have a bunch of bullshit."*

**The ontology insight** — the most important commercial observation about Hellagraph: what makes an organisation's ERP or SaaS data useful for AI is not the data itself, it is the ontology. The data schema, business logic, and conceptual structure that describes what the data means. This is what SocioProphet needs from partner organisations. The conversation is not "can we access your customers' data?" — it is "can you share your data model and business logic?" That is a partnership conversation, not a data governance conversation.

---

### 2.5 The Neurosymbolic Reasoning Harness — The Technical Moat

This is the core technical differentiator, and it needs a precise commercial translation.

**The problem with frontier labs:** OpenAI, Anthropic, and Google run generative models. These models produce plausible text based on pattern matching. They have no formal mechanism for distinguishing between what they were explicitly told, what they inferred from a pattern, and what they hallucinated. When a doctor's AI assistant says "patient has a history of hypertension," there is no way to know whether it retrieved that from the patient's record or generated it because hypertension commonly co-occurs with the patient's other symptoms. When a lawyer's AI cites a case, there is no way to know whether the case exists.

**What the harness does:** The SocioProphet neurosymbolic harness sits on top of the model choir and enforces a distinction between four reasoning modes: **stated** (explicitly in the source material), **inferred** (derived from patterns in the source material), **deduced** (derived through logical reasoning from stated premises), and **retrieved** (pulled directly from a specific document or knowledge graph node). Every output is tagged with the reasoning mode that produced it. This is what makes every output traceable and every evidence record meaningful.

**Why this matters in regulated environments:**

In financial services: an investment recommendation needs to cite the specific analysis that drove it. The harness provides this. The recommendation does not blend retrieved data with generated commentary without labelling the blend.

In healthcare: a clinical note cannot contain inferences that are not labelled as inferences. The harness enforces this. Michael Heller's own doctor flagged the failure mode of current tools: *"It infers a bunch of stuff and doesn't say it was inferred. I didn't say any of this stuff, but here it is."*

In legal: a case citation must be a real case. The harness distinguishes retrieval from generation. This directly addresses the professional liability exposure from AI-hallucinated citations that have already resulted in sanctions.

**The performance claim:** Michael Heller has high confidence that the neurosymbolic harness applied on top of the model choir and Hellagraph will beat frontier lab performance on standard MMLU benchmarks before domain knowledge is even switched on. The benchmarking sprint (ending approximately 8 July 2026) is producing independently verifiable evidence. Budget: $1,500 total for three-tier validation against the same tests that frontier labs publish results on. Once published, SocioProphet can say: *"We match or beat GPT-5.5 and Claude 5.0 on these standard tests — and this can be fine-tuned on your enterprise knowledge graph, running in your data centre, with no data leaving your environment."*

---

## PART THREE: MARKET POSITIONING

### 3.1 The Category

**Local-first enterprise AI** — the governed AI workspace and agent machine that runs inside your environment, builds your institutional knowledge, and earns your regulators' trust.

SocioProphet occupies the third path between public cloud AI (data sovereignty risk) and private model builds (prohibitive cost and capability lag). It is not a vendor relationship. It is an AI capability the organisation owns.

---

### 3.2 The Positioning Statement

**For regulated enterprises** trapped between public AI that exposes their data and private AI builds that are prohibitively expensive and permanently behind the frontier —

**SocioProphet** is a governed AI control plane that installs inside your own environment, builds an organisational knowledge brain that compounds over time, and produces a cryptographically replayable evidence record of every decision —

**so that** you can run frontier-grade AI without surrendering your data, your competitive intelligence, or your ability to prove to any regulator exactly what your AI did and why.

**Unlike** AI governance wrappers that govern on paper, sovereign LLM deployments that provide data residency without evidence, or frontier labs whose infrastructure you depend on and cannot audit —

**SocioProphet** is the only platform where sovereignty, governance by architecture, and managed frontier currency are delivered simultaneously in a single deployed control plane.

---

### 3.3 The Three-Word Brand Statement

**Your brain. Your agents. Your AI.**

— Michael Heller, Founder/CEO/CTO

---

### 3.4 The Core Message Architecture

Every audience — technical or non-technical, CISO or CFO, regulated or not — needs to land on the same understanding from a different entry point. The message architecture has four layers:

**Layer 1 — The Problem (open every conversation with this)**  
*"Every regulated organisation faces the same trap: use public AI like ChatGPT and your data leaves; build your own and you fall behind the frontier. We need frontier-grade AI — but we cannot afford to surrender our data, our competitive intelligence, or our ability to prove to a regulator exactly what our AI did and why."*  
Use this framing verbatim. It is the customer's voice, not ours.

**Layer 2 — The Third Path**  
Your models, on your infrastructure, with a brain that grows and compounds — yours to own, yours to export, yours to build on. Not public. Not built-from-scratch. Sovereign, governed, and always current.

**Layer 3 — The Differentiator**  
We distinguish between what we retrieved, what we inferred, what we deduced, and what was stated. Every output is traceable to its source. You can hand this to a regulator.

**Layer 4 — The Proof Point** (available ~8 July 2026)  
We meet or beat frontier lab performance on the same public benchmarks that OpenAI and Anthropic publish — while keeping your data inside your environment.

---

### 3.5 The "Einstein for Your Company — But Just for You" Narrative

This is the primary non-technical sales narrative. It was field-validated in a single pre-call conversation with a $50M manufacturing business owner who understood it immediately and used it to describe the product back to himself.

**The starting state:** The system comes grounded in broad academic intelligence — finance, science, business at MIT level. But it knows nothing specific about your organisation on day one.

**The growth phase:** You don't curate it manually. Every conversation, every document ingested, every decision recorded adds to the brain. The neurosymbolic harness continuously builds and refines the conceptual relationships in Hellagraph. The system learns automatically, from your work, in your environment.

**The end state:** Within a short period, it turns into Einstein for your company. Not a generic AI that knows your company name. An AI that thinks the way your organisation thinks — your terminology, your process history, your regulatory context, your supplier relationships, your investment thesis.

**The critical differentiator — "but just for you":** This is the phrase that makes prospects say "oh, that's the difference." Other AI tools learn from all their users. Your usage of ChatGPT contributes to OpenAI's models. Your competitors benefit from your prompts. SocioProphet's brain grows only from your data, stays in your environment, and represents only your accumulated intelligence. No other customer benefits from your experience. No competitor can access your institutional knowledge through a shared model.

**The upgrade framing:** It is the same as software upgrades today. You get bug fixes and patches as part of your subscription. Every now and then you get a major upgrade. You decide whether the new model capability justifies the transition cost. We help you make that decision and manage the migration.

---

### 3.6 Competitive Positioning

**vs. Claude Enterprise / Anthropic**  
The framing: *"Claude Enterprise governs people. SocioProphet governs agents."*  
The sharper commercial version: *"McKinsey signed an enterprise deal with Anthropic. Every McKinsey consultant using Claude sends their client's confidential strategy to Anthropic's servers. We use Noetica, and none of that happens. It's all on your device."*  
Anthropic is simultaneously a supplier, an addressable competitor, and a potential component of the platform (via API key integration). The competitive message is not that Claude is bad. It is that using Claude through a third-party cloud is a data governance problem, and SocioProphet solves that problem.

**vs. Palantir AIP / Foundry**  
*"They collapse uncertainty into a traffic light. We carry it to the decision so your auditor, your regulator, and your risk committee can see exactly how much to trust it."*

**vs. AI Governance / GRC platforms (Credo AI, Holistic AI, Modulos)**  
*"They govern on paper. We govern in execution. There is no policy document that proves what your AI did."*

**vs. Hyperscaler in-tenant deployments (AWS Bedrock, Azure AI Foundry)**  
*"Data residency is not sovereignty. Your data still lives on their infrastructure. You still depend on their pricing, their availability, and their roadmap. And there is no evidence fabric — you cannot replay a decision."*

**vs. Runtime enforcement gateways (TrueFoundry, WitnessAI)**  
*"Gateway enforcement answers 'did the request pass the policy check?' We answer 'what did the AI do, why did it do it, how confident was it, and can you prove it to anyone who asks?'"*

**The gap no competitor occupies:**  
The intersection of sovereignty + governance by architecture + managed frontier currency. No competitor simultaneously keeps the AI sovereign, produces a cryptographically replayable evidence chain, and continuously manages the currency of the model stack. This intersection is the position.

---

### 3.7 Buying Psychology — What Buyers Fear and How to Address It

These are the six fears encountered in prospect conversations. Every sales conversation should expect at least two of them.

**Fear: "My data is going into the cloud."**  
Response: Data stays in your environment. Always. No exceptions. We don't see it, we don't train on it, no other customer's AI learns from it. When there is no internet, the on-device models keep running.

**Fear: "If I build my brain with you, I'm locked in forever."**  
Response: Your knowledge graph is yours. Export it at any time, in standard formats, and take it anywhere. We built portability into the architecture from day one.

**Fear: "How do I stay current? What happens when the next model comes out?"**  
Response: Quarterly model refreshes are part of the service. When a major new model family arrives, we help you make the cost/benefit decision and manage the transition if you proceed. You decide. We execute.

**Fear: "I've been burned before. IBM told us Watson could do everything."**  
Response: We will tell you exactly what we need from you, what we will build, and what you will be able to do with it. The brain-build engagement has a defined scope, a defined deliverable, and a defined timeline. No hidden complexity discovered mid-project.

**Fear: "How do I know your AI's output is reliable?"**  
Response: We distinguish between what we retrieved, what we inferred, what we deduced, and what was stated. Every output carries its reasoning mode. You can trace any answer to its source. That is not a feature — it is the architecture.

**Fear: "I don't want to be tied to Google or Amazon for my compute."**  
Response: We are cloud-agnostic. We broker compute across AWS, Azure, GCP, and IBM. We also run on your own hardware. You can move. You are never dependent on any single vendor.

---

## PART FOUR: SEGMENT DEFINITIONS AND IDEAL CUSTOMER PROFILES

### 4.1 The Three-Segment Framework

SocioProphet addresses three distinct market segments with different entry products, revenue structures, and go-to-market motions. Segment A is the current priority. Segment B is the channel strategy. Segment C is the Stage 2 platform play.

---

**SEGMENT A — The Organisation Building Its Own Brain**

*Current GTM priority.*

**Who they are:** Any organisation that needs to use AI to remain competitive but cannot or will not send its data to a third-party cloud. The pain is not abstract — it is regulatory, legal, or competitive. These organisations have either hit a governance wall ("our legal team won't approve sending client data to Anthropic") or a compliance trigger ("ASIC is asking us what happens to our AI outputs and we can't answer them") or a sovereignty concern ("our 30 years of institutional knowledge is our competitive edge and it is not going into someone else's training data").

**Entry product:** Noetica, on-device or managed cloud.

**Revenue progression:** Freemium → seat or department subscription → enterprise fine-tuning engagement → managed model maintenance.

**Qualifying signals:**
- Active AI adoption programme that has stalled on governance or data sovereignty
- Has received regulatory guidance or audit findings related to AI model risk
- Has Chinese wall or information barrier obligations (investment banking, legal, clinical)
- Has AI usage that triggers compliance concern (portfolio managers using ChatGPT, lawyers using public AI for research)
- AI governance is on the board agenda, not just the technology team's

---

**SEGMENT B — The Software Provider Seeking Life Extension**

*The channel strategy.*

**Who they are:** Mid-market vertical SaaS companies, ERP vendors, practice management platforms, and compliance software providers that own a well-defined ontology (their database schema and business logic), have an installed customer base of 50 to 500+ organisations, lack a credible AI roadmap, and are at risk of losing customers to AI-native competitors.

**Why this segment exists:** The hardest and most expensive part of building any Segment A client's knowledge graph is not the AI — it is the ontology. Without a structured understanding of the data schema and business logic of their source systems (ERP, CRM, EMR, compliance platforms), every new client requires a $250,000+ discovery engagement just to understand what their data means. Partners in this segment already own that ontology. One integration with the right ERP vendor converts every client in their customer base from a $250,000 discovery project into a template deployment.

**Entry product:** Hellagraph integration plus Profit Platform partnership agreement.

**Revenue model:** Platform licensing from the vendor, plus per-customer deployment fees as the vendor adds AI capability to each client.

**The partner pitch:** *"We can add AI intelligence to your platform in months rather than years. Your customers won't want to leave because of this. Your platform becomes more valuable and more defensible."*

**Named examples:** JIWA (SMB ERP for food manufacturing and distribution, Australia); NICE Actimize (fraud and financial crime compliance).

**The ontology insight in practice:** The conversation with a Segment B partner is not "can we access your customers' data?" — it is "can you share your data model and business logic with us?" That is a partnership negotiation, not a data governance negotiation. One conversation with JIWA unlocks the supply chain vertical at scale.

---

**SEGMENT C — The Enterprise Wanting Its Own AI Layer**

*Stage 2 — architecture is ready, GTM is not yet.*

**Who they are:** Large enterprises and software companies currently paying Anthropic, OpenAI, or Google per-token for AI capability embedded in their products. They want to own the capability, eliminate vendor dependency, reduce per-token costs at scale, and create proprietary competitive advantage.

**Why this is Stage 2:** The Profit Platform is already built. The question is sequencing. Building apps for clients is low-margin professional services work. The Stage 2 motion is to be the AI infrastructure layer that platform companies plug into — not to build their apps but to provide the sovereign, branded, fine-tuned model choir that powers their existing products.

**Entry product:** Profit Platform, custom deployment.

**The future vision:** An agent marketplace — "Upwork meets LinkedIn for agents" — where developers and operators publish agent configurations built on the platform and offer them to other users on a task, project, or ongoing basis. Quality-controlled via a credentialled access system. This creates network effects: more agents make the platform more valuable to buyers; more buyers attract more agent builders.

---

### 4.2 ICP Detail — Segment A Verticals

#### Financial Services — Priority ICP

**Why it is priority:** Regulatory requirements (APRA, SR 26-2, FCA, EU AI Act) make data sovereignty a legal obligation, not a preference. Chinese walls are legally required. Investment decisions require an auditable provenance trail. All banks face structurally similar problems — one successful deployment is a template for the next. High willingness to pay: financial institutions justify large technology investments on risk reduction alone.

**The specific problems this vertical has:**
- Portfolio managers and analysts using public AI tools to process proprietary research and client data, triggering compliance concern
- Ungoverned AI agents producing outputs that cannot be replayed for a regulator
- Chinese walls between investment banking and research, or between different fund mandates, that public AI tools cannot enforce
- ASIC, SEC, FCA, and APRA all signalling that AI governance is a live examination area

**Active prospects:** IFM Investors (Ya Ying, Portfolio Manager, Brisbane — discovery complete, Michael intro call agreed; pain: ungoverned Python agents, ASIC discoverability raised unprompted); NASDAQ (Lenny via Keith — SCOPE-D adversarial testing entry); Capital One (dual investor/customer track — Jocelyn and Jonathan Gold); ANZ Bank (implied); Commonwealth Bank (Gus contact: Head of Integration Architecture).

**What the sales conversation opens with:** *"Your portfolio managers are using AI tools right now. Do you know what happens to the trade ideas, the client briefs, and the proprietary data they're putting into those tools? And if ASIC asks you to replay the reasoning behind a specific investment decision — can you?"*

---

#### Healthcare — High Potential, Medium Priority

**Why it works:** Patient data obligations (HIPAA in the US, Privacy Act in Australia) make on-device AI not just preferable but architecturally aligned with compliance. Any AI tool that processes patient data via a third-party cloud is a compliance problem; on-device is compliance by design.

The EMR (Electronic Medical Record) ontology is largely standardised across provider networks. One Hellagraph integration with a major EMR system creates a template that applies to every practice in that network. Michael Heller: *"Every doctor's office in the country has the same EMR file format. We can go to all of them."*

The provenance problem is acute. Current clinical AI tools confabulate — they infer clinical states from patterns and do not label the inference. A note that says "patient has a history of hypertension" when the patient never said that and the record does not contain it is a clinical liability. The neurosymbolic harness, which distinguishes stated from inferred, solves this structurally.

**The use case:** Install across the entire practice — physicians, nursing staff, administrative team. The knowledge graph builds across all patient interactions, scheduling, pharmaceutical rep conversations, supplier relationships, and email. It integrates with the calendar, the EMR, and the email system. The practice develops an institutional AI brain that understands their patient population, their treatment preferences, and their operational patterns.

**Sales motion:** Target multi-practice networks, not solo practitioners. The network multiplies the deployment value and justifies the managed service model. A group of 20 practices with a shared administrative layer is a single managed deployment with 20x the knowledge graph density.

---

#### Legal — High Potential, Medium Priority

**Why it works:** Attorney-client privilege and work product protection make data sovereignty a legal obligation. Any law firm using cloud AI for client work may be inadvertently disclosing privileged information to a third-party infrastructure provider. Chinese walls between practice groups are legally required at most firms with both transactional and advisory work.

Case citation hallucination is an active professional liability issue. Multiple lawyers in multiple jurisdictions have been sanctioned for citing AI-generated cases that do not exist. The neurosymbolic harness distinguishes retrieval from generation. A citation marked as retrieved came from a real document in the knowledge graph. A generated response is labelled as generated.

**The Anti-Anthropic play in legal:** McKinsey signed an enterprise deal with Anthropic. Major consulting firms doing confidential client strategy are sending that strategy to Anthropic's infrastructure. Law firms doing M&A diligence, restructuring advice, or sensitive regulatory work cannot afford the same exposure. SocioProphet is the alternative for firms that have assessed the risk and cannot accept it.

**Sales motion:** The buyer is the CIO or Head of Technology, but the champion is the General Counsel or the Senior Partner who has had a near-miss with AI-generated content in a brief. The IBM-pattern caution applies: be specific about what the brain-build engagement requires, what it delivers, and what the firm needs to provide.

---

#### Supply Chain and Manufacturing — Valid, Channel-Dependent

**The opportunity:** Decades of operational data sitting in ERP systems, untapped. Business owners who know they should be able to make better procurement decisions, better quality assurance calls, better supplier selection — but cannot connect their data to a reasoning system. Gus Quiroga's pre-call conversation with a $50M food manufacturing business owner was a live demonstration: *"I've got 30 years of product and supply chain information and I just don't know what I should order, or when."*

The same owner, unprompted: *"That's my knowledge and my IP. I don't want to put it out there in the ecosystem."* And, also unprompted: *"I can tell you right now another dozen companies like me with the same problem. If I built this, could I bring them on and give them a starter?"* This is the consortium model, the IP sovereignty concern, and the vertical replication opportunity — all in a single unrehearsed conversation.

**The constraint:** Without the ERP vendor's ontology, every supply chain client is a $250,000+ discovery engagement. The path is through the Segment B channel: JIWA as the first ERP partner. One JIWA ontology integration makes every JIWA customer a template deployment. The food manufacturing prospect should become the first JIWA-integrated Noetica client, funded jointly with JIWA who wants to retain the customer against AI-native competitors.

---

#### Wealth Management — Two Distinct Profiles

**Profile 1 — Institutional asset management:** The IFM Investors profile. Technically sophisticated, building their own Python agents on open-source models (Qwen, DeepSeek), actively aware of the governance gap, and concerned about ASIC discoverability. The product fit is not Noetica as a chat interface — it is the Profit Platform as a governance layer for the agent work they are already doing. The conversation: *"You're already building agents. You know the governance problem better than anyone. We provide the control plane, the evidence fabric, and the provenance trail that makes your agent work defensible."*

**Profile 2 — Personal wealth coaching / "Pocket Mentor":** An agent advisor application where a wealth coach's IP and methodology is ingested and served as an AI-powered personal coaching experience via a mobile app. This requires the Profit Platform cloud tier and is a Segment C play — using SocioProphet as AI infrastructure for a consumer-facing product. It is a consulting engagement at this stage, not a direct product sale.

---

### 4.3 Lighthouse Customer Criteria

The first customer matters more than the first revenue. The lighthouse client must be:

1. **In a regulated industry** — creates urgency and justifies investment. The governance requirement is mandatory, not discretionary.
2. **Facing an active sovereignty concern** — not theoretical. Has had a near-miss, received regulatory guidance, or has a board-level AI risk discussion already underway.
3. **Referenceable** — the use case can be described (even under a case study agreement) and templated for the next client in the same vertical.
4. **Managed-service ready** — does not want to hire an AI team. Wants to consume the capability.
5. **Sufficient size** — enough budget and organisational complexity to justify the brain-build investment.
6. **A named problem** — not "we want to use AI." Something specific: "Our portfolio managers are using ungoverned tools and ASIC is asking questions" or "Our clinical AI is inferring things it was never told and we can't show a regulator the difference."

---

## PART FIVE: DEPLOYMENT AND COMMERCIAL MODEL

### 5.1 Three-Tier Deployment Architecture

SocioProphet is the only platform that delivers sovereign, governed AI across three deployment tiers from a single architecture.

**Edge Tier — On-Device**  
Runs on the user's own hardware. 7 billion to 24 billion parameter models running locally. Nothing leaves the device. Works offline. No cloud infrastructure cost to the client. This is the entry point for all deployments and the starting point for any client who has data residency requirements or regulatory constraints on data movement.

**Pro Tier — Neocloud Managed**  
Managed cloud deployment through neocloud partnerships — organisations that have acquired GPU racks and built private data centres operating outside the hyperscaler pricing model. SocioProphet term-matches compute leases to client contract duration, eliminating idle capacity risk and protecting margins. The client gets managed cloud capability at below-hyperscaler rates. SocioProphet takes a brokerage margin on the compute spread.

**Frontier Tier — Benchmarked Competitive**  
Full frontier-grade deployment, cloud-hosted, benchmarked against the same public tests that OpenAI and Anthropic publish results on. Once benchmarks are published (~8 July 2026), this tier carries an independently verifiable performance claim. Cloud-agnostic: deployment templates built for AWS, Azure, GCP, and IBM. Real-time spot price optimisation routes workloads to the cheapest available compute.

---

### 5.2 Commercial Model Structure

The commercial model has three stages. The entry point depends on the segment.

**Stage 1 — Consultancy (Land)**  
Assess the organisation's AI estate, risk requirements, and automation opportunities. Define what they actually need. For Segment A enterprise clients, this is the brain-build engagement — define the ontology, map the domain, design the knowledge ingestion architecture. Scope and timeline are defined upfront. This is where the IBM warning applies: every requirement on the client side is disclosed before any commitment is made.

**Stage 2 — Implementation (Prove)**  
Deploy the control plane, model choir, and agent fleet inside the client's own environment. Stand up the evidence and governance fabric. The output is a deployed, governed AI capability the client can use in production and prove to any auditor. Delivered as a structured residency — onsite and remote — with train-the-trainer enablement and a defined follow-through period.

**Stage 3 — Service Agreement (Expand and Retain)**  
Ongoing managed service. SocioProphet continuously hardens the model choir, monitors for capability and compliance drift, and deploys new capability on a controlled cadence. The client always owns "their version of current." This is the recurring revenue spine and the deepest retention mechanism — the control plane becomes embedded in the institution's AI governance obligations.

---

### 5.3 Segment A Direct — Two Tiers

**Mid-Market Tier:** Standard model choir with quarterly updates pushed by SocioProphet. No bespoke fine-tuning. The client receives what SocioProphet releases. Annual subscription with a 12-month model support window. After 12 months, a model version goes out of support; the client upgrades or continues on an unsupported version. Pricing is in the same bracket as frontier lab subscription tiers — not significantly cheaper, which would signal inferior quality.

**Enterprise Tier:** Bespoke fine-tuning of the model on the client's own data. Custom model maintenance managed by SocioProphet. Upgrade decisions made with SocioProphet support — cost/benefit analysis, then managed migration if the client proceeds. Entry engagement is the brain-build workshop. Scope-defined pricing with parameters established upfront.

---

### 5.4 Distribution — Freemium and App Store

Noetica releases on the app store with the foundation choir and all external LLM integrations (Claude, GPT, Gemini, Meta, Mistral, Perplexity) pre-configured at no cost. The user adds their own API key. No charge for on-device model use.

Revenue trigger: subscription to SocioProphet's managed cloud brain service, competing in the same pricing tier as existing frontier lab subscriptions.

Referral programme: introduce the platform to other users and receive extended free service. Network-effect growth funded by forward revenue.

Long-term objective: 30,000+ free users who use Noetica as their primary AI interface, combined with two enterprise reference clients, creates the fundraising event. The freemium tier is not a concession — it is the acquisition engine.

The trojan horse logic: a user who already has a Claude subscription installs Noetica and continues using Claude through Noetica's governance layer. Their conversation history stays on-device. Their brain builds in the background. When the on-device models prove their performance against published benchmarks, the natural question becomes: *"Why am I still paying Anthropic per-token when this works just as well and my data never leaves?"*

---

## PART SIX: MESSAGING BY AUDIENCE

### 6.1 For the CRO and Chief Risk Officer

*Lead with regulatory urgency. Land on evidence.*

Your AI adoption is already happening without you. Your portfolio managers are using ChatGPT. Your analysts are using Claude. Your compliance team is asking questions you cannot answer. SR 26-2 did not give you answers — it gave you obligations and told you to work it out.

SocioProphet installs inside your existing private cloud and gives you a governed AI capability with a cryptographically signed evidence record of every decision. When your examiner asks you to replay an AI-assisted risk assessment, you can. When your board asks whether your AI is behaving within policy, you can show them, not tell them.

You do not need to choose between frontier capability and the ability to prove what happened.

---

### 6.2 For the CIO and Head of Technology

*Lead with architecture. Land on sovereignty and currency.*

We deploy entirely inside your existing private cloud (AWS, Azure, GCP, or on-premise). No external API calls in the sovereign deployment model. No data crosses your perimeter. We bring our own model choir — a curated ensemble of open-source models that we run, maintain, and update on your behalf. You own the choice to upgrade; we manage the execution.

The governance is structural: every model call produces a signed, replayable artifact. Uncertainty is propagated with provenance, not collapsed into a risk rating. The evidence fabric is not a layer on top of the system — it is the system.

When new model families are released, we assess them against your requirements and manage the migration if you choose to proceed. You never fall behind, and you never lose the evidence trail.

---

### 6.3 For the CDO and Head of AI

*Lead with the knowledge graph. Land on the technical differentiator.*

Your organisation's institutional knowledge is not in your AI. It is in your people's heads, your legacy documents, your email threads, and your ERP system. None of those tools talk to each other in a form that a model can reason over.

Hellagraph builds the structured knowledge graph of your domain — your ontology, your terminology, your decision history. It builds automatically as your team works. It distinguishes between what we retrieved from a document, what we inferred from a pattern, what we deduced through reasoning, and what the model generated. Your AI does not confabulate and call it a finding. It labels every output with where it came from.

No one builds a better graph RAG than us. We are running the benchmarks to prove it.

---

### 6.4 For the Non-Technical Buyer (Business Owner, General Counsel, Operational Head)

*Lead with the analogy. Land on sovereignty.*

Imagine you could hire a new employee who came with a solid general education — finance, business, science — and who within a few months becomes Einstein for your organisation, but just for you. Not for your competitors. Not for anyone else. Just for you. That employee learns everything about your business by working alongside your team. They never leave. They never take your knowledge to a competitor. And you own everything they've learned — if you ever want to take it with you, it's yours to export.

That is what SocioProphet does. Your data does not go into the cloud. Your knowledge graph grows inside your own environment. Your institutional knowledge — 30 years of it, if that's what you have — becomes something your organisation can finally reason with.

---

## PART SEVEN: THE PRODUCT MARKETING ROADMAP

### 7.1 The Benchmark Sprint as a Marketing Event

The two-week sprint ending approximately 8 July 2026 is not just an engineering milestone. It is the foundation for the market entry claim. When Michael Heller says "no one has better Graph RAG than us," that is a founder conviction. When MMLU benchmark results show SocioProphet's choir + neurosymbolic harness matching or beating GPT-5.5 and Claude 5.0 on public tests, that is independently verifiable evidence.

The benchmark results need a marketing treatment:
- A one-page "why our benchmarks matter" document for non-technical buyers that explains what MMLU measures, why it is the right proxy, and what it means to beat it while keeping data sovereign
- A competitive comparison table: SP score vs. GPT-5.5 vs. Claude 5.0, with the sovereignty advantage as the decisive differentiator even where scores are comparable
- A concise statement for use in any sales conversation: *"We publish our benchmark results. Here they are. Now ask Anthropic for theirs, under your deployment conditions, with your data staying on your device."*

### 7.2 The Fundraising Foundation

The fundraising narrative requires product marketing infrastructure. The valuation story — two enterprise clients plus 30,000 free users equals a materially higher post-money valuation — depends on evidence that demand is real, documented, and repeatable. The product marketing workstream is therefore also the fundraising preparation workstream.

Deliverables needed before the raise:
- A validated, documented ICP with field evidence (the food manufacturing conversation, the IFM discovery call, the NASDAQ signal from Keith)
- A reference narrative or letter from the first lighthouse client
- Published benchmark results with plain-language translation
- A freemium user base demonstrating organic demand

### 7.3 Assets to Build (Priority Order)

**Immediate (before any prospect conversation):**
1. One-page product brief using the "Einstein for your company" narrative — non-technical, for any business decision-maker. The food manufacturing conversation is the proof point and the template.
2. Benchmark results communication — once the sprint completes (~8 July)
3. "Why our benchmarks matter" explainer — one page, non-technical

**Before IFM intro call with Michael:**
4. IFM-specific narrative: governed AI control plane for a buy-side asset manager building their own Python agents with ASIC discoverability exposure
5. SCOPE-D product brief for the NASDAQ conversation

**For the broader sales arsenal (A4 deliverable):**
6. Segment A enterprise pitch narrative — the full journey from brain-build engagement through Stage 3 managed service
7. Competitive one-pager — the four competitor categories and the gap SocioProphet occupies
8. Objection handling guide built from the six buyer fears

---

## PART EIGHT: WHAT THIS DOCUMENT IS AND HOW TO USE IT

### Validation gate

This document is a synthesis of intelligence from:
- Michael Heller (Founder/CEO/CTO): all product architecture claims, technical differentiators, infrastructure strategy, and performance assertions
- Gus Quiroga (President/CRO): commercial model structure, field validation from prospect conversations, GTM segment definitions, messaging frameworks

**Before any content from this document appears in external materials**, Michael Heller must review and validate the technical claims. The commercial content (segment definitions, messaging architecture, buyer psychology) does not require Michael's technical approval but should be reviewed by Gus before external use.

**Figures flagged [UNVERIFIED]** — specifically the $300K full-org retraining cost — must not appear in any investor or prospect material until Michael provides explicit confirmation.

### What this document feeds into

- **A1 (ICP Prioritisation):** Segment definitions, qualifying criteria, and lighthouse criteria in Parts Four and Five
- **A2 (Commercial Architecture):** Commercial model structure in Part Five — prices and ACV to be added at Session 1
- **A3 (Sales Motion):** Message architecture by audience in Part Six, GTM model detail in Parts Four and Five
- **A4 (Sales Arsenal):** Asset list in Part Seven, messaging frameworks in Part Six
- **Investor materials:** Part Three positioning, benchmark narrative in Part Seven (once benchmarks are published)

### Source record

Primary source: `2026-06-24_SocioProphet_RESEARCH_MichaelHellerProductSession24Jun`  
Drive ID: `1_RXJrNryoOtk16gObc7L2j5vXbmXs3OVkBS0ayZE7rQ`  
Supporting: KB v1.5, BCD v1.4

---

*KYROGA AI (Claude, Chief of Staff) | 25 June 2026*  
*SocioProphet Accelerate Engagement*

---

**DOCUMENT CONTROL**  
v1.0 | 25 Jun 2026 | Initial document. Synthesised from intelligence brief (24 Jun session), KB v1.5, and BCD v1.4. Structured as a practitioner PMM document for internal use and Michael Heller technical validation. Covers market problem, product definition, positioning architecture, segment and ICP framework, deployment and commercial model structure, messaging by audience, and the product marketing roadmap.
