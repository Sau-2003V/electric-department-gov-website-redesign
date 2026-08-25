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
    <div className="border-hairline bg-surface-card divide-hairline-soft shadow-subtle divide-y overflow-hidden rounded-lg border">
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
