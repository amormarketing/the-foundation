"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createDonationCheckout, type DonationActionState } from "./actions";
import styles from "./donate.module.css";

type Frequency = "monthly" | "once";

const amountOptions: Record<Frequency, readonly number[]> = {
  monthly: [15, 25, 50, 100],
  once: [50, 100, 250, 500],
};

const defaultAmounts: Record<Frequency, number> = {
  monthly: 25,
  once: 100,
};

const initialState: DonationActionState = { error: null };

function formatDollars(amount: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(amount);
}

function SubmitButton({
  amount,
  frequency,
}: {
  amount: number;
  frequency: Frequency;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${styles.submit} button button--dark`}
      disabled={pending}
      type="submit"
    >
      {pending
        ? "Opening checkout…"
        : `Give ${formatDollars(amount)}${frequency === "monthly" ? " monthly" : ""}`}
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

export default function DonationForm() {
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [selectedAmount, setSelectedAmount] = useState(defaultAmounts.monthly);
  const [customAmount, setCustomAmount] = useState("");
  const [state, formAction] = useActionState(
    createDonationCheckout,
    initialState,
  );

  const parsedCustomAmount = Number(customAmount);
  const displayedAmount =
    customAmount &&
    Number.isFinite(parsedCustomAmount) &&
    parsedCustomAmount > 0
      ? parsedCustomAmount
      : selectedAmount;

  function chooseFrequency(nextFrequency: Frequency) {
    setFrequency(nextFrequency);
    setSelectedAmount(defaultAmounts[nextFrequency]);
    setCustomAmount("");
  }

  function chooseAmount(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount("");
  }

  return (
    <form action={formAction} className={styles.form} id="donation-form">
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Choose how you give</legend>
        <div className={styles.frequencyToggle}>
          <label className={styles.frequencyChoice}>
            <input
              checked={frequency === "monthly"}
              name="frequency"
              onChange={() => chooseFrequency("monthly")}
              type="radio"
              value="monthly"
            />
            <span>
              Monthly
              <small>Most impact</small>
            </span>
          </label>

          <label className={styles.frequencyChoice}>
            <input
              checked={frequency === "once"}
              name="frequency"
              onChange={() => chooseFrequency("once")}
              type="radio"
              value="once"
            />
            <span>One time</span>
          </label>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Select a gift amount</legend>
        <div className={styles.amountGrid}>
          {amountOptions[frequency].map((amount) => (
            <label className={styles.amountChoice} key={amount}>
              <input
                checked={selectedAmount === amount && customAmount === ""}
                name="amount"
                onChange={() => chooseAmount(amount)}
                type="radio"
                value={amount}
              />
              <span>{formatDollars(amount)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span>Or enter a custom amount</span>
        <span className={styles.currencyInput}>
          <span aria-hidden="true">$</span>
          <input
            inputMode="decimal"
            max="100000"
            min="5"
            name="customAmount"
            onChange={(event) => setCustomAmount(event.target.value)}
            placeholder="Enter an amount"
            step="1"
            type="number"
            value={customAmount}
          />
        </span>
      </label>

      <p className={styles.billingNote} id="billing-note" aria-live="polite">
        {frequency === "monthly" ? (
          <>
            {formatDollars(displayedAmount)} will be charged today and
            automatically every month until canceled.{" "}
            <a href="mailto:info@thefoundationus.com">Cancel anytime.</a>
          </>
        ) : (
          `${formatDollars(displayedAmount)} will be charged once through secure checkout.`
        )}
      </p>

      <SubmitButton amount={displayedAmount} frequency={frequency} />

      {state.error ? (
        <p className={styles.formError} role="alert">
          {state.error}
        </p>
      ) : null}

      <p className={styles.formNote}>
        Payment details are collected securely by Stripe.
      </p>
    </form>
  );
}
