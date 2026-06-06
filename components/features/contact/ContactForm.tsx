"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content/contact";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      botcheck: String(data.get("botcheck") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        fallback?: boolean;
        mailto?: string;
        error?: string;
      };

      if (json.fallback && json.mailto) {
        window.location.href = json.mailto;
        setStatus("idle");
        return;
      }

      if (!res.ok || !json.ok) {
        setError(json.error ?? "Could not send. Try email directly.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Email me directly.");
      setStatus("error");
    }
  }

  return (
    <form className="contact-form mt-8 space-y-4" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="contact-form__field block">
          <span className="font-label text-[10px] text-muted-label">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="contact-form__input mt-1 w-full"
          />
        </label>
        <label className="contact-form__field block">
          <span className="font-label text-[10px] text-muted-label">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
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
          className="contact-form__input contact-form__textarea mt-1 w-full resize-y"
        />
      </label>
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="absolute h-0 w-0 opacity-0"
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "site-cta px-6 py-3 text-sm font-black uppercase ink-border",
            status === "sending" && "opacity-60",
          )}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <a
          href={`mailto:${contact.email}`}
          className="text-xs font-bold underline decoration-2 underline-offset-4 hover:text-[var(--accent)]"
        >
          or {contact.email}
        </a>
      </div>
      {status === "sent" && (
        <p className="text-sm font-bold text-[var(--accent)]" role="status">
          Message sent — I&apos;ll reply soon.
        </p>
      )}
      {status === "error" && error && (
        <p className="text-sm font-bold text-[var(--accent)]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
