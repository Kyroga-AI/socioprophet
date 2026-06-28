import { defineStore } from "pinia";
import {
  projectDoc, mergeGraphs, backlinks, related, rollup, query, centralEntities,
  pageId, type Block, type GNode, type KGraph,
} from "../services/knowledgeGraph";

// Find a block anywhere in a page tree (for in-place edits).
function findBlock(root: Block, id: string): Block | null {
  if (root.id === id) return root;
  for (const c of root.children ?? []) { const f = findBlock(c, id); if (f) return f; }
  return null;
}

// Demo workspace that immediately shows the leapfrog (cross-doc backlinks, entity hubs, graph rollups).
function seed(): Block[] {
  return [
    { id: "p-meeting", type: "page", text: "Meeting Notes", children: [
      { id: "m1", type: "heading", text: "Decisions" },
      { id: "m2", type: "text", text: "Ship [[Sovereign Identity]] with @gus this week" },
      { id: "m3", type: "todo", text: "Wire [[Mail Bridge]]", props: { done: false } },
    ] },
    { id: "p-roadmap", type: "page", text: "Roadmap", children: [
      { id: "r1", type: "text", text: "Priority: [[Sovereign Identity]] led by @gus" },
      { id: "r2", type: "database", text: "Initiatives", children: [
        { id: "r3", type: "row", text: "Identity", props: { effort: 8, "rel:Sovereign Identity": "Sovereign Identity" } },
        { id: "r4", type: "row", text: "Knowledge", props: { effort: 5, "rel:Sovereign Identity": "Sovereign Identity" } },
      ] },
    ] },
    { id: "p-identity", type: "page", text: "Sovereign Identity", children: [
      { id: "i1", type: "text", text: "Unlinkable, compulsion-resistant identity. Owner @gus." },
    ] },
  ];
}

export const useKnowledge = defineStore("knowledge", {
  state: () => ({
    docs: seed() as Block[],
    currentId: "p-meeting" as string,
  }),
  getters: {
    graph(state): KGraph { return mergeGraphs(state.docs.map(projectDoc)); },
    current(state): Block | undefined { return state.docs.find((d) => d.id === state.currentId); },
    pageTitles(state): string[] { return state.docs.map((d) => d.text ?? d.id); },
    currentBacklinks(): GNode[] { return this.current ? backlinks(this.graph, this.current.text ?? "") : []; },
    currentRelated(): GNode[] { return this.current ? related(this.graph, pageId(this.current.text ?? ""), 1) : []; },
    allTodos(): GNode[] { return query(this.graph, (n) => n.kind === "todo"); },
    central(): Array<{ name: string; degree: number }> { return centralEntities(this.graph); },
  },
  actions: {
    selectPage(id: string) { this.currentId = id; },
    updateBlockText(blockId: string, text: string) {
      if (this.current) { const b = findBlock(this.current, blockId); if (b) b.text = text; }
    },
    addBlock(type: Block["type"]) {
      if (!this.current) return;
      (this.current.children ??= []).push({ id: `b-${Date.now()}-${Math.floor(Math.random() * 1e4)}`, type, text: "" });
    },
    addPage(title: string) {
      const id = `p-${Date.now()}`;
      this.docs.push({ id, type: "page", text: title || "Untitled", children: [{ id: `${id}-1`, type: "text", text: "" }] });
      this.currentId = id;
    },
    /** Graph-native rollup over a database block's rows (the thing Notion limits to one relation hop). */
    rollupSum(databaseBlockId: string, prop: string): number { return rollup(this.graph, databaseBlockId, "CONTAINS", prop, "sum"); },
  },
});
