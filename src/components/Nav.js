import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icon';
import '../styles/thoam.css';

const NAV_ITEMS = [
  { label: 'Tra cứu',  path: '/' },
  { label: 'So sánh',  path: '/compare' },
  { label: 'Vùng miền', path: '/region/nam' },
  { label: 'Đóng góp', path: '/contribute' },
];

export function DesktopNav() {
  const location = useLocation();
  const active = NAV_ITEMS.find(it =>
    it.path === '/' ? location.pathname === '/' : location.pathname.startsWith(it.path.split('/').slice(0,2).join('/'))
  )?.label || 'Tra cứu';

  return (
    <header className="vt-desktop-nav">
      <Logo />
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {NAV_ITEMS.map(it => {
          const on = it.label === active;
          return (
            <Link key={it.label} to={it.path} style={{
              fontSize: 14.5,
              fontWeight: on ? 700 : 500,
              color: on ? 'var(--ink)' : 'var(--ink-soft)',
              padding: '8px 15px',
              borderRadius: 999,
              textDecoration: 'none',
              background: on ? 'var(--paper-deep)' : 'transparent',
            }}>{it.label}</Link>
          );
        })}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button className="vt-btn vt-btn--ghost" style={{ padding: 10, borderRadius: 999 }}>
          <Icon name="search" size={18} />
        </button>
        <button className="vt-btn vt-btn--ghost" style={{ padding: '10px 14px' }}>
          <Icon name="user" size={17} /> Đăng nhập
        </button>
      </div>
    </header>
  );
}

const TAB_ITEMS = [
  { label: 'Tra cứu',  icon: 'search',   path: '/' },
  { label: 'So sánh',  icon: 'compare',  path: '/compare' },
  { label: 'Vùng miền', icon: 'map',    path: '/region/nam' },
  { label: 'Lưu',      icon: 'bookmark', path: '/saved' },
  { label: 'Tôi',      icon: 'user',     path: '/profile' },
];

export function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const active = TAB_ITEMS.find(it =>
    it.path === '/' ? location.pathname === '/' : location.pathname.startsWith(it.path.split('/').slice(0,2).join('/'))
  )?.label || 'Tra cứu';

  return (
    <div className="vt-tabbar">
      {TAB_ITEMS.map(t => (
        <div
          key={t.label}
          className={'vt-tab' + (t.label === active ? ' vt-tab--on' : '')}
          onClick={() => navigate(t.path)}
        >
          <Icon name={t.icon} size={21} stroke={t.label === active ? 2 : 1.6} />
          {t.label}
        </div>
      ))}
    </div>
  );
}

export function StatusBar({ dark = false }) {
  return (
    <div className="vt-statusbar" style={dark ? { color: 'var(--paper)' } : null}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 12 }}>
        <span>●●●</span>
        <span style={{ fontWeight: 800 }}>5G</span>
        <span style={{
          width: 22, height: 11, borderRadius: 3,
          boxShadow: 'inset 0 0 0 1.4px currentColor',
          display: 'inline-block', position: 'relative',
        }}>
          <i style={{ position: 'absolute', inset: '2px', right: '5px', background: 'currentColor', borderRadius: 1 }} />
        </span>
      </span>
    </div>
  );
}

export function MobileTopBar({ title, back = true }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 16px 12px' }}>
      {back && (
        <span style={{ transform: 'rotate(180deg)', display: 'flex', cursor: 'pointer' }} onClick={() => navigate(-1)}>
          <Icon name="chevron" size={22} color="var(--ink)" />
        </span>
      )}
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, flex: 1 }}>{title}</span>
      <Icon name="bookmark" size={20} color="var(--ink-soft)" />
    </div>
  );
}
