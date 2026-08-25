"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, FileCheck, Copy, Check, RotateCcw } from "lucide-react";
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

          <h1 className="text-display-sm text-ink mt-3 font-semibold tracking-tight">
            Docket #{docket.id}
          </h1>

          <p className="text-body-sm text-muted-text mt-1">
            Assigned directly to{" "}
            <span className="text-ink font-semibold">
              {docket.issue.authority}
            </span>
          </p>
        </div>

        {/* Receipt table / card */}
        <div className="border-hairline bg-surface-soft mt-6 space-y-3 rounded-lg border p-4 text-xs sm:p-5">
          <div className="border-hairline-soft flex items-center justify-between border-b pb-2.5">
            <span className="text-muted-text">Docket ID:</span>
            <div className="flex items-center gap-2">
              <span className="text-ink font-mono font-semibold">
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
            <span className="text-muted-text">Issue Category:</span>
            <span className="text-ink font-medium">{docket.issue.title}</span>
          </div>

          <div className="border-hairline-soft flex items-center justify-between border-b pb-2.5">
            <span className="text-muted-text">Statutory SLA Target:</span>
            <span className="text-success font-medium">{docket.issue.sla}</span>
          </div>

          <div className="border-hairline-soft flex items-center justify-between border-b pb-2.5">
            <span className="text-muted-text">Lodged Timestamp:</span>
            <span className="text-ink font-normal">{docket.time}</span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-muted-text shrink-0">Fault Location:</span>
            <span className="text-ink max-w-[280px] text-right leading-relaxed font-normal">
              {docket.location.address}
              {docket.location.landmark
                ? ` (Landmark: ${docket.location.landmark})`
                : ""}
            </span>
          </div>
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
