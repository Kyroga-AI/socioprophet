<template>
  <section class="sco" aria-label="Supply-chain orchestrator">
    <SurfaceHeader title="Supply-Chain Orchestrator" eyebrow="Marketplace · organize a chain">
      <template #badge><span class="sco-goal">{{ sc.goal }}</span></template>
      <template #actions>
        <button class="sco-btn primary" type="button" @click="sc.autoRecommend()">✦ Auto-compose</button>
        <button class="sco-btn ask" type="button" @click="askNoetica">◇ Recommend</button>
        <button class="sco-btn" type="button" @click="sc.reset()">Reset</button>
      </template>
    </SurfaceHeader>

    <!-- Summary -->
    <div class="sco-summary">
      <div class="sco-stat"><span>Landed cost/unit</span><b>{{ money(sc.totalCost) }}</b></div>
      <div class="sco-stat"><span>Total lead</span><b>{{ sc.totalLeadDays }}d</b></div>
      <div class="sco-stat"><span>Avg rating</span><b>{{ sc.ratingAvg.toFixed(1) }}★</b></div>
      <div class="sco-stat" :class="{ warn: sc.riskScore >= 50 }"><span>Chain risk</span><b :style="{ color: riskColor(sc.riskScore) }">{{ sc.riskScore }}</b></div>
      <div class="sco-stat"><span>Complete</span><b>{{ Math.round(sc.completeness * 100) }}%</b></div>
      <ProvenanceBadge :p="chainProv" />
    </div>

    <SplitPane storage-key="supply-orchestrate" label="stages" :initial="380">
      <template #list>
      <!-- Composer: stage by stage -->
      <div class="sco-stages">
        <div v-for="s in STAGES" :key="s.id" class="sco-stage">
          <div class="sco-stage-h">
            <span class="sco-stage-idx">{{ s.label }}</span>
            <span class="sco-stage-sel">{{ sel(s.id)?.name ?? 'choose a provider' }}</span>
          </div>
          <div class="sco-cands">
            <button
              v-for="p in providersForStage(s.id)"
              :key="p.id"
              class="sco-cand"
              :class="{ on: sc.selection[s.id] === p.id, rec: recId(s.id) === p.id }"
              type="button"
              @click="sc.selectProvider(s.id, p.id)"
            >
              <div class="sco-cand-top"><span class="sco-cand-name">{{ p.name }}</span><span v-if="recId(s.id) === p.id" class="sco-cand-rec">✦ best</span><span class="sco-cand-rep" :class="p.reputation">{{ p.reputation === 'verified' ? '✓' : '·' }}</span></div>
              <div class="sco-cand-meta">{{ p.kind }} · {{ p.geo.place }} <ReputationBadge :subject="p.name" /></div>
              <div class="sco-cand-stats"><span>{{ p.capacityPct }}% cap</span><span>{{ p.leadDays }}d</span><span>{{ money(p.unitCost) }}</span><span>{{ p.rating }}★</span></div>
            </button>
          </div>
        </div>
      </div>
      </template>

      <template #detail>

      <!-- Contracts + cross-links -->
      <aside class="sco-side">
        <button class="sco-compose" type="button" :disabled="sc.chosen.length === 0" @click="sc.composeContracts()">Compile governed contracts ▸</button>
        <p class="sco-side-note">Each stage becomes a membrane-admitted, sealed-receipt contract.</p>
        <div v-if="sc.contracts.length" class="sco-contracts">
          <div v-for="c in sc.contracts" :key="c.id" class="sco-ct" role="button" tabindex="0" :aria-label="`Advance ${stageLabel(c.stage)} contract with ${c.providerName}`" @click="sc.advance(c.id)" @keydown.enter.prevent="sc.advance(c.id)" @keydown.space.prevent="sc.advance(c.id)">
            <div class="sco-ct-h"><span class="sco-ct-stage">{{ stageLabel(c.stage) }}</span><span class="sco-ct-status" :class="c.status">{{ c.status }}</span></div>
            <div class="sco-ct-prov">{{ c.providerName }}</div>
            <div class="sco-ct-refs"><code>{{ c.grantRef }}</code><code>{{ c.receipt }}</code></div>
          </div>
          <p class="sco-side-note">Click a contract to advance: admitted → executing → settled.</p>
        </div>
        <div class="sco-trace">
          <span class="sco-trace-h">Trace across</span>
          <CrossLinks :links="traceLinks" />
        </div>
      </aside>
      </template>
    </SplitPane>
  </section>
