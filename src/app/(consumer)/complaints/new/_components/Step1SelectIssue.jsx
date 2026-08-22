"use client";

import { ArrowRight, Check, AlertTriangle } from "lucide-react";
import { ISSUES } from "./constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        <h2 className="text-card-title text-ink font-medium tracking-tight">
          What problem are you facing?
        </h2>
        <p className="text-body-sm text-ink-muted mt-1">
          Select your issue to proceed with lodging your complaint.
        </p>
      </div>

      {/* Hazardous & Emergency Section */}
      {emergencyIssues.length > 0 && (
        <div className="space-y-2.5">
          <div className="text-semantic-error flex items-center gap-1.5 text-xs font-medium">
            <AlertTriangle className="size-3.5 shrink-0" />
            <span>Hazard & Emergency</span>
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
                    "group focus-visible:ring-ink relative flex cursor-pointer flex-col justify-between rounded-lg border p-4 text-left transition-all duration-150 select-none focus-visible:ring-2 focus-visible:outline-none",
                    isSelected
                      ? "border-ink bg-ink text-on-primary shadow-xs"
                      : "border-semantic-error/30 bg-semantic-error/5 text-ink hover:border-semantic-error/50 hover:bg-semantic-error/10"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={cn(
                          "size-4 shrink-0",
                          isSelected ? "text-fin-orange" : "text-semantic-error"
                        )}
                      />
                      <h3
                        className={cn(
                          "text-sm font-medium tracking-tight",
                          isSelected ? "text-on-primary" : "text-ink"
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border transition-all",
                        isSelected
                          ? "border-fin-orange bg-fin-orange text-white"
                          : "border-semantic-error/40 bg-surface-1 group-hover:border-semantic-error"
                      )}
                    >
                      {isSelected && (
                        <Check className="size-2.5" strokeWidth={3} />
                      )}
                    </span>
                  </div>

                  <p
                    className={cn(
                      "mt-1.5 text-xs leading-relaxed",
                      isSelected ? "text-inverse-ink/80" : "text-ink-muted"
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* General Service Issues Section */}
      <div className="space-y-2.5">
        <div className="text-ink-muted text-xs font-medium">
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
                  "group focus-visible:ring-ink relative flex cursor-pointer flex-col justify-between rounded-lg border p-4 text-left transition-all duration-150 select-none focus-visible:ring-2 focus-visible:outline-none",
                  isSelected
                    ? "border-ink bg-ink text-on-primary shadow-xs"
                    : "border-hairline bg-surface-1 text-ink hover:border-ink/30 hover:bg-surface-2/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
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
                        "flex size-4 shrink-0 items-center justify-center rounded-full border transition-all",
                        isSelected
                          ? "border-fin-orange bg-fin-orange text-white"
                          : "border-hairline bg-surface-1 group-hover:border-ink/40"
                      )}
                    >
                      {isSelected && (
                        <Check className="size-2.5" strokeWidth={3} />
                      )}
                    </span>
                  </div>

                  <p
                    className={cn(
                      "mt-1.5 text-xs leading-relaxed",
                      isSelected ? "text-inverse-ink/80" : "text-ink-muted"
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
          className="border-hairline bg-surface-1 text-ink placeholder:text-ink-subtle hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-ink w-full rounded-md border p-3 text-sm transition-all duration-150 focus:outline-none focus-visible:ring-1"
        />
      </div>

      <div className="border-hairline-soft flex justify-end border-t pt-4">
        <Button
          type="button"
          onClick={onNext}
          variant="accent"
          size="default"
          shape="md"
          rightIcon={<ArrowRight />}
        >
          <span>Next: Location Details</span>
        </Button>
      </div>
    </div>
  );
}
