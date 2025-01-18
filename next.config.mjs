/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fellowbackend-production.up.railway.app",
        port: "",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "artistic-card-296c81d2a1.media.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      }
    ],
  },
};

export default nextConfig;