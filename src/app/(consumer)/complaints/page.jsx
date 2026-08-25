"use client";

import { useState, useMemo } from "react";
import {
  ComplaintsHeader,
  ComplaintsStats,
  ComplaintsFilter,
  ComplaintsList,
  INITIAL_COMPLAINTS,
  TABS_CONFIG,
} from "./components";

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState("my");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredComplaints = useMemo(() => {
    return INITIAL_COMPLAINTS.filter((c) => {
      let matchesTab = true;
      if (activeTab === "my") {
        matchesTab = Boolean(c.isMine);
      } else if (activeTab === "all") {
        matchesTab = true;
      } else if (activeTab === "progress") {
        matchesTab = c.status === "Assigned" || c.status === "In progress";
      } else if (activeTab === "resolved") {
        matchesTab = c.status === "Resolved";
      } else if (activeTab === "closed") {
        matchesTab = c.status === "Closed";
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        c.id.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query);
      return matchesTab && matchesQuery;
    });
  }, [activeTab, searchQuery]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      my: INITIAL_COMPLAINTS.filter((c) => c.isMine).length,
      all: INITIAL_COMPLAINTS.length,
      progress: INITIAL_COMPLAINTS.filter(
        (c) => c.status === "Assigned" || c.status === "In progress"
      ).length,
      resolved: INITIAL_COMPLAINTS.filter((c) => c.status === "Resolved")
        .length,
      closed: INITIAL_COMPLAINTS.filter((c) => c.status === "Closed").length,
    };
  }, []);

  // Summary Metrics
  const activeCount = INITIAL_COMPLAINTS.filter(
    (c) => c.status === "Assigned" || c.status === "In progress"
  ).length;

  const currentTabObj = TABS_CONFIG.find((t) => t.id === activeTab);
  const currentTabLabel = currentTabObj ? currentTabObj.label : "selected tab";

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        {/* Page Header */}
        <ComplaintsHeader />

        {/* Quick KPI Overview Cards */}
        <ComplaintsStats
          totalCount={INITIAL_COMPLAINTS.length}
          activeCount={activeCount}
        />

        {/* Search and Tabs Filter Bar */}
        <ComplaintsFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />

        {/* Complaints List Container */}
        <ComplaintsList
          complaints={filteredComplaints}
          copiedId={copiedId}
          onCopyId={handleCopyId}
          searchQuery={searchQuery}
          currentTabLabel={currentTabLabel}
          onClearSearch={() => setSearchQuery("")}
        />
      </div>
    </div>
  );
}
