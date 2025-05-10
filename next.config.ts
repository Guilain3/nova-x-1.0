import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.freepik.com'],
  },
  async rewrites() {
    return [
      // {
      //   source: "/sme", // Custom route
      //   destination: "/sme", // Actual folder
      // },
      {
        source: "/login", // Custom route
        destination: "/auth/sme/login", // Actual folder
      },
      {
        source: "/sme/riskShield",
        destination: "/dashboard/financials/riskShield",
      },
      {
        source: "/sme/insurance",
        destination: "/components/riskShield/InsuranceContent",
      },
      {
        source: "/sme/insurance/application",
        destination: "/components/riskShield/InsuranceApplicationPage",
      },
      // {
      //   source: "/help-center",
      //   destination: "/dashboard/help",
      // },
    ];
  },
};

export default nextConfig;