import { z } from "zod";
import { AIRTABLE_TABLES, createAirtableRecord } from "@/lib/airtable";
import { AWARD_TYPES, BUDGETS } from "@/app/scholarships/sponsorOptions";

export const runtime = "nodejs";

const sponsorSchema = z.object({
  name: z.string().trim().min(1, "Tell us your name").max(120),
  organization: z.string().trim().max(160).optional(),
  email: z.email("Enter a valid email").max(200),
  phone: z.string().trim().max(40).optional(),
  budget: z.enum(BUDGETS, "Choose a budget range"),
  awardType: z.enum(AWARD_TYPES, "Choose an award type"),
  focusAreas: z.string().trim().max(1000).optional(),
  message: z.string().trim().max(4000).optional(),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = sponsorSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ ok: false, errors: z.flattenError(result.error) }, { status: 400 });
  }

  const data = result.data;
  const saved = await createAirtableRecord(AIRTABLE_TABLES.sponsors, {
    Name: data.name,
    Organization: data.organization,
    Email: data.email,
    Phone: data.phone,
    Budget: data.budget,
    "Award Type": data.awardType,
    "Focus Areas": data.focusAreas,
    Message: data.message,
    "Submitted At": new Date().toISOString(),
    Status: "New",
  });

  return Response.json({ ok: saved }, { status: saved ? 200 : 500 });
}
