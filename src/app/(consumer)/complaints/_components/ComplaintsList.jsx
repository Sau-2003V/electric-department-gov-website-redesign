import ComplaintCard from "./ComplaintCard";
import ComplaintsEmptyState from "./ComplaintsEmptyState";

// ponytail: skeleton count hardcoded at 4 — good enough for typical list sizes
function SkeletonRow() {
  return (
    <div className="flex animate-pulse flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <div className="bg-surface-muted h-4 w-48 rounded" />
        <div className="bg-surface-muted h-3 w-72 rounded opacity-60" />
      </div>
      <div className="bg-surface-muted h-6 w-20 rounded-full" />
    </div>
  );
}

export default function ComplaintsList({
  complaints = [],
  searchQuery,
  currentTabLabel,
  onClearSearch,
  isLoading,
  isError,
}) {
  return (
    <div className="border-hairline bg-surface-card divide-hairline-soft shadow-subtle divide-y overflow-hidden rounded-lg border">
      {isLoading ? (
        Array.from({ length: 4 }, (_, i) => <SkeletonRow key={i} />)
      ) : isError ? (
        <div className="text-ink-muted p-8 text-center text-sm">
          Failed to load complaints. Please refresh and try again.
        </div>
      ) : complaints.length > 0 ? (
        complaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))
      ) : (
        <ComplaintsEmptyState
          searchQuery={searchQuery}
          currentTabLabel={currentTabLabel}
          onClearSearch={onClearSearch}
        />
      )}
    </div>
  );
}
