import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Разрешить открывать dev-сервер с телефона по локальной сети
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
