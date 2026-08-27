"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Navigation,
  ArrowLeft,
  ArrowRight,
  Check,
  Locate,
  UploadCloud,
  FileText,
  Trash2,
  Link2,
  ExternalLink,
  Sparkles,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { locationSchema, detectSocialPlatform } from "@/types/schema/complaint";
import { compressAndConvertToWebP, formatBytes } from "@/lib/image-compressor";
import { cn } from "@/lib/utils";

const MAX_FILES = 3;
const MAX_FILE_SIZE_BYTES = 6 * 1024 * 1024; // 6 MB limit

export function Step2LocationDetails({
  initialLocationData,
  files = [],
  onFilesChange,
  mediaLinks = [],
  onMediaLinksChange,
  onBack,
  onNext,
}) {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState("");
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      latitude: initialLocationData?.latitude ?? null,
      longitude: initialLocationData?.longitude ?? null,
      address: initialLocationData?.address ?? "",
      landmark: initialLocationData?.landmark ?? "",
    },
    mode: "onTouched",
  });

  const { control, handleSubmit, setValue, watch } = form;

  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const gpsTagged = latitude != null && longitude != null;

  // ── GPS detection ──────────────────────────────────────────
  const handleGps = () => {
    setGpsLoading(true);
    const fallback = () => {
      setValue("latitude", 26.8467, { shouldValidate: true });
      setValue("longitude", 80.9462, { shouldValidate: true });
      setGpsLoading(false);
    };

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setValue("latitude", Number(pos.coords.latitude.toFixed(6)), {
            shouldValidate: true,
          });
          setValue("longitude", Number(pos.coords.longitude.toFixed(6)), {
            shouldValidate: true,
          });
          setGpsLoading(false);
        },
        fallback,
        { timeout: 8000 }
      );
    } else {
      fallback();
    }
  };

  // ── File Handling (Images -> WebP, PDFs -> Raw, Max 6MB each) ──
  const handleFileSelect = async (e) => {
    const rawFiles = e.target.files ? Array.from(e.target.files) : [];
    if (!rawFiles.length) return;

    const availableSlots = MAX_FILES - files.length;
    if (availableSlots <= 0) {
      toast.error(`Maximum limit of ${MAX_FILES} files reached.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (rawFiles.length > availableSlots) {
      toast.warning(
        `Only ${availableSlots} more file${availableSlots > 1 ? "s" : ""} can be added. Extra files ignored.`
      );
    }

    const filesToProcess = rawFiles.slice(0, availableSlots);
    setProcessingFiles(true);

    try {
      const processedResults = [];

      for (const file of filesToProcess) {
        // Validate 6 MB limit
        if (file.size > MAX_FILE_SIZE_BYTES) {
          toast.error(
            `"${file.name}" exceeds the 6 MB limit (${formatBytes(file.size)}).`
          );
          continue;
        }

        const isImage =
          file.type.startsWith("image/") ||
          /\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(file.name);
        const isPdf =
          file.type === "application/pdf" || /\.pdf$/i.test(file.name);

        if (isImage) {
          // Compress and convert image to WebP
          const compressed = await compressAndConvertToWebP(file);
          processedResults.push({
            type: "image",
            file: compressed.file,
            previewUrl: compressed.previewUrl,
            name: compressed.name,
            originalSize: compressed.originalSize,
            compressedSize: compressed.compressedSize,
            size: compressed.compressedSize,
          });
        } else if (isPdf) {
          // Keep PDF as-is without compression
          const formattedSize = formatBytes(file.size);
          processedResults.push({
            type: "pdf",
            file: file,
            previewUrl: null,
            name: file.name,
            originalSize: formattedSize,
            compressedSize: formattedSize,
            size: formattedSize,
          });
        } else {
          toast.error(
            `"${file.name}" is not supported. Please upload an Image or PDF document.`
          );
        }
      }

      if (processedResults.length > 0) {
        onFilesChange([...files, ...processedResults]);
        const imgCount = processedResults.filter(
          (r) => r.type === "image"
        ).length;
        const pdfCount = processedResults.filter(
          (r) => r.type === "pdf"
        ).length;

        const summaryParts = [];
        if (imgCount > 0)
          summaryParts.push(`${imgCount} WebP photo${imgCount > 1 ? "s" : ""}`);
        if (pdfCount > 0)
          summaryParts.push(
            `${pdfCount} PDF document${pdfCount > 1 ? "s" : ""}`
          );

        toast.success(`Attached ${summaryParts.join(" and ")}.`);
      }
    } catch (err) {
      console.error("File processing error:", err);
      toast.error("Failed to process file. Please try again.");
    } finally {
      setProcessingFiles(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index) => {
    const target = files[index];
    if (target?.previewUrl && typeof URL !== "undefined") {
      try {
        URL.revokeObjectURL(target.previewUrl);
      } catch {}
    }
    onFilesChange(files.filter((_, idx) => idx !== index));
  };

  // ── Social Media Link Handling ─────────────────────────────
  const handleAddLink = (e) => {
    if (e) e.preventDefault();
    setLinkError("");

    const trimmed = linkInput.trim();
    if (!trimmed) return;

    const platform = detectSocialPlatform(trimmed);
    if (!platform) {
      setLinkError(
        "Invalid link. Only Instagram posts/reels, YouTube videos/shorts, and X (Twitter) posts are supported."
      );
      return;
    }

    if (mediaLinks.some((l) => l.url.toLowerCase() === trimmed.toLowerCase())) {
      setLinkError("This link has already been added.");
      return;
    }

    if (mediaLinks.length >= 5) {
      setLinkError("Maximum 5 social media links allowed.");
      return;
    }

    onMediaLinksChange([...mediaLinks, { type: platform, url: trimmed }]);
    setLinkInput("");
    toast.success(
      `Added ${platform === "x" ? "X / Twitter" : platform.toUpperCase()} link.`
    );
  };

  const handleRemoveLink = (index) => {
    onMediaLinksChange(mediaLinks.filter((_, idx) => idx !== index));
  };

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* ────────────────────────────────────────────────────── */}
      {/* 1. LOCATION SECTION                                    */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-title-lg text-ink font-medium tracking-tight">
            Where is the problem?
          </h2>
          <p className="text-body-sm text-muted-text mt-1">
            Provide GPS coordinates or a typed address. Landmark is optional.
          </p>
        </div>

        {/* GPS Card */}
        <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-4 transition-all duration-150 sm:p-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <div className="border-badge-orange/30 bg-badge-orange/15 shadow-subtle flex size-10 shrink-0 items-center justify-center rounded-md border text-[#c2410c] dark:text-orange-300">
                <Navigation className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-title-sm text-ink font-medium tracking-tight">
                    Current Location
                  </h3>
                  {gpsTagged && (
                    <Badge variant="success" size="sm" shape="tag">
                      Location Tagged
                    </Badge>
                  )}
                </div>
                <p className="text-caption text-muted-text mt-0.5 leading-relaxed">
                  {gpsTagged
                    ? `Coordinates: ${latitude?.toFixed(4)}° N, ${longitude?.toFixed(4)}° E`
                    : "Pinpoint your exact fault coordinates for quickest crew dispatch"}
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGps}
              size="default"
              shape="md"
              leftIcon={gpsTagged ? <Check /> : <Locate />}
              loading={gpsLoading}
              className="w-full shrink-0 transition-transform active:scale-[0.96] sm:w-auto"
            >
              <span>{gpsTagged ? "Re-detect GPS" : "Use GPS location"}</span>
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-1">
          <div className="bg-hairline-soft h-px flex-1" />
          <span className="text-caption text-muted-text px-3 font-medium tracking-wider uppercase">
            {gpsTagged
              ? "Verify or add address (optional)"
              : "Or type address manually"}
          </span>
          <div className="bg-hairline-soft h-px flex-1" />
        </div>

        {/* Address & Landmark Inputs */}
        <div className="space-y-4">
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                id="fault-address"
                label={
                  gpsTagged ? "Fault address (optional)" : "Fault address *"
                }
                required={!gpsTagged}
                error={fieldState.error?.message}
                placeholder="e.g. House No., Street, Area, Mohalla, City"
                value={field.value ?? ""}
              />
            )}
          />

          <Controller
            name="landmark"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="fault-landmark"
                label="Nearest landmark / electricity pole no. (optional)"
                placeholder="e.g. Near Sector 4 Water Tank, Transformer #TR-12"
                value={field.value ?? ""}
              />
            )}
          />
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* 2. PROOFS & ATTACHMENTS (PHOTOS / PDFS - MAX 3, 6MB)   */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-body-sm text-ink flex items-center gap-2 font-medium! tracking-tight">
              Attach Photos or Documents proofs
            </h3>
          </div>
          <Badge
            variant={files.length >= MAX_FILES ? "warning" : "secondary"}
            size="sm"
            shape="pill"
          >
            {files.length} / {MAX_FILES} Files
          </Badge>
        </div>

        {/* Hidden File Input (Accepts Images and PDFs) */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,.pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="complaint-file-upload"
          disabled={files.length >= MAX_FILES || processingFiles}
        />

        {/* Upload Dropzone */}
        {files.length < MAX_FILES && (
          <div
            onClick={() => {
              if (!processingFiles && fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer.files && e.dataTransfer.files.length) {
                handleFileSelect({ target: { files: e.dataTransfer.files } });
              }
            }}
            className={cn(
              "border-hairline hover:border-ink/40 bg-surface-card hover:bg-surface-soft group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-5 text-center transition-all duration-150",
              processingFiles && "pointer-events-none opacity-60"
            )}
          >
            <div className="border-hairline bg-surface-soft group-hover:bg-surface-card mb-2 flex size-10 items-center justify-center rounded-full border transition-all">
              {processingFiles ? (
                <Spinner size="default" variant="accent" />
              ) : (
                <UploadCloud className="text-muted-text group-hover:text-ink size-5 transition-colors" />
              )}
            </div>
            <div className="text-body-sm text-ink font-medium">
              {processingFiles ? (
                <span className="text-primary flex items-center gap-1.5">
                  <Sparkles className="size-3.5" /> Processing files...
                </span>
              ) : (
                <>
                  <span className="text-primary underline-offset-2 hover:underline">
                    Click to browse
                  </span>{" "}
                  or drag &amp; drop files here
                </>
              )}
            </div>
            <p className="text-caption text-muted-text mt-1">
              JPG, PNG, WebP or PDF documents • Max 6 MB each •{" "}
              {MAX_FILES - files.length} are allowed
            </p>
          </div>
        )}

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {files.map((fileObj, idx) => (
              <div
                key={`file-${idx}`}
                className="border-hairline bg-surface-card shadow-subtle group relative flex flex-col justify-between overflow-hidden rounded-lg border p-2.5 transition-all"
              >
                {fileObj.type === "image" ? (
                  /* Image Card */
                  <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black/5 dark:bg-white/5">
                    {fileObj.previewUrl && (
                      <img
                        src={fileObj.previewUrl}
                        alt={fileObj.name}
                        className="size-full object-cover"
                      />
                    )}
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-sm"
                      shape="circular"
                      onClick={() => handleRemoveFile(idx)}
                      aria-label={`Remove ${fileObj.name}`}
                      className="hover:text-error absolute top-1.5 right-1.5 size-6 shadow-xs backdrop-blur-xs"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                ) : (
                  /* PDF Document Card */
                  <div className="relative flex aspect-video w-full flex-col items-center justify-center rounded-md bg-red-500/10 p-3 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                    <FileText className="size-8 stroke-[1.5]" />
                    <Badge
                      variant="destructive-subtle"
                      size="sm"
                      shape="tag"
                      className="mt-1 text-[10px] font-bold tracking-wider uppercase"
                    >
                      PDF
                    </Badge>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-sm"
                      shape="circular"
                      onClick={() => handleRemoveFile(idx)}
                      aria-label={`Remove ${fileObj.name}`}
                      className="hover:text-error absolute top-1.5 right-1.5 size-6 shadow-xs backdrop-blur-xs"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                )}

                <div className="mt-2 space-y-0.5">
                  <div className="text-body-sm text-ink truncate font-medium">
                    {fileObj.name}
                  </div>
                  <div className="text-caption text-muted-text flex items-center justify-between">
                    {fileObj.type === "pdf" && (
                      <span className="font-medium">{fileObj.size}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* 3. SOCIAL MEDIA & VIDEO PROOFS                         */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-body-sm text-ink flex items-center gap-2 font-medium! tracking-tight">
            Social Media &amp; Video Proof
          </h3>
          <p className="text-body-sm text-muted-text mt-0.5">
            Attach post links from Instagram, YouTube (videos/shorts), or X
            (Twitter).
          </p>
        </div>

        {/* Input Bar using UI Input and Button */}
        <div className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="url"
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
              placeholder="Paste Instagram, YouTube, or X link (e.g. https://instagram.com/p/...)"
              leadingIcon={Link2}
              error={linkError}
              wrapperClassName="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddLink}
              size="default"
              shape="md"
              variant="secondary"
              leftIcon={<Plus />}
              className="h-10 shrink-0 transition-transform active:scale-[0.96]"
            >
              <span>Add Link</span>
            </Button>
          </div>

          {/* Supported platform badges */}
          <div className="text-caption text-muted-text flex flex-wrap items-center gap-1.5">
            <span>Supported:</span>
            <Badge variant="surface" size="sm" shape="tag">
              YouTube (watch/shorts)
            </Badge>
            <Badge variant="surface" size="sm" shape="tag">
              Instagram (posts/reels)
            </Badge>
            <Badge variant="surface" size="sm" shape="tag">
              X / Twitter (posts)
            </Badge>
          </div>
        </div>

        {/* Attached Links List */}
        {mediaLinks.length > 0 && (
          <div className="space-y-2">
            {mediaLinks.map((item, idx) => {
              const platform = item.type;
              const badgeVariant =
                platform === "youtube"
                  ? "error"
                  : platform === "instagram"
                    ? "accent"
                    : "secondary";

              return (
                <div
                  key={`link-${idx}`}
                  className="border-hairline bg-surface-card shadow-subtle text-body-sm flex items-center justify-between gap-3 rounded-lg border p-2.5 transition-all"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Badge
                      variant={badgeVariant}
                      size="sm"
                      shape="tag"
                      className="shrink-0 text-[10px] font-medium uppercase"
                    >
                      {platform === "x" ? "X (Twitter)" : platform}
                    </Badge>
                    <span className="text-body-sm text-ink max-w-[280px] truncate font-medium sm:max-w-md">
                      {item.url}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon-sm"
                      shape="rounded"
                      className="text-muted-text hover:text-primary size-7"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open external link"
                        aria-label="Open external link"
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      shape="rounded"
                      onClick={() => handleRemoveLink(idx)}
                      aria-label="Remove link"
                      className="text-muted-text hover:text-error size-7"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* 4. ACTIONS                                             */}
      {/* ────────────────────────────────────────────────────── */}
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
          type="submit"
          size="default"
          shape="md"
          rightIcon={<ArrowRight />}
          className="transition-transform active:scale-[0.96]"
        >
          <span>Next: Review &amp; Submit</span>
        </Button>
      </div>
    </form>
  );
}
