"use client";

export function ComplaintDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl animate-pulse space-y-6 px-4 py-8 sm:px-6">
      {/* 1. Header Skeleton */}
      <div className="border-hairline bg-surface-card space-y-4 rounded-lg border p-6">
        <div className="border-hairline-soft flex items-center justify-between border-b pb-3.5">
          <div className="bg-surface-muted h-6 w-32 rounded" />
          <div className="flex gap-2">
            <div className="bg-surface-muted h-8 w-16 rounded" />
            <div className="bg-surface-muted h-8 w-16 rounded" />
          </div>
        </div>
        <div className="space-y-3 pt-1">
          <div className="flex gap-2">
            <div className="bg-surface-muted h-5 w-24 rounded-full" />
            <div className="bg-surface-muted h-5 w-24 rounded-full" />
          </div>
          <div className="bg-surface-muted h-8 w-3/4 rounded" />
          <div className="bg-surface-muted h-12 w-full rounded" />
          <div className="border-hairline-soft flex gap-4 border-t pt-3">
            <div className="bg-surface-muted h-4 w-36 rounded" />
            <div className="bg-surface-muted h-4 w-28 rounded" />
          </div>
        </div>
      </div>

      {/* 2. Tracker Skeleton */}
      <div className="border-hairline bg-surface-card space-y-3 rounded-lg border p-5">
        <div className="border-hairline-soft flex items-center justify-between border-b pb-2">
          <div className="bg-surface-muted h-5 w-32 rounded" />
          <div className="bg-surface-muted h-5 w-24 rounded-full" />
        </div>
        <div className="bg-surface-soft flex items-center gap-3 rounded-lg p-3.5">
          <div className="bg-surface-muted size-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <div className="bg-surface-muted h-4 w-28 rounded" />
            <div className="bg-surface-muted h-3 w-48 rounded" />
          </div>
        </div>
      </div>

      {/* 3. Location Skeleton with Map */}
      <div className="border-hairline bg-surface-card space-y-4 rounded-lg border p-5">
        <div className="bg-surface-muted h-5 w-32 rounded" />
        <div className="bg-surface-muted h-5 w-full max-w-sm rounded" />
        <div className="bg-surface-muted h-60 w-full rounded-lg" />
      </div>

      {/* 4. Evidence Skeleton */}
      <div className="border-hairline bg-surface-card space-y-4 rounded-lg border p-5">
        <div className="bg-surface-muted h-5 w-32 rounded" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-soft h-28 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
