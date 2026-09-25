import type { NextConfig } from "next";

// Страница пререндерится на этапе сборки (SSG) в статический HTML: `next build` кладёт готовый сайт в `out/`.
// BASE_PATH нужен для GitHub Pages (https://<user>.github.io/franch_landing). На своём домене оставьте пустым.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
