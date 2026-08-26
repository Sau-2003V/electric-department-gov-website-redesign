"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetRecentComplaints } from "@/database/query/getComplaints";

const STATUS_MAP = {
  registered: { label: "Registered", variant: "canvas", dot: "bg-muted-text" },
  assigned: { label: "Assigned", variant: "info", dot: "bg-brand-accent" },
  in_progress: { label: "In progress", variant: "warning", dot: "bg-warning" },
  resolved: { label: "Resolved", variant: "success", dot: "bg-success" },
  closed: { label: "Closed", variant: "secondary", dot: "bg-muted-text" },
};

function ComplaintRow({ complaint }) {
  const status =
    STATUS_MAP[complaint.status?.toLowerCase()] || STATUS_MAP.registered;
  const displayId =
    complaint.id?.length > 20
      ? `#${complaint.id.slice(0, 8).toUpperCase()}`
      : complaint.id;
  const displayDate = complaint.created_at
    ? new Date(complaint.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : complaint.date;

  return (
    <Link
      href={`/complaints/${complaint.id}`}
      className="group border-hairline-soft hover:bg-surface-soft flex items-start gap-4 border-b px-4 py-3.5 transition-colors last:border-b-0 sm:px-6"
    >
      <span
        className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", status.dot)}
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-body-sm text-ink font-medium">
            {complaint.issue || complaint.title || "Electrical Complaint"}
          </p>
          <Badge variant={status.variant} size="sm">
            {status.label}
          </Badge>
        </div>
        <p className="text-caption text-muted-text mt-0.5 line-clamp-1 leading-relaxed">
          {complaint.description ||
            complaint.landmark ||
            complaint.location ||
            complaint.address ||
            "No details provided."}
        </p>
        <div className="text-caption text-muted-text mt-2 flex flex-wrap items-center gap-2">
          {displayId && <span>{displayId}</span>}
          {displayId && displayDate && <span className="text-hairline">·</span>}
          {displayDate && <span>{displayDate}</span>}
        </div>
      </div>

      <ChevronRight
        className="text-muted-text group-hover:text-ink mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function SkeletonRows() {
  return (
    <div className="divide-hairline-soft divide-y">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex animate-pulse items-start gap-4 px-4 py-3.5 sm:px-6"
        >
          <div className="bg-surface-strong mt-2 h-2 w-2 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-surface-strong h-4 w-44 rounded" />
              <div className="bg-surface-soft h-4 w-16 rounded-full" />
            </div>
            <div className="bg-surface-soft h-3.5 w-3/4 rounded" />
            <div className="bg-surface-soft h-3 w-28 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecentComplaints({
  complaints: propComplaints,
  className,
}) {
  const {
    data: fetchedComplaints,
    isLoading,
    isError,
  } = useGetRecentComplaints(4, {
    enabled: !propComplaints,
  });

  const complaints = propComplaints ?? fetchedComplaints ?? [];

  return (
    <section
      aria-label="Recent Complaints"
      className={cn(
        "border-hairline bg-surface-card shadow-subtle overflow-hidden rounded-lg border",
        className
      )}
    >
      <div className="border-hairline-soft flex items-center justify-between border-b px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-1.5">
          <p className="text-caption text-muted-text font-medium tracking-wider">
            Recent Complaints
          </p>
        </div>

        <Link href="/complaints">
          <Button variant="ghost" size="sm">
            <span>View all</span>
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>

      {isLoading && !propComplaints ? (
        <SkeletonRows />
      ) : isError && !propComplaints ? (
        <div className="text-muted-text flex flex-col items-center justify-center gap-2 py-10">
          <AlertCircle className="text-error size-7" strokeWidth={1.5} />
          <p className="text-body-sm text-error">Failed to load complaints</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-muted-text flex flex-col items-center justify-center gap-2 py-10">
          <CheckCircle2 className="size-7" strokeWidth={1.5} />
          <p className="text-body-sm">No complaints filed</p>
        </div>
      ) : (
        complaints.map((c) => <ComplaintRow key={c.id} complaint={c} />)
      )}
    </section>
  );
}
