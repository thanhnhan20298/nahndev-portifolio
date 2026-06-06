"use client";

import { useState } from "react";
import { downloadResumePdf } from "@/lib/resume/generate-pdf";
import { cn } from "@/lib/utils/cn";

export function ResumeDownloadButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onDownload() {
    setLoading(true);
    setError("");
    try {
      downloadResumePdf();
    } catch (err) {
      console.error("[resume-pdf]", err);
      setError("Could not generate PDF. Try again or use /resume in Chrome.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="resume-download flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onDownload}
        disabled={loading}
        className={cn("site-cta px-4 py-2 text-xs font-black uppercase", loading && "opacity-60")}
      >
        {loading ? "Generating…" : "Download PDF"}
      </button>
      {error && (
        <p className="text-xs font-bold text-[var(--accent)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
