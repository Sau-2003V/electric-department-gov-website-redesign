"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  NoticesHeader,
  NoticesFilter,
  NoticesList,
  TABS_CONFIG,
} from "./components";
import { createClient } from "@/database/supabase/client";

function formatDate(dateString) {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatEffectiveDate(startTime, endTime) {
  if (!startTime) return "Immediate";

  const start = new Date(startTime);

  if (Number.isNaN(start.getTime())) return "Immediate";

  const date = start.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = start.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!endTime) {
    return `${date} (${time})`;
  }

  const end = new Date(endTime);

  if (Number.isNaN(end.getTime())) {
    return `${date} (${time})`;
  }

  const endTimeFormatted = end.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date} (${time} - ${endTimeFormatted})`;
}

function getCategoryLabel(subType) {
  const labels = {
    power: "Power",
    emergency_outage: "Emergency Outage",
    advisory: "Public Advisory",
  };

  return labels[subType] || subType || "Notice";
}

function getPriorityConfig(priority) {
  const value = String(priority || "").toLowerCase();

  if (
    value.includes("critical") ||
    value.includes("urgent") ||
    value.includes("high")
  ) {
    return {
      priority: priority || "High",
      priorityType: "critical",
    };
  }

  if (value.includes("warning") || value.includes("medium")) {
    return {
      priority: priority || "Warning",
      priorityType: "warning",
    };
  }

  if (value.includes("low")) {
    return {
      priority: priority || "Low",
      priorityType: "success",
    };
  }

  return {
    priority: priority || "Information",
    priorityType: "info",
  };
}

function getStatus(status) {
  if (!status) return "Active";

  const normalized = String(status).toLowerCase();

  if (normalized.includes("active")) {
    return "Active";
  }

  if (normalized.includes("scheduled")) {
    return "Scheduled";
  }

  if (normalized.includes("expire")) {
    return "Expiring Soon";
  }

  if (normalized.includes("archive")) {
    return "Archived";
  }

  return status;
}

function getFileInfo(attachmentUrl) {
  if (!attachmentUrl) {
    return {
      fileType: "Notice",
      fileSize: "",
    };
  }

  const url = String(attachmentUrl);

  const extension = url.split("?")[0].split(".").pop()?.toUpperCase();

  return {
    fileType: extension || "FILE",
    fileSize: "",
  };
}

function mapNotice(row) {
  const priorityConfig = getPriorityConfig(row.priority);
  const fileInfo = getFileInfo(row.attachment_url);

  return {
    id: String(row.id),
    title: row.title || "Untitled Notice",
    description: row.description || "",
    department: row.issued_by_department || "Electric Department",

    date: formatDate(row.updated_at || row.start_time),

    effectiveDate: formatEffectiveDate(row.start_time, row.end_time),

    category: row.sub_type || row.category || "notice",

    categoryLabel: getCategoryLabel(row.sub_type),

    priority: priorityConfig.priority,
    priorityType: priorityConfig.priorityType,

    fileType: fileInfo.fileType,
    fileSize: fileInfo.fileSize,

    status: getStatus(row.status),

    isNew: row.updated_at
      ? Date.now() - new Date(row.updated_at).getTime() <
        7 * 24 * 60 * 60 * 1000
      : false,

    attachmentUrl: row.attachment_url || null,

    reason: row.reason || null,
    localityNames: row.locality_names || null,
    affectedConsumers: row.affected_consumers_est || null,
  };
}

export default function NoticesPage() {
  const supabase = useMemo(() => createClient(), []);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNotices = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("outage_notices")
        .select("*")
        .eq("is_public", true)
        .order("start_time", {
          ascending: false,
        });

      if (!isMounted) return;

      if (error) {
        console.error("Error fetching notices:", error);
        setError(error.message);
        setNotices([]);
      } else {
        setNotices((data || []).map(mapNotice));
      }

      setLoading(false);
    };

    fetchNotices();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(id);

      setCopiedId(id);

      toast.success(`Reference ${id} copied to clipboard`);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  const handleDownload = (e, notice) => {
    e.stopPropagation();
    e.preventDefault();

    if (!notice.attachmentUrl) {
      toast.error("No attachment available for this notice.");
      return;
    }

    window.open(notice.attachmentUrl, "_blank", "noopener,noreferrer");
  };

  const filteredNotices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return notices.filter((notice) => {
      let matchesTab = true;

      if (activeTab !== "all") {
        matchesTab = notice.category === activeTab;
      }

      const matchesQuery =
        !query ||
        notice.id.toLowerCase().includes(query) ||
        notice.title.toLowerCase().includes(query) ||
        notice.description.toLowerCase().includes(query) ||
        notice.department.toLowerCase().includes(query) ||
        notice.categoryLabel.toLowerCase().includes(query);

      return matchesTab && matchesQuery;
    });
  }, [notices, activeTab, searchQuery]);

  const tabCounts = useMemo(() => {
    return {
      all: notices.length,

      power: notices.filter((notice) => notice.category === "power").length,

      emergency_outage: notices.filter(
        (notice) => notice.category === "emergency_outage"
      ).length,

      advisory: notices.filter((notice) => notice.category === "advisory")
        .length,
    };
  }, [notices]);

  const currentTabObj = TABS_CONFIG.find((tab) => tab.id === activeTab);

  const currentTabLabel = currentTabObj
    ? currentTabObj.label
    : "selected category";

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <NoticesHeader />

        <NoticesFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />

        {loading ? (
          <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-10 text-center">
            <p className="text-muted-text">Loading notices...</p>
          </div>
        ) : error ? (
          <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-10 text-center">
            <p className="text-destructive font-medium">
              Failed to load notices
            </p>

            <p className="text-muted-text mt-2 text-sm">{error}</p>
          </div>
        ) : (
          <NoticesList
            notices={filteredNotices}
            copiedId={copiedId}
            onCopyId={handleCopyId}
            onDownload={handleDownload}
            searchQuery={searchQuery}
            currentTabLabel={currentTabLabel}
            onClearSearch={() => setSearchQuery("")}
          />
        )}
      </div>
    </div>
  );
}
