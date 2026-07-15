import { TermTooltip } from "@/components/TermTooltip";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Database,
  Network,
  Check,
  X,
  Minus,
  ScrollText,
} from "lucide-react";
import heroAbstract from "@/assets/images/hero-abstract.png";
import platformMesh from "@/assets/images/platform-mesh.png";
import evidenceFabric from "@/assets/images/evidence-fabric.png";
import { CTASection } from "@/components/sections/CTASection";

const ARGUMENT = [
  "There are three ways to adopt AI today — public models, a single vendor's platform, or in-house agents. All of them incomplete.",
  "SocioProphet is the fourth path: a governed, model-portable orchestration layer that sits underneath all three and makes every action provable.",
  "It runs entirely inside your environment, builds an organisational brain that compounds over time, and governs people, agents, and knowledge.",
  "Every model call and agent decision produces a cryptographically signed, replayable evidence artifact. Logs \u2260 provenance. Dashboards \u2260 replay.",
  "It is built for the regulatory wave now arriving: EU AI Act, SR 26-2, APRA CPS 230, FCA, DORA, MAS.",
];

const PILLARS = [
  {
    icon: Network,
    title: "The fourth path",
    body: "Keep using your preferred AI, your preferred vendor, or the agents your teams already built. We govern all of it — you don't have to rip anything out. On-device deployment, cloud-agnostic templates, full graph export, and Exodus migration tooling — plus Prophet Mesh's multi-model orchestration, which directly rebuts the 'I could build that on a single model' objection from technical buyers.",
  },
  {
    icon: Database,
    title: "IP sovereignty as competitive moat",
    body: "Your AI-generated knowledge is intellectual property. We keep it governed, sovereign, and compounding — for you alone. The durable moat was never the foundation model everyone has access to; it's your organisation's own compounding knowledge.",
  },
  {
    icon: ShieldCheck,
    title: "Managed frontier currency",
    body: "You never fall behind. We manage your model lifecycle on a controlled cadence — quarterly refreshes, managed migrations, three deployment tiers. You own the decision to upgrade. We manage the execution.",
  },
];

type State = "no" | "partial" | "yes";

const COMPARISON: {
  capability: string;
  socio: string;
  publicAI: State;
  publicAILabel: string;
  diy: State;
  diyLabel: string;
  gateway: State;
  gatewayLabel: string;
}[] = [
  {
    capability: "Data stays in-perimeter",
    socio: "Always",
    publicAI: "no",
    publicAILabel: "Leaves your control",
    diy: "yes",
    diyLabel: "Yes",
    gateway: "partial",
    gatewayLabel: "Gateway only",
  },
  {
    capability: "Frontier model currency",
    socio: "Managed",
    publicAI: "yes",
    publicAILabel: "Vendor-controlled",
    diy: "no",
    diyLabel: "Falls behind",
    gateway: "partial",
    gatewayLabel: "Bring-your-own",
  },
  {
    capability: "Signed, replayable evidence",
    socio: "Built-in",
    publicAI: "no",
    publicAILabel: "None",
    diy: "partial",
    diyLabel: "Bolted on",
    gateway: "partial",
    gatewayLabel: "Gateway logs",
  },
  {
    capability: "Regulator-ready by design",
    socio: "Yes",
    publicAI: "no",
    publicAILabel: "No",
    diy: "partial",
    diyLabel: "Manual effort",
    gateway: "partial",
    gatewayLabel: "Pass / fail checks",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Deploy inside your environment",
    body: "SocioProphet installs in your private cloud or on-premise — no data crosses your perimeter.",
  },
  {
    step: "02",
    title: "Start with what you already use",
    body: "Noetica integrates Claude, GPT, Gemini, and more out of the box. Bring your existing API key and keep working.",
  },
  {
    step: "03",
    title: "Your brain compounds",
    body: "Every conversation, every document, every decision adds to your Hellagraph knowledge graph — automatically.",
  },
  {
    step: "04",
    title: "Every output is provable",
    body: "The neurosymbolic harness tags every output with how it was produced. Every action is cryptographically signed and replayable.",
  },
  {
    step: "05",
    title: "We keep you current",
    body: "Quarterly model updates, managed migrations. You own the upgrade decision. We manage the execution.",
  },
];

