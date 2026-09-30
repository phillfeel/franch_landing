import {
  site, hero, problems, layers, modules, dashboard, mainCase, auditOffer, steps, security, faq, finalCta,
} from "@/lib/content";
import { HeroNetwork } from "@/components/HeroNetwork";
import { ModuleMock } from "@/components/ModuleMock";
import { Ribbon } from "@/components/Ribbon";
import { DashboardMockup } from "@/components/DashboardMockup";
import { CaseSlider } from "@/components/CaseSlider";
import { DeckButton } from "@/components/DeckButton";
import { Cta, SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { AuditBlock, Faq, FinalForm, SectionHead, Steps } from "@/components/Sections";

// Серверный компонент: вся разметка рендерится при сборке в статический HTML.
// На клиенте гидратируются только меню, лента модулей, дашборд, скриншоты кейса, презентация и форма.

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

// Звуковая «волна» звонка под метриками кейса: три участка — квалификация, возражения, закрытие.
const wave = Array.from({ length: 64 }, (_, i) => {
  const h = 18 + Math.abs(Math.sin(i * 0.7) * 50 + Math.sin(i * 2.3) * 22 + Math.cos(i * 0.21) * 12);
  return { h: Math.min(100, Math.round(h)), part: i < 21 ? 0 : i < 43 ? 1 : 2 };
});

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader />

      <main>
        {/* Первый экран */}
        <section className="container hero">
          <div className="hero__text">
            <h1 className="h1">{hero.title}</h1>
            <p className="lead">{hero.lead}</p>
            <div className="btn-row">
              <Cta />
              <Cta href="#cases" variant="outline">Смотреть кейс</Cta>
            </div>
            <div className="metrics">
              {hero.metrics.map((m) => (
                <div key={m.label} className="metric">
                  <span className="metric__value">{m.value}</span>
                  <span className="metric__label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroNetwork />
        </section>

        {/* Боли */}
        <section className="container section split">
          <SectionHead eyebrow={problems.eyebrow} title={problems.title} />
          <div>
            <ul className="problems">
              {problems.items.map((p) => (
                <li key={p}>
                  <svg viewBox="0 0 72 12" aria-hidden="true">
                    <line x1="0" y1="6" x2="28" y2="6" className="problems__solid" />
                    <line x1="44" y1="6" x2="72" y2="6" className="problems__broken" />
                    <rect x="30" y="2" width="8" height="8" rx="2" />
                  </svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="panel callout">
              <div className="callout__wire" aria-hidden="true"><span /><i /></div>
              <p>{problems.callout}</p>
              <Cta />
            </div>
          </div>
        </section>

        {/* Как устроено */}
        <section id="solutions" className="container section anchor">
          <SectionHead eyebrow={layers.eyebrow} title={layers.title} className="section-head--wide" />
          <ol className="layers">
            {layers.items.map((l) => (
              <li key={l.name} className={`layer${l.accent ? " is-accent" : ""}${l.dark ? " is-dark" : ""}`}>
                <div className="layer__rail" aria-hidden="true">
                  <span className="layer__node"><i /></span>
                  <span className="layer__wire" />
                </div>
                <div className="layer__body">
                  <div className="layer__text">
                    <h3 className="h3">{l.name}</h3>
                    <p>{l.note}</p>
                  </div>
                  <div className="tags">
                    {l.items.map((it) => (
                      <span key={it} className="tag tag--mono">{it}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Модули */}
        <section className="section section--flush">
          <Ribbon
            label="Модули"
            head={<SectionHead eyebrow={modules.eyebrow} title={modules.title} lead={modules.lead} className="section-head--wide" />}
          >
            {modules.items.map((m) => (
              <article
                key={m.id}
                className={`mod${m.pilot ? " is-pilot" : ""}${m.id === "bot" ? " is-live" : ""}`}
                style={{ "--w": `${m.width}px` } as React.CSSProperties}
              >
                <div className="mod__card">
                  <span className="mod__group">{m.group}</span>
                  <h3 className="mod__title">{m.title}</h3>
                  <ModuleMock id={m.id} />
                  <p className="mod__text">{m.text}</p>
                  {m.deck && <DeckButton label={m.deck.label} title={m.deck.title} />}
                  {m.more && (
                    <a href={m.more.href} className="link-arrow">
                      {m.more.label} <span aria-hidden="true">→</span>
                    </a>
                  )}
                  <span className="mod__result">{m.result}</span>
                </div>
                <span className="mod__stem" aria-hidden="true" />
                <span className="mod__node" aria-hidden="true" />
              </article>
            ))}
          </Ribbon>
          <p className="container note">{modules.note}</p>
        </section>

        {/* Дашборд */}
        <section className="container section">
          <SectionHead eyebrow={dashboard.eyebrow} title={dashboard.title} className="section-head--wide" />
          <DashboardMockup />
          <p className="note">{dashboard.note}</p>
        </section>

        {/* Кейс */}
        <section id="cases" className="dark anchor">
          <div className="container section case">
            <div className="case__head">
              <SectionHead eyebrow={mainCase.eyebrow} title={mainCase.title} />
              <p className="lead">{mainCase.lead}</p>
            </div>
            <div className="case__metrics">
              {mainCase.metrics.map((m, i) => (
                <div key={m.label} className="case__metric">
                  <span className="case__from">{m.from}</span>
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                    <line x1="0" y1="5" x2="100" y2="5" className="case__track" />
                    <line x1="0" y1="5" x2="100" y2="5" pathLength={100} className="case__signal" style={{ animationDelay: `${i * 1.5}s` }} />
                  </svg>
                  <span className="case__to">
                    <b>{m.to}</b>
                    <span>{m.label}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="case__body">
              <div className="case__info">
                <div className="wave" aria-hidden="true">
                  {wave.map((b, i) => (
                    <span key={i} className={`wave__bar wave__bar--${b.part}`} style={{ height: `${b.h}%` }} />
                  ))}
                </div>
                <div className="wave__labels" aria-hidden="true">
                  <span>квалификация</span>
                  <span>возражения</span>
                  <span>закрытие</span>
                </div>
                <ul className="case__points">
                  {mainCase.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Cta variant="accent">{mainCase.cta}</Cta>
              </div>
              <CaseSlider slides={mainCase.slides} />
            </div>
          </div>
        </section>

        <AuditBlock {...auditOffer} />

        <Steps id="process" {...steps} />

        {/* Безопасность */}
        <section className="container section">
          <SectionHead eyebrow={security.eyebrow} title={security.title} className="section-head--wide" />
          <div className="security">
            {security.points.map((p) => (
              <div key={p.title} className="security__item">
                <h3 className="security__title">{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="stack">
            <div className="panel stack__box">
              <span className="stack__label">AI-ядро</span>
              <div className="tags">
                {security.tech.map((t) => (
                  <span key={t} className="tag tag--lg">{t}</span>
                ))}
              </div>
            </div>
            <div className="panel stack__box">
              <span className="stack__label">Интеграции</span>
              <div className="tags">
                {security.integrations.map((t) => (
                  <span key={t} className="tag tag--lg">{t}</span>
                ))}
                <span className="tag tag--lg tag--more"><span className="dot" aria-hidden="true" />+ ваши</span>
              </div>
            </div>
          </div>
        </section>

        <Faq id="faq" items={faq} group="faq" />

        <FinalForm {...finalCta} />
      </main>

      <SiteFooter />
    </>
  );
}

