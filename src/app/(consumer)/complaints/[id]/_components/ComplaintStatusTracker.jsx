"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    id: "registered",
    label: "Registered",
    desc: "Complaint received and logged in the system.",
  },
  {
    id: "assigned",
    label: "Assigned",
    desc: "Assigned to the local field engineering team.",
  },
  {
    id: "in_progress",
    label: "In progress",
    desc: "Field crew dispatched and repair work is underway.",
  },
  {
    id: "resolved",
    label: "Resolved",
    desc: "Repair completed and electricity supply restored.",
  },
  {
    id: "closed",
    label: "Closed",
    desc: "Resolution confirmed and ticket closed.",
  },
];

const STATUS_ORDER = {
  registered: 0,
  assigned: 1,
  in_progress: 2,
  resolved: 3,
  closed: 4,
};

export function ComplaintStatusTracker({ complaint }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentStatus = complaint?.status?.toLowerCase() || "registered";
  const currentStepIndex = STATUS_ORDER[currentStatus] ?? 0;
  const currentStep = STEPS[currentStepIndex] || STEPS[0];

  const updatedTime = complaint?.updated_at
    ? new Date(complaint.updated_at).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : complaint?.created_at
      ? new Date(complaint.created_at).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="border-hairline-soft flex flex-wrap items-center justify-between gap-2 border-b pb-3">
        <h2 className="text-title-sm text-ink font-semibold tracking-tight">
          Status progress
        </h2>

        {updatedTime && (
          <Badge
            variant="canvas"
            size="sm"
            shape="pill"
            className="font-mono text-[11px]"
          >
            Updated {updatedTime}
          </Badge>
        )}
      </div>

      {/* Vertical Stepper Container */}
      <div className="mt-4">
        {isExpanded ? (
          /* Expanded: Full Vertical Timeline */
          <div className="space-y-0 pl-1">
            {STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isLast = idx === STEPS.length - 1;

              return (
                <div
                  key={step.id}
                  aria-current={isCurrent ? "step" : undefined}
                  className="relative flex gap-3.5 pb-6 last:pb-1"
                >
                  {/* Vertical connecting line */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className={`absolute top-7 left-3.5 -ml-[1px] h-full w-0.5 ${
                        idx < currentStepIndex ? "bg-success" : "bg-hairline"
                      }`}
                    />
                  )}

                  {/* Step icon / indicator dot */}
                  <div
                    className={`relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                      isCompleted
                        ? "bg-success border-success text-white"
                        : isCurrent
                          ? "bg-brand-accent border-brand-accent ring-brand-accent/20 text-white shadow-xs ring-4"
                          : "bg-surface-soft border-hairline text-muted-text"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="size-3.5 stroke-[2.5]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Step text content */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-body-sm font-semibold tracking-tight ${
                          isCurrent
                            ? "text-ink"
                            : isCompleted
                              ? "text-ink font-medium"
                              : "text-muted-text"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isCurrent && (
                        <Badge
                          variant="info"
                          size="sm"
                          shape="pill"
                          className="px-1.5 py-0 text-[10px] font-medium"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-caption text-muted-text mt-0.5 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Collapsed: Active Current Step Summary — flat, no box */
          <div className="flex items-start gap-3 pt-1">
            <span className="bg-brand-accent mt-2 size-2 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <span className="text-body-sm text-ink font-semibold">
                {currentStep.label}
              </span>
              <p className="text-caption text-muted-text mt-0.5 text-xs leading-relaxed">
                {currentStep.desc}
              </p>
            </div>
          </div>
        )}

        {/* Expand / Collapse Toggle Button */}
        <div className="mt-3 flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            rightIcon={
              isExpanded ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )
            }
            className="text-muted-text hover:text-ink -ml-2 text-xs font-medium"
          >
            <span>
              {isExpanded ? "Hide full progress" : "Show all progress steps"}
            </span>
          </Button>

          {/* <span className="text-caption text-muted-text text-xs">
            Estimated 24–72 hrs
          </span> */}
        </div>
      </div>
    </div>
  );
}
