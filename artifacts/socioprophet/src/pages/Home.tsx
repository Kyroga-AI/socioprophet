import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Database, Network } from "lucide-react";
import heroAbstract from "@/assets/images/hero-abstract.png";
import platformMesh from "@/assets/images/platform-mesh.png";
import evidenceFabric from "@/assets/images/evidence-fabric.png";

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
              Frontier-grade AI <br className="hidden md:block" />
              <span className="text-muted-foreground">you can hand to a regulator.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed fade-in-up delay-200">
              SocioProphet installs a governed AI control plane inside your environment. 
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

      {/* The Binary Trap Problem */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Binary Trap of Enterprise AI</h2>
            <p className="text-lg text-muted-foreground">
              Regulated institutions face an impossible choice: use public AI like ChatGPT and surrender control of your data and IP, or build your own and burn budget while falling irrevocably behind the frontier. SocioProphet is the third path.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-border bg-background relative overflow-hidden group">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Sovereignty</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Everything runs inside your environment. No data crosses your boundary. Your institutional knowledge never trains anyone else's model. Fully operational even air-gapped.
              </p>
            </div>
            
            <div className="p-8 border border-border bg-background relative overflow-hidden group">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Governance by Architecture</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Not a dashboard bolted on top. Every model call and agent action is cryptographically signed, evidenced, and replayable. Uncertainty is carried with full provenance to the decision.
              </p>
            </div>
            
            <div className="p-8 border border-border bg-background relative overflow-hidden group">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Managed Currency</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You never fall behind. SocioProphet continuously hardens, tests, and deploys new capability into your environment on a managed cadence. You always own your version of current.
              </p>
            </div>
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
                General AI governance tools govern on paper. SocioProphet governs at the foundational level. The Evidence Fabric tracks exactly what was retrieved, inferred, deduced, and stated. So your auditor, your regulator, and your risk committee can see exactly how much to trust it.
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
                  <p className="text-sm text-muted-foreground">Runs in your private cloud (AWS, Azure, GCP) or on-premise hardware.</p>
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
      
      {/* Regulatory Context */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h2 className="text-2xl font-mono text-muted-foreground uppercase tracking-widest mb-12">Built for the Global Regulatory Baseline</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <span className="text-xl font-bold text-white">SR 26-2 (US)</span>
            <span className="text-xl font-bold text-white">APRA CPS 230 (AU)</span>
            <span className="text-xl font-bold text-white">EU AI Act</span>
            <span className="text-xl font-bold text-white">FCA (UK)</span>
            <span className="text-xl font-bold text-white">DORA</span>
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
