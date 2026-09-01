"use client";

import { useState } from "react";
import styles from "./apply.module.css";

type Step = "intro" | "contact" | "questions" | "review";

type ApplicationDraft = {
    firstName: string;
    lastName: string;
    email: string;
    phone: number
    address: string;
    dob: string;
    whyApply: string;
    }

const emptyDraft: ApplicationDraft = {
    name: "",
    email: "",
    whyApply: "",
}

export default function ApplicationWizard() {
    const [step, setStep] = useState<Step>("intro");
    const [draft, setDraft] = useState(emptyDraft);
    const [error, setError] = useState("");

    function updateField(field: keyof ApplicationDraft, value: string) {
        setDraft((current) => ({ ...current, [field]: value }));
    }

    function next() {
        if (step === "contact" && (!draft.name || !draft.email)) {
            setError("Please enter your name and email.");
            return;
        }

        if (step === "questions" && !draft.whyApply.trim()) {
            setError("Please answer the question to continue.");
            return;
        }

        setError("");

        if (step === "contact") setStep("questions");
        if (step === "questions") setStep("review");

    }

    function back() {
        setError("");

        if (step === "questions") setStep("contact");
        if (step === "review") setStep("questions");

    }

    if (step === "intro") {
        return (
            <main>
                <h1 className={styles.heading}>Apply</h1>
                <p className={styles.lead}>Tell us about yourself</p>
                <button className={styles.button_apply} onClick={() => setStep("contact")}>Begin</button>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <p className={styles.lead}>Step {step === "contact" ? "1" : step === "questions" ? "2" : "3"} of 3</p>

            {step === "contact" && (
                <form className={styles.apply_form}>
                    <h1 className={styles.heading}>Your Information</h1>
                    <label className={styles.apply_label}>
                        First name
                        <input className={styles.apply_input}
                            value={draft.firstName}
                            onChange={(event) => updateField("firstName", event.target.value)}
                            />
                    </label>

                    <label className={styles.apply_label}>
                        Last name
                        <input className={styles.apply_input}
                            value={draft.lastName}
                            onChange={(event) => updateField("lastName", event.target.value)}
                        />
                    </label>

                    <label className={styles.apply_label}>
                        Email address
                        <input className={styles.apply_input}
                            type="email"
                            value={draft.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            />
                    </label>

                    <label className={styles.apply_label}>
                        Phone number
                        <input className={styles.apply_input}
                            type="phone"
                            value={draft.phone}
                            onChange={(event) => updateField("phone", event.target.value)}
                        />
                    </label>

                    <label className={styles.apply_label}>
                        Date of birth
                        <input className={styles.apply_input}
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
                            value={draft.whyApply}
                            onChange={(event) => updateField("whyApply", event.target.value)}
                            />
                    </label>
                </>
            )}

            {step === "review" && (
                <>
                    <h1 className={styles.heading}>Review your application</h1>
                    <p className={styles.lead}>Name: {draft.name}</p>
                    <p className={styles.lead}>Email: {draft.email}</p>
                    <p className={styles.lead}>Why you're applying: {draft.whyApply}</p>
                </>
            )}

            {error && <p className={styles.lead} role="alert">{error}</p>}

            <nav>
                {step !== "contact" && (
                    <button
                        className={styles.button_apply}
                        type="button"
                        onClick={back}>
                        Back
                    </button>
                )}

                {step !== "review" ? (
                    <button
                        className={styles.button_apply}
                        type="button" onClick={next}>
                        Next
                    </button>
                    ) : (
                    <button
                        className={styles.button_apply}
                        type="button" onClick={() => console.log(draft)}>
                        Submit application
                    </button>
                )}
            </nav>
        </main>
    );
}