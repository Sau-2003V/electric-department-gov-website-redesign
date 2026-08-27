import Link from "next/link";
import {
  ChevronRight,
  AlertTriangle,
  Megaphone,
  FileText,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Badge colour per notice type ─────────────────────────────────────── */
const BADGE_STYLE = {
  Outage: "bg-red-100 text-red-700",
  Notice: "bg-blue-100 text-blue-700",
  Tender: "bg-amber-100 text-amber-700",
  Advisory: "bg-purple-100 text-purple-700",
  Circular: "bg-slate-100 text-slate-600",
};

const BADGE_ICON = {
  Outage: AlertTriangle,
  Notice: Info,
  Tender: FileText,
  Advisory: Megaphone,
  Circular: FileText,
};

/* ── Status pill ─────────────────────────────────────────────────────── */
const STATUS_STYLE = {
  draft: "bg-surface-soft text-muted-text",
  published: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  archived: "bg-surface-soft text-muted-text",
  scheduled: "bg-amber-100 text-amber-700",
};

/**
 * @param {{ notices: Array<{
 *   day: string, month: string, title: string,
 *   category: string, badge: string, status?: string,
 *   priority?: string, href: string, count: string|null
 * }> }} props
 */
export default function LatestUpdates({ notices }) {
  return (
    <section
      id="notices"
      className="border-hairline bg-surface-card w-full border-t px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-caption text-muted-text font-medium tracking-wide uppercase">
              Latest Notices
            </span>
            <h2 className="text-display-sm sm:text-display-md text-ink mt-1">
              Updates
            </h2>
          </div>

          <Link
            href="/notices"
            className="text-body-sm text-ink flex items-center gap-1 font-medium hover:opacity-80 active:scale-[0.98]"
          >
            <span>View all notices</span>
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Notices Stack */}
        {notices.length === 0 ? (
          <p className="text-body-sm text-muted-text border-hairline bg-canvas rounded-lg border py-12 text-center">
            No public notices at this time.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {notices.map((item, idx) => {
              const BadgeIcon = BADGE_ICON[item.badge] ?? Info;
              const badgeCls =
                BADGE_STYLE[item.badge] ?? "bg-slate-100 text-slate-600";
              const statusCls =
                STATUS_STYLE[item.status] ?? "bg-surface-soft text-muted-text";

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group border-hairline bg-canvas hover:bg-surface-soft shadow-subtle flex items-center justify-between gap-4 rounded-lg border p-4 transition-all duration-150 active:scale-[0.99]"
                >
                  {/* Date Box + Title */}
                  <div className="flex min-w-0 items-center gap-4">
                    {/* Date Pill */}
                    <div className="border-hairline bg-surface-soft text-ink group-hover:bg-primary group-hover:text-on-primary flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md border transition-colors">
                      <span className="text-body-sm font-mono leading-none font-normal">
                        {item.day}
                      </span>
                      <span className="text-[10px] font-medium tracking-wider uppercase">
                        {item.month}
                      </span>
                    </div>

                    <div className="min-w-0">
                      {/* Type badge + status pill */}
                      <div className="mb-1 flex flex-wrap items-center gap-1.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                            badgeCls
                          )}
                        >
                          <BadgeIcon className="h-2.5 w-2.5" strokeWidth={2} />
                          {item.badge}
                        </span>
                        {item.status && (
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase",
                              statusCls
                            )}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-ink text-title-sm line-clamp-2 leading-snug font-medium transition-opacity group-hover:opacity-80">
                        {item.title}
                      </h3>
                      <span className="text-muted-text text-caption mt-0.5 inline-block font-normal">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className="bg-surface-soft text-muted-soft group-hover:bg-surface-strong group-hover:text-ink flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors">
                    <ChevronRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
