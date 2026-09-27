"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { deckSlides as DeckSlides } from "@/components/deckSlides";

type Slides = typeof DeckSlides;

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

// Кнопка «презентация» в карточке продукта: открывает слайды кейса поверх страницы.
// Слайды свёрстаны в 1920×1080 и масштабируются целиком под размер окна;
// их разметка подгружается отдельным чанком только при первом открытии.
export function DeckButton({ label, title }: { label: string; title: string }) {
  const [slides, setSlides] = useState<Slides | null>(null);
  const [active, setActive] = useState(0);
  const [scale, setScale] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = slides?.length ?? 0;
  const go = (step: number) => count && setActive((i) => (i + step + count) % count);

  const open = async () => {
    if (!slides) setSlides((await import("@/components/deckSlides")).deckSlides);
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !count) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !slides) return;
    setScale(viewport.clientWidth / 1920);
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [slides]);

  return (
    <>
      <button type="button" className="product__deck" onClick={open}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className="case-lightbox deck"
        aria-label={title}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      >
        {slides && (
          <div className="case-lightbox__inner">
            <div
              ref={viewportRef}
              className="deck__viewport"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              }}
            >
              <div
                className="deck__stage"
                style={{ transform: `scale(${scale})` }}
                role="group"
                aria-roledescription="слайд"
                aria-label={`${active + 1} из ${count}: ${slides[active].label}`}
                dangerouslySetInnerHTML={{ __html: slides[active].html }}
              />
            </div>
            <div className="case-lightbox__bar">
              <button type="button" className="case-lightbox__nav" onClick={() => go(-1)} aria-label="Предыдущий слайд">
                <Arrow dir="prev" />
              </button>
              <span>
                {slides[active].label} · {active + 1}/{count}
              </span>
              <button type="button" className="case-lightbox__nav" onClick={() => go(1)} aria-label="Следующий слайд">
                <Arrow dir="next" />
              </button>
            </div>
            <p className="deck__hint">Поверните телефон горизонтально — так слайды крупнее</p>
            <button type="button" className="case-lightbox__close" onClick={() => dialogRef.current?.close()} aria-label="Закрыть">
              ×
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
