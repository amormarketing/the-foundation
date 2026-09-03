# Leadership Scholarship — Build Spec v2

The Foundation US · September 2, 2026

This document has five parts. Part A is decisions for you and Ross. Part B is the final question set. Part C is the Airtable setup you do by hand. Part D is the prompt you paste into Codex. Part E is what must be true before the page goes public.

Read A first. Everything in B–D assumes the defaults in A unless you change them.

---

## Part A — Decisions

### A1. Name and positioning

Working name: **The Foundation Leadership Scholarship.**

The overview needs to say, in plain words, who this is for: students who have already led people — formally or not — and are heading toward a career where they'll do it on purpose. Once that sentence is on the page, asking about leadership roles isn't a surprise requirement; it's the premise.

Later awards (financial studies, leadership course completion) become sibling scholarships with their own pages. This one keeps its name.

### A2. Award structure — fixed, not need-based

Recommendation: **a fixed amount per award.** Three reasons.

1. **It matches the premise.** If the amount varies by need, then need becomes the deciding factor after leadership got the applicant in the door. Ross's basis is leadership. A fixed award keeps it that way.
2. **Need-based amounts require need data.** That means collecting FAFSA Student Aid Index numbers or income documentation from minors, verifying it, and applying a formula consistently. That's a real administrative and privacy load, and it's the kind of thing that goes wrong quietly in year one.
3. **The IRS asks how you determine each grant's amount** (Form 1023 Schedule H, line 4c). "Fixed at $X, set annually by the board based on available funds" is a clean answer. A need formula has to be written down and applied identically every time.

If Ross wants need to matter at all, use it as a **tiebreaker between finalists**, not as a formula. The form collects enough for that (what the money pays for, the cost gap) without collecting documents.

**On the amount:** $1,000–$5,000 is a normal range for a first-year private scholarship. The number itself matters less than the rule: **awards × amount ≤ funds actually on hand**, and you announce only what's funded. A single $2,500 award is credible and visible. Two $1,500 awards reach more students. $5,000 only if it's in the bank and Ross wants one big flag planted. Pick based on the balance, not the ambition.

**Payment goes to the school's financial aid office, not the student.** This is standard for Schedule H supervision ("pay grants directly to a school under an arrangement whereby the school will apply the grant funds only for enrolled students in good standing") and it removes the question of what the money was used for.

### A3. The major dropdown

Criterion you gave: *the career includes managing humans.* Below is the list I'd put in front of Ross. Grouped so the dropdown can use section headers.

**Business and management**
- Business Administration
- Management
- Entrepreneurship
- Human Resources Management
- Marketing
- Finance
- Accounting
- Operations / Supply Chain Management
- Project Management
- International Business

**Management in a specific field**
- Healthcare Administration
- Hospitality and Tourism Management
- Sports Management
- Construction Management
- Engineering Management
- Information Systems / IT Management
- Nonprofit Management
- Public Administration
- Educational Leadership / Administration
- Organizational Leadership

**Adjacent**
- Industrial-Organizational Psychology
- Communications / Public Relations

**Catch-alls**
- Undecided — leaning toward one of the above
- Other (tell us)

Marketing, Finance, Accounting, and Communications are the soft edges. They're the most common business majors and their career paths do run through managing teams, but they're not management majors. Include them and let the committee weigh; excluding them would confuse more applicants than it would filter. "Other" with a text field catches agribusiness, fashion management, aviation management, music business, and whatever else shows up — the committee decides case by case, and if the same "other" appears three times, add it to the list.

"Undecided" stays. Many high school seniors genuinely haven't picked, and a student who says "leaning management" is exactly who you want to hear from.

### A4. Leadership roles — the rules

