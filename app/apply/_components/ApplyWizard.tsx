"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AWARD, DATES, DRAFT_KEY, DRAFT_TTL_DAYS, DRAFT_VERSION, GRAD_YEARS, MAJORS,
  MAX_ROLES, MONEY_FOR, MONTHS, ROLE_YEARS, SCHOOL_LEVELS, SHORT_ANSWER_MAX,
  START_TERMS, STATES,
} from "../config";
import {
  aboutSchema, applicationSchema, detailsSchema, eligibilitySchema, isEligible,
  referenceSchema, reviewSchema, roleSchema, rolesSchema,
} from "../schema";
import styles from "../apply.module.css";

const STEPS = ["eligibility", "roles", "details", "reference", "about", "review"] as const;
const STEP_NAMES = ["Eligibility", "Your leadership", "The details", "Your reference", "About you", "Review"] as const;
type Step = (typeof STEPS)[number];
type View = "intro" | "wizard" | "ineligible" | "confirmation";
type SubmitState = "idle" | "submitting" | "error";
type FieldErrors = Record<string, string>;
type RoleDraft = {
  title: string; where: string; formal: boolean | undefined;
  startMonth: string; startYear: string; current: boolean; endMonth: string; endYear: string;
  people: string; hoursPerWeek: string;
};
type Draft = {
  schoolLevel: string; state: string; startTerm: string; intendedMajor: string; intendedMajorOther: string;
  roles: RoleDraft[]; primaryRoleIndex: string; situation: string; outcome: string;
  refName: string; refRelationship: string; refEmail: string; refPhone: string; refInformed: boolean;
  firstName: string; lastName: string; email: string; phone: string; dob: string; address: string;
  currentSchool: string; gradYear: string; gpa: string; moneyFor: string; costGap: string; heardFrom: string;
  attestTrue: boolean; attestNotRelated: boolean; attestProcess: boolean;
};
type SavedDraft = { version: number; savedAt: string; values: Draft };

const emptyRole = (): RoleDraft => ({
  title: "", where: "", formal: undefined, startMonth: "", startYear: "", current: false,
  endMonth: "", endYear: "", people: "", hoursPerWeek: "",
});
const emptyDraft = (): Draft => ({
  schoolLevel: "", state: "", startTerm: "", intendedMajor: "", intendedMajorOther: "", roles: [emptyRole()],
  primaryRoleIndex: "", situation: "", outcome: "", refName: "", refRelationship: "", refEmail: "", refPhone: "",
  refInformed: false, firstName: "", lastName: "", email: "", phone: "", dob: "", address: "", currentSchool: "",
  gradYear: "", gpa: "", moneyFor: "", costGap: "", heardFrom: "", attestTrue: false, attestNotRelated: false,
  attestProcess: false,
});
const roleKey = (index: number, field: string) => ["roles", index, field].join(".");
const splitYearMonth = (value: unknown) => {
  const [year = "", month = ""] = typeof value === "string" ? value.split("-") : [];
  return { month, year };
};
const normalizeStoredRole = ({ start: legacyStart, end: legacyEnd, ...stored }: Partial<RoleDraft> & { start?: string; end?: string }): RoleDraft => {
  const start = splitYearMonth(legacyStart);
  const end = splitYearMonth(legacyEnd);
  return {
    ...emptyRole(),
    ...stored,
    startMonth: stored.startMonth ?? start.month,
    startYear: stored.startYear ?? start.year,
    endMonth: stored.endMonth ?? end.month,
    endYear: stored.endYear ?? end.year,
  };
};
const roleLabel = (role: RoleDraft) =>
  role.title && role.where ? role.title + " — " + role.where : role.title || role.where || "Untitled role";
const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(value + "T00:00:00Z"),
  );

function RequiredMark() {
  return <span className={styles.requiredMark} aria-hidden="true">*</span>;
}

function ErrorText({ error, field }: { error?: string; field: string }) {
  return error ? <p className={styles.fieldError} id={field + "-error"} role="alert">{error}</p> : null;
}

