import React, { useState } from 'react';
import Icon from './Icon';
import '../styles/thoam.css';

export default function SearchBar({ value = '', placeholder = 'Tra một từ địa phương…', size = 'lg', mic = true, onSearch, buttonLabel }) {
  const [term, setTerm] = useState(value);

  const dims = size === 'lg'
    ? { h: 64, fs: 22, pad: '0 8px 0 22px', icon: 22, btn: 48 }
    : { h: 52, fs: 17, pad: '0 6px 0 18px', icon: 19, btn: 40 };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && term.trim()) onSearch(term.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
      <div
        className="vt-search"
        style={{ height: dims.h, padding: dims.pad }}
      >
        <Icon name="search" size={dims.icon} color="var(--ink-faint)" />
        <input
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder={placeholder}
          style={{ fontSize: dims.fs }}
        />
        {mic && (
          <Icon name="mic" size={dims.icon - 2} color="var(--ink-faint)" style={{ flexShrink: 0 }} />
        )}
        <button
          type="submit"
          className="vt-btn vt-btn--primary"
          style={buttonLabel
            ? { height: dims.btn - 8, padding: '0 16px', fontSize: 13.5 }
            : { width: dims.btn, height: dims.btn, padding: 0, justifyContent: 'center' }
          }
        >
          {buttonLabel
            ? buttonLabel
            : <Icon name="arrow" size={dims.icon - 2} color="var(--paper)" />
          }
        </button>
      </div>
    </form>
  );
}
