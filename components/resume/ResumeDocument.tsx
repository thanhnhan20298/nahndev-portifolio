import { about } from "@/lib/content/about";
import { contact } from "@/lib/content/contact";
import { experience } from "@/lib/content/experience";
import { profile } from "@/lib/content/profile";
import { projects } from "@/lib/content/projects";
import { siteConfig } from "@/lib/config/site";

export function ResumeDocument() {
  return (
    <article className="resume-doc">
      <header className="resume-doc__header">
        <p className="resume-doc__stamp font-label">Classified dossier · CV</p>
        <h1 className="resume-doc__name font-display">{about.name}</h1>
        <p className="resume-doc__role">{profile.role}</p>
        <ul className="resume-doc__meta">
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <a href={`tel:${contact.phoneTel}`}>{contact.phone}</a>
          </li>
          <li>{about.location}</li>
          <li className="resume-doc__avail">{about.availability}</li>
        </ul>
      </header>

      <section className="resume-doc__section">
        <h2 className="resume-doc__heading font-label">Summary</h2>
        <p className="resume-doc__text">{about.summary}</p>
      </section>

      <section className="resume-doc__section">
        <h2 className="resume-doc__heading font-label">Experience</h2>
        <ul className="resume-doc__list">
          {experience.map((job) => (
            <li key={job.title} className="resume-doc__item">
              <p className="resume-doc__item-title">
                {job.title}
                <span className="resume-doc__item-period">{job.period}</span>
              </p>
              <p className="resume-doc__item-role">{job.role}</p>
              <ul className="resume-doc__bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="resume-doc__section">
        <h2 className="resume-doc__heading font-label">Projects</h2>
        <ul className="resume-doc__list">
          {projects.map((p) => (
            <li key={p.slug} className="resume-doc__item">
              <p className="resume-doc__item-title">
                {p.title}
                <span className="resume-doc__item-period">
                  {p.year} · {p.role}
                </span>
              </p>
              <p className="resume-doc__text">{p.description}</p>
              <a href={p.github} className="resume-doc__link" target="_blank" rel="noopener noreferrer">
                {p.github}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="resume-doc__section">
        <h2 className="resume-doc__heading font-label">Links</h2>
        <ul className="resume-doc__links">
          {contact.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={siteConfig.url}>Portfolio</a>
          </li>
        </ul>
      </section>
    </article>
  );
}
