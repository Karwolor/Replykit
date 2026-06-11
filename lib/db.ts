import {
  getAllTemplates as loadAllTemplates,
  getTemplateBySlug as getTemplateBySlugFromFiles,
  searchTemplates as searchTemplatesFromFiles,
  Template,
} from "@/lib/templates";

export type Category = {
  name: string;
  slug: string;
  count: number;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export function getAllTemplates(): Template[] {
  return loadAllTemplates();
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return getTemplateBySlugFromFiles(slug);
}

export function searchTemplates(query: string): Template[] {
  return searchTemplatesFromFiles(query);
}

export function getAllCategories(): Category[] {
  const templates = getAllTemplates();
  const counts: Record<string, number> = {};

  templates.forEach((template) => {
    counts[template.category] = (counts[template.category] || 0) + 1;
  });

  return Object.entries(counts).map(([name, count]) => ({
    name,
    slug: slugify(name),
    count,
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((category) => category.slug === slug);
}

export function getTemplatesByCategory(slug: string): Template[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return getAllTemplates().filter(
    (template) => slugify(template.category) === category.slug
  );
}