- **One to three roles.** Applicants add as many as they have, up to three. One is the minimum.
- **Formal and informal are equal.** Every role has a "Was this a formal position?" toggle. The helper text under it says: *Informal counts. Running the family business, organizing something nobody asked you to organize, taking care of younger siblings so a parent could work — if you were responsible for people or outcomes, it belongs here.* The committee sees the toggle as a fact, not a score.
- **One primary role.** After listing roles, the applicant picks the one they want looked at closest. The two short answers and the reference are about that role only. This keeps the form short and gives the committee one thing to verify per applicant.
- **One reference, for the primary role.** Someone who saw the work. The page says *ideally not a parent or guardian — a teacher, coach, employer, neighbor, or relative outside your household.* It's guidance, not a hard block, because for some informal roles a parent is the only witness. The page also says, plainly, **we contact references.** That sentence deters fabrication better than any detector.
- **No recency limit** for v1. Anything during high school or later counts. Revisit if the committee finds itself reading about middle school.

### A5. GPA

Collected in the "About you" step (Step 5), alongside current school and graduation year. Not in the eligibility screen, not mentioned anywhere on the page. The 2.0 floor lives in Airtable as a formula column the committee sees. The applicant never sees a cutoff.

### A6. Defaults I set that you can override

- **Geography:** all 50 states + DC eligible; "Outside the US" is a hard stop at Step 1. Change `ELIGIBLE_OUTSIDE_US` in config if you want to open it.
- **Eligible school levels:** high school seniors, current undergraduates, and students not in school right now who are starting or returning next term (gap year, transfers). High school juniors or younger, and "not planning to enroll," are hard stops.
- **Terms:** Spring 2027, Fall 2027, Later, Not sure. Fall 2026 has already started.
- **Proposed timeline for the first award:** applications open when the page is ready, close **November 30, 2026**, references checked in early December, decision by **December 18**, funds to the school in January for Spring 2027. Adjust as needed; the dates are placeholders in the config file.

### A7. Still open

- Award amount and number of awards (blocks publishing, not building)
- Selection committee — who, and the rule for relatives of committee/board members (the form has an attestation for this; someone has to own the check)
- Ross's sign-off on the name and the major list

---

## Part B — The application, screen by screen

Six steps after the intro. About ten minutes. No essay.

### Intro

**Heading:** Leadership Scholarship

**Lead:** For students who've already led people — with or without a title — and are heading toward a career doing it on purpose.

**What you'll need:** About 10 minutes. Details on one to three times you led something. One person who can confirm it. There's no essay.

**Small print, visible:** We contact references. Applications are reviewed by a selection committee. The Foundation US does not discriminate on the basis of race, color, national origin, sex, disability, or religion in its scholarship programs.

**Button:** Start application

### Step 1 · Eligibility

No personal information. If the answers disqualify, the form stops here with a short, kind message and a link home.

1. Where are you in school? — *High school senior · Current undergraduate · Not in school now, starting or returning next term · High school junior or younger · Not planning to enroll*
2. What state do you live in? — *dropdown, 50 states + DC + Outside the US*
3. When does the term you're applying for start? — *Spring 2027 · Fall 2027 · Later · Not sure*
4. What do you plan to study? — *the major dropdown from A3; "Other" reveals a short text field*

**Stop message (when ineligible):** This scholarship is for high school seniors and current or returning college students in the US. If that's you next year, we'd like to hear from you then.

### Step 2 · Your leadership

Repeating card, 1–3 entries. "Add another role" button appears after the first is complete. Each card:

- Role or what you did — *short text, e.g. "Team captain," "Shift lead," "Ran my family's food truck on weekends"*
- Where — *organization, team, business, or family — short text*
- Was this a formal position? — *Yes, I had a title · No, but I was responsible for it* — with the "informal counts" helper text from A4
- When — *start month/year; end month/year or "still doing this"*
- How many people were you responsible for? — *number*
- Hours per week, roughly — *number*

### Step 3 · The details

1. Which of these should we look at closest? — *radio, showing the roles they entered*
2. What was the situation when you stepped in? — *200 characters*
3. What was different when you left? Give a number if you have one. — *200 characters*

Character counters count down and turn amber at 20 remaining.

### Step 4 · Your reference

Intro line: **Who can confirm your work in [primary role title]?** Ideally not a parent or guardian — a teacher, coach, employer, neighbor, or relative outside your household. We'll contact them if you're a finalist.

