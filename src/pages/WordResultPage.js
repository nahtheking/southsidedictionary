import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DesktopNav, StatusBar, TabBar } from '../components/Nav';
import SearchBar from '../components/SearchBar';
import RegionChips from '../components/RegionChips';
import HeatRibbon from '../components/HeatRibbon';
import HeatBars from '../components/HeatBars';
import { HeatLegend } from '../components/HeatBars';
import Icon from '../components/Icon';
import { HEM } from '../data/sampleData';
import '../styles/thoam.css';

export default function WordResultPage() {
  const { term } = useParams();
  const isMobile = window.innerWidth < 768;
  const data = HEM;

  if (isMobile) return <ResultMobile data={data} term={term} />;
  return <ResultDesktop data={data} term={term} />;
}

function AudioPill({ label = 'Nghe phát âm', ipa, onClick }) {
  return (
    <button className="vt-btn vt-btn--ghost" style={{ padding: '9px 14px 9px 11px' }} onClick={onClick}>
      <span style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--son)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="audio" size={15} color="var(--paper)" />
      </span>
      <span style={{ fontWeight: 600 }}>{label}</span>
      {ipa && <span className="vt-mono" style={{ color: 'var(--ink-faint)', fontWeight: 500, fontSize: 13 }}>{ipa}</span>}
    </button>
  );
}

