# Production deploy: Docker Hub → Dokploy

The site is a static Next.js export. GitHub Actions builds `out/` inside a Node 22 builder image, then copies only the generated files into a small Nginx runtime image. Node.js does not run on the VPS.

## Local checks

```bash
npm ci
npm run lint
NEXT_PUBLIC_SITE_URL=https://franch.example.com \
NEXT_PUBLIC_FORM_ENDPOINT=https://example.com/public-form-webhook \
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/example \
npm run build
```

Build and test the production image:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://franch.example.com \
  --build-arg NEXT_PUBLIC_FORM_ENDPOINT=https://example.com/public-form-webhook \
  --build-arg NEXT_PUBLIC_TELEGRAM_URL=https://t.me/example \
  -t franch-landing:test .
docker run --rm -d --name franch-landing-test -p 8080:8080 franch-landing:test
curl -fsS http://localhost:8080/health
curl -fsSL http://localhost:8080/ | grep -i '<h1'
docker rm -f franch-landing-test
```

## GitHub Actions

Configure these Actions Secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
DOKPLOY_FRANCH_WEBHOOK_URL
```

Configure these Actions Variables:

```text
SITE_URL
FORM_ENDPOINT
TELEGRAM_URL
```

`NEXT_PUBLIC_*` values are public by design and are compiled into the static HTML/JS. Never put credentials, API keys, or signing secrets into them.

Each push to `main` publishes `latest`, `main`, and an immutable `sha-<full-git-sha>` tag.

## Docker Hub

Create a private `franch-landing` repository in the namespace used by `DOCKERHUB_USERNAME`. Create a Read + Write token for GitHub Actions. Dokploy only needs read access to the image.

## Dokploy

Create a Docker Application using `<namespace>/franch-landing:latest` and configure:

```text
Container port: 8080
Health check path: /health
Memory limit: 128 MB
CPU limit: 0.10–0.15 CPU
```

Authenticate the Docker Hub registry with a read-capable token. Add the production domain and enable HTTPS/Let's Encrypt. Create a deploy webhook and store its URL in `DOKPLOY_FRANCH_WEBHOOK_URL`.

No runtime environment variables are required: public values are embedded during the GitHub Actions build.

## DNS

Point the production hostname to the VPS with an `A` record, then let Dokploy issue the TLS certificate.

## Verification

```bash
curl -fsS https://franch.example.com/health
curl -fsSL https://franch.example.com/ | grep -i '<h1'
```

Also verify `/sitemap.xml`, `/robots.txt`, canonical URL, `<title>`, description and JSON-LD in page source.

## Rollback

In Dokploy, replace `latest` with the known-good immutable tag:

```text
<namespace>/franch-landing:sha-<full-git-sha>
```

Deploy that tag.
