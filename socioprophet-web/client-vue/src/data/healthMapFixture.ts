// Population + public-health aggregation grid for the Map Workbench. A deterministic
// choropleth fixture: the map extent is binned into cells (an H3-style aggregation
// grid), each carrying population + health statistics, so the map can shade areas by
// a sociodemographic / health metric. UI-only; a future census/CDC adapter can emit
// the same GeoJSON shape.

export interface HealthMetricDef {
  key: 'healthIndex' | 'population' | 'uninsuredPct' | 'lifeExpectancy';
  label: string;
  min: number;
  max: number;
  unit: string;
  higherBetter: boolean;
  // ramp stops: [position 0..1, color]
  ramp: Array<[number, string]>;
}

const RAMP_GOOD_BAD: Array<[number, string]> = [[0, '#d73027'], [0.5, '#fee08b'], [1, '#1a9850']];
const RAMP_BAD_GOOD: Array<[number, string]> = [[0, '#1a9850'], [0.5, '#fee08b'], [1, '#d73027']];
const RAMP_BLUE: Array<[number, string]> = [[0, '#eff3ff'], [0.5, '#6baed6'], [1, '#08519c']];

export const HEALTH_METRICS: HealthMetricDef[] = [
  { key: 'healthIndex', label: 'Health index', min: 42, max: 94, unit: '', higherBetter: true, ramp: RAMP_GOOD_BAD },
  { key: 'population', label: 'Population', min: 2000, max: 42000, unit: '', higherBetter: true, ramp: RAMP_BLUE },
  { key: 'uninsuredPct', label: 'Uninsured', min: 3, max: 24, unit: '%', higherBetter: false, ramp: RAMP_BAD_GOOD },
  { key: 'lifeExpectancy', label: 'Life expectancy', min: 74, max: 85, unit: 'yr', higherBetter: true, ramp: RAMP_GOOD_BAD },
];

// Map extent around NYC / Hudson (matches the workbench default view).
const BBOX = { minLon: -74.09, maxLon: -73.90, minLat: 40.64, maxLat: 40.82 };

function hash(a: number, b: number): number { let h = (a * 73856093) ^ (b * 19349663); h = (h ^ (h >>> 13)) >>> 0; return h / 4294967296; }

interface Cell { type: 'Feature'; properties: Record<string, number | string>; geometry: { type: 'Polygon'; coordinates: number[][][] } }
export interface HealthGrid { type: 'FeatureCollection'; features: Cell[] }

// Build the aggregation grid; deterministic per (col,row) so it's stable across renders.
export function healthGrid(cols = 12, rows = 11): HealthGrid {
  const dLon = (BBOX.maxLon - BBOX.minLon) / cols;
  const dLat = (BBOX.maxLat - BBOX.minLat) / rows;
  const features: Cell[] = [];
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const lon0 = BBOX.minLon + i * dLon;
      const lat0 = BBOX.minLat + j * dLat;
      const r = hash(i, j);
      const r2 = hash(i + 100, j + 7);
      const r3 = hash(i + 3, j + 200);
      // Correlate the metrics loosely: denser cells trend to more coverage + longer life.
      const population = Math.round(2000 + r * 40000);
      const density = r; // 0..1
      const uninsuredPct = +(3 + (1 - density) * 18 + r2 * 4).toFixed(1);
      const healthIndex = Math.round(42 + density * 40 + (1 - uninsuredPct / 24) * 12);
      const lifeExpectancy = +(74 + (healthIndex - 42) / (94 - 42) * 11 + (r3 - 0.5)).toFixed(1);
      features.push({
        type: 'Feature',
        properties: {
          id: `cell-${i}-${j}`,
          population,
          healthIndex: Math.max(42, Math.min(94, healthIndex)),
          uninsuredPct,
          lifeExpectancy,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [lon0, lat0], [lon0 + dLon, lat0], [lon0 + dLon, lat0 + dLat], [lon0, lat0 + dLat], [lon0, lat0],
          ]],
        },
      });
    }
  }
  return { type: 'FeatureCollection', features };
}
