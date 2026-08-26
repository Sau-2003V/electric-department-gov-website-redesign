"use client";

import { useState, useMemo } from "react";
import {
  ComplaintsHeader,
  ComplaintsFilter,
  ComplaintsList,
} from "./_components";
import { useGetComplaints } from "@/database/query/getComplaints";

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: complaints = [], isLoading, isError } = useGetComplaints();

  const filteredComplaints = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return complaints;

    return complaints.filter((c) => {
      return (
        c.id?.toLowerCase().includes(query) ||
        c.issue?.toLowerCase().includes(query) ||
        (c.title ?? "").toLowerCase().includes(query) ||
        (c.description ?? "").toLowerCase().includes(query) ||
        (c.address ?? "").toLowerCase().includes(query) ||
        (c.landmark ?? "").toLowerCase().includes(query) ||
        (c.location ?? "").toLowerCase().includes(query) ||
        (c.status ?? "").toLowerCase().includes(query)
      );
    });
  }, [searchQuery, complaints]);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <ComplaintsHeader />

        <ComplaintsFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ComplaintsList
          complaints={filteredComplaints}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
