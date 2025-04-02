/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'your-strapi-instance.elestio.app',
      },
    ],
  },
  env: {
    TOGETHER_AI_API_KEY: process.env.TOGETHER_AI_API_KEY,
  },
};

export default nextConfig; 