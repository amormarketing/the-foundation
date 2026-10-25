"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${data.get("firstName")} ${data.get("lastName")}`.trim(),
        email: data.get("email"),
        phone: data.get("phone"),
        message: data.get("message"),
        website: data.get("website"),
        source: "contact",
        page: window.location.pathname,
      }),
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
      <div className="contact-form contact-form--sent" role="status">
        <p className="contact-form__title">Thank you. Your message is on its way.</p>
        <p>We&apos;ll get back to you within 48 hours.</p>
        <button className="text-link" type="button" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span className="full-label">
            First name <span aria-hidden="true">*</span>
          </span>
          <input autoComplete="given-name" name="firstName" required maxLength={60} type="text" />
        </label>
        <label>
          <span className="full-label">
            Last name <span aria-hidden="true">*</span>
          </span>
          <input autoComplete="family-name" name="lastName" required maxLength={60} type="text" />
        </label>
      </div>

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
      <label>
        <span className="full-label">
          Message <span aria-hidden="true">*</span>
        </span>
        <textarea name="message" required minLength={2} maxLength={4000} rows={4} />
      </label>
      <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === "error" ? (
        <p className="form-error" role="alert">
          Something went wrong sending your message. Please try again, or email
          info@thefoundationus.org.
        </p>
      ) : null}

      <button className="button button--dark form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} <ArrowIcon />
      </button>
      <p className="form-note">We reply within 48 hours.</p>
    </form>
  );
}
