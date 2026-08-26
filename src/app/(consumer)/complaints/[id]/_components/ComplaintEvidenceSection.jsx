/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  Paperclip,
  ImageIcon,
  FileText,
  ExternalLink,
  Link2,
  Eye,
  Download,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ComplaintEvidenceSection({ complaint }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Normalize `url` from jsonb column
  let mediaList = [];
  try {
    if (Array.isArray(complaint?.url)) {
      mediaList = complaint.url;
    } else if (typeof complaint?.url === "string") {
      mediaList = JSON.parse(complaint.url);
    }
  } catch (err) {
    console.warn("Could not parse complaint.url JSONB", err);
  }

  const images = mediaList.filter(
    (m) => m.type === "image" || m.url?.match(/\.(webp|jpg|jpeg|png|gif)$/i)
  );
  const pdfs = mediaList.filter(
    (m) => m.type === "pdf" || m.url?.match(/\.pdf$/i)
  );
  const socialLinks = mediaList.filter(
    (m) =>
      m.type === "youtube" ||
      m.type === "instagram" ||
      m.type === "x" ||
      (m.type !== "image" && m.type !== "pdf")
  );

  const totalProofs = mediaList.length;

  return (
    <div className="border-hairline bg-surface-card shadow-subtle mb-6 rounded-lg border p-4 sm:p-5">
      <div className="border-hairline-soft flex items-center justify-between border-b pb-3.5">
        <div className="flex items-center gap-2">
          <h2 className="text-title-sm text-ink font-semibold tracking-tight">
            Attachments
          </h2>
        </div>
      </div>

      {totalProofs === 0 ? (
        <div className="text-muted-text flex flex-col items-center justify-center py-7 text-center">
          <Paperclip className="text-muted-soft mb-2 size-7 stroke-[1.4]" />
          <p className="text-body-sm text-ink font-medium">No attachments</p>
          <p className="text-caption text-muted-text mt-0.5">
            No photos or documents were attached to this complaint.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {/* 1. Photos Section */}
          {images.length > 0 && (
            <div>
              <div className="text-caption text-muted-text mb-2 flex items-center gap-1.5 font-medium tracking-wider uppercase">
                <ImageIcon className="size-3.5" />
                <span>Photos ({images.length})</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {images.map((img, idx) => (
                  <button
                    type="button"
                    key={`photo-${idx}`}
                    className="group border-hairline bg-surface-soft focus:ring-brand-accent relative cursor-pointer overflow-hidden rounded-lg border text-left transition-all hover:shadow-md focus:ring-2 focus:outline-none active:scale-[0.98]"
                    onClick={() => setSelectedImage(img)}
                    aria-label={`View photo: ${img.name || `Photo ${idx + 1}`}`}
                  >
                    <div className="aspect-video w-full overflow-hidden bg-black/5">
                      <img
                        src={img.url}
                        alt={img.name || `Fault photo ${idx + 1}`}
                        className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2.5">
                      <span className="text-caption text-ink max-w-[120px] truncate font-medium">
                        {img.name || `Photo ${idx + 1}`}
                      </span>
                      <Eye className="text-muted-text group-hover:text-ink size-3.5 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. PDF Documents Section */}
          {pdfs.length > 0 && (
            <div>
              <div className="text-caption text-muted-text mb-2 flex items-center gap-1.5 font-medium tracking-wider uppercase">
                <FileText className="size-3.5 text-red-500" />
                <span>Documents ({pdfs.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {pdfs.map((pdf, idx) => (
                  <div
                    key={`pdf-${idx}`}
                    className="border-hairline bg-surface-soft flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded bg-red-500/10 text-red-600">
                        <FileText className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-body-sm text-ink truncate font-medium">
                          {pdf.name || `Document ${idx + 1}.pdf`}
                        </div>
                        <div className="text-caption text-muted-text flex items-center gap-1">
                          <span className="text-[10px] font-semibold text-red-500">
                            PDF
                          </span>
                          {pdf.size && <span>• {pdf.size}</span>}
                        </div>
                      </div>
                    </div>

                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-hairline hover:bg-surface-card text-muted-text hover:text-ink ml-2 flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors"
                      title="Download PDF"
                      aria-label={`Download document: ${pdf.name || `Document ${idx + 1}.pdf`}`}
                    >
                      <Download className="size-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. External Links */}
          {socialLinks.length > 0 && (
            <div>
              <div className="text-caption text-muted-text mb-2 flex items-center gap-1.5 font-medium tracking-wider uppercase">
                <span>External links ({socialLinks.length})</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((item, idx) => (
                  <div
                    key={`social-${idx}`}
                    className="border-hairline bg-surface-soft text-body-sm flex items-center gap-2.5 rounded-lg border px-3 py-2"
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
                      className="text-[10px] font-bold tracking-wider uppercase"
                    >
                      {item.type === "x" ? "X / Twitter" : item.type || "Link"}
                    </Badge>

                    <span className="text-caption text-muted-text max-w-[200px] truncate font-mono sm:max-w-[300px]">
                      {item.url}
                    </span>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-text hover:text-brand-accent transition-colors"
                      title="Open link"
                      aria-label={`Open external link: ${item.url}`}
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Lightbox Dialog */}
      <Dialog
        open={Boolean(selectedImage)}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null);
        }}
      >
        {selectedImage && (
          <DialogContent size="lg" className="p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-title-md">
                {selectedImage.name || "Photo preview"}
              </DialogTitle>
              <DialogDescription>
                Uploaded complaint evidence.
              </DialogDescription>
            </DialogHeader>

            <div className="border-hairline mt-3 flex max-h-[70vh] items-center justify-center overflow-hidden rounded-lg border bg-black/5">
              <img
                src={selectedImage.url}
                alt={selectedImage.name || "Photo view"}
                className="max-h-[65vh] w-auto rounded object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-caption text-muted-text font-mono text-xs">
                {selectedImage.size || "Original attachment"}
              </span>
              <a
                href={selectedImage.url}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<ExternalLink className="size-3.5" />}
                >
                  <span>Open original</span>
                </Button>
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
