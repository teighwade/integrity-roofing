import { Cta } from '../components/Blocks';

export const metadata = { title: 'Page not found | Integrity Roofing', robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <section className="phero phero--noimg">
        <div className="wrap">
          <h1>We couldn&apos;t find that page</h1>
          <p className="phero__lead">It may have moved when we rebuilt the site. Try one of these instead.</p>
          <div className="btns on-dark">
            <a className="btn btn--sun" href="/">Go to the home page</a>
            <a className="btn btn--line" href="/roofing-services/">See our services</a>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
