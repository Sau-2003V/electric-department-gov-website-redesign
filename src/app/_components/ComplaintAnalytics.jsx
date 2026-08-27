"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, BarChart3, Users, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

/* ── Chart Configurations ────────────────────────────────────────────── */
const trendChartConfig = {
  complaints: {
    label: "Complaints",
    color: "var(--chart-1)",
  },
};

const statusChartConfig = {
  resolved: {
    label: "Resolved",
    color: "var(--chart-1)",
  },
  in_progress: {
    label: "In progress",
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-3)",
  },
};

const categoryChartConfig = {
  count: {
    label: "Complaints",
    color: "var(--chart-1)",
  },
  label: {
    color: "var(--background)",
  },
};

/* ── Main Component ─────────────────────────────────────────────────── */
/**
 * @param {{ data: {
 *   todayCount?: number,
 *   todayDelta?: string,
 *   staffActive?: number,
 *   statusDist?: Array<{ label: string, value: number, color?: string, stroke?: string }>,
 *   categoryData?: Array<{ label: string, count: number, max?: number }>,
 *   trendPoints?: number[],
 * }}} props
 */
export default function ComplaintAnalytics({ data }) {
  const {
    todayCount = 0,
    todayDelta = "",
    staffActive = 0,
    statusDist = [],
    categoryData = [],
    trendPoints = [],
  } = data || {};

  const resolvedPct = statusDist[0]?.value ?? 0;
  const todayDisplay = Number(todayCount).toLocaleString("en-IN");
  const staffDisplay = Number(staffActive).toLocaleString("en-IN");

  // ponytail: 7-day trend rolling window; ceiling = range picker (30d/90d/custom)
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const trendChartData = (
    trendPoints.length === 7 ? trendPoints : Array(7).fill(0)
  ).map((count, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      day: dayNames[d.getDay()],
      date: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      complaints: count,
    };
  });

  // Shape status data for Shadcn Pie / Donut chart
  const statusChartData = (
    statusDist.length > 0
      ? statusDist
      : [
          { label: "Resolved", value: 0 },
          { label: "In progress", value: 0 },
          { label: "Pending", value: 100 },
        ]
  ).map((item, idx) => {
    const key = item.label.toLowerCase().replace(/\s+/g, "_");
    const fillColors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ];
    return {
      status: key,
      label: item.label,
      value: item.value,
      fill: fillColors[idx % fillColors.length],
    };
  });

  // Shape category data for Shadcn horizontal Bar chart
  const categoryChartData = (categoryData || []).map((c) => ({
    category: c.label,
    count: c.count,
    fill: "var(--chart-1)",
  }));

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
              <Card
                key={s.label}
                className="border-hairline bg-canvas shadow-subtle hover:shadow-card p-5 transition-shadow"
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
              </Card>
            );
          })}
        </div>

        {/* Charts row — 3 Shadcn UI Chart Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 1. Status Distribution (Donut Chart) */}
          <Card className="border-hairline bg-canvas shadow-subtle flex flex-col p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-caption text-ink font-medium tracking-wide uppercase">
                Status distribution
              </CardTitle>
              <CardDescription className="text-caption text-muted-text">
                Resolution performance (30 days)
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center p-0">
              <ChartContainer
                config={statusChartConfig}
                className="mx-auto aspect-square h-[170px] w-full"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        formatter={(val, name, item) => (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              {item?.payload?.label ?? name}:
                            </span>
                            <span className="text-foreground font-mono font-medium">
                              {val}%
                            </span>
                          </div>
                        )}
                      />
                    }
                  />
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="status"
                    innerRadius={50}
                    outerRadius={72}
                    strokeWidth={2}
                    stroke="var(--canvas)"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 2}
                                className="fill-ink font-mono text-xl font-semibold"
                              >
                                {resolvedPct}%
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 16}
                                className="fill-muted-text text-[11px] font-medium"
                              >
                                Resolved
                              </tspan>
                            </text>
                          );
                        }
                        return null;
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>

              {/* Status Legend */}
              <div className="border-hairline mt-4 w-full space-y-2 border-t pt-3">
                {statusChartData.map((d) => (
                  <div
                    key={d.label}
                    className="text-body-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: d.fill }}
                      />
                      <span className="text-muted-text">{d.label}</span>
                    </div>
                    <span className="text-ink font-mono font-medium">
                      {d.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 2. By Category (Shadcn Horizontal Bar Chart with Custom Labels) */}
          <Card className="border-hairline bg-canvas shadow-subtle flex flex-col p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-caption text-ink font-medium tracking-wide uppercase">
                By category (today)
              </CardTitle>
              <CardDescription className="text-caption text-muted-text">
                Top issue breakdowns logged today
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between p-0">
              {categoryChartData.length > 0 ? (
                <ChartContainer
                  config={categoryChartConfig}
                  className="aspect-auto h-[180px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={categoryChartData}
                    layout="vertical"
                    margin={{
                      right: 28,
                      left: 0,
                      top: 4,
                      bottom: 4,
                    }}
                  >
                    <CartesianGrid
                      horizontal={false}
                      stroke="var(--hairline)"
                      strokeDasharray="3 3"
                    />
                    <YAxis
                      dataKey="category"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      hide
                    />
                    <XAxis dataKey="count" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4}>
                      <LabelList
                        dataKey="category"
                        position="insideLeft"
                        offset={8}
                        className="fill-(--color-label) font-sans font-medium"
                        fontSize={11}
                      />
                      <LabelList
                        dataKey="count"
                        position="right"
                        offset={8}
                        className="fill-ink font-mono font-medium"
                        fontSize={12}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="text-muted-soft mb-2 h-8 w-8" />
                  <p className="text-caption text-muted-text">
                    No complaints logged today.
                  </p>
                </div>
              )}

              <div className="border-hairline mt-4 flex items-end justify-between border-t pt-3">
                <div>
                  <span className="text-ink text-title-lg font-mono font-medium">
                    {categoryChartData.reduce(
                      (acc, curr) => acc + (curr.count || 0),
                      0
                    )}
                  </span>
                  <p className="text-caption text-muted-text">
                    Active category logs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. 7-Day Complaint Trend (Shadcn Area Chart) */}
          <Card className="border-hairline bg-canvas shadow-subtle flex flex-col p-6">
            <CardHeader className="p-0 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-caption text-ink font-medium tracking-wide uppercase">
                    7-day complaint trend
                  </CardTitle>
                  <CardDescription className="text-caption text-muted-text">
                    Daily complaint volume
                  </CardDescription>
                </div>
                {todayDelta && (
                  <div className="border-hairline bg-surface-soft text-caption text-ink inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-medium">
                    <TrendingUp className="h-3 w-3" strokeWidth={1.5} />
                    <span>{todayDelta}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between p-0">
              <ChartContainer
                config={trendChartConfig}
                className="aspect-auto h-[180px] w-full"
              >
                <AreaChart
                  data={trendChartData}
                  margin={{ left: 8, right: 8, top: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="fillComplaints"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="var(--hairline)"
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-caption fill-muted-text font-sans"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelFormatter={(_, payload) => {
                          const date = payload?.[0]?.payload?.date;
                          return date ? `${date}` : undefined;
                        }}
                      />
                    }
                  />
                  <Area
                    dataKey="complaints"
                    type="natural"
                    fill="url(#fillComplaints)"
                    fillOpacity={0.4}
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>

              <div className="border-hairline mt-4 flex items-end justify-between border-t pt-3">
                <div>
                  <span className="text-ink text-title-lg font-mono font-medium">
                    {todayDisplay}
                  </span>
                  <p className="text-caption text-muted-text">
                    Complaints today
                  </p>
                </div>
                <div className="text-caption text-muted-text text-right">
                  <span>Last 7 days total: </span>
                  <span className="text-ink font-mono font-medium">
                    {trendPoints
                      .reduce((acc, curr) => acc + (curr || 0), 0)
                      .toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
