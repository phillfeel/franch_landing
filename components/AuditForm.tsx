"use client";

import { useState, type FormEvent } from "react";
import { formOptions, site } from "@/lib/content";

// Куда отправлять заявку: URL вебхука (свой API, Telegram-бот, amoCRM, Bitrix24 и т.п.), принимает JSON POST.
// Задаётся при сборке через NEXT_PUBLIC_FORM_ENDPOINT. Пока не задан — заявка только показывает экран «Спасибо».
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

type Errors = { name?: string; contact?: string; agree?: string };

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const [k, v] of params) if (k.startsWith("utm_")) utm[k] = v;
  return utm;
}

// Телефон (10–15 цифр) или ник Telegram (5–32 символа, можно с @).
function contactError(value: string) {
  const c = value.trim();
  if (!c) return "Укажите телефон или Telegram";
  const digits = c.replace(/\D/g, "");
  const phone = digits.length >= 10 && digits.length <= 15 && /^[+\d\s()-]+$/.test(c);
  const tg = /^@?[A-Za-z0-9_]{5,32}$/.test(c);
  return phone || tg ? undefined : "Проверьте формат: +7 900 000-00-00 или @username";
}

// initialGoals — цели, отмеченные заранее (на странице продукта — его направления).
export function AuditForm({ initialGoals = [] }: { initialGoals?: string[] }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [points, setPoints] = useState("");
  const [goals, setGoals] = useState<string[]>(initialGoals);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggleGoal = (g: string) =>
    setGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {
      name: name.trim() ? undefined : "Укажите имя",
      contact: contactError(contact),
      agree: agree ? undefined : "Нужно согласие на обработку данных",
    };
    setErrors(next);
    if (next.name || next.contact || next.agree) return;

    setStatus("sending");
    // Плоские поля: FormSubmit (как на robotism.online) рисует письмо таблицей, вложенные массивы/объекты в ней не читаются.
    // Поля с "_" — служебные для FormSubmit: тема письма и шаблон.
    const payload = {
      name,
      contact,
      company: company || "Не указана",
      points: points || "Не указано",
      goals: goals.join(", ") || "—",
      page: window.location.href,
      ...readUtm(),
      _subject: `Новая заявка с лендинга для франшиз от ${name}`,
      _template: "table",
    };
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        // FormSubmit отвечает 200 и при отказе (например, форма не активирована) — смотрим поле success.
        const data = await res.json().catch(() => null);
        if (data && "success" in data && String(data.success) !== "true") throw new Error(data.message);
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-thanks" role="status">
        <span className="form-thanks__mark" aria-hidden="true" />
        <h3 className="form-thanks__title">Заявка принята</h3>
        <ol className="form-thanks__steps">
          <li><span>01</span>Свяжемся в течение 2 часов в рабочее время</li>
          <li><span>02</span>Подберём удобное время, пришлём ссылку на звонок</li>
          <li><span>03</span>45 минут разбора и дорожная карта пилота</li>
        </ol>
        <a href={site.telegram} className="btn btn--accent" target="_blank" rel="noopener">
          Написать в Telegram
        </a>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <label className="field">
          <span>Имя *</span>
          <input
            type="text"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((x) => ({ ...x, name: undefined }));
            }}
            aria-invalid={!!errors.name || undefined}
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </label>
        <label className="field">
          <span>Телефон или Telegram *</span>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+7 … или @username"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              setErrors((x) => ({ ...x, contact: undefined }));
            }}
            aria-invalid={!!errors.contact || undefined}
          />
          {errors.contact && <span className="field__error">{errors.contact}</span>}
        </label>
      </div>
      <label className="field">
        <span>Компания</span>
        <input
          type="text"
          autoComplete="organization"
          placeholder="Название сети"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>
      <fieldset className="field">
        <legend>Количество точек</legend>
        <div className="form__points">
          {formOptions.points.map((p) => (
            <button
              type="button"
              key={p}
              className={`opt${points === p ? " is-on" : ""}`}
              aria-pressed={points === p}
              onClick={() => setPoints((cur) => (cur === p ? "" : p))}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="field">
        <legend>Что хотите улучшить</legend>
        <div className="form__goals">
          {formOptions.goals.map((g) => (
            <button
              type="button"
              key={g}
              className={`opt opt--chip${goals.includes(g) ? " is-on" : ""}`}
              aria-pressed={goals.includes(g)}
              onClick={() => toggleGoal(g)}
            >
              <span className="dot" aria-hidden="true" />
              {g}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="consent">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            setErrors((x) => ({ ...x, agree: undefined }));
          }}
        />
        <span>
          Даю <a href="/consent/" target="_blank">согласие на обработку персональных данных</a> и принимаю{" "}
          <a href="/privacy/" target="_blank">политику конфиденциальности</a> *
        </span>
      </label>
      {errors.agree && <span className="field__error">{errors.agree}</span>}
      <button type="submit" className="btn btn--dark btn--lg" disabled={status === "sending"}>
        <span className="dot" aria-hidden="true" />
        {status === "sending" ? "Отправляем…" : site.cta}
      </button>
      {status === "error" && (
        <span className="field__error" role="alert">
          Не удалось отправить. Попробуйте ещё раз или напишите нам в Telegram.
        </span>
      )}
    </form>
  );
}
