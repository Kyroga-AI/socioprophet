<template>
  <section class="mapx" :class="{ 'is-ready': !!snapshot }" aria-label="GAIA map workbench">
    <!-- Full-bleed map is the hero; everything else floats over it -->
    <div ref="mapContainer" class="mapx-canvas map-canvas" aria-label="GAIA map canvas"></div>

    <!-- Pre-snapshot states -->
    <div v-if="loading && !snapshot" class="mapx-splash">Loading map…</div>
    <div v-if="error && !snapshot" class="mapx-splash mapx-splash--error">{{ error }}</div>

    <!-- map-grid is display:contents (no box) so the floating children still
         anchor to .mapx; the class is the "UI is present" hook. -->
    <div v-if="snapshot" class="map-grid">
      <!-- Floating title / mode bar -->
      <div class="mapx-topbar">
        <div class="mapx-brand">
          <span class="mapx-logo" aria-hidden="true">◎</span>
          <div class="mapx-titles">
            <span class="mapx-title">OpenStreetMap × GAIA</span>
            <span class="mapx-sub">world model · advisory routing</span>
          </div>
        </div>
        <div class="mapx-modes">
          <span :class="['pill', dataMode === 'live' ? 'pill--live' : 'pill--demo']">{{ dataModeLabel }}</span>
          <span :class="['pill', catalogMode === 'live' ? 'pill--live' : 'pill--demo']">{{ catalogModeLabel }}</span>
          <span class="pill pill--muted">updated {{ lastLoadedAtLabel }}</span>
          <RuntimeAdapterStatusBadge
            v-for="feature in mapRuntimeFeatures"
            :key="feature.feature_id"
            :feature="feature"
          />
        </div>
      </div>

      <!-- Compact notices (full text kept for a11y/tests, shown short) -->
      <div v-if="warning || catalogWarning" class="mapx-notices">
        <div v-if="warning" class="mapx-note">
          <span class="mapx-note-dot" aria-hidden="true" />
          <span class="mapx-note-label">Demo data — for demonstration only, not a production data plane</span>
          <span class="sr-only">{{ warning }} This mode is for product demonstration only and is not a production data plane.</span>
        </div>
        <div v-if="catalogWarning" class="mapx-note" data-testid="gaia-layer-catalog-warning">
          <span class="mapx-note-dot" aria-hidden="true" />
          <span class="mapx-note-label">Demo tile catalog — advisory, fixture-backed</span>
          <span class="sr-only">{{ catalogWarning }} Catalog mode remains advisory and fixture-backed.</span>
        </div>
      </div>

      <!-- LEFT floating panel: controls, layers, lookup -->
      <aside v-show="leftOpen" class="mapx-panel mapx-panel--left">
        <button class="mapx-collapse" type="button" title="Collapse controls" aria-label="Collapse controls" @click="leftOpen = false">‹</button>
        <section class="panel-section">
          <div class="section-title">Workbench controls</div>
          <button class="primary" type="button" :disabled="refreshing" @click="refreshSnapshot">
            {{ refreshing ? 'Refreshing…' : 'Refresh snapshot' }}
          </button>
          <div class="control-actions">
            <button class="secondary" type="button" @click="jumpToPanel('runtime-adapter-panel')">Runtime</button>
            <button class="secondary" type="button" @click="jumpToPanel('feature-panel')">Feature</button>
            <button class="secondary" type="button" @click="jumpToPanel('evidence-panel')">Evidence</button>
            <button class="secondary" type="button" @click="jumpToPanel('governance-panel')">Governance</button>
            <button class="secondary" type="button" @click="jumpToPanel('layer-catalog-panel')">Layer catalog</button>
          </div>
          <p class="lookup-status">{{ refreshStatus || `Current data mode: ${dataModeLabel}` }}</p>
          <p class="lookup-status">Layer catalog: {{ layerCatalogStatus || catalogModeLabel }}</p>
        </section>

        <section class="panel-section">
          <div class="section-title">Legacy map layers</div>
          <button
            v-for="layer in layers"
            :key="layer.layer_id"
            :class="['layer-card', { selected: selectedLayerId === layer.layer_id }]"
            type="button"
            @click="selectedLayerId = layer.layer_id"
          >
            <div class="layer-title">{{ layer.title }}</div>
            <div class="layer-meta">{{ layer.layer_type }} · {{ layer.tiles?.format || 'metadata' }}</div>
            <div class="layer-attribution">{{ layer.attribution?.attribution_text }}</div>
          </button>
        </section>

        <section id="layer-catalog-panel" class="panel-section" data-testid="gaia-layer-catalog-panel">
          <div class="section-title">GAIA layer catalog</div>
          <p class="lookup-status">{{ catalogModeLabel }} · production_tile_serving={{ catalogProductionTileServing }}</p>
          <button
            v-for="layer in gaiaCatalogLayers"
            :key="layer.layer_id"
            :class="['layer-card', { selected: selectedGaiaLayerId === layer.layer_id }]"
            type="button"
            data-testid="gaia-layer-button"
            @click="selectGaiaLayer(layer.layer_id)"
          >
            <div class="layer-title">{{ layer.title }}</div>
            <div class="layer-meta">{{ layer.layer_id }}</div>
            <div class="layer-attribution">{{ layer.attribution?.attribution_text || 'Attribution required' }}</div>
          </button>
        </section>

        <section class="panel-section">
          <div class="section-title">Spatial lookup</div>
          <label class="input-label" for="h3-cell">H3 cell</label>
          <input id="h3-cell" v-model="h3Cell" class="field" type="text" />
          <button class="primary" type="button" :disabled="h3Loading" data-testid="h3-inspect-button" @click="refreshH3">
            {{ h3Loading ? 'Inspecting…' : 'Inspect H3' }}
          </button>
          <p v-if="lookupStatus" class="lookup-status">{{ lookupStatus }}</p>
        </section>

        <section class="panel-section">
          <div class="section-title">Runtime posture</div>
          <div class="runtime-row" v-for="runtime in runtimes" :key="runtime.name">
            <span>{{ runtime.name }}</span>
            <strong>{{ runtime.lattice_admission || runtime.status }}</strong>
          </div>
        </section>
      </aside>

      <!-- RIGHT floating panel: inspector -->
      <aside v-show="rightOpen" class="mapx-panel mapx-panel--right">
        <button class="mapx-collapse" type="button" title="Collapse inspector" aria-label="Collapse inspector" @click="rightOpen = false">›</button>
        <section id="runtime-adapter-panel" class="panel-section" data-testid="map-runtime-adapter-panel">
          <div class="section-title">Runtime adapter status</div>
          <div class="tag-row">
            <RuntimeAdapterStatusBadge
              v-for="feature in mapRuntimeFeatures"
              :key="`${feature.feature_id}-panel-badge`"
              :feature="feature"
            />
          </div>
          <div class="detail-grid" v-for="feature in mapRuntimeFeatures" :key="`${feature.feature_id}-details`">
            <span>{{ feature.display_name }}</span><strong>{{ feature.runtime_state }} · {{ feature.evidence_level }}</strong>
            <span>Owner</span><strong>{{ feature.service_owner_repo }}</strong>
            <span>Contract</span><strong>{{ feature.live_contract_ref || 'pending' }}</strong>
            <span>Boundary</span><strong>{{ feature.mock_boundary || 'none declared' }}</strong>
          </div>
        </section>

        <section id="feature-panel" class="panel-section">
          <div class="section-title">Feature inspector</div>
          <h2>{{ selectedFeature?.gaia_ref?.entity_id || 'No feature selected' }}</h2>
          <div class="detail-grid">
            <span>Source</span><strong>{{ selectedFeature?.source || '—' }}</strong>
            <span>OSM ref</span><strong>{{ selectedFeature?.osm_ref?.osm_type }}/{{ selectedFeature?.osm_ref?.osm_id }}</strong>
            <span>GAIA type</span><strong>{{ selectedFeature?.gaia_ref?.entity_type || '—' }}</strong>
            <span>Safety</span><strong>{{ selectedFeature?.routing?.safety_status || routeSafetyStatus }}</strong>
            <span>Data mode</span><strong>{{ dataModeLabel }}</strong>
            <span>Last loaded</span><strong>{{ lastLoadedAtLabel }}</strong>
          </div>
          <div class="tag-row">
            <span v-for="cell in featureH3Cells" :key="cell" class="tag">{{ cell }}</span>
          </div>
        </section>

        <section id="gaia-tile-manifest-panel" class="panel-section" data-testid="gaia-tile-manifest-panel">
          <div class="section-title">Tile manifest metadata</div>
          <h2>{{ selectedTileManifest?.title || selectedGaiaLayer?.title || 'No GAIA layer selected' }}</h2>
          <div class="detail-grid">
            <span>Layer</span><strong>{{ selectedTileManifest?.layer_id || selectedGaiaLayer?.layer_id || '—' }}</strong>
            <span>Status</span><strong>{{ selectedTileManifest?.tile_serving_status || 'metadata-only' }}</strong>
            <span>Production tiles</span><strong>{{ selectedTileManifest?.production_tile_serving === true ? 'true' : 'false' }}</strong>
            <span>Tile URL</span><strong>{{ selectedTileManifest?.tiles?.url_template || '—' }}</strong>
            <span>Placeholder guard</span><strong data-testid="placeholder-tile-guard">{{ placeholderTileNotice }}</strong>
            <span>Fixture digest</span><strong>{{ selectedTileManifest?.provenance?.fixture_digest || selectedGaiaLayer?.provenance?.fixture_digest || '—' }}</strong>
          </div>
          <p class="lookup-status">
            Placeholder tile URLs are displayed as governed metadata only and are never added as production MapLibre tile sources.
          </p>
          <div class="tag-row">
            <span v-for="cell in selectedCatalogH3Cells" :key="cell" class="tag">{{ cell }}</span>
          </div>
        </section>

        <section id="evidence-panel" class="panel-section">
          <div class="section-title">Evidence</div>
          <h2>{{ sherlockResult?.title || 'Sherlock evidence' }}</h2>
          <p>{{ sherlockResult?.snippet || 'No evidence loaded.' }}</p>
          <ul class="evidence-list">
            <li v-for="ref in evidenceRefs" :key="ref">{{ ref }}</li>
          </ul>
        </section>

        <section id="governance-panel" class="panel-section">
          <div class="section-title">Governance</div>
          <div class="detail-grid">
            <span>Attribution</span><strong>{{ governance?.attribution_required ? 'required' : 'not required' }}</strong>
            <span>Layer attribution</span><strong>{{ selectedGaiaLayer?.attribution?.attribution_text || '—' }}</strong>
            <span>Layer source refs</span><strong>{{ selectedLayerSourceRefs.length }}</strong>
            <span>Lanes</span><strong>{{ governance?.validation_lanes?.length || 0 }}</strong>
            <span>Receipt</span><strong>{{ selectedReceipt?.integrity?.digest ? 'digest' : 'unsigned' }}</strong>
            <span>Mode</span><strong>{{ dataModeLabel }} · {{ catalogModeLabel }}</strong>
          </div>
          <ul class="evidence-list">
            <li v-for="lane in governance?.validation_lanes || []" :key="lane.id">{{ lane.id }} · {{ lane.state || 'unknown' }}</li>
            <li v-for="ref in selectedLayerSourceRefs" :key="ref">{{ ref }}</li>
          </ul>
        </section>
      </aside>

      <!-- Re-open tabs when a panel is collapsed -->
      <button v-if="!leftOpen" class="mapx-reopen mapx-reopen--left" type="button" @click="leftOpen = true">Controls ›</button>
      <button v-if="!rightOpen" class="mapx-reopen mapx-reopen--right" type="button" @click="rightOpen = true">‹ Inspector</button>

      <!-- Bottom-center coordinate / selection readout -->
      <div class="mapx-readout">
        <span class="mapx-readout-key">{{ selectedGaiaLayer?.title || selectedLayer?.title || 'GAIA layer' }}</span>
        <span class="mapx-readout-sep">·</span>
        <span>OSM {{ selectedFeature?.osm_ref?.osm_type }}/{{ selectedFeature?.osm_ref?.osm_id }}</span>
        <span class="mapx-readout-sep">·</span>
        <span>{{ selectedFeature?.routing?.safety_status || routeSafetyStatus }}</span>
        <span class="mapx-readout-sep">·</span>
        <span class="mapx-readout-note">{{ placeholderTileNotice }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import RuntimeAdapterStatusBadge from '../components/RuntimeAdapterStatusBadge.vue';
import { useCockpit } from '../stores/cockpit';
import {
  fetchFeaturesByH3WithFallback,
  fetchGaiaLayerCatalogWithFallback,
  fetchGaiaMapSnapshotWithFallback,
  fetchGaiaTileManifestWithFallback,
  isPlaceholderTileUrl,
  type GaiaMapDataMode,
} from '../api/gaiaMap';
import {
  getRuntimeFeature,
  runtimeFeatureIdsForPath,
  type RuntimeAdapterFeature,
} from '../runtime-adapters';
import type {
  GaiaLayerCatalog,
  GaiaLayerEntry,
  GaiaMapSnapshot,
  GaiaTileManifest,
  H3FeatureLayerSearch,
  MapLayer,
  ResponseReceipt,
} from '../types/gaiaMap';

const loading = ref(true);
const refreshing = ref(false);
const leftOpen = ref(true);
const rightOpen = ref(true);
const h3Loading = ref(false);
const tileManifestLoading = ref(false);
const error = ref<string | null>(null);
const warning = ref<string | null>(null);
const catalogWarning = ref<string | null>(null);
const refreshStatus = ref<string | null>(null);
const layerCatalogStatus = ref<string | null>(null);
const lookupStatus = ref<string | null>(null);
const lastLoadedAt = ref<Date | null>(null);
const dataMode = ref<GaiaMapDataMode>('live');
const catalogMode = ref<GaiaMapDataMode>('live');
const snapshot = ref<GaiaMapSnapshot | null>(null);
const h3Result = ref<H3FeatureLayerSearch | null>(null);
const gaiaCatalog = ref<GaiaLayerCatalog | null>(null);
const selectedTileManifest = ref<GaiaTileManifest | null>(null);
const selectedLayerId = ref<string | null>(null);
const selectedGaiaLayerId = ref<string | null>(null);
const h3Cell = ref('8928308280fffff');
const mapContainer = ref<HTMLElement | null>(null);
let map: maplibregl.Map | null = null;
let marker: maplibregl.Marker | null = null;

const mapRuntimeFeatures = computed<RuntimeAdapterFeature[]>(() =>
  runtimeFeatureIdsForPath('/map')
    .map((featureId) => getRuntimeFeature(featureId))
    .filter((feature): feature is RuntimeAdapterFeature => Boolean(feature)),
);
const dataModeLabel = computed(() => (dataMode.value === 'live' ? 'live API' : 'demo fallback'));
const catalogModeLabel = computed(() => (catalogMode.value === 'live' ? 'live catalog' : 'demo catalog'));
const lastLoadedAtLabel = computed(() => lastLoadedAt.value?.toLocaleString() || 'not loaded');
const layers = computed(() => snapshot.value?.layers.layers || []);
const selectedLayer = computed<MapLayer | undefined>(() => layers.value.find((layer) => layer.layer_id === selectedLayerId.value) || layers.value[0]);
const gaiaCatalogLayers = computed<GaiaLayerEntry[]>(() => gaiaCatalog.value?.layers || []);
const selectedGaiaLayer = computed<GaiaLayerEntry | undefined>(() => gaiaCatalogLayers.value.find((layer) => layer.layer_id === selectedGaiaLayerId.value) || gaiaCatalogLayers.value[0]);
const selectedFeature = computed(() => h3Result.value?.features?.[0] || snapshot.value?.feature || null);
const governance = computed(() => snapshot.value?.governance || null);
const sherlockResult = computed(() => snapshot.value?.search || null);
const runtimes = computed(() => snapshot.value?.runtimeBoundaries.runtimes || []);
const routeSafetyStatus = computed(() => snapshot.value?.routes.default_safety_status || 'advisory');
const selectedReceipt = computed<ResponseReceipt | undefined>(() => selectedFeature.value?.response_receipt || selectedGaiaLayer.value?.response_receipt || selectedLayer.value?.response_receipt);
const featureH3Cells = computed(() => selectedFeature.value?.spatial?.h3_cells || []);
const evidenceRefs = computed(() => sherlockResult.value?.evidence_refs || selectedFeature.value?.provenance?.source_refs || []);
const selectedCatalogH3Cells = computed(() => selectedTileManifest.value?.spatial?.h3_cells || selectedGaiaLayer.value?.spatial?.h3_cells || []);
const selectedLayerSourceRefs = computed(() => selectedTileManifest.value?.provenance?.source_refs || selectedGaiaLayer.value?.provenance?.source_refs || []);
const catalogProductionTileServing = computed(() => gaiaCatalog.value?.production_tile_serving === true ? 'true' : 'false');
const placeholderTileNotice = computed(() => (isPlaceholderTileUrl(selectedTileManifest.value?.tiles?.url_template || selectedGaiaLayer.value?.tiles?.url_template) ? 'placeholder tile metadata only' : 'non-placeholder tile metadata'));

function featureCenter(): [number, number] {
  const bbox = selectedFeature.value?.spatial?.bbox;
  if (Array.isArray(bbox) && bbox.length >= 4) {
    return [(Number(bbox[0]) + Number(bbox[2])) / 2, (Number(bbox[1]) + Number(bbox[3])) / 2];
  }
  return [-74.006, 40.7128];
}

function initializeMap() {
  if (!mapContainer.value || map) return;
  const center = featureCenter();
  map = new maplibregl.Map({
    container: mapContainer.value,
    center,
    zoom: 13,
    style: {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors',
        },
      },
      layers: [{ id: 'osm-base', type: 'raster', source: 'osm' }],
    },
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-right');
  marker = new maplibregl.Marker({ color: '#0f62fe' })
    .setLngLat(center)
    .setPopup(new maplibregl.Popup({ offset: 16 }).setText(`OSM ${selectedFeature.value?.osm_ref?.osm_type || 'way'} ${selectedFeature.value?.osm_ref?.osm_id || '424242'}`))
    .addTo(map);
}

function updateMapMarker() {
  if (!map || !marker) return;
  const center = featureCenter();
  marker.setLngLat(center);
  map.easeTo({ center, zoom: 13, duration: 600 });
}

function jumpToPanel(panelId: string) {
  document.getElementById(panelId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function loadTileManifest(layerId: string | null, reason: 'initial' | 'manual' = 'initial') {
  if (!layerId) {
    selectedTileManifest.value = null;
    return;
  }
  tileManifestLoading.value = true;
  layerCatalogStatus.value = reason === 'manual' ? 'Fetching tile manifest metadata…' : layerCatalogStatus.value;
  const result = await fetchGaiaTileManifestWithFallback(layerId);
  selectedTileManifest.value = result.manifest;
  if (result.mode === 'demo') {
    catalogMode.value = 'demo';
  }
  if (result.warning) {
    catalogWarning.value = result.warning;
  }
  layerCatalogStatus.value = isPlaceholderTileUrl(result.manifest.tiles?.url_template)
    ? 'Tile manifest loaded as placeholder metadata only; no production tile request was made.'
    : 'Tile manifest metadata loaded; review before enabling any production tile source.';
  tileManifestLoading.value = false;
}

async function loadLayerCatalog() {
  const result = await fetchGaiaLayerCatalogWithFallback();
  gaiaCatalog.value = result.catalog;
  catalogMode.value = result.mode;
  catalogWarning.value = result.warning || null;
  selectedGaiaLayerId.value = result.catalog.layers[0]?.layer_id || null;
  layerCatalogStatus.value = result.mode === 'live'
    ? 'Layer catalog loaded from live GAIA API.'
    : 'Layer catalog loaded from deterministic demo fallback.';
  await loadTileManifest(selectedGaiaLayerId.value, 'initial');
}

async function selectGaiaLayer(layerId: string) {
  selectedGaiaLayerId.value = layerId;
  await loadTileManifest(layerId, 'manual');
}

async function loadSnapshot(reason: 'initial' | 'manual' = 'initial') {
  const initialLoad = snapshot.value === null;
  loading.value = initialLoad;
  refreshing.value = !initialLoad;
  error.value = null;
  if (reason === 'manual') {
    refreshStatus.value = 'Refreshing GAIA map snapshot…';
  }

  try {
    const [result] = await Promise.all([
      fetchGaiaMapSnapshotWithFallback(),
      loadLayerCatalog(),
    ]);
    snapshot.value = result.snapshot;
    h3Result.value = result.snapshot.h3;
    dataMode.value = result.mode;
    warning.value = result.warning || null;
    selectedLayerId.value = result.snapshot.layers.layers[0]?.layer_id || null;
    lastLoadedAt.value = new Date();
    refreshStatus.value = result.mode === 'live'
      ? 'Snapshot loaded from live GAIA OSM API.'
      : 'Snapshot loaded from deterministic demo fallback.';
    await nextTick();
    initializeMap();
    updateMapMarker();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!snapshot.value) {
      error.value = message;
    }
    refreshStatus.value = snapshot.value
      ? `Refresh failed; keeping last loaded snapshot: ${message}`
      : null;
  } finally {
    loading.value = false;
    refreshing.value = false;
  }
}

async function refreshSnapshot() {
  await loadSnapshot('manual');
}

async function refreshH3() {
  h3Loading.value = true;
  lookupStatus.value = 'Inspecting H3 cell…';
  try {
    const result = await fetchFeaturesByH3WithFallback(h3Cell.value);
    h3Result.value = result.result;
    dataMode.value = result.mode === 'demo' ? 'demo' : dataMode.value;
    warning.value = result.warning || warning.value;
    lookupStatus.value = result.mode === 'live' ? 'H3 lookup returned from live API.' : 'H3 lookup returned from demo fallback.';
    updateMapMarker();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    lookupStatus.value = `H3 lookup failed; keeping previous result: ${message}`;
    if (!snapshot.value) {
      error.value = message;
    }
  } finally {
    h3Loading.value = false;
  }
}

const cockpit = useCockpit();
watch([selectedGaiaLayer, selectedFeature], () => {
  cockpit.setContext({
    surface: 'Map Workbench',
    entityLabel: selectedGaiaLayer.value?.title ?? 'GAIA map',
    detail: selectedFeature.value?.osm_ref
      ? `OSM ${selectedFeature.value.osm_ref.osm_type}/${selectedFeature.value.osm_ref.osm_id} · ${dataModeLabel.value}`
      : dataModeLabel.value,
    route: '/map',
  });
}, { immediate: true });

onMounted(async () => {
  await loadSnapshot('initial');
});

onUnmounted(() => {
  marker?.remove();
  map?.remove();
  marker = null;
  map = null;
});
</script>

<style scoped>
/* A modern, dark, full-bleed map surface (Google/Apple/Esri feel): the map is
   the hero; controls, status, and inspector float over it as glass cards. All
   rules are scoped so they override the global light "Carbon" panel styles. */
.mapx {
  --map-accent: #2f6bff;
  position: relative;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  border-radius: 12px;
  background: #0c0d11;
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.mapx-canvas { position: absolute; inset: 0; }
/* Layout-neutral wrapper: children still anchor to .mapx */
.map-grid { display: contents; }

/* Pre-snapshot splash */
.mapx-splash { position: absolute; inset: 0; z-index: 5; display: grid; place-items: center; color: var(--text-2); font-size: 0.92rem; }
.mapx-splash--error { color: #fca5a5; padding: 2rem; text-align: center; }

/* ── Floating top bar ── */
.mapx-topbar {
  position: absolute; top: 14px; left: 50%; transform: translateX(-50%); z-index: 6;
  display: flex; align-items: center; gap: 1.25rem; max-width: calc(100% - 720px);
  padding: 0.5rem 0.95rem; border-radius: 12px;
  background: rgba(18, 20, 25, 0.82); backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}
.mapx-brand { display: flex; align-items: center; gap: 0.55rem; }
.mapx-logo { color: var(--map-accent); font-size: 1.15rem; line-height: 1; }
.mapx-titles { display: flex; flex-direction: column; line-height: 1.15; white-space: nowrap; }
.mapx-title { font-size: 0.85rem; font-weight: 600; color: var(--text); }
.mapx-sub { font-size: 0.68rem; color: var(--text-3); }
.mapx-modes { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
.pill {
  display: inline-flex; align-items: center; white-space: nowrap;
  font-size: 0.68rem; padding: 0.16rem 0.55rem; border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.05); color: var(--text-2);
}
.pill--live { color: #7ee2a8; border-color: rgba(75, 191, 115, 0.4); background: rgba(75, 191, 115, 0.12); }
.pill--demo { color: #93b4ff; border-color: rgba(47, 107, 255, 0.4); background: rgba(47, 107, 255, 0.14); }
.pill--muted { color: var(--text-3); }

/* ── Notices ── */
.mapx-notices { position: absolute; top: 66px; left: 50%; transform: translateX(-50%); z-index: 6; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.mapx-note {
  display: flex; align-items: center; gap: 0.5rem; white-space: nowrap;
  padding: 0.3rem 0.75rem; border-radius: 999px; font-size: 0.72rem; color: #f0c987;
  background: rgba(216, 162, 80, 0.14); border: 1px solid rgba(216, 162, 80, 0.38);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
}
.mapx-note-dot { width: 6px; height: 6px; border-radius: 50%; background: #e7bd7e; flex-shrink: 0; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

/* ── Floating panels ── */
.mapx-panel {
  position: absolute; z-index: 5; top: 14px;
  width: 320px; max-height: calc(100% - 28px); overflow-y: auto;
  background: rgba(16, 18, 23, 0.9); backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px;
  box-shadow: 0 12px 44px rgba(0, 0, 0, 0.5);
}
.mapx-panel--left { left: 14px; max-height: calc(100% - 9rem); }
.mapx-panel--right { right: 14px; width: 372px; max-height: calc(100% - 9rem); }

/* Collapse control (per panel) + re-open tabs on the edge */
.mapx-collapse {
  position: absolute; top: 8px; right: 8px; z-index: 3;
  width: 22px; height: 22px; border-radius: 6px; cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.05); color: var(--text-2);
  font-size: 0.8rem; line-height: 1; display: grid; place-items: center;
}
.mapx-collapse:hover { color: var(--text); border-color: rgba(255, 255, 255, 0.3); }
.mapx-panel .section-title { padding-right: 1.6rem; }
.mapx-reopen {
  position: absolute; z-index: 5; top: 14px;
  padding: 0.4rem 0.7rem; border-radius: 10px; cursor: pointer; white-space: nowrap;
  background: rgba(16, 18, 23, 0.9); backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  color: var(--text-2); font-size: 0.76rem; font-weight: 600;
}
.mapx-reopen:hover { color: var(--text); border-color: var(--map-accent); }
.mapx-reopen--left { left: 14px; }
.mapx-reopen--right { right: 14px; }
.mapx-panel::-webkit-scrollbar { width: 8px; }
.mapx-panel::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.14); border-radius: 8px; }

.panel-section { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
.panel-section:last-child { border-bottom: none; }
.section-title { margin: 0 0 0.6rem; font-size: 0.66rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em; color: var(--text-3); }
.mapx-panel h2 { margin: 0 0 0.5rem; font-size: 0.9rem; font-weight: 600; color: var(--text); word-break: break-word; }
.mapx-panel p { margin: 0.3rem 0; font-size: 0.75rem; color: var(--text-2); line-height: 1.5; }

/* Buttons */
.primary { width: 100%; padding: 0.55rem 0.7rem; border: none; border-radius: 9px; background: var(--map-accent); color: #fff; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: filter 0.15s ease; }
.primary:hover { filter: brightness(1.1); }
.primary:disabled { opacity: 0.5; cursor: default; }
.control-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.6rem 0 0; }
.secondary { padding: 0.3rem 0.6rem; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 8px; background: rgba(255, 255, 255, 0.04); color: var(--text-2); font-size: 0.72rem; cursor: pointer; transition: color 0.15s, border-color 0.15s; }
.secondary:hover { color: var(--text); border-color: rgba(255, 255, 255, 0.3); }
.lookup-status { margin: 0.45rem 0 0; font-size: 0.7rem; color: var(--text-3); line-height: 1.45; }

/* Input */
.input-label { display: block; font-size: 0.7rem; color: var(--text-2); margin-bottom: 0.3rem; }
.field { width: 100%; padding: 0.45rem 0.6rem; margin-bottom: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 8px; background: rgba(0, 0, 0, 0.28); color: var(--text); font-family: ui-monospace, 'SF Mono', monospace; font-size: 0.78rem; outline: none; }
.field:focus { border-color: var(--map-accent); }

/* Layer cards */
.layer-card { display: block; width: 100%; margin-bottom: 0.4rem; padding: 0.6rem 0.7rem; text-align: left; border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 10px; background: rgba(255, 255, 255, 0.03); color: var(--text); cursor: pointer; transition: border-color 0.15s, background 0.15s; }
.layer-card:hover { border-color: rgba(255, 255, 255, 0.22); background: rgba(255, 255, 255, 0.06); }
.layer-card.selected { border-color: var(--map-accent); background: rgba(47, 107, 255, 0.14); box-shadow: none; }
.layer-title { font-size: 0.8rem; font-weight: 600; }
.layer-meta { margin-top: 0.15rem; font-size: 0.68rem; color: var(--text-2); font-family: ui-monospace, monospace; word-break: break-all; }
.layer-attribution { margin-top: 0.2rem; font-size: 0.66rem; color: var(--text-3); }

/* Detail grid — capped label column + left-aligned values so long repo paths /
   URLs wrap cleanly instead of collapsing the value column to one char wide. */
.detail-grid { display: grid; grid-template-columns: minmax(0, 6.5rem) minmax(0, 1fr); gap: 0.5rem 0.9rem; font-size: 0.74rem; align-items: baseline; }
.detail-grid span { color: var(--text-3); overflow-wrap: anywhere; }
.detail-grid strong { text-align: left; color: var(--text); font-weight: 600; overflow-wrap: anywhere; }

/* Runtime rows */
.runtime-row { display: flex; justify-content: space-between; gap: 0.5rem; padding: 0.28rem 0; font-size: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.runtime-row:last-child { border-bottom: none; }
.runtime-row span { color: var(--text-2); }
.runtime-row strong { color: var(--text); }

/* Tags / chips (override global light tags) */
.tag-row { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.5rem; }
.tag { display: inline-flex; align-items: center; min-height: auto; padding: 0.12rem 0.45rem; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.05); color: var(--text-2); font-size: 0.66rem; font-family: ui-monospace, monospace; }

/* Evidence lists */
.evidence-list { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
.evidence-list li { padding: 0.3rem 0.45rem; font-size: 0.7rem; color: var(--text-2); font-family: ui-monospace, monospace; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 6px; word-break: break-all; }

/* ── Bottom readout ── */
.mapx-readout {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 6;
  display: flex; align-items: center; gap: 0.5rem; max-width: calc(100% - 740px);
  padding: 0.4rem 0.9rem; border-radius: 999px; font-size: 0.72rem; color: var(--text-2); white-space: nowrap; overflow: hidden;
  background: rgba(18, 20, 25, 0.85); backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}
.mapx-readout-key { color: var(--text); font-weight: 600; }
.mapx-readout-sep { color: var(--text-3); }
.mapx-readout-note { color: var(--text-3); overflow: hidden; text-overflow: ellipsis; }

/* MapLibre control chrome — dark, rounded, to match */
.mapx :deep(.maplibregl-ctrl-group) { background: rgba(18, 20, 25, 0.88); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4); }
.mapx :deep(.maplibregl-ctrl-group button + button) { border-top: 1px solid rgba(255, 255, 255, 0.1); }
.mapx :deep(.maplibregl-ctrl-group button .maplibregl-ctrl-icon) { filter: invert(1) hue-rotate(180deg); }
.mapx :deep(.maplibregl-ctrl-scale) { background: rgba(18, 20, 25, 0.8); border: 1px solid rgba(255, 255, 255, 0.18); border-top: none; color: var(--text-2); border-radius: 0 0 4px 4px; }
.mapx :deep(.maplibregl-ctrl-attrib) { background: rgba(18, 20, 25, 0.72); border-radius: 8px 0 0 0; }
.mapx :deep(.maplibregl-ctrl-attrib a) { color: var(--text-2); }

/* Narrow viewports: let panels shrink so the map stays usable */
@media (max-width: 1180px) {
  .mapx-panel--left, .mapx-panel--right { width: 270px; }
  .mapx-topbar, .mapx-readout { max-width: calc(100% - 600px); }
}
</style>
