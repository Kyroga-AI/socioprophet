<template>
  <section class="cp" aria-label="Organization control plane">
    <SurfaceHeader title="Control Plane" eyebrow="Organization · Noetica governance">
      <template #badge><span class="cp-pill">fixture · demo org</span></template>
      <template #actions>
        <div class="cp-kpis">
          <span class="cp-kpi"><b>{{ seats.length }}</b> seats</span>
          <span class="cp-kpi"><b>{{ activeCount }}</b> active</span>
          <span class="cp-kpi warn" :class="{ hot: queue.length }"><b>{{ queue.length }}</b> in review</span>
          <span class="cp-kpi ok"><b>{{ admittedToday }}</b> admitted today</span>
          <span v-if="riskCount" class="cp-kpi risk"><b>{{ riskCount }}</b> autonomy&gt;reputation</span>
        </div>
      </template>
    </SurfaceHeader>

    <p class="cp-lede">The management plane for fielding Noetica to your people: who has it and at what <b>autonomy level</b>, the <b>governance queue</b> of what it proposed pending admission, the <b>policy</b> that bounds it, and the <b>audit</b> trail. Every item carries its governed status and ontogenesis Ω grade.</p>

    <div class="cp-grid">
      <!-- Governance queue — the review inbox -->
      <section class="cp-card cp-queue">
        <div class="cp-card-h">◆ Governance queue <span class="cp-sub">what Noetica proposed · pending human admission</span></div>
        <EmptyState v-if="!queue.length" title="Queue clear" hint="No claims or actions awaiting review. New proposals from fielded seats land here." icon="✓" />
        <ul v-else class="cp-q-list">
          <li v-for="q in queue" :key="q.id" class="cp-q-item">
            <div class="cp-q-top">
              <span class="cp-q-kind" :class="q.kind">{{ q.kind.replace('-', ' ') }}</span>
              <span class="cp-q-policy" :class="q.policy">{{ q.policy }}</span>
              <span class="cp-q-omega" :title="`ontogenesis Ω · ${omegaNote(q.omega)}`">Ω {{ q.omega }}</span>
              <span class="cp-q-conf">{{ Math.round(q.confidence * 100) }}%</span>
            </div>
            <div class="cp-q-summary">{{ q.summary }}</div>
            <div class="cp-q-meta">{{ q.subject }} · {{ seatName(q.seatId) }} · {{ q.at }}</div>
            <div class="cp-q-acts">
              <button class="cp-act admit" type="button" @click="decide(q, 'admitted')">Admit</button>
              <button class="cp-act hold" type="button" @click="decide(q, 'held-for-review')">Escalate</button>
              <button class="cp-act reject" type="button" @click="decide(q, 'rejected')">Reject</button>
            </div>
          </li>
        </ul>
      </section>

      <!-- Fleet & seats -->
      <section class="cp-card">
        <div class="cp-card-h">◉ Fielded seats <span class="cp-sub">autonomy is capped by role policy</span></div>
        <div class="cp-seats">
          <div v-for="s in seats" :key="s.id" class="cp-seat" :class="{ risk: repRisk(s) }">
            <div class="cp-seat-id">
              <span class="cp-dot" :class="s.status" :title="s.status" />
              <div>
                <div class="cp-seat-name">{{ s.name }} <ReputationBadge :subject="s.name" /></div>
                <div class="cp-seat-role">{{ s.role }} · {{ s.dept }}<span v-if="repRisk(s)" class="cp-risk-flag" title="High autonomy on a low / unrated HolographMe reputation — review the grant">⚠ autonomy &gt; reputation</span></div>
              </div>
            </div>
            <div class="cp-seat-auto">
              <button class="cp-step" type="button" :disabled="s.autonomy <= 0" aria-label="Lower autonomy" @click="setAutonomy(s, s.autonomy - 1)">▾</button>
              <span class="cp-auto-lvl" :title="autonomyBlurb(s.autonomy)">L{{ s.autonomy }} · {{ autonomyLabel(s.autonomy) }}</span>
              <button class="cp-step" type="button" :disabled="s.autonomy >= roleCap(s.role)" :title="`role cap L${roleCap(s.role)}`" aria-label="Raise autonomy" @click="setAutonomy(s, s.autonomy + 1)">▴</button>
            </div>
            <div class="cp-seat-stat">{{ s.claims30d.toLocaleString() }}/30d · {{ s.admitRate }}% admit</div>
          </div>
        </div>
      </section>

      <!-- Role policy: autonomy caps + capability membrane -->
      <section class="cp-card">
        <div class="cp-card-h">§ Policy <span class="cp-sub">autonomy caps + capability membrane per role</span></div>
        <div class="cp-pol">
          <div v-for="p in policy" :key="p.role" class="cp-pol-row">
            <span class="cp-pol-role">{{ p.role }}</span>
            <span class="cp-pol-cap">cap L{{ p.autonomyCap }}</span>
            <span class="cp-pol-mem"><span v-for="m in p.membrane" :key="m" class="cp-mem-chip">{{ m }}</span></span>
          </div>
        </div>
      </section>

      <!-- Audit trail -->
      <section class="cp-card">
        <div class="cp-card-h">▤ Audit <span class="cp-sub">governed decisions · sealed receipts</span></div>
        <ul class="cp-audit">
          <li v-for="a in audit" :key="a.id" class="cp-audit-row">
            <span class="cp-audit-dec" :class="a.decision">{{ a.decision.replace(/-/g, ' ') }}</span>
            <span class="cp-audit-subj">{{ a.subject }}</span>
            <span class="cp-audit-meta">{{ a.actor }} · Ω {{ a.omega }} · <code>{{ a.receipt }}</code> · {{ a.at }}</span>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SurfaceHeader from '../components/SurfaceHeader.vue';
