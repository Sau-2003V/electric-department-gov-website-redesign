"use client";

import { useState } from "react";
import { TrendingUp, Clock, ShieldCheck, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Static analytics data ──────────────────────────────────────────── */
// ponytail: static snapshot — upgrade to Supabase realtime when dashboard is ready

const STATS = [
  {
    label: "Complaints today",
    value: "1,284",
    delta: "+12% vs yesterday",
    icon: BarChart3,
    positive: false,
  },
  {
    label: "Avg. resolution time",
    value: "3.4 hrs",
    delta: "SLA target: 4 hrs",
    icon: Clock,
    positive: true,
  },
  {
    label: "SLA met rate",
    value: "96.2%",
    delta: "+1.4pp this week",
    icon: ShieldCheck,
    positive: true,
  },
  {
    label: "Field teams active",
    value: "482",
    delta: "Across 18 circles",
    icon: Users,
    positive: true,
  },
];

// Status distribution (percentages must sum to 100)
const STATUS_DISTRIBUTION = [
  {
    label: "Resolved",
    value: 88.4,
    color: "bg-ink",
    stroke: "#111111",
  },
  {
    label: "In progress",
    value: 7.8,
    color: "bg-muted-text",
    stroke: "#6b7280",
  },
  {
    label: "Assigned",
    value: 3.8,
    color: "bg-surface-strong",
    stroke: "#e5e7eb",
  },
];

// Category breakdown data
const CATEGORY_DATA = [
  { label: "Power Outage", count: 421, max: 421 },
  { label: "Transformer", count: 298, max: 421 },
  { label: "Low Voltage", count: 267, max: 421 },
  { label: "Meter Fault", count: 189, max: 421 },
  { label: "Billing", count: 109, max: 421 },
];

/* ── Donut SVG chart ─────────────────────────────────────────────────── */
function DonutChart({ data }) {
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
        <span className="text-ink font-mono text-title-lg font-bold">88.4%</span>
        <span className="text-caption text-muted-text">Resolved</span>
      </div>
    </div>
  );
}

/* ── Bar row for category breakdown ──────────────────────────────────── */
function CategoryBar({ label, count, max }) {
  const pct = Math.round((count / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-caption text-muted-text w-28 shrink-0">{label}</span>
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
// 7-day complaint count trend (mock)
const TREND_POINTS = [980, 1102, 1045, 1189, 1312, 1098, 1284];

function Sparkline() {
  const w = 200;
  const h = 48;
  const max = Math.max(...TREND_POINTS);
  const min = Math.min(...TREND_POINTS);
  const range = max - min || 1;
  const pts = TREND_POINTS.map((v, i) => {
    const x = (i / (TREND_POINTS.length - 1)) * w;
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
export default function ComplaintAnalytics() {
  const [hoveredStat, setHoveredStat] = useState(null);

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

        {/* KPI row */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                onMouseEnter={() => setHoveredStat(s.label)}
                onMouseLeave={() => setHoveredStat(null)}
                className={cn(
                  "border-hairline bg-canvas flex flex-col rounded-lg border p-5 shadow-subtle transition-shadow",
                  hoveredStat === s.label && "shadow-card"
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-caption text-muted-text font-medium uppercase">
                    {s.label}
                  </span>
                  <Icon className="text-ink h-4 w-4" strokeWidth={1.5} />
                </div>
                <span className="text-ink font-mono text-display-sm font-semibold">
                  {s.value}
                </span>
                <span className="text-caption text-muted-text mt-1">
                  {s.delta}
                </span>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Donut — resolution status */}
          <div className="border-hairline bg-canvas rounded-lg border p-6 shadow-subtle">
            <h3 className="text-caption text-ink mb-4 font-semibold uppercase">
              Status distribution
            </h3>
            <DonutChart data={STATUS_DISTRIBUTION} />
            {/* Legend */}
            <div className="mt-4 space-y-2">
              {STATUS_DISTRIBUTION.map((d) => (
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
          <div className="border-hairline bg-canvas rounded-lg border p-6 shadow-subtle">
            <h3 className="text-caption text-ink mb-4 font-semibold uppercase">
              By category (today)
            </h3>
            <div className="space-y-4">
              {CATEGORY_DATA.map((c) => (
                <CategoryBar key={c.label} {...c} />
              ))}
            </div>
          </div>

          {/* 7-day trend sparkline */}
          <div className="border-hairline bg-canvas flex flex-col rounded-lg border p-6 shadow-subtle">
            <h3 className="text-caption text-ink mb-1 font-semibold uppercase">
              7-day complaint trend
            </h3>
            <p className="text-caption text-muted-text mb-4">
              Mon – Sun • All categories
            </p>
            <div className="flex-1">
              <Sparkline />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <span className="text-ink font-mono text-title-lg font-semibold">
                  1,284
                </span>
                <p className="text-caption text-muted-text">Today</p>
              </div>
              <div className="text-caption text-ink flex items-center gap-1 font-medium">
                <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>+12% vs yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