- Their name
- How they know your work — *e.g. "my manager at the restaurant," "advisor for the club"*
- Their email
- Their phone — *optional*
- ☐ I've told this person we may contact them — *required*

### Step 5 · About you

- First name · Last name
- Email · Phone
- Date of birth
- Mailing address — *one line*
- Current school
- Expected graduation year — *2026–2032*
- Current GPA — *number, "unweighted if you know it," 0–5.0*
- What will this money pay for? — *Tuition · Books and supplies · Housing · Transportation · Fees · Something else*
- How much of next term's cost is not yet covered? — *dollar amount, optional; helper: "A rough number is fine. We use this only as a tiebreaker."*
- How did you hear about us? — *optional short text*

### Step 6 · Review and submit

Everything they entered, grouped by step, each group with an "Edit" link that returns to that step. Then three checkboxes, all required:

- ☐ Everything I've entered is true and accurate.
- ☐ I'm not related to a board member or selection committee member of The Foundation US.
- ☐ I understand references are contacted and finalists are asked for a transcript.

**Button:** Submit application

### Confirmation

**Heading:** Application received.

**Body:** Your reference number is **[XXXXXXXX]**. Save it — you'll need it if you contact us. We'll email you at [their email] with a decision by [decision date]. If you're a finalist, we'll ask for a transcript and contact your reference.

No "back to home" link that would suggest they should do something else. One link: the Foundation's home page, quietly, at the bottom.

---

## Part C — Airtable setup

Do this by hand before Codex writes the route handler. Field names must match exactly — the route handler maps to them by name.

### C1. Account and base

1. Sign up at airtable.com. Free is the default; no card.
2. Create a workspace called **The Foundation US**.
3. Create a base called **Leadership Scholarship**. Keep it to this one program. The free tier's 1,000-record cap is per base, so don't share a base with donors, curriculum, or anything else.
4. Rename the default table to **Applications**. Delete the default fields except the first one.

### C2. Fields — Applications table

Create these in this order. The order is what the committee sees when they open a record.

**Identity and status**

| Field | Type | Notes |
|---|---|---|
| Reference ID | Single line text | This is the primary field. Rename "Name" to this. |
| Submitted At | Date | Include time. |
| Status | Single select | Options: New · Screening · Reference Check · Finalist · Awarded · Declined · Withdrawn. Default: New. |

**Eligibility**

| Field | Type | Notes |
|---|---|---|
| School Level | Single select | HS Senior · Undergraduate · Returning/Starting · *(ineligible values never reach Airtable)* |
| State | Single select | Two-letter codes. Let the API create options with typecast. |
| Start Term | Single select | Spring 2027 · Fall 2027 · Later · Not sure |
| Intended Major | Single select | Exact strings from the A3 list. |
| Major (Other) | Single line text | |

**Leadership roles** — three identical blocks. Create Role 1's seven fields, then duplicate for Role 2 and Role 3.

| Field | Type |
|---|---|
| Role 1 Title | Single line text |
| Role 1 Where | Single line text |
| Role 1 Formal | Checkbox |
| Role 1 Start | Single line text *(YYYY-MM)* |
| Role 1 End | Single line text *(YYYY-MM or "Current")* |
| Role 1 People | Number, integer |
| Role 1 Hours/Week | Number, integer |

Then:

| Field | Type | Notes |
|---|---|---|
| Primary Role | Single select | Role 1 · Role 2 · Role 3 |
| Situation When Stepped In | Long text | |
| Different When Left | Long text | |

**Reference**

| Field | Type |
|---|---|
| Reference Name | Single line text |
| Reference Relationship | Single line text |
| Reference Email | Email |
| Reference Phone | Phone number |
| Reference Informed | Checkbox |

**About the applicant**

