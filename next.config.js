import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './build', // Changes the build output directory to `./dist`.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search1.kakaocdn.net',
        port: '',
        pathname: '/thumb/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "@/styles/mixin.scss";`,
  },
};

export default nextConfig;