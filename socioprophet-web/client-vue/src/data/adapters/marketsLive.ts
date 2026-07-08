// Live markets adapter — flips the crypto asset class off FIXTURE using CoinGecko's
// public simple-price endpoint (no key, CORS-enabled). Returns a map of our symbol
// → live USD price + 24h change, which MarketMonitor overlays onto the fixture
// instruments. Fails closed (returns null) so we fall back to fixture on
// offline / rate-limit (429) / block.

// Our instrument symbol → CoinGecko coin id.
const IDS: Record<string, string> = {
  BTCUSD: 'bitcoin',
  ETHUSD: 'ethereum',
  SOLUSD: 'solana',
  XRPUSD: 'ripple',
  AVAXUSD: 'avalanche-2',
  DOGEUSD: 'dogecoin',
};

export interface CryptoQuote { price: number; changePct: number }

export async function fetchCryptoLive(): Promise<Map<string, CryptoQuote> | null> {
  try {
    const ids = Object.values(IDS).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) return null; // 429 rate-limit / offline → fixture
    const j = (await res.json()) as Record<string, { usd?: number; usd_24h_change?: number }>;
    const out = new Map<string, CryptoQuote>();
    for (const [sym, id] of Object.entries(IDS)) {
      const q = j[id];
      if (q && typeof q.usd === 'number') {
        out.set(sym, {
          price: +q.usd.toFixed(q.usd < 10 ? 4 : 2),
          changePct: +Number(q.usd_24h_change ?? 0).toFixed(2),
        });
      }
    }
    return out.size ? out : null;
  } catch {
    return null;
  }
}
