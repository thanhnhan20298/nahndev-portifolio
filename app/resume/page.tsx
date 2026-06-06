import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/resume/PrintButton";
import "./resume.css";
import { about } from "@/lib/content/about";
import { contact } from "@/lib/content/contact";
import { experience } from "@/lib/content/experience";
import { profile } from "@/lib/content/profile";
import { projects } from "@/lib/content/projects";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `${about.name} — ${about.tagline}. Printable CV.`,
};

export default function ResumePage() {
  return (
    <main className="resume-page mx-auto max-w-3xl px-6 py-10 text-[#111] print:px-0 print:py-0">
      <div className="resume-page__toolbar mb-8 flex flex-wrap items-center gap-4 print:hidden">
        <Link href="/" className="text-sm font-bold underline underline-offset-4">
          ← Portfolio
        </Link>
        <PrintButton />
      </div>

      <header className="border-b-2 border-[#111] pb-4">
        <h1 className="text-3xl font-black uppercase tracking-wide">{about.name}</h1>
        <p className="mt-1 text-lg font-semibold">{profile.role}</p>
        <p className="mt-2 text-sm">
          {contact.email} · {about.location} · {about.availability}
        </p>
      </header>

      <section className="mt-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#e11924]">Summary</h2>
        <p className="mt-2 text-sm leading-relaxed">{about.summary}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#e11924]">Experience</h2>
        <ul className="mt-3 space-y-4">
          {experience.map((job) => (
            <li key={job.title}>
              <p className="font-bold">
                {job.title} · <span className="font-normal">{job.period}</span>
              </p>
              <p className="text-sm text-[#444]">{job.role}</p>
              <ul className="mt-1 list-disc pl-5 text-sm leading-relaxed">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#e11924]">Projects</h2>
        <ul className="mt-3 space-y-3">
          {projects.map((p) => (
            <li key={p.slug} className="text-sm">
              <p className="font-bold">
                {p.title}{" "}
                <span className="font-normal text-[#444]">
                  ({p.year}) — {p.role}
                </span>
              </p>
              <p className="leading-relaxed">{p.description}</p>
              <p className="text-[#444]">{p.github}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#e11924]">Links</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {contact.socials.map((s) => (
            <li key={s.label}>
              {s.label}: {s.url}
            </li>
          ))}
          <li>Portfolio: {siteConfig.url}</li>
        </ul>
      </section>
    </main>
  );
}
