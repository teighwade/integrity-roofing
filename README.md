# Integrity Roofing website

The integrityroofingaz.com website. It's built with Next.js and hosted on Vercel. The domain stays registered at GoDaddy.

## Where things live

| What | Where |
|---|---|
| Page text, FAQs, business details, navigation, photo list | `content/site.json` |
| City and neighborhood pages | `content/areas.json` (pages at `/roofing/<city>/<neighborhood>/`) |
| FAQ hub (`/faq/`) | `content/faq.json` |
| Resource center, cost guide, library guides, glossary, outside links | `content/resources.json` |
| Monthly newsletters | `content/newsletters.json` (an issue appears on the 1st of its month) |
| Blog posts | `content/posts.json` (imported from WordPress) |
| Home page layout | `app/page.js` |
| All other pages and blog posts | `app/[slug]/page.js` |
| Colors, fonts, spacing | `app/globals.css` |
| Photos and videos | `public/wp-content/uploads/` (same URLs as the old site) |

Push a change to `main` and Vercel republishes in about a minute.

## One-time setup

1. **Import the WordPress content.** The GitHub Action "Import from WordPress" runs automatically on the first push. It copies the blog posts, privacy policy, photos and videos from the staging site and commits them. Check it under the repository's **Actions** tab.
2. **Create the Vercel project.** In Vercel, choose **Add New → Project** and import `teighwade/integrity-roofing`. Keep the defaults; Vercel detects Next.js.
3. **Add environment variables** under **Settings → Environment Variables**:
   - `SITE_LIVE` = `true`: set this only when you're ready for Google to index the site. Until then the site tells search engines not to index it.
   - `BING_SITE_VERIFICATION` (optional): the code from Bing Webmaster Tools.
4. **Point the domain at Vercel.** In Vercel go to **Settings → Domains** and add `integrityroofingaz.com` and `www.integrityroofingaz.com`. In GoDaddy DNS, change the `@` A record and the `www` CNAME to the values Vercel shows. Don't change the nameservers or the MX or other email records.
5. **Tell the search engines.** Resubmit `https://integrityroofingaz.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Monthly newsletter

Each issue in `content/newsletters.json` has a `month` like `2027-03`. It appears on the site, and is featured on the home page, from the 1st of that month (Arizona time). The "Monthly rebuild" GitHub Action rebuilds the site just after midnight on the 1st so the new issue goes live.

## Business facts used everywhere

- One office: 16308 E Fairview St, Gilbert, AZ 85295
- Hours: Monday to Friday, 7 am to 5 pm. There's no after-hours number.
- Always "estimates", never "free estimates".
- Phone only: no contact forms and no email on the site. "If we don't answer, leave a message and we'll return your call within 24 hours."
- No metal roofing.
- ROC #096629