function DefinitionBlock({ senses }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {senses.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 14 }}>
          <span className="vt-serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--son)', lineHeight: 1.5, width: 18, flexShrink: 0 }}>{i + 1}</span>
          <div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: 'var(--ink)' }}>{s.text}</p>
            {s.note && <p style={{ margin: '5px 0 0', fontSize: 14, color: 'var(--ink-faint)' }}>{s.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SynonymTriptych({ regions }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
      {regions.map(r => (
        <div key={r.k} className="vt-card" style={{
          padding: 18,
          borderRadius: 14,
          boxShadow: 'inset 0 0 0 1px var(--line-soft)',
          outline: 'none',
          borderTop: `3px solid var(--${r.k})`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <i className={'dot dot-' + r.k} style={{ width: 8, height: 8, borderRadius: 999 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>{r.label}</span>
          </div>
          <div className="vt-serif" style={{ fontSize: 27, fontWeight: 600, margin: '8px 0 2px' }}>{r.word}</div>
          <div className="vt-mono" style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>{r.ipa}</div>
          {r.ex && (
            <p style={{ margin: '11px 0 0', fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-soft)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
              "{r.ex}"
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function ExampleQuote({ region, regionKey, text, gloss }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
      <span style={{ flexShrink: 0, marginTop: 3 }}>
        <Icon name="quote" size={20} color={`var(--${regionKey})`} />
      </span>
      <div>
        <p className="vt-serif" style={{ margin: 0, fontSize: 18, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--ink)' }}>{text}</p>
        {gloss && <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--ink-faint)' }}>{gloss}</p>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 9 }}>
          <i className={'dot dot-' + regionKey} style={{ width: 7, height: 7, borderRadius: 999 }} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-soft)' }}>{region}</span>
          <button className="vt-btn vt-btn--ghost" style={{ padding: '3px 8px', fontSize: 12, marginLeft: 4 }}>
            <Icon name="audio" size={13} /> Nghe
          </button>
        </div>
      </div>
    </div>
  );
}

function MapPanel({ data }) {
  return (
    <div className="vt-card" style={{ padding: 24, position: 'sticky', top: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="vt-eyebrow">Mức độ phổ biến</div>
          <div className="vt-serif" style={{ fontSize: 19, fontWeight: 600, marginTop: 3 }}>
            Từ «{data.word.toLowerCase()}» trên cả nước
          </div>
        </div>
        <Icon name="map" size={22} color="var(--ink-faint)" />
      </div>
      <hr className="vt-rule" style={{ margin: '18px 0' }} />
      <HeatRibbon regions={data.regions} width={280} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
        <HeatLegend w={180} />
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', lineHeight: 1.5, margin: '18px 0 0', textAlign: 'center' }}>
        Số liệu tổng hợp từ kho ngữ liệu cộng đồng · cập nhật T6/2026
      </p>
    </div>
  );
}

function ResultDesktop({ data, term }) {
  const navigate = useNavigate();
  const [activeRegions, setActiveRegions] = useState(['all']);

  return (
    <div className="vt-root vt-page">
      <DesktopNav />
      {/* Slim search row */}
      <div style={{
        padding: '18px 44px',
        borderBottom: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        background: 'var(--paper-2)',
        position: 'relative',
        zIndex: 2,
        flexShrink: 0,
      }}>
        <div style={{ flex: 1, maxWidth: 560 }}>
          <SearchBar value={term} size="sm" onSearch={(t) => navigate(`/word/${encodeURIComponent(t)}`)} />
        </div>
        <div style={{ flex: 1 }}>
          <RegionChips active={activeRegions} onChange={setActiveRegions} />
        </div>
      </div>

      <div className="vt-page-content" style={{ padding: '32px 44px 44px', display: 'grid', gridTemplateColumns: '1fr 430px', gap: 36, alignItems: 'start' }}>
        {/* Left: word content */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
            <h1 className="vt-serif" style={{ fontSize: 64, fontWeight: 600, lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              {data.word}
            </h1>
            <span className="vt-mono" style={{ fontSize: 17, color: 'var(--ink-faint)', paddingBottom: 8 }}>{data.ipa}</span>
            <span style={{ paddingBottom: 6 }}><span className="vt-tag vt-tag--type">{data.type}</span></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '16px 0 8px', flexWrap: 'wrap' }}>
            <AudioPill label="Nghe phát âm" />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)' }}>
              <i className="dot dot-nam" style={{ width: 9, height: 9, borderRadius: 999 }} />
              Phổ biến nhất ở Miền Nam
            </span>
          </div>

          <div className="vt-card" style={{ padding: 26, marginTop: 22 }}>
            <div className="vt-kicker" style={{ marginBottom: 14 }}>Nghĩa</div>
            <DefinitionBlock senses={data.senses} />
          </div>

          <div style={{ marginTop: 28 }}>
            <div className="vt-kicker" style={{ marginBottom: 14 }}>Cách gọi theo miền</div>
            <SynonymTriptych regions={data.regions} />
          </div>

          <div style={{ marginTop: 28 }}>
            <div className="vt-kicker" style={{ marginBottom: 6 }}>Ví dụ trong câu</div>
            {data.examples.map((e, i) => <ExampleQuote key={i} {...e} />)}
          </div>

          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="vt-kicker">Từ liên quan</span>
            {data.related.map(w => (
              <span
                key={w}
                className="vt-chip"
                style={{ fontSize: 13, cursor: 'pointer' }}
                onClick={() => navigate(`/word/${encodeURIComponent(w)}`)}
              >{w}</span>
            ))}
          </div>
        </div>

        {/* Right: map panel */}
        <MapPanel data={data} />
      </div>
    </div>
  );
}

function ResultMobile({ data, term }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Nghĩa');
  const tabs = ['Nghĩa', 'Theo miền', 'Ví dụ'];

  return (
    <div className="vt-root vt-page">
      <StatusBar />
      <div className="vt-page-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ padding: '2px 16px 12px' }}>
          <SearchBar value={term} size="sm" mic={false} onSearch={(t) => navigate(`/word/${encodeURIComponent(t)}`)} />
        </div>
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 11 }}>
            <h1 className="vt-serif" style={{ fontSize: 44, fontWeight: 600, lineHeight: 0.95, margin: 0, color: 'var(--ink)' }}>
              {data.word}
            </h1>
            <span className="vt-mono" style={{ fontSize: 14, color: 'var(--ink-faint)', paddingBottom: 6 }}>{data.ipa}</span>
            <span style={{ paddingBottom: 5 }}><span className="vt-tag vt-tag--type">D.từ</span></span>
          </div>
          <div style={{ marginTop: 12 }}>
            <AudioPill label="Nghe phát âm" />
          </div>
        </div>

        <div className="vt-card" style={{ margin: '18px 16px 0', padding: '16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="vt-eyebrow" style={{ fontSize: 11 }}>Mức độ phổ biến</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-faint)' }}>«{data.word.toLowerCase()}»</span>
          </div>
          <HeatBars regions={data.regions} />
        </div>

        <div style={{ display: 'flex', gap: 22, padding: '16px 20px 0', borderBottom: '1px solid var(--line)', margin: '16px 0 0', flexShrink: 0 }}>
          {tabs.map(t => (
            <span
              key={t}
              style={{
                fontSize: 14.5,
                fontWeight: activeTab === t ? 700 : 500,
                color: activeTab === t ? 'var(--son)' : 'var(--ink-faint)',
                paddingBottom: 10,
                borderBottom: activeTab === t ? '2px solid var(--son)' : '2px solid transparent',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab(t)}
            >{t}</span>
          ))}
        </div>

        <div style={{ padding: '16px 20px' }}>
          {activeTab === 'Nghĩa' && <DefinitionBlock senses={data.senses} />}
          {activeTab === 'Theo miền' && <SynonymTriptych regions={data.regions} />}
          {activeTab === 'Ví dụ' && data.examples.map((e, i) => <ExampleQuote key={i} {...e} />)}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
