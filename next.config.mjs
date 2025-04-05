/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          mime: false,
        };
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  