import React, { useState } from 'react';
import { DesktopNav, StatusBar, MobileTopBar, TabBar } from '../components/Nav';
import Icon from '../components/Icon';
import { RECENT_CONTRIBUTIONS } from '../data/sampleData';
import '../styles/thoam.css';

const WORD_TYPES = ['Danh từ', 'Động từ', 'Tính từ', 'Trạng từ', 'Thán từ', 'Thành ngữ'];
const REGION_OPTIONS = [
  { k: 'bac',   label: 'Bắc' },
  { k: 'trung', label: 'Trung' },
  { k: 'nam',   label: 'Nam' },
];

export default function ContributePage() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return <ContributeMobile />;
  return <ContributeDesktop />;
}

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="vt-field-label">{label}</label>
      {children}
      {hint && <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 5 }}>{hint}</div>}
    </div>
  );
}

function useForm() {
  const [form, setForm] = useState({
    word: '',
    standard: '',
    regions: [],
    type: 'Danh từ',
    meaning: '',
    example: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleRegion = (k) => {
    setForm(f => ({
      ...f,
      regions: f.regions.includes(k) ? f.regions.filter(r => r !== k) : [...f.regions, k],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.word.trim()) e.word = 'Bắt buộc';
    if (!form.regions.length) e.regions = 'Chọn ít nhất một miền';
    if (!form.meaning.trim()) e.meaning = 'Bắt buộc';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return { form, update, toggleRegion, errors, submitted, submit };
}

function ContributeDesktop() {
  const { form, update, toggleRegion, errors, submitted, submit } = useForm();

  if (submitted) {
    return (
      <div className="vt-root vt-page">
        <DesktopNav />
        <div className="vt-page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--son-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name="check" size={32} color="var(--son)" stroke={2.5} />
            </div>
            <h2 className="vt-serif" style={{ fontSize: 32, fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px' }}>Đã gửi thành công!</h2>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Cảm ơn bạn đã đóng góp từ <b>"{form.word}"</b>. Đóng góp sẽ được cộng đồng kiểm duyệt trước khi hiển thị.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vt-root vt-page">
      <DesktopNav />
      <div className="vt-page-content" style={{ padding: '40px 44px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 36, maxWidth: 1180, margin: '0 auto', width: '100%' }}>
          <div>
            <div className="vt-eyebrow">Cùng giữ tiếng quê</div>
            <h1 className="vt-serif" style={{ fontSize: 40, fontWeight: 600, margin: '10px 0 8px', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
              Thêm một từ địa phương
            </h1>
            <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', margin: '0 0 28px', maxWidth: 560, lineHeight: 1.6 }}>
              Bạn biết một từ mà từ điển còn thiếu? Góp vào kho ngữ liệu để mọi miền hiểu nhau hơn.
            </p>

            <form onSubmit={submit}>
              <div className="vt-card" style={{ padding: 28 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <Field label="Từ / cách gọi địa phương">
                    <input
                      className="vt-input"
                      placeholder="vd: hẻm"
                      value={form.word}
                      onChange={e => update('word', e.target.value)}
                      style={errors.word ? { boxShadow: 'inset 0 0 0 1.5px #e53' } : {}}
                    />
                    {errors.word && <div style={{ fontSize: 12, color: '#e53', marginTop: 4 }}>{errors.word}</div>}
                  </Field>
                  <Field label="Từ toàn dân tương đương">
                    <input className="vt-input" placeholder="vd: ngõ" value={form.standard} onChange={e => update('standard', e.target.value)} />
                  </Field>
                  <Field label="Miền sử dụng">
                    <div style={{ display: 'flex', gap: 8, paddingTop: 2 }}>
                      {REGION_OPTIONS.map(r => (
                        <span
                          key={r.k}
                          className={'vt-chip' + (form.regions.includes(r.k) ? ' vt-chip--on' : '')}
                          style={form.regions.includes(r.k) ? { background: `var(--${r.k})` } : {}}
                          onClick={() => toggleRegion(r.k)}
                        >
                          <i className={'dot dot-' + r.k} style={{ width: 8, height: 8, borderRadius: 999, ...(form.regions.includes(r.k) ? { background: 'var(--paper)' } : {}) }} />
                          {r.label}
                        </span>
                      ))}
                    </div>
                    {errors.regions && <div style={{ fontSize: 12, color: '#e53', marginTop: 4 }}>{errors.regions}</div>}
                  </Field>
                  <Field label="Loại từ">
                    <select
                      className="vt-input"
                      value={form.type}
                      onChange={e => update('type', e.target.value)}
                      style={{ cursor: 'pointer', appearance: 'none' }}
                    >
                      {WORD_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Field label="Nghĩa / giải thích">
                    <textarea
                      className="vt-input"
                      style={{ minHeight: 72 }}
                      placeholder="Mô tả nghĩa của từ…"
                      value={form.meaning}
                      onChange={e => update('meaning', e.target.value)}
                    />
                    {errors.meaning && <div style={{ fontSize: 12, color: '#e53', marginTop: 4 }}>{errors.meaning}</div>}
                  </Field>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Field label="Ví dụ câu" hint="Nên viết đúng giọng địa phương để minh hoạ cách dùng.">
                    <textarea
                      className="vt-input"
                      style={{ minHeight: 60, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                      placeholder="vd: Nhà tui trong hẻm…"
                      value={form.example}
                      onChange={e => update('example', e.target.value)}
                    />
                  </Field>
                </div>
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <button type="button" className="vt-btn vt-btn--ghost" style={{ padding: '11px 18px' }}>
                    <Icon name="mic" size={17} /> Ghi âm phát âm
                  </button>
                  <div className="vt-dropzone" style={{ flex: 1, height: 44 }}>
                    kéo file audio .mp3 vào đây
                  </div>
                </div>
                <hr className="vt-rule" style={{ margin: '24px 0 20px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>
                    Đóng góp sẽ được cộng đồng kiểm duyệt trước khi hiển thị.
                  </span>
                  <button type="submit" className="vt-btn vt-btn--primary" style={{ padding: '12px 26px' }}>
                    Gửi đóng góp
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="vt-card" style={{ padding: 22 }}>
              <div className="vt-kicker" style={{ marginBottom: 14 }}>Cách hoạt động</div>
              {[['Gửi từ', 'Điền từ, miền và nghĩa.'], ['Cộng đồng duyệt', 'Người bản xứ xác nhận cách dùng.'], ['Lên bản đồ', 'Từ xuất hiện kèm độ phổ biến.']].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 2 ? 16 : 0 }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: 999,
                    background: 'var(--son-tint)', color: 'var(--son-deep)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 13, flexShrink: 0,
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>{s[0]}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.45 }}>{s[1]}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="vt-card" style={{ padding: 22 }}>
              <div className="vt-kicker" style={{ marginBottom: 12 }}>Đóng góp gần đây</div>
              {RECENT_CONTRIBUTIONS.map((r, i) => (
                <div key={r.word} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < RECENT_CONTRIBUTIONS.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <i className={'dot dot-' + r.k} style={{ width: 8, height: 8, borderRadius: 999 }} />
                  <span className="vt-serif" style={{ fontSize: 16, fontWeight: 600, flex: 1, color: 'var(--ink)' }}>{r.word}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 600 }}>+{r.region}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContributeMobile() {
  const { form, update, toggleRegion, errors, submitted, submit } = useForm();

  if (submitted) {
    return (
      <div className="vt-root vt-page">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, minHeight: '80vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--son-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Icon name="check" size={28} color="var(--son)" stroke={2.5} />
            </div>
            <h2 className="vt-serif" style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px' }}>Đã gửi!</h2>
            <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Cảm ơn bạn đã đóng góp từ <b>"{form.word}"</b>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vt-root vt-page">
      <StatusBar />
      <MobileTopBar title="Đóng góp từ mới" />
      <form onSubmit={submit} style={{ flex: 1, overflow: 'auto', padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '0 2px', lineHeight: 1.5 }}>
          Biết một từ quê chưa có? Thêm vào để mọi miền hiểu nhau hơn.
        </p>
        <Field label="Từ địa phương">
          <input className="vt-input" placeholder="vd: hẻm" value={form.word} onChange={e => update('word', e.target.value)} />
          {errors.word && <div style={{ fontSize: 12, color: '#e53', marginTop: 4 }}>{errors.word}</div>}
        </Field>
        <Field label="Miền sử dụng">
          <div style={{ display: 'flex', gap: 8 }}>
            {REGION_OPTIONS.map(r => (
              <span
                key={r.k}
                className={'vt-chip' + (form.regions.includes(r.k) ? ' vt-chip--on' : '')}
                style={form.regions.includes(r.k) ? { background: `var(--${r.k})` } : {}}
                onClick={() => toggleRegion(r.k)}
              >{r.label}</span>
            ))}
          </div>
          {errors.regions && <div style={{ fontSize: 12, color: '#e53', marginTop: 4 }}>{errors.regions}</div>}
        </Field>
        <Field label="Nghĩa / giải thích">
          <textarea className="vt-input" style={{ minHeight: 70 }} placeholder="Mô tả nghĩa…" value={form.meaning} onChange={e => update('meaning', e.target.value)} />
          {errors.meaning && <div style={{ fontSize: 12, color: '#e53', marginTop: 4 }}>{errors.meaning}</div>}
        </Field>
        <button type="button" className="vt-btn vt-btn--ghost" style={{ justifyContent: 'center' }}>
          <Icon name="mic" size={17} /> Ghi âm phát âm
        </button>
      </form>
      <div style={{ padding: 16, borderTop: '1px solid var(--line)', background: 'var(--paper-2)' }}>
        <button className="vt-btn vt-btn--primary" style={{ width: '100%', justifyContent: 'center', padding: 14 }} onClick={submit}>
          Gửi đóng góp
        </button>
      </div>
    </div>
  );
}
