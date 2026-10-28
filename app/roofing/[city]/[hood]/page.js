import { notFound } from 'next/navigation';
import Icon from '../../../../components/Icon';
import PageView from '../../../../components/PageView';
import { Sources } from '../page';
import { HOODS, cityBySlug, hoodBySlug, hoodsIn, hoodPath } from '../../../../lib/content';
import { SITE_URL } from '../../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return HOODS.map((h) => ({ city: h.city, hood: h.slug })); }

export async function generateMetadata({ params }) {
  const { city, hood } = await params;
  const h = hoodBySlug(city, hood);
  if (!h) return {};
  return { title: { absolute: h.title }, description: h.desc, alternates: { canonical: `${SITE_URL}${hoodPath(h)}` } };
}

const FACT_LABELS = [['location', 'Location'], ['built', 'Homes built'], ['builders', 'Builders'], ['type', 'Community'], ['zip', 'ZIP code'], ['roofs', 'Common roofs']];

export default async function HoodPage({ params }) {
  const { city, hood } = await params;
  const h = hoodBySlug(city, hood);
  const c = cityBySlug(city);
  if (!h || !c) notFound();
  const facts = FACT_LABELS.filter(([k]) => h.facts?.[k]);
  const nearby = hoodsIn(city).filter((x) => x.slug !== h.slug);
  const top = facts.length > 0 && (
    <section className="section section--tight">
      <div className="wrap">
        <div className="glance">
          <h2>{h.name} at a glance</h2>
          <dl>{facts.map(([k, label]) => <div key={k}><dt>{label}</dt><dd>{h.facts[k]}</dd></div>)}</dl>
          {h.facts.note && <p className="glance__note">{h.facts.note}</p>}
        </div>
      </div>
    </section>
  );
  const more = (
    <>
      <section className="section section--sky" aria-labelledby="nearby-title">
        <div className="wrap">
          <div className="head head--row">
            <div><h2 id="nearby-title">More {c.city} neighborhoods</h2></div>
            <a className="btn btn--line" href={`/roofing/${c.slug}/`}>Roofing in {c.city} <Icon name="arrow" size={16} /></a>
          </div>
          <ul className="hood-grid hood-grid--small">{nearby.map((x) => <li key={x.slug}><a href={hoodPath(x)}><strong>{x.name}</strong></a></li>)}</ul>
        </div>
      </section>
      <Sources list={h.sources} />
    </>
  );
  return (
    <PageView p={{ ...h, hero_img: h.hero_img || c.hero_img || 'location' }} path={hoodPath(h)}
      crumbs={[{ name: 'Service areas', href: '/roofing/' }, { name: `${c.city}, AZ`, href: `/roofing/${c.slug}/` }, { name: h.name, href: hoodPath(h) }]}
      top={top} beforeFaq={more} />
  );
}
