const withTM = require('next-transpile-modules')(['react-youtube']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM({
  webpack(config) {
    return config;
  },
});

module.exports = nextConfig
