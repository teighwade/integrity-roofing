import { notFound } from 'next/navigation';
import Icon from '../../components/Icon';
import JsonLd from '../../components/JsonLd';
import { Crumbs, Cta } from '../../components/Blocks';
import { FAQ_HUB, FAQ_COUNT } from '../../lib/content';
import { B, TEL, VOICEMAIL, SITE_URL, CONTENT_DATE, formatDate } from '../../lib/site';
import { webPageSchema } from '../../lib/schema';

const title = 'Roofing FAQ: Arizona Roof Questions Answered | Integrity Roofing';
const desc = 'Hundreds of answers about roof repair, replacement, tile underlayment, foam and flat roofs, monsoon damage, costs, HOAs and hiring a roofer in Arizona.';
export const metadata = { title: { absolute: title }, description: desc, alternates: { canonical: `${SITE_URL}/faq/` } };

export default function FaqHub() {
  if (!FAQ_HUB.categories.length) notFound();
  const all = FAQ_HUB.categories.flatMap((c) => c.faqs);
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/faq/', title, description: desc, type: 'FAQPage' })} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: all.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
      <section className="phero phero--noimg">
        <div className="wrap">
          <Crumbs items={[{ name: 'Resources', href: '/resources/' }, { name: 'Roofing FAQ', href: '/faq/' }]} />
          <h1>Roofing questions, answered</h1>
          <p className="phero__lead">{FAQ_HUB.intro}</p>
          <p className="updated">{FAQ_COUNT} answers in {FAQ_HUB.categories.length} topics. Last updated <time dateTime={CONTENT_DATE}>{formatDate(CONTENT_DATE)}</time></p>
          <div className="btns on-dark"><a className="btn btn--sun" href={TEL}><Icon name="phone" size={18} /> Ask us: {B.phone}</a></div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap faq-layout">
          <nav className="faq-toc" aria-label="FAQ topics">
            <h2>Topics</h2>
            <ol>{FAQ_HUB.categories.map((c) => <li key={c.slug}><a href={`#${c.slug}`}>{c.title} <span>{c.faqs.length}</span></a></li>)}</ol>
          </nav>
          <div>
            {FAQ_HUB.categories.map((c) => (
              <section className="faq-cat" id={c.slug} key={c.slug} aria-labelledby={`${c.slug}-h`}>
                <h2 id={`${c.slug}-h`}>{c.title}</h2>
                {c.intro && <p className="faq-cat__intro">{c.intro}</p>}
                <div className="faq">
                  {c.faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
                </div>
              </section>
            ))}
            <p className="callnote"><Icon name="phone" size={18} /> Don&apos;t see your question? Call <a href={TEL}>{B.phone}</a>, Monday to Friday, 7 am to 5 pm. {VOICEMAIL}</p>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
