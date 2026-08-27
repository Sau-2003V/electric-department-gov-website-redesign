"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/database/supabase/supabase";
import {
  Paperclip,
  ImageIcon,
  FileText,
  Video as VideoIcon,
  ExternalLink,
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

export default function AttachmentSection({ complaintId, complaint }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // 1. Fetch files from Supabase storage
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      console.log("DEBUG: fetching for complaintId =", complaintId);

      const { data, error } = await supabase.storage
        .from("complaint-evidence")
        .list(`${complaintId}`, { limit: 50 });

      console.log("DEBUG: storage list result =", { data, error });

      if (error) {
        console.error("Error fetching files:", error);
        setFiles([]);
      } else {
        const urls = (data || []).map((file) => {
          const { data: urlData } = supabase.storage
            .from("complaint-evidence")
            .getPublicUrl(`${complaintId}/${file.name}`);
          return {
            name: file.name,
            url: urlData.publicUrl,
            size: file.metadata?.size
              ? `${(file.metadata.size / 1024).toFixed(1)} KB`
              : null,
          };
        });
        setFiles(urls);
      }
      setLoading(false);
    };

    if (complaintId) fetchFiles();
  }, [complaintId]);

  // 2. Parse external/social links from complaint.url JSONB
  let socialLinks = [];
  try {
    let mediaList = [];
    if (Array.isArray(complaint?.url)) {
      mediaList = complaint.url;
    } else if (typeof complaint?.url === "string") {
      mediaList = JSON.parse(complaint.url);
    }
    socialLinks = mediaList.filter(
      (m) =>
        m.type === "youtube" ||
        m.type === "instagram" ||
        m.type === "x" ||
        (m.type && m.type !== "image" && m.type !== "pdf" && m.type !== "video")
    );
  } catch (err) {
    console.warn("Could not parse complaint.url JSONB", err);
  }

  // 3. Categorize storage files
  const images = files.filter((f) =>
    f.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );
  const pdfs = files.filter((f) => f.name.match(/\.pdf$/i));
  const videos = files.filter((f) => f.name.match(/\.(mp4|webm|mov)$/i));
  const others = files.filter(
    (f) => !images.includes(f) && !pdfs.includes(f) && !videos.includes(f)
  );

  const totalProofs = files.length + socialLinks.length;

  return (
    <div className="border-hairline bg-surface-card shadow-subtle mb-6 rounded-lg border p-4 sm:p-5">
      <div className="border-hairline-soft flex items-center justify-between border-b pb-3.5">
        <h2 className="text-title-sm text-ink font-semibold tracking-tight">
          Attachments
        </h2>
      </div>

      {loading ? (
        <div className="text-muted-text py-7 text-center text-sm">
          Loading attachments…
        </div>
      ) : totalProofs === 0 ? (
        <div className="text-muted-text flex flex-col items-center justify-center py-7 text-center">
          <Paperclip className="text-muted-soft mb-2 size-7 stroke-[1.4]" />
          <p className="text-body-sm text-ink font-medium">No attachments</p>
          <p className="text-caption text-muted-text mt-0.5">
            No photos or documents were attached to this complaint.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {/* Photos */}
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
                    aria-label={`View photo: ${img.name}`}
                  >
                    <div className="aspect-video w-full overflow-hidden bg-black/5">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2.5">
                      <span className="text-caption text-ink max-w-[120px] truncate font-medium">
                        {img.name}
                      </span>
                      <Eye className="text-muted-text group-hover:text-ink size-3.5 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {videos.length > 0 && (
            <div>
              <div className="text-caption text-muted-text mb-2 flex items-center gap-1.5 font-medium tracking-wider uppercase">
                <VideoIcon className="size-3.5" />
                <span>Videos ({videos.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {videos.map((vid, idx) => (
                  <div
                    key={`video-${idx}`}
                    className="border-hairline bg-surface-soft overflow-hidden rounded-lg border"
                  >
                    <video controls className="max-h-48 w-full">
                      <source src={vid.url} />
                    </video>
                    <div className="text-caption text-ink truncate p-2 font-medium">
                      {vid.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PDF Documents */}
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
                          {pdf.name}
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
                      aria-label={`Download document: ${pdf.name}`}
                    >
                      <Download className="size-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other files */}
          {others.length > 0 && (
            <div>
              <div className="text-caption text-muted-text mb-2 flex items-center gap-1.5 font-medium tracking-wider uppercase">
                <Paperclip className="size-3.5" />
                <span>Other files ({others.length})</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {others.map((file, idx) => (
                  <a
                    key={`other-${idx}`}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-hairline bg-surface-soft text-body-sm text-ink hover:text-brand-accent flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors"
                  >
                    <Paperclip className="size-3.5" />
                    <span className="max-w-[180px] truncate">{file.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* External / Social links */}
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
                {selectedImage.name}
              </DialogTitle>
              <DialogDescription>
                Uploaded complaint evidence.
              </DialogDescription>
            </DialogHeader>

            <div className="border-hairline mt-3 flex max-h-[70vh] items-center justify-center overflow-hidden rounded-lg border bg-black/5">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
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
