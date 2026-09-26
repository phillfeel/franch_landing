import {
  site, nav, hero, pains, scheme, frontOffice, backOffice, sopCopilot, dashboard,
  mainCase, upcomingCases, auditOffer, steps, security, faq, finalCta, type Product,
} from "@/lib/content";
import { Icon } from "@/components/Icon";
import { Slot } from "@/components/Slot";
import { AuditForm } from "@/components/AuditForm";
import { MobileCta } from "@/components/MobileCta";

// Серверный компонент: вся разметка рендерится при сборке в статический HTML.
// На клиенте гидратируются только форма (AuditForm) и мобильная sticky-кнопка (MobileCta).

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Robotism — на главную">
      <span className="logo__mark" />
      <span className="logo__text">{site.name}</span>
    </a>
  );
}

function Cta({ children = site.cta, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a href="#audit" className={`btn btn--primary ${className}`}>
      {children}
    </a>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card product">
      <div className="product__head">
        <div className="icon-tile">
          <Icon name={p.icon} stroke="#6D4AFF" />
        </div>
        {p.tag && <span className="pill pill--soft">{p.tag}</span>}
      </div>
      <h3 className="h3">{p.title}</h3>
      {p.sub && <p className="product__sub">{p.sub}</p>}
      <p className="product__text">{p.text}</p>
      <span className="product__result">{p.result}</span>
    </article>
  );
}

