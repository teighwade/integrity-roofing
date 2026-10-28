import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import { Crumbs, Cta } from '../../../components/Blocks';
import { GLOSSARY } from '../../../lib/content';
import { SITE_URL } from '../../../lib/site';

const title = 'Roofing Glossary: Roof Terms in Plain English | Integrity Roofing';
const desc = 'Plain-English definitions of roofing terms Arizona homeowners hear: underlayment, battens, flashing, scuppers, foam, elastomeric coatings, re-felt and more.';
export const metadata = { title: { absolute: title }, description: desc, alternates: { canonical: `${SITE_URL}/resources/glossary/` } };

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Glossary() {
  if (!GLOSSARY.length) notFound();
  const letters = [...new Set(GLOSSARY.map(([t]) => t[0].toUpperCase()))];
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'Roofing glossary', url: `${SITE_URL}/resources/glossary/`, hasDefinedTerm: GLOSSARY.map(([t, d]) => ({ '@type': 'DefinedTerm', name: t, description: d, url: `${SITE_URL}/resources/glossary/#${slug(t)}` })) }} />
      <section className="phero phero--noimg">
        <div className="wrap">
          <Crumbs items={[{ name: 'Resource center', href: '/resources/' }, { name: 'Glossary', href: '/resources/glossary/' }]} />
          <h1>Roofing glossary</h1>
          <p className="phero__lead">{GLOSSARY.length} roofing terms you&apos;ll hear from roofers, inspectors and HOAs, explained in plain English.</p>
          <nav className="letters" aria-label="Jump to letter">{letters.map((l) => <a key={l} href={`#letter-${l}`}>{l}</a>)}</nav>
        </div>
      </section>
      <section className="section">
        <div className="wrap narrow">
          {letters.map((l) => (
            <div key={l} id={`letter-${l}`} className="gloss-letter">
              <h2>{l}</h2>
              <dl className="gloss">
                {GLOSSARY.filter(([t]) => t[0].toUpperCase() === l).map(([t, d]) => <div key={t} id={slug(t)}><dt>{t}</dt><dd>{d}</dd></div>)}
              </dl>
            </div>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}
