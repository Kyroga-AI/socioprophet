import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Company() {
  return (
    <div className="w-full">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Our Thesis.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are an engineering-led infrastructure company building the foundations for enterprise AI accountability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Founding Vision</h2>
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                <p>
                  SocioProphet was founded on a simple premise: the most valuable organisations in the world cannot adopt frontier AI if it means surrendering their intellectual property or operating in a regulatory grey area.
                </p>
                <p>
                  We observed that existing AI governance tools were superficial—bolt-on dashboards that attempted to monitor "black box" API calls to external providers. They governed on paper, but offered no architectural guarantees. They collapsed complex probabilistic uncertainty into misleading "traffic light" indicators.
                </p>
                <p>
                  We believe true governance must be baked into the architecture itself.
                </p>
                <p>
                  By deploying a sovereign control plane entirely within the enterprise perimeter, and cryptographically signing every retrieval and inference step, we give risk committees and regulators exactly what they demand: explainability, accountability, and absolute data sovereignty.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-card border border-border p-10 mb-8">
                <h3 className="font-mono text-sm text-primary uppercase tracking-wider mb-4">Our Values</h3>
                <ul className="space-y-6">
                  <li>
                    <h4 className="font-bold text-white mb-2">Engineering Truth</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">No marketing spin on technical capabilities. We deal in cryptographic proofs, not probabilistic promises.</p>
                  </li>
                  <li>
                    <h4 className="font-bold text-white mb-2">Absolute Restraint</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">We build for the most risk-averse environments. Security and stability are prioritized above all.</p>
                  </li>
                  <li>
                    <h4 className="font-bold text-white mb-2">Customer Sovereignty</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Your data is yours. Your models are yours. We actively engineer against vendor lock-in.</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Join the Mission</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  We are actively recruiting exceptional systems engineers, cryptographers, and enterprise architects.
                </p>
                <Button asChild variant="outline" className="rounded-none border-primary/50 text-primary hover:bg-primary/20">
                  <Link href="/contact">View Open Roles</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
