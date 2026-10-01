import { site, nav } from "@/lib/content";
import { MobileMenu } from "./MobileMenu";

// Шапка, подвал и общие элементы всех страниц. На внутренних страницах якоря меню ведут на главную ("/#solutions").
// auditHref — куда ведёт кнопка заявки: на странице без своей формы — на форму главной ("/#audit").

function navHref(href: string, home: boolean) {
  return home ? href : `/${href}`;
}

// Знак HUBIS: узел, от которого расходятся связи к точкам сети; бирюзовая точка — «сигнал».
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="4 4 112 112" aria-hidden="true">
      <rect x="4" y="4" width="112" height="112" rx="26" fill="#1B2027" />
      <g stroke="#F2F3F4" strokeLinecap="round" fill="none" strokeWidth="10">
        <path d="M60 60 L22 26" />
        <path d="M60 60 L74 12" />
        <path d="M60 60 L106 50" />
        <path d="M60 60 L92 102" />
        <path d="M60 60 L34 100" />
      </g>
      <circle cx="90" cy="34" r="5" fill="#63BFA9" />
    </svg>
  );
}

export function Logo({ home = true }: { home?: boolean }) {
  return (
    <a href={home ? "#top" : "/"} className="logo" aria-label={`${site.name} — на главную`}>
      <svg viewBox="0 0 380 120" aria-hidden="true">
        <rect x="4" y="4" width="112" height="112" rx="26" fill="#1B2027" />
        <g stroke="#F2F3F4" strokeLinecap="round" fill="none" strokeWidth="10">
          <path d="M60 60 L22 26" />
          <path d="M60 60 L74 12" />
          <path d="M60 60 L106 50" />
          <path d="M60 60 L92 102" />
          <path d="M60 60 L34 100" />
        </g>
        <circle cx="90" cy="34" r="5" fill="#63BFA9" />
        <g fill="#1B2027" transform="translate(142,82)">
          <path d="M75 0V687H254V423H533V687H712V0H533V277H254V0Z" transform="scale(0.064,-0.064)" />
          <path d="M391 -12Q292 -12 220.5 19.0Q149 50 111.0 112.0Q73 174 73 266V687H253V270Q253 204 288.0 166.0Q323 128 391 128Q459 128 495.0 166.0Q531 204 531 270V687H710V266Q710 174 672.0 112.0Q634 50 563.0 19.0Q492 -12 391 -12Z" transform="translate(51.65,0) scale(0.064,-0.064)" />
          <path d="M75 0V687H495Q548 687 591.0 666.0Q634 645 659.5 607.0Q685 569 685 518Q685 473 669.5 441.0Q654 409 628.5 389.0Q603 369 571 359V355Q608 347 638.0 326.5Q668 306 685.5 271.0Q703 236 703 186Q703 127 675.0 85.5Q647 44 601.0 22.0Q555 0 498 0ZM254 138H449Q481 138 500.5 157.0Q520 176 520 215Q520 236 511.5 252.5Q503 269 486.5 278.0Q470 287 446 287H254ZM254 414H433Q455 414 470.5 423.0Q486 432 494.5 448.0Q503 464 503 486Q503 518 484.0 536.0Q465 554 436 554H254Z" transform="translate(103.04,0) scale(0.064,-0.064)" />
          <path d="M75 0V687H254V0Z" transform="translate(152,0) scale(0.064,-0.064)" />
          <path d="M360 -12Q295 -12 238.0 -0.5Q181 11 137.5 37.0Q94 63 69.0 105.5Q44 148 44 210Q44 214 44.0 219.0Q44 224 45 227H218Q218 224 217.5 219.5Q217 215 217 212Q217 180 233.5 160.5Q250 141 280.0 132.5Q310 124 350 124Q372 124 391.0 126.0Q410 128 425.0 133.0Q440 138 451.5 145.5Q463 153 468.5 163.5Q474 174 474 188Q474 211 456.5 226.0Q439 241 409.5 251.0Q380 261 343.0 270.0Q306 279 266.0 289.0Q226 299 189.0 314.0Q152 329 122.5 352.0Q93 375 75.5 409.5Q58 444 58 493Q58 547 81.0 586.5Q104 626 144.5 651.0Q185 676 238.0 687.5Q291 699 351 699Q410 699 461.5 687.0Q513 675 553.0 649.5Q593 624 615.5 585.5Q638 547 639 493V481H467V488Q467 511 454.5 528.5Q442 546 417.0 556.5Q392 567 355 567Q318 567 292.5 560.0Q267 553 253.5 540.0Q240 527 240 509Q240 487 257.5 473.0Q275 459 305.0 449.0Q335 439 372.0 430.5Q409 422 448.5 412.5Q488 403 525.0 388.5Q562 374 592.0 351.5Q622 329 639.5 296.0Q657 263 657 216Q657 134 618.5 84.0Q580 34 512.5 11.0Q445 -12 360 -12Z" transform="translate(174.34,0) scale(0.064,-0.064)" />
        </g>
      </svg>
    </a>
  );
}

