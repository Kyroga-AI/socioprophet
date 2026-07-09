import { describe, it, expect, vi, afterEach } from 'vitest';
import { runsToAudit, governanceAlerts, fetchLiveGovernance } from '../data/adapters/controlPlaneLive';
import type { GovRun, GovPosture, Containment, AutonomyState } from '../services/agentMachineApi';

const RUNS: GovRun[] = [
  { run_id: 'e7e402ea-2dfe-47f8', model_routed: 'qwen2.5:7b', provider: 'ollama', policy_admitted: true, memory_written: true, timestamp: '2026-07-06T23:27:38.082Z', latency_ms: 278972, input_tokens: 1464, output_tokens: 33, cost_usd: 0, tokens_egressed: 0, task: 'general', session_id: 's1' },
  { run_id: 'ab12cd34-0000-1111', model_routed: 'llama3.2:3b', provider: 'ollama', policy_admitted: false, memory_written: false, timestamp: '2026-07-06T22:00:00.000Z', latency_ms: 1200, input_tokens: 40, output_tokens: 5, cost_usd: 0, tokens_egressed: 128, task: 'chat', session_id: 's1' },
];

const POSTURE: GovPosture = {
  killSwitchArmed: false, killSwitchReason: null, scopedConfigured: false, policyId: null, policyName: null,
  authorityHierarchy: [{ level: 'root', label: 'Kill-switch', description: '', active: false }, { level: 'developer', label: 'Capability gate', description: '', active: true }],
  escalationActionClasses: ['destructive_action'],
};
const CONT_FULL: Containment = { killed: false, reason: null, since: null, purpose: 'full', purpose_allows: ['net', 'fs-read', 'fs-write', 'exec', 'tool', 'model', 'memory-write'], purposes: [] };

afterEach(() => vi.restoreAllMocks());

describe('runs → audit trail', () => {
  it('maps policy admission to a governed decision with a real run receipt', () => {
    const a = runsToAudit(RUNS);
    expect(a[0].decision).toBe('admitted');
    expect(a[0].receipt).toBe('run:e7e402ea');
    expect(a[0].actor).toBe('ollama/qwen2.5:7b');
    expect(a[0].omega).toBe('TRUSTED');          // admitted + memory-written = strongest rung
    expect(a[1].decision).toBe('held-for-review'); // not policy-admitted
    expect(a[1].reason).toBe('policy-held');
    expect(a[1].subject).toContain('128 egressed'); // real egress surfaced
  });
});

describe('posture/containment → governance alerts', () => {
  it('raises a critical alert when the kill-switch is armed', () => {
    const alerts = governanceAlerts({ ...POSTURE, killSwitchArmed: true, killSwitchReason: 'manual halt' }, { ...CONT_FULL, killed: true, reason: 'manual halt' });
    expect(alerts[0].severity).toBe('critical');
    expect(alerts[0].title).toContain('Kill-switch');
  });
  it('warns on a broad "full" purpose grant and notes unscoped egress', () => {
    const alerts = governanceAlerts(POSTURE, CONT_FULL);
    expect(alerts.some((a) => a.title.includes('full'))).toBe(true);
    expect(alerts.some((a) => a.title.includes('SCOPE-D'))).toBe(true);
    expect(alerts.some((a) => a.severity === 'critical')).toBe(false); // nothing armed
  });
});

describe('fetchLiveGovernance', () => {
  const AUT: AutonomyState = { session: { role: 'operator', authorizedLevel: 'L1', evidence: ['manual-bind'] }, enforced: true, ladder: [] };
  it('assembles live governance from the agent-machine endpoints', async () => {
    const routes: Record<string, unknown> = {
      '/api/governance/posture': POSTURE, '/api/autonomy': AUT, '/api/containment': CONT_FULL, '/api/governance/recent': { runs: RUNS },
    };
    vi.stubGlobal('fetch', vi.fn((url: string) => {
      const path = new URL(url, 'http://x').pathname;
      return Promise.resolve({ ok: true, json: () => Promise.resolve(routes[path]) });
    }));
    const g = await fetchLiveGovernance();
    expect(g).not.toBeNull();
    expect(g!.audit).toHaveLength(2);
    expect(g!.autonomy.session.authorizedLevel).toBe('L1');
    expect(g!.alerts.length).toBeGreaterThan(0);
  });
  it('fails closed to null when the agent-machine is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')));
    expect(await fetchLiveGovernance()).toBeNull();
  });
});
