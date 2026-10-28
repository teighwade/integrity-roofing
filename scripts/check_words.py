"""Count the visible words a page shows (h1, lead, answer, sections, bullets, features, steps, table, FAQs).
Usage: python3 scripts/check_words.py FILE.json [min_words]
FILE may hold one page object, a list of page objects, or {"pages": {...}} / {"items": [...]} maps."""
import json, re, sys, html

def words(s):
    s = html.unescape(re.sub(r'<[^>]+>', ' ', s or ''))
    return len(re.findall(r"[A-Za-z0-9][A-Za-z0-9'’.,%$–-]*", s))

def page_words(p):
    n = sum(words(p.get(k)) for k in ('h1', 'lead', 'answer', 'intro'))
    for s in p.get('sections') or []:
        n += words(s.get('h2')) + words(s.get('body')) + sum(words(b) for b in s.get('bullets') or [])
    for f in p.get('features') or []:
        n += sum(words(x) for x in f[1:])
    for st in p.get('steps') or []:
        n += sum(words(x) for x in st)
    t = p.get('table')
    if t:
        n += sum(words(c) for r in t.get('rows', []) for c in r)
    for f in p.get('faqs') or []:
        q, a = (f[0], f[1]) if isinstance(f, list) else (f.get('q'), f.get('a'))
        n += words(q) + words(a)
    for k, v in (p.get('facts') or {}).items():
        n += words(str(v))
    return n

def iter_pages(d):
    if isinstance(d, list):
        for p in d: yield p.get('slug') or p.get('h1'), p
    elif 'pages' in d and isinstance(d['pages'], dict):
        for k, p in d['pages'].items(): yield k, p
    elif 'items' in d:
        yield from iter_pages(d['items'])
    else:
        yield d.get('slug') or d.get('h1'), d

if __name__ == '__main__':
    data = json.load(open(sys.argv[1]))
    floor = int(sys.argv[2]) if len(sys.argv) > 2 else 800
    bad = 0
    for k, p in iter_pages(data):
        n = page_words(p)
        flag = '' if n >= floor else '  <-- under %d' % floor
        bad += n < floor
        print(f'{n:5d}  {k}{flag}')
    print(f'{bad} page(s) under {floor} words')
