/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  env: {
    SERVER_PORT: process.env.SERVER_PORT,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/150/**',
      },
      {
        protocol: 'https',
        hostname: 'ocean-hunter.gamefi-1.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    useCache: true,
  },
  transpilePackages: ['three'],
};

export default nextConfig;
