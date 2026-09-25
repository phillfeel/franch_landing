# franch_landing — лендинг Robotism «AI для франшиз и сетей»

Next.js 16 (App Router) + TypeScript. Страница **пререндерится на этапе сборки** (SSG, `output: "export"`):
поисковики и нейросети получают полный HTML со всем текстом, без выполнения JS. На клиенте гидратируются
только форма заявки и мобильная sticky-кнопка.

Дизайн — макет «Robotism Аудит-лендинг» (десктоп 1440 / мобайл 390). Контент — ТЗ на редизайн +
черновик структуры от 23.09 (продукты фронт-/бэк-офиса, SOP Copilot, доп. вопросы FAQ, чекбоксы «Что хотите улучшить?»).

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
| Картинки (слоты IMG-01…IMG-16) | положить файл в `public/images/`, прописать путь в `images` в `lib/content.ts` |
| Стили и токены дизайна | `app/globals.css` |
| SEO: title, description, OpenGraph | `lib/content.ts` (`site`) + `app/layout.tsx` |
| Разметка секций | `app/page.tsx` |

## Форма заявки

Без бэкенда форма только показывает экран «Спасибо». Чтобы заявки куда-то приходили, задайте URL вебхука,
принимающего JSON `POST` (свой API, n8n/Make, Telegram-бот, amoCRM/Bitrix24):

- локально: `NEXT_PUBLIC_FORM_ENDPOINT=https://... npm run build`
- на GitHub: Settings → Secrets and variables → Actions → Variables → `FORM_ENDPOINT`

Тело запроса: `{ name, contact, company, points, goals[], utm{}, page }`. UTM-метки из QR-кодов мероприятий сохраняются автоматически.

Ссылка на Telegram — переменная `TELEGRAM_URL` (по умолчанию `https://t.me/`).

## Деплой

Push в `main` → GitHub Actions собирает сайт и публикует на GitHub Pages
(Settings → Pages → Source: **GitHub Actions**). Для своего домена добавьте переменную `CUSTOM_DOMAIN=true`
и `public/CNAME`.