export default function ApplyWizard() {
  const [view, setView] = useState<View>("intro");
  const [step, setStep] = useState<Step>(STEPS[0]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [referenceId, setReferenceId] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const currentIndex = STEPS.indexOf(step);
  const currentRole = draft.roles[draft.roles.length - 1];
  const canAddRole = Boolean(currentRole && roleSchema.safeParse(currentRole).success);
  const primaryRole = draft.roles[Number(draft.primaryRoleIndex)];
  const roleOptions = useMemo(() => draft.roles.map(roleLabel), [draft.roles]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(DRAFT_KEY);
        if (!stored) return;
        const saved = JSON.parse(stored) as SavedDraft;
        const age = Date.now() - new Date(saved.savedAt).getTime();
        if (saved.version === DRAFT_VERSION && Number.isFinite(age) && age <= DRAFT_TTL_DAYS * 86400000 && saved.values && Array.isArray(saved.values.roles)) {
          setDraft({ ...emptyDraft(), ...saved.values, roles: saved.values.roles.map(normalizeStoredRole) });
          setHasSavedDraft(true);
        } else window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        window.localStorage.removeItem(DRAFT_KEY);
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated || view !== "wizard") return;
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ version: DRAFT_VERSION, savedAt: new Date().toISOString(), values: draft }));
  }, [draft, hydrated, view]);

  useEffect(() => {
    if (view === "intro") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }, [step, view]);

  function clearStoredDraft() {
    window.localStorage.removeItem(DRAFT_KEY);
    setHasSavedDraft(false);
  }
  function resetDraft(nextView: View) {
    clearStoredDraft(); setDraft(emptyDraft()); setErrors({}); setWebsite(""); setSubmitState("idle"); setStep(STEPS[0]); setView(nextView);
  }
  function updateField<Key extends keyof Draft>(field: Key, value: Draft[Key]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }
  function updateRole(index: number, field: keyof RoleDraft, value: RoleDraft[keyof RoleDraft]) {
    setDraft((current) => ({ ...current, roles: current.roles.map((role, roleIndex) => roleIndex === index ? { ...role, [field]: value } : role) }));
  }
  function updateCurrentRole(index: number, current: boolean) {
    setDraft((currentDraft) => ({ ...currentDraft, roles: currentDraft.roles.map((role, roleIndex) => roleIndex === index ? { ...role, current, endMonth: current ? "" : role.endMonth, endYear: current ? "" : role.endYear } : role) }));
  }
  function removeRole(index: number) {
    setDraft((current) => {
      const selected = Number(current.primaryRoleIndex);
      return { ...current, roles: current.roles.filter((_, roleIndex) => roleIndex !== index), primaryRoleIndex: Number.isInteger(selected) && selected >= index ? "" : current.primaryRoleIndex };
    });
  }
  function errorFor(field: string) { return errors[field]; }
  function describedBy(field: string, ...ids: string[]) {
    return [errorFor(field) ? field + "-error" : "", ...ids].filter(Boolean).join(" ") || undefined;
  }
  function showSchemaErrors(result: { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } }) {
    const nextErrors = result.error.issues.reduce<FieldErrors>((collected, issue) => {
      const field = issue.path.map(String).join(".");
      if (!collected[field]) collected[field] = issue.message;
      return collected;
    }, {});
    setErrors(nextErrors);
    const firstField = Object.keys(nextErrors)[0];
    if (firstField) window.requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-error-key="' + firstField + '"]')?.focus());
  }
  function validateCurrentStep() {
    const schemas = [eligibilitySchema, rolesSchema, detailsSchema, referenceSchema, aboutSchema, reviewSchema];
    const result = schemas[currentIndex].safeParse(draft);
    if (!result.success) { showSchemaErrors(result); return false; }
    setErrors({});
    return result.data;
  }
  function goToStep(nextStep: Step) { setErrors({}); setSubmitState("idle"); setStep(nextStep); }
  function next() {
    const values = validateCurrentStep();
    if (!values) return;
    if (step === "eligibility" && !isEligible(draft)) {
      clearStoredDraft(); setDraft(emptyDraft()); setView("ineligible"); return;
    }
    const nextStep = STEPS[currentIndex + 1];
    if (nextStep) goToStep(nextStep);
  }
  function back() {
    const previousStep = STEPS[currentIndex - 1];
    if (previousStep) goToStep(previousStep);
  }
  async function submit() {
    if (!validateCurrentStep()) return;
    const result = applicationSchema.safeParse(draft);
    if (!result.success) { showSchemaErrors(result); return; }
    setSubmitState("submitting");
    try {
      const response = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, website }) });
      const body = (await response.json()) as { ok?: unknown; referenceId?: unknown };
      if (response.status === 200 && body.ok === true && typeof body.referenceId === "string") {
        setReferenceId(body.referenceId); clearStoredDraft(); setView("confirmation");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  }
  function renderMonthYear(index: number, field: "start" | "end") {
    const role = draft.roles[index];
    const monthField = `${field}Month` as "startMonth" | "endMonth";
    const yearField = `${field}Year` as "startYear" | "endYear";
    const key = roleKey(index, monthField);
    return <div className={styles.monthYear}>
      <label className={styles.compactLabel}><span className={styles.labelText}>Month <RequiredMark /></span>
        <select className={styles.applyInput} value={role[monthField]} required aria-required="true" aria-describedby={describedBy(key)} data-error-key={key} onChange={(event) => updateRole(index, monthField, event.target.value)}>
          <option value="">Month</option>{MONTHS.map((month, monthIndex) => <option key={month} value={String(monthIndex + 1).padStart(2, "0")}>{month}</option>)}
        </select>
      </label>
      <label className={styles.compactLabel}><span className={styles.labelText}>Year <RequiredMark /></span>
        <select className={styles.applyInput} value={role[yearField]} required aria-required="true" aria-describedby={describedBy(key)} data-error-key={key} onChange={(event) => updateRole(index, yearField, event.target.value)}>
          <option value="">Year</option>{ROLE_YEARS.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </label>
    </div>;
  }

  if (view === "ineligible") {
    return <main className={styles.main}><section className={styles.wizard}>
      <h1 className={styles.heading} ref={headingRef} tabIndex={-1}>Leadership Scholarship.</h1>
      <p className={styles.copy}>This scholarship is for high school seniors and current or returning college students in the US. If that&apos;s you next year, we&apos;d like to hear from you then.</p>
      <Link className={styles.quietLink} href="/">Return home</Link>
    </section></main>;
  }
  if (view === "confirmation") {
    return <main className={styles.main}><section className={styles.wizard}>
      <h1 className={styles.heading} ref={headingRef} tabIndex={-1}>Application received.</h1>
      <p className={styles.copy}>Your reference number is <span className={styles.referenceId}>{referenceId}</span>. Save it — you&apos;ll need it if you contact us. We&apos;ll email you at {draft.email} with a decision by {formatDate(DATES.decision)}. If you&apos;re a finalist, we&apos;ll ask for a transcript and contact your reference.</p>
      <Link className={styles.quietLink} href="/">Return home</Link>
    </section></main>;
  }
  if (view === "intro") {
    return <main className={styles.main}><section className={styles.wizard}>
      <h1 className={styles.heading}>Leadership Scholarship.</h1>
      <p className={styles.copy}>For students who&apos;ve already led people — with or without a title — and are heading toward a career doing it on purpose.</p>
      <p className={styles.awardLine}>{AWARD.count === 4 ? "Four" : AWARD.count} awards of {"$"}{AWARD.amount.toLocaleString()}, paid directly to your school for the {AWARD.term} term.</p>
      <p className={styles.copy}>What you&apos;ll need: About 10 minutes. Details on one to three times you led something. One person who can confirm it. There&apos;s no essay.</p>
      <p className={styles.smallCopy}>Applications close {formatDate(DATES.closes)}. We contact references. Applications are reviewed by a selection committee. The Foundation US does not discriminate on the basis of race, color, national origin, sex, disability, or religion in its scholarship programs.</p>
      <div className={styles.introActions}>
        <button className={styles.buttonApply} type="button" onClick={() => setView("wizard")}>Start application</button>
        {hasSavedDraft && <button className={styles.quietLink} type="button" onClick={() => resetDraft("wizard")}>Clear and start over</button>}
      </div>
    </section></main>;
  }

  return <main className={styles.main}><section className={styles.wizard}>
    <div className={styles.progressGroup}>
      <p className={styles.progress}>Step {currentIndex + 1} of {STEPS.length} · {STEP_NAMES[currentIndex]}</p>
      <progress className={styles.progressBar} max={STEPS.length} value={currentIndex + 1} aria-hidden="true" />
    </div>
    <h1 className={styles.heading} ref={headingRef} tabIndex={-1}>{STEP_NAMES[currentIndex]}</h1>
    <p className={styles.requiredNote}>Required fields are marked <RequiredMark />.</p>

    {step === "eligibility" && <div className={styles.stepContent}>
      <fieldset className={styles.fieldset}><legend>Where are you in school? <RequiredMark /></legend>
        <div className={styles.radioGroup}>{SCHOOL_LEVELS.map((level) => <label className={styles.choiceLabel} key={level.value}>
          <input type="radio" name="schoolLevel" value={level.value} checked={draft.schoolLevel === level.value} required aria-required="true" aria-describedby={describedBy("schoolLevel")} data-error-key="schoolLevel" onChange={(event) => updateField("schoolLevel", event.target.value)} />
          {level.label}
        </label>)}</div><ErrorText error={errorFor("schoolLevel")} field="schoolLevel" />
      </fieldset>
      <label className={styles.applyLabel}><span className={styles.labelText}>What state do you live in? <RequiredMark /></span>
        <select className={styles.applyInput} value={draft.state} required aria-required="true" aria-describedby={describedBy("state")} data-error-key="state" onChange={(event) => updateField("state", event.target.value)}>
          <option value="">Choose a state</option>{STATES.map((stateOption) => <option key={stateOption.code} value={stateOption.code}>{stateOption.name}</option>)}
        </select><ErrorText error={errorFor("state")} field="state" />
      </label>
      <fieldset className={styles.fieldset}><legend>When does the term you&apos;re applying for start? <RequiredMark /></legend>
        <div className={styles.radioGroup}>{START_TERMS.map((term) => <label className={styles.choiceLabel} key={term.value}>
          <input type="radio" name="startTerm" value={term.value} checked={draft.startTerm === term.value} required aria-required="true" aria-describedby={describedBy("startTerm")} data-error-key="startTerm" onChange={(event) => updateField("startTerm", event.target.value)} />
          {term.label}
        </label>)}</div><ErrorText error={errorFor("startTerm")} field="startTerm" />
      </fieldset>
      <label className={styles.applyLabel}><span className={styles.labelText}>What do you plan to study? <RequiredMark /></span>
        <select className={styles.applyInput} value={draft.intendedMajor} required aria-required="true" aria-describedby={describedBy("intendedMajor")} data-error-key="intendedMajor" onChange={(event) => updateField("intendedMajor", event.target.value)}>
          <option value="">Choose an area of study</option>{MAJORS.map((group) => <optgroup key={group.group} label={group.group}>{group.options.map((major) => <option key={major.value} value={major.value}>{major.label}</option>)}</optgroup>)}
        </select><ErrorText error={errorFor("intendedMajor")} field="intendedMajor" />
      </label>
      {draft.intendedMajor === "Other (tell us)" && <label className={styles.applyLabel}><span className={styles.labelText}>What will you study? <RequiredMark /></span>
        <input className={styles.applyInput} value={draft.intendedMajorOther} minLength={2} maxLength={80} required aria-required="true" aria-describedby={describedBy("intendedMajorOther")} data-error-key="intendedMajorOther" onChange={(event) => updateField("intendedMajorOther", event.target.value)} />
        <ErrorText error={errorFor("intendedMajorOther")} field="intendedMajorOther" />
      </label>}
    </div>}

    {step === "roles" && <div className={styles.stepContent}>
      {draft.roles.map((role, index) => <section className={styles.roleEntry} key={index}>
        <div className={styles.roleHeading}><h2>Role {index + 1}</h2>{draft.roles.length > 1 && <button className={styles.quietLink} type="button" onClick={() => removeRole(index)}>Remove</button>}</div>
        <label className={styles.applyLabel}><span className={styles.labelText}>Role, or what you did <RequiredMark /></span>
          <input className={styles.applyInput} value={role.title} minLength={2} maxLength={80} placeholder="Team captain · Shift lead · Ran my family's food truck on weekends" required aria-required="true" aria-describedby={describedBy(roleKey(index, "title"))} data-error-key={roleKey(index, "title")} onChange={(event) => updateRole(index, "title", event.target.value)} />
          <ErrorText error={errorFor(roleKey(index, "title"))} field={roleKey(index, "title")} />
        </label>
        <label className={styles.applyLabel}><span className={styles.labelText}>Where <RequiredMark /></span>
          <input className={styles.applyInput} value={role.where} minLength={2} maxLength={80} placeholder="Organization, team, business, or family" required aria-required="true" aria-describedby={describedBy(roleKey(index, "where"))} data-error-key={roleKey(index, "where")} onChange={(event) => updateRole(index, "where", event.target.value)} />
          <ErrorText error={errorFor(roleKey(index, "where"))} field={roleKey(index, "where")} />
        </label>
        <fieldset className={styles.fieldset}><legend>Was this a formal position? <RequiredMark /></legend>
          <div className={styles.radioGroup}>
            <label className={styles.choiceLabel}><input type="radio" name={"formal-" + index} checked={role.formal === true} required aria-required="true" aria-describedby={describedBy(roleKey(index, "formal"), "formal-help-" + index)} data-error-key={roleKey(index, "formal")} onChange={() => updateRole(index, "formal", true)} />Yes, I had a title</label>
            <label className={styles.choiceLabel}><input type="radio" name={"formal-" + index} checked={role.formal === false} required aria-required="true" aria-describedby={describedBy(roleKey(index, "formal"), "formal-help-" + index)} data-error-key={roleKey(index, "formal")} onChange={() => updateRole(index, "formal", false)} />No, but I was responsible for it</label>
          </div>
          <p className={styles.helper} id={"formal-help-" + index}>Informal counts. Running the family business, organizing something nobody asked you to organize, taking care of younger siblings so a parent could work — if you were responsible for people or outcomes, it belongs here.</p>
          <ErrorText error={errorFor(roleKey(index, "formal"))} field={roleKey(index, "formal")} />
        </fieldset>
        <fieldset className={styles.fieldset}><legend className={styles.visuallyHidden}>Role dates</legend>
          <div className={styles.dateGroup}>
            <div><p className={styles.dateLabel}>Started <RequiredMark /></p>{renderMonthYear(index, "start")}<ErrorText error={errorFor(roleKey(index, "startMonth"))} field={roleKey(index, "startMonth")} /></div>
            <label className={styles.choiceLabel}><input type="checkbox" checked={role.current} onChange={(event) => updateCurrentRole(index, event.target.checked)} />Still doing this</label>
            {!role.current && <div><p className={styles.dateLabel}>Ended <RequiredMark /></p>{renderMonthYear(index, "end")}<ErrorText error={errorFor(roleKey(index, "endMonth"))} field={roleKey(index, "endMonth")} /></div>}
          </div>
        </fieldset>
        <label className={styles.applyLabel}><span className={styles.labelText}>How many people were you responsible for? <RequiredMark /></span>
          <input className={styles.applyInput} type="number" min="0" max="10000" inputMode="numeric" value={role.people} required aria-required="true" aria-describedby={describedBy(roleKey(index, "people"))} data-error-key={roleKey(index, "people")} onChange={(event) => updateRole(index, "people", event.target.value)} />
          <ErrorText error={errorFor(roleKey(index, "people"))} field={roleKey(index, "people")} />
        </label>
        <label className={styles.applyLabel}><span className={styles.labelText}>How many hours per week, roughly?<RequiredMark /></span>
          <input className={styles.applyInput} type="number" min="1" max="80" inputMode="numeric" value={role.hoursPerWeek} required aria-required="true" aria-describedby={describedBy(roleKey(index, "hoursPerWeek"))} data-error-key={roleKey(index, "hoursPerWeek")} onChange={(event) => updateRole(index, "hoursPerWeek", event.target.value)} />
          <ErrorText error={errorFor(roleKey(index, "hoursPerWeek"))} field={roleKey(index, "hoursPerWeek")} />
        </label>
      </section>)}
      {draft.roles.length < MAX_ROLES && canAddRole && <button className={styles.quietLink} type="button" onClick={() => setDraft((current) => ({ ...current, roles: [...current.roles, emptyRole()] }))}>Add another role</button>}
    </div>}

    {step === "details" && <div className={styles.stepContent}>
      <fieldset className={styles.fieldset}><legend>Which of these should we look at closest? <RequiredMark /></legend>
        <div className={styles.radioGroup}>{roleOptions.map((label, index) => <label className={styles.choiceLabel} key={index}>
          <input type="radio" name="primaryRoleIndex" value={index} checked={draft.primaryRoleIndex === String(index)} required aria-required="true" aria-describedby={describedBy("primaryRoleIndex")} data-error-key="primaryRoleIndex" onChange={(event) => updateField("primaryRoleIndex", event.target.value)} />{label}
        </label>)}</div><ErrorText error={errorFor("primaryRoleIndex")} field="primaryRoleIndex" />
      </fieldset>
      {(["situation", "outcome"] as const).map((field) => {
        const remaining = SHORT_ANSWER_MAX - draft[field].length;
        const counterId = field + "-counter";
        const label = field === "situation" ? "What was the situation when you stepped in?" : "What was different when you left? Give a number if you have one.";
        return <label className={styles.applyLabel} key={field}><span className={styles.labelText}>{label} <RequiredMark /></span>
          <textarea className={styles.textarea} value={draft[field]} minLength={10} maxLength={SHORT_ANSWER_MAX} required aria-required="true" aria-describedby={describedBy(field, counterId)} data-error-key={field} onChange={(event) => updateField(field, event.target.value)} />
          <span className={remaining <= 20 ? styles.counterWarning : styles.counter} id={counterId}>{remaining} left</span>
          <ErrorText error={errorFor(field)} field={field} />
        </label>;
      })}
    </div>}

    {step === "reference" && <div className={styles.stepContent}>
      <p className={styles.copy}>Who can confirm your work in {primaryRole?.title || "this role"}?</p>
      <p className={styles.copy}>Ideally not a parent or guardian — a teacher, coach, employer, neighbor, or relative outside your household. We&apos;ll contact them if you&apos;re a finalist.</p>
      <label className={styles.applyLabel}><span className={styles.labelText}>Their name <RequiredMark /></span><input className={styles.applyInput} value={draft.refName} minLength={2} maxLength={80} required aria-required="true" aria-describedby={describedBy("refName")} data-error-key="refName" onChange={(event) => updateField("refName", event.target.value)} /><ErrorText error={errorFor("refName")} field="refName" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>How they know your work <RequiredMark /></span><input className={styles.applyInput} value={draft.refRelationship} minLength={2} maxLength={80} placeholder="my manager at the restaurant · advisor for the club" required aria-required="true" aria-describedby={describedBy("refRelationship")} data-error-key="refRelationship" onChange={(event) => updateField("refRelationship", event.target.value)} /><ErrorText error={errorFor("refRelationship")} field="refRelationship" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Their email <RequiredMark /></span><input className={styles.applyInput} type="email" value={draft.refEmail} required aria-required="true" aria-describedby={describedBy("refEmail")} data-error-key="refEmail" onChange={(event) => updateField("refEmail", event.target.value)} /><ErrorText error={errorFor("refEmail")} field="refEmail" /></label>
      <label className={styles.applyLabel}>Their phone<input className={styles.applyInput} type="tel" value={draft.refPhone} onChange={(event) => updateField("refPhone", event.target.value)} /></label>
      <label className={styles.choiceLabel}><input type="checkbox" checked={draft.refInformed} required aria-required="true" aria-describedby={describedBy("refInformed")} data-error-key="refInformed" onChange={(event) => updateField("refInformed", event.target.checked)} />I&apos;ve told this person we may contact them <RequiredMark /></label>
      <ErrorText error={errorFor("refInformed")} field="refInformed" />
    </div>}

    {step === "about" && <div className={styles.stepContent}>
      <label className={styles.applyLabel}><span className={styles.labelText}>First name <RequiredMark /></span><input className={styles.applyInput} value={draft.firstName} minLength={1} maxLength={60} required aria-required="true" aria-describedby={describedBy("firstName")} data-error-key="firstName" onChange={(event) => updateField("firstName", event.target.value)} /><ErrorText error={errorFor("firstName")} field="firstName" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Last name <RequiredMark /></span><input className={styles.applyInput} value={draft.lastName} minLength={1} maxLength={60} required aria-required="true" aria-describedby={describedBy("lastName")} data-error-key="lastName" onChange={(event) => updateField("lastName", event.target.value)} /><ErrorText error={errorFor("lastName")} field="lastName" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Email <RequiredMark /></span><input className={styles.applyInput} type="email" value={draft.email} required aria-required="true" aria-describedby={describedBy("email")} data-error-key="email" onChange={(event) => updateField("email", event.target.value)} /><ErrorText error={errorFor("email")} field="email" /></label>
      <label className={styles.applyLabel}>Phone<input className={styles.applyInput} type="tel" value={draft.phone} onChange={(event) => updateField("phone", event.target.value)} /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Date of birth <RequiredMark /></span><input className={styles.applyInput} type="date" max={new Date().toISOString().slice(0, 10)} value={draft.dob} required aria-required="true" aria-describedby={describedBy("dob")} data-error-key="dob" onChange={(event) => updateField("dob", event.target.value)} /><ErrorText error={errorFor("dob")} field="dob" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Mailing address <RequiredMark /></span><input className={styles.applyInput} value={draft.address} minLength={5} maxLength={200} required aria-required="true" aria-describedby={describedBy("address")} data-error-key="address" onChange={(event) => updateField("address", event.target.value)} /><ErrorText error={errorFor("address")} field="address" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Current school <RequiredMark /></span><input className={styles.applyInput} value={draft.currentSchool} minLength={2} maxLength={120} required aria-required="true" aria-describedby={describedBy("currentSchool")} data-error-key="currentSchool" onChange={(event) => updateField("currentSchool", event.target.value)} /><ErrorText error={errorFor("currentSchool")} field="currentSchool" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Expected graduation year <RequiredMark /></span><select className={styles.applyInput} value={draft.gradYear} required aria-required="true" aria-describedby={describedBy("gradYear")} data-error-key="gradYear" onChange={(event) => updateField("gradYear", event.target.value)}><option value="">Choose a year</option>{GRAD_YEARS.map((year) => <option key={year} value={year}>{year}</option>)}</select><ErrorText error={errorFor("gradYear")} field="gradYear" /></label>
      <label className={styles.applyLabel}><span className={styles.labelText}>Current GPA <RequiredMark /></span><input className={styles.applyInput} type="number" min="0" max="5" step="0.01" inputMode="decimal" value={draft.gpa} required aria-required="true" aria-describedby={describedBy("gpa", "gpa-help")} data-error-key="gpa" onChange={(event) => updateField("gpa", event.target.value)} /><span className={styles.helper} id="gpa-help">Unweighted if you know it.</span><ErrorText error={errorFor("gpa")} field="gpa" /></label>
      <fieldset className={styles.fieldset}><legend>What will this money pay for? <RequiredMark /></legend><div className={styles.radioGroup}>{MONEY_FOR.map((option) => <label className={styles.choiceLabel} key={option}><input type="radio" name="moneyFor" value={option} checked={draft.moneyFor === option} required aria-required="true" aria-describedby={describedBy("moneyFor")} data-error-key="moneyFor" onChange={(event) => updateField("moneyFor", event.target.value)} />{option}</label>)}</div><ErrorText error={errorFor("moneyFor")} field="moneyFor" /></fieldset>
      <label className={styles.applyLabel}>How much of next term&apos;s cost is not yet covered?<span className={styles.moneyInput}><span className={styles.currencyPrefix} aria-hidden="true">$</span><input className={styles.applyInput} type="number" min="0" inputMode="decimal" value={draft.costGap} aria-describedby={describedBy("costGap", "costGap-help")} data-error-key="costGap" onChange={(event) => updateField("costGap", event.target.value)} /></span><span className={styles.helper} id="costGap-help">A rough number is fine. We use this only as a tiebreaker.</span><ErrorText error={errorFor("costGap")} field="costGap" /></label>
      <label className={styles.applyLabel}>How did you hear about us?<input className={styles.applyInput} maxLength={120} value={draft.heardFrom} onChange={(event) => updateField("heardFrom", event.target.value)} /></label>
    </div>}

    {step === "review" && <div className={styles.stepContent}>
      <section className={styles.reviewGroup}><div><h2>Eligibility</h2><button className={styles.quietLink} type="button" onClick={() => goToStep("eligibility")}>Edit</button></div><p>{SCHOOL_LEVELS.find((level) => level.value === draft.schoolLevel)?.label}</p><p>{STATES.find((stateOption) => stateOption.code === draft.state)?.name}</p><p>{START_TERMS.find((term) => term.value === draft.startTerm)?.label}</p><p>{draft.intendedMajor}</p></section>
      <section className={styles.reviewGroup}><div><h2>Your leadership</h2><button className={styles.quietLink} type="button" onClick={() => goToStep("roles")}>Edit</button></div>{draft.roles.map((role, index) => <p key={index}>{roleLabel(role)}</p>)}</section>
      <section className={styles.reviewGroup}><div><h2>The details</h2><button className={styles.quietLink} type="button" onClick={() => goToStep("details")}>Edit</button></div><p>{draft.situation}</p><p>{draft.outcome}</p></section>
      <section className={styles.reviewGroup}><div><h2>Your reference</h2><button className={styles.quietLink} type="button" onClick={() => goToStep("reference")}>Edit</button></div><p>{draft.refName}</p><p>{draft.refEmail}</p></section>
      <section className={styles.reviewGroup}><div><h2>About you</h2><button className={styles.quietLink} type="button" onClick={() => goToStep("about")}>Edit</button></div><p>{draft.firstName} {draft.lastName}</p><p>{draft.email}</p><p>{draft.currentSchool}</p></section>
      <section className={styles.reviewGroup}><div><h2>Review</h2><button className={styles.quietLink} type="button" onClick={() => goToStep("review")}>Edit</button></div>
        <label className={styles.choiceLabel}><input type="checkbox" checked={draft.attestTrue} required aria-required="true" aria-describedby={describedBy("attestTrue")} data-error-key="attestTrue" onChange={(event) => updateField("attestTrue", event.target.checked)} />Everything I&apos;ve entered is true and accurate. <RequiredMark /></label><ErrorText error={errorFor("attestTrue")} field="attestTrue" />
        <label className={styles.choiceLabel}><input type="checkbox" checked={draft.attestNotRelated} required aria-required="true" aria-describedby={describedBy("attestNotRelated")} data-error-key="attestNotRelated" onChange={(event) => updateField("attestNotRelated", event.target.checked)} />I&apos;m not related to a board member or selection committee member of The Foundation US. <RequiredMark /></label><ErrorText error={errorFor("attestNotRelated")} field="attestNotRelated" />
        <label className={styles.choiceLabel}><input type="checkbox" checked={draft.attestProcess} required aria-required="true" aria-describedby={describedBy("attestProcess")} data-error-key="attestProcess" onChange={(event) => updateField("attestProcess", event.target.checked)} />I understand references are contacted and finalists are asked for a transcript. <RequiredMark /></label><ErrorText error={errorFor("attestProcess")} field="attestProcess" />
      </section>
      <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
    </div>}

    <nav className={styles.nav} aria-label="Application navigation">
      {currentIndex > 0 && <button className={`${styles.buttonApply} ${styles.buttonSecondary}`} type="button" onClick={back} disabled={submitState === "submitting"}>Back</button>}
      {currentIndex < STEPS.length - 1 ? <button className={styles.buttonApply} type="button" onClick={next}>Next</button> : <button className={styles.buttonApply} type="button" disabled={!draft.attestTrue || !draft.attestNotRelated || !draft.attestProcess || submitState === "submitting"} onClick={submit}>{submitState === "submitting" ? "Submitting…" : "Submit application"}</button>}
    </nav>
    {submitState === "error" && <p className={styles.submitError} role="alert">Something went wrong and your application wasn&apos;t sent. Your answers are still here — try again.</p>}
  </section></main>;
}
