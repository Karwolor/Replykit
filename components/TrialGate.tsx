"use client";

import { useState } from "react";
import { X, Mail, AlertCircle } from "lucide-react";

interface TrialGateProps {
  type: "copy" | "personalize";
  onClose: () => void;
  onEmailSubmit?: (email: string) => void;
  isSubmitting?: boolean;
}

export default function TrialGate({
  type,
  onClose,
  onEmailSubmit,
  isSubmitting = false,
}: TrialGateProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    onEmailSubmit?.(email);
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 3000);
  };

  const featureName = type === "copy" ? "copy" : "AI personalization";
  const limit = type === "copy" ? "10 copies" : "5 personalization uses";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative animate-in fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="bg-amber-100 rounded-lg p-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Free Trial Limit Reached</h3>
            <p className="text-sm text-gray-600">
              You've used your {limit} for today.
            </p>
          </div>
        </div>

        {!submitted ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Email us to extend your free trial and get unlimited access for 7 days.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 font-medium text-sm"
              >
                <Mail className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Extend Trial"}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              We'll email you with a trial extension code.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-900">Email sent!</p>
            <p className="text-sm text-gray-600">
              Check your inbox for trial extension details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
