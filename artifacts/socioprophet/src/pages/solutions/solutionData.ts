import { Landmark, TrendingUp, Shield, HeartPulse, type LucideIcon } from "lucide-react";

export interface RelatedLink {
  name: string;
  href: string;
}

export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  intro: string;
  problemHeading: string;
  problem: string;
  solutions: string[];
  proofs: string[];
  drivers: string[];
  related: RelatedLink[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "banking",
    name: "Banking",
    tagline: "Governed AI inside the firewall",
    icon: Landmark,
    intro:
      "Tier-1 banks cannot send proprietary strategy, client PII, or internal communications to public AI — yet falling behind on AI is its own risk. SocioProphet delivers frontier capability inside the perimeter.",
    problemHeading: "Adoption is already happening without governance",
    problem:
      "Your portfolio managers and analysts are already using public AI. Chinese walls, model risk policies, and examiner expectations all assume you can show exactly what an AI did. Public tools give you no such record.",
    solutions: [
      "Run frontier conversational AI entirely inside your private cloud — no data crosses the perimeter.",
      "Enforce information barriers at the knowledge-graph layer, not just the interface.",
      "Produce a signed, replayable record for every AI-assisted decision.",
      "Map AI usage to your existing model risk management framework.",
    ],
    proofs: [
      "Replay any AI-assisted decision for an examiner, exactly as it occurred.",
      "Demonstrate that information barriers held across every query.",
      "Prove no client PII or proprietary strategy left your control.",
    ],
    drivers: ["SR 26-2 (US Federal Reserve)", "APRA CPS 230 (Australia)", "FCA AI Framework (UK)"],
    related: [
      { name: "SR 26-2 Solution Brief", href: "/solutions/sr26-2" },
      { name: "Noetica", href: "/products/noetica" },
    ],
  },
  {
    slug: "asset-management",
    name: "Asset Management",
    tagline: "Proprietary strategy stays proprietary",
    icon: TrendingUp,
    intro:
      "Your alpha is your strategy. Asset managers cannot feed query theses to external models, and ASIC / SEC discoverability means every AI-assisted action may later be examined.",
    problemHeading: "Ungoverned tools, discoverable decisions",
    problem:
      "Portfolio managers use ungoverned tools, and regulators ask you to replay the reasoning. Feeding a thesis to a public model leaks your edge; having no AI at all leaves productivity on the table.",
    solutions: [
      "Synthesise market research and internal data without sending your thesis to an external model.",
      "Keep every proprietary strategy and signal inside your perimeter.",
      "Capture a discoverable, signed evidence trail for ASIC / SEC examinations.",
      "Maintain frontier model currency on a managed cadence — no internal AI arms race.",
    ],
    proofs: [
      "Produce a complete, signed record of AI-assisted reasoning on demand.",
      "Show exactly which data grounded each output.",
      "Prove proprietary strategies never reached a third-party endpoint.",
    ],
    drivers: ["ASIC (Australia)", "SEC (United States)", "MAS (Singapore)"],
    related: [
      { name: "Hellagraph", href: "/products/hellagraph" },
      { name: "Evidence", href: "/evidence" },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    tagline: "Defensible, explainable underwriting",
    icon: Shield,
    intro:
      "Actuarial science and underwriting require deterministic reasoning and defensible decisions. \u201cBlack box\u201d AI is unacceptable when assessing risk or processing claims.",
    problemHeading: "Risk decisions must be explainable, clause by clause",
    problem:
      "Model risk and actuarial AI governance demand that every decision be explainable to a regulator. Traffic-light dashboards collapse the uncertainty you are required to defend.",
    solutions: [
      "Carry uncertainty all the way to the decision point — no traffic-light oversimplification.",
      "Cite the exact policy clauses driving each AI recommendation.",
      "Keep PHI and policyholder data segregated inside your environment.",
      "Govern actuarial AI within your existing model risk framework.",
    ],
    proofs: [
      "Explain any AI-assisted risk assessment to a regulator, fully traced.",
      "Show the provenance of every claims recommendation.",
      "Demonstrate strict data segregation across lines of business.",
    ],
    drivers: ["DORA (Digital Operational Resilience Act)", "EU AI Act", "Solvency II Directive"],
    related: [
      { name: "Evidence", href: "/evidence" },
      { name: "Platform", href: "/platform" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    tagline: "Frontier AI without touching PHI",
    icon: HeartPulse,
    intro:
      "Patient data (PHI) is the most strictly protected data class globally. Public AI endpoints are fundamentally incompatible with HIPAA and equivalent frameworks.",
    problemHeading: "PHI cannot touch a public endpoint",
    problem:
      "Public AI endpoints can't touch PHI, and clinical AI infers things it was never explicitly told — leaving you unable to show a regulator the difference between fact and inference.",
    solutions: [
      "Run models on your hardware so PHI never leaves your network.",
      "Analyse unstructured clinical data locally under strict HIPAA compliance.",
      "Trace every inference back to its source for clinical and regulatory review.",
      "Automate medical coding and charting securely within the hospital network.",
    ],
    proofs: [
      "Guarantee zero PHI leakage with an architectural, not policy, control.",
      "Show provenance for every clinical AI output.",
      "Demonstrate compliance with HIPAA / HITECH and GDPR.",
    ],
    drivers: ["HIPAA / HITECH (US)", "GDPR (EU)", "EMA Regulations"],
    related: [
      { name: "Noetica", href: "/products/noetica" },
      { name: "Evidence", href: "/evidence" },
    ],
  },
];

export function getSolution(slug: string | undefined): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
