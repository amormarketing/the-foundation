"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function MessageWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstFieldRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
        website: data.get("website"),
        source: "widget",
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

  return (
    <div className="message-widget">
      {open ? (
        <div className="message-widget__panel" role="dialog" aria-labelledby="message-widget-title">
          <div className="message-widget__head">
            <p id="message-widget-title">Message us</p>
            <button
              className="message-widget__close"
              type="button"
              aria-label="Close message panel"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          {status === "sent" ? (
            <div className="message-widget__sent" role="status">
              <p className="message-widget__lead">Thank you. Your message is on its way.</p>
              <p>We&apos;ll get back to you within 48 hours.</p>
              <button className="text-link" type="button" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form message-widget__form" onSubmit={handleSubmit}>
              <p className="message-widget__lead">
                Questions about our scholarships or programs? Send us a note and
                we&apos;ll get back to you within 48 hours.
              </p>
              <label>
                Name
                <input ref={firstFieldRef} autoComplete="name" name="name" required maxLength={120} type="text" />
              </label>
              <label>
                Email
                <input autoComplete="email" name="email" required maxLength={200} type="email" />
              </label>
              <label>
                Message
                <textarea name="message" required minLength={2} maxLength={4000} rows={4} />
              </label>
              <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {status === "error" ? (
                <p className="form-error" role="alert">
                  Something went wrong. Please try again, or email info@thefoundationus.org.
                </p>
              ) : null}
              <button className="button button--dark form-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      ) : null}

      <button
        ref={toggleRef}
        className="message-widget__toggle"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Message us"}
      </button>
    </div>
  );
}
