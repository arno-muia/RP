"use client";

import { useState } from "react";
import { formShellClass, inputClass, labelClass, textareaClass } from "@/lib/form-classes";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit} className={formShellClass}>
      <div>
        <label htmlFor="name" className={labelClass}>
          Name (optional for anonymous)
        </label>
        <input
          id="name"
          name="name"
          type="text"
          disabled={anonymous}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="request" className={labelClass}>Prayer Request</label>
        <textarea
          id="request"
          name="request"
          rows={6}
          required
          placeholder="Share what you'd like us to pray for..."
          className={textareaClass}
        />
      </div>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="mt-1 rounded border-border text-primary focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">Submit anonymously</span>
      </label>
      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Submitting…" : "Submit Prayer Request"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-rp-success">
          Prayer request received. Our team is praying with you.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-rp-danger">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
