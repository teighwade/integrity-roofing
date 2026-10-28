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
export const POSTS = posts.filter((p) => !hidden.has(p.slug)).sort((a, b) => (a.date < b.date ? 1 : -1));

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
