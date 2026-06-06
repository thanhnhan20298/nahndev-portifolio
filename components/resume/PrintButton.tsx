"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="resume-page__print rounded border-2 border-[#e11924] bg-[#e11924] px-4 py-2 text-sm font-bold text-white"
    >
      Print / Save PDF
    </button>
  );
}
