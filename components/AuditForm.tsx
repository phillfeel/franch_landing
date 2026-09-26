"use client";

import { useState, type FormEvent } from "react";
import { formOptions, site } from "@/lib/content";
import { Icon } from "./Icon";

// Куда отправлять заявку: URL вебхука (свой API, Telegram-бот, amoCRM, Bitrix24 и т.п.), принимает JSON POST.
// Задаётся при сборке через NEXT_PUBLIC_FORM_ENDPOINT. Пока не задан — заявка только показывает экран «Спасибо».
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

type Errors = { name?: boolean; contact?: boolean; agree?: boolean };

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const [k, v] of params) if (k.startsWith("utm_")) utm[k] = v;
  return utm;
}

export function AuditForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [points, setPoints] = useState(formOptions.points[0]);
  const [goals, setGoals] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);
  const [more, setMore] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggleGoal = (g: string) =>
    setGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {
      name: !name.trim(),
      contact: contact.trim().length < 3,
      agree: !agree,
    };
    setErrors(next);
    if (next.name || next.contact || next.agree) return;

    setStatus("sending");
    const payload = { name, contact, company, points, goals, utm: readUtm(), page: window.location.href };
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-card form-card--thanks" role="status">
        <div className="thanks__icon">
          <Icon name="check" size={24} stroke="#12B76A" width={2} />
        </div>
        <div>
          <h3 className="thanks__title">Спасибо, заявка отправлена</h3>
          <p className="muted">Что будет дальше:</p>
        </div>
        <ol className="numlist">
          <li><span>01</span>Свяжемся в течение 2 часов в рабочее время</li>
          <li><span>02</span>Подберём удобное время, пришлём ссылку на звонок</li>
          <li><span>03</span>45 минут разбора и дорожная карта пилота</li>
        </ol>
        <a href={site.telegram} className="btn btn--secondary btn--block" target="_blank" rel="noopener">
          <Icon name="telegram" size={18} /> Написать в Telegram
        </a>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="f-name">Имя*</label>
        <input
          id="f-name"
          type="text"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name || undefined}
        />
        {errors.name && <span className="field__error">Укажите имя</span>}
      </div>
      <div className="field">
        <label htmlFor="f-contact">Телефон или Telegram*</label>
        <input
          id="f-contact"
          type="tel"
          autoComplete="tel"
          placeholder="+7 ··· или @username"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-invalid={errors.contact || undefined}
        />
        {errors.contact && <span className="field__error">Оставьте телефон или ник в Telegram</span>}
      </div>
      {/* На мобилках необязательные поля свёрнуты — форма-сквиз: имя, контакт, кнопка */}
      <div className={`form-more${more ? " is-open" : ""}`}>
        <button
          type="button"
          className="form-more__toggle"
          aria-expanded={more}
          aria-controls="f-more"
          onClick={() => setMore((v) => !v)}
        >
          Детали о сети <span className="muted-light">необязательно</span>
          <span className="form-more__plus" aria-hidden="true">+</span>
        </button>
        <div id="f-more" className="form-more__body">
          <div className="field-row">
            <div className="field">
              <label htmlFor="f-company">Компания</label>
              <input
                id="f-company"
                type="text"
                autoComplete="organization"
                placeholder="Название сети"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="f-points">Количество точек</label>
              <select id="f-points" value={points} onChange={(e) => setPoints(e.target.value)}>
                {formOptions.points.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <fieldset className="field">
            <legend>Что хотите улучшить? <span className="muted-light">необязательно</span></legend>
            <div className="chips">
              {formOptions.goals.map((g) => (
                <button
                  type="button"
                  key={g}
                  className={`chip${goals.includes(g) ? " is-on" : ""}`}
                  aria-pressed={goals.includes(g)}
                  onClick={() => toggleGoal(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <label className="consent">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <a href="#">политикой конфиденциальности</a> (152-ФЗ)
        </span>
      </label>
      {errors.agree && <span className="field__error">Нужно согласие на обработку данных</span>}
      <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : site.cta}
      </button>
      {status === "error" && (
        <span className="field__error" role="alert">
          Не удалось отправить. Попробуйте ещё раз или напишите нам в Telegram.
        </span>
      )}
      <p className="form-note">
        Ответим в течение 2 часов в рабочее время ·{" "}
        <a href={site.telegram} target="_blank" rel="noopener">или напишите в Telegram</a>
      </p>
    </form>
  );
}
