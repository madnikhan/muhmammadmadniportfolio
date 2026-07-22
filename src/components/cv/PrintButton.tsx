"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-term-solid w-full sm:w-auto">
      Download / Print PDF
    </button>
  );
}
