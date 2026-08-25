import NoticeCard from "./NoticeCard";
import NoticesEmptyState from "./NoticesEmptyState";

export default function NoticesList({
  notices = [],
  copiedId,
  onCopyId,
  onDownload,
  searchQuery,
  currentTabLabel,
  onClearSearch,
}) {
  return (
    <div className="border-hairline bg-surface-card divide-hairline-soft shadow-subtle divide-y overflow-hidden rounded-lg border">
      {notices.length > 0 ? (
        notices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            isCopied={copiedId === notice.id}
            onCopyId={onCopyId}
            onDownload={onDownload}
          />
        ))
      ) : (
        <NoticesEmptyState
          searchQuery={searchQuery}
          currentTabLabel={currentTabLabel}
          onClearSearch={onClearSearch}
        />
      )}
    </div>
  );
}
