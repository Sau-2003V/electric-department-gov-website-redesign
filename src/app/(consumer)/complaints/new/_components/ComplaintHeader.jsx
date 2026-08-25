"use client";

import Link from "next/link";
import { PhoneCall, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplaintHeader() {
  return (
    <div className="mb-6 space-y-3">
      <Link
        href="/complaints"
        className="text-caption text-muted-text hover:text-ink inline-flex items-center gap-1.5 font-medium transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back to All Complaints</span>
      </Link>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-display-sm text-ink font-semibold tracking-tight">
            Register a complaint
          </h1>
        </div>
      </div>
    </div>
  );
}