| Field | Type | Notes |
|---|---|---|
| First Name | Single line text | |
| Last Name | Single line text | |
| Email | Email | |
| Phone | Phone number | |
| Date of Birth | Date | |
| Address | Single line text | |
| Current School | Single line text | |
| Graduation Year | Number, integer | |
| GPA | Number, 2 decimal places | |
| Money For | Single select | Tuition · Books and supplies · Housing · Transportation · Fees · Something else |
| Cost Gap | Currency | |
| Heard From | Single line text | |
| Attested True | Checkbox | |
| Attested Not Related | Checkbox | |
| Attested Understands Process | Checkbox | |

**Committee-only** — the applicant never populates these.

| Field | Type | Notes |
|---|---|---|
| Meets GPA | Formula | `IF({GPA} >= 2, "Yes", "No")` — this is where the 2.0 lives |
| Reviewer | Single line text | |
| Score: Scope | Number, integer 1–5 | How much responsibility, really |
| Score: Impact | Number, integer 1–5 | Did something change |
| Score: Evidence | Number, integer 1–5 | Can it be checked |
| Reference Verified | Checkbox | |
| Reference Notes | Long text | |
| Transcript Received | Checkbox | |
| Decision Notes | Long text | |

### C3. Views

Create three grid views so the committee doesn't fight the default:

- **Inbox** — filter Status = New, sorted Submitted At newest first
- **Review** — filter Status is any of Screening, Reference Check, Finalist; hide contact fields (Email, Phone, DOB, Address) so reviewers score without seeing them
- **All** — no filter

### C4. API access

1. Go to airtable.com/create/tokens. Create a token named **Foundation website**.
2. Scope: `data.records:write` only. Access: the **Leadership Scholarship** base only.
3. Copy the token. It's shown once.
4. Get the base ID from the base's API docs page (Help → API documentation). It starts with `app`.
5. In Vercel → the-foundation project → Settings → Environment Variables, add for all environments:
   - `AIRTABLE_TOKEN` = the token
   - `AIRTABLE_BASE_ID` = the app… ID
   - `AIRTABLE_TABLE_NAME` = `Applications`
6. Add the same three lines to `.env.local` in the repo. Confirm `.env.local` is in `.gitignore` before you save it.

### C5. Notification

Airtable → Automations → "When record created" in Applications → "Send email" to info@thefoundationus.org with the Reference ID, name, school, and primary role title. That's one automation run per application; free tier allows 100 a month. If you ever expect more than that in a month, this is where n8n comes back in.

---

## Part D — Codex prompt

Paste everything between the rules below as one message. Two-phase: Codex does D1–D2 and stops; you check it; then D3–D4.

---

**Task: rebuild the `/apply` wizard as a six-step scholarship application with Airtable submission. Preserve the existing site typography and CSS variables. Do D1 and D2, then stop and report. Do not start D3 until told.**

Context: this is a Next.js App Router site. The wizard currently lives in `app/apply/_components/ApplyWizard.tsx` with a `STEPS` array driving step index/label/navigation, and a Zod schema in `app/apply/schema.ts` that is imported by the client and will be imported by a server route handler. Keep that architecture. The step machine should not need changes beyond the new step list.

### D1 — Config and schema

Create `app/apply/config.ts` (server-safe, no React, no `'use client'`) exporting:

- `SCHOOL_LEVELS`: `hs_senior`, `undergrad`, `returning`, `hs_junior_or_younger`, `not_enrolling` with display labels. Only the first three are eligible.
- `STATES`: all 50 US states + DC as `{ code, name }`, plus `{ code: 'XX', name: 'Outside the US' }`. Export `ELIGIBLE_OUTSIDE_US = false`.
- `START_TERMS`: `spring_2027`, `fall_2027`, `later`, `not_sure` with labels.
- `MAJORS`: grouped array `{ group, options: [{ value, label }] }` using exactly these labels, in this order:
  - Business and management: Business Administration; Management; Entrepreneurship; Human Resources Management; Marketing; Finance; Accounting; Operations / Supply Chain Management; Project Management; International Business
  - Management in a specific field: Healthcare Administration; Hospitality and Tourism Management; Sports Management; Construction Management; Engineering Management; Information Systems / IT Management; Nonprofit Management; Public Administration; Educational Leadership / Administration; Organizational Leadership
  - Adjacent: Industrial-Organizational Psychology; Communications / Public Relations
  - Other: Undecided — leaning toward one of the above; Other (tell us)
