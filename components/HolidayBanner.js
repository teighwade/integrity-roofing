'use client';
import { useEffect, useState } from 'react';
import { currentTheme } from '../lib/holidays';

// Small hand-drawn marks for each theme (decorative).
const ART = {
  stars: <g><path d="M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 14.6 7 17.2l1-5.5-4-3.9 5.6-.8z" /></g>,
  dove: <path d="M3 14c4 0 6-2 8-6 1 3 4 4 7 3l3-3-1 5c-1 4-5 6-10 6l-4 3 1-4c-2 0-3-2-4-4z" />,
  hearts: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  clover: <g><circle cx="9" cy="8" r="3.4" /><circle cx="15" cy="8" r="3.4" /><circle cx="9" cy="14" r="3.4" /><circle cx="15" cy="14" r="3.4" /><path d="M12 14l2 8" stroke="currentColor" strokeWidth="1.6" fill="none" /></g>,
  flower: <g><circle cx="12" cy="6" r="3" /><circle cx="6" cy="11" r="3" /><circle cx="18" cy="11" r="3" /><circle cx="8" cy="17" r="3" /><circle cx="16" cy="17" r="3" /><circle cx="12" cy="12" r="2.4" fill="#fff" /></g>,
  flag: <g><path d="M4 3v19" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M5 4h14l-3 4 3 4H5z" /></g>,
  storm: <g><path d="M7 15a5 5 0 1 1 1.5-9.8A6 6 0 0 1 20 9a4 4 0 0 1-1 6z" /><path d="M12 15l-2 4h3l-2 4" stroke="currentColor" strokeWidth="1.8" fill="none" /></g>,
  sun: <g><circle cx="12" cy="12" r="5" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.8" /></g>,
  fireworks: <g stroke="currentColor" strokeWidth="1.8" fill="none"><path d="M12 12l0-9M12 12l7-5M12 12l9 1M12 12l6 7M12 12l-1 9M12 12l-7 6M12 12l-9 0M12 12l-7-6" /></g>,
  leaf: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l7-7" />,
  pumpkin: <g><ellipse cx="12" cy="14" rx="9" ry="7" /><path d="M12 7c0-2 1-3 3-4" stroke="currentColor" strokeWidth="1.8" fill="none" /></g>,
  lights: <g><path d="M2 5c5 4 15 4 20 0" stroke="currentColor" strokeWidth="1.4" fill="none" /><ellipse cx="6" cy="10" rx="1.8" ry="3" /><ellipse cx="12" cy="11" rx="1.8" ry="3" /><ellipse cx="18" cy="10" rx="1.8" ry="3" /></g>,
  snow: <g stroke="currentColor" strokeWidth="1.8" fill="none"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2" /></g>,
};

export default function HolidayBanner() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    const t = currentTheme();
    if (!t) return;
    let hidden = false;
    try { hidden = sessionStorage.getItem(`hb-${t.id}`) === '1'; } catch {}
    document.documentElement.dataset.holiday = t.id;
    document.documentElement.style.setProperty('--holiday', t.colors[1]);
    if (!hidden) setTheme(t);
  }, []);
  if (!theme) return null;
  const [bg, fg] = theme.colors;
  const close = () => {
    try { sessionStorage.setItem(`hb-${theme.id}`, '1'); } catch {}
    setTheme(null);
  };
  return (
    <div className={`holiday holiday--${theme.id}`} style={{ '--hb-bg': bg, '--hb-fg': fg }} role="region" aria-label={theme.title}>
      <div className="wrap holiday__in">
        <svg className="holiday__art" viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">{ART[theme.art]}</svg>
        <p><strong>{theme.title}.</strong> {theme.text}</p>
        {theme.href && <a className="holiday__cta" href={theme.href}>{theme.cta}</a>}
        <button type="button" className="holiday__x" onClick={close} aria-label="Hide this message">×</button>
      </div>
      <div className="holiday__edge" aria-hidden="true" />
    </div>
  );
}
