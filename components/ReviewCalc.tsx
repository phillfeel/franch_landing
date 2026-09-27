"use client";

import { useState } from "react";

// Калькулятор времени на отзывы. Допущения показаны под расчётом, чтобы цифры можно было проверить.
const MIN_PER_REPLY = 5; // вручную: прочитать, разобраться, написать ответ
const NEGATIVE_SHARE = 0.15; // с AI человек смотрит только острые отзывы

const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU");

export function ReviewCalc() {
  const [points, setPoints] = useState(30);
  const [perPoint, setPerPoint] = useState(40);
  const [rate, setRate] = useState(600);

  const reviews = points * perPoint;
  const manualHours = (reviews * MIN_PER_REPLY) / 60;
  const aiHours = manualHours * NEGATIVE_SHARE;
  const savedRub = (manualHours - aiHours) * rate;

  return (
    <div className="calc card">
      <div className="calc__inputs">
        <label className="calc__field">
          <span>Точек в сети <b>{points}</b></span>
          <input type="range" min={1} max={300} value={points} onChange={(e) => setPoints(+e.target.value)} />
        </label>
        <label className="calc__field">
          <span>Отзывов на точку в месяц <b>{perPoint}</b></span>
          <input type="range" min={5} max={200} step={5} value={perPoint} onChange={(e) => setPerPoint(+e.target.value)} />
        </label>
        <label className="calc__field">
          <span>Стоимость часа сотрудника <b>{fmt(rate)} ₽</b></span>
          <input type="range" min={300} max={2000} step={50} value={rate} onChange={(e) => setRate(+e.target.value)} />
        </label>
      </div>
      <div className="calc__out" aria-live="polite">
        <div className="calc__row">
          <span>Отзывов в месяц по сети</span>
          <b>{fmt(reviews)}</b>
        </div>
        <div className="calc__row">
          <span>Ответы вручную</span>
          <b>{fmt(manualHours)} ч</b>
        </div>
        <div className="calc__row">
          <span>С AI: человек смотрит только острые</span>
          <b>{fmt(aiHours)} ч</b>
        </div>
        <div className="calc__total">
          <span>Экономия на одних только отзывах</span>
          <b className="is-positive">≈ {fmt(savedRub)} ₽ в месяц</b>
        </div>
        <p className="calc__note">
          Допущения: {MIN_PER_REPLY} минут на ручной ответ, {Math.round(NEGATIVE_SHARE * 100)}% отзывов требуют внимания человека.
          Рост рейтинга и позиций в картах сюда не входит.
        </p>
      </div>
    </div>
  );
}