// Центры ячеек по периметру сетки 4×4 (в % от схемы): сюда тянутся «провода» от AI-ядра в центре.
const hubCells: [number, number][] = [12.5, 37.5, 62.5, 87.5].flatMap((y, r) =>
  [12.5, 37.5, 62.5, 87.5]
    .filter((_, c) => r === 0 || r === 3 || c === 0 || c === 3)
    .map((x): [number, number] => [x, y]),
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      email: site.email,
      description: site.description,
      areaServed: "RU",
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="header" id="top">
        <div className="container header__inner">
          <Logo />
          <nav className="header__nav" aria-label="Основное меню">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
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
                <a key={n.href} href={n.href}>{n.label}</a>
              ))}
              <Cta className="btn--block" />
            </nav>
          </details>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="container hero">
          <div className="hero__text">
            <span className="pill pill--soft pill--dot">{hero.badge}</span>
            <h1 className="h1">{hero.title}</h1>
            <p className="lead">{hero.lead}</p>
            <div className="btn-row">
              <Cta />
              <a href="#cases" className="btn btn--secondary">Смотреть кейс</a>
            </div>
            <p className="caption">{hero.micro}</p>
            <div className="hero__metrics">
              {hero.metrics.map((m) => (
                <div key={m.label} className="metric">
                  <span className={`metric__value${m.positive ? " is-positive" : ""}`}>{m.value}</span>
                  <span className="metric__label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual">
            <Slot id="IMG-01" label="IMG-01 · 4:5 · 1000×1250" className="ratio-4-5" alt="Собственник сети смотрит на карту точек" />
            <div className="float-card float-card--tl">
              <span className="float-card__label">Контроль стандартов</span>
              <span className="float-card__value is-positive">98,4%</span>
            </div>
            <div className="float-card float-card--br">
              <span className="float-card__label">Точек онлайн</span>
              <span className="float-card__value">132</span>
              <span className="float-card__note">пример сети</span>
            </div>
          </div>
        </section>

        {/* Боли */}
        <section className="container section">
          <h2 className="h2">Узнаёте свою сеть?</h2>
          <p className="lead section__lead">Четыре ситуации, которые повторяются в каждой растущей сети.</p>
          <div className="grid-2">
            {pains.map((p) => (
              <article key={p.img} className="card pain">
                <Slot id={p.img} label={`${p.img} · 1:1`} className="pain__img" />
                <h3 className="h3">{p.title}</h3>
              </article>
            ))}
          </div>
          <div className="callout">
            <p>Каждая новая точка требует ещё людей в управляющей компании. AI ломает эту зависимость.</p>
            <Cta />
          </div>
        </section>

        {/* Решение */}
        <section id="solutions" className="container section anchor">
          <h2 className="h2 section__title">Сквозная AI-инфраструктура сети</h2>
          <div className="solution">
            <div className="scheme">
              {scheme.map((s, i) => (
                <div key={s.n} className="scheme__item-wrap">
                  {i > 0 && <div className="scheme__line" />}
                  <div className={`scheme__item${s.dark ? " is-dark" : ""}${s.accent ? " is-accent" : ""}`}>
                    <span className="mono-num">{s.n}</span>
                    <span className="scheme__title">{s.title}</span>
                    <span className="scheme__text">{s.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <Slot id="IMG-06" label="IMG-06 · 16:9 · 1600×900" className="solution__img" />
          </div>

          <h3 className="subhead">Клиенты, продажи, репутация</h3>
          <div className="products products--5">
            {frontOffice.map((p) => (
              <ProductCard key={p.title} p={p} />
            ))}
          </div>

          <h3 className="subhead">Управление сетью</h3>
          <div className="products products--3">
            {backOffice.map((p) => (
              <ProductCard key={p.title} p={p} />
            ))}
            <article className="card product product--soon">
              <div className="product__head">
                <div className="icon-tile">
                  <Icon name="book" stroke="#6D4AFF" />
                </div>
                <span className="pill pill--grey">{sopCopilot.tag}</span>
              </div>
              <h3 className="h3">{sopCopilot.title}</h3>
              <p className="product__text">{sopCopilot.text}</p>
            </article>
          </div>
        </section>

        {/* Дашборд */}
        <section className="container section">
          <div className="dash">
            <div className="dash__text">
              <h2 className="h2">{dashboard.title}</h2>
              <ul className="dots">
                {dashboard.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Cta />
            </div>
            <div className="dash__visual">
              <Slot id="IMG-07" label="IMG-07 · 16:10 · 1600×1000" className="dash__bg" />
              <div className="laptop">
                <div className="laptop__screen">
                  <div className="laptop__bar">
                    <i /><i /><i />
                    <span>robotism · {dashboard.note.toLowerCase()}</span>
                  </div>
                  <div className="ui-grid">
                    <div className="ui-tile"><span>Соблюдение стандартов</span><b className="is-positive">98,4%</b></div>
                    <div className="ui-tile"><span>Отклонений за сутки</span><b>14</b></div>
                    <div className="ui-tile"><span>Заявок обработано AI</span><b>1 284</b></div>
                    <div className="ui-tile ui-tile--wide">
                      <span>Выручка по регионам</span>
                      <div className="bars">
                        {[38, 62, 48, 84, 56, 70, 44].map((h, i) => (
                          <i key={i} style={{ height: `${h}%` }} className={i === 3 ? "is-hi" : ""} />
                        ))}
                      </div>
                    </div>
                    <div className="ui-tile ui-tile--alert">
                      <span>AI-алерт</span>
                      <p>Точка №47: чек-лист открытия не выполнен 3 дня подряд</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Кейсы */}
        <section id="cases" className="container section anchor">
          <h2 className="h2 section__title">Результаты, а не обещания</h2>
          <article className="card case">
            <div className="case__body">
              <span className="pill pill--soft">{mainCase.tag}</span>
              <h3 className="case__title">{mainCase.title}</h3>
              <dl className="case__steps">
                {mainCase.steps.map((s) => (
                  <div key={s.k}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="case__metrics">
                {mainCase.metrics.map((m) => (
                  <div key={m.label} className="case__metric">
                    <span className="case__metric-value">
                      {m.from} → <span className="is-positive">{m.to}</span>
                    </span>
                    <span className="metric__label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="case__visual">
              <Slot id="IMG-08" label="IMG-08 · 3:2 · 1200×800" className="case__bg" />
              <div className="call-card">
                <b>Разбор звонка · Менеджер Ирина</b>
                {[
                  { k: "Выявление потребности", v: 9, good: true },
                  { k: "Работа с возражениями", v: 6 },
                  { k: "Договорённость о шаге", v: 4 },
                ].map((r) => (
                  <div key={r.k} className="score">
                    <div className="score__row">
                      <span>{r.k}</span>
                      <b className={r.good ? "is-positive" : ""}>{r.v} / 10</b>
                    </div>
                    <div className="score__bar">
                      <i style={{ width: `${r.v * 10}%` }} className={r.good ? "is-good" : ""} />
                    </div>
                  </div>
                ))}
                <p className="call-card__tip">
                  Рекомендация AI: фиксируйте следующий шаг в конце разговора — в 7 из 10 звонков он не назначен.
                </p>
              </div>
            </div>
          </article>
          <div className="grid-2 upcoming">
            {upcomingCases.map((c) => (
              <article key={c.img} className="soon-card">
                <Slot id={c.img} label={`${c.img} · 3:2`} className="soon-card__img" />
                <div>
                  <span className="pill pill--grey">Кейс скоро</span>
                  <h3 className="soon-card__title">{c.title}</h3>
                </div>
              </article>
            ))}
          </div>
          <div className="center">
            <Cta>Хочу такой же результат — получить аудит</Cta>
          </div>
        </section>

        {/* Оффер аудита */}
        <section className="band">
          <div className="container offer">
            <Slot id="IMG-11" label="IMG-11 · 4:5" className="ratio-4-5 offer__img" />
            <div className="offer__text">
              <h2 className="h2">{auditOffer.title}</h2>
              <ol className="offer__list">
                {auditOffer.items.map((it, i) => (
                  <li key={it} className="offer__item">
                    <span className="mono-num is-brand">{String(i + 1).padStart(2, "0")}</span>
                    <p>{it}</p>
                  </li>
                ))}
              </ol>
              <div className="offer__cta">
                <span className="pill pill--soft pill--lg">{auditOffer.badge}</span>
                <Cta>Записаться на аудит</Cta>
              </div>
            </div>
          </div>
        </section>

        {/* Процесс */}
        <section id="process" className="container section anchor">
          <h2 className="h2 section__title">Как мы работаем</h2>
          <ol className="timeline">
            {steps.map((s, i) => (
              <li key={s.n} className={`step${i === 0 ? " is-current" : ""}`}>
                <span className="mono-num">{s.n}</span>
                <h3 className="step__title">{s.title}</h3>
                {i === 0 ? <span className="step__here">Вы здесь</span> : <p className="step__text">{s.text}</p>}
              </li>
            ))}
          </ol>
          <div className="note-bar">
            <p>Начинаем с пилота на 1–3 процессах с понятными метриками. Без риска для бизнеса.</p>
            <Cta />
          </div>
        </section>

        {/* Безопасность */}
        <section className="container section">
          <div className="security">
            <div className="security__left">
              <h2 className="h2">Безопасность и интеграции</h2>
              <Slot id="IMG-12" label="IMG-12 · 1:1" className="ratio-1-1 security__img" />
              <ul className="security__points">
                {security.points.map((p) => (
                  <li key={p.text} className={p.strong ? "is-strong" : ""}>
                    <Icon name="shield" size={20} stroke="#6D4AFF" />
                    {p.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="security__right">
              <span className="eyebrow">Технологии и интеграции</span>
              <div className="hub">
                <svg className="hub__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {hubCells.map(([x, y]) => (
                    <line key={`${x}-${y}`} x1={x} y1={y} x2={50} y2={50} />
                  ))}
                </svg>
                <div className="hub__core">
                  <span className="hub__label">AI-ядро · технологии</span>
                  <ul className="hub__tech">
                    {security.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                    {security.tech.map((t) => (
                      <li key={`d${t}`} className="hub__tech-dup" aria-hidden="true">{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="hub__ring">
                  <div className="hub__track">
                    {security.integrations.map((t) => (
                      <div key={t} className="integration">{t}</div>
                    ))}
                    <div className="integration integration--more">+ ваши</div>
                    {security.integrations.map((t) => (
                      <div key={`d${t}`} className="integration integration--dup" aria-hidden="true">{t}</div>
                    ))}
                    <div className="integration integration--more integration--dup" aria-hidden="true">+ ваши</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container section anchor">
          <h2 className="h2 section__title">Частые вопросы</h2>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q} className="faq__item">
                <summary>
                  {f.q}
                  <span className="faq__plus" aria-hidden="true">+</span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Финальная форма */}
        <section id="audit" className="final anchor">
          <div className="final__box">
            <Slot id="IMG-16" label="IMG-16 · 16:9 · фон 20%" className="final__bg" />
            <div className="final__glow" />
            <div className="final__inner">
              <div className="final__text">
                <h2 className="h2">{finalCta.title}</h2>
                <ul className="final__points">
                  {finalCta.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={20} stroke="#A99BFF" width={2} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <AuditForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__about">
            <Logo />
            <p>AI-интегратор для франчайзинговых и розничных сетей. Контроль, аналитика и обработка заявок поверх ваших систем.</p>
            <p>{site.cities}</p>
          </div>
          <div className="footer__col">
            <span className="footer__head">Разделы</span>
            {nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
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

      <MobileCta label="Получить аудит" />
    </>
  );
}
