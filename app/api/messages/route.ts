import { z } from "zod";
import { AIRTABLE_TABLES, createAirtableRecord } from "@/lib/airtable";

export const runtime = "nodejs";

const SOURCES = { widget: "Message widget", contact: "Get in Touch form" } as const;

const messageSchema = z.object({
  name: z.string().trim().min(1, "Tell us your name").max(120),
  email: z.email("Enter a valid email").max(200),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(2, "Write a message").max(4000),
  source: z.enum(["widget", "contact"]),
  page: z.string().max(300).optional(),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = messageSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ ok: false, errors: z.flattenError(result.error) }, { status: 400 });
  }

  const { name, email, phone, message, source, page } = result.data;
  const saved = await createAirtableRecord(AIRTABLE_TABLES.messages, {
    Name: name,
    Email: email,
    Phone: phone,
    Message: message,
    Source: SOURCES[source],
    Page: page,
    "Submitted At": new Date().toISOString(),
    Status: "New",
  });

  return Response.json({ ok: saved }, { status: saved ? 200 : 500 });
}
