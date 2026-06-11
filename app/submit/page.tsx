"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    category: "Cold Email",
    channel: "Email",
    industry: "SaaS",
    description: "",
    body: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      const result = await response.json();
      console.error("Submission failed", result);
      alert("Submission failed. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Template submitted!</h1>
        <p className="text-gray-600">
          Thanks for contributing. We'll review and publish it within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Submit a template</h1>
      <p className="text-gray-600 mb-8">
        Share a cold outreach template that's worked for you. Help 1,000s of founders book more calls.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <input
          required
          placeholder="Template title (e.g. 'SaaS follow-up email #2')"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />

        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={form.channel}
            onChange={(e) => setForm({ ...form, channel: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option>Email</option>
            <option>LinkedIn</option>
            <option>Twitter</option>
          </select>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option>Cold Email</option>
            <option>Follow-Up</option>
            <option>Re-Engagement</option>
            <option>Closing</option>
          </select>
          <select
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option>SaaS</option>
            <option>Agency</option>
            <option>Coaching</option>
            <option>Real Estate</option>
            <option>eCommerce</option>
            <option>Other</option>
          </select>
        </div>

        <textarea
          required
          placeholder="Short description (1-2 sentences)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />

        <textarea
          required
          placeholder="The actual template (use {{first_name}} for variables)"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm"
        />

        <button
          type="submit"
          className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
        >
          Submit Template
        </button>
      </form>
    </div>
  );
}
