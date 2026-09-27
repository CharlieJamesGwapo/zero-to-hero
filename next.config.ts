import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/*/hqdefault.jpg",
        search: "",
      },
      {
        protocol: "https",
        hostname: "web.dev",
        pathname: "/learn/*/card.png",
        search: "",
      },
      {
        protocol: "https",
        hostname: "docs.python.org",
        pathname: "/3.14/_images/social_previews/*.png",
        search: "",
      },
      {
        protocol: "https",
        hostname: "react.dev",
        pathname: "/images/og/learn.png",
        search: "",
      },
    ],
  },
};

export default createMDX({})(nextConfig);
