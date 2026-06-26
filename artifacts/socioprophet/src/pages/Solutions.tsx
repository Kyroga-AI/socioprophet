import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2, HeartPulse, Shield } from "lucide-react";

export function Solutions() {
  return (
    <div className="w-full">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/40 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Solutions by Industry.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Designed for the most heavily regulated environments in the world. Where compliance is non-negotiable and data sovereignty is critical.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Financial Services */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Financial Services</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Tier-1 banks and asset managers cannot risk sending proprietary trading strategies, client PII, or internal communications to public AI endpoints. Yet, failing to adopt AI risks massive productivity deficits.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  SocioProphet delivers frontier capabilities within the firewall, allowing quantitative analysts and wealth managers to leverage AI safely.
                </p>
                <blockquote className="border-l-2 border-primary pl-5 mb-8 italic text-white text-lg leading-relaxed">
                  &ldquo;Our portfolio managers use ungoverned tools &mdash; and ASIC is asking us to replay the reasoning.&rdquo;
                </blockquote>
                <div className="p-6 bg-card border border-border">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Regulatory Drivers</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• SR 26-2 (US Federal Reserve)</li>
                    <li>• APRA CPS 230 (Australia)</li>
                    <li>• FCA AI Framework (UK)</li>
                  </ul>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="p-6 border border-border bg-background">
                  <h4 className="font-bold text-white mb-2">Automated Compliance Review</h4>
                  <p className="text-sm text-muted-foreground">Instantly map new marketing materials or communications against internal policies with full cryptographic audit trails.</p>
                </div>
                <div className="p-6 border border-border bg-background">
                  <h4 className="font-bold text-white mb-2">Sovereign Research Analysis</h4>
                  <p className="text-sm text-muted-foreground">Synthesize millions of pages of market research without feeding your query thesis to external AI models.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Insurance</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Actuarial science and underwriting require deterministic reasoning and defensible decisions. "Black box" AI is unacceptable when assessing risk or processing claims.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  SocioProphet's Evidence Fabric ensures that every AI-assisted risk assessment carries its uncertainty to the decision point, fully explainable to regulators.
                </p>
                <div className="p-6 bg-card border border-border">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Regulatory Drivers</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• DORA (Digital Operational Resilience Act)</li>
                    <li>• EU AI Act</li>
                    <li>• Solvency II Directive</li>
                  </ul>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="p-6 border border-border bg-background">
                  <h4 className="font-bold text-white mb-2">Explainable Claims Processing</h4>
                  <p className="text-sm text-muted-foreground">Accelerate claims review with AI that cites the exact policy clauses driving its recommendations.</p>
                </div>
                <div className="p-6 border border-border bg-background">
                  <h4 className="font-bold text-white mb-2">Governed Underwriting Copilot</h4>
                  <p className="text-sm text-muted-foreground">Equip underwriters with deep historical context without violating strict data segregation rules.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Healthcare */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Healthcare & Life Sciences</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Patient data (PHI) is the most strictly protected data class globally. Public AI endpoints are fundamentally incompatible with HIPAA and equivalent frameworks.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  By running the models on your hardware, SocioProphet enables clinical research and administrative automation with absolute guarantee of zero data leakage.
                </p>
                <blockquote className="border-l-2 border-primary pl-5 mb-8 italic text-white text-lg leading-relaxed">
                  &ldquo;Our clinical AI infers things it was never told &mdash; and we can&rsquo;t show a regulator the difference.&rdquo;
                </blockquote>
                <div className="p-6 bg-card border border-border">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Regulatory Drivers</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• HIPAA / HITECH (US)</li>
                    <li>• GDPR (EU)</li>
                    <li>• EMA Regulations</li>
                  </ul>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="p-6 border border-border bg-background">
                  <h4 className="font-bold text-white mb-2">Clinical Trial Synthesis</h4>
                  <p className="text-sm text-muted-foreground">Analyze unstructured clinical trial data locally, maintaining strict PHI compliance.</p>
                </div>
                <div className="p-6 border border-border bg-background">
                  <h4 className="font-bold text-white mb-2">Sovereign Medical Coding</h4>
                  <p className="text-sm text-muted-foreground">Automate complex charting workflows securely within the hospital's private network.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
