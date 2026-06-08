import { about } from "@/lib/content/about";
import { contact } from "@/lib/content/contact";
import { experience } from "@/lib/content/experience";
import { profile } from "@/lib/content/profile";
import { projects } from "@/lib/content/projects";
import { siteConfig } from "@/lib/config/site";

const MARGIN = 18;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;

type JsPDF = import("jspdf").jsPDF;

function ensureSpace(pdf: JsPDF, y: number, need: number): number {
  const pageH = pdf.internal.pageSize.getHeight();
  if (y + need > pageH - MARGIN) {
    pdf.addPage();
    return MARGIN;
  }
  return y;
}

function writeLines(pdf: JsPDF, lines: string[], x: number, y: number, lineHeight: number): number {
  for (const line of lines) {
    y = ensureSpace(pdf, y, lineHeight);
    pdf.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

function sectionTitle(pdf: JsPDF, y: number, title: string): number {
  y = ensureSpace(pdf, y, 14);
  pdf.setDrawColor(225, 25, 36);
  pdf.setLineWidth(0.6);
  pdf.line(MARGIN, y, MARGIN + 28, y);
  y += 5;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(225, 25, 36);
  pdf.text(title.toUpperCase(), MARGIN, y);
  return y + 6;
}

function bodyText(pdf: JsPDF, y: number, text: string, size = 10): number {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(size);
  pdf.setTextColor(20, 20, 20);
  const lines = pdf.splitTextToSize(text, CONTENT_W);
  return writeLines(pdf, lines, MARGIN, y, size * 0.45) + 2;
}

export async function downloadResumePdf(filename = "nahndev-resume.pdf"): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("PDF download is only available in the browser");
  }

  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  pdf.setFillColor(225, 25, 36);
  pdf.rect(0, 0, PAGE_W, 3, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.setTextColor(20, 20, 20);
  pdf.text(about.name.toUpperCase(), MARGIN, y + 8);
  y += 14;

  pdf.setFontSize(12);
  pdf.setTextColor(90, 90, 90);
  pdf.text(profile.role, MARGIN, y);
  y += 7;

  pdf.setFontSize(9);
  pdf.text(`${contact.email}  |  ${contact.phone}  |  ${about.location}`, MARGIN, y);
  y += 5;
  pdf.setTextColor(225, 25, 36);
  pdf.text(about.availability, MARGIN, y);
  y += 10;

  y = sectionTitle(pdf, y, "Summary");
  y = bodyText(pdf, y, about.summary);

  y = sectionTitle(pdf, y, "Experience");
  for (const job of experience) {
    y = ensureSpace(pdf, y, 20);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(20, 20, 20);
    pdf.text(`${job.title} (${job.period})`, MARGIN, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(90, 90, 90);
    pdf.text(job.role, MARGIN, y);
    y += 5;
    for (const bullet of job.bullets) {
      pdf.setTextColor(20, 20, 20);
      pdf.setFontSize(9.5);
      const lines = pdf.splitTextToSize(`- ${bullet}`, CONTENT_W - 4);
      y = writeLines(pdf, lines, MARGIN + 2, y, 4.2);
    }
    y += 3;
  }

  y = sectionTitle(pdf, y, "Projects");
  for (const p of projects) {
    y = ensureSpace(pdf, y, 18);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(20, 20, 20);
    pdf.text(`${p.title} - ${p.year}`, MARGIN, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(90, 90, 90);
    pdf.text(p.role, MARGIN, y);
    y += 5;
    y = bodyText(pdf, y, p.description, 9);
    pdf.setTextColor(40, 40, 40);
    pdf.setFontSize(8);
    y = writeLines(pdf, pdf.splitTextToSize(p.github, CONTENT_W), MARGIN, y, 4) + 2;
  }

  y = sectionTitle(pdf, y, "Links");
  for (const s of contact.socials) {
    y = ensureSpace(pdf, y, 5);
    pdf.setFontSize(9);
    pdf.setTextColor(20, 20, 20);
    pdf.text(`${s.label}: ${s.url}`, MARGIN, y);
    y += 5;
  }
  y = ensureSpace(pdf, y, 5);
  pdf.text(`Portfolio: ${siteConfig.url}`, MARGIN, y);

  pdf.save(filename);
}
