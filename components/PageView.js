import Icon from './Icon';
import TileEdge from './TileEdge';
import JsonLd from './JsonLd';
import Gallery from './Gallery';
import { Faq, Cta, LinkCards, Crumbs, OfficeCard, PostCard, CallPanel, AreaList } from './Blocks';
import { B, POSTS, TEL, CONTENT_DATE, img, formatDate } from '../lib/site';
import { webPageSchema, serviceSchema } from '../lib/schema';
import privacy from '../content/privacy.json';

// Renders any content page (services, roof types, company, cities, neighborhoods, guides, newsletters).
export default function PageView({ p, path, crumbs, top = null, beforeFaq = null, modified = CONTENT_DATE, faqTitle }) {
  const layout = p.layout || 'service';
  const hero = img(p.hero_img);
  const callOnly = ['contact', 'quote'].includes(layout);
  return (
    <>
      <JsonLd data={webPageSchema({ path, title: p.title, description: p.desc, type: p.page_type || 'WebPage', answer: !!p.answer, modified })} />
      <JsonLd data={serviceSchema(p, path)} />

      <section className={`phero${hero ? '' : ' phero--noimg'}`}>
        <div className="wrap">
          <Crumbs items={crumbs} />
          <div className="phero__grid">
            <div>
              {p.kicker && <p className="hero__kicker">{p.kicker}</p>}
              <h1>{p.h1}</h1>
              {p.lead && <p className="phero__lead">{p.lead}</p>}
              <p className="updated">Last updated <time dateTime={modified}>{formatDate(modified)}</time></p>
              {layout !== 'legal' && (
                <div className="btns on-dark">
                  <a className="btn btn--sun" href={TEL}><Icon name="phone" size={18} /> Call {B.phone}</a>
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

      {callOnly && (
        <section className="section">
          <div className="wrap contact">
            <CallPanel />
            <OfficeCard />
          </div>
        </section>
      )}

      {top}

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
            <div dangerouslySetInnerHTML={{ __html: privacy.html }} />
          </div>
        </section>
      )}

      {layout === 'blog' && (
        <section className="section">
          <div className="wrap">
            <div className="head"><h2>All articles</h2><p className="schedule"><Icon name="calendar" size={18} /><span>New posts every <strong>Monday</strong> and <strong>Saturday</strong> morning.</span></p></div>
            {POSTS.length ? <div className="posts">{POSTS.map((x) => <PostCard key={x.slug} post={x} />)}</div>
              : <p className="empty">Articles are on the way.</p>}
          </div>
        </section>
      )}

      {(p.sections || []).map((s, i) => {
        const im = img(s.img);
        const tone = i % 2 === 1 ? ' section--sky' : '';
        return (
          <section className={`section${tone}`} key={s.h2 + i}>
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

      {(p.show_areas || layout === 'location') && <AreaList />}

      {beforeFaq}

      <div className={p.cards || p.show_areas ? '' : 'section--sky'}><Faq faqs={p.faqs} title={faqTitle} /></div>
      {!callOnly && <Cta />}
    </>
  );
}
