import { getAllTemplates, getTemplateBySlug } from "@/lib/templates";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import PersonalizeButton from "@/components/PersonalizeButton";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin, TrendingUp, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const templates = getAllTemplates();
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const template = getTemplateBySlug(params.slug);
  if (!template) return {};
  return {
    title: `${template.title} — Free Template | ReplyKit Pro`,
    description: template.description,
  };
}

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = getTemplateBySlug(params.slug);
  if (!template) notFound();

  const Icon = template.channel === "LinkedIn" ? Linkedin : Mail;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/templates"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to templates
      </Link>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Icon className="w-4 h-4" />
        <span>{template.channel}</span>
        <span>·</span>
        <span>{template.industry}</span>
        <span>·</span>
        <span>{template.category}</span>
      </div>

      <h1 className="text-4xl font-bold mb-4">{template.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{template.description}</p>

      {template.conversionRate && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6">
          <TrendingUp className="w-4 h-4" />
          Reported {template.conversionRate}% reply rate
        </div>
      )}

      {template.variables.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">Replace these variables:</p>
          <div className="flex flex-wrap gap-2">
            {template.variables.map((v) => (
              <code
                key={v}
                className="px-2 py-1 bg-yellow-100 text-yellow-900 rounded text-xs font-mono"
              >
                {`{{${v}}}`}
              </code>
            ))}
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded-xl p-6 bg-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Template</h2>
          <CopyButton text={template.body} />
        </div>
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{template.body}</ReactMarkdown>
        </div>
      </div>

      <div className="mb-6">
        <PersonalizeButton templateBody={template.body} />
      </div>

      {template.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-gray-400" />
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
