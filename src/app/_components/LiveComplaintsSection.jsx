"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  Copy,
  Check,
  Clock,
  Loader2,
  CheckCircle2,
  Inbox,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ── Data ────────────────────────────────────────────────────────────── */
// ponytail: same data as (consumer)/complaints — single source of truth later
const COMPLAINTS = [
  {
    id: "VVNL-240001",
    priority: "Safety critical",
    title: "Sparking / safety hazard",
    description:
      "Live wire sparking near the school gate, heavy sparking every few minutes.",
    date: "22 Aug 2026",
    status: "Assigned",
    sla: "SLA breached",
    category: "Hazard",
  },
  {
    id: "VVNL-240002",
    priority: "High",
    title: "Power outage — Block 7",
    description:
      "No supply in the entire block since last night. Transformer may be blown.",
    date: "22 Aug 2026",
    status: "In progress",
    sla: "SLA breached",
    category: "Outage",
  },
  {
    id: "VVNL-240007",
    priority: "Medium",
    title: "Voltage fluctuation",
    description: "Severe voltage fluctuation, appliances tripping repeatedly.",
    date: "21 Aug 2026",
    status: "Assigned",
    sla: "SLA breached",
    category: "Voltage",
  },
  {
    id: "VVNL-240009",
    priority: "Low",
    title: "Meter display blank",
    description:
      "Digital smart meter screen is unresponsive after power surge.",
    date: "14 Aug 2026",
    status: "Resolved",
    sla: "SLA met",
    category: "Meter",
  },
  {
    id: "VVNL-240005",
    priority: "Low",
    title: "Street light not working",
    description: "Street lights on the main road stay off all night.",
    date: "17 Aug 2026",
    status: "Closed",
    sla: "SLA met",
    category: "Street Light",
  },
  {
    id: "VVNL-240011",
    priority: "Medium",
    title: "High billing discrepancy",
    description:
      "Bill amount doubled despite no change in consumption pattern.",
    date: "20 Aug 2026",
    status: "In progress",
    sla: "SLA met",
    category: "Billing",
  },
];

const TABS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "resolved", label: "Resolved" },
  { id: "critical", label: "Safety" },
];

const STATUS_CONFIG = {
  Registered: { icon: Inbox, variant: "canvas" },
  Assigned: { icon: Clock, variant: "info" },
  "In progress": { icon: Loader2, variant: "warning" },
  Resolved: { icon: CheckCircle2, variant: "success" },
  Closed: { icon: CheckCircle2, variant: "secondary" },
};

const SLA_CLASS = {
  "SLA breached": "text-semantic-error",
  "SLA met": "text-semantic-success",
};

/* ── Single complaint row ─────────────────────────────────────────────── */
function ComplaintRow({ complaint, copiedId, onCopy }) {
  const sc = STATUS_CONFIG[complaint.status] ?? STATUS_CONFIG["Assigned"];
  const Icon = sc.icon;
  const isCopied = copiedId === complaint.id;

  return (
    <div className="border-hairline-soft hover:bg-surface-2/30 flex items-start gap-3 border-b px-5 py-4 transition-colors last:border-b-0">
      {/* Status dot */}
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          complaint.status === "Resolved" || complaint.status === "Closed"
            ? "bg-semantic-success"
            : complaint.status === "In progress"
              ? "bg-report-orange"
              : "bg-report-blue"
        )}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-body-sm text-ink font-medium">
            {complaint.title}
          </span>
          <Badge variant={sc.variant} size="sm">
            <Icon className="size-2.5" strokeWidth={2.2} />
            {complaint.status}
          </Badge>
          {complaint.priority === "Safety critical" && (
            <Badge variant="destructive" size="sm">
              <AlertTriangle className="size-2.5" strokeWidth={2.2} />
              Critical
            </Badge>
          )}
        </div>
        <p className="text-caption text-ink-muted mt-0.5 line-clamp-1">
          {complaint.description}
        </p>
        <div className="text-caption text-ink-subtle mt-1 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onCopy(complaint.id)}
            className="hover:text-fin-orange flex items-center gap-1 font-mono"
            title="Copy docket ID"
          >
            {isCopied ? (
              <Check className="text-semantic-success h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {complaint.id}
          </button>
          <span className="text-hairline">·</span>
          <span>{complaint.date}</span>
          <span className="text-hairline">·</span>
          <span className={cn("font-medium", SLA_CLASS[complaint.sla])}>
            {complaint.sla}
          </span>
        </div>
      </div>

      <Link
        href={`/complaints?search=${complaint.id}`}
        className="text-ink-tertiary hover:text-fin-orange shrink-0"
        aria-label={`View complaint ${complaint.id}`}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────── */
export default function LiveComplaintsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filtered = useMemo(() => {
    return COMPLAINTS.filter((c) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" &&
          (c.status === "Assigned" || c.status === "In progress")) ||
        (activeTab === "resolved" &&
          (c.status === "Resolved" || c.status === "Closed")) ||
        (activeTab === "critical" && c.priority === "Safety critical");

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);

      return matchesTab && matchesQuery;
    });
  }, [activeTab, searchQuery]);

  return (
    <section
      id="live-complaints"
      className="border-hairline bg-canvas w-full border-t px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-eyebrow text-fin-orange font-semibold tracking-wide uppercase">
              Live registry
            </span>
            <h2 className="text-display-md text-ink mt-1">Recent complaints</h2>
          </div>
          <Link
            href="/complaints"
            className="text-body-sm text-fin-orange inline-flex items-center gap-1.5 font-medium hover:underline"
          >
            View all complaints
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="border-hairline bg-surface-1 overflow-hidden rounded-xl border shadow-2xs">
          {/* Toolbar */}
          <div className="border-hairline-soft bg-surface-2/30 flex flex-col gap-3 border-b px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Tab pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-all active:scale-[0.96]",
                    activeTab === t.id
                      ? "bg-ink text-on-primary shadow-2xs"
                      : "border-hairline bg-surface-1 text-ink-muted hover:bg-surface-2 hover:text-ink border"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search
                className="text-ink-muted absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docket or area…"
                className="border-hairline bg-surface-1 text-ink placeholder-ink-tertiary focus:border-ink w-full rounded-md border py-2 pr-3 pl-9 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="text-body-sm text-ink-muted py-12 text-center">
              No complaints match your search.{" "}
              <button
                type="button"
                className="text-fin-orange hover:underline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((c) => (
              <ComplaintRow
                key={c.id}
                complaint={c}
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            ))
          )}

          {/* Footer CTA */}
          <div className="border-hairline-soft bg-surface-2/20 flex items-center justify-between border-t px-5 py-3">
            <span className="text-caption text-ink-muted">
              Showing {filtered.length} of {COMPLAINTS.length} complaints
            </span>
            <Link
              href="/complaints/new"
              className="bg-fin-orange text-on-primary inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold shadow-xs transition-all hover:brightness-110 active:scale-[0.96]"
            >
              Register new complaint
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
