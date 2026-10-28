import { PAGES, POSTS, SITE_URL, CONTENT_DATE } from '../lib/site';
import { CITIES, HOODS, GUIDES, ISSUES, AREA_HUB, cityPath, hoodPath } from '../lib/content';

export default function sitemap() {
  const u = (path, priority, lastModified = CONTENT_DATE) => ({ url: `${SITE_URL}${path}`, lastModified, priority });
  return [
    u('/', 1),
    ...Object.keys(PAGES).filter((s) => s !== '__home').map((s) => u(`/${s}/`, PAGES[s].parent ? 0.7 : 0.8)),
    ...(AREA_HUB ? [u('/roofing/', 0.8)] : []),
    ...CITIES.map((c) => u(cityPath(c.slug), 0.8)),
    ...HOODS.map((h) => u(hoodPath(h), 0.6)),
    u('/faq/', 0.8),
    u('/resources/', 0.8),
    u('/resources/roofing-cost-guide/', 0.8),
    u('/resources/library/', 0.7),
    u('/resources/glossary/', 0.6),
    ...GUIDES.map((g) => u(`/resources/library/${g.slug}/`, 0.7)),
    u('/newsletter/', 0.6, ISSUES[0] ? `${ISSUES[0].month}-01` : CONTENT_DATE),
    ...ISSUES.map((n) => u(`/newsletter/${n.slug}/`, 0.5, `${n.month}-01`)),
    ...POSTS.filter((p) => !PAGES[p.slug]).map((p) => u(`/${p.slug}/`, 0.5, p.modified || p.date)),
  ];
}
