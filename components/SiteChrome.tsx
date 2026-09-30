import { site, nav } from "@/lib/content";
import { Icon } from "./Icon";

// Шапка и подвал общие для всех страниц. На внутренних страницах якоря меню ведут на главную ("/#solutions").
// auditHref — куда ведёт кнопка заявки: на странице без своей формы — на форму главной ("/#audit").

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

export function Cta({
  children = site.cta,
  className = "",
  href = "#audit",
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a href={href} className={`btn btn--primary ${className}`}>
      {children}
    </a>
  );
}

export function SiteHeader({ home = true, auditHref }: { home?: boolean; auditHref?: string }) {
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
        <Cta className="btn--sm header__cta" href={auditHref} />
        <details className="burger">
          <summary aria-label="Меню">
            <span /><span />
          </summary>
          <nav className="burger__menu" aria-label="Мобильное меню">
            {nav.map((n) => (
              <a key={n.href} href={navHref(n.href, home)}>{n.label}</a>
            ))}
            <Cta className="btn--block" href={auditHref} />
          </nav>
        </details>
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
          <p>AI-интегратор для франчайзинговых и розничных сетей. Контроль, аналитика и обработка заявок поверх ваших систем.</p>
          <p>{site.cities}</p>
          <img className="footer__msu" src="/images/msu-logo.png" alt="Акселератор МГУ" width={349} height={125} loading="lazy" />
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
          <a href={auditHref} className="is-brand">{site.cta}</a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {site.name} · {site.operator.name} · ИНН {site.operator.inn}</span>
          <nav className="footer__legal" aria-label="Документы">
            <a href="/privacy/">Политика конфиденциальности</a>
            <a href="/consent/">Согласие на обработку данных</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
