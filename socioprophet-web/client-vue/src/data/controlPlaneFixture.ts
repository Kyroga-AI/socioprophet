// Organization Control Plane — the management console for an org fielding Noetica to
// its employees/users. Surfaces the governance stack operationally: seats & autonomy
// levels, the GOVERNANCE QUEUE (what Noetica proposed, pending human admission — the
// WorldClaim policy_status review inbox), per-role policy (autonomy caps + capability
// membrane), and the audit trail. UI-only fixture; a real deployment wires the queue +
// seats to the live agent-machine / capability-membrane receipts.
import type { OmegaState } from '../ontology/ontogenesis';

// Autonomy ladder an org grants per role (L0 observe → L5 autonomous).
export type AutonomyLevel = 0 | 1 | 2 | 3 | 4 | 5;
export const AUTONOMY_LEVELS: Array<{ level: AutonomyLevel; label: string; blurb: string }> = [
  { level: 0, label: 'Observe', blurb: 'Reads only; no suggestions.' },
  { level: 1, label: 'Suggest', blurb: 'Proposes; human does everything.' },
  { level: 2, label: 'Draft', blurb: 'Drafts actions; human approves each.' },
  { level: 3, label: 'Act · review', blurb: 'Acts, every action queued for review.' },
  { level: 4, label: 'Act · notify', blurb: 'Acts within policy; notifies after.' },
  { level: 5, label: 'Autonomous', blurb: 'Acts within membrane; audited only.' },
];

export type SeatStatus = 'active' | 'idle' | 'suspended';
export interface Seat {
  id: string; name: string; role: string; dept: string;
  autonomy: AutonomyLevel; status: SeatStatus; lastActive: string;
  claims30d: number; admitRate: number; // % of this seat's proposed claims admitted
}

export type QueueKind = 'world-claim' | 'action' | 'canon-edit';
export type QueuePolicy = 'proposed' | 'provisional' | 'review';
export interface QueueItem {
  id: string; kind: QueueKind; summary: string; subject: string;
  policy: QueuePolicy; omega: OmegaState; confidence: number;
  seatId: string; at: string; receivedAt: string; // receivedAt = ISO ts, drives SLA aging
}

export interface RolePolicy { role: string; autonomyCap: AutonomyLevel; membrane: string[] } // allowed capability surfaces
export type AuditDecision = 'admitted' | 'rejected' | 'held-for-review' | 'executed';
export interface AuditEntry { id: string; at: string; actor: string; decision: AuditDecision; subject: string; omega: OmegaState; receipt: string; reason?: string }

// Reason codes recorded on a reject/escalate (Stripe/Sift review-queue pattern) — a
// governed, enumerated set so the audit trail carries WHY, not just what.
export const DECISION_REASONS = ['unsourced', 'policy-violation', 'low-confidence', 'duplicate', 'out-of-scope', 'needs-human'] as const;
export type DecisionReason = typeof DECISION_REASONS[number];

// receivedAt timestamps are minted relative to load so SLA aging is live in the demo.
const minsAgo = (m: number) => new Date(Date.now() - m * 60000).toISOString();

// name doubles as the HolographMe subject (resolves via reputationFor) so each fielded
// seat carries its portable verified reputation. A high-autonomy + low-reputation seat
// (e.g. 'the skeptic' at L5) is exactly the governance tension the console should surface.
export const SEATS: Seat[] = [
  { id: 's1', name: 'Ada L.', role: 'Analyst', dept: 'Research', autonomy: 3, status: 'active', lastActive: '2m ago', claims30d: 412, admitRate: 91 },
  { id: 's2', name: 'Linus', role: 'Ops Lead', dept: 'Operations', autonomy: 4, status: 'active', lastActive: 'just now', claims30d: 688, admitRate: 87 },
  { id: 's3', name: 'B. Berners', role: 'Compliance', dept: 'Risk', autonomy: 2, status: 'active', lastActive: '11m ago', claims30d: 133, admitRate: 98 },
  { id: 's4', name: 'Grace', role: 'Trader', dept: 'Markets', autonomy: 4, status: 'idle', lastActive: '1h ago', claims30d: 921, admitRate: 82 },
  { id: 's5', name: 'the skeptic', role: 'Field Agent', dept: 'Field', autonomy: 5, status: 'active', lastActive: '4m ago', claims30d: 1503, admitRate: 79 },
  { id: 's6', name: 'F. Lindqvist', role: 'Intern', dept: 'Research', autonomy: 1, status: 'suspended', lastActive: '3d ago', claims30d: 27, admitRate: 74 },
];

