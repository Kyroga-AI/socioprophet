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
      <aside v-show="leftOpen" class="mapx-panel mapx-panel--left" :style="{ width: leftW + 'px' }">
        <button class="mapx-collapse" type="button" title="Collapse controls" aria-label="Collapse controls" @click="leftOpen = false">‹</button>
        <div class="mapx-resize mapx-resize--left" role="separator" aria-orientation="vertical" title="Drag to resize" @pointerdown="startPanelResize('left', $event)"></div>
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

          <!-- Aggregation tessellation -->
          <div class="mapx-cells">
            <span class="mapx-cells-l">Cells <InfoLabel info="The aggregation units. H3 is Uber's global hexagonal grid — the industry-standard atomic tiling; a higher resolution means smaller hexes. Square grid is the classic raster fallback." /></span>
            <div class="mapx-basemap">
              <button class="mapx-bm sm" :class="{ on: gridType === 'hex' }" type="button" @click="gridType = 'hex'">⬡ H3 hex</button>
              <button class="mapx-bm sm" :class="{ on: gridType === 'square' }" type="button" @click="gridType = 'square'">▦ Grid</button>
            </div>
            <div v-if="gridType === 'hex'" class="mapx-cells-res">
              <span>res</span>
              <button v-for="r in [7, 8, 9]" :key="r" class="mapx-bm sm" :class="{ on: hexRes === r }" type="button" :title="`H3 resolution ${r}`" @click="hexRes = r">{{ r }}</button>
              <span class="mapx-cells-n">{{ baseGrid.features.length }} cells</span>
            </div>
          </div>

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
            <div v-show="!bivariateOn && !isFootTraffic" class="mapx-basemap mapx-metrics">
              <button v-for="m in activeGroup.metrics" :key="m.key" class="mapx-bm" :class="{ on: civicMetricKey === m.key }" type="button" @click="civicMetricKey = m.key">{{ m.label }}</button>
            </div>

            <!-- Classification method -->
            <div v-show="!bivariateOn && !isFootTraffic" class="mapx-class">
              <span class="mapx-class-l">Breaks <InfoLabel info="How cell values are binned into color classes. Equal interval spreads outliers; Quantile makes equal-count classes; Jenks finds natural breaks that minimise within-class variance (the cartographic default)." /></span>
              <div class="mapx-basemap">
                <button v-for="c in CLASS_MODES" :key="c.id" class="mapx-bm sm" :class="{ on: classMode === c.id }" type="button" :title="c.title" @click="classMode = c.id">{{ c.label }}</button>
              </div>
            </div>

            <!-- Bivariate price × yield (real estate) -->
            <label v-if="isRealEstate && !isFootTraffic" class="mapx-switch mapx-switch--sm">
              <input type="checkbox" :checked="bivariateOn" @change="bivariateOn = !bivariateOn" />
              <span>Bivariate — price × yield <InfoLabel info="Two variables at once: median price (→ magenta) against gross yield (↑ teal). The teal corner is low-price / high-yield — the undervalued areas an investor hunts." /></span>
            </label>

            <!-- Legend: bivariate 3×3, else stepped classes -->
            <div v-if="bivariateOn && isRealEstate" class="mapx-biv">
              <div class="mapx-biv-grid">
                <span v-for="(row, ri) in bivLegendCells" :key="ri" class="mapx-biv-row">
                  <i v-for="(c, ci) in row" :key="ci" :style="{ background: c }" />
                </span>
              </div>
              <div class="mapx-biv-ax mapx-biv-ax--x">price →</div>
              <div class="mapx-biv-ax mapx-biv-ax--y">yield ↑</div>
            </div>
            <div v-else-if="!isFootTraffic" class="mapx-legend">
              <span class="mapx-legend-lo">{{ fmtVal(activeMetric.min * metricFactor, activeMetric) }}</span>
              <span class="mapx-legend-steps">
                <i v-for="(cl, i) in legendClasses" :key="i" :style="{ background: cl.color }" :title="`${fmtVal(cl.lo, activeMetric)} – ${fmtVal(cl.hi, activeMetric)}`" />
              </span>
              <span class="mapx-legend-hi">{{ fmtVal(activeMetric.max * metricFactor, activeMetric) }}</span>
            </div>

            <!-- Foot traffic: corridor network + time-of-day -->
            <div v-if="isFootTraffic" class="mapx-ft">
              <div class="mapx-ft-time">
                <button class="mapx-ft-play" type="button" :aria-label="ftPlaying ? 'Pause' : 'Play the day'" :title="ftPlaying ? 'Pause' : 'Play the day'" @click="toggleFtPlay">{{ ftPlaying ? '❚❚' : '▶' }}</button>
                <input v-model.number="ftHour" type="range" min="0" max="23" step="1" aria-label="Hour of day" @pointerdown="stopFtPlay" />
                <span class="mapx-ft-hr">{{ hourLabel(ftHour) }}</span>
              </div>
              <div class="mapx-basemap mapx-ft-day">
                <button class="mapx-bm sm" :class="{ on: !ftWeekend }" type="button" @click="ftWeekend = false">Weekday</button>
                <button class="mapx-bm sm" :class="{ on: ftWeekend }" type="button" @click="ftWeekend = true">Weekend</button>
              </div>
              <div class="mapx-legend">
                <span class="mapx-legend-lo">quiet</span>
                <span class="mapx-ft-bar" />
                <span class="mapx-legend-hi">busy</span>
              </div>
            </div>

            <!-- Temporal replay -->
            <div v-if="!isFootTraffic && !bivariateOn" class="mapx-time">
              <div class="mapx-time-head">
                <span>Time <InfoLabel info="Replay the metric back through time. Each area has a development momentum — gentrifying areas were lower on 'good' metrics (and higher on crime) in the past. Scrub or play to watch the map change." /></span>
                <span class="mapx-time-r">
                  <button class="mapx-ft-play" type="button" :aria-label="tPlaying ? 'Pause' : 'Play through time'" :title="tPlaying ? 'Pause' : 'Play through time'" @click="toggleTimePlay">{{ tPlaying ? '❚❚' : '▶' }}</button>
                  <b :class="{ past: timeQ > 0 }">{{ quarterLabel(timeQ) }}</b>
                </span>
              </div>
              <input v-model.number="timeQ" type="range" min="0" max="7" step="1" aria-label="Quarters ago" @pointerdown="stopTimePlay" />
            </div>

            <label v-if="!isFootTraffic" class="mapx-opacity">Opacity <input v-model.number="civicOpacity" type="range" min="0.2" max="0.9" step="0.05" /></label>
            <p class="lookup-status">{{ isFootTraffic ? 'Foot traffic flows along corridors — thicker & brighter = busier. Scrub the hour: commercial strips peak at lunch & evening, transit at commute.' : activeGroup.blurb + ' Click a cell to inspect. Fixture aggregation grid.' }}</p>

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
            <!-- Live competitors from OpenStreetMap (real places of this type in view) -->
            <div class="mapx-poi">
              <button class="mapx-bm sm" :class="{ on: poiState === 'live', err: poiState === 'error' }" :disabled="poiState === 'loading'" type="button" :title="`Real ${profileLabel} locations from OpenStreetMap in the current view — the actual competitors`" @click="goLivePois">
                {{ poiState === 'loading' ? '⟳ finding…' : poiState === 'error' ? '⚠ offline' : `↻ Real ${profileLabel.toLowerCase()} nearby (live)` }}
              </button>
              <span v-if="poiState === 'live'" class="mapx-poi-n">{{ pois.length }} found<span v-if="isoOn && isoOrigin"> · <b>{{ poiReachCount }}</b> in reach</span></span>
            </div>
            <div class="mapx-site-head"><ProvenanceBadge :p="siteProv" compact /><span>computed suitability · click an area to fly</span></div>
            <div class="mapx-site-legend">
              <span>worse</span>
              <span class="mapx-site-bar" />
              <span>better</span>
            </div>
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
          <div class="section-title">Reachability <InfoLabel info="Travel-time isochrone from a point: how far you can get in N minutes on foot, bike, or transit. Bands respect the local walkability / transit field — you reach further where the network is good. Click the map to set the origin." /></div>
          <label class="mapx-switch">
            <input type="checkbox" :checked="isoOn" @change="toggleIso" />
            <span>Isochrone from a point</span>
          </label>
          <template v-if="isoOn">
            <div class="mapx-basemap mapx-ft-day">
              <button v-for="m in (['walk','bike','transit'] as const)" :key="m" class="mapx-bm sm" :class="{ on: isoMode === m }" type="button" @click="isoMode = m">{{ m === 'walk' ? '🚶 Walk' : m === 'bike' ? '🚲 Bike' : '🚇 Transit' }}</button>
            </div>
            <div class="mapx-ft-time">
              <input v-model.number="isoMax" type="range" min="5" max="30" step="5" aria-label="Minutes" />
              <span class="mapx-ft-hr">{{ isoMax }} min</span>
            </div>
            <div class="mapx-iso-bands">
              <span v-for="(c, i) in ISO_COLORS.slice(0, 4)" :key="i" class="mapx-iso-band"><i :style="{ background: c }" />≤{{ ISO_BANDS[i] }}</span>
            </div>
            <label class="mapx-switch mapx-switch--sm">
              <input type="checkbox" :checked="compareOn" @change="toggleCompare" />
              <span>Compare two points (A / B)</span>
            </label>

            <!-- A/B set-point buttons -->
            <div v-if="compareOn" class="mapx-basemap mapx-ft-day">
              <button class="mapx-bm sm" :class="{ on: isoArm && isoArmTarget === 'a' }" type="button" @click="armIso('a')"><i class="mapx-dot" style="background:#22d3ee" /> A {{ isoOrigin ? '✓' : '' }}</button>
              <button class="mapx-bm sm" :class="{ on: isoArm && isoArmTarget === 'b' }" type="button" @click="armIso('b')"><i class="mapx-dot" style="background:#a855f7" /> B {{ isoOriginB ? '✓' : '' }}</button>
            </div>
            <p v-if="compareOn && isoArm" class="lookup-status">Click the map to set point {{ isoArmTarget.toUpperCase() }}.</p>

            <button v-else-if="!isoOrigin" class="mapx-bm sm" type="button" :class="{ on: isoArm }" @click="armIso('a')">📍 Click the map to set origin{{ isoArm ? '…' : '' }}</button>

            <!-- Single-point catchment -->
            <template v-if="!compareOn && isoOrigin">
              <div class="mapx-iso-sum">
                <div><b>{{ isoSummary.population.toLocaleString() }}</b><span>people reachable</span></div>
                <div><b>{{ Math.round(isoSummary.footTraffic / 1000) }}k</b><span>daily visits</span></div>
                <div><b>{{ isoSummary.cells }}</b><span>areas</span></div>
              </div>
              <div class="mapx-catch">
                <div class="mapx-catch-h">Catchment profile <span>vs city avg</span></div>
                <div v-for="s in catchmentStats" :key="s.label" class="mapx-catch-row">
                  <span class="mapx-catch-l">{{ s.label }}</span>
                  <b class="mapx-catch-v">{{ s.value }}</b>
                  <span class="mapx-catch-d" :class="s.favorable === null ? 'neutral' : (s.favorable ? 'up' : 'down')">{{ s.delta >= 0 ? '+' : '' }}{{ s.delta }}%</span>
                </div>
              </div>
              <button class="mapx-ask mapx-ask-sm" type="button" @click="askIsoNoetica">◇ Ask Noetica about this catchment</button>
              <button class="mapx-bm sm" type="button" @click="clearIso">Reset origin</button>
            </template>

            <!-- A/B compare -->
            <template v-if="compareOn && isoOrigin && isoOriginB">
              <div class="mapx-cmp2-sum">
                <div class="a"><b>{{ isoSummary.population.toLocaleString() }}</b><span>A reach</span></div>
                <div class="b"><b>{{ isoSummaryB.population.toLocaleString() }}</b><span>B reach</span></div>
              </div>
              <div class="mapx-cmp2">
                <div class="mapx-cmp2-row mapx-cmp2-hdr"><span></span><span class="a">A</span><span class="b">B</span></div>
                <div v-for="r in compareRows" :key="r.label" class="mapx-cmp2-row">
                  <span class="mapx-cmp2-l">{{ r.label }}</span>
                  <b :class="{ win: r.winner === 'a' }">{{ r.a }}</b>
                  <b :class="{ win: r.winner === 'b' }">{{ r.b }}</b>
                </div>
              </div>
              <button class="mapx-ask mapx-ask-sm" type="button" @click="askIsoNoetica">◇ Ask Noetica to compare A vs B</button>
              <button class="mapx-bm sm" type="button" @click="clearIso">Reset points</button>
            </template>
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
      <aside v-show="rightOpen" class="mapx-panel mapx-panel--right" :style="{ width: rightW + 'px' }">
        <button class="mapx-collapse" type="button" title="Collapse inspector" aria-label="Collapse inspector" @click="rightOpen = false">›</button>
        <div class="mapx-resize mapx-resize--right" role="separator" aria-orientation="vertical" title="Drag to resize" @pointerdown="startPanelResize('right', $event)"></div>

        <!-- Area profile — real stats for the clicked cell, leading the inspector -->
        <section v-if="selectedCell" class="panel-section mapx-ap">
          <div class="section-title mapx-ap-head">
            <span>Area profile</span>
            <button class="mapx-cell-x" type="button" aria-label="Clear selection" @click="selectedCell = null">✕</button>
          </div>
          <div class="mapx-ap-name">{{ areaLabel(selectedCell) }}</div>

          <div v-if="selectedSite" class="mapx-ap-score">
            <div class="mapx-ap-score-n" :style="{ color: goodColor(selectedSite.score / 100) }">{{ selectedSite.score }}<small>/100</small></div>
            <div class="mapx-ap-score-l">
              <b>{{ selectedSite.label }}</b> suitability
              <span class="mapx-ap-rank">rank #{{ selectedSite.rank }} of {{ selectedSite.total }}</span>
            </div>
          </div>

          <div class="mapx-ap-hl">
            <div class="mapx-ap-hl-col">
              <div class="mapx-ap-hl-h up">Strengths</div>
              <div v-for="s in areaHighlights.strengths" :key="s.label" class="mapx-ap-hl-row"><span>{{ s.label }}</span><b>{{ s.val }}</b></div>
            </div>
            <div class="mapx-ap-hl-col">
              <div class="mapx-ap-hl-h down">Watch-outs</div>
              <div v-for="w in areaHighlights.weaknesses" :key="w.label" class="mapx-ap-hl-row"><span>{{ w.label }}</span><b>{{ w.val }}</b></div>
            </div>
          </div>

          <details v-for="g in CIVIC_LAYERS" :key="g.id" class="mapx-ap-grp" :open="g.id === civicGroupId">
            <summary>{{ g.label }}</summary>
            <div v-for="m in g.metrics" :key="m.key" class="mapx-ap-metric">
              <span class="mapx-ap-m-l">{{ m.label }}</span>
              <span class="mapx-ap-m-bar"><i :style="{ width: (cellGood(selectedCell, m) * 100) + '%', background: goodColor(cellGood(selectedCell, m)) }" /></span>
              <b class="mapx-ap-m-v">{{ fmtVal(cellRaw(selectedCell, m), m) }}</b>
            </div>
          </details>

          <button class="mapx-ask mapx-ask-sm" type="button" @click="askAreaNoetica">◇ Ask Noetica about this area</button>
        </section>

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
import { civicGrid, civicHexGrid, CIVIC_LAYERS, METRIC_BY_KEY, SEGMENTS, segFactor, SITE_PROFILES, scoreCell, type MetricDef, type CivicGrid } from '../data/healthMapFixture';
import { fetchPois, type Poi } from '../data/adapters/overpassLive';
import { breaksFor, quantileBreaks, classOf, sampleRamp, type ClassMode } from '../data/classify';
import { footTrafficNetwork, footTrafficFactor, hourLabel, FT_KIND_LABEL } from '../data/footTrafficFixture';
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

