import Link from "next/link";
import { Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComplaintsEmptyState({
  searchQuery,
  currentTabLabel,
  onClearSearch,
}) {
  return (
    <div className="text-muted-text flex flex-col items-center justify-center gap-2 py-14 text-center">
      <div className="border-hairline bg-surface-soft text-muted-text mb-3 flex size-12 items-center justify-center rounded-full border">
        <Inbox className="size-6" strokeWidth={1.5} />
      </div>
      <p className="text-body-sm text-ink font-medium">No complaints found</p>
      <p className="text-caption text-muted-text mt-0.5 max-w-xs">
        {searchQuery
          ? `No grievances matching "${searchQuery}". Try a different keyword or reset filters.`
          : `There are currently no tickets in "${currentTabLabel}".`}
      </p>
      <div className="mt-4 flex gap-2">
        {searchQuery && (
          <Button
            variant="secondary"
            size="sm"
            shape="md"
            onClick={onClearSearch}
          >
            <span>Clear Search</span>
          </Button>
        )}
        <Link href="/complaints/new">
          <Button
            variant="accent"
            size="sm"
            shape="md"
            leftIcon={<Plus className="size-3.5" strokeWidth={2.2} />}
          >
            <span>File New Complaint</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
