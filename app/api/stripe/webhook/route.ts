import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { AIRTABLE_TABLES, createAirtableRecord } from "@/lib/airtable";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return Response.json(
      { error: "Stripe webhook is not configured" },
      { status: 500 },
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const donation = await toDonationRecord(event);

  if (donation) {
    const saved = await createAirtableRecord(AIRTABLE_TABLES.donations, donation, [
      "Stripe Event ID",
    ]);

    // A failed write returns 500 so Stripe retries; the upsert on the event ID
    // keeps retries from creating duplicate rows.
    if (!saved) {
      return Response.json({ error: "Could not record donation" }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}

const customerId = (customer: string | { id: string } | null) =>
  typeof customer === "string" ? customer : customer?.id;

const dollars = (cents: number | null | undefined) =>
  typeof cents === "number" ? cents / 100 : undefined;

async function toDonationRecord(event: Stripe.Event) {
  const base = {
    "Stripe Event ID": event.id,
    Date: new Date(event.created * 1000).toISOString(),
  };

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      return {
        ...base,
        Event: "New donation",
        "Donor Name": session.customer_details?.name ?? undefined,
        Email: session.customer_details?.email ?? undefined,
        Amount: dollars(session.amount_total),
        Frequency: session.mode === "subscription" ? "Monthly" : "One-time",
        "Stripe Customer": customerId(session.customer),
        "Stripe Object": session.id,
      };
    }
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      // The first monthly payment is already recorded by checkout.session.completed.
      if (event.type === "invoice.paid" && invoice.billing_reason !== "subscription_cycle") {
        return null;
      }
      return {
        ...base,
        Event: event.type === "invoice.paid" ? "Monthly renewal" : "Payment failed",
        "Donor Name": invoice.customer_name ?? undefined,
        Email: invoice.customer_email ?? undefined,
        Amount: dollars(event.type === "invoice.paid" ? invoice.amount_paid : invoice.amount_due),
        Frequency: "Monthly",
        "Stripe Customer": customerId(invoice.customer),
        "Stripe Object": invoice.id,
      };
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const id = customerId(subscription.customer);
      const customer = id ? await getStripe().customers.retrieve(id).catch(() => null) : null;
      const details = customer && !customer.deleted ? customer : null;
      return {
        ...base,
        Event: "Monthly canceled",
        "Donor Name": details?.name ?? undefined,
        Email: details?.email ?? undefined,
        Amount: dollars(subscription.items.data[0]?.price.unit_amount),
        Frequency: "Monthly",
        "Stripe Customer": id,
        "Stripe Object": subscription.id,
      };
    }
    default:
      return null;
  }
}