// Resizable overlay panels (persisted). The map is full-bleed underneath, so
// widening a panel just covers more of it — no map.resize() needed.
const PW_MIN = 260;
const PW_MAX = 560;
const clampPW = (n: number) => Math.max(PW_MIN, Math.min(PW_MAX, n));
const loadPW = (k: string, d: number) => { try { const v = Number(localStorage.getItem(k)); return v ? clampPW(v) : d; } catch { return d; } };
const leftW = ref(loadPW('mapx:leftW', 320));
const rightW = ref(loadPW('mapx:rightW', 372));
let dragSide: 'left' | 'right' | null = null;
let dragStartX = 0;
let dragStartW = 0;
function onPanelMove(e: PointerEvent) {
  const dx = e.clientX - dragStartX;
  if (dragSide === 'left') leftW.value = clampPW(dragStartW + dx);
  else if (dragSide === 'right') rightW.value = clampPW(dragStartW - dx);
}
function endPanelResize() {
  dragSide = null;
  window.removeEventListener('pointermove', onPanelMove);
  window.removeEventListener('pointerup', endPanelResize);
  document.body.style.userSelect = '';
  try { localStorage.setItem('mapx:leftW', String(Math.round(leftW.value))); localStorage.setItem('mapx:rightW', String(Math.round(rightW.value))); } catch { /* storage unavailable */ }
}
function startPanelResize(side: 'left' | 'right', e: PointerEvent) {
  if (e.button !== 0) return;
  dragSide = side;
  dragStartX = e.clientX;
  dragStartW = side === 'left' ? leftW.value : rightW.value;
  document.body.style.userSelect = 'none';
  window.addEventListener('pointermove', onPanelMove);
  window.addEventListener('pointerup', endPanelResize);
  e.preventDefault();
}
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
// Aggregation tessellation — H3 hexagons (atomic, industry-standard) or a square
// grid. Switchable; rebuilding re-samples the same metric schema.
const gridType = ref<'hex' | 'square'>('hex');
const hexRes = ref(8);
const baseGrid = ref<CivicGrid>(civicHexGrid(hexRes.value));
// Foot traffic — a corridor network + time-of-day, not a block choropleth.
const ftNet = footTrafficNetwork();
const ftHour = ref(18);
const ftWeekend = ref(false);
const ftPlaying = ref(false);
let ftTimer: number | null = null;
const isFootTraffic = computed(() => civicGroupId.value === 'foottraffic');
function stopFtPlay() { if (ftTimer !== null) { clearInterval(ftTimer); ftTimer = null; } ftPlaying.value = false; }
function toggleFtPlay() {
  if (ftPlaying.value) { stopFtPlay(); return; }
  ftPlaying.value = true;
  ftTimer = window.setInterval(() => { ftHour.value = (ftHour.value + 1) % 24; }, 550);
}

