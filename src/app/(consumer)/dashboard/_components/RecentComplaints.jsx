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
    dot: "bg-report-blue",
  },
  "In progress": {
    icon: Loader2,
    badgeVariant: "warning",
    dot: "bg-report-orange",
  },
  Closed: {
    icon: CheckCircle2,
    badgeVariant: "success",
    dot: "bg-semantic-success",
  },
};

const PRIORITY_CONFIG = {
  "SLA breached": "text-semantic-error font-medium",
  "Due soon": "text-report-orange font-medium",
  "SLA met": "text-semantic-success font-medium",
};

/* ─── Single row ─────────────────────────────────────────────────────── */
function ComplaintRow({ complaint }) {
  const sc = STATUS_CONFIG[complaint.status] ?? STATUS_CONFIG["Assigned"];
  const pc = PRIORITY_CONFIG[complaint.priority] ?? "text-ink-muted";
  const Icon = sc.icon;

  return (
    <Link
      href={`/complaints/${complaint.id}`}
      className="group gap-md border-hairline-soft px-lg py-md hover:bg-surface-2/40 flex items-start border-b transition-colors last:border-b-0"
    >
      {/* Status dot */}
      <span
        className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", sc.dot)}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="gap-xs flex flex-wrap items-center">
          <p className="text-body-sm text-ink font-medium">{complaint.title}</p>
          <Badge variant={sc.badgeVariant} size="sm">
            <Icon className="size-2.5" strokeWidth={2.2} />
            {complaint.status}
          </Badge>
        </div>
        <p className="mt-xxs text-caption text-ink-muted line-clamp-1 leading-relaxed">
          {complaint.description}
        </p>
        <div className="mt-xs gap-xs text-caption text-ink-subtle flex flex-wrap items-center">
          <span>{complaint.id}</span>
          <span className="text-hairline">·</span>
          <span>{complaint.date}</span>
          <span className="text-hairline">·</span>
          <span className={pc}>{complaint.priority}</span>
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight
        className="text-ink-tertiary group-hover:text-ink mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
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
      className={cn("bg-surface-1 overflow-hidden rounded-2xl", className)}
    >
      {/* Header */}
      <div className="border-hairline-soft px-lg py-md flex items-center justify-between border-b">
        <div className="gap-xs flex items-center">
          <AlertCircle
            className="text-fin-orange size-4"
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <p className="text-eyebrow text-ink font-medium uppercase">
            Recent Complaints
          </p>
        </div>
        <Link
          href="/complaints"
          className="gap-xxs text-body-sm text-fin-orange hover:text-fin-orange/80 flex items-center font-medium transition-colors"
        >
          <span>View all</span>
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Rows */}
      {complaints.length === 0 ? (
        <div className="gap-xs py-xl text-ink-subtle flex flex-col items-center justify-center">
          <CheckCircle2 className="size-7" strokeWidth={1.5} />
          <p className="text-body-sm">No complaints filed</p>
        </div>
      ) : (
        complaints.map((c) => <ComplaintRow key={c.id} complaint={c} />)
      )}
    </section>
  );
}
