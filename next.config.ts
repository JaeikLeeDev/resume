import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages용 정적 export 설정 (배포 시에만 basePath 적용)
  ...(process.env.GITHUB_PAGES === 'true' && process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    basePath: '/resume',
    assetPrefix: '/resume/',
  }),
  // GitHub Pages용 개발 설정 (로컬에서는 basePath 없음)
  ...(process.env.GITHUB_PAGES === 'true' && process.env.NODE_ENV !== 'production' && {
    trailingSlash: true,
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
