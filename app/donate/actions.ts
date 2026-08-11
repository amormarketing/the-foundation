"use server";

import { redirect } from "next/navigation";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export type DonationActionState = {
  error: string | null;
};

const MINIMUM_DONATION_CENTS = 500;
const MAXIMUM_DONATION_CENTS = 10_000_000;

function parseDonationAmount(formData: FormData) {
  const customAmount = String(formData.get("customAmount") ?? "").trim();
  const selectedAmount = String(formData.get("amount") ?? "").trim();
  const amountText = customAmount || selectedAmount;

  if (!/^\d+(\.\d{1,2})?$/.test(amountText)) {
    return null;
  }

  const amountInCents = Math.round(Number(amountText) * 100);

  if (
    !Number.isSafeInteger(amountInCents) ||
    amountInCents < MINIMUM_DONATION_CENTS ||
    amountInCents > MAXIMUM_DONATION_CENTS
  ) {
    return null;
  }

  return amountInCents;
}

function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL;

  if (!configuredUrl) {
    return null;
  }

  try {
    const siteUrl = new URL(configuredUrl);

    if (siteUrl.protocol !== "http:" && siteUrl.protocol !== "https:") {
      return null;
    }

    return siteUrl.origin;
  } catch {
    return null;
  }
}

export async function createDonationCheckout(
  _previousState: DonationActionState,
  formData: FormData,
): Promise<DonationActionState> {
  const frequency = formData.get("frequency");
  const amountInCents = parseDonationAmount(formData);
  const siteUrl = getSiteUrl();

  if (frequency !== "monthly" && frequency !== "once") {
    return { error: "Choose whether this gift is monthly or one time." };
  }

  if (!amountInCents) {
    return { error: "Enter a donation amount between $5 and $100,000." };
  }

  if (!siteUrl) {
    console.error("SITE_URL is not configured for Stripe Checkout");
    return {
      error: "Online giving is temporarily unavailable. Please try again soon.",
    };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is not configured for Stripe Checkout");
    return {
      error: "Online giving is temporarily unavailable. Please try again soon.",
    };
  }

  const isMonthly = frequency === "monthly";
  const donationMetadata = {
    amount_cents: String(amountInCents),
    frequency,
    source: "website_donation_form",
  };

  const checkoutParams: Stripe.Checkout.SessionCreateParams = {
    billing_address_collection: "auto",
    cancel_url: `${siteUrl}/donate/cancel`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            description: isMonthly
              ? "Automatically renews each month until canceled."
              : "A one-time contribution to The Foundation.",
            name: isMonthly ? "Monthly donation" : "One-time donation",
          },
          ...(isMonthly ? { recurring: { interval: "month" } } : {}),
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    metadata: donationMetadata,
    mode: isMonthly ? "subscription" : "payment",
    ...(isMonthly
      ? { subscription_data: { metadata: donationMetadata } }
      : { payment_intent_data: { metadata: donationMetadata } }),
    submit_type: "donate",
    success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
  };

  let checkoutSession: Stripe.Checkout.Session;

  try {
    checkoutSession =
      await getStripe().checkout.sessions.create(checkoutParams);
  } catch (error) {
    console.error("Unable to create Stripe donation checkout", error);
    return {
      error: "Secure checkout is temporarily unavailable. Please try again.",
    };
  }

  if (!checkoutSession.url) {
    return {
      error: "Secure checkout is temporarily unavailable. Please try again.",
    };
  }

  redirect(checkoutSession.url);
}
