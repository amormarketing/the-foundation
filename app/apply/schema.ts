import { z } from "zod";
import {
  ELIGIBLE_OUTSIDE_US,
  ELIGIBLE_SCHOOL_LEVELS,
  GRAD_YEARS,
  MAJORS,
  MAX_ROLES,
  MONEY_FOR,
  SCHOOL_LEVELS,
  SHORT_ANSWER_MAX,
  SHORT_ANSWER_MIN,
  START_TERMS,
  STATES,
} from "./config";

const schoolLevels = SCHOOL_LEVELS.map(({ value }) => value) as [string, ...string[]];
const stateCodes = STATES.map(({ code }) => code) as [string, ...string[]];
const startTerms = START_TERMS.map(({ value }) => value) as [string, ...string[]];
const majors = MAJORS.flatMap(({ options }) => options.map(({ value }) => value)) as [
  string,
  ...string[],
];
const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const decimalPattern = /^\d+(?:\.\d{1,2})?$/;

const toYearMonth = (year: string, month: string) =>
  year && month ? `${year}-${month}` : "";

const requiredText = (minimum: number, maximum: number, message: string) =>
  z.string().trim().min(minimum, message).max(maximum, message);

const requiredInteger = (minimum: number, maximum: number, message: string) =>
  z
    .union([z.string().regex(/^\d+$/, message), z.number()])
    .transform((value) => Number(value))
    .pipe(z.number().int(message).min(minimum, message).max(maximum, message));

const requiredDecimal = (minimum: number, maximum: number, message: string) =>
  z
    .union([
      z.string().regex(decimalPattern, message),
      z.number().refine((value) => decimalPattern.test(String(value)), message),
    ])
    .transform((value) => Number(value))
    .pipe(z.number().min(minimum, message).max(maximum, message));

function isRealPastDate(value: string) {
  if (!datePattern.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day &&
    value < today
  );
}

export const eligibilitySchema = z
  .object({
    schoolLevel: z.enum(schoolLevels, "Choose where you are in school"),
    state: z.enum(stateCodes, "Choose the state where you live"),
    startTerm: z.enum(startTerms, "Choose when your term starts"),
    intendedMajor: z.enum(majors, "Choose what you plan to study"),
    intendedMajorOther: z.string().trim().max(80, "Enter what you plan to study"),
  })
  .superRefine((values, context) => {
    if (values.intendedMajor === "Other (tell us)" && values.intendedMajorOther.length < 2) {
      context.addIssue({ code: "custom", path: ["intendedMajorOther"], message: "Enter what you plan to study" });
    }
  });

export const roleSchema = z
  .object({
    title: requiredText(2, 80, "Enter a role title"),
    where: requiredText(2, 80, "Enter where you did this work"),
    formal: z.boolean("Choose whether you had a formal position"),
    startMonth: z.string(),
    startYear: z.string(),
    current: z.boolean("Choose whether you are still doing this"),
    endMonth: z.string(),
    endYear: z.string(),
    people: requiredInteger(0, 10000, "Enter how many people you were responsible for"),
    hoursPerWeek: requiredInteger(1, 80, "Enter your hours per week"),
  })
  .superRefine((values, context) => {
    const start = toYearMonth(values.startYear, values.startMonth);
    const end = toYearMonth(values.endYear, values.endMonth);

    if (!monthPattern.test(start)) {
      context.addIssue({ code: "custom", path: ["startMonth"], message: "Choose when this role started" });
    }
    if (!values.current && !monthPattern.test(end)) {
      context.addIssue({ code: "custom", path: ["endMonth"], message: "Choose when this role ended" });
    }
    if (!values.current && monthPattern.test(start) && monthPattern.test(end) && end < start) {
      context.addIssue({ code: "custom", path: ["endMonth"], message: "End can't be before start" });
    }
  })
  .transform(({ startMonth, startYear, endMonth, endYear, ...values }) => ({
    ...values,
    start: toYearMonth(startYear, startMonth),
    end: values.current ? "" : toYearMonth(endYear, endMonth),
  }));

