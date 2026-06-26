import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Database,
  Network,
  Check,
  X,
  Minus,
  Search,
  DownloadCloud,
  TrendingUp,
} from "lucide-react";
import heroAbstract from "@/assets/images/hero-abstract.png";
import platformMesh from "@/assets/images/platform-mesh.png";
import evidenceFabric from "@/assets/images/evidence-fabric.png";

const ARGUMENT = [
  "Every regulated institution faces a binary trap: use public AI and leak IP, or build your own and fall behind.",
  "SocioProphet is the third path — a governed AI control plane that runs entirely inside your environment.",
  "Three pillars hold it up: sovereignty, governance by architecture, and managed currency.",
  "Every model call and agent action is cryptographically signed, evidenced, and replayable.",
  "It is built for the regulatory wave now arriving: EU AI Act, SR 26-2, APRA CPS 230, FCA, DORA, MAS.",
];

const PILLARS = [
  {
    icon: Database,
    title: "Sovereignty",
    body: "Everything runs inside your environment — fully offline and air-gapped when required. No data crosses your boundary, and your institutional knowledge never trains anyone else's model.",
  },
  {
    icon: ShieldCheck,
    title: "Governance by architecture",
    body: "Not a dashboard bolted on top. Every model call and agent action is cryptographically signed, evidenced, and replayable — with uncertainty carried, with full provenance, to the decision.",
  },
  {
    icon: Network,
    title: "Managed currency",
    body: "You never fall behind. New capability is continuously hardened, tested, and deployed into your environment on a managed cadence. Frontier performance, without an internal AI arms race.",
  },
];

const COMPARISON: {
  capability: string;
  socio: string;
  publicAI: "no" | "partial" | "yes";
  publicAILabel: string;
  diy: "no" | "partial" | "yes";
  diyLabel: string;
}[] = [
  {
    capability: "Data stays in-perimeter",
    socio: "Always",
    publicAI: "no",
    publicAILabel: "Leaves your control",
    diy: "yes",
    diyLabel: "Yes",
  },
  {
    capability: "Frontier model currency",
    socio: "Managed",
    publicAI: "yes",
    publicAILabel: "Vendor-controlled",
    diy: "no",
    diyLabel: "Falls behind",
  },
  {
    capability: "Signed, replayable evidence",
    socio: "Built-in",
    publicAI: "no",
    publicAILabel: "None",
    diy: "partial",
    diyLabel: "Bolted on",
  },
  {
    capability: "Regulator-ready by design",
    socio: "Yes",
    publicAI: "no",
    publicAILabel: "No",
    diy: "partial",
    diyLabel: "Manual effort",
  },
];

const ENGAGEMENT = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    body: "Map your highest-value use cases against governance and risk requirements.",
  },
  {
    icon: DownloadCloud,
    step: "02",
    title: "Deploy",
    body: "Install the control plane inside your environment, governed from day one.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Scale",
    body: "Expand across teams and products as managed currency keeps you current.",
  },
];

function StatusCell({ state, label }: { state: "no" | "partial" | "yes"; label: string }) {
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
              <span>Sovereign Enterprise Infrastructure</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1] fade-in-up delay-100">
              Frontier AI <br className="hidden md:block" />
              <span className="text-muted-foreground">you can hand to a regulator.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed fade-in-up delay-200">
              Sovereign, governed enterprise AI — with your data inside your walls.
              Your brain. Your agents. Your AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300">
              <Button asChild size="lg" className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm">
                <Link href="/contact">Request a Briefing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm border-muted-foreground/30 hover:bg-muted-foreground/10">
                <Link href="/platform">Explore the Platform</Link>
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

      {/* The Binary Trap */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Every regulated institution is caught in the same trap
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-border bg-card">
              <h3 className="text-xl font-bold text-white mb-4">Use public AI</h3>
              <p className="text-muted-foreground leading-relaxed">
                ChatGPT and Copilot send your data, prompts, and institutional IP outside your control — with no record you can defend.
              </p>
            </div>
            <div className="p-8 border border-border bg-card">
              <h3 className="text-xl font-bold text-white mb-4">Build your own</h3>
              <p className="text-muted-foreground leading-relaxed">
                You fall behind the frontier and burn budget chasing it, with no team large enough to keep pace.
              </p>
            </div>
          </div>

          <div className="mt-8 border-l-2 border-primary bg-primary/5 p-8">
            <p className="text-lg md:text-xl text-white leading-relaxed">
              No product in market resolves both sides of this trap at once. There is no third option —
              <span className="text-primary"> that is what SocioProphet is built to be.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">The Third Path</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Sovereign, governed, and always current — at the same time
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
        </div>
      </section>

      {/* Deep Dive: Evidence Fabric */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                They collapse uncertainty into a traffic light. <br/>
                <span className="text-primary">We carry it to the decision.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                General AI governance tools govern on paper. SocioProphet governs at the foundational level. The Evidence Fabric tracks exactly what was retrieved, inferred, deduced, and stated. So your auditor, your regulator, and your risk committee can see exactly how much to trust each output.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                  <span className="text-white">Cryptographically signed interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                  <span className="text-white">Full provenance of retrieval and inference</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                  <span className="text-white">Immutable audit trails for compliance reporting</span>
                </li>
              </ul>
              <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold uppercase tracking-wider text-sm">
                <Link href="/platform" className="flex items-center gap-2">
                  Read the Platform Architecture <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
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
                The system starts grounded in broad academic knowledge, then learns continuously from your work, in your environment, becoming an AI that thinks the way your organisation thinks — and only yours. No competitor benefits from your data.
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
              One platform resolves what neither alternative can
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-5 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium w-[28%]">
                    Capability
                  </th>
                  <th className="text-left p-5 font-bold text-white bg-primary/5 border-x border-primary/20 w-[24%]">
                    SocioProphet
                  </th>
                  <th className="text-left p-5 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium w-[24%]">
                    Public AI
                  </th>
                  <th className="text-left p-5 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium w-[24%]">
                    DIY build
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-border">
                    <td className="p-5 text-white font-medium align-top">{row.capability}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How we engage */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">How we engage</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              From first use case to enterprise scale
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT.map((stage) => (
              <div key={stage.step} className="p-8 border border-border bg-background">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                    <stage.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-mono text-3xl font-bold text-muted-foreground/30">{stage.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{stage.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{stage.body}</p>
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
            Governance is shifting from optional to mandatory — and the buying window is open. SocioProphet maps directly to the frameworks already in force.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <span className="text-xl font-bold text-white">SR 26-2 (US)</span>
            <span className="text-xl font-bold text-white">APRA CPS 230 (AU)</span>
            <span className="text-xl font-bold text-white">EU AI Act</span>
            <span className="text-xl font-bold text-white">FCA (UK)</span>
            <span className="text-xl font-bold text-white">DORA</span>
            <span className="text-xl font-bold text-white">MAS (SG)</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-primary/5 relative overflow-hidden border-t border-primary/20">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to secure your AI frontier?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Schedule a briefing to discuss how SocioProphet can deploy a sovereign, governed AI infrastructure within your organisation.
          </p>
          <Button asChild size="lg" className="rounded-none font-semibold uppercase tracking-wider h-14 px-10 text-sm">
            <Link href="/contact">Request a Briefing</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
