/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Link2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Step3ReviewSubmit({
  currentIssue,
  formData,
  files = [],
  mediaLinks = [],
  isSubmitting,
  onSubmit,
  onBack,
}) {
  const totalProofs = files.length + mediaLinks.length;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h2 className="text-card-title text-ink font-medium tracking-tight">
          Review & confirm complaint
        </h2>
        <p className="text-body-sm text-ink-muted mt-1">
          Verify your complaint summary before generating the official grievance
          docket.
        </p>
      </div>

      {/* Summary Box */}
      <div className="border-hairline bg-surface-2/40 space-y-4 rounded-xl border p-4 shadow-2xs sm:p-5">
        <div className="border-hairline/80 flex flex-col justify-between gap-3 border-b pb-3.5 sm:flex-row sm:items-center">
          <div>
            <span className="text-ink-subtle text-[11px] font-medium tracking-wider uppercase">
              Issue Category
            </span>
            <div className="text-ink text-base font-semibold tracking-tight">
              {currentIssue.title}
            </div>
            <div className="text-ink-muted mt-0.5 text-xs">
              Assigned Authority: {currentIssue.authority}
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-ink-subtle text-[11px] font-medium tracking-wider uppercase">
              Statutory Resolution SLA
            </span>
            <div className="mt-1">
              <Badge variant="success" size="lg" shape="tag">
                {currentIssue.sla}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div>
            <span className="text-ink-subtle block font-medium">
              Fault Address:
            </span>
            <span className="text-ink mt-0.5 block leading-relaxed font-normal">
              {formData.address || "Not specified"}
            </span>
          </div>

          {formData.landmark && (
            <div>
              <span className="text-ink-subtle block font-medium">
                Landmark / Pole:
              </span>
              <span className="text-ink mt-0.5 block leading-relaxed font-normal">
                {formData.landmark}
              </span>
            </div>
          )}

          {formData.gpsCoords && (
            <div>
              <span className="text-ink-subtle block font-medium">
                GPS Location:
              </span>
              <span className="text-ink text-semantic-success mt-0.5 block font-mono leading-relaxed font-normal">
                {formData.gpsCoords}
              </span>
            </div>
          )}

          {formData.notes && (
            <div className="sm:col-span-2">
              <span className="text-ink-subtle block font-medium">
                Additional Notes:
              </span>
              <span className="text-ink bg-surface-1/80 border-hairline/60 mt-0.5 block rounded-md border p-2.5 leading-relaxed font-normal">
                {formData.notes}
              </span>
            </div>
          )}
        </div>

        {/* Attached Evidence Summary in Review */}
        {totalProofs > 0 && (
          <div className="border-hairline/80 space-y-2 border-t pt-3">
            <span className="text-ink-subtle block text-xs font-medium">
              Attached Evidence ({totalProofs}):
            </span>
            <div className="flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div
                  key={`file-${idx}`}
                  className="border-hairline bg-surface-1 text-ink flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs shadow-2xs"
                >
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="size-5 shrink-0 rounded object-cover ring-1 ring-black/10 dark:ring-white/10"
                    />
                  ) : (
                    <FileText className="text-semantic-error size-3.5 shrink-0" />
                  )}
                  <span className="max-w-[160px] truncate font-medium">
                    {file.name}
                  </span>
                  <span className="text-ink-subtle text-[11px]">
                    ({file.size})
                  </span>
                </div>
              ))}

              {mediaLinks.map((item, idx) => {
                const urlStr = typeof item === "string" ? item : item.url;
                return (
                  <div
                    key={`link-${idx}`}
                    className="border-hairline bg-surface-1 text-ink flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs shadow-2xs"
                  >
                    <Link2 className="text-brand-blue size-3.5 shrink-0" />
                    <span className="text-ink-muted max-w-[180px] truncate">
                      {urlStr}
                    </span>
                    <a
                      href={urlStr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-muted hover:text-brand-blue"
                      aria-label="Open link"
                    >
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          variant="secondary"
          size="default"
          shape="md"
          leftIcon={<ArrowLeft />}
          className="transition-transform active:scale-[0.96]"
        >
          <span>Back</span>
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="accent"
          size="default"
          shape="md"
          rightIcon={!isSubmitting ? <ArrowRight /> : undefined}
          className="transition-transform active:scale-[0.96]"
        >
          <span>
            {isSubmitting ? "Logging Docket..." : "Submit Complaint Docket"}
          </span>
        </Button>
      </div>
    </form>
  );
}

