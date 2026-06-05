import React from 'react';
import { ComposableMap, Geographies, Geography, useMapContext } from 'react-simple-maps';

export function heatColor(pop) {
  const t = Math.max(0, Math.min(1, pop / 100));
  return `oklch(${(0.95 - 0.43 * t).toFixed(3)} ${(0.025 + 0.10 * t).toFixed(3)} 152)`;
}

const GEO_URL = '/vietnam.geojson';
const PROJ_CONFIG = { scale: 1700, center: [106.8, 16] };
const SVG_W = 260;
const SVG_H = 560;

// lat 18°N = Bắc/Trung boundary, lat 12°N = Trung/Nam boundary
const LAT_BT = 18;
const LAT_TN = 12;

// Centroid [lng, lat] for each region label
const CENTROIDS = {
  bac:   [105.8, 21.2],
  trung: [108.0, 15.2],
  nam:   [105.8, 10.2],
};

const LABELS    = { bac: 'Miền Bắc', trung: 'Miền Trung', nam: 'Miền Nam' };
const LABELS_SM = { bac: 'Bắc',      trung: 'Trung',      nam: 'Nam' };

function MapInner({ byK, showChips }) {
  const { projection } = useMapContext();

  const [, yBT] = projection([107, LAT_BT]);
  const [, yTN] = projection([107, LAT_TN]);

  return (
    <>
      <defs>
        <filter id="vn-shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(20,60,35,.2)" />
        </filter>
        <clipPath id="vn-clip-bac">
          <rect x={-200} y={-200} width={SVG_W + 400} height={yBT + 200} />
        </clipPath>
        <clipPath id="vn-clip-trung">
          <rect x={-200} y={yBT} width={SVG_W + 400} height={yTN - yBT} />
        </clipPath>
        <clipPath id="vn-clip-nam">
          <rect x={-200} y={yTN} width={SVG_W + 400} height={SVG_H - yTN + 200} />
        </clipPath>
      </defs>

      <g filter="url(#vn-shadow)">
        {['bac', 'trung', 'nam'].map(k => (
          <g key={k} clipPath={`url(#vn-clip-${k})`}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey + k}
                    geography={geo}
                    fill={heatColor(byK[k]?.pop ?? 0)}
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth={2}
                    style={{ outline: 'none' }}
                  />
                ))
              }
            </Geographies>
          </g>
        ))}
      </g>

      {/* region divider lines */}
      {[yBT, yTN].map((y, i) => (
        <line
          key={i}
          x1={0} y1={y} x2={SVG_W} y2={y}
          stroke="white" strokeWidth={1.5}
          strokeDasharray="5 4" opacity={0.75}
        />
      ))}

      {/* chips overlaid on map */}
      {showChips && ['bac', 'trung', 'nam'].map(k => {
        const r = byK[k];
        if (!r) return null;
        const [cx, cy] = projection(CENTROIDS[k]);
        return (
          <g key={k + '-chip'} transform={`translate(${cx},${cy})`}>
            <circle r={32} fill="white" opacity={0.93} />
            <text
              textAnchor="middle" dy={-5}
              fontSize={11} fontWeight={700}
              fill="#0b1f14" fontFamily="Poppins, sans-serif"
            >
              {r.pop}%
            </text>
            <text
              textAnchor="middle" dy={8}
              fontSize={8} fontWeight={600}
              fill="#325c43" fontFamily="Poppins, sans-serif"
            >
              {r.word}
            </text>
          </g>
        );
      })}
    </>
  );
}

export default function HeatRibbon({ regions, width = 240, showChips = true }) {
  const byK = Object.fromEntries((regions || []).map(r => [r.k, r]));
  const compact = width < 180;

  return (
    <div style={{ width, margin: '0 auto' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJ_CONFIG}
        width={SVG_W}
        height={SVG_H}
        style={{ width: '100%', height: 'auto' }}
      >
        <MapInner byK={byK} showChips={showChips && !compact} />
      </ComposableMap>

      {showChips && (
        <div style={{ marginTop: compact ? 8 : 12 }}>
          {['bac', 'trung', 'nam'].map(k => {
            const r = byK[k];
            if (!r) return null;
            return (
              <div key={k} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                marginBottom: compact ? 4 : 6,
              }}>
                <span style={{
                  width: compact ? 8 : 10,
                  height: compact ? 8 : 10,
                  borderRadius: 2, flexShrink: 0,
                  background: heatColor(r.pop),
                }} />
                <span style={{
                  fontSize: compact ? 10 : 11,
                  color: 'var(--ink-faint)',
                  minWidth: compact ? 28 : 60,
                }}>
                  {compact ? LABELS_SM[k] : LABELS[k]}
                </span>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: compact ? 13 : 14,
                  color: 'var(--ink)',
                  flex: 1,
                }}>
                  {r.word}
                </span>
                <span style={{
                  fontSize: compact ? 10 : 11,
                  fontWeight: 700,
                  color: heatColor(Math.max(r.pop, 30)),
                }}>
                  {r.pop}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
