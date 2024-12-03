/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/.well-known/:file',
            destination: '/api/.well-known/:file',
            permanent: false,
          },
        ]
      },
    images:{
        unoptimized: true,
    }
};

export default nextConfig;

