import Link from "next/link";
import {
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DEFAULT_COMPLAINTS = [
  {
    id: "VVNL-240001",
    title: "Sparking / safety hazard",
    description:
      "Live wire sparking near the school gate, heavy sparking every few minutes.",
    status: "Assigned",
    priority: "Due soon",
    date: "23 Aug 2026",
  },
  {
    id: "VVNL-240002",
    title: "Power outage",
    description: "No supply in the entire block since last night.",
    status: "In progress",
    priority: "SLA breached",
    date: "22 Aug 2026",
  },
  {
    id: "VVNL-240005",
    title: "Street light not working",
    description: "Street lights on the main road stay off all night.",
    status: "Closed",
    priority: "SLA met",
    date: "19 Aug 2026",
  },
  {
    id: "VVNL-240007",
    title: "Voltage fluctuation",
    description: "Severe voltage fluctuation, appliances tripping repeatedly.",
    status: "Assigned",
    priority: "SLA breached",
    date: "18 Aug 2026",
  },
];

/* ─── Status config ─────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  Assigned: {
    icon: Clock,
    badgeVariant: "info",
    dot: "bg-brand-accent",
  },
  "In progress": {
    icon: Loader2,
    badgeVariant: "warning",
    dot: "bg-warning",
  },
  Closed: {
    icon: CheckCircle2,
    badgeVariant: "success",
    dot: "bg-success",
  },
};

const PRIORITY_CONFIG = {
  "SLA breached": "text-error font-medium",
  "Due soon": "text-warning font-medium",
  "SLA met": "text-success font-medium",
};

/* ─── Single row ─────────────────────────────────────────────────────── */
function ComplaintRow({ complaint }) {
  const sc = STATUS_CONFIG[complaint.status] ?? STATUS_CONFIG["Assigned"];
  const pc = PRIORITY_CONFIG[complaint.priority] ?? "text-muted-text";
  const Icon = sc.icon;

  return (
    <Link
      href={`/complaints/${complaint.id}`}
      className="group flex items-start gap-4 border-b border-hairline-soft px-4 py-3.5 sm:px-6 transition-colors hover:bg-surface-soft last:border-b-0"
    >
      {/* Status dot */}
      <span
        className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", sc.dot)}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-body-sm font-medium text-ink">{complaint.title}</p>
          <Badge variant={sc.badgeVariant} size="sm">
            <Icon className="size-2.5" strokeWidth={2.2} />
            {complaint.status}
          </Badge>
        </div>
        <p className="mt-0.5 text-caption text-muted-text line-clamp-1 leading-relaxed">
          {complaint.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-caption text-muted-text">
          <span>{complaint.id}</span>
          <span className="text-hairline">·</span>
          <span>{complaint.date}</span>
          <span className="text-hairline">·</span>
          <span className={pc}>{complaint.priority}</span>
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight
        className="mt-1 size-4 shrink-0 text-muted-text transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
        aria-hidden="true"
      />
    </Link>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function RecentComplaints({
  complaints = DEFAULT_COMPLAINTS,
  className,
}) {
  return (
    <section
      aria-label="Recent Complaints"
      className={cn(
        "overflow-hidden rounded-lg border border-hairline bg-surface-card shadow-subtle",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline-soft px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-1.5">
          <AlertCircle
            className="text-primary size-4"
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <p className="text-caption font-semibold uppercase tracking-wider text-muted-text">
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

      {/* Rows */}
      {complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-text">
          <CheckCircle2 className="size-7" strokeWidth={1.5} />
          <p className="text-body-sm">No complaints filed</p>
        </div>
      ) : (
        complaints.map((c) => <ComplaintRow key={c.id} complaint={c} />)
      )}
    </section>
  );
}
