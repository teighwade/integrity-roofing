import Icon from './Icon';
import { B, AREAS, TEL, ADDRESS, MAP_URL } from '../lib/site';

export default function Footer() {
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
            <h2>Contact</h2>
            <ul>
              <li><a href={TEL}>{B.phone}</a></li>
              <li><a href={`mailto:${B.email}`}>{B.email}</a></li>
              <li><a href={MAP_URL} target="_blank" rel="noopener">{ADDRESS}</a></li>
              <li>{B.hours_label}</li>
              <li>Closed Saturday &amp; Sunday</li>
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              <li><a href="/repairs-and-maintenance/">Repairs &amp; maintenance</a></li>
              <li><a href="/roof-replacement-services/">Roof replacement</a></li>
              <li><a href="/roof-inspections/">Roof inspections</a></li>
              <li><a href="/damaged-roof/">Storm damage</a></li>
              <li><a href="/commercial-roofing-services/">Commercial roofing</a></li>
              <li><a href="/roof-types/">Roof types</a></li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><a href="/about-us/">About us</a></li>
              <li><a href="/reviews/">Reviews</a></li>
              <li><a href="/gallery/">Gallery</a></li>
              <li><a href="/blog-slug/">Blog</a></li>
              <li><a href="/contact-us/">Contact</a></li>
              <li><a href="/get-a-quote/">Request an estimate</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Integrity Roofing. Serving {AREAS.slice(0, 6).join(', ')} and the Phoenix Valley.</span>
          <a href="/privacy-policy/">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
}
