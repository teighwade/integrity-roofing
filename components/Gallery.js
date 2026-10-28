'use client';
import { useRef, useState } from 'react';

export default function Gallery({ images }) {
  const dlg = useRef(null);
  const [i, setI] = useState(0);
  const open = (n) => { setI(n); dlg.current?.showModal(); };
  const go = (d) => setI((i + d + images.length) % images.length);
  return (
    <>
      <div className="gallery">
        {images.map((im, n) => (
          <button key={im.url} type="button" onClick={() => open(n)} aria-label={`View larger: ${im.alt}`}>
            <img src={im.url} alt={im.alt} loading="lazy" />
          </button>
        ))}
      </div>
      <dialog className="lightbox" ref={dlg} onClick={(e) => e.target === dlg.current && dlg.current.close()}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}>
        {images[i] && <img src={images[i].url} alt={images[i].alt} />}
        <div className="lightbox__bar">
          <button className="btn btn--sun" type="button" onClick={() => go(-1)}>Previous</button>
          <button className="btn btn--sun" type="button" onClick={() => dlg.current.close()}>Close</button>
          <button className="btn btn--sun" type="button" onClick={() => go(1)}>Next</button>
        </div>
      </dialog>
    </>
  );
}
