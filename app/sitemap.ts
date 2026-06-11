import { getAllTemplates, getAllCategories } from "@/lib/db";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://replykit.pro";
  const templates = getAllTemplates();
  const categories = getAllCategories();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...templates.map((template) => ({
      url: `${baseUrl}/templates/${template.slug}`,
      lastModified: new Date(template.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
