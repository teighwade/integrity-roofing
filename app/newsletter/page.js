import Icon from '../../components/Icon';
import { Crumbs, Cta, Faq } from '../../components/Blocks';
import { IssueFeature } from '../../components/ResourceBlocks';
import { ISSUES, CURRENT_ISSUE, monthName } from '../../lib/content';
import { SITE_URL } from '../../lib/site';

const title = 'The Integrity Roofing Monthly: Arizona Roof Tips | Integrity Roofing';
const desc = 'A monthly newsletter of seasonal roofing tips and safe DIY checks for Phoenix Valley homeowners, with monsoon-season advice every summer.';
export const metadata = { title: { absolute: title }, description: desc, alternates: { canonical: `${SITE_URL}/newsletter/` } };

export default function NewsletterIndex() {
  return (
    <>
      <section className="phero phero--noimg">
        <div className="wrap">
          <Crumbs items={[{ name: 'Resource center', href: '/resources/' }, { name: 'Newsletter', href: '/newsletter/' }]} />
          <h1>The Integrity Roofing Monthly</h1>
          <p className="phero__lead">A new issue every month with roofing tips matched to the season in the Phoenix Valley. Every summer issue covers monsoon season.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          {CURRENT_ISSUE ? <IssueFeature /> : <p className="empty">The first issue is on the way.</p>}
          {ISSUES.length > 1 && (
            <>
              <div className="head" style={{ marginTop: 56 }}><h2>Past issues</h2></div>
              <ul className="issue-list">
                {ISSUES.slice(1).map((n) => (
                  <li key={n.slug}><a href={`/newsletter/${n.slug}/`}><span>{monthName(n.month)}</span><strong>{n.headline || n.h1}</strong><Icon name="arrow" size={16} /></a></li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <section className="section section--sky">
        <div className="wrap split split--text">
          <div className="prose">
            <h2>What&apos;s in every issue</h2>
            <p>Each month&apos;s newsletter is written for homeowners in Gilbert, Mesa, Chandler and the rest of the Phoenix Valley. It focuses on what your roof is going through right now: summer heat, monsoon wind and rain, cooler fall weather, or winter storms. You&apos;ll find a main story on the season&apos;s biggest roofing issue, a safe do-it-yourself tip you can handle from the ground or the attic, a quick checklist, a &quot;Did you know?&quot; fact, and answers to a few common questions.</p>
            <p>The DIY tips are meant to help you spot problems early, not to send you up a ladder. Walking on a tile roof can crack tiles, and Arizona roofs get dangerously hot for much of the year. When something needs a closer look, the newsletter says so, and you can call the office at 602-548-3770.</p>
            <h2>A year of roof care, month by month</h2>
            <p>The issues follow the Arizona calendar. Fall issues look at what the summer heat did to your roof and how to get ready for winter rain. Winter issues cover leaks, holiday decorating without damaging tile, and planning roof work for the new year. Spring issues are about inspections and repairs before the heat and the storms arrive.</p>
            <p>Every summer issue, from June through September, is about monsoon season, which runs from June 15 to September 30. Each one takes a different angle: preparing before the first storm, watching your roof during storm season, checking for damage afterward, documenting damage for insurance, and scheduling an end-of-season inspection.</p>
            <ul>
              <li><strong>Fall (October and November):</strong> after-summer roof checks, gutters and valleys, holiday lights without nails or staples.</li>
              <li><strong>Winter (December to February):</strong> winter rain leaks, attic checks, and tile underlayment awareness.</li>
              <li><strong>Spring (March to May):</strong> spring inspections, ventilation before the heat, and final pre-monsoon prep.</li>
              <li><strong>Summer (June to September):</strong> monsoon season, every issue.</li>
            </ul>
            <h2>How to use the newsletter</h2>
            <p>Read the current issue at the start of each month and run through its checklist. Keep notes and photos of what you see, so you can compare from one season to the next and show a roofer what changed. Past issues stay here, so you can go back to the monsoon or winter issues when that season comes around again.</p>
            <p>Each issue also points to the local information on our site. If you live in Gilbert, Mesa or Chandler, the <a href="/roofing/">service area pages</a> describe the neighborhoods we serve, when their homes were built, and what that usually means for the roof. Homes built in the same years tend to need the same kind of work at about the same time, so it helps to know where your neighborhood fits before you call for an estimate.</p>
            <p>For deeper reading, the <a href="/resources/library/">homeowner library</a> has full guides on the same topics, the <a href="/faq/">roofing FAQ</a> answers hundreds of questions, and the <a href="/resources/roofing-cost-guide/">roofing cost guide</a> shows typical Phoenix-area price ranges.</p>
          </div>
        </div>
      </section>
      <Faq faqs={[
        ['How often is the Integrity Roofing newsletter published?', 'A new issue is published at the start of every month, and the current issue is featured on our home page during its month.'],
        ['What topics does the newsletter cover?', 'Seasonal roof care for the Phoenix Valley: heat, monsoon storms, winter rain, inspections, tile underlayment, ventilation and safe DIY checks. Every summer issue focuses on monsoon season.'],
        ['Are the DIY tips safe to do myself?', 'They are written to be done from the ground, from a ladder at the gutter line only if you are comfortable, or from inside the attic. We never recommend walking on a tile roof or going on any roof in summer heat.'],
        ['Can I read past issues?', 'Yes. Every past issue stays on this page, so you can revisit the monsoon issues each summer or the winter issues when the rain starts.'],
        ['Is the newsletter about Integrity Roofing promotions?', "No. It's practical roofing information for homeowners. It doesn't advertise discounts or promotions."],
        ['Who do I call if the newsletter checklist turns up a problem?', "Call our office at 602-548-3770, Monday to Friday, 7 am to 5 pm. If we don't answer, leave a message and we'll return your call within 24 hours."],
      ]} title="Newsletter questions" />
      <Cta />
    </>
  );
}
