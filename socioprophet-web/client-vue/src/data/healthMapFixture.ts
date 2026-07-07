// Civic-statistics aggregation grid for the Map Workbench — the map as the
// place-based unifier. The extent is binned into cells (an H3-style aggregation
// grid), each carrying the "know your area" statistics a citizen cares about:
// Health, Public Safety, Education, People. The map shades areas by any metric.
// Deterministic + correlated (affluent/dense cells trend healthier, safer, better
// schools) so the choropleth reads believably. UI-only; a census/CDC/DOJ/DOE
// adapter can emit the same GeoJSON shape.

export interface MetricDef {
  key: string;
  label: string;
  min: number;
  max: number;
  unit: string;
  higherBetter: boolean;
  ramp: Array<[number, string]>; // [position 0..1, color]
  format?: 'money' | 'pct' | 'plain';
}
export interface LayerGroup { id: string; label: string; blurb: string; metrics: MetricDef[]; segmented?: boolean }

// Real-estate segment multipliers (applied per metric at render): commercial and
// industrial re-price the same cells so one layer serves all property types.
export interface Segment { id: string; label: string; f: Record<string, number> }
export const SEGMENTS: Segment[] = [
  { id: 'res', label: 'Residential', f: {} },
  { id: 'com', label: 'Commercial', f: { reMedianPrice: 2.3, reMedianRent: 2.0, reGrossYield: 1.15, reTurnoverPct: 0.8, reDefaultPct: 1.4, reOwnerOccPct: 0.35, reVacancyPct: 1.5, reChurnPct: 1.2 } },
  { id: 'ind', label: 'Industrial', f: { reMedianPrice: 1.5, reMedianRent: 1.7, reGrossYield: 1.45, reTurnoverPct: 0.6, reDefaultPct: 0.8, reOwnerOccPct: 0.3, reVacancyPct: 0.7, reChurnPct: 0.9 } },
];
export const segFactor = (segId: string, key: string): number => (SEGMENTS.find((s) => s.id === segId)?.f[key] ?? 1);

const GOOD_HIGH: Array<[number, string]> = [[0, '#d73027'], [0.5, '#fee08b'], [1, '#1a9850']]; // low=red, high=green
const BAD_HIGH: Array<[number, string]> = [[0, '#1a9850'], [0.5, '#fee08b'], [1, '#d73027']];  // low=green, high=red
const BLUE: Array<[number, string]> = [[0, '#eff3ff'], [0.5, '#6baed6'], [1, '#08519c']];

