"use client";

export function ComplaintLocationSection({ complaint }) {
  const lat =
    complaint?.latitude != null ? parseFloat(complaint.latitude) : NaN;
  const lng =
    complaint?.longitude != null ? parseFloat(complaint.longitude) : NaN;
  const hasGps = !isNaN(lat) && !isNaN(lng);

  return (
    <div className="mb-8">
      <div className="border-hairline-soft border-b pb-3">
        <h2 className="text-title-sm text-ink font-semibold tracking-tight">
          Location
        </h2>
      </div>

      <div className="mt-4 space-y-4">
        {/* Landmark if present */}
        {complaint?.landmark && (
          <div>
            <span className="text-caption text-muted-text block text-xs font-medium tracking-wider uppercase">
              Landmark
            </span>
            <div className="text-body-sm text-ink mt-1 font-normal">
              {complaint.landmark}
            </div>
          </div>
        )}

        {/* Address if present */}
        {complaint?.address && (
          <div>
            <span className="text-caption text-muted-text block text-xs font-medium tracking-wider uppercase">
              Address
            </span>
            <div className="text-body-sm text-ink mt-1 font-normal">
              {complaint.address}
            </div>
          </div>
        )}

        {/* Map */}
        {hasGps ? (
          <div className="border-hairline bg-surface-soft relative h-60 w-full overflow-hidden rounded-lg border sm:h-72">
            <iframe
              title={`Map for complaint #${complaint.id}`}
              width="100%"
              height="100%"
              className="size-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`}
            />
          </div>
        ) : (
          <p className="text-caption text-muted-text text-xs">
            No GPS coordinates recorded for this complaint.
          </p>
        )}
      </div>
    </div>
  );
}

// Alias for backwards compatibility
export { ComplaintLocationSection as ComplaintInfoGrid };
