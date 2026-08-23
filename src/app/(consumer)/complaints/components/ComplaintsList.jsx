import ComplaintCard from "./ComplaintCard";
import ComplaintsEmptyState from "./ComplaintsEmptyState";

export default function ComplaintsList({
  complaints = [],
  copiedId,
  onCopyId,
  searchQuery,
  currentTabLabel,
  onClearSearch,
}) {
  return (
    <div className="border-hairline bg-surface-1 divide-hairline-soft divide-y overflow-hidden rounded-2xl border shadow-2xs">
      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
            isCopied={copiedId === complaint.id}
            onCopyId={onCopyId}
          />
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
