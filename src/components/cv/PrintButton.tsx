"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center rounded-md bg-teal px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-bright"
    >
      Download / Print PDF
    </button>
  );
}
