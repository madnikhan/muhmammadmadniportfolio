import type { Metadata } from "next";
import { CvDocument } from "@/components/cv/CvDocument";
import { PrintButton } from "@/components/cv/PrintButton";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "CV",
  description: `UK software engineer CV — ${profile.name}, ${profile.role}.`,
};

export default function CvPage() {
  return (
    <div className="bg-paper-deep px-4 pb-20 pt-24 sm:px-8">
      <div className="no-print mx-auto mb-8 flex max-w-[210mm] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">Curriculum Vitae</p>
          <h1 className="font-display mt-2 text-3xl tracking-tight text-ink">
            UK Software Engineer CV
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted">
            Two-page A4 layout. Use Download / Print PDF, then choose “Save as PDF” in your
            browser print dialog.
          </p>
        </div>
        <PrintButton />
      </div>
      <CvDocument />
    </div>
  );
}
