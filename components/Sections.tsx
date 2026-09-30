import { site } from "@/lib/content";
import { AuditForm } from "./AuditForm";
import { Cta, Eyebrow } from "./SiteChrome";

// Секции, общие для главной и страниц продуктов.

export function SectionHead({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={`section-head ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

// Маршрут внедрения: пять шагов на одной линии, по которой бежит сигнал. highlight — шаг с первым результатом.
export function Steps({
  id,
  eyebrow,
  title,
  items,
  cta = true,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: { title: string; text: string; highlight?: boolean }[];
  cta?: boolean;
}) {
  return (
    <section id={id} className="container section anchor">
      <div className="section-row">
        <SectionHead eyebrow={eyebrow} title={title} />
        {cta && <Cta variant="outline">{site.cta}</Cta>}
      </div>
      <ol className="steps">
        {items.map((s, i) => (
          <li key={s.title} className={`step${s.highlight ? " is-highlight" : ""}`}>
            <div className="step__rail">
              <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
              <svg viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="2" x2="100" y2="2" className="step__line" />
                <line x1="0" y1="2" x2="100" y2="2" pathLength={100} className="step__signal" style={{ animationDelay: `${i * 0.48}s` }} />
              </svg>
            </div>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__text">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AuditBlock({
  eyebrow,
  title,
  chips,
  items,
  cta,
}: {
  eyebrow: string;
  title: string;
  chips: string[];
  items: string[];
  cta: string;
}) {
  return (
    <section className="container section audit">
      <div className="audit__head">
        <SectionHead eyebrow={eyebrow} title={title} />
        <div className="tags">
          {chips.map((c) => (
            <span key={c} className="tag">{c}</span>
          ))}
        </div>
      </div>
      <div className="panel audit__panel">
        <ul className="checklist">
          {items.map((it) => (
            <li key={it}>
              <span className="checkbox" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
        <Cta>{cta}</Cta>
      </div>
    </section>
  );
}

// Вопросы: первый открыт; name связывает details в аккордеон — открыт один вопрос за раз.
export function Faq({ id, items, group }: { id?: string; items: { q: string; a: string }[]; group: string }) {
  return (
    <section id={id} className="container section faq anchor">
      <SectionHead eyebrow="Вопросы" title="Частые вопросы" />
      <div className="faq__list">
        {items.map((f, i) => (
          <details key={f.q} className="faq__item" name={group} open={i === 0}>
            <summary>
              <span>{f.q}</span>
              <span className="faq__icon" aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalForm({
  title,
  points,
  initialGoals,
}: {
  title: string;
  points: string[];
  initialGoals?: string[];
}) {
  return (
    <section id="audit" className="container section section--last anchor">
      <div className="final">
        <div className="final__text">
          <h2 className="h2 h2--final">{title}</h2>
          <ul className="bullets">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="final__note">
            Ответим в течение 2 часов в рабочее время · или напишите в{" "}
            <a href={site.telegram} target="_blank" rel="noopener">Telegram</a>
          </p>
        </div>
        <AuditForm initialGoals={initialGoals} />
      </div>
    </section>
  );
}
