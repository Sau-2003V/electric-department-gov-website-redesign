import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  planned: {
    label: "Planned Outage",
    badgeVariant: "badge-orange",
    containerBg: "bg-badge-orange/10 dark:bg-badge-orange/15",
    containerBorder: "border-badge-orange/30",
    iconBg: "bg-badge-orange/20",
    iconRing: "ring-1 ring-badge-orange/30",
    iconColor: "text-[#c2410c] dark:text-orange-300",
    pulseDot: "bg-badge-orange",
  },
  unplanned: {
    label: "Unplanned Outage",
    badgeVariant: "destructive",
    containerBg: "bg-error/10 dark:bg-error/15",
    containerBorder: "border-error/30",
    iconBg: "bg-error/20",
    iconRing: "ring-1 ring-error/30",
    iconColor: "text-error",
    pulseDot: "bg-error",
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
        "shadow-subtle overflow-hidden rounded-lg border p-4 transition-all sm:p-5",
        config.containerBorder,
        config.containerBg,
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Leading Alert Icon */}
        <div
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
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
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-title-sm text-ink font-semibold">
                Outage affecting your area
              </h2>
              <Badge variant={config.badgeVariant} size="sm">
                {config.label}
              </Badge>
            </div>
          </div>

          {/* Area & Details */}
          <div className="mt-1 space-y-0.5">
            <div className="text-body-sm text-ink flex items-center gap-1.5 font-medium">
              <MapPin
                className="text-muted-text size-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{area}</span>
            </div>
            <p className="text-body-sm text-muted-text leading-relaxed">
              {details}
            </p>
          </div>

          {/* Timing Chip */}
          <div className="border-hairline/70 bg-canvas/80 mt-3 inline-flex flex-wrap items-center gap-1.5 rounded-full border px-2.5 py-1 shadow-2xs backdrop-blur-xs">
            <span
              className={cn(
                "h-2 w-2 animate-pulse rounded-full",
                config.pulseDot
              )}
              aria-hidden="true"
            />
            <Clock className="text-muted-text size-3" aria-hidden="true" />
            <span className="text-caption text-muted-text font-medium">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
