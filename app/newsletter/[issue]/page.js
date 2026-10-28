import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import PageView from '../../../components/PageView';
import { ISSUES, issueBySlug, monthName } from '../../../lib/content';
import { SITE_URL } from '../../../lib/site';
import { BUSINESS_ID } from '../../../lib/schema';

export const dynamicParams = false;
export function generateStaticParams() { return ISSUES.map((n) => ({ issue: n.slug })); }

export async function generateMetadata({ params }) {
  const n = issueBySlug((await params).issue);
  if (!n) return {};
  return { title: { absolute: n.title }, description: n.desc, alternates: { canonical: `${SITE_URL}/newsletter/${n.slug}/` }, openGraph: { type: 'article' } };
}

export default async function Issue({ params }) {
  const n = issueBySlug((await params).issue);
  if (!n) notFound();
  const path = `/newsletter/${n.slug}/`;
  const published = `${n.month}-01`;
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'NewsArticle', headline: n.h1, datePublished: published, dateModified: published, description: n.desc, author: { '@id': BUSINESS_ID }, publisher: { '@id': BUSINESS_ID }, mainEntityOfPage: `${SITE_URL}${path}` }} />
      <PageView p={{ ...n, kicker: `The Integrity Roofing Monthly, ${monthName(n.month)}` }} path={path} modified={published}
        crumbs={[{ name: 'Newsletter', href: '/newsletter/' }, { name: monthName(n.month), href: path }]} />
    </>
  );
}
