import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/api-guard";

type Body = {
  tags?: string[];
  paths?: string[];
};

export async function POST(request: NextRequest) {
  const limited = await enforceRateLimit(request, "api");
  if (limited) return limited;

  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tags = body.tags ?? [];
  const paths = body.paths ?? ["/"];

  for (const tag of tags) {
    // Immediate expiry for webhook-style invalidation from RP OS ECC.
    revalidateTag(tag, { expire: 0 });
  }
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    paths,
    at: new Date().toISOString(),
  });
}