const WHO_ITS_FOR = [
  {
    title: "Banks, asset managers, and insurers",
    body: "Facing SR 26-2, APRA CPS 230, and EU AI Act obligations.",
  },
  {
    title: "Healthcare networks and medical practices",
    body: "Where patient data sovereignty is a legal obligation.",
  },
  {
    title: "Law firms and consultancies",
    body: "Where privilege and Chinese walls between engagements are structurally required.",
  },
  {
    title: "Software companies and platform operators",
    body: "Who want to add AI intelligence without building an AI team or exposing customer data.",
  },
];

const REGULATIONS: { label: string; href?: string }[] = [
  { label: "SR 26-2 (US)", href: "/solutions/sr26-2" },
  { label: "APRA CPS 230 (AU)" },
  { label: "EU AI Act" },
  { label: "FCA (UK)" },
  { label: "DORA" },
  { label: "MAS (SG)" },
];

function StatusCell({ state, label }: { state: State; label: string }) {
  const Icon = state === "yes" ? Check : state === "partial" ? Minus : X;
  const tone =
    state === "yes"
      ? "text-primary"
      : state === "partial"
        ? "text-muted-foreground"
        : "text-destructive/80";
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 shrink-0 ${tone}`} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
          <img src={heroAbstract} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium uppercase tracking-wider mb-8 fade-in-up">
              <ShieldCheck className="w-4 h-4" />
              <span>SocioProphet governs people, agents, and knowledge</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1] fade-in-up delay-100">
              Three ways to adopt AI. <br className="hidden md:block" />
              <span className="text-muted-foreground">All of them incomplete. Until now.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed fade-in-up delay-200">
              SocioProphet is the fourth path — a governed orchestration layer that sits
              underneath public AI, vendor platforms, and in-house agents alike, and makes
              every action provable. Your brain. Your agents. Your AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300">
              <Button asChild size="lg" className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm">
                <Link href="/platform">See How It Works</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm border-muted-foreground/30 hover:bg-muted-foreground/10">
                <Link href="/contact">Talk to Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The argument in five lines */}
      <section className="py-24 border-y border-border bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-mono text-primary uppercase tracking-widest mb-12">
            The argument in five lines
          </h2>
          <div className="grid gap-px bg-border border border-border">
            {ARGUMENT.map((line, i) => (
              <div key={i} className="flex items-start gap-6 bg-background p-6 md:p-8">
                <span className="font-mono text-primary text-lg font-bold shrink-0 w-10">
                  0{i + 1}
                </span>
                <p className="text-lg md:text-xl text-white leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Three Incomplete Paths */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Three ways to adopt AI. All of them incomplete.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-border bg-card">
              <h3 className="text-xl font-bold text-white mb-4">Public AI</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fast and capable — but your data, prompts, and institutional IP leave your control, with no record you can defend to an examiner.
              </p>
            </div>
            <div className="p-8 border border-border bg-card">
              <h3 className="text-xl font-bold text-white mb-4">A single vendor's platform</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-grade — but you are dependent on one lab's availability, roadmap, and commercial terms, with no portability and no way to fine-tune without sending data out.
              </p>
            </div>
            <div className="p-8 border border-border bg-card">
              <h3 className="text-xl font-bold text-white mb-4">In-house agents</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your teams are already building brilliant agents — completely ungoverned. Reasoning leaks into model providers, and nothing can be traced or replayed after the fact.
              </p>
            </div>
          </div>

          <div className="mt-8 border-l-2 border-primary bg-primary/5 p-8">
            <p className="text-lg md:text-xl text-white leading-relaxed">
              Each of these paths is incomplete on its own. SocioProphet doesn't compete with them.
              <span className="text-primary"> It is the fourth path: the governed layer that sits underneath all three and makes every action provable.</span>
            </p>
          </div>

          {/* SR 26-2 carve-out trigger */}
          <Link
            href="/solutions/sr26-2"
            className="group mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 border border-primary/30 bg-card hover:border-primary/60 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                <ScrollText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Banking on the US Federal Reserve's SR 26-2?</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  It excludes generative AI from model risk guidance — which means your bank owns the
                  governance gap. See how to close it in 60 days.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary shrink-0">
              SR 26-2 brief
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">The Fourth Path</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Govern what you already do. Own what you build. Never fall behind.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="p-8 border border-border bg-background relative overflow-hidden group">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-primary bg-primary/5 p-8">
            <p className="text-lg md:text-xl text-white leading-relaxed">
              SocioProphet is not an ambient-autonomy system. It is a governed operational
              intelligence stack with mathematically bounded safety, proof-bearing workflows,
              explicit reversibility, and a clear public-versus-restricted security boundary.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dive: Evidence Fabric */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-primary text-sm uppercase tracking-widest">The Evidence Fabric — why this can't be copied</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-4">
                Logs &ne; provenance. <br/>
                <span className="text-primary">Dashboards &ne; replay.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A log tells you a model was called. We tell you why, what it relied on, and let you replay it — because the governance is the architecture, not a layer we added on top. The <TermTooltip term="evidence-fabric">Evidence Fabric</TermTooltip> produces cryptographically signed, replayable provenance at every agent action. Not logs. Not dashboards. Full proof — and the <TermTooltip term="neurosymbolic-harness">neurosymbolic harness</TermTooltip> tags every output as stated, retrieved, inferred, or deduced, so your auditor, your regulator, and your risk committee can see exactly how much to trust it.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                  <span className="text-white">Cryptographically signed, replayable artifacts at every decision point</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                  <span className="text-white">Four reasoning modes: stated, retrieved, inferred, deduced</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                  <span className="text-white">Policy enforcement: Chinese walls, access permissions, task controls</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold uppercase tracking-wider text-sm">
                  <Link href="/platform" className="flex items-center gap-2">
                    Read the Platform Architecture <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold uppercase tracking-wider text-sm">
                  <Link href="/evidence" className="flex items-center gap-2">
                    See the Evidence <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] border border-border/50 bg-card p-2">
              <img src={evidenceFabric} alt="Cryptographic Evidence Fabric" className="w-full h-full object-cover filter grayscale opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* The Brain */}
      <section className="py-32 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-square md:aspect-[4/3] border border-border/50 bg-background p-2">
              <img src={platformMesh} alt="Platform Mesh" className="w-full h-full object-cover filter contrast-125" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Einstein for your company.<br/>But just for you.</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The system starts grounded in broad academic knowledge, then learns continuously from your work, in your environment, becoming an AI that thinks the way your organisation thinks — and only yours. Your AI-generated knowledge is intellectual property: it builds your moat, not someone else's model. No competitor benefits from your data, and no shared model trains on your experience.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-mono text-primary font-bold text-sm uppercase tracking-wider mb-2">Data Residency</h4>
                  <p className="text-sm text-muted-foreground">Runs in your private cloud (AWS, Azure, GCP, IBM) or on-premise hardware.</p>
                </div>
                <div>
                  <h4 className="font-mono text-primary font-bold text-sm uppercase tracking-wider mb-2">No Lock-in</h4>
                  <p className="text-sm text-muted-foreground">Full knowledge-graph export in standard formats available anytime.</p>
                </div>
              </div>
              <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold uppercase tracking-wider text-sm">
                <Link href="/products" className="flex items-center gap-2">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Where we stand apart — Comparison */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">Where we stand apart</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              One platform resolves what no alternative can
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[860px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-5 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium w-[22%]">
                    Capability
                  </th>
                  <th className="text-left p-5 font-bold text-white bg-primary/5 border-x border-primary/20 w-[20%]">
                    SocioProphet
                  </th>
                  <th className="text-left p-5 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium w-[19%]">
                    Public AI
                  </th>
                  <th className="text-left p-5 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium w-[19%]">
                    DIY build
                  </th>
                  <th className="text-left p-5 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium w-[20%]">
                    AI gateways
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-border">
                    <th scope="row" className="p-5 text-white font-medium align-top text-left">{row.capability}</th>
                    <td className="p-5 bg-primary/5 border-x border-primary/20 align-top">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0 text-primary" />
                        <span className="text-sm text-white font-semibold">{row.socio}</span>
                      </div>
                    </td>
                    <td className="p-5 align-top">
                      <StatusCell state={row.publicAI} label={row.publicAILabel} />
                    </td>
                    <td className="p-5 align-top">
                      <StatusCell state={row.diy} label={row.diyLabel} />
                    </td>
                    <td className="p-5 align-top">
                      <StatusCell state={row.gateway} label={row.gatewayLabel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold uppercase tracking-wider text-sm">
              <Link href="/compare" className="flex items-center gap-2">
                See the full comparison <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Education teaser */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 border border-primary/20 bg-primary/5">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Education</p>
                <h3 className="text-xl font-bold text-white mb-2">Not ready for a sales conversation?</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  Start with the fundamentals — why sovereign AI matters, how Noetica works, and which path makes sense for you. For individuals, families, teams, and organisations.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="rounded-none font-semibold uppercase tracking-wider text-xs shrink-0 border-primary/30 hover:bg-primary/10 h-12 px-8">
              <Link href="/education" className="flex items-center gap-2">
                Start with the fundamentals <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Inside your walls. Provable at every step.
            </h2>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              We don't take your data. We don't train on your data. We don't see your data.
              Everything runs inside your walls. And everything is provable.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((stage) => (
              <div key={stage.step} className="p-6 border border-border bg-background">
                <span className="font-mono text-3xl font-bold text-muted-foreground/30 block mb-6">{stage.step}</span>
                <h3 className="text-lg font-bold text-white mb-3">{stage.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{stage.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="font-mono text-primary text-sm uppercase tracking-widest mb-8">Who it's for</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHO_ITS_FOR.map((who) => (
                <div key={who.title} className="p-6 border border-border bg-background">
                  <h4 className="font-bold text-white mb-2">{who.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{who.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-l-2 border-primary bg-primary/5 p-8">
            <p className="text-lg text-white leading-relaxed">
              Regulated and under time pressure? Our{" "}
              <Link href="/solutions/sr26-2" className="text-primary underline-offset-4 hover:underline">
                60-day SR 26-2 readiness sprint
              </Link>{" "}
              takes you from discovery to a mock examination — evidenced from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Prophet Mesh */}
      <section className="py-24 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-12">
            <div>
              <span className="font-mono text-primary text-sm uppercase tracking-widest">Prophet Mesh</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
                One model is table stakes.<br />We give you a choir.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most AI platforms hand you one model and call it a day. Prophet Mesh gives you a choir — a curated ensemble of open-weight models running on your own hardware, arbitrated by a conductor that routes each task to the right specialist and re-aggregates results across up to eight model families. Cloud escalation only happens through your own API keys — the same bring-your-own-key model Noetica already offers for Claude, GPT, Gemini, Meta, Mistral, and Perplexity. No task goes anywhere you haven't already authorised.
              </p>
            </div>
            <div className="border-l border-border/40 pl-8 md:pl-12 pt-2">
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                "If a technical buyer says 'I could build that myself on Claude,' Prophet Mesh is the answer: this isn't a single-model wrapper."
              </p>
              <Button asChild variant="outline" className="mt-8 rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10">
                <Link href="/platform">See how it works</Link>
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                label: "Multi-model fan-out & re-aggregation",
                body: "Results combined across up to 8 model families — no single model is a single point of failure or a replication target.",
              },
              {
                label: "Dynamic, real-time routing",
                body: "Local vs cloud routing based on task complexity and live performance. No manual configuration required.",
              },
              {
                label: "Hardware-aware model selection",
                body: "The conductor chooses the right model for your hardware automatically. You set the policy — it executes.",
              },
            ].map((item) => (
              <div key={item.label} className="bg-background p-8">
                <h3 className="font-bold text-white mb-3 text-sm">{item.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Context */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <span className="font-mono text-primary text-sm uppercase tracking-widest">Why now</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            A regulatory wave is arriving now
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Governance is shifting from optional to mandatory. These frameworks don't prescribe a solution — they prescribe an obligation. SocioProphet provides structural support for the frameworks already in force.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {REGULATIONS.map((reg) =>
              reg.href ? (
                <Link
                  key={reg.label}
                  href={reg.href}
                  className="text-xl font-bold text-white hover:text-primary transition-colors underline-offset-8 hover:underline"
                >
                  {reg.label}
                </Link>
              ) : (
                <span key={reg.label} className="text-xl font-bold text-white opacity-70">
                  {reg.label}
                </span>
              ),
            )}
          </div>
          <div className="mt-12">
            <Button asChild variant="outline" className="rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10">
              <Link href="/solutions">Explore solutions by industry</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
