"use client";

export function ComplaintLocationSection({ complaint }) {
  const lat =
    complaint?.latitude != null ? parseFloat(complaint.latitude) : NaN;
  const lng =
    complaint?.longitude != null ? parseFloat(complaint.longitude) : NaN;
  const hasGps = !isNaN(lat) && !isNaN(lng);

  return (
    <div className="border-hairline bg-surface-card shadow-subtle mb-6 rounded-lg border p-4 sm:p-5">
      <div className="border-hairline-soft flex items-center justify-between border-b pb-3.5">
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

        {/* Interactive Google Map Embed when GPS coords exist */}
        {hasGps ? (
          <div>
            {/* Google Map iframe */}
            <div className="border-hairline bg-surface-soft relative h-60 w-full overflow-hidden rounded-lg border shadow-inner sm:h-72">
              <iframe
                title={`Google Map showing location for complaint #${complaint.id}`}
                width="100%"
                height="100%"
                className="size-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`}
              />
            </div>
          </div>
        ) : (
          /* Fallback when no GPS coords */
          <div className="border-hairline bg-surface-soft text-caption text-muted-text rounded-lg border p-3.5">
            <span>No GPS coordinates recorded for this complaint.</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Alias for backwards compatibility
export { ComplaintLocationSection as ComplaintInfoGrid };
