import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: "1.42 Cr",
    label: "Registered Consumers",
    sublabel: "Across 21 Districts",
    watermark: "1.42",
    dark: false,
  },
  {
    value: "21",
    label: "Districts Covered",
    sublabel: "Operational Circles",
    watermark: "21",
    dark: false,
  },
  {
    value: "1,860",
    label: "Substations Active",
    sublabel: "33/11 kV Grid Units",
    watermark: "1.8k",
    dark: false,
  },
  {
    value: "1912",
    label: "Toll Free Helpline",
    sublabel: "24x7 Active Grievance",
    watermark: "1912",
    dark: true,
  },
];

function StatCard({ value, label, sublabel, watermark, dark }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-xl p-6 transition-all duration-150",
        dark
          ? "bg-inverse-canvas text-inverse-ink border-inverse-surface-1 border shadow-xs"
          : "border-hairline bg-surface-1 text-ink hover:border-hairline border shadow-2xs"
      )}
    >
      {/* Faded Watermark in background */}
      <span
        className={cn(
          "pointer-events-none absolute -right-2 -bottom-3 font-mono text-7xl leading-none font-bold select-none",
          dark ? "text-inverse-ink/5" : "text-ink/5"
        )}
      >
        {watermark}
      </span>

      <div className="relative z-10">
        <p className="text-fin-orange font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          {value}
        </p>
      </div>

      <div className="relative z-10 mt-3">
        <p
          className={cn(
            "text-xs font-semibold tracking-wider uppercase",
            dark ? "text-inverse-ink" : "text-ink"
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "text-xs font-normal",
            dark ? "text-inverse-ink-muted" : "text-ink-muted"
          )}
        >
          {sublabel}
        </p>
        {dark && (
          <span className="bg-fin-orange mt-2 block h-0.5 w-8 rounded-full" />
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-canvas w-full px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column (Content & CTAs) */}
        <div className="flex flex-col items-start pr-0 lg:col-span-7 lg:pr-8 xl:col-span-7">
          {/* Eyebrow Badge */}
          <div className="border-hairline bg-surface-2 text-ink mb-4 inline-flex items-center gap-2 rounded-xs border px-3 py-1 text-xs font-medium tracking-wide">
            <span className="bg-fin-orange h-2 w-2 animate-pulse rounded-full" />
            Official Portal
          </div>

          {/* Display Heading */}
          <h1 className="text-ink mb-4 text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-ink">VVNL</span>
          </h1>

          {/* Subhead / Paragraph */}
          <p className="text-ink-muted mb-8 max-w-2xl text-sm leading-relaxed font-normal sm:text-base">
            Vidyut Vitran Nigam Limited is a company incorporated under the
            Companies Act, carrying out the business of distribution of
            electricity within its licensed area of supply. The Nigam supplies
            power in both rural and urban areas round twenty four hours with
            state-of-the-art electrical infrastructure.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/about"
              className="bg-fin-orange text-on-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium shadow-xs transition-all hover:brightness-110 active:scale-[0.96]"
            >
              View More
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/login"
              className="border-hairline bg-surface-1 text-ink hover:bg-surface-2 inline-flex items-center justify-center rounded-md border px-6 py-2.5 text-sm font-medium shadow-2xs transition-colors active:scale-[0.96]"
            >
              Consumer Login
            </Link>
          </div>
        </div>

        {/* Right Column (2x2 Bento Stat Cards) */}
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <StatCard {...stats[0]} />
              <StatCard {...stats[2]} />
            </div>
            <div className="flex flex-col gap-4 sm:pt-6">
              <StatCard {...stats[1]} />
              <StatCard {...stats[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
