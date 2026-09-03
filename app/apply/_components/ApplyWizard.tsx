"use client";

import { useState } from "react";
import {
  contactStepSchema,
  questionsStepSchema,
  reviewStepSchema,
  type ApplicationDraft,
} from "../schema";
import styles from "../apply.module.css";

const STEPS = ["contact", "questions", "review"] as const;

const STEP_SCHEMAS = [
  contactStepSchema,
  questionsStepSchema,
  reviewStepSchema,
] as const;

type Step = (typeof STEPS)[number];

const emptyDraft: ApplicationDraft = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  dob: "",
  whyApply: "",
};

export default function ApplyWizard() {
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState<Step>(STEPS[0]);
  const [draft, setDraft] = useState<ApplicationDraft>(emptyDraft);
  const [error, setError] = useState("");

  const currentIndex = STEPS.indexOf(step);
  const totalSteps = STEPS.length;
  const nextStep = STEPS[currentIndex + 1];
  const previousStep = STEPS[currentIndex - 1];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === totalSteps - 1;

  function updateField(field: keyof ApplicationDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function next() {
    const result = STEP_SCHEMAS[currentIndex].safeParse(draft);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please check your information.");
      return;
    }

    setError("");

    if (nextStep) {
      setStep(nextStep);
    }
  }

  function back() {
    setError("");

    if (previousStep) {
      setStep(previousStep);
    }
  }

  if (!hasStarted) {
    return (
      <main className={styles.main}>
        <div className={styles.apply}>
          <h1 className={styles.heading}>Apply</h1>
          <p className={styles.lead}>Tell us about yourself</p>
        </div>
        <button className={styles.button_apply} onClick={() => setHasStarted(true)}>
          Begin
        </button>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <p className={styles.lead}>
        Step {currentIndex + 1} of {totalSteps}
      </p>

      {step === "contact" && (
        <form className={styles.apply_form}>
          <h1 className={styles.heading}>Your Information</h1>
          <label className={styles.apply_label}>
            First name
            <input
              className={styles.apply_input}
              value={draft.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
            />
          </label>

          <label className={styles.apply_label}>
            Last name
            <input
              className={styles.apply_input}
              value={draft.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
            />
          </label>

          <label className={styles.apply_label}>
            Email address
            <input
              className={styles.apply_input}
              type="email"
              value={draft.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </label>

          <label className={styles.apply_label}>
            Phone number
            <input
              className={styles.apply_input}
              type="tel"
              value={draft.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </label>

          <label className={styles.apply_label}>
            Date of birth
            <input
              className={styles.apply_input}
              type="date"
              value={draft.dob}
              onChange={(event) => updateField("dob", event.target.value)}
            />
          </label>
        </form>
      )}

      {step === "questions" && (
        <>
          <h1 className={styles.heading}>About you</h1>

          <label className={styles.apply_label}>
            Why would you like to apply?
            <textarea
              className={styles.textarea}
              value={draft.whyApply}
              onChange={(event) => updateField("whyApply", event.target.value)}
            />
          </label>
        </>
      )}

      {step === "review" && (
        <>
          <h1 className={styles.heading}>Review your application</h1>
          <p className={styles.lead}>
            Name: {draft.firstName} {draft.lastName}
          </p>
          <p className={styles.lead}>Email: {draft.email}</p>
          <p className={styles.lead}>Why you&apos;re applying: {draft.whyApply}</p>
        </>
      )}

      {error && (
        <p className={styles.lead} role="alert">
          {error}
        </p>
      )}

      <nav className={styles.nav}>
        {!isFirstStep && (
          <button className={styles.button_apply} type="button" onClick={back}>
            Back
          </button>
        )}

        {!isLastStep ? (
          <button className={styles.button_apply} type="button" onClick={next}>
            Next
          </button>
        ) : (
          <button
            className={styles.button_apply}
            type="button"
            onClick={() => console.log(draft)}
          >
            Submit application
          </button>
        )}
      </nav>
    </main>
  );
}
