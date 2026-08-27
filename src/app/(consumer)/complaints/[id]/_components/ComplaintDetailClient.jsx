"use client";

import { useParams } from "next/navigation";

import { useGetComplaint } from "@/database/query/getComplaints";
import { ComplaintDetailHeader } from "./ComplaintDetailHeader";
import { ComplaintStatusTracker } from "./ComplaintStatusTracker";
import { ComplaintLocationSection } from "./ComplaintInfoGrid";
import { ComplaintEvidenceSection } from "./ComplaintEvidenceSection";
import { ComplaintEscalationMatrix } from "./ComplaintEscalationMatrix";
import { ComplaintDetailSkeleton } from "./ComplaintDetailSkeleton";
import { ComplaintNotFound } from "./ComplaintNotFound";

export default function ComplaintDetailClient() {
  const { id } = useParams();
  const { data: complaint, isLoading, isError } = useGetComplaint(id);

  if (isLoading) {
    return (
      <div className="bg-canvas text-ink min-h-screen">
        <ComplaintDetailSkeleton />
      </div>
    );
  }

  if (isError || !complaint) {
    return (
      <div className="bg-canvas text-ink min-h-screen">
        <ComplaintNotFound id={id} />
      </div>
    );
  }

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="w-full max-w-4xl px-4 py-8 sm:px-6">
        {/* 1. Issue as Title, Description (if exists), Date filed, ID & Status */}
        <ComplaintDetailHeader complaint={complaint} />

        {/* 2. Status Progress Tracker (Vertical & Expandable) */}
        <ComplaintStatusTracker complaint={complaint} />

        {/* 3. Location & Embedded Google Map */}
        <ComplaintLocationSection complaint={complaint} />

        {/* 4. Attached Documents, Photos & Links */}
        <ComplaintEvidenceSection complaint={complaint} />

        {/* 5. Assigned Team & Support */}
        <ComplaintEscalationMatrix complaint={complaint} />
      </div>
    </div>
  );
}
