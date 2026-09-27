import { site, nav } from "@/lib/content";
import { Icon } from "./Icon";

// Шапка и подвал общие для всех страниц. На внутренних страницах якоря меню ведут на главную ("/#solutions").

function navHref(href: string, home: boolean) {
  return home ? href : `/${href}`;
}

export function Logo({ home = true }: { home?: boolean }) {
  return (
    <a href={home ? "#top" : "/"} className="logo" aria-label="Robotism — на главную">
      <span className="logo__mark" />
      <span className="logo__text">{site.name}</span>
    </a>
  );
}

export function Cta({ children = site.cta, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a href="#audit" className={`btn btn--primary ${className}`}>
      {children}
    </a>
  );
}

export function SiteHeader({ home = true }: { home?: boolean }) {
  return (
    <header className="header" id="top">
      <div className="container header__inner">
        <Logo home={home} />
        <nav className="header__nav" aria-label="Основное меню">
          {nav.map((n) => (
            <a key={n.href} href={navHref(n.href, home)}>{n.label}</a>
          ))}
        </nav>
        <a href={site.telegram} className="icon-btn" aria-label="Написать в Telegram" target="_blank" rel="noopener">
          <Icon name="telegram" size={18} />
        </a>
        <Cta className="btn--sm header__cta" />
        <details className="burger">
          <summary aria-label="Меню">
            <span /><span />
          </summary>
          <nav className="burger__menu" aria-label="Мобильное меню">
            {nav.map((n) => (
              <a key={n.href} href={navHref(n.href, home)}>{n.label}</a>
            ))}
            <Cta className="btn--block" />
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({ home = true }: { home?: boolean }) {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo home={home} />
          <p>AI-интегратор для франчайзинговых и розничных сетей. Контроль, аналитика и обработка заявок поверх ваших систем.</p>
          <p>{site.cities}</p>
        </div>
        <div className="footer__col">
          <span className="footer__head">Разделы</span>
          {nav.map((n) => (
            <a key={n.href} href={navHref(n.href, home)}>{n.label}</a>
          ))}
        </div>
        <div className="footer__col">
          <span className="footer__head">Контакты</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.telegram} target="_blank" rel="noopener">Telegram</a>
          <a href="#audit" className="is-brand">{site.cta}</a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>{site.legal}</span>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
