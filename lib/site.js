import site from '../content/site.json';
import posts from '../content/posts.json';

export const SITE_URL = 'https://integrityroofingaz.com';
export const B = site.business;
export const AREAS = site.areas;
export const NAV = site.nav;
export const PAGES = site.pages;
export const IMAGES = site.images;
export const TEL = `tel:+1${B.phone.replace(/\D/g, '')}`;
export const ADDRESS = `${B.street}, ${B.city}, ${B.region} ${B.postal}`;
export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Integrity Roofing, ${ADDRESS}`)}`;
export const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=m&z=13&output=embed`;
export const CONTENT_DATE = '2026-10-28';

// Blog posts imported from WordPress (scripts/import-wordpress.mjs). Demo and page-like posts are excluded.
const hidden = new Set([...site.demoSlugs, ...site.pageLikePosts]);

// Business wording rules applied to imported posts: estimates are never "free".
const fixWording = (s = '') => s
  .replace(/\ba free (?:roof )?(?:estimate|consultation|quote|inspection)\b/gi, 'an estimate')
  .replace(/\bfree (?:roof )?(?:estimates?|consultations?|quotes?)\b/gi, 'estimates');

// Posts whose WordPress featured image was an off-topic stock photo (or missing) use a real job photo instead.
const THUMB_OVERRIDES = {
  'prepare-your-roof-for-fall': 'damaged_3',
  'routine-roof-insections-are-worth-it': 'inspections_2',
  'roofing-solutions': 'shingle_3',
  'top-rate-roofing-company-in-phoenix': 'location',
  'commercial-roofing-in-scottsdale': 'commercial_3',
  'roof-repair': 'repairs',
};

export const POSTS = posts
  .filter((p) => !hidden.has(p.slug))
  .map((p) => {
    const o = THUMB_OVERRIDES[p.slug] && site.images[THUMB_OVERRIDES[p.slug]];
    return {
      ...p,
      html: fixWording(p.html),
      description: fixWording(p.description),
      excerpt: fixWording(p.excerpt),
      ...(o ? { image: o.url, imageAlt: o.alt } : {}),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const img = (key) => (key && IMAGES[key]) || null;
export const pagePath = (slug) => (slug === '__home' ? '/' : `/${slug}/`);
export const pageBySlug = (slug) => PAGES[slug] || null;
export const postBySlug = (slug) => POSTS.find((p) => p.slug === slug) || null;
export const cardImage = (p) => img(p.card_img) || img(p.hero_img);

export function formatDate(iso) {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

// FAQs in the theme data are [question, answer] pairs.
export const faqList = (faqs = []) => faqs.map((f) => (Array.isArray(f) ? { q: f[0], a: f[1] } : { q: f.q, a: f.a }));
export const HOURS = 'Monday to Friday, 7 am to 5 pm';
export const VOICEMAIL = "If we don't answer, leave a message and we'll return your call within 24 hours.";
