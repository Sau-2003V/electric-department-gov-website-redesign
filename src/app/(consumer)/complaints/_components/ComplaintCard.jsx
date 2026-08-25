import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { STATUS_CONFIG } from "./constants";

export default function ComplaintCard({ complaint }) {
  const statusKey = complaint?.status?.toLowerCase() || "registered";
  const sc =
    STATUS_CONFIG[statusKey] ||
    STATUS_CONFIG[complaint?.status] ||
    STATUS_CONFIG.registered;
  const statusLabel = sc.label || complaint?.status;

  const displayDate = complaint?.created_at
    ? new Date(complaint.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : complaint?.date;

  return (
    <div className="group hover:bg-surface-soft relative flex flex-col justify-between gap-4 p-4 transition-colors duration-150 sm:flex-row sm:items-center sm:p-5">
      <div className="min-w-0 flex-1">
        {/* Issue Title */}
        <h2 className="text-title-sm text-ink group-hover:text-ink font-medium tracking-tight">
          {complaint.issue || complaint.title}
        </h2>

        {/* Description (if exists) */}
        {complaint.description ? (
          <p className="text-caption text-muted-text mt-1 line-clamp-2 leading-relaxed">
            {complaint.description}
          </p>
        ) : null}

        {/* Registered Date & Location/Landmark */}
        <div className="text-caption text-muted-text mt-2 flex flex-wrap items-center gap-3">
          {displayDate && (
            <div className="flex items-center gap-1.5">
              <Clock className="size-3 shrink-0" />
              <span>Registered: {displayDate}</span>
            </div>
          )}
          {(complaint.landmark || complaint.address || complaint.location) && (
            <span className="text-muted-text/80 text-xs">
              • {complaint.landmark || complaint.address || complaint.location}
            </span>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="border-hairline-soft flex shrink-0 items-center justify-between border-t pt-3 sm:flex-col sm:items-end sm:justify-center sm:gap-2 sm:border-t-0 sm:pt-0">
        <Badge
          variant={sc.variant || "default"}
          size="default"
          shape="tag"
          className="font-medium"
        >
          <span>{statusLabel}</span>
        </Badge>
      </div>
    </div>
  );
}
