"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://app.loops.so/api/newsletter-form/" +
          process.env.NEXT_PUBLIC_LOOPS_FORM_ID,
        {
          method: "POST",
          body: new URLSearchParams({ email }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100 rounded-2xl p-8 my-12">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-brand-600" />
        <h3 className="text-xl font-bold">Get 10 new templates every Monday</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Join 2,000+ founders getting battle-tested outreach templates in their inbox. Free forever.
      </p>

      {status === "success" ? (
        <p className="text-green-700 font-medium">
          ✅ You're in! Check your inbox to confirm.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@startup.com"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 font-medium"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe Free"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