// Reachability (isochrone) — travel-time bands from a point, respecting the local
// walkability / transit field (you reach further where the network is good).
const isoOn = ref(false);
const compareOn = ref(false);
const isoArm = ref(false);
const isoArmTarget = ref<'a' | 'b'>('a');
const isoOrigin = ref<{ lng: number; lat: number } | null>(null);
const isoOriginB = ref<{ lng: number; lat: number } | null>(null);
const isoMode = ref<'walk' | 'bike' | 'transit'>('walk');
const isoMax = ref(15);
let isoMarker: maplibregl.Marker | null = null;
let isoMarkerB: maplibregl.Marker | null = null;
const ISO_SPEED: Record<'walk' | 'bike' | 'transit', number> = { walk: 4.8, bike: 15, transit: 22 }; // km/h base
const ISO_BANDS = [5, 10, 15, 20];
const ISO_COLORS = ['#1a9850', '#66bd63', '#fee08b', '#fdae61', '#f46d43'];       // A — green→red
const ISO_COLORS_B = ['#54278f', '#756bb1', '#9e9ac8', '#bcbddc', '#dadaeb'];     // B — purples
function haversineKm(lo1: number, la1: number, lo2: number, la2: number): number {
  const R = 6371; const dLa = (la2 - la1) * Math.PI / 180; const dLo = (lo2 - lo1) * Math.PI / 180;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}