- `MONEY_FOR`: Tuition; Books and supplies; Housing; Transportation; Fees; Something else.
- `MAX_ROLES = 3`, `SHORT_ANSWER_MAX = 200`, `GRAD_YEARS = 2026..2032`.
- `DATES`: `{ closes: '2026-11-30', decision: '2026-12-18' }` — placeholders, displayed on the intro and confirmation.

Rewrite `app/apply/schema.ts`. Keep the pattern of one schema per step plus a composed `applicationSchema` and inferred types. Steps and fields:

**`eligibilitySchema`** — `schoolLevel` (enum from config), `state` (code), `startTerm` (enum), `intendedMajor` (label string from MAJORS), `intendedMajorOther` (string, required non-empty only when `intendedMajor` is "Other (tell us)"; use `superRefine`). Also export a pure function `isEligible(values): boolean` that returns false for ineligible school levels and for `state === 'XX'` when `ELIGIBLE_OUTSIDE_US` is false. Eligibility is a UI stop, not a schema error.

**`rolesSchema`** — `roles`: array of 1 to `MAX_ROLES` of `roleSchema`: `title` (2–80), `where` (2–80), `formal` (boolean), `start` (string matching `^\d{4}-(0[1-9]|1[0-2])$`), `end` (same pattern, or the literal `'current'`), `people` (integer 0–10000), `hoursPerWeek` (integer 1–80). Refine: `end` must not be before `start` when both are months.

**`detailsSchema`** — `primaryRoleIndex` (integer ≥ 0), `situation` (10–200 chars), `outcome` (10–200 chars). Cross-check `primaryRoleIndex < roles.length` in the composed schema's `superRefine`, not here.

**`referenceSchema`** — `refName` (2–80), `refRelationship` (2–80), `refEmail` (email), `refPhone` (string, optional, empty allowed), `refInformed` (literal `true`, message "Please confirm you've told them we may contact them").

**`aboutSchema`** — `firstName`, `lastName` (1–60 each), `email` (email), `phone` (optional), `dob` (ISO date string, must be a real date in the past), `address` (5–200), `currentSchool` (2–120), `gradYear` (integer in GRAD_YEARS), `gpa` (number 0–5, coerce from string), `moneyFor` (enum), `costGap` (number ≥ 0, optional), `heardFrom` (string ≤ 120, optional).

**`reviewSchema`** — `attestTrue`, `attestNotRelated`, `attestProcess` — each literal `true` with a specific message.

`applicationSchema` merges all six and adds the cross-step refinement. Also export `honeypotSchema`-free: the honeypot is not part of the schema; the route handler reads it separately.

Error messages come from the schema. Write them as plain sentences that say what to do ("Enter a role title," "Pick the role we should look at closest"), not what's wrong with the input.

### D2 — The wizard

Rebuild `ApplyWizard.tsx` around the new steps. `STEPS` becomes: `eligibility`, `roles`, `details`, `reference`, `about`, `review`. The intro stays outside the array. Add a `confirmation` screen after successful submit, also outside the array.

**Progress indicator.** "Step 2 of 6 · Your leadership." Step names: Eligibility · Your leadership · The details · Your reference · About you · Review. Render as text, not a bar of dots. This is a real sequence, so a numbered indicator is correct here.

**Screens** — copy is final; use it verbatim:

*Intro.* Heading "Leadership Scholarship." Lead: "For students who've already led people — with or without a title — and are heading toward a career doing it on purpose." Then a short block: "What you'll need: About 10 minutes. Details on one to three times you led something. One person who can confirm it. There's no essay." Then, smaller: "Applications close [DATES.closes, formatted]. We contact references. Applications are reviewed by a selection committee. The Foundation US does not discriminate on the basis of race, color, national origin, sex, disability, or religion in its scholarship programs." Button: "Start application."

