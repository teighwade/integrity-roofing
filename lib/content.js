// Loaders for the hub sections: service areas, FAQ hub, resource center and newsletters.
import areas from '../content/areas.json';
import faqHub from '../content/faq.json';
import resources from '../content/resources.json';
import newsletters from '../content/newsletters.json';

export const CITY_ORDER = ['gilbert-az', 'mesa-az', 'chandler-az'];
export const AREA_HUB = areas.hub;
export const CITIES = [...areas.cities].sort((a, b) => CITY_ORDER.indexOf(a.slug) - CITY_ORDER.indexOf(b.slug));
export const HOODS = [...areas.neighborhoods].sort((a, b) => a.name.localeCompare(b.name));
export const cityBySlug = (s) => CITIES.find((c) => c.slug === s) || null;
export const hoodsIn = (citySlug) => HOODS.filter((h) => h.city === citySlug);
export const hoodBySlug = (citySlug, s) => HOODS.find((h) => h.city === citySlug && h.slug === s) || null;
export const cityPath = (c) => `/roofing/${c}/`;
export const hoodPath = (h) => `/roofing/${h.city}/${h.slug}/`;

// Small index for menus and footers (names and links only).
export function areaIndex() {
  return CITIES.map((c) => ({
    name: c.city || c.name,
    href: cityPath(c.slug),
    hoods: hoodsIn(c.slug).map((h) => ({ name: h.name, href: hoodPath(h) })),
  }));
}

export const FAQ_HUB = faqHub;
export const FAQ_COUNT = faqHub.categories.reduce((n, c) => n + c.faqs.length, 0);

export const GUIDES = resources.guides;
export const GLOSSARY = [...resources.glossary].sort((a, b) => a[0].localeCompare(b[0]));
export const LINKS = resources.links;
export const CENTER = resources.center || null;
export const COST_GUIDE = resources.costGuide || null;
export const LIBRARY = resources.library || null;
export const guideBySlug = (s) => GUIDES.find((g) => g.slug === s) || null;

// Newsletters appear from the first day of their month (Arizona time) at build time.
// A GitHub Action rebuilds the site on the 1st of every month so the new issue goes live.
export function azMonth(d = new Date()) {
  const az = new Date(d.getTime() - 7 * 3600 * 1000); // Arizona is UTC-7 all year (no daylight saving)
  return `${az.getUTCFullYear()}-${String(az.getUTCMonth() + 1).padStart(2, '0')}`;
}
export const ISSUES = newsletters.filter((n) => n.month <= azMonth()).sort((a, b) => (a.month < b.month ? 1 : -1));
export const CURRENT_ISSUE = ISSUES[0] || null;
export const issueBySlug = (s) => ISSUES.find((n) => n.slug === s) || null;
export const monthName = (m) => new Date(`${m}-15T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
