import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

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

  switch (event.type) {
    case "checkout.session.completed":
      console.info("Donation checkout completed", event.data.object.id);
      break;
    case "invoice.paid":
      console.info("Monthly donation invoice paid", event.data.object.id);
      break;
    case "invoice.payment_failed":
      console.warn("Monthly donation payment failed", event.data.object.id);
      break;
    case "customer.subscription.deleted":
      console.info("Monthly donation canceled", event.data.object.id);
      break;
    default:
      break;
  }

  return Response.json({ received: true });
}
