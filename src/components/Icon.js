import React from 'react';

const PATHS = {
  search:   <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
  audio:    <><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 010 7"/></>,
  bookmark: <path d="M6 4h12v16l-6-4-6 4V4z"/>,
  arrow:    <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
  compare:  <><path d="M12 4v16"/><path d="M5 8l-3 4 3 4"/><path d="M19 8l3 4-3 4"/></>,
  map:      <><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></>,
  plus:     <><path d="M12 5v14M5 12h14"/></>,
  home:     <><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/></>,
  user:     <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></>,
  history:  <><path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7L4 9"/><path d="M4 4v5h5"/><path d="M12 8v4l3 2"/></>,
  book:     <><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z"/><path d="M19 19H6"/></>,
  chevron:  <path d="M9 6l6 6-6 6"/>,
  check:    <path d="M5 12l4 4 10-10"/>,
  quote:    <><path d="M7 7h4v6H5V9a4 4 0 014-4"/><path d="M15 7h4v6h-6V9a4 4 0 014-4"/></>,
  mic:      <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>,
  filter:   <path d="M3 5h18l-7 8v6l-4 2v-8L3 5z"/>,
  star:     <path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.6 1-6L3.3 9.4l6-.9L12 3z"/>,
  x:        <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>,
};

export default function Icon({ name, size = 20, stroke = 1.7, color = 'currentColor', style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      {PATHS[name] || null}
    </svg>
  );
}
