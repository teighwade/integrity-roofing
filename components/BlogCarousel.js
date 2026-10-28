'use client';
import { useRef } from 'react';
import Icon from './Icon';

// Horizontal, swipeable row of the latest blog posts with previous/next buttons.
export default function BlogCarousel({ posts }) {
  const track = useRef(null);
  const move = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({ left: dir * ((card?.offsetWidth || 320) + 20), behavior: 'smooth' });
  };
  return (
    <div className="carousel">
      <ul className="carousel__track" ref={track} tabIndex={0} aria-label="Latest blog posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <a className="post-card" href={`/${p.slug}/`}>
              <div className="post-card__img">{p.image && <img src={p.image} alt="" loading="lazy" />}</div>
              <time dateTime={p.date}>{p.dateLabel}</time>
              <h3>{p.title}</h3>
              {p.excerpt && <p>{p.excerpt}</p>}
            </a>
          </li>
        ))}
      </ul>
      <div className="carousel__nav">
        <button type="button" className="carousel__btn" onClick={() => move(-1)} aria-label="Previous posts"><Icon name="arrow" size={20} className="flip" /></button>
        <button type="button" className="carousel__btn" onClick={() => move(1)} aria-label="Next posts"><Icon name="arrow" size={20} /></button>
      </div>
    </div>
  );
}
