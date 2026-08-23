import Link from "next/link";
import {
  Bell,
  ChevronRight,
  FileText,
  Megaphone,
  ShieldAlert,
} from "lucide-react";

const DEFAULT_NOTICES = [
  {
    id: "NTC-2026-041",
    title: "Tariff Revision Effective 1 Sep 2026",
    summary:
      "Domestic consumers will see revised slab rates as per UPERC Order No. 1312/2026. Download the full rate chart.",
    type: "tariff",
    date: "20 Aug 2026",
    isNew: true,
  },
  {
    id: "NTC-2026-039",
    title: "Scheduled Maintenance — 23 Aug 2026",
    summary:
      "Power supply will remain interrupted in Gomti Nagar and Indira Nagar zones between 2 pm – 6 pm for feeder upgrades.",
    type: "maintenance",
    date: "18 Aug 2026",
    isNew: true,
  },
  {
    id: "NTC-2026-036",
    title: "Summer Load Shedding Advisory",
    summary:
      "Roaster-based load shedding schedule is active until 31 Aug 2026. Check your area's schedule on the portal.",
    type: "advisory",
    date: "10 Aug 2026",
    isNew: false,
  },
];

/* ─── Notice type config ─────────────────────────────────────────────── */
const TYPE_CONFIG = {
  tariff: {
    icon: FileText,
    iconBg: "bg-[#eff6ff]",
    iconColor: "text-[#2563eb]",
  },
  maintenance: {
    icon: ShieldAlert,
    iconBg: "bg-[#fff7ed]",
    iconColor: "text-[#ea580c]",
  },
  advisory: {
    icon: Megaphone,
    iconBg: "bg-[#faf5ff]",
    iconColor: "text-[#9333ea]",
  },
};

/* ─── Single notice row ──────────────────────────────────────────────── */
function NoticeRow({ notice }) {
  const tc = TYPE_CONFIG[notice.type] ?? TYPE_CONFIG.advisory;
  const Icon = tc.icon;

  return (
    <Link
      href={`/notices/${notice.id}`}
      className="group flex items-start gap-4 border-b border-[#eae7e2] px-5 py-4 transition-colors duration-100 last:border-b-0 hover:bg-[#faf8f6]"
    >
      {/* Type icon */}
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${tc.iconBg}`}
      >
        <Icon size={15} className={tc.iconColor} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-[13px] font-semibold text-[#111]">
            {notice.title}
          </p>
          {notice.isNew && (
            <span className="rounded-full bg-[#ff5600] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
              New
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-[#888]">
          {notice.summary}
        </p>
        <p className="mt-1.5 text-[11px] text-[#bbb]">{notice.date}</p>
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
export default function RecentNotices({ notices = DEFAULT_NOTICES }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e0dbd3] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#eae7e2] px-5 py-4">
        <div className="flex items-center gap-2">
          <Bell size={15} className="text-[#ff5600]" strokeWidth={2.5} />
          <p className="text-[13px] font-bold tracking-[0.4px] text-[#111] uppercase">
            Notices &amp; Circulars
          </p>
        </div>
        <Link
          href="/notices"
          className="flex items-center gap-1 text-[13px] font-semibold text-[#ff5600] transition-colors hover:text-[#cc4400]"
        >
          View all
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Rows */}
      {notices.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-[#bbb]">
          <Bell size={28} strokeWidth={1.5} />
          <p className="text-[13px]">No notices available</p>
        </div>
      ) : (
        notices.map((n) => <NoticeRow key={n.id} notice={n} />)
      )}
    </section>
  );
}