export const rolesSchema = z.object({
  roles: z.array(roleSchema).min(1, "Add a role").max(MAX_ROLES, "Keep up to three roles"),
});

export const detailsSchema = z.object({
  primaryRoleIndex: requiredInteger(0, MAX_ROLES - 1, "Pick the role we should look at closest"),
  situation: requiredText(SHORT_ANSWER_MIN, SHORT_ANSWER_MAX, "Enter the situation you stepped into"),
  outcome: requiredText(SHORT_ANSWER_MIN, SHORT_ANSWER_MAX, "Enter what was different when you left"),
});

export const referenceSchema = z.object({
  refName: requiredText(2, 80, "Enter your reference's name"),
  refRelationship: requiredText(2, 80, "Enter how they know your work"),
  refEmail: z.string().trim().min(1, "Enter your reference's email").email("Enter a valid reference email"),
  refPhone: z.string(),
  refInformed: z.literal(true, "Confirm you've told them we may contact you"),
});

export const aboutSchema = z.object({
  firstName: requiredText(1, 60, "Enter your first name"),
  lastName: requiredText(1, 60, "Enter your last name"),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
  phone: z.string(),
  dob: z.string().refine(isRealPastDate, "Enter a real date of birth in the past"),
  address: requiredText(5, 200, "Enter your mailing address"),
  currentSchool: requiredText(2, 120, "Enter your current school"),
  gradYear: requiredInteger(GRAD_YEARS[0], GRAD_YEARS[GRAD_YEARS.length - 1], "Choose your expected graduation year").refine(
    (year) => GRAD_YEARS.includes(year as (typeof GRAD_YEARS)[number]),
    "Choose your expected graduation year",
  ),
  gpa: requiredDecimal(0, 5, "Enter your GPA"),
  moneyFor: z.enum(MONEY_FOR, "Choose what this money will pay for"),
  costGap: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce.number().min(0, "Enter a cost of zero or more").optional(),
  ),
  heardFrom: z.string().trim().max(120, "Use 120 characters or fewer"),
});

export const reviewSchema = z.object({
  attestTrue: z.literal(true, "Confirm that your application is true and accurate"),
  attestNotRelated: z.literal(true, "Confirm that you are not related to a committee member"),
  attestProcess: z.literal(true, "Confirm that you understand the finalist process"),
});

export const applicationSchema = eligibilitySchema
  .safeExtend(rolesSchema.shape)
  .safeExtend(detailsSchema.shape)
  .safeExtend(referenceSchema.shape)
  .safeExtend(aboutSchema.shape)
  .safeExtend(reviewSchema.shape)
  .superRefine((values, context) => {
    if (values.primaryRoleIndex >= values.roles.length) {
      context.addIssue({ code: "custom", path: ["primaryRoleIndex"], message: "Pick the role we should look at closest" });
    }
  });

export function isEligible(values: z.input<typeof eligibilitySchema>) {
  return (
    ELIGIBLE_SCHOOL_LEVELS.includes(values.schoolLevel as (typeof ELIGIBLE_SCHOOL_LEVELS)[number]) &&
    (values.state !== "XX" || ELIGIBLE_OUTSIDE_US)
  );
}

export type EligibilityValues = z.input<typeof eligibilitySchema>;
export type RoleValues = z.input<typeof roleSchema>;
export type RolesValues = z.input<typeof rolesSchema>;
export type DetailsValues = z.input<typeof detailsSchema>;
export type ReferenceValues = z.input<typeof referenceSchema>;
export type AboutValues = z.input<typeof aboutSchema>;
export type ReviewValues = z.input<typeof reviewSchema>;
export type ApplicationDraft = z.input<typeof applicationSchema>;
export type Application = z.output<typeof applicationSchema>;
