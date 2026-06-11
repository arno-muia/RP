import { z } from "zod";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await getPrisma().contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
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
