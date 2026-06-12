import { Suspense } from "react";
import MagicLinkClient from "./magic-link-client";

export default function MagicLinkPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="skeleton h-12 w-12 rounded-full" />
      </div>
    }>
      <MagicLinkClient />
    </Suspense>
  );
}
