import { notFound } from 'next/navigation';
import JsonLd from '../../../../components/JsonLd';
import PageView from '../../../../components/PageView';
import { GuideCards } from '../../../../components/ResourceBlocks';
import { GUIDES, guideBySlug } from '../../../../lib/content';
import { SITE_URL, CONTENT_DATE } from '../../../../lib/site';
import { BUSINESS_ID } from '../../../../lib/schema';

export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map((g) => ({ guide: g.slug })); }

export async function generateMetadata({ params }) {
  const g = guideBySlug((await params).guide);
  if (!g) return {};
  return { title: { absolute: g.title }, description: g.desc, alternates: { canonical: `${SITE_URL}/resources/library/${g.slug}/` }, openGraph: { type: 'article' } };
}

export default async function Guide({ params }) {
  const g = guideBySlug((await params).guide);
  if (!g) notFound();
  const path = `/resources/library/${g.slug}/`;
  const more = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);
  const after = (
    <section className="section section--sky">
      <div className="wrap">
        <div className="head head--row"><div><h2>More guides</h2></div><a className="btn btn--line" href="/resources/library/">Homeowner library</a></div>
        <GuideCards guides={more} />
      </div>
    </section>
  );
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: g.h1, description: g.desc, dateModified: CONTENT_DATE, author: { '@id': BUSINESS_ID }, publisher: { '@id': BUSINESS_ID }, mainEntityOfPage: `${SITE_URL}${path}` }} />
      <PageView p={{ ...g, kicker: `${g.topic}, ${g.read_minutes} min read` }} path={path}
        crumbs={[{ name: 'Resource center', href: '/resources/' }, { name: 'Library', href: '/resources/library/' }, { name: g.crumb || g.h1, href: path }]} beforeFaq={after} />
    </>
  );
}
