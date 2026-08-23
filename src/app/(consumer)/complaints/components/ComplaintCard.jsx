import { AlertTriangle, Clock, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STATUS_CONFIG } from "./constants";

export default function ComplaintCard({ complaint, isCopied, onCopyId }) {
  const sc = STATUS_CONFIG[complaint.status] || STATUS_CONFIG.Assigned;
  const StatusIcon = sc.icon;
  const isBreached = complaint.sla === "SLA breached";
  const isMet = complaint.sla === "SLA met";

  return (
    <div className="group hover:bg-surface-2/40 relative flex flex-col justify-between gap-4 p-4 transition-colors duration-150 sm:flex-row sm:items-center sm:p-5">
      <div className="min-w-0 flex-1">
        {/* Docket ID & Priority Badges */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <div className="border-hairline bg-surface-2/60 flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
            <span className="text-ink font-mono text-[11px] font-medium">
              {complaint.id}
            </span>
            <button
              type="button"
              onClick={(e) => onCopyId(e, complaint.id)}
              aria-label={`Copy ${complaint.id}`}
              className="text-ink-subtle hover:text-ink p-0.5 transition-colors"
            >
              {isCopied ? (
                <Check className="text-semantic-success size-3" />
              ) : (
                <Copy className="size-3" />
              )}
            </button>
          </div>

          {complaint.priorityType === "critical" ? (
            <Badge
              variant="destructive"
              size="sm"
              shape="tag"
              className="font-medium"
            >
              <AlertTriangle className="size-3" />
              <span>{complaint.priority}</span>
            </Badge>
          ) : complaint.priority ? (
            <Badge
              variant="accent-subtle"
              size="sm"
              shape="tag"
              className="font-medium"
            >
              {complaint.priority}
            </Badge>
          ) : null}

          {complaint.category && (
            <Badge
              variant="outline-muted"
              size="sm"
              shape="tag"
              className="hidden sm:inline-flex"
            >
              {complaint.category}
            </Badge>
          )}
        </div>

        {/* Complaint Title */}
        <h2 className="text-body-sm text-ink group-hover:text-ink font-medium tracking-tight">
          {complaint.title}
        </h2>

        {/* Description */}
        <p className="text-caption text-ink-muted mt-1 line-clamp-2 leading-relaxed">
          {complaint.description}
        </p>

        {/* Registered Date */}
        <div className="text-caption text-ink-subtle mt-2 flex items-center gap-1.5">
          <Clock className="size-3 shrink-0" />
          <span>Registered: {complaint.date}</span>
        </div>
      </div>

      {/* Status & SLA Indicators */}
      <div className="border-hairline-soft/60 flex shrink-0 items-center justify-between border-t pt-3 sm:flex-col sm:items-end sm:justify-center sm:gap-2 sm:border-t-0 sm:pt-0">
        <Badge
          variant={sc.variant}
          size="default"
          shape="tag"
          className="font-medium"
        >
          <StatusIcon
            className={cn(
              "size-3.5",
              complaint.status === "In progress" && "animate-spin"
            )}
            strokeWidth={2.2}
          />
          <span>{complaint.status}</span>
        </Badge>

        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-1.5 rounded-full",
              isBreached
                ? "bg-semantic-error"
                : isMet
                  ? "bg-semantic-success"
                  : "bg-report-orange"
            )}
          />
          <span
            className={cn(
              "text-caption font-medium",
              isBreached
                ? "text-semantic-error"
                : isMet
                  ? "text-semantic-success"
                  : "text-report-orange"
            )}
          >
            {complaint.sla}
          </span>
        </div>
      </div>
    </div>
  );
}
