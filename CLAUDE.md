# franch_landing

Next.js-лендинг для франчайзинговых сетей (SSG). Репозиторий: https://github.com/phillfeel/franch_landing

## Ветки и деплой

- Рабочая ветка — `dev`. Коммиты делать и пушить в `dev`, не в `main`.
- `dev` опережает `main`: новую локальную ветку создавать от `origin/dev`.
- `.github/workflows/docker-publish.yml` собирает Docker-образ (`<DOCKERHUB_USERNAME>/franch-landing`) и дёргает вебхук Dokploy, который подтягивает образ и перезапускает контейнер:
  - push в `dev` → теги `dev`, `sha-<commit>` → вебхук `DOKPLOY_FRANCH_DEV_WEBHOOK_URL` (дев-контейнер, образ `:dev`);
  - push в `main` → теги `latest`, `main`, `sha-<commit>` → вебхук `DOKPLOY_FRANCH_WEBHOOK_URL` (прод hubis.ru, образ `:latest`).
- На прод попадает только то, что смержено в `main`.
- Ручной запуск: `gh workflow run docker-publish.yml -R phillfeel/franch_landing --ref dev`.

## После пуша

Проверить, что прогон зелёный:

```bash
gh run list -R phillfeel/franch_landing -b dev -L 3   # или -b main после релиза
```

Упал шаг `Trigger Dokploy deploy` — проблема на стороне Dokploy или вебхука, образ при этом уже опубликован.

## Переменные сборки

Задаются в GitHub (Settings → Secrets and variables → Actions) и передаются как build-args:
`vars.SITE_URL` → `NEXT_PUBLIC_SITE_URL`, `vars.TELEGRAM_URL` → `NEXT_PUBLIC_TELEGRAM_URL`.
Секреты: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `DOKPLOY_FRANCH_WEBHOOK_URL` (прод), `DOKPLOY_FRANCH_DEV_WEBHOOK_URL` (дев), `WEB3FORMS_KEY` (ключ Web3Forms для формы, передаётся build-arg `NEXT_PUBLIC_WEB3FORMS_KEY` и попадает в код страницы).
