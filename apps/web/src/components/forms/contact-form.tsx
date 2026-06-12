"use client";

import { useState } from "react";
import { formShellClass, inputClass, labelClass, textareaClass } from "@/lib/form-classes";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit} className={formShellClass}>
      <h2 className="font-display text-2xl text-foreground">Send a Message</h2>
      <div>
        <label htmlFor="name" className={labelClass}>Name</label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
        <input id="phone" name="phone" type="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={4} required className={textareaClass} />
      </div>
      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-rp-success">Message sent! We&apos;ll be in touch soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-rp-danger">Something went wrong. Please email us directly.</p>
      )}
    </form>
  );
}
