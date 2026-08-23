import { Search } from "lucide-react";
import { Tabs, TabsList, TabItem } from "@/components/ui/tabs";
import { TABS_CONFIG } from "./constants";

export default function NoticesFilter({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  tabCounts = {},
}) {
  return (
    <div className="mb-5 space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="text-ink-subtle pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          strokeWidth={2}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Notice Reference (e.g. NOT-2026-089), title, or keywords..."
          className="border-hairline bg-surface-1 text-ink placeholder:text-ink-subtle focus:border-ink focus:ring-ink/20 h-10 w-full rounded-lg border pr-3 pl-9 text-sm shadow-2xs transition-all focus:ring-2 focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-caption text-ink-muted hover:text-ink absolute top-1/2 right-3 -translate-y-1/2 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="no-scrollbar overflow-x-auto pb-1">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="border-hairline bg-surface-1 border">
            {TABS_CONFIG.map((tab) => (
              <TabItem
                key={tab.id}
                value={tab.id}
                label={`${tab.label} (${tabCounts[tab.id] ?? 0})`}
              />
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
