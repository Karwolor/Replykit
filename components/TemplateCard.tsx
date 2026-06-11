import Link from "next/link";
import { Template } from "@/lib/templates";
import { Mail, Linkedin, MessageCircle, TrendingUp } from "lucide-react";

const channelIcons: Record<string, any> = {
  Email: Mail,
  LinkedIn: Linkedin,
  Twitter: MessageCircle,
};

export default function TemplateCard({ template }: { template: Template }) {
  const Icon = channelIcons[template.channel] || Mail;

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="block p-6 border border-gray-200 rounded-xl hover:border-brand-500 hover:shadow-md transition bg-white"
    >
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <Icon className="w-4 h-4" />
        <span>{template.channel}</span>
        <span>·</span>
        <span>{template.industry}</span>
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-900">{template.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{template.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="px-2 py-1 bg-brand-50 text-brand-700 rounded">{template.category}</span>
        {template.conversionRate && (
          <span className="flex items-center gap-1 text-green-700">
            <TrendingUp className="w-3 h-3" />
            {template.conversionRate}% reply rate
          </span>
        )}
      </div>
    </Link>
  );
}
