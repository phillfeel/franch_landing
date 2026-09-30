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

// Скриншоты кейса в тёмной панели: вкладки сверху переключают экран, клик по кадру открывает его во весь экран.
export function CaseSlider({ slides }: { slides: CaseSlide[] }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const slide = slides[active];
  const count = slides.length;
  const go = (step: number) => setActive((i) => (i + step + count) % count);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  return (
    <div className="case-panel">
      <div className="case-panel__tabs" role="tablist" aria-label="Экраны кейса">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="case-shot"
            onClick={() => setActive(i)}
          >
            {s.caption}
          </button>
        ))}
      </div>
      <button
        id="case-shot"
        type="button"
        className="case-panel__shot"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${slide.caption}: открыть скриншот крупно`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slide.src} alt={slide.alt} width={1600} height={894} loading="lazy" />
        <span className="case-panel__zoom" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Увеличить
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="case-lightbox"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      >
        <div className="case-lightbox__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.src} alt={slide.alt} />
          <div className="case-lightbox__bar">
            <button type="button" className="case-lightbox__nav" onClick={() => go(-1)} aria-label="Предыдущий скриншот">
              <Arrow dir="prev" />
            </button>
            <span>
              {slide.caption} · {active + 1}/{count}
            </span>
            <button type="button" className="case-lightbox__nav" onClick={() => go(1)} aria-label="Следующий скриншот">
              <Arrow dir="next" />
            </button>
          </div>
          <button type="button" className="case-lightbox__close" onClick={() => dialogRef.current?.close()} aria-label="Закрыть">
            ×
          </button>
        </div>
      </dialog>
    </div>
  );
}
