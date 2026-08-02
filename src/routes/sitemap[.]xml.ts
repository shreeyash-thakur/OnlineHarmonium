import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Production site URL. Used for absolute <loc> entries in the sitemap.
const BASE_URL = "https://onlineharmonium.vercel.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/play", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/learn", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/practice", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/play-harmonium-online", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/harmonium-notes", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/how-to-play-harmonium", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/harmonium-songs", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/virtual-harmonium", changefreq: "monthly", priority: "0.7", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.5", lastmod: today },
          { path: "/contact", changefreq: "monthly", priority: "0.5", lastmod: today },
          { path: "/privacy-policy", changefreq: "yearly", priority: "0.3", lastmod: today },
          { path: "/terms", changefreq: "yearly", priority: "0.3", lastmod: today },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
