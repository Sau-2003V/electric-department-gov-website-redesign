"use client";

import { useState } from "react";
import { Copy, Check, ShieldCheck, Zap, MapPin, Gauge, Activity, Mail, Phone } from "lucide-react";
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
      <div className="border border-hairline bg-surface-card rounded-xl p-6 mb-6 animate-pulse">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="size-16 rounded-full bg-surface-strong shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-48 bg-surface-strong rounded-md" />
            <div className="h-4 w-32 bg-surface-strong rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-hairline bg-surface-card rounded-xl p-5 sm:p-6 mb-6 shadow-subtle">
      {/* Top Banner: Avatar, Identity & Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          {/* Avatar Circle */}
          <div className="relative size-16 sm:size-18 shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center text-xl font-semibold shadow-subtle">
            {initials}
            <span className="absolute bottom-0 right-0 size-4.5 rounded-full bg-success ring-2 ring-surface-card flex items-center justify-center text-[9px] text-white">
              <Check className="size-3 stroke-[3]" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-title-lg sm:text-display-sm text-ink font-semibold truncate">
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

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-body-sm text-muted-text">
              {/* Consumer ID */}
              <div className="flex items-center gap-1.5">
                <span className="text-muted-soft">CA ID:</span>
                <span className="font-mono text-ink font-medium">{consumerId}</span>
                <button
                  type="button"
                  onClick={handleCopyAcc}
                  className="text-muted-soft hover:text-ink transition-colors p-0.5"
                  title="Copy Consumer ID"
                  aria-label="Copy Consumer ID"
                >
                  {copiedAcc ? (
                    <Check className="size-3.5 text-success" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>

              <span className="text-hairline hidden sm:inline">•</span>

              {/* Meter Number */}
              <div className="flex items-center gap-1.5">
                <span className="text-muted-soft">Meter:</span>
                <span className="font-mono text-ink font-semibold">{meterNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyMeter}
                  className="text-muted-soft hover:text-ink transition-colors p-0.5"
                  title="Copy Meter Number"
                  aria-label="Copy Meter Number"
                >
                  {copiedMeter ? (
                    <Check className="size-3.5 text-success" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Chips */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-hairline">
          <div className="flex items-center gap-2 bg-canvas px-3 py-1.5 rounded-lg border border-hairline text-body-sm text-ink">
            <Mail className="size-3.5 text-muted-soft" />
            <span className="truncate max-w-[160px] sm:max-w-[200px]">{email}</span>
          </div>
          <div className="flex items-center gap-2 bg-canvas px-3 py-1.5 rounded-lg border border-hairline text-body-sm text-ink">
            <Phone className="size-3.5 text-muted-soft" />
            <span>{phone}</span>
          </div>
        </div>
      </div>

      {/* Connection Specs Micro-Grid */}
      <div className="mt-5 pt-5 border-t border-hairline grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <Gauge className="size-3.5" /> Sanctioned Load
          </p>
          <p className="text-title-sm text-ink font-semibold">5.00 kW</p>
          <p className="text-[11px] text-muted-text">Single Phase (230V AC)</p>
        </div>

        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <Zap className="size-3.5" /> Tariff Plan
          </p>
          <p className="text-title-sm text-ink font-semibold">LMV-1 Domestic</p>
          <p className="text-[11px] text-muted-text">Urban Telescopic Slabs</p>
        </div>

        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <MapPin className="size-3.5" /> Service Division
          </p>
          <p className="text-title-sm text-ink font-semibold">North Subdivision</p>
          <p className="text-[11px] text-muted-text">Circle IV · Zone 2</p>
        </div>

        <div className="space-y-1">
          <p className="text-caption text-muted-soft flex items-center gap-1">
            <ShieldCheck className="size-3.5" /> Billing Cycle
          </p>
          <p className="text-title-sm text-ink font-semibold">Monthly (1st-5th)</p>
          <p className="text-[11px] text-success font-medium">Auto-Debit Active</p>
        </div>
      </div>
    </div>
  );
}
