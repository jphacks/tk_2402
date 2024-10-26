/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,  // SVGの許可を有効化
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'books.google.com',
        port: '',
        pathname: '/books/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'www.googleapis.com',
        port: '',
        pathname: '/books/v1/volumes/**',
      },
      {
        protocol: 'https',
        hostname: 'ndlsearch.ndl.go.jp',
        port: '',
        pathname: '/thumbnail/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
};

export default nextConfig;