</template>

<script setup lang="ts">
import SplitPane from '../components/SplitPane.vue';
import { computed, onMounted } from 'vue';
import SurfaceHeader from '../components/SurfaceHeader.vue';
import ProvenanceBadge from '../components/ProvenanceBadge.vue';
import CrossLinks from '../components/CrossLinks.vue';
import ReputationBadge from '../components/ReputationBadge.vue';
import { prov } from '../features/provenance/types';
import { STAGES, providersForStage, type Stage } from '../data/providersFixture';
import { scoreProvider, useSupplyChain } from '../stores/supplyChain';
import { useCockpit } from '../stores/cockpit';

const sc = useSupplyChain();
const cockpit = useCockpit();
const money = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: n >= 1000 ? 'compact' : 'standard', maximumFractionDigits: n >= 1000 ? 1 : 0 }).format(n);
const sel = (s: Stage) => sc.selectedProviders.find((x) => x.stage.id === s)?.provider;
const recId = (s: Stage) => [...providersForStage(s)].sort((a, b) => scoreProvider(b) - scoreProvider(a))[0]?.id;
const stageLabel = (s: Stage) => STAGES.find((x) => x.id === s)?.label ?? s;
const riskColor = (r: number) => (r >= 60 ? '#f0656a' : r >= 40 ? '#e3b341' : '#4bbf73');
const chainProv = computed(() => prov('computed', {
  verifier: 'orchestration engine',
  formula: 'landed cost = Σ stage unit-cost; lead = Σ stage lead; risk = f(capacity, rating, reputation)',
  sources: ['provider directory', 'capability membrane'],
  receipt: 'sha256:chain',
  note: 'The chain and its cost/lead/risk are computed; contracts are membrane-admitted with sealed receipts.',
}));
const traceLinks = computed(() => [
  { label: 'Supply chain map', surface: 'Supply Chain', icon: '⛓', to: { path: '/analytics/supply-chain' } },
  { label: 'Digital twin', surface: 'Digital Twin', icon: '◉', to: { path: '/analytics/digital-twin', query: { twin: 'copper-major' } } },
  { label: 'Marketplace', surface: 'Marketplace', icon: '▤', to: { path: '/marketplace' } },
]);
function askNoetica() {
  const stages = sc.selectedProviders.filter((x) => x.provider).map((x) => `${x.stage.label}: ${x.provider!.name}`).join(', ');
  cockpit.askAbout(`Review this supply chain for "${sc.goal}": ${stages || 'nothing selected yet'}. Landed cost ${money(sc.totalCost)}, lead ${sc.totalLeadDays}d, risk ${sc.riskScore}/100. What would you change to cut risk or cost, and where's the single point of failure?`);
}
onMounted(() => cockpit.setContext({ surface: 'Supply-Chain Orchestrator', entityLabel: sc.goal, detail: `${sc.chosen.length}/${STAGES.length} stages`, route: '/marketplace/orchestrate' }));
</script>

