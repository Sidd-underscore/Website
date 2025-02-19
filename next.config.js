/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'github.com',
            port: '',
            pathname: '/Sidd-underscore/**',
            search: '?raw=true',
          },
        ],
      },
};

module.exports = nextConfig;