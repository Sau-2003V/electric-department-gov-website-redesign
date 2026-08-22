"use client";

import React from "react";
import { Check } from "lucide-react";
import { STEPS } from "./constants";
import { cn } from "@/lib/utils";

export function ComplaintStepper({ step, onStepChange }) {
  return (
    <nav
      aria-label="Progress"
      className="border-hairline bg-surface-1 mb-6 rounded-xl border p-3 shadow-2xs sm:p-4"
    >
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
                    "group flex items-center gap-2.5 text-left transition-colors",
                    isCompleted
                      ? "cursor-pointer"
                      : isCurrent
                        ? "cursor-default"
                        : "cursor-not-allowed opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-medium transition-all duration-150",
                      isCompleted
                        ? "border-hairline bg-surface-2 text-ink group-hover:border-ink/40 group-hover:bg-surface-2/80 border"
                        : isCurrent
                          ? "bg-ink text-on-primary ring-ink/20 shadow-xs ring-2"
                          : "border-hairline-soft bg-surface-2/60 text-ink-tertiary border"
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
                            : "text-ink-tertiary"
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
                    "mx-2 h-px flex-1 transition-colors sm:mx-4",
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