function isoSpeedFactor(p: Record<string, number>): number {
  if (isoMode.value === 'walk') return 0.6 + (Number(p.walkScore ?? 50) / 98) * 0.8;
  if (isoMode.value === 'transit') return 0.5 + (Number(p.transitAccessIdx ?? 50) / 95) * 1.3;
  return 0.8 + (Number(p.walkScore ?? 50) / 98) * 0.4; // bike
}
function isoTimeMin(p: Record<string, number>, origin: { lng: number; lat: number } | null): number {
  if (!origin) return Infinity;
  const d = haversineKm(origin.lng, origin.lat, Number(p.cLon), Number(p.cLat));
  return (d / (ISO_SPEED[isoMode.value] * isoSpeedFactor(p))) * 60;
}
function reachedFor(origin: { lng: number; lat: number } | null): Record<string, number>[] {
  if (!origin) return [];
  return baseGrid.value.features.map((f) => f.properties as Record<string, number>).filter((p) => isoTimeMin(p, origin) <= isoMax.value);
}
const summaryOf = (r: Record<string, number>[]) => ({
  cells: r.length,
  population: r.reduce((s, p) => s + Number(p.population ?? 0), 0),
  footTraffic: r.reduce((s, p) => s + Number(p.footTrafficDaily ?? 0), 0),
});
const isoReached = computed(() => reachedFor(isoOrigin.value));
const isoReachedB = computed(() => reachedFor(isoOriginB.value));
const isoSummary = computed(() => summaryOf(isoReached.value));
const isoSummaryB = computed(() => summaryOf(isoReachedB.value));
// Catchment profile — what the reachable population looks like vs the whole city.
const CATCHMENT: Array<{ key: string; label: string; fmt: (v: number) => string; good: boolean | null }> = [
  { key: 'medianIncome', label: 'Median income', fmt: (v) => `$${Math.round(v / 1000)}k`, good: true },
  { key: 'walkScore', label: 'Walk score', fmt: (v) => `${Math.round(v)}`, good: true },
  { key: 'crimeRate', label: 'Violent crime', fmt: (v) => `${v.toFixed(0)}/1k`, good: false },
  { key: 'reMedianPrice', label: 'Home price', fmt: (v) => `$${(v / 1e6).toFixed(1)}M`, good: null },
];
const mean = (arr: Record<string, number>[], key: string) => (arr.length ? arr.reduce((s, p) => s + Number(p[key] ?? 0), 0) / arr.length : 0);
const catchmentStats = computed(() => {
  const r = isoReached.value;
  const all = baseGrid.value.features.map((f) => f.properties as Record<string, number>);
  if (!r.length || !all.length) return [] as Array<{ label: string; value: string; delta: number; favorable: boolean | null }>;
  return CATCHMENT.map((m) => {
    const c = mean(r, m.key);
    const city = mean(all, m.key) || 1;
    const delta = ((c - city) / city) * 100;
    return { label: m.label, value: m.fmt(c), delta: Math.round(delta), favorable: m.good === null ? null : (m.good ? delta >= 0 : delta <= 0) };
  });
});
// A/B compare — diff the two catchments, flag the winner per metric.
const compareRows = computed(() => {
  const A = isoReached.value; const B = isoReachedB.value;
  if (!A.length || !B.length) return [] as Array<{ label: string; a: string; b: string; winner: 'a' | 'b' | null }>;
  return CATCHMENT.map((m) => {
    const a = mean(A, m.key); const b = mean(B, m.key);
    let winner: 'a' | 'b' | null = null;
    if (m.good !== null && Math.abs(a - b) > 1e-9) winner = m.good ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b');
    return { label: m.label, a: m.fmt(a), b: m.fmt(b), winner };
  });
});
function askIsoNoetica() {
  if (compareOn.value && isoOriginB.value) {
    const rows = compareRows.value.map((x) => `${x.label} A=${x.a} B=${x.b}${x.winner ? ` (${x.winner.toUpperCase()} better)` : ''}`).join('; ');
    cockpit.askAbout(`Compare two catchments for a ${isoMax.value}-min ${isoMode.value}: A reaches ${isoSummary.value.population.toLocaleString()} people, B reaches ${isoSummaryB.value.population.toLocaleString()}. Profiles — ${rows}. Which site is the better bet and why?`);
    return;
  }
  const s = catchmentStats.value.map((x) => `${x.label} ${x.value} (${x.delta >= 0 ? '+' : ''}${x.delta}% vs city)`).join(', ');
  cockpit.askAbout(`Reachability catchment: within a ${isoMax.value}-min ${isoMode.value} of this point are ${isoSummary.value.population.toLocaleString()} people across ${isoSummary.value.cells} areas — ${s}. Is this a strong catchment for a new location, and what does the profile favor?`);
}

