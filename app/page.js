import Icon from '../components/Icon';
import TileEdge from '../components/TileEdge';
import RoofPicker from '../components/RoofPicker';
import JsonLd from '../components/JsonLd';
import { Faq, Cta, LatestPosts, OfficeCard } from '../components/Blocks';
import { B, AREAS, PAGES, TEL, img } from '../lib/site';
import { webPageSchema } from '../lib/schema';

const home = PAGES.__home;
export const metadata = { title: { absolute: home.title }, description: home.desc };

// Facts per roof type come from the comparison table on /roof-types/ (same order as these rows).
const ROOFS = [
  ['tile-roofs', 'Tile', 0, 'tile'],
  ['asphalt-shingles', 'Shingle', 1, 'shingle'],
  ['foam-roofing', 'Foam', 2, 'foam'],
  ['elastomeric-roofing-coating', 'Coating', 3, 'elastomeric'],
  ['metal-roofing', 'Metal', 4, 'metal'],
  ['flat-roofing', 'Flat', 5, 'flat'],
];

function roofData() {
  const t = PAGES['roof-types'].table;
  return ROOFS.map(([slug, name, row, imgKey]) => {
    const p = PAGES[slug];
    const r = t.rows[row];
    return {
      slug,
      name: p.crumb || name,
      summary: p.card_text || p.lead,
      img: img(imgKey),
      facts: [[t.head[1], r[1]], [t.head[2], r[2]], [t.head[3], r[3]]],
    };
  });
}

const SERVICES = [
  ['repairs-and-maintenance', 'Roof repair', 'wrench'],
  ['roof-replacement-services', 'Roof replacement', 'roof'],
  ['roof-inspections', 'Inspections', 'search'],
  ['damaged-roof', 'Storm damage', 'alert'],
  ['residential-roofing-services', 'Homes', 'home'],
  ['commercial-roofing-services', 'Businesses', 'building'],
];

// Monsoon runs June 15 – September 30. Dots mark when we recommend an inspection.
const MONTHS = [
  ['Jan'], ['Feb'], ['Mar', 'check'], ['Apr', 'check'], ['May'], ['Jun', 'partial'],
  ['Jul', 'storm'], ['Aug', 'storm'], ['Sep', 'storm'], ['Oct', 'check'], ['Nov'], ['Dec'],
];

