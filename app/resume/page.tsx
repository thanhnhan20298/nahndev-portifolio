import type { Metadata } from "next";
import Link from "next/link";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { ResumeDownloadButton } from "@/components/resume/ResumeDownloadButton";
import "./resume.css";
import { about } from "@/lib/content/about";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `${about.name} — ${about.tagline}. CV / resume.`,
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-page__body">
        <div className="resume-page__toolbar">
          <Link href="/" className="resume-page__back">
            ← Back to portfolio
          </Link>
          <ResumeDownloadButton />
        </div>
        <ResumeDocument />
      </div>
    </main>
  );
}
