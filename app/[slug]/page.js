import { notFound } from 'next/navigation';
import Icon from '../../components/Icon';
import TileEdge from '../../components/TileEdge';
import JsonLd from '../../components/JsonLd';
import EstimateForm from '../../components/EstimateForm';
import Gallery from '../../components/Gallery';
import { Faq, Cta, LinkCards, Crumbs, OfficeCard, PostCard, LatestPosts } from '../../components/Blocks';
import { B, AREAS, PAGES, POSTS, TEL, SITE_URL, CONTENT_DATE, img, pageBySlug, postBySlug, formatDate } from '../../lib/site';
import { webPageSchema, serviceSchema, BUSINESS_ID } from '../../lib/schema';
import privacy from '../../content/privacy.json';

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
  if (p.parent && PAGES[p.parent.replace(/\//g, '')]) {
    const parent = PAGES[p.parent.replace(/\//g, '')];
    items.push({ name: parent.crumb, href: p.parent });
  }
  items.push({ name: p.crumb || p.h1, href: `/${slug}/` });
  return items;
}

function DesignedPage({ slug, p }) {
  const layout = p.layout || 'service';
  const hero = img(p.hero_img);
  const path = `/${slug}/`;
  const noHeroActions = ['legal', 'quote', 'contact'].includes(layout);
  return (
    <>
      <JsonLd data={webPageSchema({ path, title: p.title, description: p.desc, type: p.page_type || 'WebPage', answer: !!p.answer })} />
      <JsonLd data={serviceSchema(p, path)} />

      <section className={`phero${hero ? '' : ' phero--noimg'}`}>
        <div className="wrap">
          <Crumbs items={crumbsFor(slug, p)} />
          <div className="phero__grid">
            <div>
              <h1>{p.h1}</h1>
              {p.lead && <p className="phero__lead">{p.lead}</p>}
              <p className="updated">Last updated <time dateTime={CONTENT_DATE}>{formatDate(CONTENT_DATE)}</time></p>
              {!noHeroActions && (
                <div className="btns on-dark">
                  <a className="btn btn--sun" href="/get-a-quote/">Request an estimate</a>
                  <a className="btn btn--line" href={TEL}><Icon name="phone" size={18} /> {B.phone}</a>
                </div>
              )}
            </div>
            {hero && <div className="phero__img"><img src={hero.url} alt={hero.alt} fetchPriority="high" /></div>}
          </div>
        </div>
      </section>

      {p.answer ? (
        <div className="wrap">
          <div className="answer">
            <p className="answer__label"><Icon name="check" size={20} /> The short answer</p>
            <p>{p.answer}</p>
          </div>
        </div>
      ) : <TileEdge color="var(--white)" />}

      {(layout === 'contact' || layout === 'quote') && (
        <section className="section">
          <div className="wrap contact">
            <div>
              <h2>{layout === 'quote' ? 'Tell us about your roof' : 'Send us a message'}</h2>
              <p>Share a few details and the office will call you to schedule your estimate.</p>
              <EstimateForm />
            </div>
            <OfficeCard />
          </div>
        </section>
      )}

      {layout === 'reviews' && (
        <section className="section">
          <div className="wrap">
            <div className="head"><h2>Read and leave reviews</h2><p>We don&apos;t copy reviews onto our own site. Read them where customers wrote them.</p></div>
            <div className="review-links">
              {[['Google', B.google_review, 'Read our Google reviews or leave one of your own.'], ['Facebook', B.facebook_reviews, 'See recommendations from our Facebook community.'], ['Yelp', B.yelp, 'See what customers say on Yelp.']].map(([n, u, t]) => (
                <a className="review-link" key={n} href={u} target="_blank" rel="noopener"><strong>{n}</strong><span>{t}</span><em>Open {n}</em></a>
              ))}
            </div>
          </div>
        </section>
      )}

      {layout === 'gallery' && p.gallery && (
        <section className="section">
          <div className="wrap">
            <div className="head"><h2>Roofs we&apos;ve worked on</h2><p>Select a photo to see it larger.</p></div>
            <Gallery images={p.gallery.map(img).filter(Boolean)} />
          </div>
        </section>
      )}

      {layout === 'media' && p.videos && (
        <section className="section">
          <div className="wrap">
            <div className="head"><h2>Videos from the job site</h2></div>
            <div className="videos">
              {p.videos.map((v) => (
                <figure className="video" key={v.title}>
                  <div className="video__frame">
                    {v.mp4 ? <video controls preload="metadata" playsInline><source src={`${v.mp4}#t=0.5`} type="video/mp4" /></video>
                      : <iframe title={v.title} src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v.url)}&show_text=false`} loading="lazy" allow="encrypted-media; picture-in-picture; web-share" allowFullScreen />}
                  </div>
                  <figcaption><strong>{v.title}.</strong> {v.text}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {layout === 'legal' && (
        <section className="section">
          <div className="wrap narrow article">
            {privacy.html ? <div dangerouslySetInnerHTML={{ __html: privacy.html }} /> : <p>This policy is being updated.</p>}
            <p>Questions about this policy? Email <a href={`mailto:${B.email}`}>{B.email}</a> or call {B.phone}.</p>
          </div>
        </section>
      )}

      {layout === 'blog' && (
        <section className="section">
          <div className="wrap">
            {POSTS.length ? <div className="posts">{POSTS.map((x) => <PostCard key={x.slug} post={x} />)}</div>
              : <p className="empty">Articles are being moved over from the old site and will appear here shortly.</p>}
          </div>
        </section>
      )}

      {(p.sections || []).map((s, i) => {
        const im = img(s.img);
        const tone = i % 2 === 1 ? ' section--sky' : '';
        return (
          <section className={`section${tone}`} key={s.h2}>
            <div className="wrap">
              <div className={`split${im ? '' : ' split--text'}${i % 2 === 1 ? ' split--rev' : ''}`}>
                <div>
                  <h2>{s.h2}</h2>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: s.body || '' }} />
                  {s.bullets && (
                    <ul className={`checks${s.bullets.length > 5 && !im ? ' checks--2' : ''}`}>
                      {s.bullets.map((b) => <li key={b}><Icon name="check" size={16} /><span dangerouslySetInnerHTML={{ __html: b }} /></li>)}
                    </ul>
                  )}
                  {s.link && <p style={{ marginTop: 22 }}><a className="textlink" href={s.link[1]}>{s.link[0]} <Icon name="arrow" size={16} /></a></p>}
                </div>
                {im && <div className="split__media"><img src={im.url} alt={im.alt} loading="lazy" /></div>}
              </div>
            </div>
          </section>
        );
      })}

      {p.features && (
        <section className="section">
          <div className="wrap">
            <div className="head">{p.features_eyebrow && <p className="kicker">{p.features_eyebrow}</p>}<h2>{p.features_title || "What's included"}</h2></div>
            <div className="features">
              {p.features.map(([icon, t, d]) => <div className="feature" key={t}><Icon name={icon} size={26} /><h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>
      )}

      {p.steps && (
        <section className="section section--green">
          <div className="wrap">
            <div className="head"><h2>{p.steps_title || 'What to expect'}</h2></div>
            <ol className="steps">
              {p.steps.map(([t, d], n) => <li className="step" key={t}><span className="step__n">{n + 1}</span><h3>{t}</h3><p>{d}</p></li>)}
            </ol>
          </div>
        </section>
      )}

      {p.table && (
        <section className="section">
          <div className="wrap">
            <div className="head"><h2>{p.table.title}</h2>{p.table.note && <p>{p.table.note}</p>}</div>
            <div className="table-wrap" tabIndex={0} role="region" aria-label={p.table.title}>
              <table className="table">
                <thead><tr>{p.table.head.map((h) => <th scope="col" key={h}>{h}</th>)}</tr></thead>
                <tbody>{p.table.rows.map((r) => <tr key={r[0]}>{r.map((c, ci) => (ci === 0 ? <th scope="row" key={ci}>{c}</th> : <td key={ci}>{c}</td>))}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {p.cards && (
        <section className="section section--sky">
          <div className="wrap">
            <div className="head"><h2>{p.cards_title || 'Related services'}</h2></div>
            <LinkCards slugs={p.cards} />
          </div>
        </section>
      )}

      {(p.show_areas || layout === 'location') && (
        <section className="section">
          <div className="wrap area">
            <div>
              <h2>Roofing across the Phoenix Valley</h2>
              <p>Our office is in Gilbert, and our crews work throughout the East Valley and greater Phoenix.</p>
              <ul className="cities">{AREAS.map((c) => <li key={c}><Icon name="pin" size={16} /> {c}</li>)}</ul>
            </div>
            <OfficeCard title="Visit or call the office" directions />
          </div>
        </section>
      )}

      <div className={p.cards || p.show_areas ? '' : 'section--sky'}><Faq faqs={p.faqs} /></div>
      {!['contact', 'quote'].includes(layout) && <Cta />}
    </>
  );
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
