/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'moraj-group.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/studio',
        destination: 'http://localhost:3333/',
      },
      {
        source: '/studio/:path*',
        destination: 'http://localhost:3333/:path*',
      },
    ]
  },
}

export default nextConfig
