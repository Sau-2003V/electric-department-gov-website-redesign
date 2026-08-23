import Link from "next/link";
import { ChevronRight } from "lucide-react";

const notices = [
  {
    day: "23",
    month: "Feb",
    title:
      "Notification regarding the Tariff for FY 2024-25 and True-up of previous financial year",
    category: "Tariff Order",
    badge: "Notice",
    href: "/notices",
    count: "3",
  },
  {
    day: "20",
    month: "Feb",
    title:
      "Tender Notice for Substation Maintenance, Distribution Transformers & 11kV Lines",
    category: "E-Tender",
    badge: "Tender",
    href: "/tenders",
    count: null,
  },
  {
    day: "15",
    month: "Feb",
    title:
      "Public Notice on Consumer Tariff Petition & Regulatory Commission Directives",
    category: "Regulatory",
    badge: "Public",
    href: "/notices",
    count: "2",
  },
];

export default function LatestUpdates() {
  return (
    <section
      id="notices"
      className="border-hairline bg-canvas w-full border-t px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-fin-orange text-xs font-medium tracking-wide uppercase">
              Latest Notices
            </span>
            <h2 className="text-ink mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
              Updates
            </h2>
          </div>

          <Link
            href="/notices"
            className="text-fin-orange flex items-center gap-1 text-xs font-medium transition-colors hover:underline active:scale-[0.96]"
          >
            <span>View all notices</span>
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        {/* Notices Stack */}
        <div className="flex flex-col gap-3">
          {notices.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group border-hairline bg-surface-1 hover:border-hairline flex items-center justify-between gap-4 rounded-xl border p-4 shadow-2xs transition-all duration-150 hover:shadow-xs active:scale-[0.99]"
            >
              {/* Date Box + Title */}
              <div className="flex items-center gap-4">
                {/* Date Pill Box */}
                <div className="border-hairline bg-surface-2 text-ink group-hover:border-fin-orange group-hover:bg-fin-orange group-hover:text-on-primary flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border transition-colors">
                  <span className="font-mono text-sm leading-none font-bold">
                    {item.day}
                  </span>
                  <span className="text-[10px] font-medium tracking-wider uppercase">
                    {item.month}
                  </span>
                </div>

                <div>
                  <h3 className="text-ink group-hover:text-fin-orange text-xs leading-snug font-medium transition-colors sm:text-sm">
                    {item.title}
                  </h3>
                  <span className="text-ink-muted mt-1 inline-block text-xs font-normal">
                    Category: {item.category}
                  </span>
                </div>
              </div>

              {/* Badges & Chevron */}
              <div className="flex shrink-0 items-center gap-3">
                {item.count && (
                  <span className="bg-fin-orange text-on-primary flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium">
                    {item.count}
                  </span>
                )}
                <div className="bg-surface-2 text-ink-tertiary group-hover:bg-fin-orange/10 group-hover:text-fin-orange flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
