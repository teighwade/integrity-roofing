import { B, AREAS, PAGES, POSTS, SITE_URL, ADDRESS, HOURS, faqList } from '../../lib/site';

export const dynamic = 'force-static';

// Plain-text guide to the site for AI assistants (llmstxt.org format).
export function GET() {
  const line = (slug) => `- [${PAGES[slug].crumb}](${SITE_URL}/${slug}/): ${PAGES[slug].answer || PAGES[slug].desc}`;
  const services = ['roofing-services', 'repairs-and-maintenance', 'roof-replacement-services', 'roof-inspections', 'damaged-roof', 'residential-roofing-services', 'residential-roofers', 'commercial-roofing-services'];
  const roofs = ['roof-types', 'tile-roofs', 'asphalt-shingles', 'foam-roofing', 'elastomeric-roofing-coating', 'flat-roofing', 'metal-roofing', 'sloped-roofs'];
  const company = ['about-us', 'who-we-are', 'reviews', 'location', 'gallery', 'media', 'contact-us', 'get-a-quote'];
  const body = `# Integrity Roofing

> ${PAGES.__home.answer}

- Phone: ${B.phone}
- Email: ${B.email}
- Office: ${ADDRESS} (the only office)
- Hours: ${HOURS}. Closed Saturday and Sunday. No after-hours line.
- License: Arizona ${B.roc}, licensed, bonded and insured
- Founded: ${B.founded}, family owned and operated; ${B.projects} projects
- Service area: ${AREAS.join(', ')}
- Estimates: request one online at ${SITE_URL}/get-a-quote/ or by phone
- Financing: available

## Services

${services.map(line).join('\n')}

## Roof types

${roofs.map(line).join('\n')}

## Company

${company.map(line).join('\n')}

## Common questions

${faqList(PAGES.__home.faqs).map(({ q, a }) => `- ${q} ${a}`).join('\n')}

## Articles

${POSTS.slice(0, 40).map((p) => `- [${p.title}](${SITE_URL}/${p.slug}/)${p.description ? `: ${p.description}` : ''}`).join('\n')}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