*Eligibility.* Four fields per Part B Step 1. On Next, if `isEligible` is false, replace the form with: "This scholarship is for high school seniors and current or returning college students in the US. If that's you next year, we'd like to hear from you then." and a single link to `/`. Do not collect anything further. Do not show this as an error state — it's an outcome.

*Your leadership.* Repeating role card. First card always present. "Add another role" appears when the current last card passes `roleSchema`; hidden at `MAX_ROLES`. Each card has a "Remove" affordance except when it's the only one. Fields per Part B Step 2. The formal/informal question is a two-option choice with the helper text: "Informal counts. Running the family business, organizing something nobody asked you to organize, taking care of younger siblings so a parent could work — if you were responsible for people or outcomes, it belongs here." Start and end use `<input type="month">`; end has a "Still doing this" checkbox that disables the month input and sets `'current'`.

*The details.* Radio list built from the entered roles (title — where). Then the two short answers with the exact prompts: "What was the situation when you stepped in?" and "What was different when you left? Give a number if you have one." Each has a countdown counter (`200 left`) that turns to the site's warning color at 20 remaining. Use `aria-describedby` to attach the counter to the textarea.

*Your reference.* Lead reads "Who can confirm your work in [primary role title]?" followed by "Ideally not a parent or guardian — a teacher, coach, employer, neighbor, or relative outside your household. We'll contact them if you're a finalist." Then the five fields per Part B Step 4.

*About you.* Fields per Part B Step 5. GPA helper: "Unweighted if you know it." Cost gap helper: "A rough number is fine. We use this only as a tiebreaker." Do not display any GPA minimum anywhere.

*Review.* Render every entered value grouped under the step names, each group with an "Edit" link that jumps to that step. Then the three attestation checkboxes with the exact text in Part B Step 6. Button: "Submit application" — disabled until all three are checked. Keep a hidden honeypot input named `website` here: visually hidden with CSS (not `display:none`), `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`.

*Confirmation.* Per Part B. Show the reference ID large. Show the applicant's email and `DATES.decision`.

**Behavior**

- Validate the current step with its schema on Next. Show errors inline under the relevant field, and move focus to the first invalid field.
- On step change, move focus to the step heading and scroll to top. Respect `prefers-reduced-motion` — no animated scroll when set.
- Persist the draft to `localStorage` under a key that includes a schema version constant. Restore on load. Clear on successful submit. Add a small "Clear and start over" text link on the intro when a draft exists, since many applicants will be on shared school computers. Expire drafts older than 7 days.
- Back never loses data.
- Submit button states: idle, submitting (disabled, label "Submitting…"), error (inline message "Something went wrong and your application wasn't sent. Your answers are still here — try again." with the button re-enabled). **The confirmation screen renders only on an HTTP 200 with `ok: true`.** Never on a caught error, never optimistically.

**Design constraints**

- Use the existing CSS module (`apply.module.css`) and the site's CSS variables (`--paper`, `--ink`, `--font-sans`, the serif variable, `--max-width`, `--light-line`). Extend the module; do not add Tailwind, a UI library, or a second stylesheet.
- One column, left-aligned, max line length around 65 characters for any prose. Generous vertical rhythm between fields. Labels above inputs, helper text below, errors below helper text.
- The step heading is the one place to spend the serif face. Everything else is the sans.
- No card-in-card layouts. The role entries are separated by the existing `--light-line` rule, not boxed.
- No entrance animations, no per-field transitions. The only motion is the counter color change and focus rings.
- No ALL-CAPS labels. No arrows appended to button text. Buttons say what they do: "Start application," "Next," "Back," "Add another role," "Submit application."
- Mobile first. Most applicants will be on a phone. Inputs at least 44px tall, `font-size` ≥ 16px to prevent iOS zoom, `inputMode="numeric"` on number fields, `type="email"` and `type="tel"` where relevant.
- Visible focus rings. Every input has a `<label>`. Error text is associated via `aria-describedby` and has `role="alert"` on first appearance.

