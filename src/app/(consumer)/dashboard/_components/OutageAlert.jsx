import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  planned: {
    label: "Planned Outage",
    badgeVariant: "warning",
    containerBg: "bg-surface-1",
    containerBorder: "border-report-orange",
    iconBg: "bg-report-orange/10",
    iconRing: "ring-1 ring-report-orange/20",
    iconColor: "text-report-orange",
    pulseDot: "bg-report-orange",
  },
  unplanned: {
    label: "Unplanned Outage",
    badgeVariant: "destructive",
    containerBg: "bg-surface-1",
    containerBorder: "border-semantic-error/30",
    iconBg: "bg-semantic-error/10",
    iconRing: "ring-1 ring-semantic-error/20",
    iconColor: "text-semantic-error",
    pulseDot: "bg-semantic-error",
  },
};

export default function OutageAlert({
  area = "Gomti Nagar Sector 4",
  details = "Planned maintenance of the 33/11 kV feeder.",
  timestamp = "23 Aug 2026 · 2:00 pm – 6:00 pm",
  type = "planned",
  className,
}) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.planned;

  return (
    <section
      aria-label="Power outage alert"
      className={cn(
        "mb-lg sm:mb-xl p-md sm:p-lg shadow-surface-1 overflow-hidden rounded-2xl border transition-all",
        config.containerBorder,
        config.containerBg,
        className
      )}
    >
      <div className="gap-md flex items-start">
        {/* Leading Alert Icon */}
        <div
          className={cn(
            "mt-xxs flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            config.iconBg,
            config.iconRing
          )}
        >
          <AlertTriangle
            className={cn("size-4 text-current", config.iconColor)}
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </div>

        {/* Content Body */}
        <div className="min-w-0 flex-1">
          {/* Header Row */}
          <div className="gap-xs sm:gap-sm flex flex-wrap items-center justify-between">
            <div className="gap-xs sm:gap-sm flex flex-wrap items-center">
              <h2 className="text-body-sm sm:text-body text-ink font-medium">
                Outage affecting your area
              </h2>
              <Badge variant={config.badgeVariant} size="sm">
                {config.label}
              </Badge>
            </div>
          </div>

          {/* Area & Details */}
          <div className="mt-xs space-y-xxs">
            <div className="gap-xs text-body-sm text-ink flex items-center font-medium">
              <MapPin
                className="text-ink-subtle size-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{area}</span>
            </div>
            <p className="text-body-sm text-ink-muted leading-relaxed">
              {details}
            </p>
          </div>

          {/* Timing Chip */}
          <div className="mt-sm gap-xs border-hairline bg-surface-2/60 px-sm py-xxs inline-flex flex-wrap items-center rounded-full border">
            <span
              className={cn(
                "h-2 w-2 animate-pulse rounded-full",
                config.pulseDot
              )}
              aria-hidden="true"
            />
            <Clock className="text-ink-subtle size-3" aria-hidden="true" />
            <span className="text-caption text-ink-muted font-medium">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
