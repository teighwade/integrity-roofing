'use client';
import { useState } from 'react';

// "What's on your roof?" — one tab per roof type, each with real facts from the roof-type pages.
export default function RoofPicker({ roofs }) {
  const [i, setI] = useState(0);
  const r = roofs[i];
  const onKey = (e) => {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!next) return;
    e.preventDefault();
    const n = (i + next + roofs.length) % roofs.length;
    setI(n);
    document.getElementById(`roof-tab-${n}`)?.focus();
  };
  return (
    <div className="picker">
      <div className="picker__tabs" role="tablist" aria-label="Roof types" aria-orientation="vertical" onKeyDown={onKey}>
        {roofs.map((x, n) => (
          <button key={x.slug} id={`roof-tab-${n}`} className="picker__tab" role="tab" type="button" aria-selected={n === i}
            aria-controls="roof-panel" tabIndex={n === i ? 0 : -1} onClick={() => setI(n)}>
            {x.name}
          </button>
        ))}
      </div>
      <div className="picker__panel" id="roof-panel" role="tabpanel" aria-labelledby={`roof-tab-${i}`}>
        <div className="picker__img">{r.img && <img src={r.img.url} alt={r.img.alt} />}</div>
        <div className="picker__body">
          <h3>{r.name}</h3>
          <p>{r.summary}</p>
          <dl className="picker__facts">
            {r.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <a className="btn btn--sun" href={`/${r.slug}/`}>About {r.name.toLowerCase()}</a>
        </div>
      </div>
    </div>
  );
}
