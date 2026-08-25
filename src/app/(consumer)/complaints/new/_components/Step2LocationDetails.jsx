/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import {
  MapPin,
  Navigation,
  Upload,
  X,
  ArrowLeft,
  ArrowRight,
  FileText,
  Check,
  Link2,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Step2LocationDetails({
  formData,
  onFormChange,
  onGps,
  files = [],
  onFileUpload,
  onRemoveFile,
  mediaLinks = [],
  onAddMediaLink,
  onRemoveMediaLink,
  onBack,
  onNext,
}) {
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState("");
  const fileInputRef = useRef(null);

  const handleAddLink = (e) => {
    if (e) e.preventDefault();
    const trimmed = linkInput.trim();
    if (!trimmed) return;

    try {
      const urlObj = new URL(
        trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
      );
      if (onAddMediaLink) {
        onAddMediaLink(urlObj.href);
      }
      setLinkInput("");
      setLinkError("");
    } catch {
      setLinkError(
        "Please enter a valid URL (e.g. instagram.com/reel/..., youtube.com/...)"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-title-lg text-ink font-semibold tracking-tight">
          Where is the problem?
        </h2>
        <p className="text-body-sm text-muted-text mt-1">
          Provide the fault location and optional photo/video evidence for
          quickest dispatch.
        </p>
      </div>

      {/* GPS Location Auto-Detection */}
      <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-4 transition-all duration-150 sm:p-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5">
            <div className="border-badge-orange/30 bg-badge-orange/15 shadow-subtle flex size-10 shrink-0 items-center justify-center rounded-md border text-[#c2410c] dark:text-orange-300">
              <Navigation className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-ink text-sm font-semibold tracking-tight">
                  Instant GPS auto-detection
                </h3>
                {formData.gpsCoords && (
                  <Badge variant="success" size="sm" shape="tag">
                    Location Tagged
                  </Badge>
                )}
              </div>
              <p className="text-muted-text mt-0.5 text-xs leading-relaxed">
                {formData.gpsCoords
                  ? `Tagged coordinates: ${formData.gpsCoords}`
                  : "Pinpoint your exact fault coordinates for quickest crew dispatch"}
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={onGps}
            variant={formData.gpsCoords ? "secondary" : "accent"}
            size="default"
            shape="md"
            leftIcon={formData.gpsCoords ? <Check /> : <MapPin />}
            loading={formData.isGpsLoading}
            className="w-full shrink-0 transition-transform active:scale-[0.96] sm:w-auto"
          >
            <span>
              {formData.gpsCoords ? "Re-detect GPS" : "Use GPS location"}
            </span>
          </Button>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative flex items-center py-1">
        <div className="bg-hairline-soft h-px flex-1" />
        <span className="text-muted-text px-3 text-[11px] font-medium tracking-wider uppercase">
          {formData.gpsCoords
            ? "Verify or adjust address"
            : "Or type address manually"}
        </span>
        <div className="bg-hairline-soft h-px flex-1" />
      </div>

      <div className="space-y-4">
        {/* Fault Address Input */}
        <div>
          <Input
            id="fault-address"
            label="Fault address *"
            required
            value={formData.address}
            onChange={(e) => onFormChange("address", e.target.value)}
            placeholder="e.g. House No., Street, Area, Mohalla, City"
          />
        </div>

        {/* Landmark / Pole No */}
        <div>
          <Input
            id="fault-landmark"
            label="Nearest landmark / electricity pole no. (optional)"
            value={formData.landmark}
            onChange={(e) => onFormChange("landmark", e.target.value)}
            placeholder="e.g. Near Sector 4 Water Tank, Transformer #TR-12"
          />
        </div>

        {/* Proof & Evidence Section */}
        <div className="border-hairline bg-surface-card shadow-subtle space-y-3 rounded-lg border p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-ink text-xs font-semibold sm:text-sm">
                Proof & evidence (optional)
              </span>
              <p className="text-muted-text mt-0.5 text-xs">
                Attach fault photos, meter readings, or video links.
              </p>
            </div>
            {(files.length > 0 || mediaLinks.length > 0) && (
              <Badge
                variant="outline"
                size="sm"
                shape="pill"
                className="text-[11px]"
              >
                {files.length + mediaLinks.length} attached
              </Badge>
            )}
          </div>

          {/* Simple Dropzone / Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-hairline bg-surface-soft hover:border-hairline/80 hover:bg-surface-strong flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-3 py-4 text-center transition-all duration-150 active:scale-[0.99]"
          >
            <div className="bg-surface-card text-muted-text mb-1.5 flex size-9 items-center justify-center rounded-full">
              <Upload className="text-ink size-4" />
            </div>
            <span className="text-ink text-xs font-medium">
              Click or drag to upload photos or documents
            </span>
            <span className="text-muted-text mt-0.5 text-[11px]">
              PNG, JPG, PDF up to 10MB (max 5 files)
            </span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp,.pdf"
              onChange={onFileUpload}
              className="hidden"
            />
          </div>

          {/* Video / Social Link Input */}
          <div className="space-y-1">
            <div className="flex gap-2">
              <Input
                value={linkInput}
                onChange={(e) => {
                  setLinkInput(e.target.value);
                  if (linkError) setLinkError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddLink();
                  }
                }}
                placeholder="Or paste video / social link (Reel, YouTube, X)..."
                className="h-9 text-xs"
              />
              <Button
                type="button"
                onClick={handleAddLink}
                variant="secondary"
                size="sm"
                shape="md"
                leftIcon={<Plus className="size-3.5" />}
                className="shrink-0 transition-transform active:scale-[0.96]"
              >
                <span>Add Link</span>
              </Button>
            </div>
            {linkError && (
              <p className="text-error text-[11px] font-medium">{linkError}</p>
            )}
          </div>

          {/* Clean List of Attached Files & Links */}
          {(files.length > 0 || mediaLinks.length > 0) && (
            <div className="border-hairline-soft space-y-1.5 border-t pt-2">
              {files.map((file, idx) => (
                <div
                  key={`file-${idx}`}
                  className="border-hairline bg-canvas text-ink shadow-subtle flex items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-xs"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {file.previewUrl ? (
                      <img
                        src={file.previewUrl}
                        alt={file.name}
                        className="size-7 shrink-0 rounded object-cover ring-1 ring-black/10 dark:ring-white/10"
                      />
                    ) : (
                      <FileText className="text-error size-4 shrink-0" />
                    )}
                    <span className="truncate font-medium">{file.name}</span>
                    <span className="text-muted-text shrink-0 text-[11px]">
                      ({file.size})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveFile(idx)}
                    aria-label={`Remove file ${file.name}`}
                    className="text-muted-text hover:text-error p-1 transition-colors"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}

              {mediaLinks.map((item, idx) => {
                const urlStr = typeof item === "string" ? item : item.url;
                return (
                  <div
                    key={`link-${idx}`}
                    className="border-hairline bg-canvas text-ink shadow-subtle flex items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-xs"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <Link2 className="text-brand-accent size-4 shrink-0" />
                      <span className="text-muted-text truncate">{urlStr}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onRemoveMediaLink && onRemoveMediaLink(idx)
                      }
                      aria-label={`Remove link`}
                      className="text-muted-text hover:text-error p-1 transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Navigation actions */}
      <div className="flex items-center justify-between pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="secondary"
          size="default"
          shape="md"
          leftIcon={<ArrowLeft />}
          className="transition-transform active:scale-[0.96]"
        >
          <span>Back</span>
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!formData.address.trim()}
          variant="accent"
          size="default"
          shape="md"
          rightIcon={<ArrowRight />}
          className="transition-transform active:scale-[0.96]"
        >
          <span>Next: Review & Submit</span>
        </Button>
      </div>
    </div>
  );
}
