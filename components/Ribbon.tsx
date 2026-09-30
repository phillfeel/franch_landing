"use client";

import { useEffect, useRef, useState } from "react";

// Горизонтальная лента карточек: прокрутка пальцем/колёсиком и стрелками. Стрелка гаснет, когда лента дошла до края.
// Карточки рендерятся на сервере и приходят сюда как children.
export function Ribbon({ children, head, label }: { children: React.ReactNode; head: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(420, el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="ribbon">
      <div className="container ribbon__head">
        {head}
        <div className="ribbon__controls">
          <button type="button" className="arrow-btn" onClick={() => scroll(-1)} disabled={edge.start} aria-label="Назад">
            ←
          </button>
          <button type="button" className="arrow-btn arrow-btn--dark" onClick={() => scroll(1)} disabled={edge.end} aria-label="Вперёд">
            →
          </button>
        </div>
      </div>
      <div ref={ref} className="ribbon__scroller" role="region" aria-label={label} tabIndex={0}>
        <div className="ribbon__track">{children}</div>
      </div>
    </div>
  );
}
