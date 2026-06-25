import { ShieldCheck, Network, Lock, Cpu, Server, Activity } from "lucide-react";
import platformMesh from "@/assets/images/platform-mesh.png";

export function Platform() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              The Sovereign AI <br />Control Plane.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A deeply integrated architecture combining a governed model stable, secure control plane, and an immutable evidence fabric. Deployed entirely inside your perimeter.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Visual */}
      <section className="py-12 border-b border-border/40 bg-card/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="aspect-[21/9] md:aspect-[21/7] relative border border-border overflow-hidden bg-background">
            <img src={platformMesh} alt="Platform Architecture" className="w-full h-full object-cover filter contrast-125 opacity-70 mix-blend-lighten" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-32">
            
            {/* Control Plane */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                  <Network className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">The Control Plane</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  The routing and orchestration layer that connects your data, your employees, and the model stable securely. It enforces access controls, manages context limits, and ensures data never leaks across tenant boundaries or into the public internet.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Strict Role-Based Access Control (RBAC)</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Dynamic context window management</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Vector routing and semantic cache handling</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border p-8 aspect-square flex items-center justify-center">
                 <Server className="w-32 h-32 text-muted-foreground/20" strokeWidth={1} />
              </div>
            </div>

            {/* Governed Model Stable */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-card border border-border p-8 aspect-square flex items-center justify-center">
                 <Cpu className="w-32 h-32 text-muted-foreground/20" strokeWidth={1} />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">The Governed Model Stable</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  A curated suite of frontier-grade open-weight models (Llama, Mistral, Command) continuously hardened, fine-tuned, and deployed securely into your environment. You are never reliant on a single provider's API.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Models run 100% inside your infrastructure</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Managed cadence for updates and capability increases</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Immune to upstream deprecations or rate limits</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Evidence Fabric */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">The Evidence Fabric</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Every interaction, retrieval, and inference is cryptographically signed and logged. We don't just govern on paper — the architecture guarantees an immutable audit trail for every AI decision.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Cryptographic signatures on all agent actions</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Full provenance tracing from source document to output</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Replayable decision contexts for risk committees</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border p-8 aspect-square flex items-center justify-center">
                 <Lock className="w-32 h-32 text-muted-foreground/20" strokeWidth={1} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
