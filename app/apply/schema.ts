import { z } from "zod";

export const contactStepSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z.string(),
  address: z.string(),
  dob: z.string(),
});

export const questionsStepSchema = z.object({
  whyApply: z.string().trim().min(1, "Please answer the question to continue."),
});

export const reviewStepSchema = z.object({});

export const applicationSchema = contactStepSchema
  .merge(questionsStepSchema)
  .merge(reviewStepSchema);

export type ContactStepData = z.infer<typeof contactStepSchema>;
export type QuestionsStepData = z.infer<typeof questionsStepSchema>;
export type ReviewStepData = z.infer<typeof reviewStepSchema>;
export type ApplicationDraft = z.infer<typeof applicationSchema>;
