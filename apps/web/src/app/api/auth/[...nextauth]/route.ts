export const dynamic = "force-dynamic";

import { handlers } from "@/lib/auth";
import { enforceRateLimit } from "@/lib/api-guard";
import type { NextRequest } from "next/server";

const { GET, POST: authPost } = handlers;

export { GET };

export async function POST(request: NextRequest) {
  const limited = await enforceRateLimit(request, "auth");
  if (limited) return limited;
  return authPost(request);
}
