import type { ModuleId } from "@/lib/content";

// Мини-иллюстрации интерфейсов в карточках модулей. Данные условные — подпись об этом стоит под лентой.

const funnel: { label: string; value: string; share: number; accent?: boolean }[] = [
  { label: "Спят 90+ дней", value: "4 812", share: 100 },
  { label: "Контакт проверен", value: "3 960", share: 82 },
  { label: "Согласие 152-ФЗ", value: "3 071", share: 64 },
  { label: "Вернулись", value: "342", share: 11, accent: true },
];

const channels = [
  { code: "GEO", text: "Карты, 2ГИС, VK, ответы на отзывы" },
  { code: "AEO", text: "Алиса, Яндекс Нейро, ChatGPT" },
  { code: "SERM", text: "Репутация по брендовым запросам" },
  { code: "SEO", text: "Страницы по городам в топе" },
];

export function ModuleMock({ id }: { id: ModuleId }) {
  switch (id) {
    case "content":
      return (
        <div className="mock-table">
          <div><span>Новость отрасли найдена</span><span className="muted">07:40</span></div>
          <div><span>Переписана под голос бренда</span><span className="muted">07:41</span></div>
          <div><span className="with-dot"><span className="dot" />VK · Telegram</span><b>10:00</b></div>
        </div>
      );
    case "reactivation":
      return (
        <div className="mock-funnel">
          {funnel.map((f) => (
            <div key={f.label}>
              <span className={f.accent ? "with-dot" : undefined}>
                {f.accent && <span className="dot" />}
                {f.label}
              </span>
              <span className="mock-funnel__bar">
                <span style={{ width: `${f.share}%` }} className={f.accent ? "is-accent" : undefined} />
              </span>
              <span className="mono">{f.value}</span>
            </div>
          ))}
        </div>
      );
    case "bot":
      return (
        <div className="mock-chat">
          <span className="mock-chat__in">Вы работаете в воскресенье на Ленина?</span>
          <span className="mock-chat__out">Да, с 10:00 до 21:00. Записать вас на удобное время?</span>
          <span className="tags">
            {["сайт", "Telegram", "WhatsApp", "VK", "MAX"].map((t) => (
              <span key={t} className="tag tag--xs">{t}</span>
            ))}
          </span>
        </div>
      );
    case "visibility":
      return (
        <>
          <div className="mock-channels">
            {channels.map((c) => (
              <div key={c.code}>
                <b>{c.code}</b>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
          <div className="mock-draft">
            <span className="mono muted">черновик ответа · 2ГИС · ★★★☆☆</span>
            <span>Спасибо, что написали. Разобрались с задержкой на кассе в субботу — добавили второго кассира в пиковые часы.</span>
          </div>
        </>
      );
    case "dashboard":
      return (
        <div className="mock-qa">
          <span className="mock-qa__q">Какие точки просели по выручке за неделю?</span>
          <span className="mock-qa__a">3 точки ниже плана: Казань-2 (−14%), Челябинск-5 (−9%), СПб-11 (−7%). Причина у двух — выросло время ожидания.</span>
        </div>
      );
    case "docs":
      return (
        <div className="mock-table">
          <div><span className="muted">Счёт №</span><span className="mono">2417</span></div>
          <div><span className="muted">Контрагент</span><span>ООО «Поставка»</span></div>
          <div><span className="muted">Сумма</span><span className="mono">186 400 ₽</span></div>
          <div><span className="with-dot"><span className="dot" />Передано в 1С</span><span className="muted">ЭДО</span></div>
        </div>
      );
    case "knowledge":
      return (
        <div className="mock-qa">
          <span className="mock-qa__q">Как оформить возврат без чека?</span>
          <span className="mock-qa__a">
            По заявлению покупателя, с подписью администратора смены.
            <span className="mono mock-qa__src">источник: франчбук, раздел 4.2</span>
          </span>
        </div>
      );
  }
}
