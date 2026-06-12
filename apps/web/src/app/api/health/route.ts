import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const timestamp = new Date().toISOString();
  let database: "connected" | "unavailable" = "unavailable";

  try {
    await getPrisma().$queryRaw`SELECT 1`;
    database = "connected";
  } catch (error) {
    console.error("[health] Database check failed:", error);
  }

  const ok = database === "connected";

  return NextResponse.json(
    {
      status: ok ? "ok" : "degraded",
      service: "rpwebsite",
      version: "2.0.0",
      database,
      timestamp,
    },
    { status: ok ? 200 : 503 },
  );
}
