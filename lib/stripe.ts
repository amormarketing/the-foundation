import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  stripeClient ??= new Stripe(secretKey, {
    apiVersion: "2026-07-29.dahlia",
    maxNetworkRetries: 2,
    typescript: true,
  });

  return stripeClient;
}
