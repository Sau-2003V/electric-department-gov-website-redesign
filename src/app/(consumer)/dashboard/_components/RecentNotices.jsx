import Link from "next/link";
import {
  Bell,
  ChevronRight,
  FileText,
  Megaphone,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    iconBg: "bg-report-blue/10",
    iconColor: "text-report-blue",
  },
  maintenance: {
    icon: ShieldAlert,
    iconBg: "bg-report-orange/10",
    iconColor: "text-report-orange",
  },
  advisory: {
    icon: Megaphone,
    iconBg: "bg-surface-2",
    iconColor: "text-ink",
  },
};

/* ─── Single notice row ──────────────────────────────────────────────── */
function NoticeRow({ notice }) {
  const tc = TYPE_CONFIG[notice.type] ?? TYPE_CONFIG.advisory;
  const Icon = tc.icon;

  return (
    <Link
      href={`/notices/${notice.id}`}
      className="group gap-md border-hairline-soft px-lg py-md hover:bg-surface-2/40 flex items-start border-b transition-colors last:border-b-0"
    >
      {/* Type icon */}
      <div
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          tc.iconBg
        )}
      >
        <Icon
          className={cn("size-4", tc.iconColor)}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="gap-xs flex flex-wrap items-center">
          <p className="text-body-sm text-ink font-medium">{notice.title}</p>
          {notice.isNew && (
            <Badge variant="accent" size="sm">
              New
            </Badge>
          )}
        </div>
        <p className="mt-xxs text-caption text-ink-muted line-clamp-2 leading-relaxed">
          {notice.summary}
        </p>
        <p className="mt-xs text-caption text-ink-subtle">{notice.date}</p>
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
export default function RecentNotices({
  notices = DEFAULT_NOTICES,
  className,
}) {
  return (
    <section
      aria-label="Notices and Circulars"
      className={cn("bg-surface-1 overflow-hidden rounded-2xl", className)}
    >
      {/* Header */}
      <div className="border-hairline-soft px-lg py-md flex items-center justify-between border-b">
        <div className="gap-xs flex items-center">
          <Bell
            className="text-fin-orange size-4"
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <p className="text-eyebrow text-ink font-medium uppercase">
            Notices &amp; Circulars
          </p>
        </div>
        <Link
          href="/notices"
          className="gap-xxs text-body-sm text-fin-orange hover:text-fin-orange/80 flex items-center font-medium transition-colors"
        >
          <span>View all</span>
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Rows */}
      {notices.length === 0 ? (
        <div className="gap-xs py-xl text-ink-subtle flex flex-col items-center justify-center">
          <Bell className="size-7" strokeWidth={1.5} />
          <p className="text-body-sm">No notices available</p>
        </div>
      ) : (
        notices.map((n) => <NoticeRow key={n.id} notice={n} />)
      )}
    </section>
  );
}
