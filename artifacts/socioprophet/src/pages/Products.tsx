import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, BarChart3, Database } from "lucide-react";

export function Products() {
  return (
    <div className="w-full">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              The Product Family.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Deployable capability layered on top of the SocioProphet control plane. Designed specifically for regulated operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-8">
            
            {/* Noetica */}
            <div className="border border-border bg-card overflow-hidden">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-background p-12 border-r border-border flex flex-col justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                    <Box className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Noetica</h2>
                  <p className="text-sm font-mono text-primary uppercase tracking-wider mb-6">The Governed Workspace</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    "ChatGPT you can hand to a regulator." The ultimate wedge product — providing safe, sovereign conversational AI and document analysis to your entire workforce without data leaving the perimeter.
                  </p>
                  <Button asChild variant="outline" className="w-fit rounded-none border-border">
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                </div>
                <div className="md:col-span-3 p-12 flex flex-col justify-center">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-6">Capabilities</h3>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-white mb-2">Secure Chat</h4>
                      <p className="text-sm text-muted-foreground">Conversational interfaces backed by frontier models that never train on your inputs.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Document Analysis</h4>
                      <p className="text-sm text-muted-foreground">Upload secure PDFs and internal documents for governed summarisation and extraction.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Source Attribution</h4>
                      <p className="text-sm text-muted-foreground">Every factual claim cites its specific location in your internal documentation.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Audit Trails</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive logs of all user prompts and system responses for compliance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Profit Platform */}
            <div className="border border-border bg-card overflow-hidden">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-background p-12 border-r border-border flex flex-col justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">The Profit Platform</h2>
                  <p className="text-sm font-mono text-primary uppercase tracking-wider mb-6">Enterprise Intelligence Layer</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Advanced capability for technical teams. Fine-tune models securely, orchestrate complex agent teams, and deploy custom intelligence workflows across the enterprise.
                  </p>
                  <Button asChild variant="outline" className="w-fit rounded-none border-border">
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                </div>
                <div className="md:col-span-3 p-12 flex flex-col justify-center">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-6">Capabilities</h3>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-white mb-2">In-Perimeter Fine-Tuning</h4>
                      <p className="text-sm text-muted-foreground">Train models safely on your proprietary data without sending it to external APIs.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Agent Orchestration</h4>
                      <p className="text-sm text-muted-foreground">Build, test, and deploy multi-agent workflows for complex reasoning tasks.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Model Evaluation</h4>
                      <p className="text-sm text-muted-foreground">Automated benchmarks to prove model safety and accuracy to risk committees.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">API Gateway</h4>
                      <p className="text-sm text-muted-foreground">Securely expose governed AI endpoints to your internal applications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hellagraph */}
            <div className="border border-border bg-card overflow-hidden">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-background p-12 border-r border-border flex flex-col justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Hellagraph</h2>
                  <p className="text-sm font-mono text-primary uppercase tracking-wider mb-6">Knowledge Infrastructure</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    The proprietary, high-performance knowledge graph that structures your enterprise data. It transforms unstructured silos into a deeply connected, AI-readable brain.
                  </p>
                  <Button asChild variant="outline" className="w-fit rounded-none border-border">
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                </div>
                <div className="md:col-span-3 p-12 flex flex-col justify-center">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-6">Capabilities</h3>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-white mb-2">Ontology Mapping</h4>
                      <p className="text-sm text-muted-foreground">Automatically infer relationships between disparate internal documents.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Semantic Search</h4>
                      <p className="text-sm text-muted-foreground">Ultra-fast retrieval with full context awareness for accurate grounding.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Portable Export</h4>
                      <p className="text-sm text-muted-foreground">Full extraction of your graph in standard formats—zero vendor lock-in.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Access Segregation</h4>
                      <p className="text-sm text-muted-foreground">Graph-level enforcement of departmental permissions and firewalls.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
