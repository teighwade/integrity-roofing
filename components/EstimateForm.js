'use client';
import { useState } from 'react';
import { B, HOURS, TEL } from '../lib/site';

// Sends through Web3Forms (free) to the office email. Set NEXT_PUBLIC_WEB3FORMS_KEY in Vercel.
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function EstimateForm() {
  const [state, setState] = useState('idle');
  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.botcheck) return;
    if (!KEY) { setState('nokey'); return; }
    setState('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: KEY, subject: `Estimate request from ${data.name}`, from_name: 'integrityroofingaz.com', ...data }),
      });
      const json = await res.json();
      setState(json.success ? 'sent' : 'error');
      if (json.success) e.target.reset();
    } catch { setState('error'); }
  }
  if (state === 'sent') {
    return <p className="form__status form__status--ok" role="status">Thanks. Your request was sent. The office will call you to schedule your estimate ({HOURS}).</p>;
  }
  return (
    <form className="form" onSubmit={submit}>
      <div className="form__row">
        <label>Name<input name="name" autoComplete="name" required /></label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <div className="form__row">
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>City<input name="city" autoComplete="address-level2" placeholder="Gilbert, Mesa, Chandler…" /></label>
      </div>
      <div className="form__row">
        <label>Property type
          <select name="property_type" defaultValue="Home">
            <option>Home</option><option>Business</option><option>Multi-family</option><option>HOA</option>
          </select>
        </label>
        <label>Roof type
          <select name="roof_type" defaultValue="Not sure">
            <option>Not sure</option><option>Tile</option><option>Shingle</option><option>Foam</option><option>Flat</option><option>Metal</option><option>Coating</option>
          </select>
        </label>
      </div>
      <label>What's going on with your roof?<textarea name="message" required placeholder="A leak over the living room, broken tiles after a storm, an older roof you want checked…" /></label>
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state === 'error' && <p className="form__status form__status--err" role="alert">The request didn't go through. Try again, or call the office at <a href={TEL}>{B.phone}</a>.</p>}
      {state === 'nokey' && <p className="form__status form__status--err" role="alert">Online requests aren't switched on yet. Call the office at <a href={TEL}>{B.phone}</a> or email <a href={`mailto:${B.email}`}>{B.email}</a>.</p>}
      <button className="btn btn--sun" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Request an estimate'}</button>
      <p className="form__note">We use your details only to reply to this request. See our <a href="/privacy-policy/">privacy policy</a>.</p>
    </form>
  );
}
