"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronRight,
  FileText,
  Megaphone,
  ShieldAlert,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/database/supabase/client";

/* ─── Notice type config ─────────────────────────────────────────────── */

const TYPE_CONFIG = {
  power: {
    icon: Zap,
    iconBg: "bg-brand-accent/10",
    iconColor: "text-brand-accent",
  },

  emergency_outage: {
    icon: ShieldAlert,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },

  advisory: {
    icon: Megaphone,
    iconBg: "bg-surface-soft",
    iconColor: "text-ink",
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────── */

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isRecentlyUpdated(dateString) {
  if (!dateString) return false;

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return false;

  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  return Date.now() - date.getTime() <= sevenDays;
}

function mapNotice(row) {
  return {
    id: row.id,
    title: row.title || "Untitled Notice",
    summary: row.description || "",
    type: row.sub_type || "advisory",
    date: formatDate(row.updated_at || row.start_time),
    isNew: isRecentlyUpdated(row.updated_at),
  };
}

/* ─── Single notice row ──────────────────────────────────────────────── */

function NoticeRow({ notice }) {
  const tc = TYPE_CONFIG[notice.type] ?? TYPE_CONFIG.advisory;
  const Icon = tc.icon;

  return (
    <Link
      href={`/notices/${notice.id}`}
      className="group border-hairline-soft hover:bg-surface-soft flex items-start gap-4 border-b px-4 py-3.5 transition-colors last:border-b-0 sm:px-6"
    >
      {/* Type icon */}
      <div
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
          tc.iconBg
        )}
      >
        <Icon
          className={cn("size-4", tc.iconColor)}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-body-sm text-ink font-medium">{notice.title}</p>

          {notice.isNew && (
            <Badge variant="accent" size="sm">
              New
            </Badge>
          )}
        </div>

        <p className="text-caption text-muted-text mt-0.5 line-clamp-2 leading-relaxed">
          {notice.summary}
        </p>

        <p className="text-caption text-muted-text mt-1">{notice.date}</p>
      </div>

      {/* Chevron */}
      <ChevronRight
        className="text-muted-text group-hover:text-ink mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */

export default function RecentNotices({ className }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchRecentNotices() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("outage_notices")
        .select(
          "id, sub_type, title, description, start_time, updated_at, is_public"
        )
        .eq("is_public", true)
        .order("updated_at", {
          ascending: false,
          nullsFirst: false,
        })
        .limit(3);

      if (!mounted) return;

      if (error) {
        console.error("Error fetching recent notices:", error);
        setNotices([]);
      } else {
        setNotices((data || []).map(mapNotice));
      }

      setLoading(false);
    }

    fetchRecentNotices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      aria-label="Notices and Circulars"
      className={cn(
        "border-hairline bg-surface-card shadow-subtle overflow-hidden rounded-lg border",
        className
      )}
    >
      {/* Header */}
      <div className="border-hairline-soft flex items-center justify-between border-b px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-1.5">
          <Bell
            className="text-primary size-4"
            strokeWidth={2.2}
            aria-hidden="true"
          />

          <p className="text-caption text-muted-text font-medium tracking-wider uppercase">
            Notices &amp; Circulars
          </p>
        </div>

        <Link href="/notices">
          <Button variant="ghost" size="sm">
            <span>View all</span>

            <ChevronRight className="size-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-muted-text flex items-center justify-center py-10">
          <p className="text-body-sm">Loading notices...</p>
        </div>
      ) : notices.length === 0 ? (
        /* Empty state */
        <div className="text-muted-text flex flex-col items-center justify-center gap-2 py-10">
          <Bell className="size-7" strokeWidth={1.5} />

          <p className="text-body-sm">No notices available</p>
        </div>
      ) : (
        /* Rows */
        notices.map((notice) => <NoticeRow key={notice.id} notice={notice} />)
      )}
    </section>
  );
}
