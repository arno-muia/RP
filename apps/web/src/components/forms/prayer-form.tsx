"use client";

import { useState } from "react";

export function PrayerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [anonymous, setAnonymous] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, anonymous }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
      setAnonymous(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-burgundy/10 bg-cream p-8">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal">Name (optional for anonymous)</label>
        <input id="name" name="name" type="text" disabled={anonymous} className="mt-1 w-full rounded-lg border border-burgundy/20 bg-white px-4 py-3 text-sm focus:border-burgundy focus:outline-none disabled:opacity-50" />
      </div>
      <div>
        <label htmlFor="request" className="block text-sm font-medium text-charcoal">Prayer Request</label>
        <textarea id="request" name="request" rows={6} required placeholder="Share what you'd like us to pray for..." className="mt-1 w-full rounded-lg border border-burgundy/20 bg-white px-4 py-3 text-sm focus:border-burgundy focus:outline-none" />
      </div>
      <label className="flex items-start gap-3">
        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="mt-1 rounded border-burgundy/20" />
        <span className="text-sm text-muted">Submit anonymously</span>
      </label>
      <button type="submit" disabled={status === "loading"} className="w-full rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-light disabled:opacity-50">
        {status === "loading" ? "Submitting..." : "Submit Prayer Request"}
      </button>
      {status === "success" && <p className="text-sm text-green-700">Prayer request received. Our team is praying with you.</p>}
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}
