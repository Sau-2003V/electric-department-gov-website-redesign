/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  FileText,
  Link2,
  ExternalLink,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const imageFiles = files.filter((f) => f.type === "image");
  const pdfFiles = files.filter((f) => f.type === "pdf");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedLinks = mediaLinks.map((item) => ({
        type: item.type,
        url: item.url,
      }));

      const filesMetadata = files.map((f) => ({
        type: f.type,
        size:
          f.type === "image" ? f.compressedSize || f.size || "" : f.size || "",
      }));

      const payload = {
        issue: currentIssue.title,
        description: notes || null,
        address: locationData?.address || null,
        landmark: locationData?.landmark || null,
        latitude: locationData?.latitude ?? null,
        longitude: locationData?.longitude ?? null,
        url: formattedLinks,
        files: filesMetadata,
      };

      const result = await createComplaint(payload);

      if (!result.success) {
        setIsSubmitting(false);
        toast.error(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      // If signed upload URLs are returned, upload files directly to Supabase storage
      if (result.uploadUrls?.length > 0) {
        for (let i = 0; i < result.uploadUrls.length; i++) {
          const uploadInfo = result.uploadUrls[i];
          const fileObj = files[i]?.file;
          if (fileObj && uploadInfo?.signedUrl) {
            try {
              const contentType =
                fileObj.type ||
                (uploadInfo.type === "pdf" ? "application/pdf" : "image/webp");

              await fetch(uploadInfo.signedUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": contentType,
                },
                body: fileObj,
              });
            } catch (uploadErr) {
              console.warn("File upload warning:", uploadErr);
            }
          }
        }
      }

      setIsSubmitting(false);
      toast.success("Complaint registered successfully!");
      onSuccess(result.complaintId);
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitting(false);
      toast.error("Failed to submit complaint. Please check your connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-title-lg text-ink font-medium tracking-tight">
          Review &amp; confirm complaint
        </h2>
        <p className="text-body-sm text-muted-text mt-1">
          Verify your complaint summary before generating the official grievance
          docket.
        </p>
      </div>

      {/* Summary Box */}
      <div className="border-hairline bg-surface-card shadow-subtle space-y-4 rounded-lg border p-4 sm:p-5">
        {/* Issue Header */}
        <div className="border-hairline-soft flex flex-col justify-between gap-3 border-b pb-3.5 sm:flex-row sm:items-center">
          <div>
            <span className="text-caption text-muted-text font-medium tracking-wider uppercase">
              Issue Category
            </span>
            <div className="text-title-md text-ink mt-0.5 flex items-center gap-2 font-medium tracking-tight">
              {currentIssue.isEmergency && (
                <AlertTriangle className="text-warning size-4 shrink-0" />
              )}
              <span>{currentIssue.title}</span>
            </div>
            <div className="text-caption text-muted-text mt-0.5">
              Assigned Authority: {currentIssue.authority}
            </div>
          </div>
          <Badge
            variant={
              currentIssue.priority === "vimp"
                ? "error"
                : currentIssue.priority === "imp"
                  ? "warning"
                  : "secondary"
            }
            size="sm"
            shape="pill"
            className="text-[10px] tracking-wider uppercase"
          >
            Priority: {currentIssue.priority || "normal"}
          </Badge>
        </div>

        {/* Location & Notes Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* GPS */}
          {locationData?.latitude != null &&
            locationData?.longitude != null && (
              <div>
                <span className="text-caption text-muted-text block font-medium">
                  GPS Coordinates:
                </span>
                <span className="text-body-sm text-success mt-0.5 block font-mono leading-relaxed font-normal">
                  {locationData.latitude.toFixed(4)}° N,{" "}
                  {locationData.longitude.toFixed(4)}° E
                </span>
              </div>
            )}

          {/* Address */}
          {locationData?.address && (
            <div>
              <span className="text-caption text-muted-text block font-medium">
                Fault Address:
              </span>
              <span className="text-body-sm text-ink mt-0.5 block leading-relaxed font-normal">
                {locationData.address}
              </span>
            </div>
          )}

          {/* Landmark */}
          {locationData?.landmark && (
            <div>
              <span className="text-caption text-muted-text block font-medium">
                Landmark / Pole:
              </span>
              <span className="text-body-sm text-ink mt-0.5 block leading-relaxed font-normal">
                {locationData.landmark}
              </span>
            </div>
          )}

          {/* Notes */}
          {notes && (
            <div className="sm:col-span-2">
              <span className="text-caption text-muted-text block font-medium">
                Additional Notes:
              </span>
              <span className="text-body-sm text-ink bg-canvas border-hairline-soft mt-0.5 block rounded-md border p-2.5 leading-relaxed font-normal">
                {notes}
              </span>
            </div>
          )}
        </div>

        {/* Attached Evidence Section */}
        {totalProofs > 0 && (
          <div className="border-hairline-soft space-y-3 border-t pt-3.5">
            <span className="text-caption text-muted-text block font-medium">
              Attached Proofs &amp; Media ({totalProofs}):
            </span>

            {/* Images */}
            {imageFiles.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-caption text-muted-text flex items-center gap-1 font-medium">
                  <ImageIcon className="size-3" />
                  <span>Photos ({imageFiles.length}):</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {imageFiles.map((fileObj, idx) => (
                    <div
                      key={`review-file-${idx}`}
                      className="border-hairline bg-canvas text-ink shadow-subtle text-body-sm flex items-center gap-2.5 rounded-md border p-2"
                    >
                      {fileObj.previewUrl ? (
                        <img
                          src={fileObj.previewUrl}
                          alt={fileObj.name}
                          className="size-10 shrink-0 rounded object-cover ring-1 ring-black/10 dark:ring-white/10"
                        />
                      ) : (
                        <ImageIcon className="text-muted-text size-6 shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-body-sm truncate font-medium">
                          {fileObj.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PDF Documents */}
            {pdfFiles.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-caption text-muted-text flex items-center gap-1 font-medium">
                  <FileText className="size-3 text-red-500" />
                  <span>PDF Documents ({pdfFiles.length}):</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {pdfFiles.map((fileObj, idx) => (
                    <div
                      key={`review-pdf-${idx}`}
                      className="border-hairline bg-canvas text-ink shadow-subtle text-body-sm flex items-center gap-2.5 rounded-md border p-2"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded bg-red-500/10 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                        <FileText className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-body-sm truncate font-medium">
                          {fileObj.name}
                        </div>
                        <div className="text-caption text-muted-text flex items-center gap-1">
                          <span className="font-semibold text-red-500">
                            PDF
                          </span>
                          <span>•</span>
                          <span className="font-medium">{fileObj.size}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {mediaLinks.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-caption text-muted-text flex items-center gap-1 font-medium">
                  <Link2 className="size-3" />
                  <span>
                    Social Media &amp; Video Proofs ({mediaLinks.length}):
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mediaLinks.map((item, idx) => (
                    <div
                      key={`review-link-${idx}`}
                      className="border-hairline bg-canvas text-ink shadow-subtle text-body-sm flex items-center gap-2 rounded-md border px-2.5 py-1.5"
                    >
                      <Badge
                        variant={
                          item.type === "youtube"
                            ? "error"
                            : item.type === "instagram"
                              ? "accent"
                              : "secondary"
                        }
                        size="sm"
                        shape="tag"
                        className="text-[9px] font-semibold uppercase"
                      >
                        {item.type === "x" ? "X" : item.type}
                      </Badge>
                      <span className="text-caption text-muted-text max-w-[200px] truncate font-mono">
                        {item.url}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-text hover:text-primary transition-colors"
                        aria-label="Open link"
                      >
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
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
            {isSubmitting ? "Submitting Docket..." : "Submit Complaint Docket"}
          </span>
        </Button>
      </div>
    </form>
  );
}