import EmptyState from '../components/EmptyState.vue';
import ReputationBadge from '../components/ReputationBadge.vue';
import { reputationFor } from '../features/reputation/reputation';
import { SEATS, QUEUE, ROLE_POLICY, AUDIT, AUTONOMY_LEVELS, type Seat, type QueueItem, type AuditDecision, type AutonomyLevel } from '../data/controlPlaneFixture';
import { notationOf, type OmegaState } from '../ontology/ontogenesis';
import { useCockpit } from '../stores/cockpit';

const seats = ref<Seat[]>(SEATS.map((s) => ({ ...s })));
const queue = ref<QueueItem[]>(QUEUE.map((q) => ({ ...q })));
const audit = ref(AUDIT.map((a) => ({ ...a })));
const admittedToday = ref(3);

const activeCount = computed(() => seats.value.filter((s) => s.status === 'active').length);
// HolographMe governance: a seat granted high autonomy on a low / unrated portable
// reputation is a risk the control plane should surface.
function repRisk(s: Seat): boolean {
  const r = reputationFor(s.name);
  return s.autonomy >= 4 && (!r || r.tier === 'emerging' || r.tier === 'unrated');
}
const riskCount = computed(() => seats.value.filter(repRisk).length);
const seatName = (id: string) => seats.value.find((s) => s.id === id)?.name ?? 'seat';
const autonomyLabel = (l: AutonomyLevel) => AUTONOMY_LEVELS[l]?.label ?? '';
const autonomyBlurb = (l: AutonomyLevel) => AUTONOMY_LEVELS[l]?.blurb ?? '';
const roleCap = (role: string) => ROLE_POLICY.find((p) => p.role === role)?.autonomyCap ?? 5;
const omegaNote = (o: OmegaState) => `rung ${notationOf(o)}/6 on the path to truth`;
const policy = ROLE_POLICY;

function setAutonomy(s: Seat, level: number) {
  const cap = roleCap(s.role);
  s.autonomy = Math.max(0, Math.min(cap, level)) as AutonomyLevel;
}
function decide(q: QueueItem, decision: AuditDecision) {
  queue.value = queue.value.filter((x) => x.id !== q.id);
  audit.value.unshift({ id: `a-${q.id}`, at: 'just now', actor: 'you', decision, subject: q.summary.slice(0, 48), omega: q.omega, receipt: `sha256:${Math.random().toString(16).slice(2, 4)}…${Math.random().toString(16).slice(2, 4)}` });
  if (decision === 'admitted' || decision === 'executed') admittedToday.value += 1;
}

onMounted(() => useCockpit().setContext({ surface: 'Control Plane', entityLabel: 'Organization · Noetica governance', detail: `${queue.value.length} in review`, route: '/control-plane/org' }));
</script>

