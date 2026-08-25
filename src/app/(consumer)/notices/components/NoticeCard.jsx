import {
  FileText,
  Download,
  Copy,
  Check,
  Calendar,
  Clock,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRIORITY_CONFIG, STATUS_CONFIG } from "./constants";

export default function NoticeCard({ notice, isCopied, onCopyId, onDownload }) {
  const priorityCfg =
    PRIORITY_CONFIG[notice.priorityType] || PRIORITY_CONFIG.info;
  const PriorityIcon = priorityCfg.icon;
  const statusCfg = STATUS_CONFIG[notice.status] || STATUS_CONFIG.Active;

  return (
    <div className="group hover:bg-surface-soft relative flex flex-col justify-between gap-4 p-4 transition-colors duration-150 sm:flex-row sm:items-start sm:p-5">
      <div className="min-w-0 flex-1">
        {/* Notice Reference & Badges */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <div className="border-hairline bg-surface-soft flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
            <span className="text-ink font-mono text-[11px] font-medium">
              {notice.id}
            </span>
            <button
              type="button"
              onClick={(e) => onCopyId(e, notice.id)}
              aria-label={`Copy ${notice.id}`}
              className="text-muted-text hover:text-ink p-0.5 transition-colors"
            >
              {isCopied ? (
                <Check className="text-success size-3" />
              ) : (
                <Copy className="size-3" />
              )}
            </button>
          </div>

          {notice.priority && (
            <Badge
              variant={priorityCfg.variant}
              size="sm"
              shape="tag"
              className="font-medium"
            >
              <span>{notice.priority}</span>
            </Badge>
          )}

          {notice.categoryLabel && (
            <Badge
              variant="outline-muted"
              size="sm"
              shape="tag"
              className="hidden sm:inline-flex"
            >
              {notice.categoryLabel}
            </Badge>
          )}

          {notice.isNew && (
            <Badge
              variant="accent-subtle"
              size="sm"
              shape="tag"
              className="font-medium"
            >
              New
            </Badge>
          )}
        </div>

        {/* Notice Title */}
        <h2 className="text-title-sm text-ink group-hover:text-ink font-semibold tracking-tight">
          {notice.title}
        </h2>

        {/* Description */}
        <p className="text-caption text-muted-text mt-1 line-clamp-2 leading-relaxed">
          {notice.description}
        </p>

        {/* Metadata Details */}
        <div className="text-caption text-muted-text mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <Building2 className="size-3 shrink-0" />
            <span>{notice.department}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="size-3 shrink-0" />
            <span>Issued: {notice.date}</span>
          </div>

          <div className="text-ink flex items-center gap-1.5 font-medium">
            <Clock className="text-warning size-3 shrink-0" />
            <span>Effective: {notice.effectiveDate}</span>
          </div>
        </div>
      </div>

      {/* Action / Status Section */}
      <div className="border-hairline-soft flex shrink-0 items-center justify-between border-t pt-3 sm:flex-col sm:items-end sm:justify-start sm:gap-3 sm:border-t-0 sm:pt-0">
        <Badge
          variant={statusCfg.variant}
          size="default"
          shape="tag"
          className="font-medium"
        >
          <span>{notice.status}</span>
        </Badge>

        <Button
          type="button"
          variant="secondary"
          size="compact"
          shape="md"
          leftIcon={<Download className="size-3.5" />}
          onClick={(e) => onDownload(e, notice)}
          className="transition-transform active:scale-[0.96]"
        >
          <span>
            {notice.fileType} ({notice.fileSize})
          </span>
        </Button>
      </div>
    </div>
  );
}
