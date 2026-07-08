import { fetchT } from './http';
// Live crime — real reported incidents from NYC Open Data (Socrata), no key, CORS.
// NYPD Complaint Data (Current, year-to-date), dataset 5uac-w243. We pull incidents
// in the current viewport and bin them to the map's hex cells, turning the synthetic
// "safety" layer into REAL reported-incident intensity — a genuinely-real civic layer
// that climbs the ontogenesis Ω ladder to TRUSTED/ACTIONABLE. Fails closed (null) →
// the map stays on the fixture safety field. NYC-scoped (aligns with the ACS census
// pin to New York County); other cities need their own open-data endpoint.
export interface CrimePoint { lon: number; lat: number; category: string }

const ENDPOINT = 'https://data.cityofnewyork.us/resource/5uac-w243.json';

export interface CrimeBBox { s: number; w: number; n: number; e: number }

export async function fetchCrime(bbox: CrimeBBox, limit = 4000): Promise<CrimePoint[] | null> {
  try {
    const where = `latitude > ${bbox.s} AND latitude < ${bbox.n} AND longitude > ${bbox.w} AND longitude < ${bbox.e} AND latitude IS NOT NULL`;
    const url = `${ENDPOINT}?$select=latitude,longitude,law_cat_cd&$where=${encodeURIComponent(where)}&$limit=${limit}`;
    const res = await fetchT(url, { headers: { accept: 'application/json' } }, 12000);
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<{ latitude?: string; longitude?: string; law_cat_cd?: string }>;
    if (!Array.isArray(rows) || !rows.length) return null;
    const pts: CrimePoint[] = [];
    for (const r of rows) {
      // Number(null) and Number('') are 0, not NaN — reject empties explicitly and
      // guard against (0,0) null-island coords before trusting the parse.
      if (r.latitude == null || r.longitude == null || r.latitude === '' || r.longitude === '') continue;
      const lat = Number(r.latitude); const lon = Number(r.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat === 0 || lon === 0) continue;
      pts.push({ lon, lat, category: r.law_cat_cd ?? 'UNKNOWN' });
    }
    return pts.length ? pts : null;
  } catch {
    return null;
  }
}
