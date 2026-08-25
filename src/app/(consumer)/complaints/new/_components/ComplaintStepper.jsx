"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEPS } from "@/constants";

export function ComplaintStepper({ step, onStepChange }) {
  return (
    <nav aria-label="Progress" className="py-5">
      <ol className="flex items-center justify-between">
        {STEPS.map((s, idx) => {
          const isCompleted = step > s.num;
          const isCurrent = step === s.num;

          return (
            <React.Fragment key={s.num}>
              <li className="flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (isCompleted && onStepChange) onStepChange(s.num);
                  }}
                  disabled={!isCompleted}
                  className={cn(
                    "group flex items-center gap-2.5 text-left transition-all duration-150 select-none",
                    isCompleted
                      ? "cursor-pointer active:scale-[0.96]"
                      : isCurrent
                        ? "cursor-default"
                        : "cursor-not-allowed opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-medium transition-all duration-150",
                      isCompleted
                        ? "border-hairline bg-surface-soft text-ink group-hover:border-ink/40 group-hover:bg-surface-strong border"
                        : isCurrent
                          ? "bg-primary text-on-primary ring-primary/20 shadow-subtle ring-2"
                          : "border-hairline-soft bg-surface-soft text-muted-text border"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="size-3.5" strokeWidth={2.5} />
                    ) : (
                      s.num
                    )}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-xs font-medium tracking-tight sm:text-sm",
                        isCurrent
                          ? "text-ink"
                          : isCompleted
                            ? "text-ink group-hover:text-ink/80"
                            : "text-muted-text"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                </button>
              </li>

              {idx < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "mx-2 h-px flex-1 transition-colors duration-150 sm:mx-4",
                    step > idx + 1 ? "bg-ink/40" : "bg-hairline"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
