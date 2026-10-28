import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import PageView from '../../components/PageView';
import { Cta, Crumbs, PostCard } from '../../components/Blocks';
import { PAGES, POSTS, SITE_URL, img, pageBySlug, postBySlug, formatDate } from '../../lib/site';
import { BUSINESS_ID } from '../../lib/schema';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...Object.keys(PAGES).filter((s) => s !== '__home').map((slug) => ({ slug })),
    ...POSTS.filter((p) => !PAGES[p.slug]).map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = pageBySlug(slug);
  const url = `${SITE_URL}/${slug}/`;
  if (p) {
    const im = img(p.hero_img) || img(p.card_img);
    return {
      title: { absolute: p.title },
      description: p.desc,
      alternates: { canonical: url },
      openGraph: { title: p.title, description: p.desc, url, ...(im ? { images: [{ url: im.url, alt: im.alt }] } : {}) },
    };
  }
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: { absolute: post.seoTitle || `${post.title} | Integrity Roofing` },
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: post.title, description: post.description, url, publishedTime: post.date, modifiedTime: post.modified, ...(post.image ? { images: [post.image] } : {}) },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const p = pageBySlug(slug);
  if (p) return <DesignedPage slug={slug} p={p} />;
  const post = postBySlug(slug);
  if (post) return <PostPage post={post} />;
  notFound();
}

function crumbsFor(slug, p) {
  const items = [];
  const parentSlug = p.parent && p.parent.replace(/\//g, '');
  if (parentSlug && PAGES[parentSlug]) items.push({ name: PAGES[parentSlug].crumb, href: p.parent });
  items.push({ name: p.crumb || p.h1, href: `/${slug}/` });
  return items;
}

function DesignedPage({ slug, p }) {
  return <PageView p={p} path={`/${slug}/`} crumbs={crumbsFor(slug, p)} />;
}

function PostPage({ post }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    description: post.description,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    author: { '@type': 'Organization', name: 'Integrity Roofing', url: SITE_URL },
    publisher: { '@id': BUSINESS_ID },
    mainEntityOfPage: `${SITE_URL}/${post.slug}/`,
  };
  const related = POSTS.filter((x) => x.slug !== post.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={ld} />
      <section className="phero phero--noimg">
        <div className="wrap">
          <Crumbs items={[{ name: 'Blog', href: '/blog-slug/' }, { name: post.title, href: `/${post.slug}/` }]} />
          <div className="phero__grid">
            <div>
              <h1>{post.title}</h1>
              <p className="post-meta">
                Integrity Roofing, <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.modified && post.modified.slice(0, 10) > post.date.slice(0, 10) && <>. Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time></>}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="wrap narrow">
        {post.image ? <div className="post-hero-img"><img src={post.image} alt={post.imageAlt || ''} /></div> : <div style={{ height: 40 }} />}
      </div>
      <article className="section" style={{ paddingTop: 48 }}>
        <div className="wrap narrow article" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      {related.length > 0 && (
        <section className="section section--sky">
          <div className="wrap">
            <div className="head head--row"><div><h2>Keep reading</h2></div><a className="btn btn--line" href="/blog-slug/">All articles</a></div>
            <div className="posts">{related.map((x) => <PostCard key={x.slug} post={x} />)}</div>
          </div>
        </section>
      )}
      <Cta />
    </>
  );
}
