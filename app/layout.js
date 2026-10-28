import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JsonLd from '../components/JsonLd';
import { business, website } from '../lib/schema';
import { SITE_URL, PAGES } from '../lib/site';
import { areaIndex } from '../lib/content';

const home = PAGES.__home;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: home.title, template: '%s' },
  description: home.desc,
  alternates: { canonical: `${SITE_URL}/` },
  // Preview copies on vercel.app stay out of search until SITE_LIVE=true is set in Vercel.
  robots: process.env.SITE_LIVE === 'true' ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    siteName: 'Integrity Roofing',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/wp-content/uploads/2023/12/roof-work.jpeg', alt: 'Integrity Roofing crew working on an Arizona roof' }],
  },
  icons: { icon: '/wp-content/uploads/2023/12/cropped-logo_clipped_rev_1-2-e1702935055461.png' },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport = { themeColor: '#183d32' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
        />
        <JsonLd data={business} />
        <JsonLd data={website} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header areas={areaIndex()} />
        <main id="main">{children}</main>
        <Footer areas={areaIndex()} />
      </body>
    </html>
  );
}
