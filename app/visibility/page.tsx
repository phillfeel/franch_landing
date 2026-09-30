import type { Metadata } from "next";
import { site, visibility as v } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { ReviewCalc } from "@/components/ReviewCalc";
import { Cta, Eyebrow, SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { AuditBlock, Faq, FinalForm, SectionHead, Steps } from "@/components/Sections";

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
      <div className="vis-mock__card vis-mock__chat">
        <span className="vis-mock__label">Ответ нейросети</span>
        <p className="vis-mock__q">Где поужинать с детьми рядом с Арбатской?</p>
        <p className="vis-mock__a">
          Посмотрите <mark>«Вашу сеть»</mark> на Арбате, 12: рейтинг 4,9, детское меню и игровая зона. Гости отмечают быстрое обслуживание.
        </p>
      </div>
      <div className="vis-mock__card vis-mock__map">
        <span className="vis-mock__pin"><Icon name="pin" size={18} stroke="#F2F3F4" width={2} /></span>
        <div>
          <b>Ваша сеть · Арбат, 12</b>
          <span className="mono">★ 4,9 · 1 284 отзыва · до 23:00</span>
        </div>
      </div>
      <div className="vis-mock__card vis-mock__reply">
        <span className="with-dot"><span className="dot dot--pulse" />Ответ на отзыв опубликован</span>
        <span className="mono">2 мин</span>
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
        {/* Первый экран */}
        <section className="container hero">
          <div className="hero__text">
            <a href="/#solutions" className="back">← Все решения</a>
            <Eyebrow>{v.hero.badge}</Eyebrow>
            <h1 className="h1 h1--md">{v.hero.title}</h1>
            <p className="lead">{v.hero.lead}</p>
            <div className="btn-row">
              <Cta>Получить аудит видимости</Cta>
              <Cta href="#modules" variant="outline">Что входит</Cta>
            </div>
            <div className="metrics">
              {v.hero.metrics.map((m) => (
                <div key={m.label} className="metric">
                  <span className="metric__value">{m.value}</span>
                  <span className="metric__label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroMock />
        </section>

        {/* Боли */}
        <section className="container section split">
          <SectionHead eyebrow="Диагностика" title={v.pains.title} />
          <div>
            <ul className="problems problems--icons">
              {v.pains.items.map((p) => (
                <li key={p.text}>
                  <span className="icon-box"><Icon name={p.icon} size={20} stroke="#1B2027" /></span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            <div className="panel callout">
              <div className="callout__wire" aria-hidden="true"><span /><i /></div>
              <p>Каждый такой клиент уже был вашим. Его не нужно привлекать рекламой — достаточно не отдать конкуренту.</p>
              <Cta>Проверить свою сеть</Cta>
            </div>
          </div>
        </section>

        {/* Модули */}
        <section id="modules" className="container section anchor">
          <SectionHead
            eyebrow="Что входит"
            title="Четыре продукта в одной системе"
            lead="Каждый модуль работает самостоятельно — можно начать с одного. Вместе они закрывают весь путь клиента: от первого вопроса до двери точки."
            className="section-head--wide"
          />
          <nav className="tags vis-tabs" aria-label="Модули">
            {v.modules.map((m) => (
              <a key={m.id} href={`#${m.id}`} className="tag tag--lg tag--link">
                <b>{m.code}</b> {m.name}
              </a>
            ))}
          </nav>
          <div className="vis-modules">
            {v.modules.map((m, i) => (
              <article key={m.id} id={m.id} className="vis-module anchor">
                <div className="vis-module__info">
                  <span className="vis-module__code">
                    <span className="icon-box"><Icon name={m.icon} size={20} stroke="#1B2027" /></span>
                    {String(i + 1).padStart(2, "0")} · {m.code} · {m.name}
                  </span>
                  <h3 className="vis-module__title">{m.title}</h3>
                  <p className="vis-module__lead">{m.lead}</p>
                  <div className="tags" aria-label="Площадки">
                    {m.where.map((w) => (
                      <span key={w} className="tag tag--mono">{w}</span>
                    ))}
                  </div>
                </div>
                <div className="panel vis-module__body">
                  <span className="stack__label">Что делаем</span>
                  <ul className="checklist checklist--compact">
                    {m.does.map((d) => (
                      <li key={d}>
                        <span className="checkbox" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="vis-saving">
                    <span className="dot" aria-hidden="true" />
                    <span><b>Экономия.</b> {m.saving}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Синергия */}
        <section className="container section">
          <SectionHead eyebrow="Одна система" title={v.synergy.title} lead={v.synergy.lead} className="section-head--wide" />
          <div className="flow">
            <div className="panel flow__box">
              <span className="stack__label">{v.synergy.source.title}</span>
              <ul>
                {v.synergy.source.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="flow__wire" aria-hidden="true"><span /></div>
            <div className="flow__core">
              {v.modules.map((m) => (
                <div key={m.id} className="flow__ch">
                  <b>{m.code}</b>
                  {m.name}
                </div>
              ))}
            </div>
            <div className="flow__wire" aria-hidden="true"><span /></div>
            <div className="panel flow__box is-accent">
              <span className="stack__label">{v.synergy.result.title}</span>
              <ul>
                {v.synergy.result.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="compare">
            <div className="compare__col is-before">
              <h3 className="h3">{v.synergy.before.title}</h3>
              <ul>
                {v.synergy.before.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="compare__col is-after">
              <h3 className="h3">{v.synergy.after.title}</h3>
              <ul>
                {v.synergy.after.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Экономия */}
        <section className="container section">
          <SectionHead eyebrow="Бюджет" title={v.savings.title} className="section-head--wide" />
          <div className="security">
            {v.savings.items.map((s, i) => (
              <div key={s.title} className="security__item">
                <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="security__title">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <h3 className="subhead">Посчитайте сами: время на отзывы</h3>
          <ReviewCalc />
        </section>

        <Steps eyebrow="Маршрут внедрения" title="Как запускаем" items={v.steps} cta={false} />

        <AuditBlock {...v.audit} />

        <Faq items={v.faq} group="vis-faq" />

        <FinalForm title={v.finalCta.title} points={v.finalCta.points} initialGoals={v.formGoals} />
      </main>

      <SiteFooter home={false} />
    </>
  );
}
