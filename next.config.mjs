/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/programmes/learner-support",
        destination: "/programmes/tutoring-services",
        permanent: true,
      },
      {
        source: "/programmes/educator-development",
        destination: "/programmes/teacher-professional-development",
        permanent: true,
      },
      {
        source: "/programmes/study-skills",
        destination: "/programmes/coaching-services",
        permanent: true,
      },
      {
        source: "/subjects/request",
        destination: "/request-a-subject",
        permanent: true,
      },
      {
        source: "/subjects/sciences",
        destination: "/subjects/physical-sciences",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
