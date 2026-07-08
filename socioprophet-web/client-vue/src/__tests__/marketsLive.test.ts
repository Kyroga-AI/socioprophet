import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchCryptoLive } from '../data/adapters/marketsLive';

const sample = {
  bitcoin: { usd: 63125.4, usd_24h_change: 2.31 },
  ethereum: { usd: 3410.88, usd_24h_change: -1.12 },
  solana: { usd: 151.2, usd_24h_change: 4.9 },
  ripple: { usd: 0.4921, usd_24h_change: 0.4 },
  'avalanche-2': { usd: 28.44, usd_24h_change: -3.1 },
  dogecoin: { usd: 0.1256, usd_24h_change: 1.8 },
};
const mockFetch = (ok: boolean, body: unknown) => vi.fn().mockResolvedValue({ ok, json: () => Promise.resolve(body) });
afterEach(() => vi.restoreAllMocks());

describe('markets live (crypto) adapter', () => {
  it('maps CoinGecko ids back to our symbols with price + 24h change', async () => {
    vi.stubGlobal('fetch', mockFetch(true, sample));
    const m = await fetchCryptoLive();
    expect(m).not.toBeNull();
    expect(m!.get('BTCUSD')).toEqual({ price: 63125.4, changePct: 2.31 });
    expect(m!.get('ETHUSD')!.changePct).toBe(-1.12);
    // sub-$10 assets keep 4 decimals
    expect(m!.get('XRPUSD')!.price).toBe(0.4921);
    expect(m!.get('DOGEUSD')!.price).toBe(0.1256);
    expect(m!.size).toBe(6);
  });

  it('fails closed on non-200 (e.g. 429 rate-limit), throw, and empty', async () => {
    vi.stubGlobal('fetch', mockFetch(false, sample));
    expect(await fetchCryptoLive()).toBeNull();
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect(await fetchCryptoLive()).toBeNull();
    vi.stubGlobal('fetch', mockFetch(true, {}));
    expect(await fetchCryptoLive()).toBeNull();
  });
});
