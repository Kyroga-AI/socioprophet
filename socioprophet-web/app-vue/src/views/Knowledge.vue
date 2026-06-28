<script setup lang="ts">
import { ref, computed } from "vue";
import { useKnowledge } from "../stores/knowledge";
import { pageId, type Block, type GNode } from "../services/knowledgeGraph";

const k = useKnowledge();
const newPage = ref("");

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Render [[wikilinks]] and @mentions/#tags as chips (content is our own; escaped first).
function renderRich(text: string): string {
  return escapeHtml(text)
    .replace(/\[\[([^\]]+)\]\]/g, '<span class="chip link">$1</span>')
    .replace(/(^|\s)([@#])([A-Za-z0-9][A-Za-z0-9_-]*)/g, '$1<span class="chip ent">$2$3</span>');
}

const current = computed(() => k.current);
const databases = computed<Block[]>(() => (current.value?.children ?? []).filter((b) => b.type === "database"));

function gotoTitle(label: string) {
  const id = k.docs.find((d) => pageId(d.text ?? "") === pageId(label))?.id;
  if (id) k.selectPage(id);
}
function nodeTitle(n: GNode): string {
  // a block node belongs to the page that contains it — find its doc for a friendly label
  for (const d of k.docs) {
    const has = (b: Block): boolean => b.id === n.id || (b.children ?? []).some(has);
    if (has(d)) return d.text ?? d.id;
  }
  return n.label;
}
</script>

<template>
  <div class="kn">
    <!-- pages rail -->
    <aside class="rail">
      <div class="brand">✦ Knowledge <span class="tag">graph-native</span></div>
      <button v-for="d in k.docs" :key="d.id" class="page" :class="{ on: d.id === k.currentId }" @click="k.selectPage(d.id)">
        {{ d.text }}
      </button>
      <form class="newp" @submit.prevent="k.addPage(newPage); newPage = ''">
        <input v-model="newPage" placeholder="New page…" />
      </form>
    </aside>

    <!-- editor -->
    <main class="doc" v-if="current">
      <h1 class="title">{{ current.text }}</h1>
      <div v-for="b in current.children ?? []" :key="b.id" class="block" :data-type="b.type">
        <template v-if="b.type === 'database'">
          <div class="dbtitle">▤ {{ b.text }}</div>
          <table class="db">
            <thead><tr><th>Name</th><th>Effort</th><th>Relates to</th></tr></thead>
            <tbody>
              <tr v-for="row in b.children ?? []" :key="row.id">
                <td>{{ row.text }}</td>
                <td>{{ row.props?.effort }}</td>
                <td><span class="chip link" @click="gotoTitle(String(row.props?.['rel:Sovereign Identity'] ?? ''))">{{ row.props?.['rel:Sovereign Identity'] }}</span></td>
              </tr>
            </tbody>
            <tfoot><tr><td>Σ rollup</td><td class="roll">{{ k.rollupSum(b.id, 'effort') }}</td><td>graph-native</td></tr></tfoot>
          </table>
        </template>
        <template v-else>
          <textarea class="edit" :class="b.type" :value="b.text" rows="1"
            @input="k.updateBlockText(b.id, ($event.target as HTMLTextAreaElement).value)" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="render" @click="(e) => { const t = e.target as HTMLElement; if (t.classList.contains('link')) gotoTitle(t.textContent || ''); }" v-html="renderRich(b.text || '')" />
        </template>
      </div>
      <div class="add">
        <button @click="k.addBlock('text')">+ Text</button>
        <button @click="k.addBlock('todo')">+ Todo</button>
        <button @click="k.addBlock('heading')">+ Heading</button>
      </div>
    </main>

    <!-- graph panels: the things Notion can't do -->
    <aside class="panels">
      <section>
        <h3>Backlinks <span class="auto">auto · cross-doc</span></h3>
        <p v-if="!k.currentBacklinks.length" class="empty">No backlinks yet.</p>
        <button v-for="n in k.currentBacklinks" :key="n.id" class="ref" @click="k.selectPage(k.docs.find(d => nodeTitle(n) === d.text)?.id || k.currentId)">
          {{ n.label }} <span class="from">in {{ nodeTitle(n) }}</span>
        </button>
      </section>
      <section>
        <h3>Related</h3>
        <span v-for="n in k.currentRelated" :key="n.id" class="chip rel">{{ n.label }}</span>
      </section>
      <section>
        <h3>Central entities <span class="auto">degree → PageRank server-side</span></h3>
        <div v-for="e in k.central" :key="e.name" class="bar">
          <span class="chip ent">@{{ e.name }}</span><span class="deg">{{ e.degree }}</span>
        </div>
      </section>
      <section>
        <h3>All todos <span class="auto">cross-doc query</span></h3>
        <div v-for="t in k.allTodos" :key="t.id" class="todo">☐ {{ t.label }}</div>
      </section>
    </aside>
  </div>
</template>

<style scoped>
.kn { display: grid; grid-template-columns: 200px 1fr 280px; height: 100%; font: 14px/1.5 system-ui, sans-serif; color: #202124; }
.rail, .panels { border-color: #e8eaed; background: #f8f9fa; padding: 12px; overflow: auto; }
.rail { border-right: 1px solid #e8eaed; }
.panels { border-left: 1px solid #e8eaed; }
.brand { font-weight: 600; margin-bottom: 10px; }
.tag, .auto, .from, .deg { font-size: 11px; color: #5f6368; font-weight: 400; }
.tag { background: #e6f4ea; color: #137333; padding: 1px 6px; border-radius: 8px; }
.page { display: block; width: 100%; text-align: left; border: 0; background: none; padding: 6px 8px; border-radius: 6px; cursor: pointer; color: #202124; }
.page:hover { background: #eef0f2; } .page.on { background: #e8f0fe; color: #1a73e8; font-weight: 500; }
.newp input { width: 100%; margin-top: 8px; padding: 6px 8px; border: 1px solid #dadce0; border-radius: 6px; }
.doc { padding: 28px 40px; overflow: auto; }
.title { font-size: 30px; font-weight: 700; margin: 0 0 16px; }
.block { margin: 2px 0; }
.edit { width: 100%; border: 0; resize: none; font: inherit; padding: 4px 6px; background: transparent; outline: none; color: #3c4043; }
.edit.heading { font-size: 19px; font-weight: 600; }
.render { padding: 0 6px 4px; min-height: 2px; }
.chip { border-radius: 6px; padding: 0 5px; font-size: 13px; cursor: pointer; }
.chip.link { background: #e8f0fe; color: #1a73e8; } .chip.ent { background: #fef7e0; color: #b06000; }
.chip.rel { background: #f1f3f4; color: #3c4043; display: inline-block; margin: 2px 3px 0 0; }
.db { width: 100%; border-collapse: collapse; margin: 4px 0 8px; }
.db th, .db td { border: 1px solid #e8eaed; padding: 6px 10px; text-align: left; font-size: 13px; }
.db th { background: #f1f3f4; font-weight: 500; } .dbtitle { font-weight: 600; margin-top: 8px; }
.roll { font-weight: 700; color: #137333; }
.add { margin-top: 14px; display: flex; gap: 8px; }
.add button { border: 1px solid #dadce0; background: #fff; border-radius: 16px; padding: 4px 12px; cursor: pointer; color: #1a73e8; }
.panels section { margin-bottom: 18px; } .panels h3 { font-size: 12px; text-transform: uppercase; letter-spacing: .4px; color: #5f6368; margin: 0 0 6px; }
.ref { display: block; width: 100%; text-align: left; border: 0; background: #fff; border: 1px solid #e8eaed; border-radius: 6px; padding: 6px 8px; margin-bottom: 4px; cursor: pointer; }
.empty { color: #80868b; font-size: 13px; } .bar { display: flex; justify-content: space-between; align-items: center; margin: 3px 0; }
.todo { padding: 2px 0; color: #3c4043; }
</style>
