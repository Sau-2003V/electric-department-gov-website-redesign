"use client";

import { use } from "react";
import { useParams } from "next/navigation";

import { useGetComplaint } from "@/database/query/getComplaints";
import {
  ComplaintDetailHeader,
  ComplaintStatusTracker,
  ComplaintLocationSection,
  ComplaintEvidenceSection,
  ComplaintEscalationMatrix,
  ComplaintDetailSkeleton,
  ComplaintNotFound,
} from "./_components";

export default function ComplaintDetailPage(props) {
  // Support both Promise params in Next.js 15+ and useParams hook
  const routeParams = useParams();
  const unwrappedParams = props?.params ? use(props.params) : null;
  const id = unwrappedParams?.id || routeParams?.id;

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
