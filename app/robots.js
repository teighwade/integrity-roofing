import { SITE_URL } from '../lib/site';

export default function robots() {
  const live = process.env.SITE_LIVE === 'true';
  return {
    rules: live ? [{ userAgent: '*', allow: '/' }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
