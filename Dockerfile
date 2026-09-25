FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_FORM_ENDPOINT
ARG NEXT_PUBLIC_TELEGRAM_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_FORM_ENDPOINT=$NEXT_PUBLIC_FORM_ENDPOINT \
    NEXT_PUBLIC_TELEGRAM_URL=$NEXT_PUBLIC_TELEGRAM_URL

RUN npm run lint
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out/ /usr/share/nginx/html/
EXPOSE 8080
