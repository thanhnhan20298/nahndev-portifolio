"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content/contact";

export function ContactForm() {
  const [hint, setHint] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setHint("Please fill in name, email, and message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setHint("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Hi nahndev,\n\n${message}\n\n— ${name}\nReply to: ${email}`,
    );

    setHint("Opening your email app… Press Send there to deliver the message to me.");
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="contact-form-wrap mt-8">
      <p className="contact-form__help text-sm leading-relaxed site-text-dim">{contact.formHelp}</p>

      <form className="contact-form mt-4 space-y-4" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="contact-form__field block">
            <span className="font-label text-[10px] text-muted-label">Your name</span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Alex"
              className="contact-form__input mt-1 w-full"
            />
          </label>
          <label className="contact-form__field block">
            <span className="font-label text-[10px] text-muted-label">Your email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="so I can reply"
              className="contact-form__input mt-1 w-full"
            />
          </label>
        </div>
        <label className="contact-form__field block">
          <span className="font-label text-[10px] text-muted-label">Message</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="What would you like to discuss?"
            className="contact-form__input contact-form__textarea mt-1 w-full resize-y"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="site-cta px-6 py-3 text-sm font-black uppercase ink-border"
          >
            Send via email app
          </button>
          <span className="text-xs site-text-dim">
            To: <strong className="text-[var(--ink)]">{contact.email}</strong>
          </span>
        </div>
        {hint && (
          <p className="contact-form__hint text-sm font-bold text-[var(--accent)]" role="status">
            {hint}
          </p>
        )}
      </form>
    </div>
  );
}
