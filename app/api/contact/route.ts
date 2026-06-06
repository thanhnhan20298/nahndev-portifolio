import { NextResponse } from "next/server";
import { contact } from "@/lib/content/contact";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  botcheck?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (body.botcheck) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "All fields are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const mailBody = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    return NextResponse.json({
      ok: false,
      fallback: true,
      mailto: `mailto:${contact.email}?subject=${subject}&body=${mailBody}`,
    });
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `Portfolio — ${name}`,
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !data.success) {
    return NextResponse.json(
      { ok: false, error: data.message ?? "Delivery failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
