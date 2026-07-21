<script setup lang="ts">
// SourceOS Image Builder — ported from app-vue (the standalone builder) into the unified
// cockpit. Compose a SourceOS image from a flavor and the platform builds it. Reuses the
// cockpit's own buildsApi + Firebase auth store (tier/policy gates; the server still enforces).
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SurfaceHeader from '../components/SurfaceHeader.vue';
import { useAuth } from '../stores/auth';
import { createBuild, type BuildSpec } from '../services/buildsApi';

const auth = useAuth();
const router = useRouter();

const edition = ref<BuildSpec['edition']>('desktop');
const arch = ref<BuildSpec['arch']>('x86_64');
const hostname = ref('sourceos');
const packagesText = ref('');
const enableSsh = ref(false);
const enableDocker = ref(false);
const usersText = ref('');
const moduleSnippet = ref('');
const err = ref(''); const busy = ref(false);

// Gates from the server-provided policy (server still enforces; UI just reflects).
const advanced = computed(() => !!auth.policy?.services);      // services/users → paid+
const premium = computed(() => !!auth.policy?.moduleEditor);   // raw module → premium
const maxPackages = computed(() => auth.policy?.maxPackages ?? 10);
const lane = computed(() => (auth.tier === 'free'
  ? 'Built on shared CI runners (free tier).'
  : 'Built on a private on-demand VM (paid tier).'));

async function submit() {
  err.value = ''; busy.value = true;
  const packages = packagesText.value.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
  const spec: BuildSpec = { edition: edition.value, arch: arch.value, hostname: hostname.value, packages };
  if (advanced.value) {
    spec.services = { openssh: enableSsh.value, docker: enableDocker.value };
    const users = usersText.value.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean).map((name) => ({ name, groups: ['wheel'] }));
    if (users.length) spec.users = users;
  }
  if (premium.value && moduleSnippet.value.trim()) spec.moduleSnippet = moduleSnippet.value;
  try { await createBuild(spec); router.push('/sourceos/builds'); }
  catch (e: any) { err.value = e?.message ? String(e.message).replace(/^Firebase:\s*/, '') : 'Build request failed.'; }
  finally { busy.value = false; }
}
</script>

<template>
  <section class="ib" aria-label="SourceOS Image Builder">
    <SurfaceHeader title="SourceOS Image Builder" eyebrow="SourceOS · Builder">
      <template #badge><span class="ib-tier">{{ auth.tier }} tier</span></template>
    </SurfaceHeader>
    <p class="ib-lede">Start from a flavor, customize it, and the platform builds a bootable SourceOS image for you.</p>

    <form class="ib-card" @submit.prevent="submit">
      <div class="ib-row">
        <label class="ib-field"><span>Edition</span>
          <select v-model="edition">
            <option value="desktop">Desktop (GNOME)</option>
            <option value="server">Server (headless)</option>
            <option value="edge">Edge (appliance)</option>
          </select>
        </label>
        <label class="ib-field"><span>Architecture</span>
          <select v-model="arch">
            <option value="x86_64">x86_64 (PC)</option>
            <option value="aarch64">ARM64</option>
          </select>
        </label>
      </div>

      <label class="ib-field"><span>Hostname</span>
        <input v-model="hostname" placeholder="sourceos" />
      </label>

      <label class="ib-field"><span>Extra packages <em>space/comma separated nixpkgs names · up to {{ maxPackages }}</em></span>
        <textarea v-model="packagesText" rows="3" placeholder="htop tmux ripgrep" />
      </label>

      <fieldset class="ib-gate" :class="{ locked: !advanced }">
        <legend>Services &amp; users <span v-if="!advanced" class="ib-lock">paid tier</span></legend>
        <div class="ib-checks">
          <label class="ib-check"><input type="checkbox" v-model="enableSsh" :disabled="!advanced" /> OpenSSH</label>
          <label class="ib-check"><input type="checkbox" v-model="enableDocker" :disabled="!advanced" /> Docker</label>
        </div>
        <label class="ib-field"><span>Users <em>space/comma separated; each added to wheel</em></span>
          <input v-model="usersText" :disabled="!advanced" placeholder="alice bob" />
        </label>
      </fieldset>

      <fieldset class="ib-gate" :class="{ locked: !premium }">
        <legend>Custom NixOS module <span v-if="!premium" class="ib-lock">premium</span></legend>
        <label class="ib-field"><span><em>raw module config; sandboxed, validated server-side</em></span>
          <textarea v-model="moduleSnippet" :disabled="!premium" rows="4" placeholder="services.tailscale.enable = true;" />
        </label>
      </fieldset>

      <div class="ib-actions">
        <button class="ib-build" type="submit" :disabled="busy">{{ busy ? 'Submitting…' : 'Build image' }}</button>
        <span class="ib-lane">{{ lane }}</span>
      </div>
      <p v-if="err" class="ib-err" role="alert">{{ err }}</p>
    </form>
  </section>
</template>

<style scoped>
.ib { height: 100%; min-height: 0; overflow-y: auto; padding: 1rem 1.25rem 2rem; background: var(--bg); color: var(--text); }
.ib-tier { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); background: var(--accent-soft); border-radius: 5px; padding: 0.1rem 0.4rem; }
.ib-lede { margin: 0.3rem 0 1rem; max-width: 70ch; font-size: 0.9rem; color: var(--text-2); }
.ib-card { max-width: 620px; display: flex; flex-direction: column; gap: 0.85rem; border: 1px solid var(--line-2); border-radius: 14px; background: var(--surface); padding: 1.25rem; }
.ib-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
.ib-field { display: flex; flex-direction: column; gap: 0.3rem; } .ib-field > span { font-size: 0.72rem; color: var(--text-2); } .ib-field em { color: var(--text-3); font-style: normal; font-size: 0.66rem; }
.ib-field input, .ib-field select, .ib-field textarea { width: 100%; padding: 0.5rem 0.6rem; border: 1px solid var(--line-2); border-radius: 8px; background: var(--bg); color: var(--text); font-size: 0.85rem; font-family: inherit; }
.ib-field textarea { resize: vertical; font-family: var(--mono, ui-monospace), monospace; }
.ib-field input:focus, .ib-field select:focus, .ib-field textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.ib-gate { border: 1px solid var(--line); border-radius: 10px; padding: 0.7rem 0.85rem; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; } .ib-gate.locked { opacity: 0.6; }
.ib-gate legend { font-size: 0.74rem; font-weight: 600; padding: 0 0.35rem; }
.ib-lock { margin-left: 0.4rem; font-size: 0.56rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--amber); border: 1px solid rgba(227,179,65,0.4); border-radius: 4px; padding: 0.02rem 0.3rem; }
.ib-checks { display: flex; gap: 1.2rem; } .ib-check { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; color: var(--text-2); } .ib-check input { accent-color: var(--accent); }
.ib-actions { display: flex; align-items: center; gap: 0.9rem; margin-top: 0.3rem; }
.ib-build { padding: 0.55rem 1.1rem; border-radius: 9px; border: 1px solid transparent; background: var(--accent); color: #14110a; font-weight: 600; font-size: 0.88rem; cursor: pointer; } .ib-build:hover:not(:disabled) { filter: brightness(1.06); } .ib-build:disabled { opacity: 0.6; cursor: default; }
.ib-lane { font-size: 0.72rem; color: var(--text-3); }
.ib-err { margin: 0.2rem 0 0; font-size: 0.78rem; color: var(--down); background: rgba(240,101,106,0.1); border: 1px solid rgba(240,101,106,0.3); border-radius: 8px; padding: 0.5rem 0.65rem; }
</style>
