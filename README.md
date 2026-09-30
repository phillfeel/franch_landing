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

Заявка уходит из браузера посетителя в [Web3Forms](https://web3forms.com), он присылает письмо на почту,
к которой привязан ключ доступа. Ключ получают на web3forms.com, вписав почту для заявок, и задают при сборке:

- локально: `NEXT_PUBLIC_WEB3FORMS_KEY=<ключ> npm run build`
- на GitHub: Settings → Secrets and variables → Actions → Variables → `WEB3FORMS_KEY`

Без ключа форма показывает ошибку отправки. Ключ публичный по замыслу Web3Forms (виден в коде страницы),
в настройках Web3Forms можно разрешить только домен сайта.

Тело запроса — плоский JSON: служебные `access_key`, `subject`, `from_name`, `botcheck` и поля заявки с русскими
ключами («Имя», «Контакт», «Компания», «Точек», «Что улучшить», «Страница», `utm_*`) — так они и выглядят в письме.
Если в ответе `success` не `true` — форма показывает ошибку. UTM-метки из QR-кодов мероприятий сохраняются автоматически.

Отправка через свой сервер не подходит: хостинг в Москве, api.telegram.org оттуда не открывается.

Ссылка на Telegram — переменная `TELEGRAM_URL` (по умолчанию `https://t.me/`).

## Деплой

Production pipeline: push в `main` → GitHub Actions собирает статический Docker-образ → Docker Hub → Dokploy webhook.
Финальный контейнер содержит только `out/` и Nginx; Node.js на VPS не запускается.

Подробные инструкции по Docker Hub, GitHub Actions, Dokploy, DNS и rollback: `README_DEPLOY.md`.
