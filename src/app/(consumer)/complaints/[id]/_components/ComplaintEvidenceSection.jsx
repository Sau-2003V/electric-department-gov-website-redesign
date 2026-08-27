"use client";
import AttachmentSection from "../../_components/AttachmentSection";

export function ComplaintEvidenceSection({ complaint }) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Evidence & Attachments</h2>

      {/* Supabase storage files + JSONB social links, both handled inside AttachmentSection */}
      <AttachmentSection complaintId={complaint.id} complaint={complaint} />
    </section>
  );
}
