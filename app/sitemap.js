import { PAGES, POSTS, SITE_URL, CONTENT_DATE } from '../lib/site';

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, lastModified: CONTENT_DATE, priority: 1 },
    ...Object.keys(PAGES).filter((s) => s !== '__home').map((s) => ({ url: `${SITE_URL}/${s}/`, lastModified: CONTENT_DATE, priority: PAGES[s].parent ? 0.7 : 0.8 })),
    ...POSTS.filter((p) => !PAGES[p.slug]).map((p) => ({ url: `${SITE_URL}/${p.slug}/`, lastModified: p.modified || p.date, priority: 0.5 })),
  ];
}
