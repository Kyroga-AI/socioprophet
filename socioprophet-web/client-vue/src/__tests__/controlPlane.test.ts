import { describe, it, expect } from 'vitest';
import { SEATS, QUEUE, ROLE_POLICY, AUDIT, AUTONOMY_LEVELS } from '../data/controlPlaneFixture';
import { notationOf } from '../ontology/ontogenesis';

describe('organization control plane', () => {
  it('defines the full L0–L5 autonomy ladder', () => {
    expect(AUTONOMY_LEVELS.map((l) => l.level)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('GOVERNANCE INVARIANT: no fielded seat exceeds its role autonomy cap', () => {
    const capOf = (role: string) => ROLE_POLICY.find((p) => p.role === role)?.autonomyCap ?? 5;
    for (const s of SEATS) expect(s.autonomy).toBeLessThanOrEqual(capOf(s.role));
  });

  it('every seat has a role with a defined policy (autonomy cap + membrane)', () => {
    for (const s of SEATS) {
      const p = ROLE_POLICY.find((x) => x.role === s.role);
      expect(p, `role policy for ${s.role}`).toBeDefined();
      expect(p!.membrane.length).toBeGreaterThan(0);
    }
  });

  it('queue items reference a real seat and carry a governed policy + Ω grade', () => {
    for (const q of QUEUE) {
      expect(SEATS.some((s) => s.id === q.seatId)).toBe(true);
      expect(['proposed', 'provisional', 'review']).toContain(q.policy);
      expect(notationOf(q.omega)).toBeGreaterThanOrEqual(0); // valid Ω rung
    }
  });

  it('audit decisions are from the governed decision set', () => {
    for (const a of AUDIT) expect(['admitted', 'rejected', 'held-for-review', 'executed']).toContain(a.decision);
  });
});
