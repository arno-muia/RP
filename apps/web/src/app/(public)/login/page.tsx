import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";
import { site } from "@/lib/site";

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="glass-frost w-full max-w-md space-y-6 rounded-2xl p-8">
        <div className="text-center">
          <img
            src="/rp-logo.svg"
            alt={site.name}
            width={200}
            height={52}
            className="mx-auto h-12 w-auto"
          />
          <h1 className="font-display mt-6 text-3xl text-foreground">Sign In</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Members and staff — access your portal, giving history, and more.
          </p>
        </div>
        <Suspense fallback={<div className="skeleton h-48 w-full" />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/" className="text-primary transition-colors hover:text-gold-600">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
