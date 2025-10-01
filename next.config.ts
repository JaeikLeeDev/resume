import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages용 정적 export 설정
  ...(process.env.GITHUB_PAGES === 'true' && {
    output: 'export',
    trailingSlash: true,
    basePath: '/resume',
    assetPrefix: '/resume/',
  }),
  // Vercel용 설정 (기본값)
  ...(process.env.GITHUB_PAGES !== 'true' && {
    trailingSlash: false,
  }),
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
