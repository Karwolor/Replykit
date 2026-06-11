"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
  );
}
