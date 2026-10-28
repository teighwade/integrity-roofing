// One-time import of blog posts, the privacy policy and every photo/video from the WordPress site.
// Runs in GitHub Actions (.github/workflows/import-wordpress.yml), then commits the results.
//   content/posts.json, content/privacy.json, public/wp-content/uploads/**
import fs from 'node:fs/promises';
import path from 'node:path';
import sanitizeHtml from 'sanitize-html';

const SOURCES = [process.env.WP_SOURCE || 'https://1303603.us6.myftpupload.com', 'https://integrityroofingaz.com'];
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const site = JSON.parse(await fs.readFile(path.join(ROOT, 'content/site.json'), 'utf8'));
const SKIP = new Set([...site.demoSlugs, ...site.pageLikePosts]);
const MAX_BYTES = 90 * 1024 * 1024; // GitHub refuses files over 100 MB

const decode = (s = '') => s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&hellip;/g, '…').replace(/&[rl]squo;/g, "'").replace(/&[rl]dquo;/g, '"').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—');
const text = (html = '') => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const clip = (s, n = 160) => (s.length <= n ? s : `${s.slice(0, n).replace(/\s+\S*$/, '').replace(/[,;:–—-]$/, '')}…`);

async function getJson(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'integrity-roofing-import' } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return { json: await r.json(), pages: Number(r.headers.get('x-wp-totalpages') || 1) };
}

async function fromAnySource(fn) {
  for (const base of SOURCES) {
    try { return { base, data: await fn(base) }; } catch (e) { console.warn(`  ${base}: ${e.message}`); }
  }
  throw new Error('No WordPress source reachable');
}

function relativize(html) {
  let out = html;
  for (const base of SOURCES) out = out.split(base).join('').split(base.replace('https://', 'http://')).join('');
  return out.replace(/https?:\/\/(www\.)?integrityroofingaz\.com/g, '');
}

function clean(html) {
  const out = sanitizeHtml(relativize(html), {
    allowedTags: ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'b', 'i', 'img', 'figure', 'figcaption', 'blockquote', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'iframe'],
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt', 'width', 'height'], iframe: ['src', 'title', 'allowfullscreen'], th: ['scope'] },
    allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com', 'www.facebook.com'],
    transformTags: { h1: 'h2', h5: 'h4', h6: 'h4' },
    exclusiveFilter: (f) => ['p', 'h2', 'h3', 'h4', 'li', 'figure'].includes(f.tag) && !f.text.trim() && !(f.mediaChildren || []).length,
  });
  return out.replace(/<img /g, '<img loading="lazy" ').replace(/\n{2,}/g, '\n').trim();
}

// ---- Posts ----
console.log('Fetching posts…');
const { base: postBase, data: rawPosts } = await fromAnySource(async (base) => {
  const all = [];
  let page = 1, total = 1;
  do {
    const { json, pages } = await getJson(`${base}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=wp:featuredmedia`);
    all.push(...json); total = pages; page++;
  } while (page <= total);
  return all;
});
console.log(`  ${rawPosts.length} posts from ${postBase}`);

const posts = rawPosts.filter((p) => !SKIP.has(p.slug)).map((p) => {
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  const html = clean(p.content?.rendered || '');
  const yoast = p.yoast_head_json || {};
  const title = decode(p.title?.rendered || p.slug);
  return {
    slug: p.slug,
    title,
    seoTitle: yoast.title ? decode(yoast.title).replace(/\s*[-–|]\s*Integrity Roofing\s*$/i, '') + ' | Integrity Roofing' : undefined,
    date: p.date,
    modified: p.modified,
    description: clip(text(yoast.description || p.excerpt?.rendered || html)),
    excerpt: clip(text(p.excerpt?.rendered || html), 150),
    image: media?.source_url ? relativize(media.source_url) : null,
    imageAlt: media?.alt_text || title,
    html,
  };
});
await fs.writeFile(path.join(ROOT, 'content/posts.json'), JSON.stringify(posts, null, 1));

// ---- Privacy policy ----
try {
  const { data } = await fromAnySource(async (base) => (await getJson(`${base}/wp-json/wp/v2/pages?slug=privacy-policy`)).json);
  const html = data[0] ? clean(data[0].content.rendered) : '';
  // WordPress's sample policy ("Suggested text: …") is demo content; keep the site's own policy instead.
  if (!html || /Suggested text/i.test(html)) throw new Error('WordPress has only the sample policy');
  await fs.writeFile(path.join(ROOT, 'content/privacy.json'), JSON.stringify({ html }));
  console.log(`Privacy policy: ${html.length} characters`);
} catch (e) { console.warn(`Privacy policy not imported: ${e.message}`); }

// ---- Media ----
const urls = new Set();
for (const im of Object.values(site.images)) urls.add(im.url);
for (const p of Object.values(site.pages)) for (const v of p.videos || []) if (v.mp4) urls.add(v.mp4);
for (const p of posts) {
  if (p.image) urls.add(p.image);
  for (const m of p.html.matchAll(/src="(\/wp-content\/uploads\/[^"]+)"/g)) urls.add(m[1]);
}
console.log(`Downloading ${urls.size} media files…`);
let ok = 0;
const failed = [];
for (const u of urls) {
  const dest = path.join(ROOT, 'public', decodeURIComponent(u.split('?')[0]));
  try { await fs.access(dest); ok++; continue; } catch {}
  let done = false;
  for (const base of SOURCES) {
    try {
      const r = await fetch(base + u);
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length > MAX_BYTES) { failed.push(`${u} (too large: ${(buf.length / 1e6).toFixed(0)} MB)`); done = true; break; }
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.writeFile(dest, buf);
      ok++; done = true; break;
    } catch {}
  }
  if (!done) failed.push(u);
}
console.log(`Media: ${ok} saved, ${failed.length} missing`);
if (failed.length) console.log(failed.map((f) => `  missing: ${f}`).join('\n'));
