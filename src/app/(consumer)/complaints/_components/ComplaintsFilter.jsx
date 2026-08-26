import { Search } from "lucide-react";

export default function ComplaintsFilter({ searchQuery, onSearchChange }) {
  return (
    <div className="mb-5">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="text-muted-text pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          strokeWidth={2}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Docket ID (e.g. VVNL-240001) or fault description..."
          className="border-hairline bg-surface-card text-ink placeholder:text-muted-text focus:border-ink focus:ring-ring shadow-subtle h-10 w-full rounded-md border pr-3 pl-9 text-sm transition-all focus:ring-1 focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-caption text-muted-text hover:text-ink absolute top-1/2 right-3 -translate-y-1/2 font-medium"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
