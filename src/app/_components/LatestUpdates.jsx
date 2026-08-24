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
        <div className="flex flex-col gap-3">
          {notices.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group border-hairline bg-canvas hover:border-hairline hover:bg-surface-soft shadow-subtle flex items-center justify-between gap-4 rounded-lg border p-4 transition-all duration-150 active:scale-[0.99]"
            >
              {/* Date Box + Title */}
              <div className="flex items-center gap-4">
                {/* Date Pill Box */}
                <div className="border-hairline bg-surface-soft text-ink group-hover:bg-primary group-hover:text-on-primary flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md border transition-colors">
                  <span className="text-body-sm font-mono leading-none font-bold">
                    {item.day}
                  </span>
                  <span className="text-[10px] font-medium tracking-wider uppercase">
                    {item.month}
                  </span>
                </div>

                <div>
                  <h3 className="text-ink text-title-sm leading-snug font-semibold transition-opacity group-hover:opacity-80">
                    {item.title}
                  </h3>
                  <span className="text-muted-text text-caption mt-1 inline-block font-normal">
                    Category: {item.category}
                  </span>
                </div>
              </div>

              {/* Badges & Chevron */}
              <div className="flex shrink-0 items-center gap-3">
                {item.count && (
                  <span className="bg-primary text-on-primary text-caption flex h-5 w-5 items-center justify-center rounded-full font-medium">
                    {item.count}
                  </span>
                )}
                <div className="bg-surface-soft text-muted-soft group-hover:bg-surface-strong group-hover:text-ink flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.5}
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
