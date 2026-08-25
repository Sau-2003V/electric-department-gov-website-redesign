"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  Navigation,
  ArrowLeft,
  ArrowRight,
  Check,
  Locate,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { locationSchema } from "@/types/schema/complaint";

export function Step2LocationDetails({ onBack, onNext }) {
  const [gpsLoading, setGpsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      latitude: null,
      longitude: null,
      address: "",
      landmark: "",
    },
    mode: "onTouched",
  });

  const { control, handleSubmit, setValue, watch, formState } = form;
  const { errors } = formState;

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

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-title-lg text-ink font-semibold tracking-tight">
          Where is the problem?
        </h2>
        <p className="text-body-sm text-muted-text mt-1">
          Provide GPS coordinates or a typed address. Landmark is optional.
        </p>
      </div>

      {/* ── GPS Card ─────────────────────────────────────────── */}
      <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-4 transition-all duration-150 sm:p-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5">
            <div className="border-badge-orange/30 bg-badge-orange/15 shadow-subtle flex size-10 shrink-0 items-center justify-center rounded-md border text-[#c2410c] dark:text-orange-300">
              <Navigation className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-ink text-sm font-semibold tracking-tight">
                  Instant GPS auto-detection
                </h3>
                {gpsTagged && (
                  <Badge variant="success" size="sm" shape="tag">
                    Location Tagged
                  </Badge>
                )}
              </div>
              <p className="text-muted-text mt-0.5 text-xs leading-relaxed">
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

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="relative flex items-center py-1">
        <div className="bg-hairline-soft h-px flex-1" />
        <span className="text-muted-text px-3 text-[11px] font-medium tracking-wider uppercase">
          {gpsTagged
            ? "Verify or add address (optional)"
            : "Or type address manually"}
        </span>
        <div className="bg-hairline-soft h-px flex-1" />
      </div>

      {/* ── Address + Landmark ────────────────────────────────── */}
      <div className="space-y-4">
        {/* Address field */}
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Input
                {...field}
                id="fault-address"
                label={
                  gpsTagged ? "Fault address (optional)" : "Fault address *"
                }
                required={!gpsTagged}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. House No., Street, Area, Mohalla, City"
                value={field.value ?? ""}
              />
              {fieldState.invalid && (
                <p className="text-error text-xs font-medium" role="alert">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Landmark field — always optional */}
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

      {/* Root-level validation error (e.g. neither GPS nor address) */}
      {errors.address && !watch("address") && !gpsTagged && (
        <p className="text-error -mt-2 text-xs font-medium" role="alert">
          {errors.address.message}
        </p>
      )}

      {/* ── Navigation ───────────────────────────────────────── */}
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