<style scoped>
.cp { height: 100%; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 0.9rem; padding: 1rem 1.25rem 1.5rem; background: var(--bg); color: var(--text); }
.cp-pill { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--amber); background: var(--amber-soft); border-radius: 5px; padding: 0.1rem 0.35rem; white-space: nowrap; }
.cp-kpis { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.cp-kpi { font-size: 0.72rem; color: var(--text-3); border: 1px solid var(--line-2); border-radius: 999px; padding: 0.15rem 0.55rem; }
.cp-kpi b { color: var(--text); font-variant-numeric: tabular-nums; }
.cp-kpi.ok b { color: var(--live); } .cp-kpi.warn.hot b { color: var(--amber); }
.cp-kpi.risk { border-color: rgba(240,101,106,0.5); } .cp-kpi.risk b { color: var(--down); }
.cp-seat.risk { background: rgba(240,101,106,0.05); border-radius: 8px; }
.cp-risk-flag { margin-left: 0.5rem; font-family: var(--mono, ui-monospace); font-size: 0.56rem; color: var(--down); border: 1px solid rgba(240,101,106,0.4); border-radius: 4px; padding: 0.02rem 0.3rem; }
.cp-seat-name { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
.cp-lede { margin: 0; max-width: 80ch; font-size: 0.9rem; color: var(--text-2); } .cp-lede b { color: var(--text); font-weight: 600; }
.cp-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 0.9rem; }
@media (max-width: 900px) { .cp-grid { grid-template-columns: 1fr; } }
.cp-queue { grid-row: span 2; }
.cp-card { border: 1px solid var(--line); border-radius: 12px; background: var(--surface); padding: 0.9rem 1rem; }
.cp-card-h { font-size: 0.82rem; font-weight: 650; display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.7rem; }
.cp-sub { font-family: var(--mono, ui-monospace); font-size: 0.58rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-3); font-weight: 400; }
.cp-q-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
.cp-q-item { border: 1px solid var(--line); border-radius: 10px; padding: 0.6rem 0.7rem; background: var(--surface-2, #1b1e25); }
.cp-q-top { display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap; font-size: 0.6rem; }
.cp-q-kind { font-family: var(--mono, ui-monospace); text-transform: uppercase; letter-spacing: 0.06em; color: var(--info); border: 1px solid rgba(88,166,255,0.4); border-radius: 4px; padding: 0.05rem 0.35rem; }
.cp-q-policy { font-family: var(--mono, ui-monospace); text-transform: uppercase; letter-spacing: 0.06em; padding: 0.05rem 0.35rem; border-radius: 4px; }
.cp-q-policy.review { color: var(--amber); background: var(--amber-soft); } .cp-q-policy.provisional { color: var(--info); background: var(--info-soft); } .cp-q-policy.proposed { color: var(--text-3); border: 1px solid var(--line-2); }
.cp-q-omega { font-family: var(--mono, ui-monospace); color: var(--text-2); } .cp-q-conf { margin-left: auto; font-variant-numeric: tabular-nums; color: var(--text-3); }
.cp-q-summary { font-size: 0.86rem; margin: 0.3rem 0 0.15rem; }
.cp-q-meta { font-size: 0.66rem; color: var(--text-3); }
.cp-q-acts { display: flex; gap: 0.4rem; margin-top: 0.5rem; }
.cp-act { font-size: 0.72rem; border-radius: 7px; padding: 0.25rem 0.6rem; cursor: pointer; border: 1px solid var(--line-2); background: transparent; color: var(--text-2); }
.cp-act.admit { border-color: var(--live); color: var(--live); } .cp-act.admit:hover { background: var(--live-soft); }
.cp-act.reject { border-color: rgba(240,101,106,0.5); color: var(--down); } .cp-act.hold:hover { color: var(--text); }
.cp-seats, .cp-pol { display: grid; gap: 0.4rem; }
.cp-seat { display: grid; grid-template-columns: 1.4fr auto auto; gap: 0.6rem; align-items: center; border-bottom: 1px solid var(--line); padding-bottom: 0.4rem; }
.cp-seat:last-child { border-bottom: 0; }
.cp-seat-id { display: flex; align-items: center; gap: 0.5rem; }
.cp-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; } .cp-dot.active { background: var(--live); } .cp-dot.idle { background: var(--amber); } .cp-dot.suspended { background: var(--down); }
.cp-seat-name { font-size: 0.82rem; font-weight: 600; } .cp-seat-role { font-size: 0.66rem; color: var(--text-3); }
.cp-seat-auto { display: flex; align-items: center; gap: 0.35rem; }
.cp-auto-lvl { font-size: 0.66rem; color: var(--text-2); white-space: nowrap; font-variant-numeric: tabular-nums; }
.cp-step { border: 1px solid var(--line-2); background: transparent; color: var(--text-2); border-radius: 6px; width: 1.3rem; height: 1.3rem; cursor: pointer; line-height: 1; } .cp-step:disabled { opacity: 0.35; cursor: default; } .cp-step:hover:not(:disabled) { color: var(--accent); border-color: var(--accent); }
.cp-seat-stat { font-size: 0.64rem; color: var(--text-3); white-space: nowrap; font-variant-numeric: tabular-nums; }
.cp-pol-row { display: grid; grid-template-columns: 1fr auto; gap: 0.4rem 0.6rem; align-items: center; border-bottom: 1px solid var(--line); padding-bottom: 0.4rem; }
.cp-pol-row:last-child { border-bottom: 0; }
.cp-pol-role { font-size: 0.8rem; font-weight: 600; } .cp-pol-cap { font-family: var(--mono, ui-monospace); font-size: 0.62rem; color: var(--accent); }
.cp-pol-mem { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 0.25rem; }
.cp-mem-chip { font-size: 0.58rem; color: var(--text-3); border: 1px solid var(--line-2); border-radius: 999px; padding: 0.05rem 0.4rem; }
.cp-audit { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.4rem; }
.cp-audit-row { display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; font-size: 0.72rem; }
.cp-audit-dec { font-family: var(--mono, ui-monospace); font-size: 0.56rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.05rem 0.35rem; border-radius: 4px; white-space: nowrap; }
.cp-audit-dec.admitted, .cp-audit-dec.executed { color: var(--live); background: var(--live-soft); } .cp-audit-dec.rejected { color: var(--down); background: rgba(240,101,106,0.13); } .cp-audit-dec { color: var(--amber); background: var(--amber-soft); }
.cp-audit-subj { color: var(--text); } .cp-audit-meta { color: var(--text-3); } .cp-audit-meta code { font-size: 0.62rem; }
</style>
