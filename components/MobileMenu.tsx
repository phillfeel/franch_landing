"use client";

import { useEffect, useState } from "react";

// Мобильное меню шапки: кнопка «Меню» раскрывает панель под шапкой, клик по пункту или Esc её закрывает.
export function MobileMenu({
  links,
  auditHref,
  telegram,
  cta,
}: {
  links: { href: string; label: string }[];
  auditHref: string;
  telegram: string;
  cta: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Закрыть" : "Меню"}
      </button>
      <nav id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} aria-label="Мобильное меню" hidden={!open}>
        {links.map((n) => (
          <a key={n.href} href={n.href} onClick={close}>{n.label}</a>
        ))}
        <div className="mobile-menu__actions">
          <a href={telegram} className="btn btn--ghost" target="_blank" rel="noopener">Telegram</a>
          <a href={auditHref} className="btn btn--dark" onClick={close}>
            <span className="dot" aria-hidden="true" />
            {cta}
          </a>
        </div>
      </nav>
    </>
  );
}
