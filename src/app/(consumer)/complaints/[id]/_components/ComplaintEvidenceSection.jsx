"use client";
import AttachmentSection from "../../_components/AttachmentSection";

export function ComplaintEvidenceSection({ complaint }) {
  return (
    <div className="mb-8">
      <div className="border-hairline-soft border-b pb-3">
        <h2 className="text-title-sm text-ink font-semibold tracking-tight">
          Evidence &amp; attachments
        </h2>
      </div>
      <div className="mt-4">
        {/* Supabase storage files + JSONB social links, both handled inside AttachmentSection */}
        <AttachmentSection complaintId={complaint.id} complaint={complaint} />
      </div>
    </div>
  );
}
