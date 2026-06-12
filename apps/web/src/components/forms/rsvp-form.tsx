"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formShellClass, inputClass, labelClass, textareaClass } from "@/lib/form-classes";
import { cn } from "@/lib/cn";

export function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          partySize: Number(data.partySize) || 1,
          firstVisit: data.firstVisit === "on",
          visitDate: data.visitDate || undefined,
          notes: data.notes || undefined,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.error ?? "Failed to submit RSVP");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className={cn(formShellClass, "text-center")}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rp-success/10 text-rp-success">
          ✓
        </div>
        <h2 className="font-display mt-4 text-2xl text-foreground">You&apos;re on the list!</h2>
        <p className="mt-2 text-muted-foreground">
          Our hospitality team has received your RSVP and will prepare a warm welcome for you.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Submit another RSVP
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={formShellClass} id="rsvp">
      <div>
        <h2 className="font-display text-2xl text-foreground">RSVP for Your Visit</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Let us know you&apos;re coming so our hospitality team can greet you personally.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rsvp-name" className={labelClass}>
            Full name *
          </label>
          <input id="rsvp-name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="rsvp-phone" className={labelClass}>
            Phone number *
          </label>
          <input
            id="rsvp-phone"
            name="phone"
            type="tel"
            required
            placeholder="+254..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rsvp-email" className={labelClass}>
            Email (optional)
          </label>
          <input id="rsvp-email" name="email" type="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="rsvp-party" className={labelClass}>
            Number of people
          </label>
          <input
            id="rsvp-party"
            name="partySize"
            type="number"
            min={1}
            max={20}
            defaultValue={1}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="rsvp-date" className={labelClass}>
          Which Sunday are you planning to visit?
        </label>
        <input id="rsvp-date" name="visitDate" type="date" className={inputClass} />
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="firstVisit"
          defaultChecked
          className="mt-1 rounded border-border text-primary focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">
          This is my first visit to Royal Priesthood Embassy
        </span>
      </label>

      <div>
        <label htmlFor="rsvp-notes" className={labelClass}>
          Anything we should know? (optional)
        </label>
        <textarea
          id="rsvp-notes"
          name="notes"
          rows={3}
          placeholder="Children joining, accessibility needs, etc."
          className={textareaClass}
        />
      </div>

      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Submitting…" : "Confirm RSVP"}
      </Button>

      {status === "error" && (
        <p className="text-sm text-rp-danger" role="alert">
          {errorMessage ?? "Something went wrong. Please try again or contact us directly."}
        </p>
      )}
    </form>
  );
}
