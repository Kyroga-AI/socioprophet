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
        title="Deployable capability on the control plane."
        subtitle="Three products, layered on the SocioProphet control plane and designed specifically for regulated operations — from the workspace your people use daily to the intelligence layer your engineers build on."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
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
        </div>
      </section>

      <CTASection
        title="Find the right entry point."
        subtitle="Most institutions start with Noetica, then expand. We will help you map products to your highest-value use cases."
      />
    </div>
  );
}
