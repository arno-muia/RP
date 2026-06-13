import { z } from "zod";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/api-guard";
import { getPrisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9\s-]{10,20}$/).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0).optional(),
  subject: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const limited = await enforceRateLimit(request, "contact");
  if (limited) return limited;

  try {
    const body = await request.json();
    const data = schema.parse(body);

    if (data.honeypot || data.subject) {
      return NextResponse.json({ success: true });
    }

    await getPrisma().contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
