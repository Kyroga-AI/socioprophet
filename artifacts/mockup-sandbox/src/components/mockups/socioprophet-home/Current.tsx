import './_group.css';

import type { ReactNode } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Database,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Asset paths (public folder, served at /__mockup/images/) ────────────────
const heroAbstract = "/__mockup/images/hero-abstract.png";
const evidenceFabric = "/__mockup/images/evidence-fabric.png";
const logoSrc = "/__mockup/images/socioprophet-logo.png";

// ─── Inlined glossary + TermTooltip ─────────────────────────────────────────
const GLOSSARY: Record<string, string> = {
  "evidence-fabric":
    "Every AI action gets a cryptographically signed, replayable record — not a log, a proof. When a regulator asks \"prove what your AI did,\" this is the answer no dashboard or wrapper can fake.",
  "neurosymbolic-harness":
    "Every answer is tagged by how it was made — stated, retrieved, inferred, or deduced. Most AI can't tell you which. This can, which is what makes the evidence trail actually trustworthy.",
};

function TermTooltip({ term, children }: { term: string; children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            className="cursor-help underline decoration-dotted decoration-primary/60 underline-offset-4 hover:decoration-primary hover:text-white focus-visible:decoration-primary focus-visible:text-white focus-visible:outline-none transition-colors"
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs bg-card text-foreground border border-primary/30 px-4 py-3 text-sm leading-relaxed shadow-xl"
        >
          {GLOSSARY[term] ?? term}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: Database,
    title: "Build knowledge that compounds",
    body: "Every question, document, and decision can become a deposit in an intelligence asset that stays yours and grows with use.",
  },
  {
    icon: Network,
    title: "Keep intelligence in your control",
    body: "Your reasoning, data, and decisions stay inside your environment. Sovereignty is the difference between renting intelligence and building one.",
  },
  {
    icon: ShieldCheck,
    title: "Make it provable",
    body: "Governance is infrastructure, not paperwork. Every AI decision can be signed, evidenced, and replayed — not logged after the fact and hoped for.",
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
    title: "Let the asset compound",
    body: "Your organisational knowledge grows inside your boundary while managed migrations keep your model choices current.",
  },
];

const REGULATIONS: { label: string; region: string; href?: string }[] = [
  { label: "SR 26-2", region: "United States", href: "#" },
  { label: "APRA CPS 230", region: "Australia", href: "#" },
  { label: "EU AI Act", region: "European Union", href: "#" },
  { label: "FCA & MAS", region: "United Kingdom & Singapore", href: "#" },
  { label: "DORA", region: "Brief in development" },
];

// ─── Inlined Header ──────────────────────────────────────────────────────────
function Header() {
  const links = [
    { href: "#", label: "Platform" },
    { href: "#", label: "Products" },
    { href: "#", label: "Solutions" },
    { href: "#", label: "Compare" },
    { href: "#", label: "Evidence" },
    { href: "#", label: "Education" },
    { href: "#", label: "Company" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" aria-label="SocioProphet home" className="flex items-center gap-2 shrink-0">
            <img
              src={logoSrc}
              alt=""
              className="size-8 md:size-9 object-contain shrink-0"
            />
            <span className="font-sans font-bold text-lg md:text-xl tracking-tight text-white">
              Socio<span className="text-primary">Prophet</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => e.preventDefault()}
                className="text-sm font-medium transition-colors hover:text-white text-muted-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden md:block text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            Contact
          </a>
          <Button
            asChild
            className="rounded-none font-semibold uppercase tracking-wider text-[11px] md:text-xs px-4 md:px-6"
          >
            <a href="#" onClick={(e) => e.preventDefault()}>Request Briefing</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

// ─── Inlined CTASection ───────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-32 bg-primary/5 relative overflow-hidden border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Build what your AI learns.
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          SocioProphet turns daily AI use into a sovereign, governed, compounding knowledge asset
          inside your organisation.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-none font-semibold uppercase tracking-wider h-14 px-10 text-sm"
        >
          <a href="#" onClick={(e) => e.preventDefault()}>Request a Briefing</a>
        </Button>
      </div>
    </section>
  );
}

