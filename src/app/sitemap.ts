import type { MetadataRoute } from "next";
import { getPublicSiteContent } from "@/lib/content-store";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPublicSiteContent();
  const articles = content.articles
    .filter((article) => article.published && article.kind === "article")
    .map((article) => ({
      url: absoluteUrl(`/artigos/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: [absoluteUrl(article.imageUrl)],
    }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(siteConfig.image)],
    },
    ...articles,
  ];
}

