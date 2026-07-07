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
}
export interface LayerGroup { id: string; label: string; blurb: string; metrics: MetricDef[] }

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
    id: 'people', label: 'People', blurb: 'Population and density.',
    metrics: [
      { key: 'population', label: 'Population', min: 2000, max: 42000, unit: '', higherBetter: true, ramp: BLUE },
    ],
  },
];

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
      const a = hash(i, j);                 // "advantage" axis 0..1 (affluence/density)
      const n = (hash(i + 31, j + 17) - 0.5); // small noise
      features.push({
        type: 'Feature',
        properties: {
          id: `cell-${i}-${j}`,
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
