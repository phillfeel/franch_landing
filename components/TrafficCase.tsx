"use client";

import { useRef, useState } from "react";
import { trafficCase as content } from "@/lib/content";
import { Cta, Eyebrow } from "./SiteChrome";

export function TrafficCase() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const report = content.reports[active];

  return (
    <section id="traffic-results" className="container section anchor traffic-case" aria-labelledby="traffic-title">
      <div className="traffic-case__heading">
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 id="traffic-title" className="h2">{content.title}</h2>
        </div>
        <div className="traffic-case__period"><span className="dot" />{content.period}<span>Яндекс Метрика</span></div>
      </div>
      <div className="traffic-case__body">
        <div className="traffic-case__story">
          <span className="traffic-case__domain">aquarius-stroy.ru <span>↗</span></span>
          <h3>{content.subtitle}</h3>
          <p>{content.description}</p>
          <div className="traffic-case__share"><strong>72,5<span>%</span></strong><p>визитов — из поисковых систем</p><div aria-hidden="true"><i /></div><small>10 647 из 14 683 визитов</small></div>
          <Cta href="#audit" variant="outline">Обсудить продвижение сайта</Cta>
        </div>
        <div className="traffic-case__evidence">
          <dl className="traffic-case__metrics">
            {content.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
          </dl>
          <div className="traffic-report">
            <div className="traffic-report__top">
              <div className="traffic-report__tabs" role="group" aria-label="Отчёты Яндекс Метрики">
                {content.reports.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{item.title}</button>)}
              </div>
              <span className="traffic-report__source">Фрагмент отчёта</span>
            </div>
            <button className="traffic-report__chart" type="button" aria-label={`${report.title}: увеличить график`} onClick={() => dialog.current?.showModal()}>
              <img src={report.src} width={790} height={380} alt={report.alt} loading="lazy" />
              <span>Увеличить ↗</span>
            </button>
            <dl className="traffic-report__legend">
              {report.items.map((item) => <div key={item.label}><dt><i style={{ background: item.color }} />{item.label}</dt><dd>{item.value}</dd></div>)}
            </dl>
          </div>
          <p className="traffic-case__note">{content.note}</p>
        </div>
      </div>
      <dialog ref={dialog} className="traffic-dialog" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="traffic-dialog__head"><div><b>{report.title}</b><p>{content.period} · Яндекс Метрика</p></div><button type="button" aria-label="Закрыть график" onClick={() => dialog.current?.close()}>×</button></div>
        <img src={report.src} alt={report.alt} width={790} height={380} />
        <dl className="traffic-report__legend">{report.items.map((item) => <div key={item.label}><dt><i style={{ background: item.color }} />{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      </dialog>
    </section>
  );
}
