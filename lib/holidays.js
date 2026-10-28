// Holiday and season themes. The site checks today's date in Arizona time when a page loads and,
// inside a holiday's window, shows that holiday's banner and accent colors. Nothing to update each year:
// moving holidays (Easter, Thanksgiving, Memorial Day...) are calculated.

const nthWeekday = (y, m, weekday, n) => { // n-th weekday (0=Sun) of month m (0-based)
  const first = new Date(Date.UTC(y, m, 1)).getUTCDay();
  return 1 + ((weekday - first + 7) % 7) + (n - 1) * 7;
};
const lastWeekday = (y, m, weekday) => {
  const last = new Date(Date.UTC(y, m + 1, 0));
  return last.getUTCDate() - ((last.getUTCDay() - weekday + 7) % 7);
};
function easter(y) { // Anonymous Gregorian algorithm
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return [month - 1, day];
}
const d = (y, m, day) => Date.UTC(y, m, day);
const span = (y, m, day, before = 0, after = 0) => [d(y, m, day - before), d(y, m, day + after)];

// Each theme: id, window [start, end] (inclusive, UTC dates), title, message, link, and colors.
export function themesFor(y) {
  const [em, ed] = easter(y);
  const thanksgiving = nthWeekday(y, 10, 4, 4);
  return [
    { id: 'newyear', when: [d(y, 0, 1), d(y, 0, 2)], title: 'Happy New Year', text: 'New year, new plan for your roof. Start with our month-by-month maintenance calendar.', href: '/resources/library/roof-maintenance-calendar/', cta: 'See the calendar', colors: ['#1d2a5c', '#f2c94c'], art: 'stars' },
    { id: 'mlk', when: span(y, 0, nthWeekday(y, 0, 1, 3)), title: 'Martin Luther King Jr. Day', text: 'Honoring Dr. King and his legacy of service today.', colors: ['#2d3a4a', '#e8d9b5'], art: 'dove' },
    { id: 'valentines', when: span(y, 1, 14, 4), title: "Happy Valentine's Day", text: 'Show your home some love: a quick look from the ground can catch cracked tiles before spring.', href: '/resources/library/safe-diy-roof-checks/', cta: 'Safe roof checks', colors: ['#8c1d3f', '#ffb3c7'], art: 'hearts' },
    { id: 'presidents', when: span(y, 1, nthWeekday(y, 1, 1, 3)), title: "Happy Presidents' Day", text: 'Enjoy the long weekend from all of us at Integrity Roofing.', colors: ['#1f3a68', '#e04a4a'], art: 'stars' },
    { id: 'stpatricks', when: span(y, 2, 17, 3), title: "Happy St. Patrick's Day", text: "No luck needed: a spring roof inspection before monsoon season is the surest bet.", href: '/roof-inspections/', cta: 'Roof inspections', colors: ['#0f5132', '#7ed957'], art: 'clover' },
    { id: 'spring', when: span(y, 2, 20, 0, 1), title: 'Welcome, spring', text: 'Spring is the best time to have your roof checked before the heat and the storms.', href: '/roof-inspections/', cta: 'Plan an inspection', colors: ['#2f6b3a', '#ffd66b'], art: 'flower' },
    { id: 'easter', when: span(y, em, ed, 2), title: 'Happy Easter', text: 'Wishing you a peaceful Easter weekend from our family to yours.', colors: ['#5b4a8b', '#ffe08a'], art: 'flower' },
    { id: 'mothers', when: span(y, 4, nthWeekday(y, 4, 0, 2), 1), title: "Happy Mother's Day", text: 'To every mom keeping a home running: thank you.', colors: ['#7a2e5c', '#ffc1d9'], art: 'flower' },
    { id: 'memorial', when: span(y, 4, lastWeekday(y, 4, 1), 3), title: 'Memorial Day', text: 'Remembering those who gave their lives in service to our country.', colors: ['#1c2f55', '#c8102e'], art: 'flag' },
    { id: 'monsoon', when: span(y, 5, 15, 0, 3), title: 'Monsoon season starts June 15', text: 'Clear valleys and scuppers, trim branches, and know what to check after the first storm.', href: '/resources/library/monsoon-roof-prep-checklist/', cta: 'Monsoon checklist', colors: ['#24323f', '#8fd3ff'], art: 'storm' },
    { id: 'fathers', when: span(y, 5, nthWeekday(y, 5, 0, 3), 1), title: "Happy Father's Day", text: 'To every dad who has climbed a ladder to look at the roof: we can take it from here.', colors: ['#1f3d5c', '#f6b321'], art: 'stars' },
    { id: 'summer', when: span(y, 5, 21, 0, 1), title: 'First day of summer', text: 'Arizona heat is hard on underlayment and shingles. Learn how attic heat ages a roof.', href: '/resources/library/attic-heat-and-roof-ventilation/', cta: 'Attic heat guide', colors: ['#b4410f', '#ffd166'], art: 'sun' },
    { id: 'july4', when: [d(y, 6, 1), d(y, 6, 4)], title: 'Happy Fourth of July', text: 'Enjoy the fireworks. If a stray one lands on your roof, give us a call.', colors: ['#1c2f6b', '#e63946'], art: 'fireworks' },
    { id: 'labor', when: span(y, 8, nthWeekday(y, 8, 1, 1), 3), title: 'Happy Labor Day', text: 'Thank you to every hardworking crew across the Valley, including ours.', colors: ['#3a3f47', '#f6b321'], art: 'stars' },
    { id: 'fall', when: span(y, 8, 22, 0, 1), title: 'Welcome, fall', text: 'Monsoon season is over at the end of September. Time for a post-storm roof check.', href: '/roof-inspections/', cta: 'Roof inspections', colors: ['#7a3b12', '#f2a541'], art: 'leaf' },
    { id: 'halloween', when: span(y, 9, 31, 7), title: 'Happy Halloween', text: "The only thing that should be scary this month is the decorations, not your roof.", href: '/repairs-and-maintenance/', cta: 'Roof repair', colors: ['#2b1a3d', '#ff8c1a'], art: 'pumpkin' },
    { id: 'veterans', when: span(y, 10, 11, 1), title: "Veterans Day", text: 'Thank you to every veteran for your service.', colors: ['#1c2f55', '#c8102e'], art: 'flag' },
    { id: 'thanksgiving', when: span(y, 10, thanksgiving, 3, 1), title: 'Happy Thanksgiving', text: 'We are thankful for 30-plus years of Valley homeowners trusting us with their roofs.', colors: ['#6b3410', '#f2a541'], art: 'leaf' },
    { id: 'lights', when: [d(y, 10, thanksgiving + 2), d(y, 11, 14)], title: 'Hanging holiday lights?', text: 'Use clips, not nails or staples, and never walk on tile roofs.', href: '/newsletter/', cta: 'Newsletter tips', colors: ['#14402f', '#f2c94c'], art: 'lights' },
    { id: 'winter', when: [d(y, 11, 15), d(y, 11, 31)], title: 'Happy winter holidays', text: 'Warm wishes from the Integrity Roofing family. Winter rain is coming: know the signs of a leak.', href: '/repairs-and-maintenance/', cta: 'Leak signs', colors: ['#16324f', '#e8f1ff'], art: 'snow' },
  ];
}

// Arizona has no daylight saving time, so it is always UTC-7.
export function arizonaToday(now = new Date()) {
  const az = new Date(now.getTime() - 7 * 3600 * 1000);
  return Date.UTC(az.getUTCFullYear(), az.getUTCMonth(), az.getUTCDate());
}

export function currentTheme(now = new Date()) {
  const t = arizonaToday(now);
  const y = new Date(t).getUTCFullYear();
  // Shorter, more specific windows win when two overlap (e.g. Easter inside spring).
  const hits = themesFor(y).filter((h) => t >= h.when[0] && t <= h.when[1]);
  hits.sort((a, b) => (a.when[1] - a.when[0]) - (b.when[1] - b.when[0]));
  return hits[0] || null;
}
