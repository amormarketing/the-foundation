import Link from "next/link";
import styles from "../donate.module.css";

export default function DonationCancelPage() {
  return (
    <main className={styles.statusMain}>
      <section className={styles.statusCard}>
        <span className={styles.eyebrow}>Checkout canceled</span>
        <h1>Your donation was not submitted.</h1>
        <p>
          No charge was made. You can return to the donation form whenever
          you&apos;re ready.
        </p>
        <Link className="button button--dark" href="/donate#donation-form">
          Return to donation
        </Link>
      </section>
    </main>
  );
}
