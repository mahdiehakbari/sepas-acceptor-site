const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dentalitapi.sepasholding.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
