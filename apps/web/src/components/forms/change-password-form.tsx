"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formShellClass, inputClass, labelClass } from "@/lib/form-classes";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const newPassword = String(data.newPassword);
    const confirmPassword = String(data.confirmPassword);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword,
        }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Failed to change password");

      setStatus("success");
      form.reset();
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={formShellClass}>
      <h1 className="font-display text-2xl text-foreground">Change Password</h1>
      <p className="text-sm text-muted-foreground">
        You must set a new password before continuing.
      </p>

      {error && (
        <p className="text-sm text-rp-danger" role="alert">{error}</p>
      )}

      <div>
        <label htmlFor="currentPassword" className={labelClass}>Current password</label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="newPassword" className={labelClass}>New password</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className={labelClass}>Confirm new password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>

      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Updating…" : status === "success" ? "Password updated!" : "Update Password"}
      </Button>
    </form>
  );
}
