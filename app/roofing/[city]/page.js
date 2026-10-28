import { notFound } from 'next/navigation';
import PageView from '../../../components/PageView';
import { CITIES, cityBySlug, hoodsIn, hoodPath } from '../../../lib/content';
import { SITE_URL } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return CITIES.map((c) => ({ city: c.slug })); }

export async function generateMetadata({ params }) {
  const c = cityBySlug((await params).city);
  if (!c) return {};
  return { title: { absolute: c.title }, description: c.desc, alternates: { canonical: `${SITE_URL}/roofing/${c.slug}/` } };
}

export default async function CityPage({ params }) {
  const c = cityBySlug((await params).city);
  if (!c) notFound();
  const hoods = hoodsIn(c.slug);
  const directory = hoods.length > 0 && (
    <section className="section section--sky" id="neighborhoods" aria-labelledby="hoods-title">
      <div className="wrap">
        <div className="head"><h2 id="hoods-title">{c.city} neighborhoods we serve</h2><p>Local roofing information for {hoods.length} {c.city} neighborhoods and communities.</p></div>
        <ul className="hood-grid">
          {hoods.map((h) => (
            <li key={h.slug}><a href={hoodPath(h)}><strong>{h.name}</strong>{h.facts?.built && <span>Homes built {h.facts.built}</span>}</a></li>
          ))}
        </ul>
      </div>
    </section>
  );
  return (
    <PageView p={{ ...c, hero_img: c.hero_img || 'location' }} path={`/roofing/${c.slug}/`}
      crumbs={[{ name: 'Service areas', href: '/roofing/' }, { name: `${c.city}, AZ`, href: `/roofing/${c.slug}/` }]}
      top={directory} beforeFaq={<Sources list={c.sources} />} />
  );
}

export function Sources({ list }) {
  if (!list?.length) return null;
  return (
    <section className="section section--tight">
      <div className="wrap narrow">
        <details className="sources">
          <summary>Sources for local details on this page</summary>
          <ul>{list.map((u) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 90)}</a></li>)}</ul>
        </details>
      </div>
    </section>
  );
}
