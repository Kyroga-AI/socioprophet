import './_group.css';
import './ledger-copper.css';

import { ArrowDownRight, ArrowRight, Database, Network, ShieldCheck } from 'lucide-react';

const heroAbstract = '/__mockup/images/hero-abstract.png';
const evidenceFabric = '/__mockup/images/evidence-fabric.png';
const logoSrc = '/__mockup/images/socioprophet-logo.png';

const pillars = [
  ['01', Database, 'Build knowledge that compounds', 'Every question, document, and decision becomes a deposit in an intelligence asset that stays yours.'],
  ['02', Network, 'Keep intelligence in your control', 'Your reasoning, data, and decisions stay inside your environment. Sovereignty is the difference between renting intelligence and building one.'],
  ['03', ShieldCheck, 'Make it provable', 'Governance is infrastructure. Every AI decision can be signed, evidenced, and replayed.'],
] as const;

const stages = [
  ['01', 'Deploy inside your environment', 'Private cloud or on-premise. No data crosses your perimeter.'],
  ['02', 'Connect what you already use', 'Bring preferred models, vendor platforms, and existing agents.'],
  ['03', 'Govern every action', 'Policies control access while every action produces signed evidence.'],
  ['04', 'Let the asset compound', 'Organisational knowledge grows inside your boundary.'],
];

const regulations = [
  ['SR 26-2', 'United States'], ['APRA CPS 230', 'Australia'], ['EU AI Act', 'European Union'],
  ['FCA & MAS', 'United Kingdom & Singapore'], ['DORA', 'Brief in development'],
];

function Mark() {
  return <a href="#" onClick={(e) => e.preventDefault()} className="ledger-mark" aria-label="SocioProphet home">
    <img src={logoSrc} alt="" /><span>Socio<span>Prophet</span></span>
  </a>;
}

