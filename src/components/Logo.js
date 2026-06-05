import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 1, light = false }) {
  const c = light ? 'var(--paper)' : 'var(--ink)';
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11 * size, textDecoration: 'none' }}>
      <div style={{
        width: 36 * size,
        height: 36 * size,
        borderRadius: 10 * size,
        background: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 0 1px var(--primary-deep), 0 4px 14px -6px rgba(46,139,87,.4)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          color: 'var(--paper)',
          fontSize: 22 * size,
          fontWeight: 600,
          lineHeight: 1,
          marginTop: -1,
        }}>â</span>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 21 * size,
          fontWeight: 600,
          color: c,
          letterSpacing: '-0.01em',
        }}>Thổ Âm</div>
        <div style={{
          fontSize: 10 * size,
          fontWeight: 600,
          letterSpacing: '.1em',
          color: 'var(--ink-faint)',
          textTransform: 'uppercase',
          marginTop: 2 * size,
          whiteSpace: 'nowrap',
        }}>Từ điển vùng miền</div>
      </div>
    </Link>
  );
}
