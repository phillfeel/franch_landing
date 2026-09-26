# franch_landing

Next.js-лендинг для франчайзинговых сетей (SSG). Репозиторий: https://github.com/phillfeel/franch_landing

## Ветки и деплой

- Рабочая ветка — `dev`. Коммиты делать и пушить в `dev`, не в `main`.
- `dev` опережает `main`: новую локальную ветку создавать от `origin/dev`.
- Push в `dev` запускает `.github/workflows/docker-publish.yml`:
  1. сборка Docker-образа и публикация в Docker Hub (`<DOCKERHUB_USERNAME>/franch-landing`, теги `latest`, `main`, `sha-<commit>`);
  2. POST на вебхук Dokploy (секрет `DOKPLOY_FRANCH_WEBHOOK_URL`) — Dokploy подтягивает образ и перезапускает сайт.
- Ручной запуск: `gh workflow run docker-publish.yml -R phillfeel/franch_landing --ref dev`.

## После пуша

Проверить, что прогон зелёный:

```bash
gh run list -R phillfeel/franch_landing -b dev -L 3
```

Упал шаг `Trigger Dokploy deploy` — проблема на стороне Dokploy или вебхука, образ при этом уже опубликован.

## Переменные сборки

Задаются в GitHub (Settings → Secrets and variables → Actions) и передаются как build-args:
`vars.SITE_URL` → `NEXT_PUBLIC_SITE_URL`, `vars.FORM_ENDPOINT` → `NEXT_PUBLIC_FORM_ENDPOINT`, `vars.TELEGRAM_URL` → `NEXT_PUBLIC_TELEGRAM_URL`.
Секреты: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `DOKPLOY_FRANCH_WEBHOOK_URL`.
