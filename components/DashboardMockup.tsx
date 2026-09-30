"use client";

import { useState } from "react";

// Прототип информационного дашборда: переключение периода пересчитывает выручку и счётчики. Данные условные.

type Period = "day" | "week" | "month";

const regions: [string, number][] = [
  ["Москва", 18.2],
  ["Санкт-Петербург", 9.6],
  ["Екатеринбург", 6.1],
  ["Казань", 5.3],
  ["Челябинск", 4.8],
  ["Новосибирск", 4.7],
];

const periods: Record<Period, { label: string; k: number; revD: string; std: string; dev: string; devLabel: string; ai: string }> = {
  day: { label: "День", k: 1, revD: "+6,2%", std: "98,4%", dev: "143", devLabel: "Отклонений за сутки", ai: "1 284" },
  week: { label: "Неделя", k: 6.8, revD: "+4,1%", std: "97,9%", dev: "812", devLabel: "Отклонений за неделю", ai: "8 930" },
  month: { label: "Месяц", k: 29.4, revD: "+7,8%", std: "97,6%", dev: "3 206", devLabel: "Отклонений за месяц", ai: "37 615" },
};

const insights = [
  { place: "Казань, точка №2", text: "Средний чек −14% к сети третий день подряд. Выросло время ожидания на кассе." },
  { place: "Москва, точка №12", text: "6 пропущенных звонков после 20:00 — заявки ушли без ответа." },
  { place: "Екатеринбург, точка №7", text: "Чек-лист открытия не заполнен два дня." },
];

const fmt = (n: number) => n.toFixed(1).replace(".", ",");

export function DashboardMockup() {
  const [period, setPeriod] = useState<Period>("day");
  const p = periods[period];
  const total = regions.reduce((a, [, v]) => a + v, 0) * p.k;
  const max = regions[0][1];
  const revenue = total >= 1000 ? `${fmt(total / 1000)} млрд ₽` : `${fmt(total)} млн ₽`;

  return (
    <div className="dash">
      <div className="dash__top">
        <div className="dash__title">
          <b>Сеть · 132 точки</b>
          <span className="with-dot"><span className="dot dot--pulse" />128 онлайн</span>
        </div>
        <div className="segmented" role="group" aria-label="Период">
          {(Object.keys(periods) as Period[]).map((id) => (
            <button key={id} type="button" aria-pressed={id === period} onClick={() => setPeriod(id)}>
              {periods[id].label}
            </button>
          ))}
        </div>
      </div>
      <div className="dash__kpis" aria-live="polite">
        <div>
          <span className="dash__label">Выручка сети</span>
          <span className="dash__value">{revenue}<small>{p.revD}</small></span>
        </div>
        <div>
          <span className="dash__label">Соблюдение стандартов</span>
          <span className="dash__value">{p.std}</span>
        </div>
        <div>
          <span className="dash__label">{p.devLabel}</span>
          <span className="dash__value">{p.dev}</span>
        </div>
      </div>
      <div className="dash__body">
        <div className="dash__regions">
          <span className="dash__label">Выручка по регионам, млн ₽</span>
          {regions.map(([name, v]) => (
            <div key={name} className="dash__region">
              <span>{name}</span>
              <span className="bar"><span style={{ width: `${Math.round((v / max) * 100)}%` }} /></span>
              <span className="mono">{fmt(v * p.k)}</span>
            </div>
          ))}
        </div>
        <div className="dash__insights">
          <span className="dash__label with-dot"><span className="dot" />AI нашёл за ночь</span>
          {insights.map((i) => (
            <div key={i.place} className="dash__insight">
              <b>{i.place}</b>
              <span>{i.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash__foot">
        <span>Утренний отчёт отправлен в Telegram · 08:00</span>
        <span>Заявок обработано AI: {p.ai}</span>
      </div>
    </div>
  );
}
