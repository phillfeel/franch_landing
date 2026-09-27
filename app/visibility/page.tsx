import type { Metadata } from "next";
import { site, visibility as v } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { AuditForm } from "@/components/AuditForm";
import { ReviewCalc } from "@/components/ReviewCalc";
import { Cta, SiteHeader, SiteFooter } from "@/components/SiteChrome";

// Страница продукта «Видимость сети»: карточка на главной ведёт сюда по кнопке «Подробнее».

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/visibility/" },
  openGraph: {
    title: v.meta.title,
    description: v.meta.description,
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    url: "/visibility/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Видимость сети",
      serviceType: "GEO, AEO, SERM и SEO для франчайзинговых сетей",
      description: v.meta.description,
      provider: { "@type": "Organization", name: site.name, email: site.email },
      areaServed: "RU",
    },
    {
      "@type": "FAQPage",
      mainEntity: v.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// Иллюстрация в первом экране: ответ нейросети, карточка точки на картах и ответ на отзыв.
function HeroMock() {
  return (
    <div className="vis-mock" role="img" aria-label="Пример: нейросеть рекомендует точку сети, карточка на картах с рейтингом 4,9, ответ на отзыв опубликован за 2 минуты">
      <div className="vis-mock__chat">
        <span className="vis-mock__label"><Icon name="spark" size={14} stroke="#6D4AFF" width={2} /> Ответ нейросети</span>
        <p className="vis-mock__q">Где поужинать с детьми рядом с Арбатской?</p>
        <p className="vis-mock__a">
          Посмотрите <mark>«Вашу сеть»</mark> на Арбате, 12: рейтинг 4,9, детское меню и игровая зона. Гости отмечают быстрое обслуживание.
        </p>
      </div>
      <div className="vis-mock__map">
        <div className="vis-mock__pin"><Icon name="pin" size={20} stroke="#fff" width={2} /></div>
        <div>
          <b>Ваша сеть · Арбат, 12</b>
          <span><span className="vis-mock__stars">★ 4,9</span> · 1 284 отзыва · открыто до 23:00</span>
        </div>
      </div>
      <div className="vis-mock__reply">
        <span className="vis-mock__dot" />
        Ответ на отзыв опубликован
        <span className="vis-mock__time">2 мин</span>
      </div>
      <span className="vis-mock__note">пример</span>
    </div>
  );
}

export default function VisibilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader home={false} />

      <main>
        {/* Hero */}
        <section className="container hero vis-hero">
          <div className="hero__text">
            <a href="/#solutions" className="vis-back">← Все решения</a>
            <span className="pill pill--soft pill--dot">{v.hero.badge}</span>
            <h1 className="h1">{v.hero.title}</h1>
            <p className="lead">{v.hero.lead}</p>
            <div className="btn-row">
              <Cta>Получить аудит видимости</Cta>
              <a href="#modules" className="btn btn--secondary">Что входит</a>
            </div>
            <div className="hero__metrics">
              {v.hero.metrics.map((m) => (
                <div key={m.label} className="metric">
                  <span className={`metric__value${m.positive ? " is-positive" : ""}`}>{m.value}</span>
                  <span className="metric__label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual">
            <HeroMock />
          </div>
        </section>

        {/* Боли */}
        <section className="container section vis-first">
          <h2 className="h2 section__title">{v.pains.title}</h2>
          <div className="grid-2">
            {v.pains.items.map((p) => (
              <article key={p.text} className="card vis-pain">
                <div className="icon-tile">
                  <Icon name={p.icon} stroke="#6D4AFF" />
                </div>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <div className="callout">
            <p>Каждый такой клиент уже был вашим. Его не нужно привлекать рекламой — достаточно не отдать конкуренту.</p>
            <Cta>Проверить свою сеть</Cta>
          </div>
        </section>

        {/* Модули */}
        <section id="modules" className="container section anchor">
          <h2 className="h2">Четыре продукта в одной системе</h2>
          <p className="lead section__lead">
            Каждый модуль работает самостоятельно — можно начать с одного. Вместе они закрывают весь путь клиента: от первого вопроса до двери точки.
          </p>
          <nav className="vis-tabs" aria-label="Модули">
            {v.modules.map((m) => (
              <a key={m.id} href={`#${m.id}`} className="vis-tab">
                <span className="product__code">{m.code}</span>
                {m.name}
              </a>
            ))}
          </nav>
          <div className="vis-modules">
            {v.modules.map((m, i) => (
              <article key={m.id} id={m.id} className="card vis-module anchor">
                <div className="vis-module__info">
                  <div className="vis-module__head">
                    <div className="icon-tile">
                      <Icon name={m.icon} stroke="#6D4AFF" />
                    </div>
                    <span className="mono-num">{String(i + 1).padStart(2, "0")} / {m.code} · {m.name}</span>
                  </div>
                  <h3 className="vis-module__title">{m.title}</h3>
                  <p className="vis-module__lead">{m.lead}</p>
                  <ul className="vis-where" aria-label="Площадки">
                    {m.where.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
                <div className="vis-module__body">
                  <span className="eyebrow">Что делаем</span>
                  <ul className="case__points">
                    {m.does.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <p className="vis-saving">
                    <b>Экономия.</b> {m.saving}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Синергия */}
        <section className="container section">
          <h2 className="h2">{v.synergy.title}</h2>
          <p className="lead section__lead">{v.synergy.lead}</p>
          <div className="vis-flow">
            <div className="vis-flow__box">
              <span className="eyebrow">{v.synergy.source.title}</span>
              <ul>
                {v.synergy.source.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="vis-flow__arrow" aria-hidden="true" />
            <div className="vis-flow__core">
              {v.modules.map((m) => (
                <div key={m.id} className="vis-flow__ch">
                  <span className="product__code">{m.code}</span>
                  {m.name}
                </div>
              ))}
            </div>
            <div className="vis-flow__arrow" aria-hidden="true" />
            <div className="vis-flow__box is-accent">
              <span className="eyebrow">{v.synergy.result.title}</span>
              <ul>
                {v.synergy.result.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid-2 vis-compare">
            <div className="card vis-compare__col is-before">
              <h3 className="h3">{v.synergy.before.title}</h3>
              <ul>
                {v.synergy.before.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="card vis-compare__col is-after">
              <h3 className="h3">{v.synergy.after.title}</h3>
              <ul className="case__points">
                {v.synergy.after.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Экономия */}
        <section className="band">
          <div className="container">
            <h2 className="h2 section__title">{v.savings.title}</h2>
            <div className="vis-savings">
              {v.savings.items.map((s, i) => (
                <article key={s.title} className="card vis-save">
                  <span className="mono-num is-brand">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="vis-save__title">{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
            <h3 className="subhead">Посчитайте сами: время на отзывы</h3>
            <ReviewCalc />
          </div>
        </section>

        {/* Процесс */}
        <section className="container section">
          <h2 className="h2 section__title">Как запускаем</h2>
          <ol className="timeline">
            {v.steps.map((s, i) => (
              <li key={s.n} className={`step${i === 0 ? " is-current" : ""}`}>
                <span className="mono-num">{s.n}</span>
                <h3 className="step__title">{s.title}</h3>
                {i === 0 ? <span className="step__here">Вы здесь</span> : <p className="step__text">{s.text}</p>}
              </li>
            ))}
          </ol>
        </section>

        {/* Оффер аудита */}
        <section className="container section">
          <div className="card vis-audit">
            <h2 className="h2">{v.audit.title}</h2>
            <ol className="offer__list">
              {v.audit.items.map((it, i) => (
                <li key={it} className="offer__item">
                  <span className="mono-num is-brand">{String(i + 1).padStart(2, "0")}</span>
                  <p>{it}</p>
                </li>
              ))}
            </ol>
            <div className="offer__cta">
              <span className="pill pill--soft pill--lg">{v.audit.badge}</span>
              <Cta>Записаться на аудит</Cta>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container section">
          <h2 className="h2 section__title">Частые вопросы</h2>
          <div className="faq">
            {v.faq.map((f) => (
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
            <div className="final__glow" />
            <div className="final__inner">
              <div className="final__text">
                <h2 className="h2">{v.finalCta.title}</h2>
                <ul className="final__points">
                  {v.finalCta.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={20} stroke="#A99BFF" width={2} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <AuditForm initialGoals={v.formGoals} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter home={false} />
    </>
  );
}
