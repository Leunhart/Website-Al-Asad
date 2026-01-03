import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['example.com', 'res.cloudinary.com', 'images.unsplash.com'],
  },
  // Menambahkan konfigurasi untuk optimasi build
  compiler: {
    styledComponents: true,
  },
  // Menambahkan konfigurasi untuk keamanan
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
