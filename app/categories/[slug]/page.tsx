import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import { getAllCategories, getCategoryBySlug, getTemplatesByCategory } from "@/lib/db";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  const templates = getTemplatesByCategory(params.slug);

  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-500">
        <h1 className="text-3xl font-bold mb-4">Category not found</h1>
        <p>Try a different category from the templates page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.count} templates in this category.</p>
      </div>
      {templates.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No templates found.</p>
          <p className="text-sm mt-2">Try a different category.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
