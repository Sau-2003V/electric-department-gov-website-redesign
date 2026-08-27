"use client";

import {
  Copy,
  Check,
  ShieldCheck,
  Activity,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ProfileCard({ user, profile, isLoading }) {
  const [copiedMeter, setCopiedMeter] = useState(false);

  const appMetadata = user?.app_metadata || user?.raw_app_meta_data || {};
  const userMetadata = user?.user_metadata || {};

  const name =
    appMetadata.name ||
    userMetadata.name ||
    user?.email?.split("@")[0] ||
    "Consumer";

  const email = user?.email || "—";
  // phone, meter_number, address, location all live in public.users (profile)
  const phone = profile?.phone || "—";
  const meterNumber = profile?.meter_number || "—";
  const address = profile?.address || "";
  const district = profile?.district || "";
  const state = profile?.state || "";
  const pincode = profile?.pincode || "";

  // Build a human-readable address line for display
  const addressLine = [address, district, state, pincode]
    .filter(Boolean)
    .join(", ");

  const lat =
    profile?.latitude != null
      ? parseFloat(profile.latitude)
      : profile?.location?.includes(",")
        ? parseFloat(profile.location.split(",")[0])
        : NaN;
  const lng =
    profile?.longitude != null
      ? parseFloat(profile.longitude)
      : profile?.location?.includes(",")
        ? parseFloat(profile.location.split(",")[1])
        : NaN;
  const hasGps = !isNaN(lat) && !isNaN(lng);

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
      toast.success("Meter number copied", { description: meterNumber });
      setTimeout(() => setCopiedMeter(false), 2000);
    } catch {
      toast.error("Failed to copy meter number");
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
            <div className="bg-surface-strong h-4 w-64 rounded-md" />
          </div>
        </div>
        <div className="bg-surface-strong mt-5 h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="border-hairline bg-surface-card shadow-subtle mb-6 rounded-xl border p-5 sm:p-6">
      {/* Top row: Avatar + Identity + Contact chips */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        {/* Avatar + Identity */}
        <div className="flex items-center gap-4">
          <div className="bg-primary text-on-primary shadow-subtle relative flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-medium sm:size-16">
            {initials}
            <span className="bg-success ring-surface-card absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-full text-[9px] text-white ring-2">
              <Check className="size-2.5 stroke-[3]" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-title-lg text-ink font-medium">{name}</h2>
              <Badge
                variant="success"
                size="sm"
                shape="pill"
                leadingIcon={ShieldCheck}
                text="Verified"
              />
              <Badge
                variant="secondary"
                size="sm"
                shape="pill"
                leadingIcon={Activity}
                text="Active"
              />
            </div>

            {/* Meter */}
            {meterNumber !== "—" && (
              <div className="text-body-sm text-muted-text mt-1.5 flex items-center gap-1.5">
                <span className="text-muted-soft">Meter:</span>
                <span className="text-ink font-mono font-medium">
                  {meterNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyMeter}
                  className="text-muted-soft hover:text-ink p-0.5 transition-colors"
                  aria-label="Copy Meter Number"
                >
                  {copiedMeter ? (
                    <Check className="text-success size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            )}

            {/* Address line */}
            {addressLine && (
              <div className="text-body-sm text-muted-text mt-1 flex items-start gap-1.5">
                <MapPin className="text-muted-soft mt-0.5 size-3.5 shrink-0" />
                <span className="line-clamp-2">{addressLine}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact chips */}
        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
          {phone !== "—" && (
            <div className="bg-canvas border-hairline text-body-sm text-ink flex items-center gap-2 rounded-lg border px-3 py-1.5">
              <Phone className="text-muted-soft size-3.5" />
              <span>{phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      {hasGps ? (
        <div className="border-hairline bg-surface-soft relative mt-5 h-60 w-full overflow-hidden rounded-lg border sm:h-72">
          <iframe
            title="Service location map"
            width="100%"
            height="100%"
            className="size-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${lng},${lat}&hl=en&z=15&output=embed`}
          />
        </div>
      ) : (
        <p className="text-caption text-muted-text mt-4 text-xs">
          No GPS coordinates recorded for this account.
        </p>
      )}
    </div>
  );
}
