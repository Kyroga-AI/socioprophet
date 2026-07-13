import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

const TEAM = [
  {
    name: "Michael Heller",
    role: "Founder, CEO & CTO — Philadelphia",
    bio: "Built the technical architecture. Sets the technical thesis: governance must be architectural, not a dashboard. Leads the engineering of the control plane, evidence fabric, and Hellagraph knowledge layer.",
    initials: "MH",
  },
  {
    name: "Gus Quiroga",
    role: "President & CRO — Sydney",
    bio: "Brings the commercial lens — C-level relationships across APAC financial services and deep working knowledge of the regulatory pressures that make governed AI an obligation.",
    initials: "GQ",
  },
  {
    name: "Keith Haller",
    role: "Sales & Business Development",
    bio: "Leads sales and business development, bringing deep enterprise data-platform relationships from prior roles at Databricks and Informatica.",
    initials: "KH",
  },
];

const NON_NEGOTIABLES = [
  "Your data never leaves your perimeter.",
  "Every decision is evidenced and replayable.",
  "You can export everything you build, at any time.",
  "We never train on your data.",
  "Human oversight bounds every control loop.",
  "High-risk actions require approval — never silent execution.",
];

export function Company() {
  return (
    <div className="w-full">
      <PageHero
        eyebrow="Company"
        title="Our thesis."
        subtitle="We are an engineering-led infrastructure company building the foundations for enterprise AI accountability."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The founding vision</h2>
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                <p>
                  SocioProphet was founded by Michael Heller and Gus Quiroga on a shared conviction:
                  every organisation's data and IP must remain sovereign — a structural requirement of
                  the AI era, not a preference. The most valuable organisations in the world cannot
                  adopt frontier AI if it means surrendering their intellectual property or operating
                  in a regulatory grey area.
                </p>
                <p>
                  We observed that existing AI governance tools were superficial — bolt-on dashboards
                  that attempted to monitor &ldquo;black box&rdquo; API calls to external providers.
                  They governed on paper, but offered no architectural guarantees. They collapsed
                  complex probabilistic uncertainty into misleading &ldquo;traffic light&rdquo;
                  indicators.
                </p>
                <p>We believe true governance must be baked into the architecture itself.</p>
                <p>
                  That is why the platform is deterministic and bounded by design: mathematically
                  bounded safety, proof-bearing workflows, explicit reversibility, and human
                  oversight on every control loop. Not ambient autonomy — governed operations.
                </p>
                <p>
                  By deploying a sovereign control plane entirely within the enterprise perimeter, and
                  cryptographically signing every retrieval and inference step, we give risk
                  committees and regulators exactly what they demand: explainability, accountability,
                  and absolute data sovereignty.
                </p>
                <p>
                  The platform is backed by 88 repositories and thousands of commits of
                  purpose-built infrastructure — each layer depending on the one below it. That is
                  why it cannot be replicated by bolting a feature onto an existing product.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-card border border-border p-10 mb-8">
                <h3 className="font-mono text-sm text-primary uppercase tracking-wider mb-4">
                  Our values
                </h3>
                <ul className="space-y-6">
                  <li>
                    <h4 className="font-bold text-white mb-2">Engineering truth</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      No marketing spin on technical capabilities. We deal in cryptographic proofs,
                      not probabilistic promises.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-bold text-white mb-2">Absolute restraint</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We build for the most risk-averse environments. Security and stability are
                      prioritised above all.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-bold text-white mb-2">Customer sovereignty</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your data is yours. Your models are yours. We actively engineer against vendor
                      lock-in.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non-negotiables */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">
              Our non-negotiables
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              The commitments we will not trade away
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {NON_NEGOTIABLES.map((item) => (
              <div key={item} className="flex items-start gap-4 bg-background p-8">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="text-lg text-white leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">The founding team</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="flex gap-6 p-8 border border-border bg-card">
                <div className="w-16 h-16 shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center font-mono font-bold text-primary text-lg">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-primary mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary/10 border border-primary/20 p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Join the mission</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We are actively recruiting exceptional systems engineers, cryptographers, and enterprise
              architects.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-primary/50 text-primary hover:bg-primary/20"
            >
              <Link href="/contact">View Open Roles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
