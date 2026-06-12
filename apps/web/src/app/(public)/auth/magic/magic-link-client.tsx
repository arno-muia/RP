"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MagicLinkClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    signIn("magic-link", { token, redirect: false })
      .then((result) => {
        if (result?.error) {
          setStatus("error");
          return;
        }
        router.replace("/dashboard");
        router.refresh();
      })
      .catch(() => setStatus("error"));
  }, [token, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <div className="skeleton h-12 w-12 rounded-full" />
        <p className="mt-4 text-muted-foreground">Signing you in…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-2xl text-foreground">Link expired or invalid</h1>
      <p className="mt-2 text-muted-foreground">
        Please request a new sign-in link or use your password at{" "}
        <a href="/login" className="text-primary hover:underline">/login</a>.
      </p>
    </div>
  );
}
