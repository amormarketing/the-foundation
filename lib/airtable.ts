// Table IDs stay valid if a table is renamed in Airtable.
export const AIRTABLE_TABLES = {
  messages: "tbliOElq1nNf7MLap",
  sponsors: "tblLr2q7cb1ZfaQjN",
  donations: "tblnLMRCPy4Re2alv",
} as const;

type FieldValue = boolean | number | string;

export async function createAirtableRecord(
  tableId: string,
  fields: Record<string, FieldValue | undefined>,
  // Field names to match on, so a retried write updates the same row.
  upsertOn?: string[],
) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.error("Missing AIRTABLE_TOKEN or AIRTABLE_BASE_ID");
    return false;
  }

  const cleanFields = Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== ""),
  );

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: upsertOn ? "PATCH" : "POST",
      body: JSON.stringify({
        records: [{ fields: cleanFields }],
        typecast: true,
        ...(upsertOn ? { performUpsert: { fieldsToMergeOn: upsertOn } } : {}),
      }),
    });

    if (!response.ok) {
      console.error(`Airtable write failed (${response.status}): ${await response.text()}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Airtable request failed:", error instanceof Error ? error.message : error);
    return false;
  }
}
