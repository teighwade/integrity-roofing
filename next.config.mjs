import site from './content/site.json' with { type: 'json' };

// Old WordPress URLs that no longer have their own page, and where they go now (301).
const p = (source, destination) => ({ source, destination, permanent: true });

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      ...site.demoSlugs.map((s) => p(`/${s}/`, '/blog-slug/')),
      p('/integrity-roofing/', '/about-us/'),
      p('/blog/', '/blog-slug/'),
      p('/feed/', '/blog-slug/'),
      p('/category/:path*', '/blog-slug/'),
      p('/tag/:path*', '/blog-slug/'),
      p('/author/:path*', '/blog-slug/'),
      p('/:year(\\d{4})/:month(\\d{2})/', '/blog-slug/'),
      p('/home/', '/'),
      p('/wp-sitemap.xml', '/sitemap.xml'),
      p('/sitemap_index.xml', '/sitemap.xml'),
      p('/page-sitemap.xml', '/sitemap.xml'),
      p('/post-sitemap.xml', '/sitemap.xml'),
      { source: '/wp-admin/:path*', destination: '/', permanent: false },
      { source: '/wp-login.php', destination: '/', permanent: false },
    ];
  },
  async headers() {
    return [
      { source: '/(.*)', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      ] },
      { source: '/wp-content/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] },
    ];
  },
};

export default nextConfig;
