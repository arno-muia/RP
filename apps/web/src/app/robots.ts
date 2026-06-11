import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ops/", "/dashboard/", "/admin/", "/api/"],
    },
    sitemap: "https://rpwebsite.vercel.app/sitemap.xml",
  };
}
