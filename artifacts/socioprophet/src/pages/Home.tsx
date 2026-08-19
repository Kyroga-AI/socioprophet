import { TermTooltip } from "@/components/TermTooltip";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Database,
  Network,
} from "lucide-react";
import heroAbstract from "@/assets/images/hero-abstract.png";
import evidenceFabric from "@/assets/images/evidence-fabric.png";
import { CTASection } from "@/components/sections/CTASection";

const PILLARS = [
  {
    icon: Network,
    title: "Govern what you already use",
    body: "Keep your preferred models, vendor platforms, and in-house agents. SocioProphet sits underneath them as one governed control layer.",
  },
  {
    icon: Database,
    title: "Keep knowledge in your control",
    body: "Your data, prompts, and organisational knowledge stay inside your environment and remain portable. Your AI-generated knowledge compounds for you alone.",
  },
  {
    icon: ShieldCheck,
    title: "Stay current without surrendering control",
    body: "You choose when to upgrade. SocioProphet manages model lifecycle and migration while preserving your policies, provenance, and knowledge.",
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
    title: "Connect what you already use",
    body: "Bring your preferred models, vendor platforms, and existing agents without replacing the systems your teams rely on.",
  },
  {
    step: "03",
    title: "Govern every action",
    body: "Policies control what people and agents can access, while every action produces signed, replayable evidence.",
  },
  {
    step: "04",
    title: "Keep knowledge and models current",
    body: "Your organisational knowledge compounds inside your environment while managed migrations keep your model choices current.",
  },
];

const REGULATIONS: { label: string; region: string; href?: string }[] = [
  { label: "SR 26-2", region: "United States", href: "/solutions/sr26-2" },
  { label: "APRA CPS 230", region: "Australia", href: "/solutions/apra-cps-230" },
  { label: "EU AI Act", region: "European Union", href: "/solutions/eu-ai-act" },
  { label: "FCA & MAS", region: "United Kingdom & Singapore", href: "/solutions/fca-mas" },
  { label: "DORA", region: "Brief in development" },
];

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
              Keep the AI you chose. <br className="hidden md:block" />
              <span className="text-muted-foreground">Make every action provable.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed fade-in-up delay-200">
              SocioProphet is the fourth path: one governed orchestration layer beneath your
              models, vendor platforms, and in-house agents. It runs inside your environment
              and turns every decision into signed, replayable evidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300">
              <Button asChild size="lg" className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm">
                <Link href="/evidence">See the Evidence</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm border-muted-foreground/30 hover:bg-muted-foreground/10">
                <Link href="/contact">Request a Briefing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Incomplete Paths */}
      <section className="py-24 border-y border-border bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Every adoption path leaves a governance gap.
            </h2>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Public models, a single vendor platform, and in-house agents all create value.
              Each remains incomplete without a governed layer beneath it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="py-8 border-t border-border">
              <h3 className="text-xl font-bold text-white mb-4">Public AI</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fast and capable — but your data, prompts, and institutional IP leave your control, with no record you can defend to an examiner.
              </p>
            </div>
            <div className="py-8 border-t border-border">
              <h3 className="text-xl font-bold text-white mb-4">A single vendor's platform</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-grade — but you are dependent on one lab's availability, roadmap, and commercial terms, with no portability and no way to fine-tune without sending data out.
              </p>
            </div>
            <div className="py-8 border-t border-border">
              <h3 className="text-xl font-bold text-white mb-4">In-house agents</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your teams are already building brilliant agents — completely ungoverned. Reasoning leaks into model providers, and nothing can be traced or replayed after the fact.
              </p>
            </div>
          </div>

          <div className="mt-6 border border-primary/25 bg-primary/5 p-8 md:p-10">
            <p className="text-lg md:text-xl text-white leading-relaxed">
              SocioProphet does not replace these paths. It completes them with one governed layer
              for people, agents, and knowledge — inside your environment.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dive: Evidence Fabric */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Logs &ne; provenance. <br/>
                <span className="text-primary">Dashboards &ne; replay.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A log tells you a model was called. The <TermTooltip term="evidence-fabric">Evidence Fabric</TermTooltip> records why it was called, what it relied on, and how to replay the result. Every agent action produces cryptographically signed provenance, while the <TermTooltip term="neurosymbolic-harness">neurosymbolic harness</TermTooltip> distinguishes what was stated, retrieved, inferred, or deduced.
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

      {/* Three Pillars */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              One governed layer changes what your AI can safely become.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="py-8 border-t border-border">
                <div className="w-11 h-11 bg-primary/10 flex items-center justify-center mb-6">
                  <pillar.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild variant="outline" className="rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10">
              <Link href="/platform" className="flex items-center gap-2">
                Explore the Platform <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Inside your walls. Provable at every step.
            </h2>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              We don't take your data. We don't train on your data. We don't see your data.
              Everything runs inside your walls. And everything is provable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border-y border-border">
            {HOW_IT_WORKS.map((stage) => (
              <div key={stage.step} className="py-8 md:px-6 first:pl-0 border-b md:border-b-0 md:border-r border-border last:border-0">
                <span className="font-mono text-sm font-bold text-primary block mb-5">{stage.step}</span>
                <h3 className="text-lg font-bold text-white mb-3">{stage.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{stage.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline" className="rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10">
              <Link href="/platform">Read the Platform Architecture</Link>
            </Button>
            <Button asChild variant="link" className="text-primary px-0 h-auto font-semibold uppercase tracking-wider text-xs sm:px-4">
              <Link href="/compare" className="flex items-center gap-2">
                Compare the alternatives <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Regulatory Context */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Start with the framework already shaping your decisions.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These frameworks do not prescribe a technology. They create an obligation to
              govern risk, evidence decisions, and maintain control. SocioProphet provides
              structural support — you bring your regulatory interpretation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-y border-border">
            {REGULATIONS.map((reg) =>
              reg.href ? (
                <Link
                  key={reg.label}
                  href={reg.href}
                  className="group py-7 sm:px-6 first:pl-0 border-b sm:border-b-0 sm:border-r border-border last:border-0 hover:bg-primary/5 transition-colors"
                >
                  <span className="text-lg font-bold text-white group-hover:text-primary transition-colors block">
                    {reg.label}
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 block">{reg.region}</span>
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-primary mt-5">
                    Read brief <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ) : (
                <div key={reg.label} className="py-7 sm:px-6 first:pl-0 border-b sm:border-b-0 sm:border-r border-border last:border-0">
                  <span className="text-lg font-bold text-white/60 block">{reg.label}</span>
                  <span className="text-xs text-muted-foreground mt-2 block">{reg.region}</span>
                </div>
              ),
            )}
          </div>
          <div className="mt-10">
            <Button asChild variant="outline" className="rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10">
              <Link href="/solutions" className="flex items-center gap-2">
                Explore all solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
