"use client";

import { ArrowRight, Check, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ISSUES } from "@/constants";

export function Step1SelectIssue({
  selectedIssueId,
  onSelectIssue,
  notes,
  onNotesChange,
  onNext,
}) {
  const emergencyIssues = ISSUES.filter((item) => item.isEmergency);
  const generalIssues = ISSUES.filter((item) => !item.isEmergency);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-title-lg text-ink font-medium tracking-tight">
          What problem are you facing?
        </h2>
        <p className="text-body-sm text-muted-text mt-1">
          Select your issue category to proceed with lodging your complaint.
        </p>
      </div>

      {/* Hazardous & Emergency Section */}
      {emergencyIssues.length > 0 && (
        <div className="space-y-2.5">
          <div className="text-warning flex items-center gap-1.5 text-xs font-medium">
            <AlertTriangle className="size-3.5 shrink-0" />
            <span>Hazard & Emergency (Highest Priority)</span>
          </div>

          <div className="grid grid-cols-1 gap-3" role="radiogroup">
            {emergencyIssues.map((item) => {
              const isSelected = selectedIssueId === item.id;
              return (
                <div
                  key={item.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => onSelectIssue(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      onSelectIssue(item.id);
                    }
                  }}
                  className={cn(
                    "group focus-visible:ring-ring relative flex cursor-pointer flex-col justify-between rounded-lg border p-4 text-left transition-all duration-150 select-none focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]",
                    isSelected
                      ? "border-primary bg-primary text-on-primary shadow-subtle"
                      : "border-warning/30 bg-warning/5 text-ink hover:border-warning/50 hover:bg-warning/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="text-warning mt-0.5 size-4 shrink-0" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className={cn(
                              "text-sm font-medium tracking-tight",
                              isSelected ? "text-on-primary" : "text-ink"
                            )}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p
                          className={cn(
                            "mt-1 text-xs leading-relaxed",
                            isSelected ? "text-on-dark-soft" : "text-muted-text"
                          )}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border transition-all duration-150",
                        isSelected
                          ? "border-brand-accent bg-brand-accent text-white"
                          : "border-warning/40 bg-surface-card group-hover:border-warning"
                      )}
                    >
                      {isSelected && (
                        <Check className="size-2.5" strokeWidth={3} />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* General Service Issues Section */}
      <div className="space-y-2.5">
        <div className="text-caption text-muted-text font-medium">
          General Service Issues
        </div>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          role="radiogroup"
        >
          {generalIssues.map((item) => {
            const isSelected = selectedIssueId === item.id;
            return (
              <div
                key={item.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => onSelectIssue(item.id)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    onSelectIssue(item.id);
                  }
                }}
                className={cn(
                  "group focus-visible:ring-ring relative flex cursor-pointer flex-col justify-between rounded-lg border p-4 text-left transition-all duration-150 select-none focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]",
                  isSelected
                    ? "border-primary bg-primary text-on-primary shadow-subtle"
                    : "border-hairline bg-surface-card text-ink hover:border-ink/30 hover:bg-surface-soft"
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={cn(
                        "text-sm font-medium tracking-tight",
                        isSelected ? "text-on-primary" : "text-ink"
                      )}
                    >
                      {item.title}
                    </h3>

                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border transition-all duration-150",
                        isSelected
                          ? "border-brand-accent bg-brand-accent text-white"
                          : "border-hairline bg-surface-card group-hover:border-ink/40"
                      )}
                    >
                      {isSelected && (
                        <Check className="size-2.5" strokeWidth={3} />
                      )}
                    </span>
                  </div>

                  <p
                    className={cn(
                      "mt-1 text-xs leading-relaxed",
                      isSelected ? "text-on-dark-soft" : "text-muted-text"
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional note */}
      <div>
        <label
          htmlFor="complaint-notes"
          className="text-ink mb-1.5 block text-xs font-medium tracking-tight select-none sm:text-sm"
        >
          Additional description (optional)
        </label>
        <textarea
          id="complaint-notes"
          rows={3}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Provide any specific details (e.g., 'Power tripping since 3:00 PM', 'Near pole #42')..."
          className="border-hairline bg-surface-card text-ink placeholder:text-muted-text hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-ring w-full rounded-md border p-3 text-sm transition-all duration-150 focus:outline-none focus-visible:ring-1"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={onNext}
          size="default"
          shape="md"
          rightIcon={<ArrowRight />}
          className="transition-transform active:scale-[0.96]"
        >
          <span>Next: Location Details</span>
        </Button>
      </div>
    </div>
  );
}
