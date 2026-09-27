// Мокап дашборда собственника (из Claude Design): два кадра — вертикальный 1112×1268 для десктопа
// и 16:9 1600×900 для мобайла. Размеры в CSS заданы в пикселях макета через --u и масштабируются
// под ширину колонки (container queries), поэтому текст остаётся векторным на любом экране.

const regions = [
  { name: "Москва", value: 16.4, ch: "+8,1%" },
  { name: "Санкт-Петербург", value: 11.2, ch: "+5,4%" },
  { name: "Екатеринбург", value: 6.8, ch: "+7,2%" },
  { name: "Челябинск", value: 5.6, ch: "+3,6%" },
  { name: "Казань", value: 4.6, ch: "+4,9%" },
  { name: "Новосибирск", value: 4.1, ch: "−1,3%" },
];

const insights = [
  { tone: "error", id: "Точка №47", text: "Чек-лист открытия не выполнен 3 дня подряд" },
  { tone: "warn", id: "Точка №112", text: "Средний чек −18% к среднему по сети" },
  { tone: "brand", id: "Точка №08", text: "9 негативных отзывов про скорость — предложен скрипт" },
];

const maxRegion = Math.max(...regions.map((r) => r.value));
const rub = (v: number) => `${v.toFixed(1).replace(".", ",")} млн ₽`;

function Bar() {
  return (
    <div className="dm__bar">
      <div className="dm__lights"><i /><i /><i /></div>
      <div className="dm__url">robotism · сеть из 132 точек</div>
      <div className="dm__user"><span className="dm__pill">Сегодня, 08:00</span><span className="dm__avatar">А</span></div>
    </div>
  );
}

function Head() {
  return (
    <div className="dm__head">
      <div className="dm__title">
        <b>Сеть · 132 точки</b>
        <span className="dm__online"><i />128 онлайн</span>
      </div>
      <div className="dm__seg"><span>День</span><span className="is-active">Неделя</span><span>Месяц</span></div>
    </div>
  );
}

function Kpis() {
  return (
    <div className="dm__kpis">
      <div className="dm__kpi">
        <span className="dm__kpi-label">Выручка сети</span>
        <span className="dm__kpi-value">48,7<small>млн ₽</small></span>
        <span className="dm__kpi-up">+6,2% к прошлой неделе</span>
        <svg className="dm__spark" viewBox="0 0 200 36" preserveAspectRatio="none">
          <polyline points="0,28 28,24 56,26 84,18 112,20 140,12 168,14 200,4" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="dm__kpi">
        <span className="dm__kpi-label">Соблюдение стандартов</span>
        <span className="dm__kpi-value is-positive">98,4%</span>
        <span className="dm__progress"><i style={{ width: "98.4%" }} /></span>
      </div>
      <div className="dm__kpi">
        <span className="dm__kpi-label">Отклонений за сутки</span>
        <span className="dm__kpi-value">14</span>
        <span className="dm__crit"><i />3 критичных</span>
      </div>
    </div>
  );
}

function Regions() {
  return (
    <div className="dm__card dm__regions">
      <div className="dm__card-head"><b>Выручка по регионам</b><span>за неделю</span></div>
      {regions.map((r, i) => (
        <div className="dm__region" key={r.name}>
          <span className="dm__region-name">{r.name}</span>
          <span className="dm__track"><i className={i === 0 ? "is-top" : ""} style={{ width: `${(r.value / maxRegion) * 100}%` }} /></span>
          <span className="dm__region-value">{rub(r.value)}</span>
          <span className={`dm__region-ch ${r.ch.startsWith("−") ? "is-down" : ""}`}>{r.ch}</span>
        </div>
      ))}
    </div>
  );
}

function Insights() {
  return (
    <div className="dm__ai">
      <div className="dm__ai-head">
        <div>
          <span className="dm__spark-icon">
            <svg viewBox="0 0 24 24"><path d="M12 1 L14.6 9.4 L23 12 L14.6 14.6 L12 23 L9.4 14.6 L1 12 L9.4 9.4 Z" /></svg>
          </span>
          <b>AI нашёл за ночь</b>
          <span className="dm__ai-badge">AI</span>
        </div>
        <span className="dm__muted">3 инсайта</span>
      </div>
      {insights.map((it) => (
        <div className={`dm__insight dm__insight--${it.tone}`} key={it.id}>
          <i />
          <div className="dm__insight-body">
            <div className="dm__insight-top">
              <span className="dm__insight-id">{it.id}</span>
              <span className="dm__btn">Разобрать →</span>
            </div>
            <span className="dm__insight-text">{it.text}</span>
          </div>
          <span className="dm__btn">Разобрать →</span>
        </div>
      ))}
    </div>
  );
}

function Telegram() {
  return (
    <div className="dm__tg">
      <span className="dm__tg-icon">
        <svg viewBox="0 0 24 24"><path d="M2.5 11.3 L20.6 4.3 C21.4 4 22.1 4.5 21.9 5.6 L18.8 20.1 C18.6 21.1 18 21.3 17.2 20.9 L12.6 17.5 L10.4 19.6 C10.1 19.9 9.9 20.1 9.4 20.1 L9.7 15.4 L18.3 7.6 C18.7 7.3 18.2 7.1 17.7 7.4 L7.1 14.1 L2.6 12.7 C1.6 12.4 1.6 11.7 2.5 11.3 Z" /></svg>
      </span>
      <span className="dm__tg-text">Утренний отчёт отправлен в Telegram · <span>08:00</span></span>
      <span className="dm__check">
        <svg viewBox="0 0 16 16"><polyline points="3,8.5 6.5,12 13,4.5" /></svg>
      </span>
    </div>
  );
}

function Leads() {
  return (
    <div className="dm__leads">
      <span>Заявок обработано AI</span>
      <b>1 284</b>
    </div>
  );
}

export function DashboardMockup({ label }: { label: string }) {
  return (
    <div className="dm" role="img" aria-label={label}>
      <div className="dm__frame dm__frame--v" aria-hidden="true">
        <div className="dm__window">
          <Bar />
          <div className="dm__body">
            <Head />
            <Kpis />
            <Regions />
            <Insights />
            <div className="dm__foot"><Telegram /><Leads /></div>
          </div>
        </div>
      </div>
      <div className="dm__frame dm__frame--w" aria-hidden="true">
        <div className="dm__window">
          <Bar />
          <div className="dm__body">
            <Head />
            <div className="dm__cols">
              <div className="dm__col"><Kpis /><Regions /></div>
              <div className="dm__col"><Insights /><Telegram /><Leads /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
