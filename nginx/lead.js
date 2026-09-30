// Приём заявки с формы: POST /api/lead с JSON { name, contact, company, points, goals, page, utm_* }.
// Сообщение собирается здесь из известных полей и уходит в Telegram-бота.
// Токен и чат — из окружения контейнера, в код страницы они не попадают.
// Синтаксис — движок njs: без деструктуризации и for...of.

var FIELDS = [
  ["name", "Имя"],
  ["contact", "Контакт"],
  ["company", "Компания"],
  ["points", "Точек"],
  ["goals", "Что улучшить"],
  ["page", "Страница"],
];

function clean(value, max) {
  if (value === undefined || value === null) return "";
  return String(value).replace(/[\x00-\x1f\x7f]+/g, " ").trim().slice(0, max);
}

// Сообщение уходит с parse_mode HTML: экранируем всё, что пришло от посетителя.
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function reply(r, status, body) {
  r.headersOut["Content-Type"] = "application/json";
  r.headersOut["Cache-Control"] = "no-store";
  r.return(status, JSON.stringify(body));
}

function buildText(data) {
  var lines = ["<b>Новая заявка с лендинга HUBIS</b>", ""];
  for (var i = 0; i < FIELDS.length; i++) {
    var v = clean(data[FIELDS[i][0]], 300);
    if (v) lines.push("<b>" + FIELDS[i][1] + ":</b> " + esc(v));
  }
  var utm = Object.keys(data).filter(function (k) { return /^utm_[a-z_]{1,20}$/.test(k); }).slice(0, 10);
  if (utm.length) {
    lines.push("");
    for (var j = 0; j < utm.length; j++) {
      var u = clean(data[utm[j]], 100);
      if (u) lines.push(utm[j] + ": " + esc(u));
    }
  }
  return lines.join("\n");
}

async function send(r) {
  if (r.method !== "POST") {
    r.headersOut["Allow"] = "POST";
    return reply(r, 405, { ok: false, error: "method" });
  }

  var token = process.env.TELEGRAM_BOT_TOKEN;
  var chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    r.error("lead: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return reply(r, 503, { ok: false, error: "not configured" });
  }

  var data;
  try {
    data = JSON.parse(r.requestText || "");
  } catch (e) {
    return reply(r, 400, { ok: false, error: "json" });
  }
  if (!data || typeof data !== "object" || !clean(data.name, 100) || !clean(data.contact, 100)) {
    return reply(r, 400, { ok: false, error: "fields" });
  }

  try {
    var res = await ngx.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        text: buildText(data),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      var answer = await res.text();
      r.error("lead: telegram answered " + res.status + ": " + answer.slice(0, 300));
      return reply(r, 502, { ok: false, error: "telegram" });
    }
  } catch (e) {
    r.error("lead: telegram request failed: " + e);
    return reply(r, 502, { ok: false, error: "telegram" });
  }

  reply(r, 200, { ok: true });
}

export default { send };
