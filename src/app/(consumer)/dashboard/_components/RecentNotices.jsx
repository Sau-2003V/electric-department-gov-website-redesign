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
import { Button } from "@/components/ui/button";

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
    iconBg: "bg-brand-accent/10",
    iconColor: "text-brand-accent",
  },
  maintenance: {
    icon: ShieldAlert,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  advisory: {
    icon: Megaphone,
    iconBg: "bg-surface-soft",
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
      className="group flex items-start gap-4 border-b border-hairline-soft px-4 py-3.5 sm:px-6 transition-colors hover:bg-surface-soft last:border-b-0"
    >
      {/* Type icon */}
      <div
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
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
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-body-sm font-medium text-ink">{notice.title}</p>
          {notice.isNew && (
            <Badge variant="accent" size="sm">
              New
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-caption text-muted-text line-clamp-2 leading-relaxed">
          {notice.summary}
        </p>
        <p className="mt-1 text-caption text-muted-text">{notice.date}</p>
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
export default function RecentNotices({
  notices = DEFAULT_NOTICES,
  className,
}) {
  return (
    <section
      aria-label="Notices and Circulars"
      className={cn(
        "overflow-hidden rounded-lg border border-hairline bg-surface-card shadow-subtle",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline-soft px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-1.5">
          <Bell
            className="text-primary size-4"
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <p className="text-caption font-semibold uppercase tracking-wider text-muted-text">
            Notices &amp; Circulars
          </p>
        </div>
        <Link href="/notices">
          <Button variant="ghost" size="sm">
            <span>View all</span>
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>

      {/* Rows */}
      {notices.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-text">
          <Bell className="size-7" strokeWidth={1.5} />
          <p className="text-body-sm">No notices available</p>
        </div>
      ) : (
        notices.map((n) => <NoticeRow key={n.id} notice={n} />)
      )}
    </section>
  );
}
