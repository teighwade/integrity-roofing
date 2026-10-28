import { B, AREAS, PAGES, POSTS, SITE_URL, ADDRESS, HOURS, faqList } from '../../lib/site';
import { CITIES, HOODS, GUIDES, FAQ_HUB, cityPath, hoodPath } from '../../lib/content';

export const dynamic = 'force-static';

// Plain-text guide to the site for AI assistants (llmstxt.org format).
export function GET() {
  const line = (slug) => `- [${PAGES[slug].crumb}](${SITE_URL}/${slug}/): ${PAGES[slug].answer || PAGES[slug].desc}`;
  const services = ['roofing-services', 'repairs-and-maintenance', 'roof-replacement-services', 'roof-inspections', 'damaged-roof', 'residential-roofing-services', 'residential-roofers', 'commercial-roofing-services'];
  const roofs = ['roof-types', 'tile-roofs', 'asphalt-shingles', 'foam-roofing', 'elastomeric-roofing-coating', 'flat-roofing', 'sloped-roofs'];
  const company = ['about-us', 'who-we-are', 'reviews', 'location', 'gallery', 'media', 'contact-us', 'get-a-quote'];
  const body = `# Integrity Roofing

> ${PAGES.__home.answer}

- Phone: ${B.phone}
- Office: ${ADDRESS} (the only office)
- Hours: ${HOURS}. Closed Saturday and Sunday. No after-hours line.
- License: Arizona ${B.roc}, licensed, bonded and insured
- Founded: ${B.founded}, family owned and operated; ${B.projects} projects
- Service area: ${AREAS.join(', ')}
- Estimates: by phone only (no online forms). If we don't answer, leave a message and we'll return your call within 24 hours.
- Financing: available

## Services

${services.map(line).join('\n')}

## Roof types

${roofs.map(line).join('\n')}

## Company

${company.map(line).join('\n')}

## Service areas

${CITIES.map((c) => `- [Roofing in ${c.city}, AZ](${SITE_URL}${cityPath(c.slug)}): ${c.answer}`).join('\n')}
${HOODS.map((h) => `- [${h.name}](${SITE_URL}${hoodPath(h)}): ${h.answer}`).join('\n')}

## Homeowner resource center

- [Resource center](${SITE_URL}/resources/)
- [Roofing cost guide (estimated Phoenix-area ranges; every roof is different)](${SITE_URL}/resources/roofing-cost-guide/)
- [Roofing FAQ](${SITE_URL}/faq/)
- [Monthly newsletter](${SITE_URL}/newsletter/)
- [Glossary](${SITE_URL}/resources/glossary/)
${GUIDES.map((g) => `- [${g.h1}](${SITE_URL}/resources/library/${g.slug}/): ${g.answer}`).join('\n')}

## Common questions

${faqList(PAGES.__home.faqs).map(({ q, a }) => `- ${q} ${a}`).join('\n')}
${FAQ_HUB.categories.flatMap((c) => c.faqs.slice(0, 4)).map(([q, a]) => `- ${q} ${a}`).join('\n')}

## Articles

${POSTS.slice(0, 40).map((p) => `- [${p.title}](${SITE_URL}/${p.slug}/)${p.description ? `: ${p.description}` : ''}`).join('\n')}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
