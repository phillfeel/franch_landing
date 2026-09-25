"use client";

import { useEffect, useState } from "react";

// Нижняя sticky-плашка на мобайле: появляется после первого экрана и прячется, когда видна форма.
export function MobileCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("audit");
    let formVisible = false;
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8 && !formVisible);
    const io = form
      ? new IntersectionObserver(([e]) => {
          formVisible = e.isIntersecting;
          update();
        })
      : null;
    if (form && io) io.observe(form);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      io?.disconnect();
    };
  }, []);

  return (
    <div className={`mobile-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#audit" className="btn btn--primary btn--block" tabIndex={visible ? 0 : -1}>
        {label}
      </a>
    </div>
  );
}
