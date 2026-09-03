import { randomInt } from "node:crypto";

import {
  applicationSchema,
  isEligible,
  type Application,
} from "../../apply/schema";

export const runtime = "nodejs";

const REFERENCE_ID_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const AIRTABLE_SCHOOL_LEVELS: Readonly<Record<string, string>> = {
  hs_senior: "HS Senior",
  undergrad: "Undergraduate",
  returning: "Returning/Starting",
};
const AIRTABLE_START_TERMS: Readonly<Record<string, string>> = {
  spring_2027: "Spring 2027",
  fall_2027: "Fall 2027",
  later: "Later",
  not_sure: "Not sure",
};

type AirtableFieldValue = boolean | number | string;
type AirtableFields = Record<string, AirtableFieldValue>;

function createReferenceId() {
  return Array.from(
    { length: 8 },
    () => REFERENCE_ID_CHARACTERS[randomInt(REFERENCE_ID_CHARACTERS.length)],
  ).join("");
}

function addOptionalField(
  fields: AirtableFields,
  name: string,
  value: number | string | undefined,
) {
  if (
    typeof value === "number" ||
    (typeof value === "string" && value !== "")
  ) {
    fields[name] = value;
  }
}

function buildAirtableFields(
  application: Application,
  referenceId: string,
): AirtableFields {
  const fields: AirtableFields = {
    "Reference ID": referenceId,
    "Submitted At": new Date().toISOString(),
    Status: "New",
    "School Level": AIRTABLE_SCHOOL_LEVELS[application.schoolLevel],
    State: application.state,
    "Start Term": AIRTABLE_START_TERMS[application.startTerm],
    "Intended Major": application.intendedMajor,
    "Primary Role": `Role ${application.primaryRoleIndex + 1}`,
    "Situation When Stepped In": application.situation,
    "Different When Left": application.outcome,
    "Reference Name": application.refName,
    "Reference Relationship": application.refRelationship,
    "Reference Email": application.refEmail,
    "Reference Informed": application.refInformed,
    "First Name": application.firstName,
    "Last Name": application.lastName,
    Email: application.email,
    "Date of Birth": application.dob,
    Address: application.address,
    "Current School": application.currentSchool,
    "Graduation Year": application.gradYear,
    GPA: application.gpa,
    "Money For":
      application.moneyFor === "Something else."
        ? "Something else"
        : application.moneyFor,
    "Attested True": application.attestTrue,
    "Attested Not Related": application.attestNotRelated,
    "Attested Understands Process": application.attestProcess,
  };

  addOptionalField(fields, "Major (Other)", application.intendedMajorOther);
  addOptionalField(fields, "Reference Phone", application.refPhone);
  addOptionalField(fields, "Phone", application.phone);
  addOptionalField(fields, "Cost Gap", application.costGap);
  addOptionalField(fields, "Heard From", application.heardFrom);

  application.roles.forEach((role, index) => {
    const prefix = `Role ${index + 1}`;
    fields[`${prefix} Title`] = role.title;
    fields[`${prefix} Where`] = role.where;
    fields[`${prefix} Formal`] = role.formal;
    fields[`${prefix} Start`] = role.start;
    fields[`${prefix} End`] = role.current ? "Current" : role.end;
    fields[`${prefix} People`] = role.people;
    fields[`${prefix} Hours/Week`] = role.hoursPerWeek;
  });

  return fields;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        errors: {
          formErrors: ["Send the application as JSON"],
          fieldErrors: {},
        },
      },
      { status: 400 },
    );
  }

  if (
    isObject(body) &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return Response.json({ ok: true, referenceId: createReferenceId() });
  }

  const result = applicationSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { ok: false, errors: result.error.flatten() },
      { status: 400 },
    );
  }

  if (!isEligible(result.data)) {
    return Response.json(
      {
        ok: false,
        errors: {
          formErrors: [
            "This application does not meet the eligibility requirements",
          ],
          fieldErrors: {},
        },
      },
      { status: 400 },
    );
  }

  const airtableToken = process.env.AIRTABLE_TOKEN;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;
  const airtableTableName = process.env.AIRTABLE_TABLE_NAME;

  if (!airtableToken || !airtableBaseId || !airtableTableName) {
    const missingVariables = [
      !airtableToken && "AIRTABLE_TOKEN",
      !airtableBaseId && "AIRTABLE_BASE_ID",
      !airtableTableName && "AIRTABLE_TABLE_NAME",
    ].filter(Boolean);
    console.error(
      `Missing required environment variables: ${missingVariables.join(", ")}`,
    );
    return Response.json({ ok: false }, { status: 500 });
  }

  const referenceId = createReferenceId();
  const fields = buildAirtableFields(result.data, referenceId);

  try {
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [{ fields }], typecast: true }),
      },
    );

    if (!airtableResponse.ok) {
      const responseText = await airtableResponse.text();
      console.error(
        `Airtable submission failed (${airtableResponse.status}): ${responseText}`,
      );
      return Response.json({ ok: false }, { status: 500 });
    }
  } catch (error) {
    console.error(
      "Airtable request failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true, referenceId });
}
