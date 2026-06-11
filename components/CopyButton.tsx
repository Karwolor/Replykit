"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { canCopy, incrementCopies, getRemainingCopies } from "@/lib/trial";
import TrialGate from "./TrialGate";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showTrialGate, setShowTrialGate] = useState(false);
  const [remaining, setRemaining] = useState(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRemaining(getRemainingCopies());
  }, []);

  const handleCopy = async () => {
    // Only check trial on client
    if (!mounted) return;

    if (!canCopy()) {
      setShowTrialGate(true);
      return;
    }

    await navigator.clipboard.writeText(text);
    incrementCopies();
    setRemaining(getRemainingCopies());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-medium text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy Template
            </>
          )}
        </button>
        {mounted && (
          <span className="text-xs text-gray-500">
            {remaining} left today
          </span>
        )}
      </div>

      {showTrialGate && (
        <TrialGate
          type="copy"
          onClose={() => setShowTrialGate(false)}
          onEmailSubmit={async (email) => {
            await fetch("/api/trial-signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, type: "copy" }),
            });
          }}
        />
      )}
    </>
  );
}
