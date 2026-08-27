"use client";

import Link from "next/link";
import {
  PhoneCall,
  UserCheck,
  Building2,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplaintEscalationMatrix({ complaint }) {
  const hasAssignedEngineer = Boolean(complaint?.assigned_engineer);
  const hasAssignedSupervisor = Boolean(complaint?.assigned_supervisor);
  const noneAssigned = !hasAssignedEngineer && !hasAssignedSupervisor;

  return (
    <div className="mb-8">
      {/* Section heading */}
      <div className="border-hairline-soft border-b pb-3">
        <h2 className="text-title-sm text-ink font-semibold tracking-tight">
          Assigned team
        </h2>
      </div>

      <div className="mt-4 space-y-5">
        {/* Assignment state */}
        {noneAssigned ? (
          /* No one assigned yet */
          <div className="flex items-start gap-3">
            <div className="text-muted-text mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
              <Clock className="size-3.5 text-amber-500" />
            </div>
            <div>
              <p className="text-body-sm text-ink font-medium">
                Team assignment pending
              </p>
              <p className="text-caption text-muted-text mt-0.5 text-xs leading-relaxed">
                Your complaint has been registered. A field engineer and
                supervisor will be assigned shortly — typically within 24 hours.
              </p>
            </div>
          </div>
        ) : (
          /* At least one person is assigned — show flat label/value rows */
          <div className="space-y-4">
            {/* Engineer row */}
            <div className="flex items-center gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <UserCheck className="size-3.5 text-blue-500" />
              </div>
              <div className="min-w-0">
                <span className="text-caption text-muted-text block text-xs font-medium tracking-wider uppercase">
                  Field engineer
                </span>
                {hasAssignedEngineer ? (
                  <span className="text-body-sm text-ink mt-0.5 block font-medium">
                    Officer #{complaint.assigned_engineer.slice(0, 8)}
                  </span>
                ) : (
                  <span className="text-body-sm text-muted-text mt-0.5 block italic">
                    Assignment pending
                  </span>
                )}
              </div>
            </div>

            {/* Supervisor row */}
            <div className="flex items-center gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <Building2 className="size-3.5 text-emerald-500" />
              </div>
              <div className="min-w-0">
                <span className="text-caption text-muted-text block text-xs font-medium tracking-wider uppercase">
                  Supervisor
                </span>
                {hasAssignedSupervisor ? (
                  <span className="text-body-sm text-ink mt-0.5 block font-medium">
                    SDO #{complaint.assigned_supervisor.slice(0, 8)}
                  </span>
                ) : (
                  <span className="text-body-sm text-muted-text mt-0.5 block italic">
                    Assignment pending
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Escalation ladder — flat inline list */}
        <div className="border-hairline-soft border-t pt-4">
          <span className="text-caption text-muted-text block text-xs font-medium tracking-wider uppercase">
            Escalation if unresolved
          </span>
          <ol className="text-body-sm text-muted-text mt-2 list-decimal space-y-1 pl-4 leading-relaxed">
            <li>
              <span className="text-ink font-medium">Sub-division</span>
              {" — "}initial inspection &amp; repair (24–72 hrs)
            </li>
            <li>
              <span className="text-ink font-medium">
                Consumer grievance forum
              </span>
              {" — "}hearing if unresolved after notice period
            </li>
            <li>
              <span className="text-ink font-medium">
                Electricity ombudsman
              </span>
              {" — "}statutory appellate authority
            </li>
          </ol>
        </div>

        {/* Emergency helpline */}
        <div className="border-hairline-soft flex flex-wrap items-center justify-between gap-3 border-t pt-3.5">
          <div className="flex items-center gap-2">
            <PhoneCall className="text-warning size-3.5 shrink-0" />
            <span className="text-caption text-ink text-xs">
              Emergency helpline:{" "}
              <a
                href="tel:1912"
                className="text-brand-accent font-mono font-semibold hover:underline"
              >
                1912
              </a>{" "}
              (24×7 toll-free)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a href="tel:1912">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<PhoneCall className="size-3.5" />}
              >
                <span>Call 1912</span>
              </Button>
            </a>

            <Link href="/help">
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ChevronRight className="size-3.5" />}
                className="text-muted-text hover:text-ink"
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
