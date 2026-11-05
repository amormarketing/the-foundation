import type { Metadata } from "next";
import ApplyWizard from "./_components/ApplyWizard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/apply",
  title: "Apply | The Foundation",
  shareTitle: "Apply for the $1,000+ Scholarship | The Foundation",
  description:
    "Free to apply, about 10 minutes online. Tell us about up to three times you led something and name one person who can confirm it.",
});

export default function ApplyPage() {
  return <ApplyWizard />;
}
