<script setup lang="ts">
// Fleet — ported from app-vue into the cockpit. Register devices, hand each a claim code,
// assign a built image; devices fetch their assigned image on next boot/heartbeat. Reuses
// the cockpit's shared buildsApi. Restyled to the cockpit dark tokens.
import { ref, onMounted } from 'vue';
import SurfaceHeader from '../components/SurfaceHeader.vue';
import EmptyState from '../components/EmptyState.vue';
import { listDevices, registerDevice, assignBuild, listBuilds } from '../services/buildsApi';

interface Build { id: string; status: string; spec?: { edition?: string; arch?: string; hostname?: string } }
interface Device { id: string; name: string; claimCode?: string; assignedBuildId?: string; lastSeen?: number | { _seconds: number } }
const devices = ref<Device[]>([]);
const builds = ref<Build[]>([]);
const newName = ref(''); const err = ref(''); const busy = ref(false); const loaded = ref(false);

async function refresh() {
  try {
    devices.value = ((await listDevices()) as { devices?: Device[] }).devices ?? [];
    builds.value = (((await listBuilds()) as { builds?: Build[] }).builds ?? []).filter((b) => b.status === 'complete');
    err.value = '';
  } catch (e: any) { err.value = e?.message ? String(e.message) : 'Could not reach the fleet service.'; }
  finally { loaded.value = true; }
}
async function add() {
  if (!newName.value.trim()) return;
  busy.value = true;
  try { await registerDevice(newName.value.trim()); newName.value = ''; await refresh(); }
  catch (e: any) { err.value = e?.message ?? 'Register failed.'; } finally { busy.value = false; }
}
async function assign(deviceId: string, ev: Event) {
  const buildId = (ev.target as HTMLSelectElement).value;
  if (!buildId) return;
  try { await assignBuild(deviceId, buildId); await refresh(); }
  catch (e: any) { err.value = e?.message ?? 'Assign failed.'; }
}
const seenLabel = (d: Device) => (d.lastSeen ? new Date(typeof d.lastSeen === 'object' ? d.lastSeen._seconds * 1000 : d.lastSeen).toLocaleString() : 'never');

onMounted(refresh);
</script>

<template>
  <section class="fl" aria-label="Fleet">
    <SurfaceHeader title="Fleet" eyebrow="SourceOS · devices">
      <template #badge><span class="fl-tag">premium</span></template>
    </SurfaceHeader>
    <p class="fl-lede">Register devices, put each claim code on the nlboot drive, and assign a built image. Change the assignment and the fleet re-kexecs into the new image on next heartbeat.</p>
    <p v-if="err" class="fl-err" role="alert">{{ err }}</p>

    <form class="fl-reg" @submit.prevent="add">
      <input v-model="newName" placeholder="rack-01" />
      <button class="fl-btn" type="submit" :disabled="busy">Get claim code</button>
    </form>

    <EmptyState v-if="loaded && !devices.length && !err" title="No devices yet" hint="Register a device above to get its claim code." icon="◇" />
    <ul v-else class="fl-list">
      <li v-for="d in devices" :key="d.id" class="fl-row">
        <div class="fl-dev">
          <strong>{{ d.name }}</strong>
          <div class="fl-claim">claim: {{ d.claimCode }}</div>
          <div class="fl-seen">last seen: {{ seenLabel(d) }}</div>
        </div>
        <label class="fl-assign">Assigned image
          <select :value="d.assignedBuildId || ''" @change="assign(d.id, $event)">
            <option value="">— none —</option>
            <option v-for="b in builds" :key="b.id" :value="b.id">{{ b.spec?.edition }}/{{ b.spec?.arch }} · {{ b.spec?.hostname }}</option>
          </select>
        </label>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.fl { height: 100%; min-height: 0; overflow-y: auto; padding: 1rem 1.25rem 2rem; background: var(--bg); color: var(--text); }
.fl-tag { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--amber); background: rgba(227,179,65,0.14); border-radius: 5px; padding: 0.1rem 0.4rem; }
.fl-lede { margin: 0.3rem 0 0.9rem; max-width: 74ch; font-size: 0.9rem; color: var(--text-2); }
.fl-err { font-size: 0.8rem; color: var(--amber); border: 1px solid rgba(227,179,65,0.3); background: rgba(227,179,65,0.05); border-radius: 8px; padding: 0.5rem 0.7rem; }
.fl-reg { display: flex; gap: 0.5rem; max-width: 460px; margin-bottom: 1rem; }
.fl-reg input { flex: 1; padding: 0.5rem 0.65rem; border: 1px solid var(--line-2); border-radius: 8px; background: var(--bg); color: var(--text); }
.fl-reg input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.fl-btn { padding: 0.5rem 0.9rem; border: 1px solid var(--accent); color: var(--accent); background: var(--accent-soft); border-radius: 8px; cursor: pointer; font-size: 0.82rem; white-space: nowrap; } .fl-btn:hover:not(:disabled) { background: var(--accent); color: #14110a; } .fl-btn:disabled { opacity: 0.6; }
.fl-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; max-width: 720px; }
.fl-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; border: 1px solid var(--line-2); border-radius: 12px; background: var(--surface); padding: 0.75rem 1rem; }
.fl-claim { font-family: var(--mono, ui-monospace), monospace; font-size: 0.72rem; color: var(--text-3); margin-top: 0.2rem; }
.fl-seen { font-size: 0.7rem; color: var(--text-3); }
.fl-assign { font-size: 0.68rem; color: var(--text-3); display: flex; flex-direction: column; gap: 0.25rem; text-align: right; }
.fl-assign select { padding: 0.35rem 0.5rem; border: 1px solid var(--line-2); border-radius: 7px; background: var(--bg); color: var(--text); font-size: 0.78rem; }
</style>