export const CIVIC_LAYERS: LayerGroup[] = [
  {
    id: 'health', label: 'Health', blurb: 'Population health, coverage, longevity.',
    metrics: [
      { key: 'healthIndex', label: 'Health index', min: 42, max: 94, unit: '', higherBetter: true, ramp: GOOD_HIGH },
      { key: 'uninsuredPct', label: 'Uninsured', min: 3, max: 24, unit: '%', higherBetter: false, ramp: BAD_HIGH },
      { key: 'lifeExpectancy', label: 'Life expectancy', min: 74, max: 85, unit: 'yr', higherBetter: true, ramp: GOOD_HIGH },
    ],
  },
  {
    id: 'safety', label: 'Public Safety', blurb: 'Crime rates and emergency response.',
    metrics: [
      { key: 'crimeRate', label: 'Violent crime', min: 5, max: 85, unit: '/1k', higherBetter: false, ramp: BAD_HIGH },
      { key: 'propertyCrime', label: 'Property crime', min: 10, max: 120, unit: '/1k', higherBetter: false, ramp: BAD_HIGH },
      { key: 'response911', label: '911 response', min: 4, max: 14, unit: 'min', higherBetter: false, ramp: BAD_HIGH },
    ],
  },
  {
    id: 'education', label: 'Education', blurb: 'School quality and outcomes.',
    metrics: [
      { key: 'schoolRating', label: 'School rating', min: 3, max: 9.5, unit: '/10', higherBetter: true, ramp: GOOD_HIGH },
      { key: 'gradRate', label: 'Graduation', min: 62, max: 98, unit: '%', higherBetter: true, ramp: GOOD_HIGH },
      { key: 'studentTeacher', label: 'Student:teacher', min: 11, max: 28, unit: ':1', higherBetter: false, ramp: BAD_HIGH },
    ],
  },
  {
    id: 'realestate', label: 'Real Estate', blurb: 'Investment lens — pricing, yield, turnover, defaults, owner/renter mix.', segmented: true,
    metrics: [
      { key: 'reMedianPrice', label: 'Median price', min: 400000, max: 2500000, unit: '', higherBetter: true, ramp: BLUE, format: 'money' },
      { key: 'reMedianRent', label: 'Median rent', min: 1800, max: 6000, unit: '/mo', higherBetter: true, ramp: BLUE, format: 'money' },
      { key: 'reGrossYield', label: 'Gross yield', min: 2.5, max: 8, unit: '%', higherBetter: true, ramp: GOOD_HIGH, format: 'pct' },
      { key: 'reTurnoverPct', label: 'Turnover', min: 3, max: 14, unit: '%', higherBetter: true, ramp: BLUE, format: 'pct' },
      { key: 'reDefaultPct', label: 'Default rate', min: 0.5, max: 6, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'reOwnerOccPct', label: 'Owner-occupied', min: 25, max: 80, unit: '%', higherBetter: true, ramp: BLUE, format: 'pct' },
      { key: 'reVacancyPct', label: 'Vacancy', min: 2, max: 12, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'reChurnPct', label: 'Renter churn', min: 8, max: 35, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
    ],
  },
  {
    id: 'housing', label: 'Housing', blurb: 'Affordability, burden, and stability.',
    metrics: [
      { key: 'rentBurdenPct', label: 'Rent burden', min: 18, max: 55, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'costBurdenedPct', label: 'Cost-burdened', min: 20, max: 60, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'evictionPct', label: 'Eviction rate', min: 0.3, max: 5, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'housingVacancyPct', label: 'Vacancy', min: 2, max: 14, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
    ],
  },
  {
    id: 'environment', label: 'Environment', blurb: 'Air, flood risk, and green space.',
    metrics: [
      { key: 'airQualityAqi', label: 'Air quality (AQI)', min: 20, max: 120, unit: '', higherBetter: false, ramp: BAD_HIGH },
      { key: 'floodRiskPct', label: 'Flood risk', min: 2, max: 40, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'greenSpacePct', label: 'Green space', min: 3, max: 45, unit: '%', higherBetter: true, ramp: GOOD_HIGH, format: 'pct' },
    ],
  },
  {
    id: 'mobility', label: 'Mobility', blurb: 'Transit access, commute, walkability, safety.',
    metrics: [
      { key: 'transitAccessIdx', label: 'Transit access', min: 20, max: 95, unit: '', higherBetter: true, ramp: GOOD_HIGH },
      { key: 'walkScore', label: 'Walk score', min: 25, max: 98, unit: '', higherBetter: true, ramp: GOOD_HIGH },
      { key: 'commuteMin', label: 'Commute', min: 18, max: 52, unit: 'min', higherBetter: false, ramp: BAD_HIGH },
      { key: 'crashRate', label: 'Crash rate', min: 2, max: 30, unit: '/1k', higherBetter: false, ramp: BAD_HIGH },
    ],
  },
  {
    id: 'economic', label: 'Economic', blurb: 'Income, employment, poverty, business density.',
    metrics: [
      { key: 'medianIncome', label: 'Median income', min: 35000, max: 180000, unit: '', higherBetter: true, ramp: BLUE, format: 'money' },
      { key: 'unemploymentPct', label: 'Unemployment', min: 2, max: 14, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'povertyPct', label: 'Poverty', min: 4, max: 32, unit: '%', higherBetter: false, ramp: BAD_HIGH, format: 'pct' },
      { key: 'businessDensity', label: 'Business density', min: 5, max: 90, unit: '/1k', higherBetter: true, ramp: GOOD_HIGH },
    ],
  },
  {
    id: 'foottraffic', label: 'Foot Traffic', blurb: 'Visits, dwell time, and capture rate.',
    metrics: [
      { key: 'footTrafficDaily', label: 'Daily visits', min: 200, max: 25000, unit: '', higherBetter: true, ramp: BLUE },
      { key: 'dwellMin', label: 'Dwell time', min: 8, max: 45, unit: 'min', higherBetter: true, ramp: GOOD_HIGH },
      { key: 'captureRate', label: 'Capture rate', min: 2, max: 18, unit: '%', higherBetter: true, ramp: GOOD_HIGH, format: 'pct' },
    ],
  },
  {
    id: 'newssocial', label: 'News & Social', blurb: 'Where the story is — news volume, social activity, sentiment, civic engagement by area.',
    metrics: [
      { key: 'newsVolume', label: 'News volume', min: 0, max: 120, unit: '/wk', higherBetter: true, ramp: BLUE },
      { key: 'socialPosts', label: 'Social activity', min: 100, max: 8000, unit: '/day', higherBetter: true, ramp: BLUE },
      { key: 'netSentiment', label: 'Net sentiment', min: -60, max: 60, unit: '', higherBetter: true, ramp: GOOD_HIGH },
      { key: 'civicEngagement', label: 'Civic engagement', min: 10, max: 90, unit: '', higherBetter: true, ramp: GOOD_HIGH },
    ],
  },
  {
    id: 'people', label: 'People', blurb: 'Population and density.',
    metrics: [
      { key: 'population', label: 'Population', min: 2000, max: 42000, unit: '', higherBetter: true, ramp: BLUE },
    ],
  },
];

// ── Site selection ("should I open my next location here?") ──
// A verified, computed suitability score per area for a business type. Different
// profiles weight foot traffic / income / walkability / rent / population
// differently, so the best areas genuinely differ by use-case (a high-traffic,
// affordable cell beats a rich but sleepy one for a coffee shop).
export interface SiteProfile { id: string; label: string; icon: string; w: Record<string, number> }
export const SITE_PROFILES: SiteProfile[] = [
  { id: 'coffee', label: 'Coffee shop', icon: '☕', w: { footTrafficDaily: 0.35, walkScore: 0.2, medianIncome: 0.2, businessDensity: 0.1, reMedianRent: -0.25 } },
  { id: 'restaurant', label: 'Restaurant', icon: '🍽', w: { footTrafficDaily: 0.3, medianIncome: 0.25, dwellMin: 0.15, walkScore: 0.1, reMedianRent: -0.25 } },
  { id: 'retail', label: 'Retail store', icon: '🛍', w: { footTrafficDaily: 0.35, captureRate: 0.2, medianIncome: 0.2, businessDensity: 0.1, reMedianRent: -0.25 } },
  { id: 'fitness', label: 'Fitness studio', icon: '🏋', w: { population: 0.3, medianIncome: 0.25, footTrafficDaily: 0.2, walkScore: 0.15, reMedianRent: -0.2 } },
  { id: 'grocery', label: 'Grocery', icon: '🛒', w: { population: 0.35, footTrafficDaily: 0.2, reOwnerOccPct: 0.15, medianIncome: 0.15, reMedianRent: -0.15 } },
];
const NORM: Record<string, [number, number]> = {
  footTrafficDaily: [200, 25000], medianIncome: [35000, 180000], walkScore: [25, 98], businessDensity: [5, 90],
  reMedianRent: [1800, 6000], population: [2000, 42000], dwellMin: [8, 45], captureRate: [2, 18], reOwnerOccPct: [25, 80],
};
export function scoreCell(props: Record<string, string | number>, profileId: string): number {
  const p = SITE_PROFILES.find((x) => x.id === profileId);
  if (!p) return 0;
  let score = 0; let wsum = 0;
  for (const [key, w] of Object.entries(p.w)) {
    const range = NORM[key]; if (!range) continue;
    const nv = clamp((Number(props[key] ?? 0) - range[0]) / (range[1] - range[0]), 0, 1);
    score += Math.abs(w) * (w < 0 ? 1 - nv : nv); // negative weight = lower is better (e.g. rent)
    wsum += Math.abs(w);
  }
  return Math.round((score / (wsum || 1)) * 100);
}

export const METRIC_BY_KEY: Record<string, MetricDef> = Object.fromEntries(
  CIVIC_LAYERS.flatMap((g) => g.metrics).map((m) => [m.key, m]),
);

// Map extent around NYC / Hudson (matches the workbench default view).
const BBOX = { minLon: -74.09, maxLon: -73.90, minLat: 40.64, maxLat: 40.82 };
function hash(a: number, b: number): number { let h = (a * 73856093) ^ (b * 19349663); h = (h ^ (h >>> 13)) >>> 0; return h / 4294967296; }
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

interface Cell { type: 'Feature'; properties: Record<string, number | string>; geometry: { type: 'Polygon'; coordinates: number[][][] } }
export interface CivicGrid { type: 'FeatureCollection'; features: Cell[] }

// Build the aggregation grid; deterministic + cross-correlated per (col,row).
export function civicGrid(cols = 12, rows = 11): CivicGrid {
  const dLon = (BBOX.maxLon - BBOX.minLon) / cols;
  const dLat = (BBOX.maxLat - BBOX.minLat) / rows;
  const features: Cell[] = [];
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const lon0 = BBOX.minLon + i * dLon;
      const lat0 = BBOX.minLat + j * dLat;
      const a = hash(i, j);                 // "advantage" axis 0..1 (affluence)
      const b = hash(i + 50, j + 50);       // "commercial intensity" axis 0..1 (foot traffic) — decorrelated from a
      const n = (hash(i + 31, j + 17) - 0.5); // small noise
      const reMedianPrice = Math.round(400000 + a * 2100000 + n * 200000);
      const reMedianRent = Math.round(1800 + a * 4000 + n * 500);
      // 8-quarter price trend (index 100 = current), rising faster in advantaged cells.
      const rePriceTrend = Array.from({ length: 8 }, (_, k) => +(100 - (7 - k) * (1.2 + a * 1.4) + (hash(i + k, j + k * 3) - 0.5) * 1.6).toFixed(1));
      features.push({
        type: 'Feature',
        properties: {
          id: `cell-${i}-${j}`,
          cLon: +(lon0 + dLon / 2).toFixed(5),
          cLat: +(lat0 + dLat / 2).toFixed(5),
          population: Math.round(2000 + a * 40000),
          healthIndex: Math.round(clamp(42 + a * 40 + n * 14, 42, 94)),
          uninsuredPct: +clamp(24 - a * 18 + n * 5, 3, 24).toFixed(1),
          lifeExpectancy: +clamp(74 + a * 10 + n * 1.5, 74, 85).toFixed(1),
          crimeRate: +clamp(85 - a * 70 + n * 18, 5, 85).toFixed(1),
          propertyCrime: +clamp(120 - a * 95 + n * 24, 10, 120).toFixed(1),
          response911: +clamp(14 - a * 8 + n * 2.5, 4, 14).toFixed(1),
          schoolRating: +clamp(3 + a * 6 + n * 1.2, 3, 9.5).toFixed(1),
          gradRate: Math.round(clamp(62 + a * 34 + n * 6, 62, 98)),
          studentTeacher: Math.round(clamp(28 - a * 15 + n * 4, 11, 28)),
          reMedianPrice,
          reMedianRent,
          reGrossYield: +clamp((reMedianRent * 12) / reMedianPrice * 100, 2.5, 8).toFixed(2),
          reTurnoverPct: +clamp(4 + a * 7 + n * 3, 3, 14).toFixed(1),
          reDefaultPct: +clamp(6 - a * 5 + n * 1.5, 0.5, 6).toFixed(1),
          reOwnerOccPct: Math.round(clamp(25 + a * 50 + n * 8, 25, 80)),
          reVacancyPct: +clamp(12 - a * 8 + n * 2.5, 2, 12).toFixed(1),
          reChurnPct: Math.round(clamp(35 - a * 22 + n * 6, 8, 35)),
          rePriceTrend: JSON.stringify(rePriceTrend),
          // Housing
          rentBurdenPct: Math.round(clamp(55 - a * 35 + n * 6, 18, 55)),
          costBurdenedPct: Math.round(clamp(60 - a * 38 + n * 6, 20, 60)),
          evictionPct: +clamp(5 - a * 4.5 + n * 1, 0.3, 5).toFixed(1),
          housingVacancyPct: +clamp(14 - a * 10 + n * 3, 2, 14).toFixed(1),
          // Environment
          airQualityAqi: Math.round(clamp(120 - a * 95 + n * 22, 20, 120)),
          floodRiskPct: +clamp(2 + (1 - a) * 30 + n * 8, 2, 40).toFixed(1),
          greenSpacePct: +clamp(3 + a * 40 + n * 6, 3, 45).toFixed(1),
          // Mobility
          transitAccessIdx: Math.round(clamp(20 + a * 70 + n * 10, 20, 95)),
          walkScore: Math.round(clamp(25 + a * 70 + n * 8, 25, 98)),
          commuteMin: Math.round(clamp(52 - a * 32 + n * 6, 18, 52)),
          crashRate: +clamp(30 - a * 24 + n * 6, 2, 30).toFixed(1),
          // Economic
          medianIncome: Math.round(clamp(35000 + a * 140000 + n * 15000, 35000, 180000)),
          unemploymentPct: +clamp(14 - a * 11 + n * 2, 2, 14).toFixed(1),
          povertyPct: +clamp(32 - a * 26 + n * 5, 4, 32).toFixed(1),
          businessDensity: Math.round(clamp(5 + b * 70 + a * 15 + n * 10, 5, 90)),
          // Foot traffic (driven by commercial intensity b, not just affluence a)
          footTrafficDaily: Math.round(clamp(200 + b * 22000 + a * 3000 + n * 3000, 200, 25000)),
          dwellMin: Math.round(clamp(12 + a * 22 + (1 - b) * 8 + n * 4, 8, 45)),
          captureRate: +clamp(2 + b * 13 + n * 3, 2, 18).toFixed(1),
          // News & social by region
          newsVolume: Math.round(clamp(5 + b * 100 + n * 15, 0, 120)),
          socialPosts: Math.round(clamp(100 + b * 7000 + a * 800 + n * 800, 100, 8000)),
          netSentiment: Math.round(clamp((a - 0.5) * 100 + n * 25, -60, 60)),
          civicEngagement: Math.round(clamp(10 + a * 70 + n * 12, 10, 90)),
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[[lon0, lat0], [lon0 + dLon, lat0], [lon0 + dLon, lat0 + dLat], [lon0, lat0 + dLat], [lon0, lat0]]],
        },
      });
    }
  }
  return { type: 'FeatureCollection', features };
}