// Основная кнопка: тёмная, с бирюзовой точкой-«сигналом». variant="outline" — вторичная, "accent" — на тёмном фоне.
export function Cta({
  children = site.cta,
  className = "",
  href = "#audit",
  variant = "dark",
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "dark" | "outline" | "accent";
}) {
  return (
    <a href={href} className={`btn btn--${variant} ${className}`}>
      {variant === "dark" && <span className="dot" aria-hidden="true" />}
      {children}
    </a>
  );
}

// Надзаголовок секции: короткая линия и подпись.
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`eyebrow ${className}`}>{children}</div>;
}

export function SiteHeader({ home = true, auditHref = "#audit" }: { home?: boolean; auditHref?: string }) {
  const links = nav.map((n) => ({ href: navHref(n.href, home), label: n.label }));
  return (
    <header className="header" id="top">
      <div className="container header__inner">
        <Logo home={home} />
        <nav className="header__nav" aria-label="Основное меню">
          {links.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="header__actions">
          <a href={site.telegram} className="btn btn--ghost btn--sm" target="_blank" rel="noopener">Telegram</a>
          <a href={auditHref} className="btn btn--dark btn--sm">
            <span className="dot" aria-hidden="true" />
            <span className="header__cta-full">{site.cta}</span>
            <span className="header__cta-short">{site.ctaShort}</span>
          </a>
        </div>
        <a href={auditHref} className="btn btn--dark btn--sm header__cta-mobile">{site.ctaMobile}</a>
        <MobileMenu links={links} auditHref={auditHref} telegram={site.telegram} cta={site.ctaShort} />
      </div>
    </header>
  );
}

export function SiteFooter({ home = true, auditHref = "#audit" }: { home?: boolean; auditHref?: string }) {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo home={home} />
          <p>{site.name} — {site.about}</p>
          <p className="footer__cities">{site.cities}</p>
          <img className="footer__msu" src="/images/msu-logo.png" alt="Акселератор МГУ" width={349} height={125} loading="lazy" />
        </div>
        <nav className="footer__col" aria-label="Разделы">
          <span className="footer__head">Разделы</span>
          {nav.map((n) => (
            <a key={n.href} href={navHref(n.href, home)}>{n.label}</a>
          ))}
          <a href="/visibility/">Видимость сети</a>
        </nav>
        <div className="footer__col">
          <span className="footer__head">Контакты</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.telegram} target="_blank" rel="noopener">Telegram</a>
          <Cta href={auditHref} className="btn--sm footer__cta">{site.ctaShort}</Cta>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {site.name} · {site.operator.name} · ИНН {site.operator.inn}</span>
        <nav className="footer__legal" aria-label="Документы">
          <a href="/privacy/">Политика конфиденциальности</a>
          <a href="/consent/">Согласие на обработку данных</a>
        </nav>
      </div>
    </footer>
  );
}
