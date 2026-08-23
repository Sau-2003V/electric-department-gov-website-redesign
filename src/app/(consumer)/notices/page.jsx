"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  NoticesHeader,
  NoticesFilter,
  NoticesList,
  INITIAL_NOTICES,
  TABS_CONFIG,
} from "./components";

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      toast.success(`Reference ${id} copied to clipboard`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDownload = (e, notice) => {
    e.stopPropagation();
    e.preventDefault();
    toast.success(
      `Downloading gazette circular: ${notice.id} (${notice.fileSize})`
    );
  };

  const filteredNotices = useMemo(() => {
    return INITIAL_NOTICES.filter((n) => {
      let matchesTab = true;
      if (activeTab === "all") {
        matchesTab = true;
      } else if (activeTab === "tariff") {
        matchesTab = n.category === "tariff";
      } else if (activeTab === "advisory") {
        matchesTab = n.category === "advisory";
      } else if (activeTab === "maintenance") {
        matchesTab = n.category === "maintenance";
      } else if (activeTab === "schemes") {
        matchesTab = n.category === "schemes";
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        n.id.toLowerCase().includes(query) ||
        n.title.toLowerCase().includes(query) ||
        n.description.toLowerCase().includes(query) ||
        n.department.toLowerCase().includes(query) ||
        n.categoryLabel.toLowerCase().includes(query);

      return matchesTab && matchesQuery;
    });
  }, [activeTab, searchQuery]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: INITIAL_NOTICES.length,
      tariff: INITIAL_NOTICES.filter((n) => n.category === "tariff").length,
      advisory: INITIAL_NOTICES.filter((n) => n.category === "advisory").length,
      maintenance: INITIAL_NOTICES.filter((n) => n.category === "maintenance")
        .length,
      schemes: INITIAL_NOTICES.filter((n) => n.category === "schemes").length,
    };
  }, []);

  const currentTabObj = TABS_CONFIG.find((t) => t.id === activeTab);
  const currentTabLabel = currentTabObj
    ? currentTabObj.label
    : "selected category";

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full px-4 py-8 sm:px-6">
        {/* Page Header */}
        <NoticesHeader />

        {/* Search and Tabs Filter Bar */}
        <NoticesFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />

        {/* Notices List Container */}
        <NoticesList
          notices={filteredNotices}
          copiedId={copiedId}
          onCopyId={handleCopyId}
          onDownload={handleDownload}
          searchQuery={searchQuery}
          currentTabLabel={currentTabLabel}
          onClearSearch={() => setSearchQuery("")}
        />
      </div>
    </div>
  );
}
