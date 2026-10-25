// Must match the single-select options in the Airtable "Scholarship Sponsors" table.
export const BUDGETS = [
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export const AWARD_TYPES = ["One-time", "Renewable", "Not sure yet"] as const;
