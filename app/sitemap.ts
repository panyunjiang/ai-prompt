import type { MetadataRoute } from "next";
import { prompts, categories } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const base = "https://prompt.aiv.yn.cn";

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/en`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/en/search`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const catPages = categories.flatMap((c) => [
    { url: `${base}/category/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/en/category/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
  ]);

  const promptPages = prompts.flatMap((p) => [
    { url: `${base}/prompt/${p.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/en/prompt/${p.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
  ]);

  return [...staticPages, ...catPages, ...promptPages];
}
