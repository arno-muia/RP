import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/get-client-ip";
import { checkRateLimit, type RateLimitCategory } from "@/lib/rate-limit";

export async function enforceRateLimit(
  request: Request,
  category: RateLimitCategory,
  identifier?: string
): Promise<NextResponse | null> {
  const id = identifier ?? getClientIp(request);
  const result = await checkRateLimit(category, id);
  if (result.success) return null;

  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: result.retryAfter ? { "Retry-After": String(result.retryAfter) } : undefined,
    }
  );
}
