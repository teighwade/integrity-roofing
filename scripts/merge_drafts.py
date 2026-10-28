"""Merge writer drafts (content/drafts/*.json) into the site's content files, then scan for rule breaks."""
import json, glob, os, re, sys
D = 'content/drafts'
load = lambda f: json.load(open(f))
exists = lambda f: os.path.exists(f)

site = load('content/site.json')
for f in sorted(glob.glob(f'{D}/expand-*.json')):
    for slug, page in load(f)['pages'].items():
        old = site['pages'].get(slug)
        if old is None:
            print('!! unknown page', slug, 'in', f); continue
        lost = [k for k in old if k not in page]
        if lost: print(f'!! {slug} dropped keys {lost}; keeping old values'); [page.setdefault(k, old[k]) for k in lost]
        site['pages'][slug] = page
json.dump(site, open('content/site.json', 'w'), ensure_ascii=False, indent=1)

areas = load('content/areas.json')
if exists(f'{D}/cities.json'):
    cities = load(f'{D}/cities.json')
    areas['hub'] = next((c for c in cities if c['slug'] == 'roofing'), None)
    areas['cities'] = [c for c in cities if c['slug'] != 'roofing']
    for c in areas['cities']:
        c['city'] = c.get('city') or c['slug'].split('-')[0].title()
hoods = []
for f in sorted(glob.glob(f'{D}/hoods-*.json')):
    hoods += load(f)
seen = set()
for h in hoods:
    key = (h['city'], h['slug'])
    if key in seen: print('!! duplicate neighborhood', key)
    seen.add(key)
areas['neighborhoods'] = hoods
json.dump(areas, open('content/areas.json', 'w'), ensure_ascii=False, indent=1)

if exists(f'{D}/faq-hub.json'):
    json.dump(load(f'{D}/faq-hub.json'), open('content/faq.json', 'w'), ensure_ascii=False, indent=1)

res = load('content/resources.json')
guides = []
for f in (f'{D}/guides-a.json', f'{D}/guides-b.json'):
    if exists(f): guides += load(f)
res['guides'] = guides
if exists(f'{D}/library-extras.json'):
    x = load(f'{D}/library-extras.json'); res['glossary'] = x['glossary']; res['links'] = x['links']
if exists(f'{D}/resources-pages.json'):
    res.update(load(f'{D}/resources-pages.json'))
res.pop('pricing', None)
json.dump(res, open('content/resources.json', 'w'), ensure_ascii=False, indent=1)

if exists(f'{D}/newsletters.json'):
    json.dump(load(f'{D}/newsletters.json'), open('content/newsletters.json', 'w'), ensure_ascii=False, indent=1)

# ---- Rule scan over everything a visitor can read ----
BAD = [r'free (roof )?(estimate|inspection|quote|consultation)', r'inspect(s|ion)? for free', r'no[- ]cost', r'complimentary',
       r'metal roof', r'metal roofing', r'\bmetal\b(?! flashing)', r'24/7', r'after[- ]hours', r'\bforms?\b', r'fill out', r'submit',
       r'480-384', r'Pecos', r'Chandler, AZ 85224']
hits = 0
for f in ['content/site.json', 'content/areas.json', 'content/faq.json', 'content/resources.json', 'content/newsletters.json']:
    text = open(f).read()
    for pat in BAD:
        for m in re.finditer(pat, text, re.I):
            ctx = text[max(0, m.start() - 70): m.end() + 70].replace('\n', ' ')
            if 'url' in ctx and pat == r'\bforms?\b': continue
            print(f'RULE {f}: /{pat}/ …{ctx}…'); hits += 1
print('rule hits:', hits)
print('neighborhoods:', len(hoods), 'cities:', len(areas['cities']), 'guides:', len(guides),
      'faq hub:', sum(len(c['faqs']) for c in load('content/faq.json')['categories']), 'issues:', len(load('content/newsletters.json')))
