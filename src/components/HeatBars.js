import React from 'react';
import { heatColor } from './HeatRibbon';

function heatText(pop) {
  return pop > 55 ? '#fff' : 'var(--primary-deep)';
}

function HeatLegend({ w = 220 }) {
  const stops = [6, 30, 60, 96].map(heatColor).join(',');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-faint)' }}>Hiếm</span>
      <div style={{ width: w, height: 9, borderRadius: 999, background: `linear-gradient(90deg, ${stops})` }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-faint)' }}>Rất phổ biến</span>
    </div>
  );
}

export default function HeatBars({ regions }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {regions.map(r => (
        <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 92, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <i className={'dot dot-' + r.k} style={{ width: 9, height: 9, borderRadius: 999 }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)' }}>{r.label}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 600, marginTop: 1 }}>
              "{r.word}"
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="vt-meter" style={{ height: 26, borderRadius: 8 }}>
              <i style={{
                width: r.pop + '%',
                background: heatColor(r.pop),
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: heatText(r.pop) }}>{r.pop}%</span>
              </i>
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 4 }}>
        <HeatLegend w={180} />
      </div>
    </div>
  );
}

export { HeatLegend };
