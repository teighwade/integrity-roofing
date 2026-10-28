import { notFound } from 'next/navigation';
import Icon from '../../components/Icon';
import PageView from '../../components/PageView';
import { AREA_HUB, CITIES, hoodsIn, cityPath, hoodPath } from '../../lib/content';
import { SITE_URL } from '../../lib/site';

export function generateMetadata() {
  if (!AREA_HUB) return {};
  return { title: { absolute: AREA_HUB.title }, description: AREA_HUB.desc, alternates: { canonical: `${SITE_URL}/roofing/` } };
}

export default function AreasHub() {
  if (!AREA_HUB) notFound();
  const directory = (
    <section className="section section--sky" aria-labelledby="dir-title">
      <div className="wrap">
        <div className="head"><h2 id="dir-title">Cities and neighborhoods</h2><p>Choose your city or neighborhood for local roofing information.</p></div>
        <div className="area-dir">
          {CITIES.map((c) => (
            <div className="area-dir__col" key={c.slug}>
              <h3><a href={cityPath(c.slug)}>Roofing in {c.city}, AZ <Icon name="arrow" size={16} /></a></h3>
              <ul>{hoodsIn(c.slug).map((h) => <li key={h.slug}><a href={hoodPath(h)}>{h.name}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  return <PageView p={AREA_HUB} path="/roofing/" crumbs={[{ name: 'Service areas', href: '/roofing/' }]} top={directory} />;
}
