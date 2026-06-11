import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-brand-600" />
          <span className="text-xl font-bold">ReplyKit Pro</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/templates" className="hover:text-brand-600">
            Templates
          </Link>
          <Link href="/pricing" className="hover:text-brand-600">
            Pricing
          </Link>
          <Link href="/submit" className="hover:text-brand-600">
            Submit
          </Link>
          <Link
            href="https://twitter.com/yourhandle"
            className="text-gray-500 hover:text-brand-600"
            target="_blank"
          >
            Twitter
          </Link>
        </nav>
      </div>
    </header>
  );
}
