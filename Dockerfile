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
# TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID задаются при запуске контейнера, без них /api/lead отвечает 503.
# NGINX_ENTRYPOINT_LOCAL_RESOLVERS: образ сам подставит DNS из /etc/resolv.conf в директиву resolver.
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/lead.js /etc/nginx/njs/lead.js
COPY --from=builder /app/out/ /usr/share/nginx/html/
EXPOSE 8080
