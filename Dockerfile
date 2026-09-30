# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_TELEGRAM_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_TELEGRAM_URL=$NEXT_PUBLIC_TELEGRAM_URL

RUN npm run lint
RUN npm run build

FROM nginx:1.27-alpine AS runtime
# Заявки с формы уходят в Telegram-бота через nginx (nginx/lead.js).
# Токен и чат: секреты сборки telegram_bot_token и telegram_chat_id (в CI — из секретов GitHub) кладутся файлами
# в /etc/nginx/telegram/. Переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID при запуске главнее файлов.
# Без того и другого /api/lead отвечает 503.
# NGINX_ENTRYPOINT_LOCAL_RESOLVERS: образ сам подставит DNS из /etc/resolv.conf в директиву resolver.
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/lead.js /etc/nginx/njs/lead.js
COPY --from=builder /app/out/ /usr/share/nginx/html/
# Секреты не входят в ключ кэша BuildKit: SECRETS_REV меняется на каждой сборке, чтобы новый токен не терялся в кэше.
ARG SECRETS_REV
RUN --mount=type=secret,id=telegram_bot_token --mount=type=secret,id=telegram_chat_id \
    mkdir -p /etc/nginx/telegram && \
    for f in telegram_bot_token telegram_chat_id; do \
      if [ -s /run/secrets/$f ]; then \
        cp /run/secrets/$f /etc/nginx/telegram/$f && chown root:nginx /etc/nginx/telegram/$f && chmod 0440 /etc/nginx/telegram/$f; \
      fi; \
    done
EXPOSE 8080
