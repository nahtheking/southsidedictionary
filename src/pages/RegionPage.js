import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DesktopNav } from '../components/Nav';
import HeatRibbon from '../components/HeatRibbon';
import Icon from '../components/Icon';
import { REGION_DATA } from '../data/sampleData';
import '../styles/thoam.css';

export default function RegionPage() {
  const { name } = useParams();
  const regionKey = name || 'nam';
  const region = REGION_DATA[regionKey] || REGION_DATA.nam;
  const isMobile = window.innerWidth < 768;

  if (isMobile) return <RegionMobile region={region} regionKey={regionKey} />;
  return <RegionDesktop region={region} regionKey={regionKey} />;
}

function RegionDesktop({ region, regionKey }) {
  const navigate = useNavigate();
  const regions = ['bac', 'trung', 'nam'];
  const regionNames = { bac: 'Miền Bắc', trung: 'Miền Trung', nam: 'Miền Nam' };

  return (
    <div className="vt-root vt-page">
      <DesktopNav />

      {/* Region selector chips */}
      <div style={{ position: 'relative', zIndex: 1, padding: '26px 44px 0', display: 'flex', gap: 10 }}>
        {regions.map(k => (
          <span
            key={k}
            className={'vt-chip' + (k === regionKey ? ' vt-chip--on' : '')}
            style={k === regionKey ? { background: `var(--${k})` } : {}}
            onClick={() => navigate(`/region/${k}`)}
          >
            {regionNames[k]}
          </span>
        ))}
      </div>

      {/* Hero + map */}
      <div style={{ position: 'relative', zIndex: 1, padding: '26px 44px 36px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <i className={'dot dot-' + regionKey} style={{ width: 12, height: 12, borderRadius: 999 }} />
            <span className="vt-eyebrow" style={{ color: `var(--${regionKey})` }}>{region.eyebrow}</span>
          </div>
          <h1 className="vt-serif" style={{ fontSize: 58, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em', margin: '12px 0 16px', color: 'var(--ink)' }}>
            {region.label}
          </h1>
          <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 520, margin: 0 }}>
            {region.description}
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 28 }}>
            {region.stats.map(([n, l]) => (
              <div key={l}>
                <div className="vt-serif" style={{ fontSize: 32, fontWeight: 600, color: `var(--${regionKey})` }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-faint)', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="vt-card" style={{ padding: '18px 10px 8px' }}>
          <HeatRibbon regions={region.mapRegions} width={230} showChips={false} />
          <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--ink-faint)', margin: '0 0 8px' }}>
            Vùng được tô đậm trên bản đồ
          </p>
        </div>
      </div>

      {/* Words section */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--paper-deep)', borderTop: '1px solid var(--line)', padding: '32px 44px 44px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <div className="vt-kicker">Từ đặc trưng {region.label.split(' ')[1]} Bộ</div>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--son)', cursor: 'pointer' }}>
            Xem tất cả {region.stats[0][0]} từ →
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {region.words.map(it => (
            <Link key={it.w} to={`/word/${encodeURIComponent(it.w)}`} style={{ textDecoration: 'none' }}>
              <div className="vt-card" style={{ padding: '16px 18px', cursor: 'pointer' }}>
                <div className="vt-serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--ink)' }}>{it.w}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '6px 0 8px' }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>toàn dân</span>
                  <Icon name="arrow" size={13} color="var(--ink-faint)" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{it.std}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{it.note}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegionMobile({ region, regionKey }) {
  const navigate = useNavigate();
  const regions = ['bac', 'trung', 'nam'];
  const regionNames = { bac: 'Miền Bắc', trung: 'Miền Trung', nam: 'Miền Nam' };

  return (
    <div className="vt-root vt-page">
      <div style={{ padding: '44px 20px 0', display: 'flex', gap: 8, overflow: 'auto' }}>
        {regions.map(k => (
          <span
            key={k}
            className={'vt-chip' + (k === regionKey ? ' vt-chip--on' : '')}
            style={k === regionKey ? { background: `var(--${k})` } : {}}
            onClick={() => navigate(`/region/${k}`)}
          >
            {regionNames[k]}
          </span>
        ))}
      </div>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className={'dot dot-' + regionKey} style={{ width: 10, height: 10, borderRadius: 999 }} />
          <span className="vt-eyebrow">{region.eyebrow}</span>
        </div>
        <h1 className="vt-serif" style={{ fontSize: 40, fontWeight: 600, margin: '8px 0 12px', color: 'var(--ink)' }}>{region.label}</h1>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>{region.description}</p>
        <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
          {region.stats.map(([n, l]) => (
            <div key={l}>
              <div className="vt-serif" style={{ fontSize: 24, fontWeight: 600, color: `var(--${regionKey})` }}>{n}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-faint)', fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--paper-deep)', borderTop: '1px solid var(--line)', padding: '20px 20px 40px', marginTop: 20 }}>
        <div className="vt-kicker" style={{ marginBottom: 14 }}>Từ đặc trưng</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {region.words.slice(0, 6).map(it => (
            <Link key={it.w} to={`/word/${encodeURIComponent(it.w)}`} style={{ textDecoration: 'none' }}>
              <div className="vt-card" style={{ padding: '12px 14px' }}>
                <div className="vt-serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)' }}>{it.w}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 4 }}>{it.note}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
