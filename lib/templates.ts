import fs from "fs";
import path from "path";

export interface Template {
  slug: string;
  title: string;
  category: string;
  channel: string;
  industry: string;
  description: string;
  conversionRate?: number;
  tags: string[];
  variables: string[];
  publishedAt: string;
  body: string;
}

const templatesDirectory = path.join(process.cwd(), "content", "templates");

function parseMarkdownFile(filePath: string): Template {
  const raw = fs.readFileSync(filePath, "utf8");
  const normalized = raw.replace(/\r\n/g, "\n");
  const [, frontmatter, body] = normalized.match(/---\n([\s\S]*?)---\n([\s\S]*)/) || [];
  if (!frontmatter || body === undefined) {
    throw new Error(`Invalid template file: ${filePath}`);
  }

  const data = frontmatter.split(/\n(?=[A-Za-z_-]+:)/).reduce((acc: any, line) => {
    const [key, ...rest] = line.split(":");
    if (!key) return acc;
    acc[key.trim()] = rest.join(":").trim();
    return acc;
  }, {});

  const slug = path.basename(filePath, path.extname(filePath));

  return {
    slug,
    title: data.title || "",
    category: data.category || "",
    channel: data.channel || "",
    industry: data.industry || "",
    description: data.description || "",
    conversionRate: data.conversionRate ? Number(data.conversionRate) : undefined,
    tags: data.tags
      ? data.tags
          .replace(/\[|\]/g, "")
          .split(",")
          .map((tag: string) => tag.trim())
      : [],
    variables: data.variables
      ? data.variables
          .replace(/\[|\]/g, "")
          .split(",")
          .map((item: string) => item.trim())
      : [],
    publishedAt: data.publishedAt || "",
    body: body.trim(),
  };
}

export function getAllTemplates(): Template[] {
  if (!fs.existsSync(templatesDirectory)) return [];
  return fs
    .readdirSync(templatesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parseMarkdownFile(path.join(templatesDirectory, file)));
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return getAllTemplates().find((template) => template.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllTemplates().map((template) => template.category)));
}

export function searchTemplates(query: string): Template[] {
  const lowerQuery = query.toLowerCase();
  return getAllTemplates().filter((template) => {
    return [
      template.title,
      template.description,
      template.category,
      template.channel,
      template.industry,
      template.body,
      template.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase()
      .includes(lowerQuery);
  });
}