export default function Home() {
  const hero = img('hero_home');
  const storm = PAGES['damaged-roof'];
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/', title: home.title, description: home.desc })} />

      <section className="hero">
        <div className="hero__grid">
          <div className="hero__text">
            <p className="hero__kicker">Family-owned roofer in Gilbert, Arizona</p>
            <h1>Roofs built for Arizona sun and monsoon storms.</h1>
            <p className="hero__lead">{home.lead}</p>
            <div className="btns on-dark">
              <a className="btn btn--sun" href="/get-a-quote/">Request an estimate</a>
              <a className="btn btn--line" href={TEL}><Icon name="phone" size={18} /> {B.phone}</a>
            </div>
            <ul className="hero__facts">
              <li><Icon name="shield" size={18} /> Licensed, bonded and insured, {B.roc}</li>
              <li><Icon name="clock" size={18} /> Office open {B.hours_short.replace('Mon–Fri', 'Mon to Fri,')}</li>
            </ul>
          </div>
          <div className="hero__media">
            {hero && <img src={hero.url} alt={hero.alt} fetchPriority="high" />}
            <div className="hero__badge"><strong>{B.projects}</strong><span>roofs repaired and replaced across the Valley since {B.founded}</span></div>
          </div>
        </div>
      </section>
      <TileEdge color="var(--sky)" />

      <section className="proof" aria-label="Why homeowners choose us">
        <div className="wrap">
          <ul>
            <li><Icon name="calendar" size={22} /><div><strong>Since {B.founded}</strong><span>Family owned and operated</span></div></li>
            <li><Icon name="shield" size={22} /><div><strong>{B.roc}</strong><span>Licensed, bonded and insured</span></div></li>
            <li><Icon name="layers" size={22} /><div><strong>Every roof type</strong><span>Tile, shingle, foam, flat, metal</span></div></li>
            <li><Icon name="dollar" size={22} /><div><strong>Financing available</strong><span>Ask during your estimate</span></div></li>
          </ul>
        </div>
      </section>

      <section className="section section--sky" aria-labelledby="roofs-title" style={{ paddingTop: 'clamp(32px, 4vw, 56px)' }}>
        <div className="wrap">
          <div className="head head--row">
            <div>
              <h2 id="roofs-title">What&apos;s on your roof?</h2>
              <p>Most Valley homes have tile, but plenty have a foam or flat section over a patio or addition too. Pick yours to see how long it lasts here and what wears out first.</p>
            </div>
            <a className="btn btn--line" href="/roof-types/">Compare all roof types</a>
          </div>
          <RoofPicker roofs={roofData()} />
        </div>
      </section>

      <section className="section section--green" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="head head--row">
            <div>
              <h2 id="svc-title">One local crew for the whole job</h2>
              <p>From one cracked tile to a full re-roof: we inspect, explain what we found, give you an estimate, do the work and check it at the end.</p>
            </div>
            <a className="btn btn--line btn--line-light" href="/roofing-services/">All services</a>
          </div>
          <ul className="svc-list">
            {SERVICES.map(([slug, name, icon]) => (
              <li key={slug}>
                <a href={`/${slug}/`}>
                  <span className="svc__icon"><Icon name={icon} size={24} /></span>
                  <h3>{name}</h3>
                  <p>{PAGES[slug].card_text}</p>
                  <span className="svc__go"><Icon name="arrow" size={20} /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="season-title">
        <div className="wrap season">
          <div>
            <h2 id="season-title">Get your roof checked before monsoon season</h2>
            <p>Arizona&apos;s monsoon runs from June 15 to September 30. Wind lifts tiles and shingles, and heavy rain finds every weak spot in underlayment and flashing.</p>
            <p>Have the roof inspected in spring, again after any big storm, and in fall to catch summer heat damage before winter rain.</p>
            <div className="btns">
              <a className="btn btn--sun" href="/roof-inspections/">Schedule an inspection</a>
              <a className="btn btn--line" href="/damaged-roof/">{storm.crumb}</a>
            </div>
          </div>
          <div>
            <ol className="calendar" aria-label="Arizona roofing calendar">
              {MONTHS.map(([m, kind]) => (
                <li key={m} className={kind ? `is-${kind}` : ''}>
                  <span />{m}
                  {kind === 'check' && <b className="visually-hidden"> (recommended inspection)</b>}
                  {(kind === 'storm' || kind === 'partial') && <b className="visually-hidden"> (monsoon season)</b>}
                </li>
              ))}
            </ol>
            <div className="legend" aria-hidden="true">
              <span><i style={{ background: 'var(--saguaro)' }} /> Monsoon, June 15 to September 30</span>
              <span><i style={{ background: 'var(--sun)', borderRadius: '50%' }} /> Good time for an inspection</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sky" aria-labelledby="steps-title">
        <div className="wrap">
          <div className="head"><h2 id="steps-title">How a job goes, start to finish</h2></div>
          <ol className="steps">
            {home.steps.map(([t, d], n) => (
              <li className="step" key={t}><span className="step__n">{n + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="area-title">
        <div className="wrap area">
          <div>
            <h2 id="area-title">Roofing across the Phoenix Valley</h2>
            <p>Our office is in Gilbert, and our crews work throughout the East Valley and greater Phoenix.</p>
            <ul className="cities">{AREAS.map((c) => <li key={c}><Icon name="pin" size={16} /> {c}</li>)}</ul>
          </div>
          <OfficeCard title="Visit or call the office" directions />
        </div>
      </section>

      <LatestPosts />
      <div className="section--sky"><Faq faqs={home.faqs} title="Roofing questions we hear every day" /></div>
      <Cta />
    </>
  );
}
