import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { PRODUCTS } from "@/pages/products/productData";

export function Products() {
  return (
    <div className="w-full">
      <PageHero
        eyebrow="The Product Family"
        title="SocioProphet is a platform, not a single product."
        subtitle="It governs the three incomplete ways of adopting AI — public models, single-vendor platforms, and in-house agents — through purpose-built product surfaces: from the governed workspace your people use daily to the control harness your organisation runs on."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group flex flex-col p-8 border border-border bg-card hover:border-primary/40 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
                  <p className="text-sm font-mono text-primary uppercase tracking-wider mb-6">
                    {product.tagline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    {product.intro}
                  </p>
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                    Explore {product.name}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-16">
            <h2 className="font-mono text-primary text-sm uppercase tracking-widest mb-8">
              Also on the platform
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-border bg-card">
                <h3 className="text-xl font-bold text-white mb-2">SocioSphere</h3>
                <p className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
                  DevSecOps workspace fabric
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Sovereign Git, CI/CD, and dependency intelligence for engineering teams —
                  the same governance and evidence guarantees, applied to how software gets built.
                </p>
              </div>
              <div className="p-8 border border-border bg-card">
                <h3 className="text-xl font-bold text-white mb-2">Lattice Forge</h3>
                <p className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
                  Agent builder
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Bespoke agent creation with governance controls — for enterprise teams building
                  branded AI assistants that inherit the evidence fabric by default.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Find the right entry point."
        subtitle="Most institutions start with Noetica, then expand. We will help you map products to your highest-value use cases."
      />
    </div>
  );
}
