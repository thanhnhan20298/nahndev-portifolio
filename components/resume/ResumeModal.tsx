"use client";

import { useResume } from "@/context/ResumeContext";
import { ResumeDocument } from "./ResumeDocument";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

export function ResumeModal() {
  const { open, closeResume } = useResume();
  if (!open) return null;

  return (
    <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Resume">
      <button
        type="button"
        className="resume-modal__backdrop"
        aria-label="Close resume"
        onClick={closeResume}
      />
      <div className="resume-modal__panel ink-border">
        <header className="resume-modal__toolbar">
          <button type="button" className="resume-modal__close site-cta" onClick={closeResume}>
            ✕ Close
          </button>
          <ResumeDownloadButton />
        </header>
        <div className="resume-modal__scroll">
          <ResumeDocument />
        </div>
      </div>
    </div>
  );
}
