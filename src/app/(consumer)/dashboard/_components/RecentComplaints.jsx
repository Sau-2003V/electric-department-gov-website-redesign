import Link from "next/link";
import {
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

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
    badgeBg: "bg-[#f0f4ff]",
    badgeText: "text-[#2563eb]",
    dot: "bg-[#2563eb]",
  },
  "In progress": {
    icon: Loader2,
    badgeBg: "bg-[#fff7ed]",
    badgeText: "text-[#ea580c]",
    dot: "bg-[#ea580c]",
  },
  Closed: {
    icon: CheckCircle2,
    badgeBg: "bg-[#f0fdf4]",
    badgeText: "text-[#16a34a]",
    dot: "bg-[#16a34a]",
  },
};

const PRIORITY_CONFIG = {
  "SLA breached": "text-[#dc2626] font-semibold",
  "Due soon": "text-[#d97706] font-semibold",
  "SLA met": "text-[#16a34a]",
};

/* ─── Single row ─────────────────────────────────────────────────────── */
function ComplaintRow({ complaint }) {
  const sc = STATUS_CONFIG[complaint.status] ?? STATUS_CONFIG["Assigned"];
  const pc = PRIORITY_CONFIG[complaint.priority] ?? "text-[#888]";
  const Icon = sc.icon;

  return (
    <Link
      href={`/complaints/${complaint.id}`}
      className="group flex items-start gap-4 border-b border-[#eae7e2] px-5 py-4 transition-colors duration-100 last:border-b-0 hover:bg-[#faf8f6]"
    >
      {/* Status dot */}
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${sc.dot}`}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-[13px] font-medium text-[#111]">
            {complaint.title}
          </p>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${sc.badgeBg} ${sc.badgeText}`}
          >
            <Icon size={10} strokeWidth={2.5} />
            {complaint.status}
          </span>
        </div>
        <p className="mt-1 line-clamp-1 text-[12px] leading-snug text-[#888]">
          {complaint.description}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-[11px] text-[#bbb]">{complaint.id}</span>
          <span className="text-[#ddd]">·</span>
          <span className="text-[11px] text-[#bbb]">{complaint.date}</span>
          <span className="text-[#ddd]">·</span>
          <span className={`text-[11px] ${pc}`}>{complaint.priority}</span>
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight
        size={15}
        className="mt-1 shrink-0 text-[#ccc] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#999]"
      />
    </Link>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function RecentComplaints({ complaints = DEFAULT_COMPLAINTS }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e0dbd3] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#eae7e2] px-5 py-4">
        <div className="flex items-center gap-2">
          <AlertCircle size={15} className="text-[#ff5600]" strokeWidth={2.5} />
          <p className="text-[13px] font-bold tracking-[0.4px] text-[#111] uppercase">
            Recent Complaints
          </p>
        </div>
        <Link
          href="/complaints"
          className="flex items-center gap-1 text-[13px] font-semibold text-[#ff5600] transition-colors hover:text-[#cc4400]"
        >
          View all
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Rows */}
      {complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-[#bbb]">
          <CheckCircle2 size={28} strokeWidth={1.5} />
          <p className="text-[13px]">No complaints filed</p>
        </div>
      ) : (
        complaints.map((c) => <ComplaintRow key={c.id} complaint={c} />)
      )}
    </section>
  );
}