export const QUEUE: QueueItem[] = [
  { id: 'q1', kind: 'world-claim', summary: 'Median income for Tract 61 (Manhattan) → $128k', subject: 'map · economic', policy: 'review', omega: 'TRUSTED', confidence: 0.9, seatId: 's1', at: '3m ago', receivedAt: minsAgo(3) },
  { id: 'q2', kind: 'action', summary: 'Rebalance copper-major hedge −4% (supply-risk trigger)', subject: 'markets · algo', policy: 'review', omega: 'LINKED', confidence: 0.71, seatId: 's4', at: '6m ago', receivedAt: minsAgo(6) },
  { id: 'q3', kind: 'canon-edit', summary: 'Add SKOS term “audit-trail guidance” to legal canon', subject: 'law · ontology', policy: 'provisional', omega: 'NORMALIZED', confidence: 0.64, seatId: 's3', at: '18m ago', receivedAt: minsAgo(18) },
  { id: 'q4', kind: 'world-claim', summary: 'Flood-risk reclass for 12 cells (FEMA AE) → high', subject: 'map · environment', policy: 'review', omega: 'ACTIONABLE', confidence: 0.88, seatId: 's5', at: '22m ago', receivedAt: minsAgo(22) },
  { id: 'q5', kind: 'action', summary: 'Open supplier contract · Meridian Logistics (stage 3)', subject: 'marketplace · orchestrate', policy: 'proposed', omega: 'SEEDED', confidence: 0.55, seatId: 's2', at: '31m ago', receivedAt: minsAgo(31) },
];

export const ROLE_POLICY: RolePolicy[] = [
  { role: 'Analyst', autonomyCap: 3, membrane: ['map', 'news', 'people', 'knowledge'] },
  { role: 'Ops Lead', autonomyCap: 4, membrane: ['map', 'marketplace', 'supply-chain', 'operator'] },
  { role: 'Compliance', autonomyCap: 2, membrane: ['law', 'audit', 'governance'] },
  { role: 'Trader', autonomyCap: 4, membrane: ['markets', 'portfolio', 'algo'] },
  { role: 'Field Agent', autonomyCap: 5, membrane: ['map', 'situations', 'news'] },
  { role: 'Intern', autonomyCap: 1, membrane: ['knowledge'] },
];

export const AUDIT: AuditEntry[] = [
  { id: 'a1', at: minsAgo(1), actor: 'C. Nguyen', decision: 'admitted', subject: 'ACS income · Tract 44', omega: 'ACTIONABLE', receipt: 'sha256:ac3f…9101' },
  { id: 'a2', at: minsAgo(9), actor: 'membrane', decision: 'held-for-review', subject: 'algo rebalance · copper', omega: 'LINKED', receipt: 'sha256:7f21…c2b8' },
  { id: 'a3', at: minsAgo(14), actor: 'B. Okafor', decision: 'executed', subject: 'supplier admit · stage 2', omega: 'TRUSTED', receipt: 'sha256:1b90…4efa' },
  { id: 'a4', at: minsAgo(27), actor: 'C. Nguyen', decision: 'rejected', subject: 'canon edit · unsourced', omega: 'SEEDED', receipt: 'sha256:d305…08cc', reason: 'unsourced' },
];
