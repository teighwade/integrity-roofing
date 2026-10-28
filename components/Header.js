'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { B, NAV, TEL, img } from '../lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const path = usePathname();
  const logo = img('logo');

  // Close menus on navigation, outside click and Escape.
  useEffect(() => {
    setOpen(false);
    ref.current?.querySelectorAll('details[open]').forEach((d) => d.removeAttribute('open'));
  }, [path]);
  useEffect(() => {
    const close = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'click' && ref.current?.contains(e.target)) return;
      ref.current?.querySelectorAll('details[open]').forEach((d) => d.removeAttribute('open'));
      if (e.type === 'keydown') setOpen(false);
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', close); };
  }, []);
  const onToggle = (e) => {
    if (!e.currentTarget.open) return;
    ref.current?.querySelectorAll('details[open]').forEach((d) => d !== e.currentTarget && d.removeAttribute('open'));
  };

  return (
    <>
      <div className="topline">
        <div className="wrap">
          <span className="topline__hours">Licensed, bonded and insured, {B.roc}. Office open {B.hours_label}.</span>
          <span>Call the office <a href={TEL}>{B.phone}</a></span>
        </div>
      </div>
      <header className={`header${open ? ' is-open' : ''}`} ref={ref}>
        <div className="wrap">
          <a className="brand" href="/" aria-label="Integrity Roofing home">
            <span className="brand__mark">{logo && <img src={logo.url} alt="" width="40" height="40" />}</span>
            <span>
              <span className="brand__name">Integrity Roofing</span>
              <span className="brand__sub">Gilbert, Arizona, since {B.founded}</span>
            </span>
          </a>
          <nav className="nav" id="site-nav" aria-label="Main">
            {NAV.map((item) =>
              item.groups ? (
                <details className="nav__item" key={item.label} onToggle={onToggle}>
                  <summary>{item.label} <Icon name="chevron" size={16} /></summary>
                  <div className="mega">
                    {item.groups.map((g) => (
                      <div key={g.title}>
                        <h2>{g.title}</h2>
                        <ul>
                          {g.links.map((l) => <li key={l.url}><a href={l.url}>{l.label}</a></li>)}
                          {g.all && <li><a className="mega__all" href={g.all[1]}>{g.all[0]}</a></li>}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                <a className="nav__link" key={item.label} href={item.url}>{item.label}</a>
              )
            )}
            <div className="nav__mobile-cta">
              <a className="btn btn--sun" href="/get-a-quote/">Request an estimate</a>
              <a className="btn btn--line-light" href={TEL}><Icon name="phone" size={18} /> {B.phone}</a>
            </div>
          </nav>
          <div className="header__cta">
            <a className="header__phone" href={TEL}><Icon name="phone" size={18} /><span>{B.phone}</span></a>
            <a className="btn btn--sun" href="/get-a-quote/">Request an estimate</a>
          </div>
          <button className="menu-btn" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} size={18} /> Menu
          </button>
        </div>
      </header>
    </>
  );
}
