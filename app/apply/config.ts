export const SCHOOL_LEVELS = [
  { value: "hs_senior", label: "High school senior" },
  { value: "undergrad", label: "Currently in college" },
  {
    value: "returning",
    label: "Not in school now, starting or returning next term",
  },
  { value: "hs_junior_or_younger", label: "High school junior or younger" },
  { value: "not_enrolling", label: "Not enrolling in school next term" },
] as const;

export const ELIGIBLE_SCHOOL_LEVELS = ["hs_senior", "undergrad", "returning"] as const;
export const ELIGIBLE_OUTSIDE_US = false;

export const STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "XX", name: "Outside the US" },
] as const;

export const START_TERMS = [
  { value: "spring_2027", label: "Spring 2027" },
  { value: "fall_2027", label: "Fall 2027" },
  { value: "later", label: "Later" },
  { value: "not_sure", label: "Not sure." },
] as const;

const majorOptions = (options: readonly string[]) =>
  options.map((label) => ({ value: label, label }));

export const MAJORS = [
  { group: "Business and management", options: majorOptions(["Business Administration", "Management", "Entrepreneurship", "Human Resources Management", "Marketing", "Finance", "Accounting", "Operations / Supply Chain Management", "Project Management", "International Business"]) },
  { group: "Management in a specific field", options: majorOptions(["Healthcare Administration", "Hospitality and Tourism Management", "Sports Management", "Construction Management", "Engineering Management", "Information Systems / IT Management", "Nonprofit Management", "Public Administration", "Educational Leadership / Administration", "Organizational Leadership"]) },
  { group: "Adjacent", options: majorOptions(["Industrial-Organizational Psychology", "Communications / Public Relations"]) },
  { group: "Other", options: majorOptions(["Undecided — leaning toward one of the above", "Other (tell us)"]) },
] as const;

export const MONEY_FOR = ["Tuition", "Books and supplies", "Housing", "Transportation", "Fees", "Something else."] as const;
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;
export const ROLE_YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;
export const GRAD_YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032] as const;
export const MAX_ROLES = 3;
export const SHORT_ANSWER_MIN = 10;
export const SHORT_ANSWER_MAX = 200;
export const AWARD = { amount: 2500, count: 4, term: "Spring 2027" } as const;
export const DATES = { closes: "2026-11-30", decision: "2026-12-18" } as const;
export const DRAFT_KEY = "foundation-apply-draft";
export const DRAFT_VERSION = 1;
export const DRAFT_TTL_DAYS = 7;

export type SchoolLevel = (typeof SCHOOL_LEVELS)[number]["value"];
export type StateCode = (typeof STATES)[number]["code"];
export type StartTerm = (typeof START_TERMS)[number]["value"];
export type Major = (typeof MAJORS)[number]["options"][number]["value"];
