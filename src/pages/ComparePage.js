import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DesktopNav, StatusBar, MobileTopBar, TabBar } from '../components/Nav';
import SearchBar from '../components/SearchBar';
import Icon from '../components/Icon';
import { heatColor } from '../components/HeatRibbon';
import { HEM } from '../data/sampleData';
import '../styles/thoam.css';

export default function ComparePage() {
  const [data, setData] = useState(HEM);
  const isMobile = window.innerWidth < 768;
  if (isMobile) return <CompareMobile data={data} />;
  return <CompareDesktop data={data} />;
}

function RegionColumn({ r }) {
  return (
    <div className="vt-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: `var(--${r.k})`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 9 }}>
        <i style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--paper)', opacity: .9 }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--paper)', letterSpacing: '.01em' }}>{r.label}</span>
      </div>
      <div style={{ padding: '22px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div className="vt-serif" style={{ fontSize: 40, fontWeight: 600, lineHeight: 1 }}>{r.word}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <span className="vt-mono" style={{ fontSize: 13, color: 'var(--ink-faint)' }}>{r.ipa}</span>
            <button className="vt-btn vt-btn--ghost" style={{ padding: '5px 10px', fontSize: 12.5 }}>
              <Icon name="audio" size={14} /> Nghe
            </button>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 6 }}>
            <span>Độ phổ biến tại vùng</span>
            <span>{r.pop}%</span>
          </div>
          <div className="vt-meter">
            <i style={{ width: r.pop + '%', background: heatColor(r.pop) }} />
          </div>
        </div>
        <hr className="vt-rule" />
        <div>
          <div className="vt-kicker" style={{ fontSize: 11, marginBottom: 6 }}>Ví dụ</div>
          <p className="vt-serif" style={{ fontSize: 14.5, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--ink)', margin: 0 }}>
            "{r.ex}"
          </p>
        </div>
      </div>
    </div>
  );
}

function CompareDesktop({ data }) {
  const navigate = useNavigate();
  return (
    <div className="vt-root vt-page">
      <DesktopNav />
      <div className="vt-page-content" style={{ padding: '40px 44px 48px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="vt-eyebrow">So sánh theo miền</div>
            <h1 className="vt-serif" style={{ fontSize: 40, fontWeight: 600, margin: '10px 0 6px', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
              Một khái niệm — ba cách gọi
            </h1>
            <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', margin: 0 }}>
              Khái niệm: <b>"lối đi nhỏ giữa các dãy nhà"</b> · từ toàn dân: <b>hẻm / ngõ</b>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, margin: '24px 0 30px' }}>
            <div style={{ width: 380 }}>
              <SearchBar
                value={data.word}
                size="sm"
                mic={false}
                buttonLabel="So sánh"
                onSearch={(term) => navigate(`/word/${encodeURIComponent(term)}`)}
              />
            </div>
            <span style={{ fontSize: 13, color: 'var(--ink-faint)', fontWeight: 600 }}>hoặc thử: té · mè · thơm</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'stretch' }}>
            {data.regions.map(r => <RegionColumn key={r.k} r={r} />)}
          </div>

          <div className="vt-card" style={{
            marginTop: 22,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'var(--paper-deep)',
            boxShadow: 'inset 0 0 0 1px var(--line-soft)',
          }}>
            <span style={{ flexShrink: 0 }}><Icon name="map" size={22} color="var(--son)" /></span>
            <p style={{ margin: 0, fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
              <b style={{ color: 'var(--ink)' }}>Nhận xét:</b> "hẻm" lan từ Nam ra, nay phổ biến toàn quốc; "kiệt" gần như chỉ dùng ở dải Trung Bộ (Huế – Đà Nẵng); "ngõ" là cách gọi gốc Bắc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareMobile({ data }) {
  const navigate = useNavigate();
  return (
    <div className="vt-root vt-page">
      <StatusBar />
      <MobileTopBar title="So sánh 3 miền" />
      <div className="vt-page-content" style={{ flex: 1, overflow: 'auto', padding: '0 16px 20px' }}>
        <div style={{ marginBottom: 8 }}>
          <SearchBar
            value={data.word}
            size="sm"
            mic={false}
            buttonLabel="So sánh"
            onSearch={(term) => navigate(`/word/${encodeURIComponent(term)}`)}
          />
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '4px 2px 14px' }}>
          "lối đi nhỏ giữa các dãy nhà"
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {data.regions.map(r => (
            <div key={r.k} className="vt-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, borderLeft: `4px solid var(--${r.k})` }}>
              <div style={{ width: 78, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className={'dot dot-' + r.k} style={{ width: 7, height: 7, borderRadius: 999 }} />
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-soft)' }}>{r.label}</span>
                </div>
                <div className="vt-serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 2, lineHeight: 1 }}>{r.word}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="vt-meter" style={{ height: 8 }}>
                  <i style={{ width: r.pop + '%', background: heatColor(r.pop) }} />
                </div>
                <p className="vt-serif" style={{ fontSize: 12.5, fontStyle: 'italic', color: 'var(--ink-soft)', margin: '9px 0 0', lineHeight: 1.45 }}>
                  "{r.ex}"
                </p>
              </div>
              <Icon name="audio" size={18} color="var(--son)" />
            </div>
          ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
