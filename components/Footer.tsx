import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2">
          <h3 className="font-bold text-lg mb-2">ReplyKit Pro</h3>
          <p className="text-gray-600">
            The free, searchable library of cold outreach templates that actually book meetings. Built for founders, freelancers, and growth teams.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Templates</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link href="/categories/cold-email">Cold Email</Link></li>
            <li><Link href="/categories/linkedin-dm">LinkedIn DM</Link></li>
            <li><Link href="/categories/follow-up">Follow-Up</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link href="/submit">Submit a template</Link></li>
            <li><a href="https://twitter.com/yourhandle">Twitter</a></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ReplyKit Pro. Built with ❤️.
      </div>
    </footer>
  );
}
