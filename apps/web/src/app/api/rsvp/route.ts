import { z } from "zod";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/api-guard";
import { getPrisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(7).max(30),
  email: z.string().email().optional().or(z.literal("")),
  partySize: z.number().int().min(1).max(20).default(1),
  firstVisit: z.boolean().default(true),
  visitDate: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  const limited = await enforceRateLimit(request, "contact");
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = schema.parse({
      ...body,
      partySize: body.partySize ? Number(body.partySize) : 1,
      firstVisit: Boolean(body.firstVisit),
    });

    const visitDate = parsed.visitDate ? new Date(parsed.visitDate) : null;
    if (visitDate && Number.isNaN(visitDate.getTime())) {
      return NextResponse.json({ error: "Invalid visit date" }, { status: 400 });
    }

    await getPrisma().visitRsvp.create({
      data: {
        name: parsed.name.trim(),
        phone: parsed.phone.trim(),
        email: parsed.email?.trim() || null,
        partySize: parsed.partySize,
        firstVisit: parsed.firstVisit,
        visitDate,
        notes: parsed.notes?.trim() || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    console.error("RSVP submission error:", error);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
