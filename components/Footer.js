import Icon from './Icon';
import { B, AREAS, TEL, HOURS, VOICEMAIL, ADDRESS, MAP_URL } from '../lib/site';

export default function Footer({ areas = [] }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <h2>Integrity Roofing</h2>
            <p>Family owned and operated in Gilbert since {B.founded}. Roof repair, inspections and replacement for homes and businesses across the Phoenix Valley.</p>
            <p>Licensed, bonded and insured, {B.roc}</p>
            <div className="footer__social">
              <a href={B.facebook} aria-label="Facebook" target="_blank" rel="noopener"><Icon name="facebook" size={18} /></a>
              <a href={B.instagram} aria-label="Instagram" target="_blank" rel="noopener"><Icon name="instagram" size={18} /></a>
              <a href={B.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener"><Icon name="linkedin" size={18} /></a>
            </div>
          </div>
          <div>
            <h2>Contact us</h2>
            <ul>
              <li><a href={TEL}><strong>{B.phone}</strong></a></li>
              <li><a href={`mailto:${B.email}`}>{B.email}</a></li>
              <li>{HOURS}</li>
              <li>Closed Saturday and Sunday</li>
              <li>{VOICEMAIL}</li>
              <li><a href={MAP_URL} target="_blank" rel="noopener">{ADDRESS}</a></li>
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              <li><a href="/repairs-and-maintenance/">Repairs and maintenance</a></li>
              <li><a href="/roof-replacement-services/">Roof replacement</a></li>
              <li><a href="/roof-inspections/">Roof inspections</a></li>
              <li><a href="/damaged-roof/">Storm damage</a></li>
              <li><a href="/residential-roofing-services/">Residential roofing</a></li>
              <li><a href="/commercial-roofing-services/">Commercial roofing</a></li>
            </ul>
          </div>
          <div>
            <h2>Roof types</h2>
            <ul>
              <li><a href="/tile-roofs/">Tile roofs</a></li>
              <li><a href="/asphalt-shingles/">Asphalt shingles</a></li>
              <li><a href="/foam-roofing/">Foam roofing</a></li>
              <li><a href="/elastomeric-roofing-coating/">Roof coatings</a></li>
              <li><a href="/flat-roofing/">Flat roofing</a></li>
              <li><a href="/sloped-roofs/">Sloped roofs</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__resources">
          <div>
            <h2>Resource center</h2>
            <ul>
              <li><a href="/resources/">Homeowner resource center</a></li>
              <li><a href="/resources/roofing-cost-guide/">Roofing cost guide</a></li>
              <li><a href="/resources/library/">Homeowner library</a></li>
              <li><a href="/resources/glossary/">Roofing glossary</a></li>
            </ul>
          </div>
          <div>
            <h2>Learn</h2>
            <ul>
              <li><a href="/faq/">Roofing FAQ</a></li>
              <li><a href="/newsletter/">Monthly newsletter</a></li>
              <li><a href="/blog-slug/">Blog</a></li>
              <li><a href="/roof-types/">Compare roof types</a></li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><a href="/about-us/">About us</a></li>
              <li><a href="/who-we-are/">Who we are</a></li>
              <li><a href="/reviews/">Reviews</a></li>
              <li><a href="/gallery/">Gallery</a></li>
              <li><a href="/media/">Videos</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href="/contact-us/">Contact us</a></li>
              <li><a href="/get-a-quote/">Request an estimate</a></li>
              <li><a href="/location/">Office location</a></li>
              <li><a href="/roofing/">Service areas</a></li>
            </ul>
          </div>
        </div>

        {areas.length > 0 && (
          <nav className="footer__areas" aria-label="Service areas">
            <h2>Neighborhoods we serve</h2>
            <p>We also serve {AREAS.filter((c) => !areas.some((a) => a.name === c)).join(', ')}.</p>
            <div className="footer__areas-grid">
              {areas.map((c) => (
                <div key={c.href}>
                  <h3><a href={c.href}>Roofing in {c.name}, AZ</a></h3>
                  <ul>{c.hoods.map((h) => <li key={h.href}><a href={h.href}>{h.name}</a></li>)}</ul>
                </div>
              ))}
            </div>
          </nav>
        )}

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Integrity Roofing. All rights reserved.</span>
          <span className="footer__credit">This custom <a href="https://viwebmedia.com/" target="_blank" rel="noopener">website</a> was built and is managed by <a href="https://checkoutoursite.com/" target="_blank" rel="noopener">Teigh</a>. <a href="tel:+14805502871">480-550-2871</a></span>
          <span className="footer__legal"><a href="/privacy-policy/">Privacy policy</a><a href="/sitemap.xml">Sitemap</a></span>
        </div>
      </div>
    </footer>
  );
}
