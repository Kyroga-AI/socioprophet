import { Box, Database, BarChart3, type LucideIcon } from "lucide-react";

export interface Capability {
  title: string;
  body: string;
}

export interface ComparisonRow {
  label: string;
  us: string;
  them: string;
}

export interface Tier {
  name: string;
  body: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  intro: string;
  capabilities: Capability[];
  highlights: string[];
  notList?: string[];
  comparisonTitle?: string;
  comparisonThem?: string;
  comparison?: ComparisonRow[];
  tiersTitle?: string;
  tiers?: Tier[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "noetica",
    name: "Noetica",
    tagline: "ChatGPT you can hand to a regulator",
    icon: Box,
    intro:
      "Noetica is the governed workspace — safe, sovereign conversational AI and document analysis for your entire workforce, with nothing leaving the perimeter. It is the wedge: the product your people actually use every day.",
    capabilities: [
      {
        title: "Governed model choir",
        body: "Curated open-weight frontier models, hardened and run entirely inside your environment.",
      },
      {
        title: "External LLM integrations",
        body: "Optionally route to Claude, GPT, or Gemini — under the same governance and evidence controls.",
      },
      {
        title: "Offline capability",
        body: "Operates fully air-gapped when your environment demands it. No outbound calls required.",
      },
      {
        title: "Hellagraph knowledge layer",
        body: "Answers grounded in your organisation's own structured knowledge, not the open web.",
      },
      {
        title: "Source attribution",
        body: "Every factual claim cites its exact location in your internal documentation.",
      },
      {
        title: "Exodus migration",
        body: "Bring existing chats, prompts, and workflows across without lock-in or rework.",
      },
    ],
    highlights: [
      "Nothing you type ever trains anyone else's model",
      "Cryptographically signed, replayable interactions",
      "Deploys in your private cloud or on-premise hardware",
    ],
    notList: [
      "Not a headless API you have to wire up yourself",
      "Not a thin RAG backend bolted onto a public model",
      "Not a tool that quietly phones home with your data",
    ],
  },
  {
    slug: "hellagraph",
    name: "Hellagraph",
    tagline: "The knowledge infrastructure that learns your organisation",
    icon: Database,
    intro:
      "Hellagraph builds the structured knowledge graph of your domain — your ontology, your terminology, your decision history. It transforms unstructured silos into a deeply connected, AI-readable brain that is yours alone. Entity resolution is governed end to end: safe linkage, policy-constrained merges, and proof artifacts that show exactly what did — and did not — leak across contexts.",
    capabilities: [
      {
        title: "22-dimension domain model",
        body: "Captures the relationships a flat vector store simply cannot represent.",
      },
      {
        title: "Vector packs",
        body: "Composable knowledge bundles for fast, scoped, permission-aware retrieval.",
      },
      {
        title: "Brain-build sequence",
        body: "A managed process that ingests and structures your institutional knowledge end to end.",
      },
      {
        title: "Ontology mapping",
        body: "Automatically infers relationships between disparate internal documents.",
      },
      {
        title: "Policy-constrained merging",
        body: "Entity merges are governed decisions — policy can veto even high-confidence links, and every merge is reversible with a full unmerge path.",
      },
      {
        title: "Access segregation",
        body: "Information barriers enforced at the graph layer, not just the interface.",
      },
      {
        title: "Portable export",
        body: "Full extraction of your graph in standard formats — zero vendor lock-in.",
      },
    ],
    highlights: [
      "It's your brain. You built it. You own it.",
      "Safe linkage: resolve carefully, merge cautiously, prove what did not leak",
      "Export the entire graph at any time, in standard formats",
    ],
    comparisonTitle: "Hellagraph vs. vector databases & Neo4j",
    comparisonThem: "Vector DB / Neo4j",
    comparison: [
      { label: "Relationship depth", us: "22-dimension hypergraph", them: "Flat vector similarity" },
      { label: "Ownership", us: "Full export, no lock-in", them: "Tied to the vendor store" },
      { label: "Access control", us: "Graph-layer segregation", them: "App-layer filtering" },
      { label: "Grounding", us: "Structured + semantic", them: "Semantic only" },
    ],
  },
  {
    slug: "profit",
    name: "The Profit Platform",
    tagline: "The enterprise intelligence layer",
    icon: BarChart3,
    intro:
      "The Profit Platform is the advanced layer for technical teams: fine-tune models securely, orchestrate agent teams, and run the managed brain-build service that keeps your intelligence current — all under the same governance and evidence guarantees.",
    capabilities: [
      {
        title: "In-perimeter fine-tuning",
        body: "Train on proprietary data without it ever leaving your environment.",
      },
      {
        title: "Model maintenance",
        body: "Continuous hardening and capability refreshes on a managed cadence.",
      },
      {
        title: "Agent orchestration",
        body: "Role-bounded agent workflows with capability routing and audit-friendly operator state — high-risk actions require approval, never silent execution.",
      },
      {
        title: "Brain-build managed service",
        body: "We build and maintain your Hellagraph knowledge graph on your behalf.",
      },
      {
        title: "Model evaluation",
        body: "Automated benchmarks to prove model safety and accuracy to risk committees.",
      },
      {
        title: "API gateway",
        body: "Securely expose governed AI endpoints to your internal applications.",
      },
    ],
    highlights: [
      "Frontier capability without an internal AI arms race",
      "Every workflow inherits the evidence fabric",
      "You own the models and the knowledge graph",
    ],
    tiersTitle: "How engagements are structured",
    tiers: [
      {
        name: "Team",
        body: "Fine-tuning and agent orchestration scoped to a single business unit.",
      },
      {
        name: "Division",
        body: "Multi-team orchestration with the managed brain-build service included.",
      },
      {
        name: "Enterprise",
        body: "An organisation-wide intelligence layer with dedicated deployment engineering.",
      },
    ],
  },
];

export function getProduct(slug: string | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
