/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      qualities: [75, 85, 95, 100],
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
    async redirects() {
      return [
      ];
    },
};

module.exports = nextConfig;
