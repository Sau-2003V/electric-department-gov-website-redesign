"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Copy,
  Check,
  Clock,
  Loader2,
  CheckCircle2,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

/* ── Single complaint row ─────────────────────────────────────────────── */
function ComplaintRow({ complaint, copiedId, onCopy }) {
  const sc = STATUS_CONFIG[complaint.status] ?? STATUS_CONFIG["Assigned"];
  const Icon = sc.icon;
  const isCopied = copiedId === complaint.id;

  return (
    <div className="border-hairline-soft hover:bg-surface-soft flex items-start gap-3 border-b px-5 py-4 transition-colors last:border-b-0">
      {/* Status dot */}
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          complaint.status === "Resolved" || complaint.status === "Closed"
            ? "bg-primary"
            : complaint.status === "In progress"
              ? "bg-muted-text"
              : "bg-surface-strong"
        )}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-title-sm text-ink font-medium">
            {complaint.title}
          </span>
          <Badge variant={sc.variant} size="sm">
            {complaint.status}
          </Badge>
          {complaint.priority === "Safety critical" && (
            <Badge variant="destructive" size="sm">
              Critical
            </Badge>
          )}
        </div>
        <p className="text-caption text-muted-text mt-0.5 line-clamp-1">
          {complaint.description}
        </p>
        <div className="text-caption text-muted-soft mt-1 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onCopy(complaint.id)}
            className="hover:text-ink text-muted-text flex items-center gap-1 font-mono transition-colors"
            title="Copy docket ID"
          >
            {isCopied ? (
              <Check className="text-ink h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {complaint.id}
          </button>
          <span className="text-hairline">·</span>
          <span>{complaint.date}</span>
          {complaint.category && (
            <>
              <span className="text-hairline">·</span>
              <span className="text-muted-text max-w-[160px] truncate">
                {complaint.category}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────── */
/**
 * @param {{ initialComplaints: Array<{
 *   id: string, _uuid?: string, title: string, description: string,
 *   date: string, status: string, priority: string, category: string, sla: string|null
 * }> }} props
 */
export default function LiveComplaintsSection({ initialComplaints }) {
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
    return initialComplaints.filter((c) => {
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
        (c.category ?? "").toLowerCase().includes(q);

      return matchesTab && matchesQuery;
    });
  }, [activeTab, searchQuery, initialComplaints]);

  return (
    <section
      id="live-complaints"
      className="border-hairline bg-canvas w-full border-t px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-caption text-muted-text font-medium tracking-wide uppercase">
              Live registry
            </span>
            <h2 className="text-display-sm sm:text-display-md text-ink mt-1">
              Recent complaints
            </h2>
          </div>
          <Link
            href="/complaints"
            className="text-body-sm text-ink inline-flex items-center gap-1.5 font-medium hover:opacity-80"
          >
            View all complaints
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="border-hairline bg-canvas shadow-subtle overflow-hidden rounded-lg border">
          {/* Toolbar */}
          <div className="border-hairline-soft bg-surface-soft flex flex-col gap-3 border-b px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Tab pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "text-button cursor-pointer rounded-md px-3 py-1.5 font-medium transition-all active:scale-[0.98]",
                    activeTab === t.id
                      ? "bg-primary text-on-primary"
                      : "border-hairline bg-canvas text-muted-text hover:bg-surface-soft hover:text-ink border"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search
                className="text-muted-text absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docket or area…"
                className="border-hairline bg-canvas text-ink placeholder:text-muted-soft focus:border-ink text-body-sm w-full rounded-md border py-2 pr-3 pl-9 focus:outline-none"
              />
            </div>
          </div>

          {/* Rows */}
          {initialComplaints.length === 0 ? (
            <div className="text-body-sm text-muted-text py-12 text-center">
              No complaints on record yet.
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-body-sm text-muted-text py-12 text-center">
              No complaints match your search.{" "}
              <button
                type="button"
                className="text-ink cursor-pointer underline hover:opacity-80"
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
          <div className="border-hairline-soft bg-surface-soft/60 flex items-center justify-between border-t px-5 py-3">
            <span className="text-caption text-muted-text">
              Showing {filtered.length} of {initialComplaints.length} complaints
            </span>
            <Link
              href="/complaints/new"
              className="bg-primary text-on-primary text-button hover:bg-primary-active inline-flex items-center gap-1.5 rounded-md px-4 py-2 font-medium transition-all active:scale-[0.98]"
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
