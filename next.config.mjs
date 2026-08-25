/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'd3gz4mppcaa6yb.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'moraj-group.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aws-s3-moraj-group.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/moraj-opulence',
        destination: '/projects/moraj-opulence',
        permanent: false,
      },
      {
        source: '/residences/:slug',
        destination: '/projects/:slug',
        permanent: false,
      },
    ]
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
