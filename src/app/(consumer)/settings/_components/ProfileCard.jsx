"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  ShieldCheck,
  Zap,
  MapPin,
  Gauge,
  Activity,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfileCard({ user, isLoading }) {
  const [copiedMeter, setCopiedMeter] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);

  const appMetadata = user?.app_metadata || user?.raw_app_meta_data || {};
  const userMetadata = user?.user_metadata || {};

  const name =
    appMetadata.name ||
    userMetadata.name ||
    user?.email?.split("@")[0] ||
    "Aditya Sharma";

  const email = user?.email || "aditya.sharma@example.gov.in";
  const phone = appMetadata.phone || userMetadata.phone || "+91 98765 43210";

  const meterNumber =
    appMetadata.meter_number || userMetadata.meter_number || "MTR-8829410";

  const consumerId =
    appMetadata.consumer_id || userMetadata.consumer_id || "CA-10048291";

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "CS";

  const handleCopyMeter = async () => {
    try {
      await navigator.clipboard.writeText(meterNumber);
      setCopiedMeter(true);
      toast.success("Meter number copied to clipboard", {
        description: meterNumber,
      });
      setTimeout(() => setCopiedMeter(false), 2000);
    } catch {
      toast.error("Failed to copy meter number");
    }
  };

  const handleCopyAcc = async () => {
    try {
      await navigator.clipboard.writeText(consumerId);
      setCopiedAcc(true);
      toast.success("Consumer Account ID copied", {
        description: consumerId,
      });
      setTimeout(() => setCopiedAcc(false), 2000);
    } catch {
      toast.error("Failed to copy account ID");
    }
  };

  if (isLoading) {
    return (
      <div className="border-hairline bg-surface-card mb-6 animate-pulse rounded-xl border p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="bg-surface-strong size-16 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="bg-surface-strong h-6 w-48 rounded-md" />
            <div className="bg-surface-strong h-4 w-32 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-hairline bg-surface-card shadow-subtle mb-6 rounded-xl border p-5 sm:p-6">
      {/* Top Banner: Avatar, Identity & Status */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4 sm:items-center">
          {/* Avatar Circle */}
          <div className="bg-primary text-on-primary shadow-subtle relative flex size-16 shrink-0 items-center justify-center rounded-full text-xl font-semibold sm:size-18">
            {initials}
            <span className="bg-success ring-surface-card absolute right-0 bottom-0 flex size-4.5 items-center justify-center rounded-full text-[9px] text-white ring-2">
              <Check className="size-3 stroke-[3]" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-title-lg sm:text-display-sm text-ink truncate font-semibold">
                {name}
              </h2>
              <Badge
                variant="success"
                size="sm"
                shape="pill"
                leadingIcon={ShieldCheck}
                text="Verified Consumer"
              />
              <Badge
                variant="secondary"
                size="sm"
                shape="pill"
                leadingIcon={Activity}
                text="Active Connection"
              />
            </div>

            <div className="text-body-sm text-muted-text mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {/* Consumer ID */}
              <div className="flex items-center gap-1.5">
                <span className="text-muted-soft">CA ID:</span>
                <span className="text-ink font-mono font-medium">
                  {consumerId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAcc}
                  className="text-muted-soft hover:text-ink p-0.5 transition-colors"
                  title="Copy Consumer ID"
                  aria-label="Copy Consumer ID"
                >
                  {copiedAcc ? (
                    <Check className="text-success size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>

              <span className="text-hairline hidden sm:inline">•</span>

              {/* Meter Number */}
              <div className="flex items-center gap-1.5">
                <span className="text-muted-soft">Meter:</span>
                <span className="text-ink font-mono font-semibold">
                  {meterNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyMeter}
                  className="text-muted-soft hover:text-ink p-0.5 transition-colors"
                  title="Copy Meter Number"
                  aria-label="Copy Meter Number"
                >
                  {copiedMeter ? (
                    <Check className="text-success size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Chips */}
        <div className="border-hairline flex flex-wrap items-center gap-2 border-t pt-2 sm:flex-nowrap lg:border-t-0 lg:pt-0">
          <div className="bg-canvas border-hairline text-body-sm text-ink flex items-center gap-2 rounded-lg border px-3 py-1.5">
            <Mail className="text-muted-soft size-3.5" />
            <span className="max-w-[160px] truncate sm:max-w-[200px]">
              {email}
            </span>
          </div>
          <div className="bg-canvas border-hairline text-body-sm text-ink flex items-center gap-2 rounded-lg border px-3 py-1.5">
            <Phone className="text-muted-soft size-3.5" />
            <span>{phone}</span>
          </div>
        </div>
      </div>

      {/* Connection Specs Micro-Grid */}
      <div className="border-hairline mt-5 grid grid-cols-2 gap-4 border-t pt-5 sm:grid-cols-4">
        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <Gauge className="size-3.5" /> Sanctioned Load
          </p>
          <p className="text-title-sm text-ink font-semibold">5.00 kW</p>
          <p className="text-muted-text text-[11px]">Single Phase (230V AC)</p>
        </div>

        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <Zap className="size-3.5" /> Tariff Plan
          </p>
          <p className="text-title-sm text-ink font-semibold">LMV-1 Domestic</p>
          <p className="text-muted-text text-[11px]">Urban Telescopic Slabs</p>
        </div>

        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <MapPin className="size-3.5" /> Service Division
          </p>
          <p className="text-title-sm text-ink font-semibold">
            North Subdivision
          </p>
          <p className="text-muted-text text-[11px]">Circle IV · Zone 2</p>
        </div>

        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <ShieldCheck className="size-3.5" /> Billing Cycle
          </p>
          <p className="text-title-sm text-ink font-semibold">
            Monthly (1st-5th)
          </p>
          <p className="text-success text-[11px] font-medium">
            Auto-Debit Active
          </p>
        </div>
      </div>
    </div>
  );
}
