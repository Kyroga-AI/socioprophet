<script setup lang="ts">
// Cross-vendor Cloud Broker — ported from app-vue into the cockpit. Cloud services are a
// commodity; we pick the cheapest compliant vendor per service. Pure client-side over the
// shared cloudBroker catalog (no backend). Restyled to the cockpit dark tokens.
import { ref, computed } from 'vue';
import SurfaceHeader from '../components/SurfaceHeader.vue';
import { KINDS, VENDORS, compareServices, selectVendor, type Residency, type Vendor, type ServiceKind } from '../services/cloudBroker';

const residency = ref<Residency | ''>('');
const excluded = ref<Vendor[]>([]);
function toggle(v: Vendor) { excluded.value = excluded.value.includes(v) ? excluded.value.filter((x) => x !== v) : [...excluded.value, v]; }

const rows = computed(() => KINDS.map((kind: ServiceKind) => ({
  kind,
  offerings: compareServices(kind),
  pick: selectVendor({ kind, residency: residency.value || undefined, exclude: excluded.value }),
})));
const fmt = (n: number) => (n === 0 ? 'free' : `$${n}`);
const offerFor = (offerings: ReturnType<typeof compareServices>, v: Vendor) => offerings.find((o) => o.provider === v);
</script>

<template>
  <section class="cb" aria-label="Cloud broker">
    <SurfaceHeader title="Cloud Broker" eyebrow="SourceOS · cross-vendor">
      <template #badge><span class="cb-tag">no lock-in</span></template>
    </SurfaceHeader>
    <p class="cb-lede">Cloud is a commodity — we're the broker. Pick the cheapest compliant vendor per service, on any cloud.</p>

    <div class="cb-controls">
      <label class="cb-res">Data residency
        <select v-model="residency">
          <option value="">any</option>
          <option v-for="r in ['EU','US','AU','UK','CA']" :key="r" :value="r">{{ r }}</option>
        </select>
      </label>
      <span class="cb-excl">Exclude:
        <button v-for="v in VENDORS" :key="v" class="cb-vbtn" :class="{ off: excluded.includes(v) }" type="button" @click="toggle(v)">{{ v }}</button>
      </span>
    </div>

    <div class="cb-scroll">
      <table class="cb-grid">
        <thead><tr><th>Service</th><th v-for="v in VENDORS" :key="v">{{ v }}</th><th>Broker pick</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.kind">
            <td class="cb-kind">{{ row.kind }}</td>
            <td v-for="v in VENDORS" :key="v" :class="{ best: row.pick && row.pick.provider === v }">
              <template v-if="offerFor(row.offerings, v)">
                <div class="cb-prim">{{ offerFor(row.offerings, v)!.primitive }}</div>
                <div class="cb-price">{{ fmt(offerFor(row.offerings, v)!.unitPriceUsd) }}</div>
              </template>
              <span v-else class="cb-na">—</span>
            </td>
            <td class="cb-pick">
              <template v-if="row.pick"><strong>{{ row.pick.provider }}</strong> · {{ row.pick.primitive }} · {{ fmt(row.pick.unitPriceUsd) }}</template>
              <span v-else class="cb-na">no compliant vendor</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="cb-foot">Compute &amp; GPU are brokered the same way — cheapest satisfying SKU across GCP/AWS/Azure/IBM + the sovereign local mesh.</p>
  </section>
</template>

<style scoped>
.cb { height: 100%; min-height: 0; overflow-y: auto; padding: 1rem 1.25rem 2rem; background: var(--bg); color: var(--text); }
.cb-tag { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); background: var(--accent-soft); border-radius: 5px; padding: 0.1rem 0.4rem; }
.cb-lede { margin: 0.3rem 0 0.9rem; max-width: 72ch; font-size: 0.9rem; color: var(--text-2); }
.cb-controls { display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.9rem; font-size: 0.8rem; color: var(--text-2); }
.cb-res select { margin-left: 0.4rem; padding: 0.25rem 0.5rem; border: 1px solid var(--line-2); border-radius: 6px; background: var(--surface); color: var(--text); }
.cb-vbtn { border: 1px solid var(--line-2); background: var(--surface); color: var(--text-2); border-radius: 999px; padding: 0.1rem 0.6rem; margin: 0 0.15rem; cursor: pointer; font-size: 0.72rem; }
.cb-vbtn.off { background: rgba(240,101,106,0.1); color: var(--down); border-color: rgba(240,101,106,0.4); text-decoration: line-through; }
.cb-scroll { overflow-x: auto; }
.cb-grid { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.cb-grid th, .cb-grid td { border: 1px solid var(--line); padding: 0.5rem 0.6rem; text-align: left; vertical-align: top; }
.cb-grid th { background: var(--surface); font-weight: 550; text-transform: capitalize; color: var(--text-2); position: sticky; top: 0; }
.cb-kind { font-weight: 600; text-transform: capitalize; }
.cb-prim { color: var(--text); } .cb-price { font-size: 0.72rem; color: var(--text-3); }
.best { background: var(--live-soft); outline: 1px solid rgba(63,185,80,0.5); }
.cb-pick strong { color: var(--live); text-transform: uppercase; }
.cb-na { color: var(--text-3); } .cb-foot { color: var(--text-3); margin-top: 1rem; font-size: 0.76rem; }
</style>
