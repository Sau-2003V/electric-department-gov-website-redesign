"use client";
import AttachmentSection from "../../_components/AttachmentSection";

export function ComplaintEvidenceSection({ complaint }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Evidence & Attachments</h2>

      {/* Supabase storage files + JSONB social links, both handled inside AttachmentSection */}
      <AttachmentSection complaintId={complaint.id} complaint={complaint} />
    </section>
  );
}