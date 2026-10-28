import Icon from './Icon';
import { GUIDES, LINKS, CURRENT_ISSUE, monthName } from '../lib/content';

export function PriceTable({ t }) {
  if (!t) return null;
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label={t.title}>
      <table className="table">
        <caption className="visually-hidden">{t.title}</caption>
        <thead><tr>{t.head.map((h) => <th scope="col" key={h}>{h}</th>)}</tr></thead>
        <tbody>{t.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th scope="row" key={i}>{c}</th> : <td key={i}>{c}</td>))}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function Disclaimer({ text }) {
  if (!text) return null;
  return <p className="disclaimer"><Icon name="alert" size={20} /><span>{text}</span></p>;
}

export function GuideCards({ guides = GUIDES }) {
  return (
    <div className="guide-grid">
      {guides.map((g) => (
        <a className="guide-card" key={g.slug} href={`/resources/library/${g.slug}/`}>
          <span className="guide-card__topic">{g.topic}</span>
          <h3>{g.h1}</h3>
          <p>{g.lead}</p>
          <span className="guide-card__meta">{g.read_minutes} min read</span>
        </a>
      ))}
    </div>
  );
}

export function OutsideLinks() {
  if (!LINKS.length) return null;
  return (
    <div className="ext-links">
      {LINKS.map((g) => (
        <div key={g.group}>
          <h3>{g.group}</h3>
          <ul>{g.items.map((it) => <li key={it.url}><a href={it.url} target="_blank" rel="noopener">{it.name}</a><span>{it.desc}</span></li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export function IssueFeature({ issue = CURRENT_ISSUE, dark = false }) {
  if (!issue) return null;
  return (
    <a className={`issue${dark ? ' issue--dark' : ''}`} href={`/newsletter/${issue.slug}/`}>
      <span className="issue__badge">{monthName(issue.month)} issue</span>
      <h3>{issue.headline || issue.h1}</h3>
      <p>{issue.lead}</p>
      <span className="issue__more">Read this month&apos;s newsletter <Icon name="arrow" size={16} /></span>
    </a>
  );
}
