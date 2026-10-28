import Icon from './Icon';
import BlogCarousel from './BlogCarousel';
import JsonLd from './JsonLd';
import { B, HOURS, TEL, VOICEMAIL, AREAS, PAGES, POSTS, pagePath, cardImage, faqList, formatDate, ADDRESS, MAP_URL, MAP_EMBED } from '../lib/site';
import { faqSchema, breadcrumbSchema } from '../lib/schema';

export function Faq({ faqs, title = 'Frequently asked questions', intro, schema = true }) {
  const list = faqList(faqs);
  if (!list.length) return null;
  return (
    <section className="section" aria-labelledby="faq-title">
      {schema && <JsonLd data={faqSchema(faqs)} />}
      <div className="wrap faq-wrap">
        <div className="head">
          <h2 id="faq-title">{title}</h2>
          <p>{intro || <>Still have a question? Call the office at <a href={TEL}>{B.phone}</a>, {HOURS}.</>}</p>
        </div>
        <div className="faq">
          {list.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta({ title = "Let's take a look at your roof.", text }) {
  return (
    <section className="cta" aria-label="Call for an estimate">
      <div className="wrap">
        <div>
          <h2>{title}</h2>
          <p>{text || `Call the office at ${B.phone} to schedule an estimate, ${HOURS}. ${VOICEMAIL}`}</p>
        </div>
        <div className="btns">
          <a className="btn btn--dark" href={TEL}><Icon name="phone" size={18} /> Call {B.phone}</a>
        </div>
      </div>
    </section>
  );
}

// Phone-only contact panel (the site has no forms).
export function CallPanel() {
  return (
    <div className="callpanel">
      <h2>Call to schedule your estimate</h2>
      <a className="callpanel__phone" href={TEL}><Icon name="phone" size={30} /> {B.phone}</a>
      <p className="callpanel__hours">{HOURS}. Closed Saturday and Sunday.</p>
      <p className="callpanel__vm"><Icon name="clock" size={20} /> {VOICEMAIL}</p>
      <p className="callpanel__email"><Icon name="mail" size={20} /> Prefer email? Write to <a href={`mailto:${B.email}`}>{B.email}</a></p>
      <h3>Have this ready when you call</h3>
      <ul className="checks">
        {['The property address', 'Your roof type, if you know it (tile, shingle, foam, flat)', "What you're seeing: a leak, broken tiles, storm damage, or just an older roof", 'Whether an HOA needs to approve roof work', 'The best time to reach you'].map((t) => (
          <li key={t}><Icon name="check" size={16} /><span>{t}</span></li>
        ))}
      </ul>
    </div>
  );
}

export function AreaList() {
  return (
    <section className="section">
      <div className="wrap area">
        <div>
          <h2>Roofing across the Phoenix Valley</h2>
          <p>Our office is in Gilbert, and our crews work throughout the East Valley and greater Phoenix.</p>
          <ul className="cities">{AREAS.map((c) => <li key={c}><Icon name="pin" size={16} /> {c}</li>)}</ul>
          <p style={{ marginTop: 24 }}><a className="textlink" href="/roofing/">See our service areas and neighborhoods <Icon name="arrow" size={16} /></a></p>
        </div>
        <OfficeCard title="Visit or call the office" directions />
      </div>
    </section>
  );
}

export function LinkCards({ slugs }) {
  return (
    <div className="links">
      {slugs.filter((s) => PAGES[s]).map((s) => {
        const p = PAGES[s];
        const im = cardImage(p);
        return (
          <a className="link-card" href={pagePath(s)} key={s}>
            <div className="link-card__img">{im && <img src={im.url} alt="" loading="lazy" />}</div>
            <div className="link-card__body">
              <h3>{p.card_title || p.crumb || p.h1}</h3>
              <p>{p.card_text}</p>
              <span className="link-card__more">Learn more <Icon name="arrow" size={16} /></span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export function PostCard({ post }) {
  return (
    <a className="post-card" href={`/${post.slug}/`}>
      <div className="post-card__img">{post.image && <img src={post.image} alt="" loading="lazy" />}</div>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <h3>{post.title}</h3>
      {post.excerpt && <p>{post.excerpt}</p>}
    </a>
  );
}

export function BlogShowcase({ count = 10 }) {
  const list = POSTS.slice(0, count).map((p) => ({ slug: p.slug, title: p.title, image: p.image, excerpt: p.excerpt, date: p.date, dateLabel: formatDate(p.date) }));
  if (!list.length) return null;
  return (
    <section className="section" aria-labelledby="blog-title">
      <div className="wrap">
        <div className="head head--row">
          <div>
            <h2 id="blog-title">From the Integrity Roofing blog</h2>
            <p className="schedule"><Icon name="calendar" size={18} /><span>New posts every <strong>Monday</strong> and <strong>Saturday</strong> morning.</span></p>
          </div>
          <a className="btn btn--line" href="/blog-slug/">All articles</a>
        </div>
        <BlogCarousel posts={list} />
      </div>
    </section>
  );
}

export function LatestPosts({ count = 3, title = 'Roofing tips for Arizona homeowners' }) {
  const list = POSTS.slice(0, count);
  if (!list.length) return null;
  return (
    <section className="section" aria-labelledby="posts-title">
      <div className="wrap">
        <div className="head head--row">
          <div><h2 id="posts-title">{title}</h2></div>
          <a className="btn btn--line" href="/blog-slug/">All articles</a>
        </div>
        <div className="posts">{list.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </div>
    </section>
  );
}

export function Crumbs({ items }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol>
        {all.map((it, i) => (
          <li key={it.href}>{i < all.length - 1 ? <a href={it.href}>{it.name}</a> : <span aria-current="page">{it.name}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function OfficeCard({ title = 'Integrity Roofing', directions = false }) {
  return (
    <div className="office">
      <iframe title="Map to Integrity Roofing in Gilbert, AZ" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <div className="office__body">
        <h3>{title}</h3>
        <ul className="info">
          <li><Icon name="pin" /><div><strong>Office</strong><a href={MAP_URL} target="_blank" rel="noopener">{ADDRESS}</a></div></li>
          <li><Icon name="phone" /><div><strong>Phone</strong><a href={TEL}>{B.phone}</a></div></li>
          <li><Icon name="clock" /><div><strong>Hours</strong><span>{HOURS}<br />Closed Saturday and Sunday<br />{VOICEMAIL}</span></div></li>
        </ul>
        {directions && <a className="btn btn--sun" href={MAP_URL} target="_blank" rel="noopener">Get directions</a>}
      </div>
    </div>
  );
}
