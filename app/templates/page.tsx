import { getAllTemplates, searchTemplates } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import SearchBar from "@/components/SearchBar";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function TemplatesPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; channel?: string };
}) {
  let templates = getAllTemplates();

  if (searchParams.q) {
    templates = searchTemplates(searchParams.q);
  }
  if (searchParams.category) {
    templates = templates.filter(
      (t) => t.category.toLowerCase() === searchParams.category!.toLowerCase()
    );
  }
  if (searchParams.channel) {
    templates = templates.filter(
      (t) => t.channel.toLowerCase() === searchParams.channel!.toLowerCase()
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {searchParams.q
            ? `Results for "${searchParams.q}"`
            : "All outreach templates"}
        </h1>
        <SearchBar />
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No templates found.</p>
          <p className="text-sm mt-2">Try a different search term.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {templates.length} template{templates.length !== 1 ? "s" : ""}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        </>
      )}

      <NewsletterSignup />
    </div>
  );
}
