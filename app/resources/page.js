import { notFound } from 'next/navigation';
import Icon from '../../components/Icon';
import PageView from '../../components/PageView';
import { GuideCards, IssueFeature } from '../../components/ResourceBlocks';
import { CENTER, GUIDES, FAQ_COUNT, GLOSSARY, CURRENT_ISSUE } from '../../lib/content';
import { SITE_URL } from '../../lib/site';

export function generateMetadata() {
  if (!CENTER) return {};
  return { title: { absolute: CENTER.title }, description: CENTER.desc, alternates: { canonical: `${SITE_URL}/resources/` } };
}

export default function ResourceCenter() {
  if (!CENTER) notFound();
  const tiles = [
    ['dollar', 'Roofing cost guide', 'Typical Phoenix-area price ranges for repairs, re-roofs, foam and coatings.', '/resources/roofing-cost-guide/'],
    ['file', 'Homeowner library', `${GUIDES.length} in-depth guides on hiring, tile underlayment, monsoon prep and more.`, '/resources/library/'],
    ['clipboard', 'Roofing FAQ', `${FAQ_COUNT} answers to the questions Arizona homeowners ask most.`, '/faq/'],
    ['calendar', 'Monthly newsletter', 'Seasonal roof tips and safe DIY checks, every month.', '/newsletter/'],
    ['layers', 'Roofing glossary', `${GLOSSARY.length} roofing terms in plain English.`, '/resources/glossary/'],
    ['roof', 'Compare roof types', 'Tile, shingle, foam, flat and coatings side by side.', '/roof-types/'],
  ];
  const top = (
    <>
      <section className="section" aria-labelledby="hub-title" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="head"><h2 id="hub-title">Start here</h2></div>
          <div className="hub-tiles">
            {tiles.map(([icon, t, d, href]) => (
              <a className="hub-tile" key={href} href={href}><Icon name={icon} size={26} /><h3>{t}</h3><p>{d}</p><span>Open <Icon name="arrow" size={16} /></span></a>
            ))}
          </div>
        </div>
      </section>
      {CURRENT_ISSUE && (
        <section className="section section--green section--tight">
          <div className="wrap"><IssueFeature dark /></div>
        </section>
      )}
      {GUIDES.length > 0 && (
        <section className="section section--sky">
          <div className="wrap">
            <div className="head head--row"><div><h2>Popular guides</h2></div><a className="btn btn--line" href="/resources/library/">All guides</a></div>
            <GuideCards guides={GUIDES.slice(0, 6)} />
          </div>
        </section>
      )}
    </>
  );
  return <PageView p={CENTER} path="/resources/" crumbs={[{ name: 'Resource center', href: '/resources/' }]} top={top} />;
}
