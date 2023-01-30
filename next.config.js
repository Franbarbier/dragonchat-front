/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // rewrite for mapping front-api against api, so we don't have any conflict with other APIS
  async rewrites() {
    return [
      {
        source: '/front-api/user',
        destination: '/api/user',
      },
      {
        source: '/front-api/auth',
        destination: '/api/auth',
      },
      {
        source: '/front-api/logout',
        destination: '/api/logout',
      },
    ]
  },
}

// module.exports = {
//   webpack(config) {
//     config.infrastructureLogging = { debug: /PackFileCache/ }
//     return config;
//   }
// }

module.exports = nextConfig
