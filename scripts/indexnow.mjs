// Tells Bing and other IndexNow search engines about every URL in the live sitemap.
const HOST = 'integrityroofingaz.com';
const KEY = 'c6d1d7c9cffdfecfa1e964a6d0c4771a'; // must match public/c6d1d7c9cffdfecfa1e964a6d0c4771a.txt
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) { console.log('Sitemap not live yet; skipping.'); process.exit(0); }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, status ${res.status}`);
