/**
 * knowledgeGraph — client-side graph-native knowledge core (mirrors noetica/agent-machine/lib/knowledge-graph.ts).
 * Runs in the browser so the editor is local-first; the same projection is persisted to HellGraph server-side.
 * Docs project onto a REAL graph → backlinks, entity hubs, rollups, related-discovery and cross-doc queries are
 * graph operations (the things Notion fakes). See KNOWLEDGE_LAYER.md.
 */
export type BlockType = "page" | "heading" | "text" | "todo" | "bullet" | "database" | "row" | "ref";
export type EdgeType = "CONTAINS" | "LINKS_TO" | "MENTIONS" | "RELATES";

export interface Block {
  id: string;
  type: BlockType;
  text?: string;
  props?: Record<string, string | number | boolean>;
  children?: Block[];
}
export interface GNode { id: string; kind: BlockType | "entity"; label: string; props: Record<string, unknown> }
export interface GEdge { from: string; to: string; type: EdgeType }
export interface KGraph { nodes: GNode[]; edges: GEdge[] }

export const slug = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const pageId = (title: string): string => "page:" + slug(title);
export const entityId = (name: string): string => "entity:" + slug(name);

export function parseRefs(text: string): { links: string[]; mentions: string[] } {
  const links = [...text.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1].trim()).filter(Boolean);
  const mentions = [...text.matchAll(/(?:^|\s)[@#]([A-Za-z0-9][A-Za-z0-9_-]*)/g)].map((m) => m[1]);
  return { links, mentions };
}

export function projectDoc(page: Block): KGraph {
  if (page.type !== "page") throw new Error("projectDoc expects a 'page' root");
  const nodes: GNode[] = [];
  const edges: GEdge[] = [];
  const seen = new Set<string>();
  const add = (n: GNode): void => { if (!seen.has(n.id)) { seen.add(n.id); nodes.push(n); } };
  const root = pageId(page.text ?? page.id);
  add({ id: root, kind: "page", label: page.text ?? page.id, props: page.props ?? {} });
  const walk = (b: Block, parentNodeId: string): void => {
    const nid = b.type === "page" ? pageId(b.text ?? b.id) : b.id;
    if (b !== page) {
      add({ id: nid, kind: b.type, label: b.text ?? b.id, props: b.props ?? {} });
      edges.push({ from: parentNodeId, to: nid, type: "CONTAINS" });
    }
    if (b.text) {
      const { links, mentions } = parseRefs(b.text);
      for (const l of links) edges.push({ from: nid, to: pageId(l), type: "LINKS_TO" });
      for (const m of mentions) { add({ id: entityId(m), kind: "entity", label: m, props: {} }); edges.push({ from: nid, to: entityId(m), type: "MENTIONS" }); }
    }
    if (b.props) for (const [k, v] of Object.entries(b.props)) if (k.startsWith("rel:") && typeof v === "string") edges.push({ from: nid, to: pageId(v), type: "RELATES" });
    b.children?.forEach((c) => walk(c, nid));
  };
  walk(page, root);
  return { nodes, edges };
}

export function mergeGraphs(graphs: KGraph[]): KGraph {
  const nodes = new Map<string, GNode>();
  const edges: GEdge[] = [];
  for (const g of graphs) { for (const n of g.nodes) if (!nodes.has(n.id)) nodes.set(n.id, n); edges.push(...g.edges); }
  return { nodes: [...nodes.values()], edges };
}

export function backlinks(g: KGraph, pageTitle: string): GNode[] {
  const target = pageId(pageTitle);
  const byId = new Map(g.nodes.map((n) => [n.id, n]));
  return g.edges.filter((e) => e.type === "LINKS_TO" && e.to === target).map((e) => byId.get(e.from)).filter((n): n is GNode => !!n);
}

export function related(g: KGraph, nodeId: string, hops = 1): GNode[] {
  const byId = new Map(g.nodes.map((n) => [n.id, n]));
  const seen = new Set([nodeId]);
  let frontier = [nodeId];
  for (let h = 0; h < hops; h++) {
    const next: string[] = [];
    for (const e of g.edges) {
      if (frontier.includes(e.from) && !seen.has(e.to)) { seen.add(e.to); next.push(e.to); }
      if (frontier.includes(e.to) && !seen.has(e.from)) { seen.add(e.from); next.push(e.from); }
    }
    frontier = next;
  }
  seen.delete(nodeId);
  return [...seen].map((id) => byId.get(id)).filter((n): n is GNode => !!n);
}

export function rollup(g: KGraph, nodeId: string, edgeType: EdgeType, prop: string, agg: "count" | "sum" | "avg"): number {
  const byId = new Map(g.nodes.map((n) => [n.id, n]));
  const targets = g.edges.filter((e) => e.type === edgeType && e.from === nodeId).map((e) => byId.get(e.to)).filter((n): n is GNode => !!n);
  if (agg === "count") return targets.length;
  const vals = targets.map((n) => Number(n.props[prop])).filter((v) => !Number.isNaN(v));
  const sum = vals.reduce((a, b) => a + b, 0);
  return agg === "sum" ? sum : vals.length ? sum / vals.length : 0;
}

export function query(g: KGraph, predicate: (n: GNode) => boolean): GNode[] { return g.nodes.filter(predicate); }

export function mentionsOf(g: KGraph, entity: string): GNode[] {
  const target = entityId(entity);
  const byId = new Map(g.nodes.map((n) => [n.id, n]));
  return g.edges.filter((e) => e.type === "MENTIONS" && e.to === target).map((e) => byId.get(e.from)).filter((n): n is GNode => !!n);
}

/** Lightweight degree-centrality over entity nodes — a client-side stand-in for the server's GDS PageRank. */
export function centralEntities(g: KGraph, limit = 5): Array<{ name: string; degree: number }> {
  const deg = new Map<string, number>();
  for (const e of g.edges) if (e.type === "MENTIONS") deg.set(e.to, (deg.get(e.to) ?? 0) + 1);
  const byId = new Map(g.nodes.map((n) => [n.id, n]));
  return [...deg.entries()].map(([id, degree]) => ({ name: byId.get(id)?.label ?? id, degree }))
    .sort((a, b) => b.degree - a.degree).slice(0, limit);
}
