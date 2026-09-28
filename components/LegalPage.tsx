import type { Metadata } from "next";
import { site } from "@/lib/content";
import type { LegalDoc } from "@/lib/legal";
import { SiteHeader, SiteFooter } from "./SiteChrome";

// Общий шаблон юридических страниц: политика и согласие. Внизу — реквизиты оператора.

export function legalMetadata(doc: LegalDoc, path: string): Metadata {
  return {
    title: `${doc.title} | ${site.name}`,
    description: doc.description,
    alternates: { canonical: path },
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "website",
      locale: "ru_RU",
      siteName: site.name,
      url: path,
    },
  };
}

export function LegalPage({ doc, related }: { doc: LegalDoc; related: { href: string; label: string } }) {
  const op = site.operator;
  return (
    <>
      <SiteHeader home={false} auditHref="/#audit" />
      <main className="container legal">
        <a href="/" className="vis-back">← На главную</a>
        <h1 className="h2">{doc.title}</h1>
        <p className="legal__updated">Редакция от {doc.updated}</p>
        {doc.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <ol className="legal__sections">
          {doc.sections.map((s) => (
            <li key={s.title}>
              <h2 className="h3">{s.title}</h2>
              {s.blocks.map((b, i) =>
                typeof b === "string" ? (
                  <p key={i}>{b}</p>
                ) : (
                  <ul key={i}>
                    {b.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              )}
            </li>
          ))}
        </ol>
        <section className="card legal__operator" aria-label="Реквизиты оператора">
          <h2 className="h3">Оператор персональных данных</h2>
          <dl>
            <dt>Оператор</dt>
            <dd>{op.name}</dd>
            <dt>ИНН</dt>
            <dd>{op.inn}</dd>
            <dt>Адрес</dt>
            <dd>{op.address}</dd>
            <dt>Email</dt>
            <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
          </dl>
        </section>
        <a href={related.href} className="legal__related">{related.label} →</a>
      </main>
      <SiteFooter home={false} auditHref="/#audit" />
    </>
  );
}
