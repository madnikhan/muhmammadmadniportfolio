import type { Metadata } from "next";
import { CvDocument } from "@/components/cv/CvDocument";
import { PrintButton } from "@/components/cv/PrintButton";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "CV",
  description: `UK software engineer CV — ${profile.name}, ${profile.role}.`,
};

export default function CvPage() {
  return (
    <div className="bg-term-bg px-3 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24">
      <div className="no-print mx-auto mb-6 max-w-[210mm]">
        <TerminalWindow path="~/cv/muhammad_madni.pdf">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs text-term-dim">
                <span className="text-term-green">$</span> lp --print cv.pdf
              </p>
              <h1 className="mt-2 font-display text-2xl text-term-green sm:text-3xl">
                UK Software Engineer CV
              </h1>
              <p className="mt-2 max-w-md text-xs text-term-dim sm:text-sm">
                Two-page A4 light sheet for recruiters. Use Download / Print PDF, then “Save as
                PDF” in the browser dialog.
              </p>
            </div>
            <PrintButton />
          </div>
        </TerminalWindow>
      </div>
      <CvDocument />
    </div>
  );
}