// ─── Inlined Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50 py-16 mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="SocioProphet home" className="flex items-center gap-2 mb-4">
              <img src={logoSrc} alt="" className="size-10 object-contain shrink-0" />
              <span className="font-sans font-bold text-xl tracking-tight text-white">
                Socio<span className="text-primary">Prophet</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              SocioProphet turns your organisation's use of AI into an asset you own — sovereign,
              provable, and compounding inside your own walls.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-3">
              {["Control Plane", "Model Choir", "Evidence Fabric", "Evidence & Benchmarks", "Compare"].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white mb-4">Products &amp; Solutions</h4>
            <ul className="space-y-3">
              {["Noetica", "Prophet Platform", "SCOPE-D", "Hellagraph", "SR 26-2", "All Solutions"].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white mb-4">Learn</h4>
            <ul className="space-y-3">
              {["Education", "Why Sovereign AI", "How Noetica Works", "About Us", "Contact", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SocioProphet. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
              Own your AI. Don't rent it.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function Current() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />

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
                <span>Build an intelligence asset you own</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1] fade-in-up delay-100">
                Are you renting intelligence, <br className="hidden md:block" />
                <span className="text-muted-foreground">or building one?</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed fade-in-up delay-200">
                SocioProphet turns your organisation's use of AI into an asset you own. Sovereignty
                makes it yours. Governance makes it provable. Every use helps it compound inside
                your own walls.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300">
                <Button
                  asChild
                  size="lg"
                  className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm"
                >
                  <a href="#" onClick={(e) => e.preventDefault()}>See the Evidence</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-none font-semibold uppercase tracking-wider h-14 px-8 text-sm border-muted-foreground/30 hover:bg-muted-foreground/10"
                >
                  <a href="#" onClick={(e) => e.preventDefault()}>Request a Briefing</a>
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
                Your AI can create value. The question is where it accumulates.
              </h2>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
                Public models, a single vendor platform, and in-house agents can all help you work.
                Each remains incomplete if the intelligence they create does not become yours.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="py-8 border-t border-border">
                <h3 className="text-xl font-bold text-white mb-4">Public AI</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fast and capable — but your data, prompts, and institutional IP leave your control,
                  with no record you can defend to an examiner.
                </p>
              </div>
              <div className="py-8 border-t border-border">
                <h3 className="text-xl font-bold text-white mb-4">A single vendor's platform</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Enterprise-grade — but you are dependent on one lab's availability, roadmap, and
                  commercial terms, with no portability and no way to fine-tune without sending data out.
                </p>
              </div>
              <div className="py-8 border-t border-border">
                <h3 className="text-xl font-bold text-white mb-4">In-house agents</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your teams are already building brilliant agents — completely ungoverned. Reasoning
                  leaks into model providers, and nothing can be traced or replayed after the fact.
                </p>
              </div>
            </div>

            <div className="mt-6 border border-primary/25 bg-primary/5 p-8 md:p-10">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                SocioProphet is the fourth path: one layer that turns AI use into an owned asset —
                sovereign, provable, and compounding inside your environment.
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
                  Logs ≠ provenance. <br />
                  <span className="text-primary">Dashboards ≠ replay.</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  A decision you cannot reproduce is not institutional knowledge. It is a rumour with
                  a timestamp. The{" "}
                  <TermTooltip term="evidence-fabric">Evidence Fabric</TermTooltip>{" "}
                  records why a model was called, what it relied on, and how to replay the result.
                  Every agent action produces cryptographically signed provenance, while the{" "}
                  <TermTooltip term="neurosymbolic-harness">neurosymbolic harness</TermTooltip>{" "}
                  distinguishes what was stated, retrieved, inferred, or deduced.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white">
                      Cryptographically signed, replayable artifacts at every decision point
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white">
                      Four reasoning modes: stated, retrieved, inferred, deduced
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white">
                      Policy enforcement: information barriers, access permissions, task controls
                    </span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    asChild
                    variant="link"
                    className="text-primary p-0 h-auto font-semibold uppercase tracking-wider text-sm"
                  >
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
                      Read the Platform Architecture <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="link"
                    className="text-primary p-0 h-auto font-semibold uppercase tracking-wider text-sm"
                  >
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
                      See the Evidence <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square md:aspect-[4/3] border border-border/50 bg-card p-2">
                <img
                  src={evidenceFabric}
                  alt="Cryptographic Evidence Fabric"
                  className="w-full h-full object-cover filter grayscale opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Sovereignty makes it yours. Governance makes it provable. Compounding knowledge is
                the return.
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
              <Button
                asChild
                variant="outline"
                className="rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10"
              >
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
                  Explore the Platform <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Every question is a deposit.
              </h2>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
                The only question is whose account it lands in. Keep the work your people do with AI
                inside your environment, where it can become knowledge your organisation owns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 border-y border-border">
              {HOW_IT_WORKS.map((stage) => (
                <div
                  key={stage.step}
                  className="py-8 md:px-6 first:pl-0 border-b md:border-b-0 md:border-r border-border last:border-0"
                >
                  <span className="font-mono text-sm font-bold text-primary block mb-5">
                    {stage.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">{stage.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{stage.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="outline"
                className="rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10"
              >
                <a href="#" onClick={(e) => e.preventDefault()}>Read the Platform Architecture</a>
              </Button>
              <Button
                asChild
                variant="link"
                className="text-primary px-0 h-auto font-semibold uppercase tracking-wider text-xs sm:px-4"
              >
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
                  Compare the alternatives <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Regulatory Context */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                The rules are moving. Build the asset, not just the paperwork.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These frameworks are evidence of a shift: organisations must be able to govern risk,
                evidence decisions, and maintain control. SocioProphet provides structural support —
                you bring your regulatory interpretation.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-y border-border">
              {REGULATIONS.map((reg) =>
                reg.href ? (
                  <a
                    key={reg.label}
                    href={reg.href}
                    onClick={(e) => e.preventDefault()}
                    className="group py-7 sm:px-6 first:pl-0 border-b sm:border-b-0 sm:border-r border-border last:border-0 hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-lg font-bold text-white group-hover:text-primary transition-colors block">
                      {reg.label}
                    </span>
                    <span className="text-xs text-muted-foreground mt-2 block">{reg.region}</span>
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-primary mt-5">
                      Read brief <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                ) : (
                  <div
                    key={reg.label}
                    className="py-7 sm:px-6 first:pl-0 border-b sm:border-b-0 sm:border-r border-border last:border-0"
                  >
                    <span className="text-lg font-bold text-white/60 block">{reg.label}</span>
                    <span className="text-xs text-muted-foreground mt-2 block">{reg.region}</span>
                  </div>
                ),
              )}
            </div>
            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                className="rounded-none font-semibold uppercase tracking-wider text-xs border-muted-foreground/30 hover:bg-muted-foreground/10"
              >
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
                  Explore all solutions <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <CTASection />
      </div>

      <Footer />
    </div>
  );
}
