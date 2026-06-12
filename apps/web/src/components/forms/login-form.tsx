"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    errorParam === "CredentialsSignin"
      ? "Invalid email or password."
      : errorParam
        ? "Sign in failed. Please try again."
        : null,
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          result.error.includes("locked")
            ? "Account locked for 15 minutes due to failed attempts."
            : "Invalid email or password.",
        );
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div
          role="alert"
          className="rounded-md border border-rp-danger/30 bg-rp-danger/5 px-4 py-3 text-sm text-rp-danger"
        >
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground",
            "transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15",
          )}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cn(
            "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground",
            "transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15",
          )}
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" variant="primary" disabled={loading} className="w-full">
        {loading ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
