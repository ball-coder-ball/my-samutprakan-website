/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['picsum.photos', 'upload.wikimedia.org', 'tourismthailand.org', 'trueid.net', 'postjung.com'],
  },
  transpileOnly: true,
};

module.exports = nextConfig;