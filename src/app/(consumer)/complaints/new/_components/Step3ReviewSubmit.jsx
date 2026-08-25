/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Link2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createComplaint } from "@/app/(action)/complaint";

export function Step3ReviewSubmit({
  currentIssue,
  locationData,
  notes,
  files = [],
  mediaLinks = [],
  onBack,
  onSuccess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalProofs = files.length + mediaLinks.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      issue: currentIssue.title,
      description: notes || null,
      address: locationData?.address || null,
      landmark: locationData?.landmark || null,
      latitude: locationData?.latitude ?? null,
      longitude: locationData?.longitude ?? null,
    };

    const result = await createComplaint(payload);

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    onSuccess(result.complaint);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-title-lg text-ink font-semibold tracking-tight">
          Review &amp; confirm complaint
        </h2>
        <p className="text-body-sm text-muted-text mt-1">
          Verify your complaint summary before generating the official grievance
          docket.
        </p>
      </div>

      {/* Summary Box */}
      <div className="border-hairline bg-surface-card shadow-subtle space-y-4 rounded-lg border p-4 sm:p-5">
        <div className="border-hairline-soft flex flex-col justify-between gap-3 border-b pb-3.5 sm:flex-row sm:items-center">
          <div>
            <span className="text-muted-text text-[11px] font-medium tracking-wider uppercase">
              Issue Category
            </span>
            <div className="text-ink text-base font-semibold tracking-tight">
              {currentIssue.title}
            </div>
            <div className="text-muted-text mt-0.5 text-xs">
              Assigned Authority: {currentIssue.authority}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          {/* GPS */}
          {locationData?.latitude != null &&
            locationData?.longitude != null && (
              <div>
                <span className="text-muted-text block font-medium">
                  GPS Location:
                </span>
                <span className="text-success mt-0.5 block font-mono leading-relaxed font-normal">
                  {locationData.latitude.toFixed(4)}° N,{" "}
                  {locationData.longitude.toFixed(4)}° E
                </span>
              </div>
            )}

          {/* Address */}
          {locationData?.address && (
            <div>
              <span className="text-muted-text block font-medium">
                Fault Address:
              </span>
              <span className="text-ink mt-0.5 block leading-relaxed font-normal">
                {locationData.address}
              </span>
            </div>
          )}

          {/* Landmark */}
          {locationData?.landmark && (
            <div>
              <span className="text-muted-text block font-medium">
                Landmark / Pole:
              </span>
              <span className="text-ink mt-0.5 block leading-relaxed font-normal">
                {locationData.landmark}
              </span>
            </div>
          )}

          {/* Notes */}
          {notes && (
            <div className="sm:col-span-2">
              <span className="text-muted-text block font-medium">
                Additional Notes:
              </span>
              <span className="text-ink bg-canvas border-hairline-soft mt-0.5 block rounded-md border p-2.5 leading-relaxed font-normal">
                {notes}
              </span>
            </div>
          )}
        </div>

        {/* Attached Evidence */}
        {totalProofs > 0 && (
          <div className="border-hairline-soft space-y-2 border-t pt-3">
            <span className="text-muted-text block text-xs font-medium">
              Attached Evidence ({totalProofs}):
            </span>
            <div className="flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div
                  key={`file-${idx}`}
                  className="border-hairline bg-canvas text-ink shadow-subtle flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs"
                >
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="size-5 shrink-0 rounded object-cover ring-1 ring-black/10 dark:ring-white/10"
                    />
                  ) : (
                    <FileText className="text-error size-3.5 shrink-0" />
                  )}
                  <span className="max-w-[160px] truncate font-medium">
                    {file.name}
                  </span>
                  <span className="text-muted-text text-[11px]">
                    ({file.size})
                  </span>
                </div>
              ))}

              {mediaLinks.map((item, idx) => {
                const urlStr = typeof item === "string" ? item : item.url;
                return (
                  <div
                    key={`link-${idx}`}
                    className="border-hairline bg-canvas text-ink shadow-subtle flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs"
                  >
                    <Link2 className="text-brand-accent size-3.5 shrink-0" />
                    <span className="text-muted-text max-w-[180px] truncate">
                      {urlStr}
                    </span>
                    <a
                      href={urlStr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-text hover:text-brand-accent"
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
