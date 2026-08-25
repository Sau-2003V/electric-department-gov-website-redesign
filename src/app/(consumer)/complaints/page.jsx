"use client";

import { useState, useMemo } from "react";
import {
  ComplaintsHeader,
  ComplaintsFilter,
  ComplaintsList,
  TABS_CONFIG,
} from "./_components";
import { useGetComplaints } from "@/database/query/getComplaints";
import { useUser } from "@/database/query/getUser";

// ponytail: tab filtering is inline — upgrade to server-side if list grows large
export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: user } = useUser();
  const { data: complaints = [], isLoading, isError } = useGetComplaints();

  const filteredComplaints = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return complaints.filter((c) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "my" && c.uid === user?.id) ||
        (activeTab === "progress" &&
          (c.status === "assigned" || c.status === "in_progress")) ||
        (activeTab === "resolved" && c.status === "resolved") ||
        (activeTab === "closed" && c.status === "closed");

      const matchesQuery =
        !query ||
        c.id?.toLowerCase().includes(query) ||
        c.issue?.toLowerCase().includes(query) ||
        (c.description ?? "").toLowerCase().includes(query) ||
        (c.address ?? "").toLowerCase().includes(query) ||
        (c.landmark ?? "").toLowerCase().includes(query) ||
        (c.location ?? "").toLowerCase().includes(query);

      return matchesTab && matchesQuery;
    });
  }, [activeTab, searchQuery, complaints, user?.id]);

  const tabCounts = useMemo(
    () => ({
      all: complaints.length,
      my: user?.id ? complaints.filter((c) => c.uid === user.id).length : 0,
      progress: complaints.filter(
        (c) => c.status === "assigned" || c.status === "in_progress"
      ).length,
      resolved: complaints.filter((c) => c.status === "resolved").length,
      closed: complaints.filter((c) => c.status === "closed").length,
    }),
    [complaints, user?.id]
  );

  const currentTabLabel =
    TABS_CONFIG.find((t) => t.id === activeTab)?.label ?? "selected tab";

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <ComplaintsHeader />

        <ComplaintsFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />

        <ComplaintsList
          complaints={filteredComplaints}
          searchQuery={searchQuery}
          currentTabLabel={currentTabLabel}
          onClearSearch={() => setSearchQuery("")}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
