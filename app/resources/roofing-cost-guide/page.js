import { notFound } from 'next/navigation';
import PageView from '../../../components/PageView';
import { PriceTable, Disclaimer } from '../../../components/ResourceBlocks';
import { COST_GUIDE } from '../../../lib/content';
import { SITE_URL } from '../../../lib/site';

export function generateMetadata() {
  if (!COST_GUIDE) return {};
  return { title: { absolute: COST_GUIDE.title }, description: COST_GUIDE.desc, alternates: { canonical: `${SITE_URL}/resources/roofing-cost-guide/` } };
}

export default function CostGuide() {
  const g = COST_GUIDE;
  if (!g) notFound();
  const top = (
    <section className="section" style={{ paddingTop: 48 }}>
      <div className="wrap">
        <Disclaimer text={g.disclaimer} />
        <div className="head" style={{ marginTop: 40 }}><h2>{g.table.title}</h2>{g.table.note && <p>{g.table.note}</p>}</div>
        <PriceTable t={g.table} />
        {g.addons && (
          <>
            <div className="head" style={{ marginTop: 56 }}><h2>{g.addons.title}</h2>{g.addons.note && <p>{g.addons.note}</p>}</div>
            <PriceTable t={g.addons} />
          </>
        )}
      </div>
    </section>
  );
  const bottom = (
    <section className="section section--tight">
      <div className="wrap narrow">
        <Disclaimer text={g.disclaimer} />
        {g.sources?.length > 0 && (
          <details className="sources" style={{ marginTop: 24 }}>
            <summary>Where these ranges come from ({g.sources.length} published sources)</summary>
            <ul>{g.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener nofollow">{s.name}</a></li>)}</ul>
          </details>
        )}
      </div>
    </section>
  );
  const { table, addons, ...page } = g; // tables render above, not in PageView's own table slot
  return <PageView p={page} path="/resources/roofing-cost-guide/" crumbs={[{ name: 'Resource center', href: '/resources/' }, { name: 'Roofing cost guide', href: '/resources/roofing-cost-guide/' }]} top={top} beforeFaq={bottom} />;
}
