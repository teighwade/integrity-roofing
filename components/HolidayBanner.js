'use client';
import { useEffect, useState } from 'react';
import { currentTheme, themesFor } from '../lib/holidays';

// Hand-drawn marks for each theme (decorative only).
const ART = {
  stars: <path d="M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 14.6 7 17.2l1-5.5-4-3.9 5.6-.8z" />,
  dove: <path d="M3 14c4 0 6-2 8-6 1 3 4 4 7 3l3-3-1 5c-1 4-5 6-10 6l-4 3 1-4c-2 0-3-2-4-4z" />,
  hearts: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  clover: <g><circle cx="9" cy="8" r="3.4" /><circle cx="15" cy="8" r="3.4" /><circle cx="9" cy="14" r="3.4" /><circle cx="15" cy="14" r="3.4" /><path d="M12 14l2 8" stroke="currentColor" strokeWidth="1.6" fill="none" /></g>,
  flower: <g><circle cx="12" cy="6" r="3" /><circle cx="6" cy="11" r="3" /><circle cx="18" cy="11" r="3" /><circle cx="8" cy="17" r="3" /><circle cx="16" cy="17" r="3" /></g>,
  flag: <g><path d="M4 3v19" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M5 4h14l-3 4 3 4H5z" /></g>,
  storm: <g><path d="M7 15a5 5 0 1 1 1.5-9.8A6 6 0 0 1 20 9a4 4 0 0 1-1 6z" /><path d="M12 15l-2 4h3l-2 4" stroke="currentColor" strokeWidth="1.8" fill="none" /></g>,
  rain: <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 4l-2 6M12 2l-2 6M18 4l-2 6M8 13l-2 6M14 12l-2 6M20 13l-2 6" /></g>,
  sun: <g><circle cx="12" cy="12" r="5" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.8" /></g>,
  fireworks: <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"><path d="M12 12V3M12 12l7-5M12 12l9 1M12 12l6 7M12 12l-1 9M12 12l-7 6M12 12H3M12 12L5 6" /></g>,
  leaf: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l7-7" />,
  lights: <g><path d="M2 5c5 4 15 4 20 0" stroke="currentColor" strokeWidth="1.4" fill="none" /><ellipse cx="6" cy="10" rx="1.8" ry="3" /><ellipse cx="12" cy="11" rx="1.8" ry="3" /><ellipse cx="18" cy="10" rx="1.8" ry="3" /></g>,
  snow: <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2" /></g>,
  confetti: <g><rect x="3" y="4" width="3" height="5" rx="1" transform="rotate(-20 4 6)" /><rect x="11" y="2" width="3" height="5" rx="1" transform="rotate(25 12 4)" /><rect x="18" y="6" width="3" height="5" rx="1" /><circle cx="7" cy="16" r="1.8" /><circle cx="16" cy="15" r="1.8" /><rect x="11" y="18" width="3" height="5" rx="1" transform="rotate(-35 12 20)" /></g>,
  ghost: <g><path d="M12 2a7 7 0 0 0-7 7v12l2.3-1.8L9.7 21 12 19.2 14.3 21l2.4-1.8L19 21V9a7 7 0 0 0-7-7z" fill="#fff" /><circle cx="9.5" cy="9.5" r="1.4" fill="currentColor" /><circle cx="14.5" cy="9.5" r="1.4" fill="currentColor" /><ellipse cx="12" cy="13.6" rx="1.4" ry="1.8" fill="currentColor" /></g>,
  bats: <path d="M12 9c-.8-1.6-1.6-2.2-2.4-2.2.4 1-.1 1.6-1 1.6C7.4 8.4 5.6 6.6 2 7c1.6 1.2 2.4 2.8 2.2 4.4 1.2-.9 2.6-.8 3.4.4.7-1 1.7-1.1 2.4-.2.6.9 1.4 1.3 2 1.3s1.4-.4 2-1.3c.7-.9 1.7-.8 2.4.2.8-1.2 2.2-1.3 3.4-.4-.2-1.6.6-3.2 2.2-4.4-3.6-.4-5.4 1.4-6.6 1.4-.9 0-1.4-.6-1-1.6-.8 0-1.6.6-2.4 2.2z" />,
};

export default function HolidayBanner() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    // Preview any holiday with ?holiday=<id>, e.g. /?holiday=july4
    let preview = null;
    try { preview = new URLSearchParams(window.location.search).get('holiday'); } catch {}
    const t = preview ? themesFor(new Date().getFullYear()).find((h) => h.id === preview) : currentTheme();
    if (!t) return;
    let hidden = false;
    try { hidden = !preview && sessionStorage.getItem(`hb-${t.id}`) === '1'; } catch {}
    document.documentElement.dataset.holiday = t.id;
    if (!hidden) setTheme(t);
  }, []);
  if (!theme) return null;
  const [bg, fg] = theme.colors;
  const ink = theme.ink || '#ffffff';
  const close = () => {
    try { sessionStorage.setItem(`hb-${theme.id}`, '1'); } catch {}
    setTheme(null);
  };
  const extra = ART[theme.extra || theme.art];
  return (
    <div className={`holiday holiday--${theme.id}`} style={{ '--hb-bg': bg, '--hb-fg': fg, '--hb-ink': ink }} role="region" aria-label={theme.title}>
      <div className="holiday__deco" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <svg key={i} className={`holiday__float holiday__float--${i}`} viewBox="0 0 24 24" fill="currentColor">{extra}</svg>)}
      </div>
      <div className="wrap holiday__in">
        <svg className="holiday__art" viewBox="0 0 24 24" width="46" height="46" fill="currentColor" aria-hidden="true">{ART[theme.art]}</svg>
        <p><strong>{theme.title}</strong><span>{theme.text}</span></p>
        {theme.href && <a className="holiday__cta" href={theme.href}>{theme.cta}</a>}
        <button type="button" className="holiday__x" onClick={close} aria-label="Hide this message">×</button>
      </div>
    </div>
  );
}
