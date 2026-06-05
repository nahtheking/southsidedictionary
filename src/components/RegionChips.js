import React from 'react';
import '../styles/thoam.css';

const REGIONS = [
  { k: 'all',   label: 'Cả nước',   dot: null },
  { k: 'bac',   label: 'Miền Bắc',  dot: 'dot-bac' },
  { k: 'trung', label: 'Miền Trung', dot: 'dot-trung' },
  { k: 'nam',   label: 'Miền Nam',  dot: 'dot-nam' },
];

export default function RegionChips({ active = ['all'], size = 13, onChange }) {
  const handleClick = (k) => {
    if (!onChange) return;
    if (k === 'all') {
      onChange(['all']);
      return;
    }
    let next = active.filter(a => a !== 'all');
    if (next.includes(k)) {
      next = next.filter(a => a !== k);
      if (next.length === 0) next = ['all'];
    } else {
      next = [...next, k];
    }
    onChange(next);
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {REGIONS.map((r) => {
        const on = active.includes(r.k);
        return (
          <span
            key={r.k}
            className={'vt-chip' + (on ? ' vt-chip--on' : '')}
            style={{ fontSize: size }}
            onClick={() => handleClick(r.k)}
          >
            {r.dot && (
              <i
                className={'dot ' + r.dot}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  ...(on ? { boxShadow: '0 0 0 2px var(--paper)' } : {}),
                }}
              />
            )}
            {r.label}
          </span>
        );
      })}
    </div>
  );
}
