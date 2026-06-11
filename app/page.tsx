import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import TemplateCard from "@/components/TemplateCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getAllTemplates, getAllCategories } from "@/lib/templates";
import { Sparkles, Zap, Search, Copy } from "lucide-react";

export default function Home() {
  const templates = getAllTemplates().slice(0, 6);
  const categories = getAllCategories();

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          200+ free templates · No signup required
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Cold outreach templates that <span className="text-brand-600">actually book calls</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Search, copy, and send battle-tested cold email, LinkedIn DM, and follow-up templates in under 60 seconds. Built for founders, freelancers, and growth teams.
        </p>

        <div className="flex justify-center mb-8">
          <Suspense fallback={<div className="h-16 w-full" />}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex flex-wrap gap-2 justify-center text-sm">
          <span className="text-gray-500">Popular:</span>
          {[
            "SaaS cold email",
            "LinkedIn DM",
            "Follow-up",
            "Real estate",
          ].map((term) => (
            <Link
              key={term}
              href={`/templates?q=${encodeURIComponent(term)}`}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-brand-500 hover:text-brand-600"
            >
              {term}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 border border-blue-200 rounded-2xl max-w-6xl mx-auto px-4 py-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">🎁 Free Trial Plan</h3>
            <p className="text-blue-700 text-sm mb-3">
              Try ReplyKit for free with daily limits:
            </p>
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="font-bold text-xl text-blue-900">10</span>
                <p className="text-xs text-blue-600">copies/day</p>
              </div>
              <div>
                <span className="font-bold text-xl text-blue-900">5</span>
                <p className="text-xs text-blue-600">personalizations/day</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-blue-600">
            Hit the limit? <span className="font-semibold">Email us</span> for a 7-day extension.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Search,
            title: "Searchable",
            desc: "Find the right template in 10 seconds with smart filters by industry, channel, and use case.",
          },
          {
            icon: Copy,
            title: "One-click copy",
            desc: "Copy templates with variables highlighted. Just replace {{first_name}} and send.",
          },
          {
            icon: Zap,
            title: "Battle-tested",
            desc: "Every template is used in the wild with reported reply rates from real campaigns.",
          },
        ].map((feature) => (
          <div key={feature.title} className="text-center">
            <feature.icon className="w-10 h-10 text-brand-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured templates</h2>
          <Link href="/templates" className="text-brand-600 hover:underline text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4">
        <NewsletterSignup />
      </section>
    </div>
  );
}
