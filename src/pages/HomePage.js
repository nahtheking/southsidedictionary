import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DesktopNav, TabBar, StatusBar } from '../components/Nav';
import SearchBar from '../components/SearchBar';
import RegionChips from '../components/RegionChips';
import HeatRibbon from '../components/HeatRibbon';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import { HEM, POP_WORDS } from '../data/sampleData';
import '../styles/thoam.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeRegions, setActiveRegions] = useState(['all']);
  const isMobile = window.innerWidth < 768;

  const handleSearch = (term) => navigate(`/word/${encodeURIComponent(term)}`);

  if (isMobile) return <HomeMobile onSearch={handleSearch} activeRegions={activeRegions} setActiveRegions={setActiveRegions} />;
  return <HomeDesktop onSearch={handleSearch} activeRegions={activeRegions} setActiveRegions={setActiveRegions} />;
}

function HomeDesktop({ onSearch, activeRegions, setActiveRegions }) {
  return (
    <div className="vt-root vt-page">
      <DesktopNav />

      <div className="vt-page-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero */}
        <div style={{ padding: '64px 44px 48px', textAlign: 'center', maxWidth: 820, margin: '0 auto', width: '100%' }}>
          <div className="vt-eyebrow">Từ điển tiếng Việt theo vùng miền</div>
          <h1 className="vt-serif" style={{
            fontSize: 56, fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.02em', margin: '16px 0 14px',
            color: 'var(--ink)',
          }}>
            Một từ, ba miền,<br />ngàn cách gọi.
          </h1>
          <p style={{ fontSize: 17.5, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 540, margin: '0 auto 30px' }}>
            Tra nghĩa, nghe phát âm và xem một từ phổ biến ra sao ở Bắc · Trung · Nam — tất cả trên một tấm bản đồ.
          </p>
          <div style={{ maxWidth: 620, margin: '0 auto' }}>
            <SearchBar onSearch={onSearch} size="lg" />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
              <RegionChips active={activeRegions} onChange={setActiveRegions} />
            </div>
          </div>
          <div style={{ marginTop: 26, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--ink-faint)', fontWeight: 600 }}>Tra nhiều:</span>
            {POP_WORDS.slice(0, 5).map(w => (
              <span
                key={w}
                style={{ fontSize: 14, fontWeight: 600, color: 'var(--son)', borderBottom: '1.5px solid var(--son-tint)', cursor: 'pointer' }}
                onClick={() => onSearch(w)}
              >{w}</span>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div style={{ background: 'var(--paper-deep)', borderTop: '1px solid var(--line)', flex: 1, padding: '40px 44px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 28, maxWidth: 1100, margin: '0 auto' }}>
            {/* Featured word card */}
            <div className="vt-card" style={{ padding: 28, display: 'flex', gap: 24, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div className="vt-kicker">Từ trong ngày</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '8px 0 6px' }}>
                  <span className="vt-serif" style={{ fontSize: 46, fontWeight: 600, lineHeight: 1 }}>Hẻm</span>
                  <span className="vt-tag vt-tag--type">Danh từ</span>
                </div>
                <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '0 0 16px' }}>
                  Lối đi nhỏ len giữa các dãy nhà. Người Trung gọi <b>kiệt</b>, người Bắc gọi <b>ngõ</b>.
                </p>
                <Link to="/word/hẻm" className="vt-btn vt-btn--primary" style={{ display: 'inline-flex' }}>
                  Xem chi tiết <Icon name="arrow" size={16} color="var(--paper)" />
                </Link>
              </div>
              <div style={{ width: 150, flexShrink: 0 }}>
                <HeatRibbon regions={HEM.regions} width={150} showChips={true} />
              </div>
            </div>

            {/* Region explorer */}
            <div>
              <div className="vt-kicker" style={{ marginBottom: 14 }}>Khám phá theo miền</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { k: 'nam',   label: 'Miền Nam',   path: '/region/nam' },
                  { k: 'bac',   label: 'Miền Bắc',   path: '/region/bac' },
                  { k: 'trung', label: 'Miền Trung',  path: '/region/trung' },
                ].map(r => (
                  <Link key={r.k} to={r.path} style={{ textDecoration: 'none' }}>
                    <div className="vt-card" style={{
                      padding: '16px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      borderLeft: `4px solid var(--${r.k})`,
                      cursor: 'pointer',
                    }}>
                      <i className={'dot dot-' + r.k} style={{ width: 11, height: 11, borderRadius: 999 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ink)' }}>{r.label}</div>
                        <div style={{ fontSize: 13, color: 'var(--ink-faint)' }}>Phương ngữ & từ đặc trưng</div>
                      </div>
                      <Icon name="chevron" size={18} color="var(--ink-faint)" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeMobile({ onSearch, activeRegions, setActiveRegions }) {
  return (
    <div className="vt-root vt-page">
      <StatusBar />
      <div className="vt-page-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size={0.82} />
          <Icon name="user" size={22} color="var(--ink-soft)" />
        </div>
        <div style={{ padding: '26px 20px 18px' }}>
          <div className="vt-eyebrow" style={{ fontSize: 10.5 }}>Tra cứu vùng miền</div>
          <h1 className="vt-serif" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '8px 0 16px', color: 'var(--ink)' }}>
            Một từ,<br />ba miền gọi khác.
          </h1>
          <SearchBar onSearch={onSearch} size="sm" mic={true} />
          <div style={{ display: 'flex', gap: 7, overflow: 'auto', marginTop: 14, paddingBottom: 4 }}>
            <RegionChips active={activeRegions} onChange={setActiveRegions} size={12} />
          </div>
        </div>
        <div style={{ padding: '4px 20px 20px', flex: 1 }}>
          <div className="vt-kicker" style={{ fontSize: 11, marginBottom: 10 }}>Từ trong ngày</div>
          <div className="vt-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span className="vt-serif" style={{ fontSize: 34, fontWeight: 600, lineHeight: 1 }}>Hẻm</span>
                  <span className="vt-tag vt-tag--type">D.từ</span>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: '8px 0 0' }}>
                  Lối đi nhỏ giữa các dãy nhà.
                </p>
              </div>
              <div style={{ width: 78, flexShrink: 0 }}>
                <HeatRibbon regions={HEM.regions} width={78} showChips={false} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
              {HEM.regions.map(r => (
                <div key={r.k} style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 9, background: 'var(--paper-deep)' }}>
                  <i className={'dot dot-' + r.k} style={{ width: 7, height: 7, borderRadius: 999, display: 'inline-block' }} />
                  <div className="vt-serif" style={{ fontSize: 16, fontWeight: 600, marginTop: 3 }}>{r.word}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
}