**Stop after D2.** Run type-check and build. Walk through every step in the browser including the ineligible path, the three-role case, the draft restore, and the review edit links. Report what you verified.

---

### D3 — Route handler and Airtable

Create `app/api/apply/route.ts`. `export const runtime = 'nodejs'`.

- Parse JSON. If `body.website` (the honeypot) is a non-empty string, return `200 { ok: true, referenceId: <random> }` and write nothing. Do this before validation.
- Validate with `applicationSchema.safeParse`. On failure return `400 { ok: false, errors }` with flattened field errors.
- Read `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME` from `process.env` **inside the handler**. If any is missing, `console.error` which one and return `500 { ok: false }`.
- Generate `referenceId`: 8 characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no 0/O/1/I) using `crypto.randomInt`.
- Build one Airtable record. `POST https://api.airtable.com/v0/{baseId}/{encodeURIComponent(tableName)}` with `Authorization: Bearer`, body `{ records: [{ fields }], typecast: true }`. Field mapping, exact names:

  | Schema | Airtable field |
  |---|---|
  | referenceId | Reference ID |
  | now (ISO) | Submitted At |
  | `"New"` | Status |
  | schoolLevel → label | School Level |
  | state | State |
  | startTerm → label | Start Term |
  | intendedMajor | Intended Major |
  | intendedMajorOther | Major (Other) |
  | roles[i].title | Role {i+1} Title |
  | roles[i].where | Role {i+1} Where |
  | roles[i].formal | Role {i+1} Formal |
  | roles[i].start | Role {i+1} Start |
  | roles[i].end (`'current'` → `"Current"`) | Role {i+1} End |
  | roles[i].people | Role {i+1} People |
  | roles[i].hoursPerWeek | Role {i+1} Hours/Week |
  | `Role ${primaryRoleIndex+1}` | Primary Role |
  | situation | Situation When Stepped In |
  | outcome | Different When Left |
  | refName / refRelationship / refEmail / refPhone / refInformed | Reference Name / Reference Relationship / Reference Email / Reference Phone / Reference Informed |
  | firstName … heardFrom | First Name, Last Name, Email, Phone, Date of Birth, Address, Current School, Graduation Year, GPA, Money For, Cost Gap, Heard From |
  | attestTrue / attestNotRelated / attestProcess | Attested True / Attested Not Related / Attested Understands Process |

  Omit Role 2/3 fields entirely when those roles weren't entered. Omit optional fields that are empty rather than sending empty strings.
- If Airtable responds non-2xx: `console.error` the status and response text, return `500 { ok: false }`. Never forward Airtable's error body or any env value to the client.
- On success return `200 { ok: true, referenceId }`.
- No rate limiting in this pass.

### D4 — Wire the client

Replace the review step's submit with `fetch('/api/apply', { method: 'POST', body: JSON.stringify({ ...application, website }) })`. Handle `!res.ok` and network errors identically as the error state described in D2. On `200` with `ok: true`, clear the draft and render the confirmation with the returned `referenceId`.

Verify end to end against the real Airtable base using `.env.local`. Confirm a record appears with all fields populated for a three-role submission, and that a honeypot-filled submission creates no record.

---

## Part E — Before the page goes public

Building it is not the same as publishing it. All of these need to be true first:

1. **Award amount and count confirmed against funds on hand.** Announce only what's funded.
2. **Ross approves** the name, the overview copy, and the major list.
3. **Selection committee named** and someone owns the relative-of-board check.
4. **Privacy policy page exists.** The footer currently links "Privacy policy" to `/`. You're about to collect names, dates of birth, and addresses from minors. That link needs to go to a real page before the first submission.
5. **Reference-check owner assigned.** The form promises references are contacted. Someone has to do it, and it should happen before finalists are told they're finalists.
6. **Rate limiting added** — not needed while nobody knows the URL, required before you announce a deadline anywhere public. Flag it and we'll add it with Vercel KV.
7. **Test submission deleted** from Airtable so the committee's Inbox starts clean.
8. **Deadline dates in config replaced** with real ones.
