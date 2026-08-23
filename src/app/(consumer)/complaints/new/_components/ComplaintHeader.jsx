"use client";

import Link from "next/link";
import { PhoneCall, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplaintHeader() {
  return (
    <div className="mb-6 space-y-3">
      <Link
        href="/complaints"
        className="text-caption text-ink-muted hover:text-ink inline-flex items-center gap-1.5 font-medium transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back to All Complaints</span>
      </Link>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-headline text-ink font-medium tracking-tight">
            Register a complaint
          </h1>
          <p className="text-body-sm text-ink-muted mt-0.5">
            Official grievance intake with statutory SLA tracking under UPERC
            guidelines.
          </p>
        </div>

        <a href="tel:1912" className="shrink-0">
          <Button
            variant="accent"
            size="compact"
            shape="md"
            leftIcon={<PhoneCall className="size-3.5" />}
            className="transition-transform active:scale-[0.96]"
          >
            <span>Call 1912 (Emergency)</span>
          </Button>
        </a>
      </div>
    </div>
  );
}
