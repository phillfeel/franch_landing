# franch_landing — лендинг HUBIS «AI для франшиз и сетей»

Next.js 16 (App Router) + TypeScript. Страница **пререндерится на этапе сборки** (SSG, `output: "export"`):
поисковики и нейросети получают полный HTML со всем текстом, без выполнения JS. На клиенте гидратируются
только интерактивные блоки: меню, лента модулей, дашборд, скриншоты кейса, презентация и форма.

Дизайн — макет HUBIS (30.09): светло-серый фон, графитовые линии-«связи», бирюзовый акцент;
шрифты Geologica (заголовки) и Golos Text (текст). Главная, страница «Видимость сети» и юридические страницы — в одном стиле.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статический сайт в out/
```

## Где что менять
| Что | Где |
|---|---|
| Все тексты, FAQ, продукты, контакты | `lib/content.ts` |
| Мини-интерфейсы в карточках модулей | `components/ModuleMock.tsx` |
| Схема первого экрана (карточки вокруг ядра) | `hero.nodes` в `lib/content.ts` |
| Стили и токены дизайна | `app/globals.css` |
| SEO: title, description, OpenGraph | `lib/content.ts` (`site`) + `app/layout.tsx` |
| Разметка секций | `app/page.tsx`, общие секции — `components/Sections.tsx` |

## Форма заявки

Форма отправляет `POST /api/lead` на тот же сайт. Его принимает nginx в контейнере ([nginx/lead.js](nginx/lead.js), модуль njs)
и пересылает заявку сообщением в Telegram-бота. Нужны два значения:

- `TELEGRAM_BOT_TOKEN` — токен от @BotFather;
- `TELEGRAM_CHAT_ID` — чат, куда писать: личка (боту сначала нужно написать `/start`) или группа с ботом.

Задаются секретами GitHub (Settings → Secrets and variables → Actions → Secrets): CI кладёт их файлами в Docker-образ,
в код страницы они не попадают. Смена токена — новый секрет и перезапуск сборки. Переменные окружения контейнера
с теми же именами (Dokploy → Environment) главнее секретов из образа.

Без них `/api/lead` отвечает 503, форма показывает ошибку. В `npm run dev` адреса `/api/lead` нет.

Тело запроса — плоский JSON: `{ name, contact, company, points, goals, page, utm_* }` (`goals` — строка через запятую).
Ответ `{ "ok": true }` — заявка доставлена, иначе форма показывает ошибку. Лимит: 5 заявок в минуту с адреса.
UTM-метки из QR-кодов мероприятий сохраняются автоматически.

Ссылка на Telegram — переменная `TELEGRAM_URL` (по умолчанию `https://t.me/`).

## Деплой

Production pipeline: push в `main` → GitHub Actions собирает статический Docker-образ → Docker Hub → Dokploy webhook.
Финальный контейнер содержит только `out/` и Nginx; Node.js на VPS не запускается.

Подробные инструкции по Docker Hub, GitHub Actions, Dokploy, DNS и rollback: `README_DEPLOY.md`.
