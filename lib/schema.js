import { B, AREAS, SITE_URL, CONTENT_DATE, faqList } from './site';

export const BUSINESS_ID = `${SITE_URL}/#business`;

export const business = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': BUSINESS_ID,
  name: B.name,
  slogan: B.tagline,
  url: SITE_URL,
  logo: `${SITE_URL}/wp-content/uploads/2023/12/cropped-logo_clipped_rev_1-2-e1702935055461.png`,
  image: `${SITE_URL}/wp-content/uploads/2023/12/roof-work.jpeg`,
  telephone: `+1-${B.phone}`,
  email: B.email,
  foundingDate: B.founded,
  priceRange: '$$',
  address: { '@type': 'PostalAddress', streetAddress: B.street, addressLocality: B.city, addressRegion: B.region, postalCode: B.postal, addressCountry: B.country },
  geo: { '@type': 'GeoCoordinates', latitude: 33.3365, longitude: -111.7386 },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: B.opens, closes: B.closes }],
  areaServed: AREAS.map((c) => ({ '@type': 'City', name: `${c}, AZ` })),
  hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: `Arizona Registrar of Contractors ${B.roc}` },
  knowsAbout: ['Tile roofing', 'Asphalt shingle roofing', 'Spray foam roofing', 'Flat roofing', 'Elastomeric roof coatings', 'Metal roofing', 'Roof inspections', 'Roof repair', 'Roof replacement', 'Monsoon storm damage'],
  sameAs: [B.facebook, B.instagram, B.linkedin, B.yelp].filter(Boolean),
};

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: B.name,
  publisher: { '@id': BUSINESS_ID },
  inLanguage: 'en-US',
};

export function faqSchema(faqs) {
  const list = faqList(faqs);
  if (list.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.href}` })),
  };
}

export function webPageSchema({ path, title, description, type = 'WebPage', answer, modified = CONTENT_DATE }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    dateModified: modified,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': BUSINESS_ID },
    ...(answer ? { speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.answer'] } } : {}),
  };
}

export function serviceSchema(p, path) {
  if (!p.service) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.service,
    serviceType: p.service_type || p.service,
    description: p.answer || p.desc,
    url: `${SITE_URL}${path}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: AREAS.map((c) => ({ '@type': 'City', name: `${c}, AZ` })),
    ...(p.audience ? { audience: { '@type': 'Audience', audienceType: p.audience } } : {}),
  };
}