function LedgerCopper() {
  return (
    <div className="ledger-copper min-h-screen bg-background text-foreground font-sans antialiased">
      <aside className="ledger-rail">
        <Mark />
        <div className="ledger-rail-rule" />
        <p className="ledger-kicker">Intelligence / 001</p>
        <nav aria-label="Primary">
          {['Platform', 'Products', 'Solutions', 'Evidence', 'Education'].map((item, index) => (
            <a href={`#ledger-${index}`} key={item} onClick={(e) => e.preventDefault()}>
              <span>0{index + 1}</span>{item}
            </a>
          ))}
        </nav>
        <div className="ledger-rail-bottom">
          <span className="ledger-kicker">Sovereign infrastructure</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="ledger-rail-link">Request briefing <ArrowRight size={14} /></a>
        </div>
      </aside>

      <main className="ledger-main">
        <header className="ledger-mobile-header"><Mark /><a href="#" onClick={(e) => e.preventDefault()}>Briefing <ArrowRight size={14} /></a></header>

        <section className="ledger-hero" id="ledger-0">
          <div className="ledger-hero-copy">
            <div className="ledger-eyebrow"><ShieldCheck size={15} /> Build an intelligence asset you own</div>
            <p className="ledger-display-index">01 <span>/</span> THE CASE FOR OWNERSHIP</p>
            <h1>Are you renting<br /><em>intelligence,</em><br />or building one?</h1>
            <p className="ledger-lede">SocioProphet turns your organisation's use of AI into an asset you own. Sovereignty makes it yours. Governance makes it provable. Every use helps it compound inside your own walls.</p>
            <div className="ledger-actions">
              <a className="ledger-button" href="#" onClick={(e) => e.preventDefault()}>See the evidence <ArrowDownRight size={16} /></a>
              <a className="ledger-text-link" href="#" onClick={(e) => e.preventDefault()}>Request a briefing</a>
            </div>
          </div>
          <div className="ledger-hero-art">
            <img src={heroAbstract} alt="" />
            <div className="ledger-art-caption"><span>FIG. 01</span><span>Evidence / Provenance / Control</span></div>
          </div>
        </section>

        <section className="ledger-statement" id="ledger-1">
          <p className="ledger-kicker">The incomplete paths</p>
          <div>
            <h2>Your AI can create value.<br /><span>The question is where it accumulates.</span></h2>
            <p>Public models, a single vendor platform, and in-house agents can all help you work. Each remains incomplete if the intelligence they create does not become yours.</p>
          </div>
          <div className="ledger-paths">
            {[
              ['Public AI', 'Fast and capable — but your data, prompts, and institutional IP leave your control.'],
              ["A single vendor's platform", 'Enterprise-grade — but dependent on one lab’s roadmap, terms, and availability.'],
              ['In-house agents', 'Brilliant and ungoverned. Reasoning leaks into providers, with nothing to replay.'],
            ].map(([title, body]) => <article key={title}><span className="ledger-path-mark">×</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="ledger-fourth"><span>04</span><strong>SocioProphet is the fourth path.</strong><p>One layer that turns AI use into an owned asset — sovereign, provable, and compounding inside your environment.</p></div>
        </section>

        <section className="ledger-evidence" id="ledger-2">
          <div className="ledger-evidence-image"><img src={evidenceFabric} alt="Cryptographic Evidence Fabric" /><span>FIG. 02 / A decision you can reproduce</span></div>
          <div className="ledger-evidence-copy">
            <p className="ledger-kicker">The evidence fabric</p>
            <h2>Logs ≠ provenance.<br /><span>Dashboards ≠ replay.</span></h2>
            <p>A decision you cannot reproduce is not institutional knowledge. It is a rumour with a timestamp. The Evidence Fabric records why a model was called, what it relied on, and how to replay the result.</p>
            <ul><li>Cryptographically signed, replayable artifacts</li><li>Stated, retrieved, inferred, deduced</li><li>Policy enforcement at every decision point</li></ul>
            <a className="ledger-text-link" href="#" onClick={(e) => e.preventDefault()}>Read the platform architecture <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="ledger-pillars" id="ledger-3">
          <div className="ledger-section-heading"><p className="ledger-kicker">The return</p><h2>Sovereignty makes it yours.<br /><span>Governance makes it provable.</span></h2></div>
          <div className="ledger-pillar-list">{pillars.map(([number, Icon, title, body]) => <article key={number}><span className="ledger-number">{number}</span><Icon size={20} /><div><h3>{title}</h3><p>{body}</p></div><ArrowRight size={17} /></article>)}</div>
        </section>

        <section className="ledger-process" id="ledger-4">
          <div className="ledger-section-heading"><p className="ledger-kicker">The compounding loop</p><h2>Every question<br /><span>is a deposit.</span></h2><p>The only question is whose account it lands in.</p></div>
          <div className="ledger-stages">{stages.map(([number, title, body]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        </section>

        <section className="ledger-regulations">
          <div className="ledger-section-heading"><p className="ledger-kicker">Regulatory context</p><h2>The rules are moving.<br /><span>Build the asset.</span></h2><p>Govern risk, evidence decisions, and maintain control. Bring your regulatory interpretation.</p></div>
          <div className="ledger-reg-grid">{regulations.map(([title, region], index) => <a href="#" onClick={(e) => e.preventDefault()} key={title} className={index === 4 ? 'is-muted' : ''}><strong>{title}</strong><small>{region}</small>{index < 4 && <span>Read brief <ArrowRight size={13} /></span>}</a>)}</div>
        </section>

        <section className="ledger-cta"><p className="ledger-kicker">A better account for intelligence</p><h2>Build what<br /><em>your AI learns.</em></h2><a className="ledger-button" href="#" onClick={(e) => e.preventDefault()}>Request a briefing <ArrowRight size={16} /></a></section>
        <footer className="ledger-footer"><Mark /><p>SocioProphet turns AI use into an asset you own — sovereign, provable, and compounding inside your own walls.</p><span>© {new Date().getFullYear()} SocioProphet / Own your AI. Don't rent it.</span></footer>
      </main>
    </div>
  );
}

export { LedgerCopper };
export default LedgerCopper;