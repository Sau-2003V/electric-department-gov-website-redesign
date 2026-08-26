"use client";

import Link from "next/link";
import { PhoneCall, UserCheck, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplaintEscalationMatrix({ complaint }) {
  const hasAssignedEngineer = Boolean(complaint?.assigned_engineer);
  const hasAssignedSupervisor = Boolean(complaint?.assigned_supervisor);

  return (
    <div className="border-hairline bg-surface-card shadow-subtle mb-6 rounded-lg border p-4 sm:p-5">
      {/* Header */}
      <div className="border-hairline-soft flex items-center justify-between border-b pb-3.5">
        <div className="flex items-center gap-2">
          <h2 className="text-title-sm text-ink font-semibold tracking-tight">
            Assigned team &amp; support
          </h2>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Assigned team info */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="border-hairline bg-surface-soft flex items-center gap-3 rounded-lg border p-3">
            <div className="text-brand-accent flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <UserCheck className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-caption text-muted-text block text-xs">
                Field engineer
              </span>
              <span className="text-body-sm text-ink block truncate font-medium">
                {hasAssignedEngineer
                  ? `Officer #${complaint.assigned_engineer.slice(0, 8)}`
                  : "Local repair crew"}
              </span>
            </div>
          </div>

          <div className="border-hairline bg-surface-soft flex items-center gap-3 rounded-lg border p-3">
            <div className="text-success flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
              <Building2 className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-caption text-muted-text block text-xs">
                Supervisory desk
              </span>
              <span className="text-body-sm text-ink block truncate font-medium">
                {hasAssignedSupervisor
                  ? `SDO #${complaint.assigned_supervisor.slice(0, 8)}`
                  : "Sub-divisional office"}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Step Escalation Ladder */}
        <div className="border-hairline bg-surface-soft rounded-lg border p-3.5">
          <span className="text-caption text-muted-text block text-xs font-medium tracking-wider uppercase">
            Escalation process if unresolved
          </span>
          <div className="mt-2.5 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
            <div className="border-hairline-soft bg-surface-card rounded border p-2.5">
              <span className="text-brand-accent font-semibold">
                1. Sub-division
              </span>
              <p className="text-muted-text mt-0.5">
                Initial inspection &amp; line repair (24–72 hrs)
              </p>
            </div>
            <div className="border-hairline-soft bg-surface-card rounded border p-2.5">
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                2. Grievance forum
              </span>
              <p className="text-muted-text mt-0.5">
                Consumer forum hearing if delayed
              </p>
            </div>
            <div className="border-hairline-soft bg-surface-card rounded border p-2.5">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                3. Ombudsman
              </span>
              <p className="text-muted-text mt-0.5">
                Statutory appellate authority
              </p>
            </div>
          </div>
        </div>

        {/* Emergency & Support Action Row */}
        <div className="border-hairline-soft flex flex-col justify-between gap-3 border-t pt-3.5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="text-warning size-4 shrink-0" />
            <span className="text-caption text-ink text-xs font-medium">
              Emergency helpline:{" "}
              <a
                href="tel:1912"
                className="text-brand-accent font-mono font-semibold hover:underline"
              >
                1912
              </a>{" "}
              (24x7 toll-free)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a href="tel:1912" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<PhoneCall className="size-3.5" />}
                className="w-full sm:w-auto"
              >
                <span>Call 1912</span>
              </Button>
            </a>

            <Link href="/help" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ChevronRight className="size-3.5" />}
                className="text-muted-text hover:text-ink w-full sm:w-auto"
              >
                <span>Get help</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
