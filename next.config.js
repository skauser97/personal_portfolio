/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/personal_portfolio',
  assetPrefix: '/personal_portfolio/',
  images: { unoptimized: true },
  trailingSlash: true,
}
module.exports = nextConfig
