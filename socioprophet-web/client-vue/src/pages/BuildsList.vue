<script setup lang="ts">
// My SourceOS builds — ported from app-vue into the cockpit. Lists builds via the shared
// buildsApi, polls for status, offers the finished ISO. Honest empty/error states.
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import SurfaceHeader from '../components/SurfaceHeader.vue';
import EmptyState from '../components/EmptyState.vue';
import { listBuilds } from '../services/buildsApi';

interface Build { id: string; status: string; artifact?: string; spec?: { edition?: string; arch?: string; hostname?: string; packages?: string[] } }
const builds = ref<Build[]>([]);
const err = ref(''); const loaded = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;
const router = useRouter();

async function refresh() {
  try { builds.value = ((await listBuilds()) as { builds?: Build[] }).builds ?? []; err.value = ''; }
  catch (e: any) { err.value = e?.message ? String(e.message) : 'Could not reach the builder service.'; }
  finally { loaded.value = true; }
}
const gsToHttps = (u?: string) => (u?.startsWith('gs://') ? 'https://storage.googleapis.com/' + u.slice(5) : u);

onMounted(() => { refresh(); timer = setInterval(refresh, 8000); });
onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<template>
  <section class="bl" aria-label="SourceOS builds">
    <SurfaceHeader title="My Builds" eyebrow="SourceOS · Builder">
      <template #actions>
        <button class="bl-new" type="button" @click="router.push('/sourceos/image-builder')">+ New build</button>
      </template>
    </SurfaceHeader>

    <p v-if="err" class="bl-err" role="alert">{{ err }}</p>
    <EmptyState v-if="loaded && !builds.length && !err" title="No builds yet" hint="Compose a SourceOS image and it'll appear here with live status and a download link." icon="◇">
      <template #action><button class="bl-new" type="button" @click="router.push('/sourceos/image-builder')">Build your first image</button></template>
    </EmptyState>

    <ul v-else class="bl-list">
      <li v-for="b in builds" :key="b.id" class="bl-row">
        <div class="bl-spec">
          <strong>{{ b.spec?.edition }}</strong> · {{ b.spec?.arch }} · {{ b.spec?.hostname }}
          <div class="bl-pkgs">{{ (b.spec?.packages || []).join(', ') || 'no extra packages' }}</div>
        </div>
        <div class="bl-status">
          <span class="bl-badge" :class="b.status">{{ b.status }}</span>
          <a v-if="b.status === 'complete' && b.artifact" class="bl-dl" :href="gsToHttps(b.artifact)">Download ISO ↓</a>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.bl { height: 100%; min-height: 0; overflow-y: auto; padding: 1rem 1.25rem 2rem; background: var(--bg); color: var(--text); }
.bl-new { font-size: 0.8rem; border: 1px solid var(--accent); color: var(--accent); background: var(--accent-soft); border-radius: 8px; padding: 0.35rem 0.7rem; cursor: pointer; } .bl-new:hover { background: var(--accent); color: #14110a; }
.bl-err { font-size: 0.8rem; color: var(--amber); border: 1px solid rgba(227,179,65,0.3); background: rgba(227,179,65,0.05); border-radius: 8px; padding: 0.5rem 0.7rem; }
.bl-list { list-style: none; margin: 0.9rem 0 0; padding: 0; display: grid; gap: 0.55rem; max-width: 720px; }
.bl-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; border: 1px solid var(--line-2); border-radius: 12px; background: var(--surface); padding: 0.75rem 1rem; }
.bl-spec strong { text-transform: capitalize; } .bl-pkgs { font-size: 0.72rem; color: var(--text-3); margin-top: 0.2rem; }
.bl-status { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.35rem; }
.bl-badge { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.1rem 0.4rem; border-radius: 5px; color: var(--text-3); border: 1px solid var(--line-2); }
.bl-badge.complete { color: var(--live); border-color: rgba(63,185,80,0.4); background: var(--live-soft); }
.bl-badge.building, .bl-badge.queued { color: var(--amber); border-color: rgba(227,179,65,0.4); }
.bl-badge.failed, .bl-badge.error { color: var(--down); border-color: rgba(240,101,106,0.4); }
.bl-dl { font-size: 0.76rem; color: var(--accent); text-decoration: none; } .bl-dl:hover { text-decoration: underline; }
</style>