<style scoped>
.sco { height: 100%; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 0.9rem; padding: 1rem 1.25rem 1.5rem; background: var(--bg); color: var(--text); }
.sco-goal { font-size: 0.72rem; color: var(--text-2); border: 1px solid var(--line-2); border-radius: 999px; padding: 0.1rem 0.55rem; }
.sco-btn { border: 1px solid var(--line-2); background: transparent; color: var(--text-2); border-radius: 8px; padding: 0.35rem 0.7rem; font-size: 0.76rem; cursor: pointer; } .sco-btn:hover { color: var(--text); }
.sco-btn.primary { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }
.sco-btn.ask { border-color: rgba(120, 160, 255, 0.45); background: rgba(120, 160, 255, 0.08); color: #93b4ff; }
.sco-summary { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; border: 1px solid var(--line-2); border-radius: 12px; padding: 0.6rem 0.85rem; background: var(--surface); }
.sco-stat { display: flex; flex-direction: column; gap: 0.05rem; min-width: 6rem; } .sco-stat.warn { color: var(--down); }
.sco-stat span { font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); }
.sco-stat b { font-size: 1.05rem; font-variant-numeric: tabular-nums; }
.sco-body { display: grid; grid-template-columns: 1.6fr 1fr; gap: 0.9rem; }
@media (max-width: 1000px) { .sco-body { grid-template-columns: 1fr; } }
.sco-stages { display: flex; flex-direction: column; gap: 0.7rem; }
.sco-stage { border: 1px solid var(--line-2); border-radius: 12px; padding: 0.7rem 0.8rem; background: var(--surface); }
.sco-stage-h { display: flex; align-items: baseline; gap: 0.6rem; margin-bottom: 0.5rem; }
.sco-stage-idx { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-3); font-weight: 700; }
.sco-stage-sel { font-size: 0.82rem; font-weight: 600; color: var(--text); }
.sco-cands { display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: 0.5rem; }
.sco-cand { text-align: left; border: 1px solid var(--line-2); border-radius: 10px; padding: 0.55rem 0.6rem; background: var(--surface-2); color: var(--text); cursor: pointer; }
.sco-cand:hover { border-color: var(--text-3); }
.sco-cand.on { border-color: var(--accent); background: var(--accent-soft); }
.sco-cand.rec { box-shadow: inset 0 0 0 1px rgba(75, 191, 115, 0.4); }
.sco-cand-top { display: flex; align-items: center; gap: 0.35rem; }
.sco-cand-name { font-size: 0.82rem; font-weight: 600; flex: 1; }
.sco-cand-rec { font-size: 0.58rem; color: #4bbf73; font-weight: 700; }
.sco-cand-rep.verified { color: #4bbf73; } .sco-cand-rep.unrated { color: var(--text-3); }
.sco-cand-meta { font-size: 0.68rem; color: var(--text-3); margin-top: 0.15rem; }
.sco-cand-stats { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-2); font-variant-numeric: tabular-nums; }
.sco-side { display: flex; flex-direction: column; gap: 0.6rem; }
.sco-compose { border: none; border-radius: 9px; padding: 0.6rem; font-size: 0.85rem; font-weight: 700; cursor: pointer; background: var(--up); color: #06210f; } .sco-compose:disabled { opacity: 0.4; cursor: default; }
.sco-side-note { margin: 0; font-size: 0.68rem; color: var(--text-3); }
.sco-contracts { display: flex; flex-direction: column; gap: 0.4rem; }
.sco-ct { border: 1px solid var(--line-2); border-radius: 9px; padding: 0.5rem 0.6rem; background: var(--surface); cursor: pointer; } .sco-ct:hover { border-color: var(--text-3); }
.sco-ct-h { display: flex; align-items: center; justify-content: space-between; }
.sco-ct-stage { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); }
.sco-ct-status { font-size: 0.56rem; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; border-radius: 4px; padding: 0.03rem 0.35rem; }
.sco-ct-status.admitted { color: #93b4ff; background: rgba(120, 160, 255, 0.14); } .sco-ct-status.executing { color: #e3b341; background: rgba(227, 179, 65, 0.14); } .sco-ct-status.settled { color: var(--up); background: rgba(75, 191, 115, 0.14); }
.sco-ct-prov { font-size: 0.82rem; font-weight: 600; margin-top: 0.15rem; }
.sco-ct-refs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.2rem; } .sco-ct-refs code { font-size: 0.6rem; color: var(--text-3); font-family: ui-monospace, monospace; }
.sco-trace { border-top: 1px solid var(--line); padding-top: 0.6rem; } .sco-trace-h { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-3); display: block; margin-bottom: 0.4rem; }
</style>
