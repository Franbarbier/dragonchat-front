/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // rewrite for mapping front-api against api, so we don't have any conflict with other APIS
  async rewrites() {
    return [
      {
        source: '/front-api/user/:slug*',
        destination: '/api/user/:slug*',
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