// Live POIs (OSM Overpass) — the real businesses of the active site-profile type in
// view, and how many fall inside the isochrone catchment. Falls back silently.
const poiState = ref<'idle' | 'loading' | 'live' | 'error'>('idle');
const pois = ref<Poi[]>([]);
let poiMarkers: maplibregl.Marker[] = [];
const profileLabel = computed(() => SITE_PROFILES.find((p) => p.id === siteProfile.value)?.label ?? 'place');
const poiReachCount = computed(() => {
  if (!isoOrigin.value || !pois.value.length) return 0;
  const reachKm = (isoMax.value / 60) * ISO_SPEED[isoMode.value] * 0.9; // straight-line approx of the band
  return pois.value.filter((p) => haversineKm(isoOrigin.value!.lng, isoOrigin.value!.lat, p.lon, p.lat) <= reachKm).length;
});
function clearPois() { poiMarkers.forEach((m) => m.remove()); poiMarkers = []; }
function renderPois() {
  if (!map) return;
  clearPois();
  for (const p of pois.value) {
    const el = document.createElement('div');
    el.className = 'mapx-poi-mk';
    el.title = `${p.name} · ${p.category}`;
    poiMarkers.push(new maplibregl.Marker({ element: el }).setLngLat([p.lon, p.lat]).addTo(map));
  }
}
async function goLivePois() {
  if (!map || poiState.value === 'loading') return;
  poiState.value = 'loading';
  const b = map.getBounds();
  const r = await fetchPois({ s: b.getSouth(), w: b.getWest(), n: b.getNorth(), e: b.getEast() }, siteProfile.value);
  if (r) { pois.value = r; poiState.value = 'live'; renderPois(); }
  else poiState.value = 'error';
}
const topAreas = computed(() =>
  baseGrid.value.features
    .map((f) => ({ props: f.properties as Record<string, number>, score: scoreCell(f.properties, siteProfile.value) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5),
);
// ── Area profile — real stats for a selected cell (replaces demo plumbing) ────
const areaLabel = (c: Record<string, string | number>) => `Area ${String(c.id ?? '').replace('cell-', '')} · ${c.cLat}, ${c.cLon}`;
const cellFactor = (key: string) => segFactor(reSegment.value, key); // 1 for non-real-estate keys
const cellRaw = (c: Record<string, string | number>, m: MetricDef) => Number(c[m.key] ?? 0) * cellFactor(m.key);
// Normalized 0..1 goodness for a metric (higher-better aware), for bars + ranking.
function cellGood(c: Record<string, string | number>, m: MetricDef): number {
  const lo = m.min * cellFactor(m.key);
  const hi = m.max * cellFactor(m.key);
  const t = (cellRaw(c, m) - lo) / ((hi - lo) || 1);
  return Math.max(0, Math.min(1, m.higherBetter ? t : 1 - t));
}
const goodColor = (g: number) => (g >= 0.66 ? '#4bbf73' : g >= 0.4 ? '#e3b341' : '#f0656a');
const allMetrics = CIVIC_LAYERS.flatMap((g) => g.metrics);
// Selected area's site score + city rank for the active business profile.
const selectedSite = computed(() => {
  const c = selectedCell.value; if (!c) return null;
  const score = scoreCell(c, siteProfile.value);
  const sorted = baseGrid.value.features.map((f) => scoreCell(f.properties, siteProfile.value)).sort((a, b) => b - a);
  const rank = sorted.findIndex((s) => s <= score) + 1;
  return { score, rank, total: sorted.length, label: SITE_PROFILES.find((p) => p.id === siteProfile.value)?.label ?? '' };
});
// Top strengths / watch-outs across every domain metric.
const areaHighlights = computed(() => {
  const c = selectedCell.value; if (!c) return { strengths: [], weaknesses: [] };
  const scored = allMetrics.map((m) => ({ m, g: cellGood(c, m) })).sort((a, b) => b.g - a.g);
  return {
    strengths: scored.slice(0, 3).map((x) => ({ label: x.m.label, val: fmtVal(cellRaw(c, x.m), x.m) })),
    weaknesses: scored.slice(-3).reverse().map((x) => ({ label: x.m.label, val: fmtVal(cellRaw(c, x.m), x.m) })),
  };
});

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

// ── Choropleth classification (equal / quantile / Jenks natural breaks) ───────
// Linear/equal-interval lets outliers wash the map out; quantile + Jenks bin the
// actual cell distribution so classes read cleanly (the NYT/Tufte default).
const N_CLASSES = 5;
const CLASS_MODES = [
  { id: 'equal', label: 'Equal', title: 'Equal interval — even value bands' },
  { id: 'quantile', label: 'Quantile', title: 'Equal-count classes' },
  { id: 'jenks', label: 'Jenks', title: 'Natural breaks — minimises within-class variance' },
] as const;
const classMode = ref<ClassMode>('quantile');
const bivariateOn = ref(false);
const isRealEstate = computed(() => activeGroup.value.id === 'realestate');
// Temporal replay — scrub the active metric back through quarters. "Better"
// metrics fall into the past where momentum is positive (gentrifying) and vice versa.
const timeQ = ref(0); // quarters before "now"
function tFeatures() {
  if (timeQ.value === 0) return baseGrid.value.features;
  const m = activeMetric.value;
  const dir = m.higherBetter ? 1 : -1;
  return baseGrid.value.features.map((f) => {
    const p = f.properties as Record<string, number>;
    const adj = Math.max(m.min, Math.min(m.max, Number(p[m.key] ?? 0) * (1 - Number(p.momentum ?? 0) * dir * timeQ.value)));
    return { ...f, properties: { ...p, [m.key]: adj } };
  });
}
const quarterLabel = (q: number) => (q === 0 ? 'now' : `−${q}Q (~${q * 3}mo ago)`);
const tPlaying = ref(false);
let tTimer: number | null = null;
function stopTimePlay() { if (tTimer !== null) { clearInterval(tTimer); tTimer = null; } tPlaying.value = false; }
function toggleTimePlay() {
  if (tPlaying.value) { stopTimePlay(); return; }
  tPlaying.value = true;
  tTimer = window.setInterval(() => { timeQ.value = timeQ.value === 0 ? 7 : timeQ.value - 1; }, 700); // sweep past → present, loop
}
const cellValues = (key: string, factor: number) => tFeatures().map((f) => Number((f.properties as Record<string, number>)[key] ?? 0) * factor);
const classColorsFor = (m: MetricDef) => Array.from({ length: N_CLASSES }, (_, i) => sampleRamp(m.ramp, i / (N_CLASSES - 1)));
const classBreaks = computed(() => breaksFor(classMode.value, cellValues(activeMetric.value.key, metricFactor.value), activeMetric.value.min * metricFactor.value, activeMetric.value.max * metricFactor.value, N_CLASSES));
const legendClasses = computed(() => {
  const cols = classColorsFor(activeMetric.value);
  const bounds = [activeMetric.value.min * metricFactor.value, ...classBreaks.value, activeMetric.value.max * metricFactor.value];
  return cols.map((color, i) => ({ color, lo: bounds[i]!, hi: bounds[i + 1] ?? bounds[bounds.length - 1]! }));
});

// Bivariate price × yield — the investor "undervalued" lens (low price + high yield).
// 3×3 palette indexed [yieldClass][priceClass]; low-price/high-yield corner pops teal.
const BIV_PRICE_KEY = 'reMedianPrice';
const BIV_YIELD_KEY = 'reGrossYield';
const BIV: string[][] = [
  ['#e8e8e8', '#dfb0d6', '#be64ac'], // low yield  (pale → magenta as price rises)
  ['#a5add3', '#8c8dc0', '#5c5fa0'], // mid yield
  ['#5ac8c8', '#5698b9', '#3b4994'], // high yield (teal = undervalued → indigo = pricey+high-yield)
];
function bivFactor(key: string) { return activeGroup.value.segmented ? segFactor(reSegment.value, key) : 1; }
function bivBreaks() {
  const pf = bivFactor(BIV_PRICE_KEY);
  const yf = bivFactor(BIV_YIELD_KEY);
  return {
    pf, yf,
    price: quantileBreaks(cellValues(BIV_PRICE_KEY, pf), 3),
    yield: quantileBreaks(cellValues(BIV_YIELD_KEY, yf), 3),
  };
}
const bivLegendCells = computed(() => {
  // rows top→bottom = high→low yield, for a conventional bivariate legend
  return [2, 1, 0].map((yc) => [0, 1, 2].map((xc) => BIV[yc]![xc]!));
});
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
  map.on('click', (e) => { if (pinMode.value) placePin(e.lngLat); else if (isoArm.value) setIsoOrigin(e.lngLat); });
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
  // Read-on-hover for foot-traffic corridors.
  map.on('mousemove', 'ft-line', (e) => {
    if (map) map.getCanvas().style.cursor = 'pointer';
    const f = e.features?.[0]; if (!f) { hoverInfo.value = null; return; }
    const int = Number(f.properties?.int ?? 0);
    const kind = String(f.properties?.kind ?? '') as keyof typeof FT_KIND_LABEL;
    hoverInfo.value = { x: e.point.x, y: e.point.y, label: `${FT_KIND_LABEL[kind] ?? 'Corridor'} · ${hourLabel(ftHour.value)}`, value: `${Math.round(int * 100)} traffic index` };
  });
  map.on('mouseleave', 'ft-line', () => { if (map) map.getCanvas().style.cursor = ''; hoverInfo.value = null; });
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

// Red→amber→green diverging ramp for the site-suitability score.
const SITE_RAMP: Array<[number, string]> = [[0, '#d73027'], [0.25, '#fc8d59'], [0.5, '#fee08b'], [0.75, '#91cf60'], [1, '#1a9850']];

// Build a MapLibre `step` fill expression from class breaks. Guards MapLibre's
// hard requirement that stop inputs be strictly ascending — low-variance metrics
// can yield duplicate quantile breaks, which would otherwise throw and blank the map.
function buildStepExpr(input: unknown, breaks: number[], colors: string[]): unknown {
  const expr: Array<unknown> = ['step', input, colors[0]];
  let last = -Infinity;
  for (let i = 0; i < breaks.length; i++) {
    if (breaks[i]! <= last) continue;
    expr.push(breaks[i], colors[i + 1]);
    last = breaks[i]!;
  }
  return expr;
}

// Data-driven fill color for the active civic metric — a stepped classification
// (equal / quantile / Jenks) so each class is a distinct, honest band.
function civicColorExpr(m: MetricDef, factor: number): unknown {
  const br = breaksFor(classMode.value, cellValues(m.key, factor), m.min * factor, m.max * factor, N_CLASSES);
  return buildStepExpr(['*', ['get', m.key], factor], br, classColorsFor(m));
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
function renderBivariate() {
  const { pf, yf, price, yield: yld } = bivBreaks();
  const features = baseGrid.value.features.map((f) => {
    const p = Number((f.properties as Record<string, number>)[BIV_PRICE_KEY] ?? 0) * pf;
    const y = Number((f.properties as Record<string, number>)[BIV_YIELD_KEY] ?? 0) * yf;
    const xc = classOf(p, price);
    const yc = classOf(y, yld);
    return { ...f, properties: { ...f.properties, bivClass: yc * 3 + xc } };
  });
  const match: Array<unknown> = ['match', ['get', 'bivClass']];
  for (let i = 0; i < 9; i++) match.push(i, BIV[Math.floor(i / 3)]![i % 3]!);
  match.push('#888888');
  paintCivic({ type: 'FeatureCollection', features } as unknown as FillData, match as never);
}
// Foot traffic as a corridor network, weighted + colored by time-of-day intensity.
function renderFootTraffic() {
  if (!map) return;
  const feats = ftNet.features.map((s) => ({ ...s, properties: { ...s.properties, int: +(s.properties.base * footTrafficFactor(s.properties.kind, ftHour.value, ftWeekend.value)).toFixed(3) } }));
  const data = { type: 'FeatureCollection', features: feats } as unknown as FillData;
  const src = map.getSource('ft') as maplibregl.GeoJSONSource | undefined;
  if (src) src.setData(data);
  else map.addSource('ft', { type: 'geojson', data });
  const widthExpr = ['interpolate', ['linear'], ['get', 'int'], 0, 0.4, 0.3, 1.6, 0.6, 4.5, 1, 10] as never;
  const colorExpr = ['interpolate', ['linear'], ['get', 'int'], 0, '#3b4ea8', 0.4, '#7f9bd6', 0.6, '#ffd36b', 0.78, '#ff8a3d', 1, '#ff2d2d'] as never;
  if (map.getLayer('ft-line')) {
    map.setLayoutProperty('ft-line', 'visibility', 'visible');
    map.setPaintProperty('ft-line', 'line-width', widthExpr);
    map.setPaintProperty('ft-line', 'line-color', colorExpr);
  } else {
    map.addLayer({ id: 'ft-line', type: 'line', source: 'ft', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-width': widthExpr, 'line-color': colorExpr, 'line-opacity': 0.9, 'line-blur': 0.5 } });
  }
}
function hideFootTraffic() { if (map?.getLayer('ft-line')) map.setLayoutProperty('ft-line', 'visibility', 'none'); }
// Isochrone: band the reached hexes by travel time, painted above the choropleth.
function paintIsoLayer(origin: { lng: number; lat: number } | null, sourceId: string, layerId: string, colors: string[]) {
  if (!map) return;
  if (!origin) { if (map.getLayer(layerId)) map.setLayoutProperty(layerId, 'visibility', 'none'); return; }
  const feats = baseGrid.value.features
    .map((f) => ({ f, t: isoTimeMin(f.properties as Record<string, number>, origin) }))
    .filter((x) => x.t <= isoMax.value)
    .map((x) => ({ ...x.f, properties: { ...x.f.properties, isoBand: ISO_BANDS.findIndex((b) => x.t <= b) === -1 ? ISO_BANDS.length : ISO_BANDS.findIndex((b) => x.t <= b) } }));
  const data = { type: 'FeatureCollection', features: feats } as unknown as FillData;
  const src = map.getSource(sourceId) as maplibregl.GeoJSONSource | undefined;
  if (src) src.setData(data);
  else map.addSource(sourceId, { type: 'geojson', data });
  const color = ['match', ['get', 'isoBand'], 0, colors[0], 1, colors[1], 2, colors[2], 3, colors[3], colors[4]] as never;
  const opacity = compareOn.value ? 0.42 : 0.5;
  if (map.getLayer(layerId)) {
    map.setLayoutProperty(layerId, 'visibility', 'visible');
    map.setPaintProperty(layerId, 'fill-color', color);
    map.setPaintProperty(layerId, 'fill-opacity', opacity);
  } else {
    map.addLayer({ id: layerId, type: 'fill', source: sourceId, paint: { 'fill-color': color, 'fill-opacity': opacity, 'fill-outline-color': 'rgba(255,255,255,0.25)' } });
  }
}
function renderIso() {
  paintIsoLayer(isoOrigin.value, 'iso', 'iso-fill', ISO_COLORS);
  if (compareOn.value) paintIsoLayer(isoOriginB.value, 'isoB', 'iso-fill-b', ISO_COLORS_B);
  else if (map?.getLayer('iso-fill-b')) map.setLayoutProperty('iso-fill-b', 'visibility', 'none');
}
function hideIso() { for (const l of ['iso-fill', 'iso-fill-b']) if (map?.getLayer(l)) map.setLayoutProperty(l, 'visibility', 'none'); }
function setIsoOrigin(lngLat: { lng: number; lat: number }) {
  const pt = { lng: +lngLat.lng.toFixed(5), lat: +lngLat.lat.toFixed(5) };
  if (compareOn.value && isoArmTarget.value === 'b') {
    isoOriginB.value = pt;
    if (isoMarkerB) isoMarkerB.setLngLat([pt.lng, pt.lat]);
    else if (map) isoMarkerB = new maplibregl.Marker({ color: '#a855f7' }).setLngLat([pt.lng, pt.lat]).addTo(map);
  } else {
    isoOrigin.value = pt;
    if (isoMarker) isoMarker.setLngLat([pt.lng, pt.lat]);
    else if (map) isoMarker = new maplibregl.Marker({ color: '#22d3ee' }).setLngLat([pt.lng, pt.lat]).addTo(map);
  }
  isoArm.value = false;
  renderIso();
}
function armIso(target: 'a' | 'b') { isoArmTarget.value = target; isoArm.value = true; }
function toggleIso() {
  isoOn.value = !isoOn.value;
  if (isoOn.value) { muteBasemapForData(); if (isoOrigin.value) renderIso(); else armIso('a'); }
  else { isoArm.value = false; hideIso(); isoMarker?.remove(); isoMarker = null; isoMarkerB?.remove(); isoMarkerB = null; }
}
function toggleCompare() {
  compareOn.value = !compareOn.value;
  if (compareOn.value) { if (!isoOriginB.value) armIso('b'); renderIso(); }
  else { isoOriginB.value = null; isoMarkerB?.remove(); isoMarkerB = null; if (map?.getLayer('iso-fill-b')) map.setLayoutProperty('iso-fill-b', 'visibility', 'none'); renderIso(); }
}
function clearIso() {
  isoOrigin.value = null; isoOriginB.value = null;
  hideIso();
  isoMarker?.remove(); isoMarker = null; isoMarkerB?.remove(); isoMarkerB = null;
  if (isoOn.value) armIso(compareOn.value ? 'a' : 'a');
}
function renderCivic() {
  if (isFootTraffic.value) { hideCivic(); renderFootTraffic(); return; }
  hideFootTraffic();
  if (bivariateOn.value && isRealEstate.value) { renderBivariate(); return; }
  paintCivic({ type: 'FeatureCollection', features: tFeatures() } as unknown as FillData, civicColorExpr(activeMetric.value, metricFactor.value) as never);
}
function renderSite() {
  // Suitability scores cluster tightly (e.g. 50–60), so a raw 0–100 ramp paints
  // everything the same shade. Classify over the ACTUAL score range so the best
  // areas go green and the worst red — the whole point of a site-selection map.
  const scores = baseGrid.value.features.map((f) => scoreCell(f.properties, siteProfile.value));
  const scored = { type: 'FeatureCollection', features: baseGrid.value.features.map((f, i) => ({ ...f, properties: { ...f.properties, siteScore: scores[i] } })) };
  const br = breaksFor('quantile', scores, Math.min(...scores), Math.max(...scores), N_CLASSES);
  const cols = Array.from({ length: N_CLASSES }, (_, i) => sampleRamp(SITE_RAMP, i / (N_CLASSES - 1)));
  paintCivic(scored as unknown as FillData, buildStepExpr(['get', 'siteScore'], br, cols) as never);
}
function hideCivic() { if (map?.getLayer('civic-fill')) map.setLayoutProperty('civic-fill', 'visibility', 'none'); }
// Rebuild the tessellation (hex↔square, or a new H3 resolution) and repaint.
function rebuildGrid() {
  baseGrid.value = gridType.value === 'hex' ? civicHexGrid(hexRes.value) : civicGrid();
  selectedCell.value = null;
  if (siteMode.value) renderSite();
  else if (civicOn.value) renderCivic();
  if (isoOn.value && isoOrigin.value) renderIso();
}
// Beauty: mute the basemap when data goes on top, so the choropleth reads clean.
function muteBasemapForData() { if (basemap.value === 'streets') setBasemap('light'); }
function toggleCivic() {
  civicOn.value = !civicOn.value;
  if (siteMode.value) return; // site overlay takes precedence
  if (civicOn.value) { muteBasemapForData(); renderCivic(); } else { hideCivic(); hideFootTraffic(); }
}
function toggleSite() {
  siteMode.value = !siteMode.value;
  if (siteMode.value) { muteBasemapForData(); hideFootTraffic(); renderSite(); }
  else if (civicOn.value) renderCivic();
  else { hideCivic(); hideFootTraffic(); }
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
watch([civicMetricKey, reSegment, classMode, bivariateOn], () => { if (!siteMode.value && civicOn.value) renderCivic(); });
watch([gridType, hexRes], rebuildGrid);
watch([ftHour, ftWeekend], () => { if (isFootTraffic.value && civicOn.value && !siteMode.value) renderFootTraffic(); });
watch(isFootTraffic, (on) => { if (!on) stopFtPlay(); });
watch([isoMode, isoMax], () => { if (isoOn.value && isoOrigin.value) renderIso(); });
watch(timeQ, () => { if (civicOn.value && !siteMode.value && !isFootTraffic.value) renderCivic(); });
watch([isFootTraffic, siteMode, civicOn], ([ft, site, on]) => { if (ft || site || !on) stopTimePlay(); });
watch(siteProfile, () => { if (siteMode.value) renderSite(); if (pois.value.length) { pois.value = []; clearPois(); poiState.value = 'idle'; } });
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
  stopFtPlay();
  stopTimePlay();
  isoMarker?.remove();
  isoMarkerB?.remove();
  clearPois();
  window.removeEventListener('pointermove', onPanelMove);
  window.removeEventListener('pointerup', endPanelResize);
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
/* Drag-to-resize strip on the panel's inner edge (below the collapse button). */
.mapx-resize { position: absolute; top: 40px; bottom: 10px; width: 10px; z-index: 4; cursor: col-resize; touch-action: none; display: flex; align-items: center; justify-content: center; }
.mapx-resize--left { right: 0; }
.mapx-resize--right { left: 0; }
.mapx-resize::after { content: ''; width: 3px; height: 40px; border-radius: 3px; background: rgba(255, 255, 255, 0.14); transition: background 0.12s ease, height 0.12s ease; }
.mapx-resize:hover::after { background: var(--accent, #58a6ff); height: 64px; }
@media (prefers-reduced-motion: reduce) { .mapx-resize::after { transition: none; } }
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
/* Live POIs (real competitors) */
.mapx-poi { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
.mapx-poi .mapx-bm.err { border-color: rgba(240, 101, 106, 0.5); color: #f0656a; }
.mapx-poi-n { font-size: 0.68rem; color: var(--text-2); } .mapx-poi-n b { color: #4bbf73; }
:deep(.mapx-poi-mk) { width: 11px; height: 11px; border-radius: 50%; background: #ff6b3d; border: 1.5px solid #fff; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5); cursor: pointer; }
.mapx-site-head { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.6rem; font-size: 0.66rem; color: var(--text-3); }
.mapx-site-legend { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.45rem; font-size: 0.6rem; color: var(--text-3); }
.mapx-site-bar { flex: 1; height: 8px; border-radius: 3px; border: 1px solid rgba(255, 255, 255, 0.14); background: linear-gradient(90deg, #d73027, #fc8d59, #fee08b, #91cf60, #1a9850); }

/* Area profile (right panel lead) */
.mapx-ap-head { display: flex; align-items: center; justify-content: space-between; }
.mapx-ap-name { font-size: 0.78rem; color: var(--text); font-weight: 600; font-family: ui-monospace, monospace; margin-bottom: 0.6rem; word-break: break-word; }
.mapx-ap-score { display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.6rem; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; background: rgba(255, 255, 255, 0.03); }
.mapx-ap-score-n { font-size: 1.6rem; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; } .mapx-ap-score-n small { font-size: 0.7rem; color: var(--text-3); font-weight: 600; }
.mapx-ap-score-l { font-size: 0.74rem; color: var(--text-2); } .mapx-ap-score-l b { color: var(--text); }
.mapx-ap-rank { display: block; font-size: 0.66rem; color: var(--text-3); margin-top: 0.1rem; }
.mapx-ap-hl { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 0.7rem; }
.mapx-ap-hl-h { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; } .mapx-ap-hl-h.up { color: #4bbf73; } .mapx-ap-hl-h.down { color: #f0656a; }
.mapx-ap-hl-row { display: flex; align-items: baseline; justify-content: space-between; gap: 0.4rem; font-size: 0.7rem; padding: 0.1rem 0; } .mapx-ap-hl-row span { color: var(--text-3); } .mapx-ap-hl-row b { color: var(--text); font-variant-numeric: tabular-nums; }
.mapx-ap-grp { margin-top: 0.6rem; border-top: 1px solid rgba(255, 255, 255, 0.07); padding-top: 0.4rem; }
.mapx-ap-grp summary { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); cursor: pointer; list-style: none; }
.mapx-ap-grp summary::-webkit-details-marker { display: none; }
.mapx-ap-grp summary::before { content: '▸ '; } .mapx-ap-grp[open] summary::before { content: '▾ '; }
.mapx-ap-metric { display: grid; grid-template-columns: 6.2rem 1fr 3.4rem; align-items: center; gap: 0.4rem; margin-top: 0.35rem; font-size: 0.7rem; }
.mapx-ap-m-l { color: var(--text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mapx-ap-m-bar { height: 6px; border-radius: 999px; background: rgba(255, 255, 255, 0.07); overflow: hidden; } .mapx-ap-m-bar i { display: block; height: 100%; }
.mapx-ap-m-v { text-align: right; color: var(--text); font-variant-numeric: tabular-nums; }
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
.mapx-legend-steps { flex: 1; display: flex; height: 10px; border-radius: 3px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.14); }
.mapx-legend-steps i { flex: 1; }
/* Classification selector */
/* Foot-traffic time-of-day control */
.mapx-ft { margin-top: 0.2rem; }
.mapx-ft-time { display: flex; align-items: center; gap: 0.5rem; }
.mapx-ft-time input { flex: 1; accent-color: var(--map-accent); }
.mapx-ft-play { flex: 0 0 auto; width: 1.7rem; height: 1.7rem; display: grid; place-items: center; padding: 0; border-radius: 7px; border: 1px solid var(--map-accent); background: rgba(47, 107, 255, 0.14); color: #93b4ff; font-size: 0.66rem; cursor: pointer; }
.mapx-ft-play:hover { background: rgba(47, 107, 255, 0.24); color: #fff; }
.mapx-ft-hr { min-width: 3.2rem; text-align: right; font-size: 0.82rem; font-weight: 700; color: var(--text); font-variant-numeric: tabular-nums; }
.mapx-ft-day { margin-top: 0.45rem; }
.mapx-ft-bar { flex: 1; height: 9px; border-radius: 3px; border: 1px solid rgba(255, 255, 255, 0.14); background: linear-gradient(90deg, #3b4ea8, #7f9bd6, #ffd36b, #ff8a3d, #ff2d2d); }
/* Isochrone bands + summary */
.mapx-iso-bands { display: flex; gap: 0.5rem; margin: 0.5rem 0; font-size: 0.64rem; color: var(--text-3); }
.mapx-iso-bands span { display: inline-flex; align-items: center; gap: 0.2rem; }
.mapx-iso-bands i { width: 11px; height: 11px; border-radius: 3px; }
.mapx-iso-sum { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; margin: 0.55rem 0; }
.mapx-iso-sum > div { display: flex; flex-direction: column; padding: 0.4rem 0.5rem; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 9px; background: rgba(255, 255, 255, 0.03); }
.mapx-iso-sum b { font-size: 0.95rem; color: var(--text); font-variant-numeric: tabular-nums; }
.mapx-iso-sum span { font-size: 0.6rem; color: var(--text-3); }
.mapx-catch { margin: 0.2rem 0 0.5rem; }
.mapx-catch-h { display: flex; justify-content: space-between; align-items: baseline; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); margin-bottom: 0.3rem; } .mapx-catch-h span { text-transform: none; letter-spacing: 0; }
.mapx-catch-row { display: grid; grid-template-columns: 1fr auto auto; align-items: baseline; gap: 0.5rem; padding: 0.15rem 0; font-size: 0.72rem; }
.mapx-catch-l { color: var(--text-3); }
.mapx-catch-v { color: var(--text); font-variant-numeric: tabular-nums; }
.mapx-catch-d { font-size: 0.66rem; font-variant-numeric: tabular-nums; min-width: 3rem; text-align: right; }
.mapx-catch-d.up { color: #4bbf73; } .mapx-catch-d.down { color: #f0656a; } .mapx-catch-d.neutral { color: var(--text-3); }
/* A/B compare */
.mapx-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; vertical-align: middle; }
.mapx-cmp2-sum { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; margin: 0.5rem 0; }
.mapx-cmp2-sum > div { display: flex; flex-direction: column; padding: 0.4rem 0.5rem; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 9px; }
.mapx-cmp2-sum .a { border-left: 3px solid #22d3ee; } .mapx-cmp2-sum .b { border-left: 3px solid #a855f7; }
.mapx-cmp2-sum b { font-size: 0.95rem; color: var(--text); font-variant-numeric: tabular-nums; } .mapx-cmp2-sum span { font-size: 0.6rem; color: var(--text-3); }
.mapx-cmp2 { margin: 0.2rem 0 0.5rem; }
.mapx-cmp2-row { display: grid; grid-template-columns: 1fr 3.2rem 3.2rem; align-items: baseline; gap: 0.4rem; padding: 0.15rem 0; font-size: 0.72rem; }
.mapx-cmp2-row b { text-align: right; color: var(--text-2); font-variant-numeric: tabular-nums; font-weight: 500; }
.mapx-cmp2-row b.win { color: #4bbf73; font-weight: 700; }
.mapx-cmp2-l { color: var(--text-3); }
.mapx-cmp2-hdr { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); }
.mapx-cmp2-hdr .a { color: #22d3ee; text-align: right; } .mapx-cmp2-hdr .b { color: #a855f7; text-align: right; }
.mapx-cells { margin-bottom: 0.6rem; }
.mapx-cells-l { display: block; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); margin-bottom: 0.3rem; }
.mapx-cells-res { display: flex; align-items: center; gap: 0.3rem; margin-top: 0.35rem; font-size: 0.66rem; color: var(--text-3); }
.mapx-cells-res .mapx-bm { flex: 0 0 auto; min-width: 1.8rem; }
.mapx-cells-n { margin-left: auto; font-variant-numeric: tabular-nums; }
.mapx-class { margin-top: 0.55rem; }
.mapx-class-l { display: block; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); margin-bottom: 0.3rem; }
.mapx-bm.sm { font-size: 0.68rem; padding: 0.25rem 0.4rem; }
/* Bivariate 3×3 legend */
.mapx-biv { position: relative; margin: 0.6rem 0 0.4rem 1.6rem; width: max-content; }
.mapx-biv-grid { display: flex; flex-direction: column; gap: 2px; }
.mapx-biv-row { display: flex; gap: 2px; }
.mapx-biv-row i { width: 20px; height: 20px; border-radius: 2px; }
.mapx-biv-ax { position: absolute; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); }
.mapx-biv-ax--x { bottom: -1rem; left: 0; }
.mapx-biv-ax--y { transform: rotate(-90deg); transform-origin: left bottom; left: -0.3rem; bottom: 1.4rem; white-space: nowrap; }
.mapx-switch--sm { font-size: 0.72rem; margin-top: 0.55rem; }
.mapx-time { margin-top: 0.6rem; }
.mapx-time-head { display: flex; align-items: baseline; justify-content: space-between; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); margin-bottom: 0.2rem; }
.mapx-time-head b { font-size: 0.72rem; text-transform: none; letter-spacing: 0; color: var(--text-2); font-variant-numeric: tabular-nums; }
.mapx-time-head b.past { color: #e3b341; }
.mapx-time-r { display: inline-flex; align-items: center; gap: 0.4rem; }
.mapx-time input { width: 100%; accent-color: var(--map-accent); }
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
