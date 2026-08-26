"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Printer,
  Share2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Calendar,
  Building2,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ISSUES } from "@/constants/issues";
import { toast } from "sonner";

export function ComplaintDetailHeader({ complaint }) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (!complaint?.id) return;
    navigator.clipboard.writeText(complaint.id);
    setCopied(true);
    toast.success("Complaint ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const issueMeta =
    ISSUES.find(
      (i) => i.title.toLowerCase() === (complaint?.issue || "").toLowerCase()
    ) ||
    ISSUES.find((i) => (complaint?.issue || "").toLowerCase().includes(i.id)) ||
    null;

  const statusKey = complaint?.status?.toLowerCase() || "registered";
  const priorityKey = complaint?.priority?.toLowerCase() || "normal";

  const getStatusBadge = () => {
    switch (statusKey) {
      case "assigned":
        return { label: "Assigned", variant: "info", dot: "bg-blue-500" };
      case "in_progress":
        return {
          label: "In progress",
          variant: "warning",
          dot: "bg-amber-500",
        };
      case "resolved":
        return { label: "Resolved", variant: "success", dot: "bg-emerald-500" };
      case "closed":
        return { label: "Closed", variant: "secondary", dot: "bg-muted-text" };
      case "registered":
      default:
        return { label: "Registered", variant: "canvas", dot: "bg-muted-text" };
    }
  };

  const getPriorityBadge = () => {
    if (priorityKey === "vimp" || priorityKey === "critical") {
      return {
        label: "Safety hazard",
        variant: "error",
        icon: ShieldAlert,
      };
    }
    if (priorityKey === "imp" || priorityKey === "high") {
      return {
        label: "High priority",
        variant: "warning",
        icon: AlertTriangle,
      };
    }
    return {
      label: "Normal priority",
      variant: "secondary",
      icon: Clock,
    };
  };

  const priorityConfig = getPriorityBadge();

  const formattedDate = complaint?.created_at
    ? new Date(complaint.created_at).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently filed";

  return (
    <div className="mb-6">
      {/* Top navigation & action buttons */}
      <div className="border-hairline-soft flex flex-wrap items-center justify-between gap-3 border-b pb-3.5">
        <Link href="/complaints">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="size-4" />}
            className="text-muted-text hover:text-ink -ml-2 transition-transform active:scale-[0.97]"
          >
            <span>Back to complaints</span>
          </Button>
        </Link>
      </div>

      {/* Main Content: Issue as Title, Description, Filed Date */}
      <div className="mt-4">
        {/* Status & Priority badges row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant={priorityConfig.variant}
            size="sm"
            shape="pill"
            className="gap-1 px-2.5 py-0.5 text-xs font-medium"
          >
            <span>{priorityConfig.label}</span>
          </Badge>

          {issueMeta?.category && (
            <Badge
              variant="canvas"
              size="sm"
              shape="pill"
              className="text-[11px] font-medium"
            >
              <Tag className="text-muted-text mr-1 size-3" />
              {issueMeta.category}
            </Badge>
          )}
        </div>

        {/* 1. Issue as Title */}
        <h1 className="text-title-lg text-ink tracking-tight">
          {complaint?.issue || complaint?.title || "Electrical Complaint"}
        </h1>

        {/* 2. Description (if exists) */}
        {complaint?.description ? (
          <p className="text-body-sm text-body mt-2.5 max-w-3xl leading-relaxed whitespace-pre-wrap">
            {complaint.description}
          </p>
        ) : null}

        {/* 3. Date when complaint added & ID */}
        <div className="border-hairline-soft text-caption text-muted-text mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-3.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="text-muted-text size-3.5 shrink-0" />
            <span>Filed on {formattedDate}</span>
          </div>

          <span className="text-hairline hidden sm:inline">·</span>

          <div className="flex items-center gap-1.5">
            <span>ID:</span>
            <span className="text-ink font-mono font-medium">
              #{complaint?.id}
            </span>
            <button
              type="button"
              onClick={handleCopyId}
              title="Copy complaint ID"
              aria-label="Copy complaint ID"
              className="text-muted-text hover:text-ink ml-0.5 inline-flex items-center rounded p-0.5 transition-colors active:scale-95"
            >
              {copied ? (
                <Check className="text-success size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
