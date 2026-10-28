# Integrity Roofing website

The integrityroofingaz.com website. It's built with Next.js and hosted on Vercel. The domain stays registered at GoDaddy.

## Where things live

| What | Where |
|---|---|
| Page text, FAQs, business details, navigation, photo list | `content/site.json` |
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
   - `NEXT_PUBLIC_WEB3FORMS_KEY`: the estimate form's key. To get one, enter office.integrityroofing@gmail.com at web3forms.com and the key is emailed to that address. Form requests then go to that inbox.
   - `SITE_LIVE` = `true`: set this only when you're ready for Google to index the site. Until then the site tells search engines not to index it.
   - `BING_SITE_VERIFICATION` (optional): the code from Bing Webmaster Tools.
4. **Point the domain at Vercel.** In Vercel go to **Settings → Domains** and add `integrityroofingaz.com` and `www.integrityroofingaz.com`. In GoDaddy DNS, change the `@` A record and the `www` CNAME to the values Vercel shows. Don't change the nameservers or the MX or other email records.
5. **Tell the search engines.** Resubmit `https://integrityroofingaz.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Business facts used everywhere

- One office: 16308 E Fairview St, Gilbert, AZ 85295
- Hours: Monday to Friday, 7 am to 5 pm. There's no after-hours number.
- Always "estimates", never "free estimates".
- ROC #096629
