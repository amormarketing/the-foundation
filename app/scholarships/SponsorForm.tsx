"use client";

import { useState, type FormEvent } from "react";
import { AWARD_TYPES, BUDGETS } from "./sponsorOptions";
import styles from "./scholarships.module.css";

type Status = "idle" | "sending" | "sent" | "error";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function SponsorForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");

    const response = await fetch("/api/sponsors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);

    if (response?.ok) {
      form.reset();
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.sponsorPanel} role="status">
        <h3>Thank you.</h3>
        <p className={styles.body}>
          We&apos;ve received your scholarship inquiry and will get back to you
          within 48 hours to talk through next steps.
        </p>
      </div>
    );
  }

  return (
    <form className={`contact-form ${styles.sponsorPanel}`} onSubmit={handleSubmit}>
      <div>
        <h3>Tell us about your scholarship</h3>
        <p className={styles.body}>
          Share a few details and we&apos;ll get back to you within 48 hours.
          Nothing here is a commitment.
        </p>
      </div>

      <div className="form-row">
        <label>
          <span className="full-label">
            Your name <span aria-hidden="true">*</span>
          </span>
          <input autoComplete="name" name="name" required maxLength={120} type="text" />
        </label>
        <label>
          Organization
          <input autoComplete="organization" name="organization" maxLength={160} type="text" />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span className="full-label">
            Email <span aria-hidden="true">*</span>
          </span>
          <input autoComplete="email" name="email" required maxLength={200} type="email" />
        </label>
        <label>
          Phone
          <input autoComplete="tel" name="phone" maxLength={40} type="tel" />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span className="full-label">
            Scholarship budget <span aria-hidden="true">*</span>
          </span>
          <select name="budget" required defaultValue="">
            <option value="" disabled>
              Choose a range
            </option>
            {BUDGETS.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="full-label">
            Award type <span aria-hidden="true">*</span>
          </span>
          <select name="awardType" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {AWARD_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Focus areas
        <input
          name="focusAreas"
          maxLength={1000}
          placeholder="First-generation students, STEM, the arts, civic leadership…"
          type="text"
        />
      </label>
      <label>
        Anything else we should know
        <textarea name="message" maxLength={4000} rows={4} />
      </label>
      <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === "error" ? (
        <p className="form-error" role="alert">
          Something went wrong sending your inquiry. Please try again, or email
          info@thefoundationus.org.
        </p>
      ) : null}

      <button className="button button--dark form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send inquiry"} <ArrowIcon />
      </button>
    </form>
  );
}
