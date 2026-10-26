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
      <img src="/images/hubis-logo.svg" alt="" aria-hidden="true" />
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
        <a href={auditHref} className="btn btn--dark btn--sm header__cta-mobile">
          <span className="dot" aria-hidden="true" />
          {site.ctaMobile}
        </a>
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
