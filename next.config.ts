import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 환경에서는 API 라우트를 사용하기 위해 export 비활성화
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/jaeiklee-resume' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/jaeiklee-resume/' : '',
};

export default nextConfig;
