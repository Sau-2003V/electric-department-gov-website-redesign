"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  FileCheck,
  Copy,
  Check,
  RotateCcw,
  ImageIcon,
  FileText,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DocketSuccessReceipt({ docket, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (docket?.id && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(docket.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const totalProofs = (docket?.filesCount || 0) + (docket?.linksCount || 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-6 sm:p-8">
        <div className="text-center">
          <div className="border-success/30 bg-success/10 text-success mx-auto mb-3 flex size-12 items-center justify-center rounded-md border">
            <CheckCircle2 className="size-6" />
          </div>

          <div className="flex justify-center">
            <Badge variant="success" size="lg" shape="tag">
              Complaint Registered Successfully
            </Badge>
          </div>

          <h1 className="text-display-sm text-ink mt-3 font-medium tracking-tight">
            Docket #{docket.id}
          </h1>

          <p className="text-body-sm text-muted-text mt-1">
            Assigned directly to{" "}
            <span className="text-ink font-medium">
              {docket.issue.authority}
            </span>
          </p>
        </div>

        {/* Receipt table / card */}
        <div className="border-hairline bg-surface-soft text-body-sm mt-6 space-y-3 rounded-lg border p-4 sm:p-5">
          <div className="border-hairline-soft flex items-center justify-between border-b pb-2.5">
            <span className="text-caption text-muted-text font-medium">
              Docket ID:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-body-sm text-ink font-mono font-medium">
                {docket.id}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy Docket Number"
                className="text-muted-text hover:text-ink transition-colors active:scale-[0.96]"
              >
                {copied ? (
                  <Check className="text-success size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="border-hairline-soft flex items-center justify-between border-b pb-2.5">
            <span className="text-caption text-muted-text font-medium">
              Issue Category:
            </span>
            <span className="text-body-sm text-ink font-medium">
              {docket.issue.title}
            </span>
          </div>

          <div className="border-hairline-soft flex items-center justify-between border-b pb-2.5">
            <span className="text-caption text-muted-text font-medium">
              Lodged Timestamp:
            </span>
            <span className="text-body-sm text-ink font-normal">
              {docket.time}
            </span>
          </div>

          <div
            className={
              totalProofs > 0
                ? "border-hairline-soft flex items-start justify-between border-b pb-2.5"
                : "flex items-start justify-between"
            }
          >
            <span className="text-caption text-muted-text shrink-0 font-medium">
              Fault Location:
            </span>
            <span className="text-body-sm text-ink max-w-[280px] text-right leading-relaxed font-normal">
              {docket.location?.address ||
                (docket.location?.latitude != null
                  ? `${docket.location.latitude.toFixed(4)}° N, ${docket.location.longitude.toFixed(4)}° E`
                  : "Tagged via GPS")}
              {docket.location?.landmark
                ? ` (Landmark: ${docket.location.landmark})`
                : ""}
            </span>
          </div>

          {totalProofs > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-caption text-muted-text font-medium">
                Attached Proofs:
              </span>
              <div className="text-body-sm text-ink flex flex-wrap items-center gap-3 font-medium">
                {docket.imageCount > 0 && (
                  <span className="flex items-center gap-1">
                    <ImageIcon className="text-primary size-3.5" />
                    {docket.imageCount} WebP Photo
                    {docket.imageCount > 1 ? "s" : ""}
                  </span>
                )}
                {docket.pdfCount > 0 && (
                  <span className="flex items-center gap-1">
                    <FileText className="size-3.5 text-red-500" />
                    {docket.pdfCount} PDF Doc
                    {docket.pdfCount > 1 ? "s" : ""}
                  </span>
                )}
                {docket.linksCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Link2 className="text-brand-accent size-3.5" />
                    {docket.linksCount} Social Link
                    {docket.linksCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/complaints" className="flex justify-center">
            <Button
              variant="primary"
              size="default"
              shape="md"
              leftIcon={<FileCheck />}
              className="transition-transform active:scale-[0.96]"
            >
              <span>Track in Complaints Dashboard</span>
            </Button>
          </Link>

          <Button
            type="button"
            onClick={onReset}
            variant="secondary"
            size="default"
            shape="md"
            leftIcon={<RotateCcw />}
            className="transition-transform active:scale-[0.96]"
          >
            <span>Register Another Issue</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
