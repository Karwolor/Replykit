"use client";

import { useState } from "react";

interface PersonalizeButtonProps {
  templateBody: string;
}

export default function PersonalizeButton({ templateBody }: PersonalizeButtonProps) {
  const [prospectInfo, setProspectInfo] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePersonalize = async () => {
    setError("");
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateBody, prospectInfo }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to personalize the template.");
      } else {
        setOutput(result.output);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-2">AI Personalize</h3>
      <p className="text-sm text-gray-600 mb-4">
        Paste prospect details and let AI fill the template variables for you.
      </p>
      <textarea
        value={prospectInfo}
        onChange={(e) => setProspectInfo(e.target.value)}
        rows={4}
        placeholder="Paste prospect bio, recent post, or company notes..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none mb-3"
      />
      <button
        onClick={handlePersonalize}
        disabled={loading || !prospectInfo.trim()}
        className="inline-flex items-center justify-center px-4 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 w-full font-medium"
      >
        {loading ? "Personalizing..." : "Personalize with AI"}
      </button>
      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      {output && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
