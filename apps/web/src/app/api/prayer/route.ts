import { z } from "zod";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().max(200).optional(),
  request: z.string().min(1).max(5000),
  anonymous: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await getPrisma().prayerSubmission.create({
      data: {
        name: data.anonymous ? null : (data.name ?? null),
        request: data.request,
        anonymous: data.anonymous ?? false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    console.error("Prayer submission error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
