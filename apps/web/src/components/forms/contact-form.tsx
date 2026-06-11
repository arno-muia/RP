"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-burgundy/10 bg-cream p-8">
      <h2 className="font-display text-2xl uppercase tracking-wide text-burgundy">Send a Message</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal">Name</label>
        <input id="name" name="name" type="text" required className="mt-1 w-full rounded-lg border border-burgundy/20 bg-white px-4 py-3 text-sm focus:border-burgundy focus:outline-none" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal">Email</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-burgundy/20 bg-white px-4 py-3 text-sm focus:border-burgundy focus:outline-none" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal">Phone (optional)</label>
        <input id="phone" name="phone" type="tel" className="mt-1 w-full rounded-lg border border-burgundy/20 bg-white px-4 py-3 text-sm focus:border-burgundy focus:outline-none" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal">Message</label>
        <textarea id="message" name="message" rows={4} required className="mt-1 w-full rounded-lg border border-burgundy/20 bg-white px-4 py-3 text-sm focus:border-burgundy focus:outline-none" />
      </div>
      <button type="submit" disabled={status === "loading"} className="w-full rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-light disabled:opacity-50">
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && <p className="text-sm text-green-700">Message sent! We&apos;ll be in touch soon.</p>}
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please email us directly.</p>}
    </form>
  );
}
