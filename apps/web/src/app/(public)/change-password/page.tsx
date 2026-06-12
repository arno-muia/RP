import { Suspense } from "react";
import { ChangePasswordForm } from "@/components/forms/change-password-form";

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="skeleton h-64 w-full rounded-2xl" />}>
          <ChangePasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
