"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseSlide } from "@/lib/content";

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "prev" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Карусель скриншотов кейса: описание и результаты меняются вместе со слайдом, клик по картинке открывает её крупно.
export function CaseSlider({ slides }: { slides: CaseSlide[] }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const slide = slides[active];
  const last = slides.length - 1;
  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(last, i + 1));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowLeft") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setActive((i) => Math.min(last, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last]);

  const nav = (
    <>
      <button type="button" className="case-slider__nav case-slider__nav--prev" onClick={prev} disabled={active === 0} aria-label="Предыдущий слайд">
        <Arrow dir="prev" />
      </button>
      <button type="button" className="case-slider__nav case-slider__nav--next" onClick={next} disabled={active === last} aria-label="Следующий слайд">
        <Arrow dir="next" />
      </button>
    </>
  );

  return (
    <div className="case-slider">
      <div className="case-slider__stage">
        <button type="button" className="case-slider__shot" onClick={() => dialogRef.current?.showModal()} aria-label="Открыть скриншот крупно">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.src} alt={slide.alt} width={1600} height={894} loading="lazy" />
        </button>
        {nav}
      </div>

      <div className="case-slider__dots" role="tablist" aria-label="Слайды кейса">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Слайд ${i + 1}`}
            className={`case-slider__dot${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <div className="case-slider__text">
        <p className="case-slider__desc">{slide.description}</p>
        <div>
          <h4 className="case-slider__results-title">{slide.resultsTitle}</h4>
          <ul className="case-slider__results">
            {slide.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="case-lightbox"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      >
        <div className="case-lightbox__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.src} alt={slide.alt} />
          {nav}
          <button type="button" className="case-lightbox__close" onClick={() => dialogRef.current?.close()} aria-label="Закрыть">
            ×
          </button>
        </div>
      </dialog>
    </div>
  );
}
