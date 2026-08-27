"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useGetUser,
  useGetUserProfile,
  useGetAvailableStaff,
} from "@/database/query/getUser";

/** Parses "lng,lat" text into { lat, lng }, or null if missing/invalid. */
function parseLocation(locationText) {
  if (!locationText) return null;
  const [a, b] = locationText.split(",");
  const lng = parseFloat(a);
  const lat = parseFloat(b);
  return !isNaN(lat) && !isNaN(lng) ? { lat, lng } : null;
}

export default function SubdivisionSection({ className }) {
  const { data: authUser } = useGetUser();
  const { data: profile } = useGetUserProfile(authUser?.id);

  const coords = parseLocation(profile?.location);

  const { data: staff = [], isLoading: staffLoading } = useGetAvailableStaff(
    coords?.lat,
    coords?.lng
  );

  const locationStr =
    [
      profile?.sub_division,
      profile?.district,
      profile?.state,
      profile?.pincode ? `PIN ${profile.pincode}` : null,
    ]
      .filter(Boolean)
      .join(" · ") || "—";

  return (
    <section aria-label="Subdivision Contacts" className={cn(className)}>
      {/* Subdivision Header */}
      <div className="flex flex-col items-start justify-between gap-3 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-caption text-muted-text font-medium tracking-wider">
              Your Subdivision
            </p>
          </div>
          <p className="text-title-md text-ink mt-0.5 font-normal">
            {locationStr}
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      {staffLoading ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-canvas aspect-square animate-pulse rounded-lg border"
            />
          ))}
        </div>
      ) : staff.length === 0 ? (
        <p className="text-muted-text text-sm">No staff available nearby.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {staff.map((contact) => (
            <div
              key={contact.id}
              className="bg-canvas flex aspect-square flex-col justify-between rounded-lg border p-4 transition-colors sm:p-5"
            >
              <div>
                {/* Avatar */}
                <div className="flex items-start justify-between gap-2">
                  <div className="bg-surface-card text-caption text-ink border-hairline-soft mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-medium">
                    {(contact.name ?? "?")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                </div>

                {/* Name + role */}
                <div className="min-w-0">
                  <p className="text-ink truncate font-medium">
                    {contact.name ?? "—"}
                  </p>
                  <p className="text-caption text-muted-text mt-0.5 line-clamp-2 leading-relaxed">
                    {contact.designation ?? contact.role ?? "—"}
                  </p>
                </div>
              </div>

              {/* Call button */}
              <a
                href={`tel:${contact.phone}`}
                aria-label={`Call ${contact.name}`}
                className="mt-4 w-full shrink-0"
              >
                <Button
                  type="button"
                  variant="secondary"
                  aria-label={`Call ${contact.name}`}
                  className="w-full max-sm:hidden"
                >
                  <Phone
                    className="size-3.5"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {contact.phone}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  aria-label={`Call ${contact.name}`}
                  className="w-full sm:hidden"
                >
                  <Phone
                    className="size-3.5"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {contact.phone}
                </Button>
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
