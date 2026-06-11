import { Check, Sparkles, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Simple, fair pricing</h1>
        <p className="text-xl text-gray-600">
          Start free. Upgrade when you need superpowers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <h3 className="text-lg font-bold mb-1">Free</h3>
          <p className="text-sm text-gray-500 mb-4">Forever</p>
          <p className="text-4xl font-bold mb-6">
            $0<span className="text-lg text-gray-500">/mo</span>
          </p>
          <ul className="space-y-3 mb-6 text-sm">
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              Access to all 200+ templates
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              Search + filter
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              One-click copy
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              3 free AI personalizations/month
            </li>
          </ul>
          <Link
            href="/templates"
            className="block w-full px-4 py-3 border border-gray-300 text-center rounded-lg hover:bg-gray-50 font-medium"
          >
            Start Free
          </Link>
        </div>

        <div className="border-2 border-brand-500 rounded-2xl p-6 bg-white relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full">
            MOST POPULAR
          </div>
          <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            Pro
          </h3>
          <p className="text-sm text-gray-500 mb-4">For active outreachers</p>
          <p className="text-4xl font-bold mb-6">
            $19<span className="text-lg text-gray-500">/mo</span>
          </p>
          <ul className="space-y-3 mb-6 text-sm">
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <strong>Everything in Free, plus:</strong>
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              Unlimited AI personalizations
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              50+ premium templates
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              CRM export (CSV, JSON)
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              Priority support
            </li>
          </ul>
          <a
            href="/api/checkout?plan=pro"
            className="block w-full px-4 py-3 bg-brand-600 text-white text-center rounded-lg hover:bg-brand-700 font-medium"
          >
            Upgrade to Pro
          </a>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Agency
          </h3>
          <p className="text-sm text-gray-500 mb-4">For teams</p>
          <p className="text-4xl font-bold mb-6">
            $79<span className="text-lg text-gray-500">/mo</span>
          </p>
          <ul className="space-y-3 mb-6 text-sm">
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <strong>Everything in Pro, plus:</strong>
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              5 team members included
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              Team-shared template library
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              White-label exports
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              Dedicated success manager
            </li>
          </ul>
          <a
            href="mailto:hello@replykit.pro?subject=Agency Plan"
            className="block w-full px-4 py-3 border border-gray-300 text-center rounded-lg hover:bg-gray-50 font-medium"
          >
            Contact Sales
          </a>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        All plans include a 7-day money-back guarantee. Cancel anytime.
      </div>
    </div>
  );
}
