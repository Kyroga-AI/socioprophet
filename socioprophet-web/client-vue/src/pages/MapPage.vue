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
          <div class="section-title">Basemap</div>
          <div class="mapx-basemap">
            <button
              v-for="(b, key) in BASEMAPS"
              :key="key"
              class="mapx-bm"
              :class="{ on: basemap === key }"
              type="button"
              @click="setBasemap(key as 'streets' | 'light' | 'dark')"
            >{{ b.label }}</button>
          </div>
        </section>

        <section class="panel-section">
          <div class="section-title">Civic layers</div>
          <label class="mapx-switch">
            <input type="checkbox" :checked="civicOn" @change="toggleCivic" />
            <span>Choropleth overlay <InfoLabel info="Shades each area by the selected statistic (a choropleth). Areas are binned into an aggregation grid — a fixture stand-in for census / agency data." /></span>
          </label>
          <template v-if="civicOn">
            <div class="mapx-basemap mapx-groups">
              <button v-for="g in CIVIC_LAYERS" :key="g.id" class="mapx-bm" :class="{ on: civicGroupId === g.id }" type="button" @click="setCivicGroup(g.id)">{{ g.label }}</button>
            </div>
            <div v-if="activeGroup.segmented" class="mapx-basemap mapx-groups mapx-segments">
              <button v-for="s in SEGMENTS" :key="s.id" class="mapx-bm" :class="{ on: reSegment === s.id }" type="button" @click="reSegment = s.id">{{ s.label }}</button>
            </div>
            <div class="mapx-basemap mapx-metrics">
              <button v-for="m in activeGroup.metrics" :key="m.key" class="mapx-bm" :class="{ on: civicMetricKey === m.key }" type="button" @click="civicMetricKey = m.key">{{ m.label }}</button>
            </div>
            <div class="mapx-legend">
              <span class="mapx-legend-lo">{{ fmtVal(activeMetric.min * metricFactor, activeMetric) }}</span>
              <span class="mapx-legend-bar" :style="{ background: legendGradient }" />
              <span class="mapx-legend-hi">{{ fmtVal(activeMetric.max * metricFactor, activeMetric) }}</span>
            </div>
            <label class="mapx-opacity">Opacity <input v-model.number="civicOpacity" type="range" min="0.2" max="0.9" step="0.05" /></label>
            <p class="lookup-status">{{ activeGroup.blurb }} Click a cell to inspect. Fixture aggregation grid.</p>

            <!-- Cell inspector — click-to-analyze a single area -->
            <div v-if="selectedCell" class="mapx-cell">
              <div class="mapx-cell-h"><span>Selected area</span><button class="mapx-cell-x" type="button" @click="selectedCell = null">✕</button></div>
              <div class="mapx-cell-grid">
                <div v-for="m in activeGroup.metrics" :key="m.key" class="mapx-cell-kv"><span>{{ m.label }}</span><b>{{ fmtCell(m) }}</b></div>
              </div>
              <template v-if="activeGroup.id === 'realestate'">
                <div class="mapx-cell-mix" :title="`Owner-occupied ${cellOwnerPct}% · renters ${100 - cellOwnerPct}%`"><span class="mapx-cell-mix-own" :style="{ width: cellOwnerPct + '%' }" /></div>
                <div class="mapx-cell-mixlabels"><span>owners {{ cellOwnerPct }}%</span><span>renters {{ 100 - cellOwnerPct }}%</span></div>
                <div class="mapx-cell-trend">
                  <span class="mapx-cell-trend-h">Price trend · 8q</span>
                  <svg viewBox="0 0 100 24" preserveAspectRatio="none"><polyline :points="cellTrendPoints" fill="none" stroke="#2f6bff" stroke-width="1.6" /></svg>
                </div>
              </template>
              <div class="mapx-basemap mapx-tools2">
                <button class="mapx-bm" :class="{ on: isPinned(selectedCell.id) }" type="button" :disabled="pinnedCells.length >= 3 && !isPinned(selectedCell.id)" @click="pinCell">📌 Compare</button>
              </div>
              <button class="mapx-ask mapx-ask-sm" type="button" @click="askAreaNoetica">◇ Ask Noetica about this area</button>
            </div>
          </template>
        </section>

        <!-- A/B location compare — the deal-committee diff view -->
        <section v-if="pinnedCells.length" class="panel-section">
          <div class="section-title">Compare areas · {{ pinnedCells.length }}/3</div>
          <div class="mapx-cmp">
            <div class="mapx-cmp-row mapx-cmp-head" :style="{ gridTemplateColumns: `6rem repeat(${pinnedCells.length}, 1fr)` }">
              <span></span>
              <span v-for="(p, i) in pinnedCells" :key="String(p.id)" class="mapx-cmp-col">{{ String.fromCharCode(65 + i) }}<button class="mapx-cmp-x" type="button" @click="unpin(p.id)">✕</button></span>
            </div>
            <div v-for="m in activeGroup.metrics" :key="m.key" class="mapx-cmp-row" :style="{ gridTemplateColumns: `6rem repeat(${pinnedCells.length}, 1fr)` }">
              <span class="mapx-cmp-label">{{ m.label }}</span>
              <span v-for="(p, i) in pinnedCells" :key="String(p.id)" class="mapx-cmp-val" :class="{ best: bestPinIndex(m) === i }">{{ fmtPin(p, m) }}</span>
            </div>
          </div>
          <p class="lookup-status">Best value per row is highlighted. Click 📌 Compare on a selected area to add.</p>
        </section>

        <section class="panel-section">
          <div class="section-title">Community &amp; location</div>
          <label class="mapx-switch">
            <input type="checkbox" :checked="eventsOn" @change="toggleEvents" />
            <span>Community events <span class="mapx-sub2">parades · marches · civic</span></span>
          </label>
          <label class="mapx-switch">
            <input type="checkbox" :checked="mlsOn" @change="toggleListings" />
            <span>MLS listings <span class="mapx-sub2">for-sale / for-rent inventory</span></span>
          </label>
          <div class="mapx-basemap mapx-tools2">
            <button class="mapx-bm" :class="{ on: pinMode }" type="button" @click="pinMode = !pinMode">{{ pinMode ? '◎ click map…' : '📍 Drop a pin' }}</button>
            <button v-if="droppedPin || pinMarker" class="mapx-bm" type="button" @click="clearPin">Clear pin</button>
          </div>
          <p v-if="droppedPin" class="lookup-status">Pin · {{ droppedPin.lat }}, {{ droppedPin.lng }}</p>
          <p class="lookup-status">Use the ⌖ control (bottom-right) to locate your device.</p>
        </section>

        <section class="panel-section">
          <div class="section-title">Site selection <InfoLabel info="A verified suitability score for a business type, computed per area from foot traffic, income, walkability, competition and rent. Answers: should I open my next location here?" /></div>
          <label class="mapx-switch">
            <input type="checkbox" :checked="siteMode" @change="toggleSite" />
            <span>Score locations <span class="mapx-sub2">should I open here?</span></span>
          </label>
          <template v-if="siteMode">
            <div class="mapx-basemap mapx-groups mapx-profiles">
              <button v-for="p in SITE_PROFILES" :key="p.id" class="mapx-bm" :class="{ on: siteProfile === p.id }" type="button" @click="siteProfile = p.id">{{ p.icon }} {{ p.label }}</button>
            </div>
            <div class="mapx-site-head"><ProvenanceBadge :p="siteProv" compact /><span>computed suitability · click an area to fly</span></div>
            <div class="mapx-toplist">
              <button v-for="(t, i) in topAreas" :key="String(t.props.id)" class="mapx-toparea" type="button" @click="selectArea(t.props)">
                <span class="mapx-rank">{{ i + 1 }}</span>
                <span class="mapx-score" :style="{ color: scoreColor(t.score) }">{{ t.score }}</span>
                <span class="mapx-topmeta">{{ Math.round(t.props.footTrafficDaily).toLocaleString() }}/day · ${{ Math.round(t.props.medianIncome / 1000) }}k · ${{ Math.round(t.props.reMedianRent) }}/mo</span>
              </button>
            </div>
            <button class="mapx-ask" type="button" @click="askSiteNoetica">◇ Ask Noetica where to open</button>
          </template>
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
          <label class="input-label" for="h3-cell"><InfoLabel label="H3 cell" info="Uber's hexagonal geospatial index — tiles the Earth into hexagons at 16 zoom levels, each with a stable ID. It's the join key for aggregating data by area." /></label>
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

      <!-- MLS listing detail (floating) -->
      <div v-if="selectedListing" class="mapx-listing">
        <button class="mapx-event-x" type="button" @click="selectedListing = null">✕</button>
        <div class="mapx-listing-type" :class="selectedListing.type">{{ selectedListing.type === 'sale' ? 'For sale' : 'For rent' }} · {{ selectedListing.status }}</div>
        <div class="mapx-listing-price">{{ listingLabel(selectedListing) }}</div>
        <div class="mapx-listing-addr">{{ selectedListing.address }}</div>
        <div class="mapx-listing-stats">
          <span>{{ selectedListing.beds }} bd</span><span>{{ selectedListing.baths }} ba</span><span>{{ selectedListing.sqft.toLocaleString() }} sqft</span><span class="mapx-listing-yield">{{ selectedListing.capRate }}% yield</span>
        </div>
      </div>

      <!-- Community event detail (floating) -->
      <div v-if="selectedEvent" class="mapx-event">
        <button class="mapx-event-x" type="button" @click="selectedEvent = null">✕</button>
        <div class="mapx-event-type" :style="{ color: EVENT_TYPES[selectedEvent.type].color }">{{ EVENT_TYPES[selectedEvent.type].icon }} {{ EVENT_TYPES[selectedEvent.type].label }}</div>
        <div class="mapx-event-title">{{ selectedEvent.title }}</div>
        <div class="mapx-event-when">{{ eventDate(selectedEvent.date) }} · {{ selectedEvent.time }}</div>
        <div class="mapx-event-org">{{ selectedEvent.organizer }}</div>
        <p class="mapx-event-desc">{{ selectedEvent.description }}</p>
      </div>

      <!-- NYT-style read-on-hover tooltip -->
      <div v-if="hoverInfo" class="mapx-hover" :style="{ left: hoverInfo.x + 'px', top: hoverInfo.y + 'px' }">
        <span class="mapx-hover-label">{{ hoverInfo.label }}</span>
        <span class="mapx-hover-value">{{ hoverInfo.value }}</span>
      </div>

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
import InfoLabel from '../components/InfoLabel.vue';
import ProvenanceBadge from '../components/ProvenanceBadge.vue';
import { prov } from '../features/provenance/types';
import { civicGrid, CIVIC_LAYERS, METRIC_BY_KEY, SEGMENTS, segFactor, SITE_PROFILES, scoreCell, type MetricDef } from '../data/healthMapFixture';
import { communityEvents, EVENT_TYPES, type CommunityEvent } from '../data/communityEventsFixture';
import { LISTINGS, type Listing } from '../data/mlsFixture';
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
const basemap = ref<'streets' | 'light' | 'dark'>('streets');
const BASEMAPS: Record<'streets' | 'light' | 'dark', { url: string; label: string }> = {
  streets: { url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', label: 'Streets' },
  light: { url: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', label: 'Light' },
  dark: { url: 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', label: 'Dark' },
};

// Civic-statistics choropleth overlay (Health / Public Safety / Education / People)
const civicOn = ref(false);
const civicGroupId = ref<string>('health');
const civicMetricKey = ref<string>('healthIndex');
const civicOpacity = ref(0.62);
const reSegment = ref<string>('res');
const selectedCell = ref<Record<string, string | number> | null>(null);
// Site selection ("should I open here?") — a verified, computed suitability score.
const siteMode = ref(false);
const siteProfile = ref<string>('coffee');
const hoverInfo = ref<{ x: number; y: number; label: string; value: string } | null>(null);
// Community events + device geolocation
const eventsOn = ref(false);
const selectedEvent = ref<CommunityEvent | null>(null);
const pinMode = ref(false);
const droppedPin = ref<{ lng: number; lat: number } | null>(null);
const mlsOn = ref(false);
const selectedListing = ref<Listing | null>(null);
const baseGrid = civicGrid();
const topAreas = computed(() =>
  baseGrid.features
    .map((f) => ({ props: f.properties as Record<string, number>, score: scoreCell(f.properties, siteProfile.value) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5),
);
const siteProv = computed(() => prov('computed', {
  verifier: 'site-selection engine',
  formula: 'score = Σ wᵢ · norm(metricᵢ)  (foot traffic, income, walkability, rent, …)',
  sources: ['foot-traffic grid', 'census/economic layers'],
  receipt: `sha256:site-${siteProfile.value}`,
  note: 'Suitability is deterministic + replayable from the weighted profile — not a black-box guess.',
}));
const activeGroup = computed(() => CIVIC_LAYERS.find((g) => g.id === civicGroupId.value) ?? CIVIC_LAYERS[0]!);
const activeMetric = computed<MetricDef>(() => METRIC_BY_KEY[civicMetricKey.value] ?? activeGroup.value.metrics[0]!);
const metricFactor = computed(() => (activeGroup.value.segmented ? segFactor(reSegment.value, activeMetric.value.key) : 1));
const legendGradient = computed(() => `linear-gradient(90deg, ${activeMetric.value.ramp.map(([p, c]) => `${c} ${Math.round(p * 100)}%`).join(', ')})`);
// Value formatting (money / pct / plain), used by the legend + cell inspector.
function fmtVal(v: number, def: MetricDef): string {
  if (def.format === 'money') { const s = v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${Math.round(v)}`; return s + def.unit; }
  if (def.format === 'pct') return `${(+v).toFixed(v < 10 ? 1 : 0)}%`;
  return `${v}${def.unit}`;
}
function fmtCell(m: MetricDef): string {
  const raw = Number(selectedCell.value?.[m.key] ?? 0);
  const f = activeGroup.value.segmented ? segFactor(reSegment.value, m.key) : 1;
  return fmtVal(raw * f, m);
}
const scoreColor = (s: number): string => (s >= 66 ? '#4bbf73' : s >= 40 ? '#e3b341' : '#f0656a');
const cellOwnerPct = computed(() => Number(selectedCell.value?.reOwnerOccPct ?? 0));
// A/B location compare — pin up to 3 areas and diff them side by side.
const pinnedCells = ref<Record<string, string | number>[]>([]);
function pinCell() {
  const c = selectedCell.value; if (!c) return;
  if (pinnedCells.value.length >= 3 || pinnedCells.value.some((p) => p.id === c.id)) return;
  pinnedCells.value = [...pinnedCells.value, c];
}
function unpin(id: string | number) { pinnedCells.value = pinnedCells.value.filter((p) => p.id !== id); }
const isPinned = (id?: string | number) => pinnedCells.value.some((p) => p.id === id);
// The winning pinned column for a metric (higher- or lower-better aware, segment-scaled).
function bestPinIndex(m: MetricDef): number {
  const f = activeGroup.value.segmented ? segFactor(reSegment.value, m.key) : 1;
  let best = -1; let bestVal = m.higherBetter ? -Infinity : Infinity;
  pinnedCells.value.forEach((p, i) => {
    const v = Number(p[m.key] ?? 0) * f;
    if (m.higherBetter ? v > bestVal : v < bestVal) { bestVal = v; best = i; }
  });
  return best;
}
function fmtPin(p: Record<string, string | number>, m: MetricDef): string {
  const f = activeGroup.value.segmented ? segFactor(reSegment.value, m.key) : 1;
  return fmtVal(Number(p[m.key] ?? 0) * f, m);
}
const cellTrendPoints = computed(() => {
  const raw = selectedCell.value?.rePriceTrend;
  if (typeof raw !== 'string') return '';
  let arr: number[] = [];
  try { arr = JSON.parse(raw) as number[]; } catch { return ''; }
  const min = Math.min(...arr); const max = Math.max(...arr); const span = (max - min) || 1;
  return arr.map((v, i) => `${(i / (arr.length - 1)) * 100},${24 - ((v - min) / span) * 22}`).join(' ');
});
function setCivicGroup(id: string) {
  civicGroupId.value = id;
  const g = CIVIC_LAYERS.find((x) => x.id === id);
  if (g?.metrics[0]) civicMetricKey.value = g.metrics[0].key;
  if (civicOn.value) renderCivic();
}
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
let eventMarkers: maplibregl.Marker[] = [];
let pinMarker: maplibregl.Marker | null = null;
let mlsMarkers: maplibregl.Marker[] = [];

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
  map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-right');
  map.addControl(new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), 'bottom-right');
  // Drop-a-pin: while pin mode is armed, the next map click places a pin.
  map.on('click', (e) => { if (pinMode.value) placePin(e.lngLat); });
  // Click a civic cell to inspect it (fires once the choropleth layer exists).
  map.on('click', 'civic-fill', (e) => { selectedCell.value = (e.features?.[0]?.properties ?? null) as Record<string, string | number> | null; });
  // NYT-style read-on-hover: a floating readout follows the cursor over cells.
  map.on('mousemove', 'civic-fill', (e) => {
    if (map) map.getCanvas().style.cursor = 'pointer';
    const f = e.features?.[0]; if (!f) { hoverInfo.value = null; return; }
    if (siteMode.value) {
      hoverInfo.value = { x: e.point.x, y: e.point.y, label: `${SITE_PROFILES.find((p) => p.id === siteProfile.value)?.label} score`, value: `${Number(f.properties?.siteScore ?? 0)}/100` };
    } else {
      const raw = Number(f.properties?.[activeMetric.value.key] ?? 0);
      hoverInfo.value = { x: e.point.x, y: e.point.y, label: activeMetric.value.label, value: fmtVal(raw * metricFactor.value, activeMetric.value) };
    }
  });
  map.on('mouseleave', 'civic-fill', () => { if (map) map.getCanvas().style.cursor = ''; hoverInfo.value = null; });
  marker = new maplibregl.Marker({ color: '#0f62fe' })
    .setLngLat(center)
    .setPopup(new maplibregl.Popup({ offset: 16 }).setText(`OSM ${selectedFeature.value?.osm_ref?.osm_type || 'way'} ${selectedFeature.value?.osm_ref?.osm_id || '424242'}`))
    .addTo(map);
}

function setBasemap(b: 'streets' | 'light' | 'dark') {
  basemap.value = b;
  const src = map?.getSource('osm') as { setTiles?: (t: string[]) => void } | undefined;
  src?.setTiles?.([BASEMAPS[b].url]);
}

// Data-driven fill color for the active civic metric (interpolate over its ramp).
function civicColorExpr(m: MetricDef, factor: number): unknown {
  const stops: Array<number | string> = [];
  for (const [pos, color] of m.ramp) stops.push((m.min + (m.max - m.min) * pos) * factor, color);
  return ['interpolate', ['linear'], ['*', ['get', m.key], factor], ...stops];
}
type FillData = Parameters<maplibregl.GeoJSONSource['setData']>[0];
function paintCivic(data: FillData, color: never) {
  if (!map) return;
  const src = map.getSource('civic') as maplibregl.GeoJSONSource | undefined;
  if (src) src.setData(data);
  else map.addSource('civic', { type: 'geojson', data });
  if (map.getLayer('civic-fill')) {
    map.setPaintProperty('civic-fill', 'fill-color', color);
    map.setPaintProperty('civic-fill', 'fill-opacity', civicOpacity.value);
    map.setLayoutProperty('civic-fill', 'visibility', 'visible');
  } else {
    // NYT-style: crisp thin borders, no heavy outline.
    map.addLayer({ id: 'civic-fill', type: 'fill', source: 'civic', paint: { 'fill-color': color, 'fill-opacity': civicOpacity.value, 'fill-outline-color': 'rgba(255,255,255,0.28)' } });
  }
}
function renderCivic() {
  paintCivic(baseGrid as unknown as FillData, civicColorExpr(activeMetric.value, metricFactor.value) as never);
}
function renderSite() {
  const scored = { type: 'FeatureCollection', features: baseGrid.features.map((f) => ({ ...f, properties: { ...f.properties, siteScore: scoreCell(f.properties, siteProfile.value) } })) };
  const color = ['interpolate', ['linear'], ['get', 'siteScore'], 0, '#d73027', 50, '#fee08b', 100, '#1a9850'] as never;
  paintCivic(scored as unknown as FillData, color);
}
function hideCivic() { if (map?.getLayer('civic-fill')) map.setLayoutProperty('civic-fill', 'visibility', 'none'); }
// Beauty: mute the basemap when data goes on top, so the choropleth reads clean.
function muteBasemapForData() { if (basemap.value === 'streets') setBasemap('light'); }
function toggleCivic() {
  civicOn.value = !civicOn.value;
  if (siteMode.value) return; // site overlay takes precedence
  if (civicOn.value) { muteBasemapForData(); renderCivic(); } else hideCivic();
}
function toggleSite() {
  siteMode.value = !siteMode.value;
  if (siteMode.value) { muteBasemapForData(); renderSite(); }
  else if (civicOn.value) renderCivic();
  else hideCivic();
}
function selectArea(props: Record<string, number>) {
  selectedCell.value = props as Record<string, string | number>;
  if (map && props.cLon && props.cLat) map.flyTo({ center: [props.cLon, props.cLat], zoom: Math.max(map.getZoom(), 13), duration: 700 });
}
function askSiteNoetica() {
  const prof = SITE_PROFILES.find((p) => p.id === siteProfile.value);
  const top = topAreas.value.slice(0, 3).map((t, i) => `#${i + 1} score ${t.score} (${Math.round(t.props.footTrafficDaily).toLocaleString()} visits/day, $${Math.round(t.props.medianIncome / 1000)}k income, $${Math.round(t.props.reMedianRent)}/mo rent)`).join('; ');
  cockpit.askAbout(`I'm scouting a ${prof?.label} location. The site-selection engine (verified compute) ranks the top areas: ${top}. Which would you open, what's the trade-off, and what would kill the deal?`);
}
// Community events (point markers) + Ask-about-area + drop-a-pin.
function clearEvents() { eventMarkers.forEach((m) => m.remove()); eventMarkers = []; }
function renderEvents() {
  if (!map) return;
  clearEvents();
  for (const ev of communityEvents) {
    const t = EVENT_TYPES[ev.type];
    const el = document.createElement('button');
    el.className = 'mapx-evmk';
    el.style.setProperty('--ev', t.color);
    el.textContent = t.icon;
    el.title = `${ev.title} · ${t.label}`;
    el.addEventListener('click', (e) => { e.stopPropagation(); selectedEvent.value = ev; if (map) map.flyTo({ center: [ev.lon, ev.lat], zoom: Math.max(map.getZoom(), 14), duration: 600 }); });
    eventMarkers.push(new maplibregl.Marker({ element: el }).setLngLat([ev.lon, ev.lat]).addTo(map));
  }
}
function toggleEvents() { eventsOn.value = !eventsOn.value; if (eventsOn.value) renderEvents(); else { clearEvents(); selectedEvent.value = null; } }
function placePin(lngLat: { lng: number; lat: number }) {
  droppedPin.value = { lng: +lngLat.lng.toFixed(5), lat: +lngLat.lat.toFixed(5) };
  if (pinMarker) pinMarker.setLngLat([lngLat.lng, lngLat.lat]);
  else if (map) pinMarker = new maplibregl.Marker({ color: '#f0656a' }).setLngLat([lngLat.lng, lngLat.lat]).addTo(map);
  pinMode.value = false;
}
function askAreaNoetica() {
  const c = selectedCell.value; if (!c) return;
  const stats = activeGroup.value.metrics.map((m) => `${m.label} ${fmtCell(m)}`).join(', ');
  cockpit.askAbout(`Tell me about this area on the ${activeGroup.value.label} layer: ${stats}. How does it compare to the rest of the city, and what should I know before ${activeGroup.value.id === 'realestate' ? 'investing' : 'opening a business or moving'} here?`);
}
function clearPin() { pinMarker?.remove(); pinMarker = null; droppedPin.value = null; }
// MLS listings — individual inventory over the aggregate choropleth.
const listingLabel = (l: Listing) => (l.type === 'sale' ? (l.price >= 1_000_000 ? `$${(l.price / 1_000_000).toFixed(2)}M` : `$${Math.round(l.price / 1000)}k`) : `$${(l.price / 1000).toFixed(1)}k/mo`);
function clearListings() { mlsMarkers.forEach((m) => m.remove()); mlsMarkers = []; }
function renderListings() {
  if (!map) return;
  clearListings();
  for (const l of LISTINGS) {
    const el = document.createElement('button');
    el.className = `mapx-mls ${l.type}`;
    el.textContent = listingLabel(l);
    el.title = `${l.address} · ${l.beds}bd/${l.baths}ba · ${l.capRate}% yield`;
    el.addEventListener('click', (e) => { e.stopPropagation(); selectedListing.value = l; if (map) map.flyTo({ center: [l.lon, l.lat], zoom: Math.max(map.getZoom(), 14), duration: 500 }); });
    mlsMarkers.push(new maplibregl.Marker({ element: el }).setLngLat([l.lon, l.lat]).addTo(map));
  }
}
function toggleListings() { mlsOn.value = !mlsOn.value; if (mlsOn.value) renderListings(); else { clearListings(); selectedListing.value = null; } }
function eventDate(iso: string): string { return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); }
watch([civicMetricKey, reSegment], () => { if (!siteMode.value && civicOn.value) renderCivic(); });
watch(siteProfile, () => { if (siteMode.value) renderSite(); });
watch(civicOpacity, () => { if ((civicOn.value || siteMode.value) && map?.getLayer('civic-fill')) map.setPaintProperty('civic-fill', 'fill-opacity', civicOpacity.value); });

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
  clearEvents();
  clearListings();
  pinMarker?.remove();
  marker?.remove();
  map?.remove();
  marker = null;
  pinMarker = null;
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
.mapx-basemap { display: flex; gap: 0.35rem; }
.mapx-bm { flex: 1; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; background: rgba(255, 255, 255, 0.03); color: var(--text-2); padding: 0.35rem 0.5rem; font-size: 0.74rem; cursor: pointer; }
.mapx-bm:hover { border-color: rgba(255, 255, 255, 0.25); color: var(--text); }
.mapx-bm.on { border-color: var(--map-accent); background: rgba(47, 107, 255, 0.14); color: #fff; }
.mapx-metrics, .mapx-groups { flex-wrap: wrap; margin-top: 0.5rem; }
.mapx-metrics .mapx-bm, .mapx-groups .mapx-bm { flex: 1 1 45%; }
.mapx-sub2 { color: var(--text-3); font-weight: 400; }
.mapx-segments { margin-top: 0.35rem; }
.mapx-segments .mapx-bm { font-size: 0.68rem; }
.mapx-cell { margin-top: 0.7rem; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; padding: 0.6rem; background: rgba(255, 255, 255, 0.03); }
.mapx-cell-h { display: flex; align-items: center; justify-content: space-between; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); margin-bottom: 0.5rem; }
.mapx-cell-x { border: none; background: transparent; color: var(--text-3); cursor: pointer; font-size: 0.8rem; } .mapx-cell-x:hover { color: var(--text); }
.mapx-cell-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem 0.7rem; }
.mapx-cell-kv { display: flex; align-items: baseline; justify-content: space-between; gap: 0.4rem; font-size: 0.72rem; }
.mapx-cell-kv span { color: var(--text-3); } .mapx-cell-kv b { color: var(--text); font-variant-numeric: tabular-nums; }
.mapx-cell-mix { height: 8px; border-radius: 999px; overflow: hidden; background: #6b7280; margin-top: 0.6rem; }
.mapx-cell-mix-own { display: block; height: 100%; background: #2f6bff; }
.mapx-cell-mixlabels { display: flex; justify-content: space-between; font-size: 0.62rem; color: var(--text-3); margin-top: 0.2rem; }
.mapx-cell-trend { margin-top: 0.5rem; } .mapx-cell-trend-h { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); }
.mapx-cell-trend svg { width: 100%; height: 26px; display: block; margin-top: 0.15rem; }

/* Site selection */
.mapx-profiles .mapx-bm { flex: 1 1 100%; text-align: left; }
.mapx-site-head { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.6rem; font-size: 0.66rem; color: var(--text-3); }
.mapx-toplist { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.5rem; }
.mapx-toparea { display: grid; grid-template-columns: 1.1rem 2.2rem 1fr; align-items: center; gap: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; background: rgba(255, 255, 255, 0.03); color: var(--text); padding: 0.4rem 0.55rem; cursor: pointer; text-align: left; }
.mapx-toparea:hover { border-color: rgba(255, 255, 255, 0.24); }
.mapx-rank { color: var(--text-3); font-size: 0.7rem; text-align: center; }
.mapx-score { font-size: 1rem; font-weight: 800; font-variant-numeric: tabular-nums; text-align: center; }
.mapx-topmeta { font-size: 0.66rem; color: var(--text-2); font-variant-numeric: tabular-nums; }
.mapx-ask { width: 100%; margin-top: 0.6rem; border: 1px solid rgba(120, 160, 255, 0.45); background: rgba(120, 160, 255, 0.1); color: #93b4ff; border-radius: 9px; padding: 0.5rem; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
.mapx-ask:hover { background: rgba(120, 160, 255, 0.18); color: #fff; }

/* Read-on-hover tooltip */
.mapx-hover {
  position: absolute; z-index: 7; transform: translate(-50%, calc(-100% - 12px)); pointer-events: none;
  display: flex; flex-direction: column; gap: 1px; padding: 0.3rem 0.55rem; border-radius: 8px;
  background: rgba(16, 18, 23, 0.94); border: 1px solid rgba(255, 255, 255, 0.16); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}
.mapx-hover-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); }
.mapx-hover-value { font-size: 0.9rem; font-weight: 700; color: var(--text); font-variant-numeric: tabular-nums; }
.mapx-ask-sm { width: 100%; margin-top: 0.55rem; }
.mapx-tools2 { margin-top: 0.5rem; }
.mapx-cell-actions { margin-top: 0.5rem; }

/* A/B compare diff table */
.mapx-cmp { display: flex; flex-direction: column; gap: 0.15rem; }
.mapx-cmp-row { display: grid; gap: 0.4rem; align-items: center; }
.mapx-cmp-head { margin-bottom: 0.2rem; }
.mapx-cmp-col { position: relative; text-align: center; font-size: 0.72rem; font-weight: 800; color: var(--map-accent); }
.mapx-cmp-x { border: none; background: transparent; color: var(--text-3); cursor: pointer; font-size: 0.6rem; margin-left: 0.2rem; } .mapx-cmp-x:hover { color: var(--down); }
.mapx-cmp-label { font-size: 0.68rem; color: var(--text-3); }
.mapx-cmp-val { text-align: center; font-size: 0.74rem; color: var(--text-2); font-variant-numeric: tabular-nums; padding: 0.15rem 0.2rem; border-radius: 5px; }
.mapx-cmp-val.best { color: #7ee2a8; background: rgba(75, 191, 115, 0.14); font-weight: 700; }

/* Community event markers + detail card */
:deep(.mapx-evmk) { width: 26px; height: 26px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #fff; background: var(--ev, #38bdf8); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); cursor: pointer; display: grid; place-items: center; padding: 0; }
:deep(.mapx-evmk) > * { transform: rotate(45deg); }
:deep(.mapx-evmk) { font-size: 12px; line-height: 1; }
.mapx-event { position: absolute; z-index: 7; left: 14px; bottom: 60px; width: 17rem; padding: 0.75rem 0.85rem; border-radius: 12px; background: rgba(16, 18, 23, 0.94); backdrop-filter: blur(14px); border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 10px 34px rgba(0, 0, 0, 0.5); }
.mapx-event-x { position: absolute; top: 8px; right: 10px; border: none; background: transparent; color: var(--text-3); cursor: pointer; font-size: 0.8rem; } .mapx-event-x:hover { color: var(--text); }
.mapx-event-type { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; }
.mapx-event-title { font-size: 1rem; font-weight: 700; color: var(--text); margin-top: 0.15rem; }
.mapx-event-when { font-size: 0.76rem; color: var(--text); margin-top: 0.3rem; font-weight: 600; }
.mapx-event-org { font-size: 0.72rem; color: var(--text-2); margin-top: 0.1rem; }
.mapx-event-desc { font-size: 0.74rem; color: var(--text-2); line-height: 1.5; margin: 0.45rem 0 0; }
/* MLS listing markers + detail */
:deep(.mapx-mls) { border: 1px solid #fff; border-radius: 6px; background: #2f6bff; color: #fff; font-size: 10px; font-weight: 700; padding: 1px 4px; cursor: pointer; white-space: nowrap; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); }
:deep(.mapx-mls.rent) { background: #16a34a; }
.mapx-listing { position: absolute; z-index: 7; left: 14px; bottom: 60px; width: 15rem; padding: 0.75rem 0.85rem; border-radius: 12px; background: rgba(16, 18, 23, 0.94); backdrop-filter: blur(14px); border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 10px 34px rgba(0, 0, 0, 0.5); }
.mapx-listing-type { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; color: #2f6bff; }
.mapx-listing-type.rent { color: #22c55e; }
.mapx-listing-price { font-size: 1.3rem; font-weight: 800; color: var(--text); margin-top: 0.1rem; }
.mapx-listing-addr { font-size: 0.76rem; color: var(--text-2); margin-top: 0.15rem; }
.mapx-listing-stats { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; font-size: 0.72rem; color: var(--text-2); }
.mapx-listing-yield { color: var(--up); font-weight: 600; }
.mapx-switch { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: var(--text-2); cursor: pointer; }
.mapx-switch input { accent-color: var(--map-accent); }
.mapx-legend { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem; }
.mapx-legend-bar { flex: 1; height: 9px; border-radius: 3px; border: 1px solid rgba(255, 255, 255, 0.14); }
.mapx-legend-lo, .mapx-legend-hi { font-size: 0.62rem; color: var(--text-3); white-space: nowrap; }
.mapx-opacity { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.55rem; font-size: 0.68rem; color: var(--text-3); }
.mapx-opacity input { flex: 1; accent-color: var(--map-accent); }
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
