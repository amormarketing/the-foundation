import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import styles from "../donate.module.css";

type DonationSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

function formatAmount(amountInCents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    currency: currency.toUpperCase(),
    style: "currency",
  }).format(amountInCents / 100);
}

export default async function DonationSuccessPage({
  searchParams,
}: DonationSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  let confirmedAmount: string | null = null;
  let isMonthly = false;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);

      if (session.status === "complete" && session.amount_total) {
        confirmedAmount = formatAmount(
          session.amount_total,
          session.currency ?? "usd",
        );
        isMonthly = session.mode === "subscription";
      }
    } catch (error) {
      console.error("Unable to verify Stripe donation session", error);
    }
  }

  return (
    <main className={styles.statusMain}>
      <section className={styles.statusCard}>
        <span className={styles.eyebrow}>
          {confirmedAmount ? "Gift confirmed" : "Thank you"}
        </span>
        <h1>Thank you for investing in the next generation.</h1>
        <p>
          {confirmedAmount
            ? `Your ${confirmedAmount}${isMonthly ? " monthly" : ""} donation was received. Stripe will send your receipt by email.`
            : "Your support helps create meaningful educational opportunities for students."}
        </p>
        {isMonthly ? (
          <p className={styles.statusDetail}>
            This gift renews automatically each month until canceled. Keep your
            Stripe receipt for billing and subscription details.
          </p>
        ) : null}
        <Link className="button button--dark" href="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
