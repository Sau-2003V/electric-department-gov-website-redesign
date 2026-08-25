export default function ComplaintsStats({ totalCount = 0, activeCount = 0 }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-3.5 sm:p-4">
        <span className="text-caption text-muted-text block font-medium">
          Total Complaints
        </span>
        <div className="text-title-lg text-ink mt-1 font-medium">
          {totalCount}
        </div>
        <span className="text-caption text-muted-text mt-0.5 block">
          Across all categories
        </span>
      </div>

      <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-3.5 sm:p-4">
        <span className="text-caption text-muted-text block font-medium">
          Active Complaints
        </span>
        <div className="text-title-lg text-ink mt-1 font-medium">
          {activeCount}
        </div>
        <span className="text-caption text-muted-text mt-0.5 block">
          Assigned to field crews
        </span>
      </div>
    </div>
  );
}
