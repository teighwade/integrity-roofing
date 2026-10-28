import { notFound } from 'next/navigation';
import PageView from '../../../components/PageView';
import { GuideCards, OutsideLinks } from '../../../components/ResourceBlocks';
import { LIBRARY, GUIDES } from '../../../lib/content';
import { SITE_URL } from '../../../lib/site';

export function generateMetadata() {
  if (!LIBRARY) return {};
  return { title: { absolute: LIBRARY.title }, description: LIBRARY.desc, alternates: { canonical: `${SITE_URL}/resources/library/` } };
}

export default function Library() {
  if (!LIBRARY) notFound();
  const top = (
    <>
      <section className="section" style={{ paddingTop: 48 }} aria-labelledby="guides-title">
        <div className="wrap">
          <div className="head"><h2 id="guides-title">Guides</h2></div>
          <GuideCards guides={GUIDES} />
        </div>
      </section>
      <section className="section section--sky" aria-labelledby="ext-title">
        <div className="wrap">
          <div className="head"><h2 id="ext-title">Outside resources</h2><p>Official and industry sources we point homeowners to. These open on other websites.</p></div>
          <OutsideLinks />
          <p style={{ marginTop: 32 }}><a className="btn btn--line" href="/resources/glossary/">Open the roofing glossary</a></p>
        </div>
      </section>
    </>
  );
  return <PageView p={LIBRARY} path="/resources/library/" crumbs={[{ name: 'Resource center', href: '/resources/' }, { name: 'Homeowner library', href: '/resources/library/' }]} top={top} />;
}
