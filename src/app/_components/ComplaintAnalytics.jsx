// Server Component — no "use client" needed; hover effect is pure CSS
import { TrendingUp, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Donut SVG chart ─────────────────────────────────────────────────── */
function DonutChart({ data, resolvedPct }) {
  const size = 140;
  const r = 52;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = data.map((d) => {
    const dash = (d.value / 100) * circumference;
    const gap = circumference - dash;
    const seg = { ...d, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={14}
          className="text-hairline"
        />
        {segments.map((seg) => (
          <circle
            key={seg.label}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.stroke}
            strokeWidth={14}
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeDashoffset={-seg.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      {/* Center label */}
      <div className="absolute flex flex-col items-center">
        <span className="text-ink text-title-lg font-mono font-normal">
          {resolvedPct}%
        </span>
        <span className="text-caption text-muted-text">Resolved</span>
      </div>
    </div>
  );
}

/* ── Bar row for category breakdown ──────────────────────────────────── */
function CategoryBar({ label, count, max }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-caption text-muted-text w-28 shrink-0">
        {label}
      </span>
      <div className="bg-surface-soft flex-1 overflow-hidden rounded-full">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-caption text-ink w-8 text-right font-mono font-medium">
        {count}
      </span>
    </div>
  );
}

/* ── Trend Sparkline ─────────────────────────────────────────────────── */
function Sparkline({ points }) {
  const w = 200;
  const h = 48;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const pts = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.85 - h * 0.075;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const area = `0,${h} ${polyline} ${w},${h}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full"
    >
      <polyline points={area} fill="rgba(17,17,17,0.04)" stroke="none" />
      <polyline
        points={polyline}
        fill="none"
        stroke="#111111"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Last point dot */}
      <circle
        cx={w}
        cy={parseFloat(pts[pts.length - 1].split(",")[1])}
        r="3"
        fill="#111111"
      />
    </svg>
  );
}

/* ── Main export ─────────────────────────────────────────────────────── */
/**
 * @param {{ data: {
 *   todayCount: number,
 *   todayDelta: string,
 *   staffActive: number,
 *   statusDist: Array<{ label: string, value: number, color: string, stroke: string }>,
 *   categoryData: Array<{ label: string, count: number, max: number }>,
 *   trendPoints: number[],
 * }}} props
 */
export default function ComplaintAnalytics({ data }) {
  const {
    todayCount,
    todayDelta,
    staffActive,
    statusDist,
    categoryData,
    trendPoints,
  } = data;

  const resolvedPct = statusDist[0]?.value ?? 0;
  const todayDisplay = todayCount.toLocaleString("en-IN");
  const staffDisplay = staffActive.toLocaleString("en-IN");

  const stats = [
    {
      label: "Complaints today",
      value: todayDisplay,
      delta: todayDelta,
      icon: BarChart3,
    },
    {
      label: "Field teams active",
      value: staffDisplay,
      delta: "Available now",
      icon: Users,
    },
  ];

  return (
    <section
      id="analytics"
      className="border-hairline bg-surface-card w-full border-t px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-caption text-muted-text font-medium tracking-wide uppercase">
              Live dashboard
            </span>
            <h2 className="text-display-sm sm:text-display-md text-ink mt-1">
              Complaint status at a glance
            </h2>
          </div>
        </div>

        {/* KPI row — 2 cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={cn(
                  "border-hairline bg-canvas shadow-subtle hover:shadow-card flex flex-col rounded-lg border p-5 transition-shadow"
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-caption text-muted-text font-medium uppercase">
                    {s.label}
                  </span>
                  <Icon className="text-ink h-4 w-4" strokeWidth={1.5} />
                </div>
                <span className="text-ink text-display-sm font-mono font-medium">
                  {s.value}
                </span>
                {s.delta && (
                  <span className="text-caption text-muted-text mt-1">
                    {s.delta}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Donut — resolution status */}
          <div className="border-hairline bg-canvas shadow-subtle rounded-lg border p-6">
            <h3 className="text-caption text-ink mb-4 font-medium uppercase">
              Status distribution
            </h3>
            <DonutChart data={statusDist} resolvedPct={resolvedPct} />
            {/* Legend */}
            <div className="mt-4 space-y-2">
              {statusDist.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${d.color}`} />
                    <span className="text-body-sm text-muted-text">
                      {d.label}
                    </span>
                  </div>
                  <span className="text-body-sm text-ink font-mono font-medium">
                    {d.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category bars */}
          <div className="border-hairline bg-canvas shadow-subtle rounded-lg border p-6">
            <h3 className="text-caption text-ink mb-4 font-medium uppercase">
              By category (today)
            </h3>
            {categoryData.length > 0 ? (
              <div className="space-y-4">
                {categoryData.map((c) => (
                  <CategoryBar key={c.label} {...c} />
                ))}
              </div>
            ) : (
              <p className="text-caption text-muted-text">
                No complaints logged today.
              </p>
            )}
          </div>

          {/* 7-day trend sparkline */}
          <div className="border-hairline bg-canvas shadow-subtle flex flex-col rounded-lg border p-6">
            <h3 className="text-caption text-ink mb-1 font-medium uppercase">
              7-day complaint trend
            </h3>
            <p className="text-caption text-muted-text mb-4">All categories</p>
            <div className="flex-1">
              <Sparkline points={trendPoints} />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <span className="text-ink text-title-lg font-mono font-medium">
                  {todayDisplay}
                </span>
                <p className="text-caption text-muted-text">Today</p>
              </div>
              {todayDelta && (
                <div className="text-caption text-ink flex items-center gap-1 font-medium">
                  <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span>{todayDelta}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
