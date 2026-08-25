import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoticesEmptyState({
  searchQuery,
  currentTabLabel,
  onClearSearch,
}) {
  return (
    <div className="text-muted-text flex flex-col items-center justify-center gap-2 py-14 text-center">
      <div className="border-hairline bg-surface-soft text-muted-text mb-3 flex size-12 items-center justify-center rounded-full border">
        <FileText className="size-6" strokeWidth={1.5} />
      </div>
      <p className="text-body-sm text-ink font-medium">No notices found</p>
      <p className="text-caption text-muted-text mt-0.5 max-w-xs">
        {searchQuery
          ? `No circulars matching "${searchQuery}". Try searching by notice reference ID or a broader keyword.`
          : `There are currently no circulars in "${currentTabLabel}".`}
      </p>
      {searchQuery && (
        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            shape="md"
            onClick={onClearSearch}
          >
            <span>Clear Search</span>
          </Button>
        </div>
      )}
    </div>
  );
}
