import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchCrime } from '../data/adapters/crimeLive';

const ok = (rows: unknown) => Promise.resolve(new Response(JSON.stringify(rows), { status: 200 }));
afterEach(() => vi.restoreAllMocks());

describe('crimeLive (NYC Socrata NYPD complaints)', () => {
  const bbox = { s: 40.70, w: -74.02, n: 40.78, e: -73.95 };

  it('maps Socrata rows to CrimePoints and drops rows with bad coords', async () => {
    vi.stubGlobal('fetch', vi.fn(() => ok([
      { latitude: '40.75', longitude: '-73.98', law_cat_cd: 'FELONY' },
      { latitude: '40.72', longitude: '-73.99', law_cat_cd: 'MISDEMEANOR' },
      { latitude: null, longitude: '-73.99', law_cat_cd: 'VIOLATION' }, // dropped
      { latitude: 'NaN', longitude: 'x' }, // dropped
    ])));
    const r = await fetchCrime(bbox);
    expect(r).toHaveLength(2);
    expect(r![0]).toEqual({ lon: -73.98, lat: 40.75, category: 'FELONY' });
  });

  it('fails closed (null) on a non-200', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response('', { status: 429 }))));
    expect(await fetchCrime(bbox)).toBeNull();
  });

  it('fails closed (null) on a thrown fetch', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network'))));
    expect(await fetchCrime(bbox)).toBeNull();
  });

  it('fails closed (null) on an empty result', async () => {
    vi.stubGlobal('fetch', vi.fn(() => ok([])));
    expect(await fetchCrime(bbox)).toBeNull();
  });
});
