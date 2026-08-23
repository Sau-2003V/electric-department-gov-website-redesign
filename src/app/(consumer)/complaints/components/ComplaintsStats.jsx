export default function ComplaintsStats({ totalCount = 0, activeCount = 0 }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      <div className="border-hairline bg-surface-1 rounded-xl border p-3.5 shadow-2xs sm:p-4">
        <span className="text-caption text-ink-muted block font-medium">
          Total Complaints
        </span>
        <div className="text-card-title text-ink mt-1 font-semibold">
          {totalCount}
        </div>
        <span className="text-caption text-ink-subtle mt-0.5 block">
          Across all categories
        </span>
      </div>

      <div className="border-hairline bg-surface-1 rounded-xl border p-3.5 shadow-2xs sm:p-4">
        <span className="text-caption text-ink-muted block font-medium">
          Active Complaints
        </span>
        <div className="text-card-title text-ink mt-1 font-semibold">
          {activeCount}
        </div>
        <span className="text-caption text-ink-subtle mt-0.5 block">
          Assigned to field crews
        </span>
      </div>
    </div>
  );
}
