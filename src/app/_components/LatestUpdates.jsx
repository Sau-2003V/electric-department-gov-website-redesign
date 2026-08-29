import Link from "next/link";
import {
  ChevronRight,
  AlertTriangle,
  Megaphone,
  FileText,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ── Badge config per notice type ─────────────────────────────────────── */
const BADGE_CONFIG = {
  Outage: {
    variant: "destructive-subtle",
    icon: AlertTriangle,
  },
  Notice: {
    variant: "info",
    icon: Info,
  },
  Tender: {
    variant: "warning-subtle",
    icon: FileText,
  },
  Advisory: {
    variant: "badge-violet",
    icon: Megaphone,
  },
  Circular: {
    variant: "canvas",
    icon: FileText,
  },
};

/* ── Status config ───────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  draft: { variant: "canvas" },
  published: { variant: "success-subtle" },
  active: { variant: "success-subtle" },
  archived: { variant: "canvas" },
  scheduled: { variant: "warning-subtle" },
};

/**
 * @param {{ notices: Array<{
 *   day: string, month: string, title: string,
 *   category: string, badge: string, status?: string,
 *   priority?: string, href: string, count: string|null
 * }> }} props
 */
export default function LatestUpdates({ notices = [] }) {
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

          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/notices"
              className="text-body-sm text-ink group/btn flex items-center gap-1 font-medium"
            >
              <span>View all notices</span>
              <ChevronRight
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </Button>
        </div>

        {/* Notices Stack */}
        {!notices || notices.length === 0 ? (
          <Card className="border-hairline bg-canvas py-12 text-center shadow-none">
            <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
              <FileText
                className="text-muted-text/60 h-8 w-8"
                strokeWidth={1.5}
              />
              <p className="text-body-sm text-muted-text">
                No public notices at this time.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {notices.map((item, idx) => {
              const badgeCfg = BADGE_CONFIG[item.badge] ?? {
                variant: "canvas",
                icon: Info,
              };
              const statusCfg = STATUS_CONFIG[item.status] ?? {
                variant: "canvas",
              };

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
                      <span className="text-caption font-medium tracking-wider uppercase">
                        {item.month}
                      </span>
                    </div>

                    <div className="min-w-0">
                      {/* Type badge + status pill */}
                      <div className="mb-1 flex flex-wrap items-center gap-1.5">
                        <Badge
                          variant={badgeCfg.variant}
                          size="sm"
                          shape="sm"
                          className="font-semibold tracking-wide uppercase"
                        >
                          {item.badge}
                        </Badge>
                        {item.status && (
                          <Badge
                            variant={statusCfg.variant}
                            size="sm"
                            shape="sm"
                            className="font-medium tracking-wide uppercase"
                          >
                            {item.status}
                          </Badge>
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
                  <div className="text-muted-soft flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors">
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
