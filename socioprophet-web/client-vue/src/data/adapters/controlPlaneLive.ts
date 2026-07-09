// Live governance adapter — binds the Organization Control Plane to the REAL sovereign
// Agent Machine (Noetica) running on :8080. Read-only: it consumes the agent-machine's
// already-live /api/governance, /api/autonomy and /api/containment endpoints and maps
// them onto the Control Plane's shapes. Fails closed (null) so the surface falls back to
// the fixture demo when the agent-machine isn't running. This is what makes the plane
// real rather than a paper tiger: the audit trail below is the machine's actual
// policy-admitted reasoning runs, the ladder is enforced, the membrane is its live purpose.
import { govPosture, autonomyState, containment, govRecent, type GovPosture, type AutonomyState, type Containment, type GovRun } from '../../services/agentMachineApi';
import type { AuditEntry } from '../controlPlaneFixture';
import type { OmegaState } from '../../ontology/ontogenesis';
import type { Alert } from '../../features/controlPlane/governance';

export interface LiveGovernance {
  posture: GovPosture;
  autonomy: AutonomyState;
  containment: Containment;
  runs: GovRun[];
  audit: AuditEntry[]; // runs mapped to audit rows
  alerts: Alert[];      // posture/containment-derived alerts
}

// A policy-admitted, memory-written run is the machine's strongest evidence rung; an
// admitted-but-not-persisted run is actionable; a held run sits lower. Derived, labelled.
function omegaOfRun(r: GovRun): OmegaState {
  if (!r.policy_admitted) return 'LINKED';
  return r.memory_written ? 'TRUSTED' : 'ACTIONABLE';
}

export function runsToAudit(runs: GovRun[]): AuditEntry[] {
  return runs.map((r) => ({
    id: `run-${r.run_id}`,
    at: r.timestamp,
    actor: `${r.provider}/${r.model_routed}`,
    decision: r.policy_admitted ? 'admitted' : 'held-for-review',
    subject: `${r.task} · ${r.output_tokens} tok · ${r.tokens_egressed} egressed`,
    omega: omegaOfRun(r),
    receipt: `run:${r.run_id.slice(0, 8)}`,
    reason: r.policy_admitted ? undefined : 'policy-held',
  }));
}

// Posture + containment → governance alerts (the real machine's risk surface).
export function governanceAlerts(posture: GovPosture, cont: Containment): Alert[] {
  const out: Alert[] = [];
  if (posture.killSwitchArmed || cont.killed) {
    out.push({ id: 'am-kill', severity: 'critical', kind: 'suspended-grant',
      title: 'Kill-switch ARMED — agent halted', detail: cont.reason || posture.killSwitchReason || 'The containment kill-switch is armed; the agent cannot act until disarmed.' });
  }
  if (cont.purpose === 'full') {
    out.push({ id: 'am-purpose', severity: 'warn', kind: 'low-admit-autonomy',
      title: `Purpose bound to “full” — all ${cont.purpose_allows.length} capabilities allowed`,
      detail: 'The agent runs with the broadest capability grant (net, exec, fs-write…). Narrow the purpose to least-privilege for routine work.' });
  }
  if (!posture.scopedConfigured) {
    out.push({ id: 'am-scoped', severity: 'info', kind: 'low-admit-autonomy',
      title: 'SCOPE-D egress policy not configured', detail: 'No EngagementPolicy governs egress routing — cloud calls are ungoverned until a scoped policy is bound.' });
  }
  const rank = { critical: 0, warn: 1, info: 2 } as const;
  return out.sort((a, b) => rank[a.severity] - rank[b.severity]);
}

export async function fetchLiveGovernance(): Promise<LiveGovernance | null> {
  try {
    const [posture, autonomy, cont, recent] = await Promise.all([govPosture(), autonomyState(), containment(), govRecent()]);
    if (!posture || !autonomy) return null;
    const runs = recent?.runs ?? [];
    return { posture, autonomy, containment: cont, runs, audit: runsToAudit(runs), alerts: governanceAlerts(posture, cont) };
  } catch {
    return null; // agent-machine not running / unreachable → fall back to fixture
  }
}
