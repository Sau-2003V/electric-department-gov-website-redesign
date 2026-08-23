"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

const complaints = [
  {
    id: "VVNL-240001",
    priority: "Safety critical",
    priorityType: "critical",
    title: "Sparking / safety hazard",
    description:
      "Live wire sparking near the school gate, heavy sparking every few minutes.",
    date: "22 Aug 2026, 3:02 pm",
    status: "Assigned",
    sla: "SLA breached",
  },
  {
    id: "VVNL-240002",
    priority: "High",
    priorityType: "high",
    title: "Power outage",
    description: "No supply in the entire block since last night.",
    date: "22 Aug 2026, 4:02 am",
    status: "In progress",
    sla: "SLA breached",
  },
  {
    id: "VVNL-240005",
    title: "Street light",
    description: "Street lights on the main road stay off all night.",
    date: "17 Aug 2026, 6:02 pm",
    status: "Closed",
    sla: "SLA met",
  },
  {
    id: "VVNL-240007",
    title: "Voltage fluctuation",
    description: "Severe voltage fluctuation, appliances tripping repeatedly.",
    date: "21 Aug 2026, 2:02 am",
    status: "Assigned",
    sla: "SLA breached",
  },
];

const tabs = [
  "All",
  "Registered",
  "Assigned",
  "In progress",
  "Resolved",
  "Closed",
];

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredComplaints =
    activeTab === "All"
      ? complaints
      : complaints.filter(({ status }) => status === activeTab);

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#171717]">
      <div className="border-b border-[#dedbd5] bg-[#f8f6f1]">
        <div className="mx-auto max-w-[1315px] px-5 py-2.5 text-[13px] text-[#686868]">
          Signed in as{" "}
          <span className="font-semibold text-[#222]">Ramesh Kumar</span>
          <span className="mx-1">·</span>
          Meter 1234567890
        </div>
      </div>

      <section className="mx-auto max-w-[1315px] px-5 pt-8 pb-12">
        <div className="mb-6">
          <p className="mb-1 text-[13px] font-bold tracking-wide text-[#ef5b28] uppercase">
            Complaint History
          </p>

          <h1 className="text-[30px] leading-tight font-bold tracking-tight text-[#111]">
            My complaints
          </h1>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-[14px] font-medium transition ${
                activeTab === tab
                  ? "border-[#171717] bg-[#171717] text-white"
                  : "border-[#d9d6d0] bg-[#fffdfa] text-[#666] hover:text-[#222]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[#ddd9d2] bg-[#fffdfa]">
          {filteredComplaints.length ? (
            filteredComplaints.map((complaint, index) => (
              <div
                key={complaint.id}
                className={`flex min-h-[115px] items-center gap-6 px-5 py-4 ${
                  index !== filteredComplaints.length - 1
                    ? "border-b border-[#dedbd5]"
                    : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="font-mono text-[12px] text-[#888]">
                      {complaint.id}
                    </span>

                    {complaint.priority && (
                      <PriorityBadge
                        type={complaint.priorityType}
                        text={complaint.priority}
                      />
                    )}
                  </div>

                  <h2 className="text-[15px] leading-5 font-semibold text-[#171717]">
                    {complaint.title}
                  </h2>

                  <p className="mt-0.5 text-[13px] leading-5 text-[#626262]">
                    {complaint.description}
                  </p>

                  <p className="mt-0.5 text-[12px] text-[#858585]">
                    Registered {complaint.date}
                  </p>
                </div>

                <div className="flex w-[110px] shrink-0 flex-col items-end justify-center gap-1.5">
                  <StatusBadge status={complaint.status} />

                  <span
                    className={`text-[12px] font-medium ${
                      complaint.sla === "SLA breached"
                        ? "text-[#d63838]"
                        : "text-[#777]"
                    }`}
                  >
                    {complaint.sla}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-[180px] items-center justify-center text-sm text-[#777]">
              No complaints found.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function PriorityBadge({ type, text }) {
  if (type === "critical") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#f8dddd] px-2 py-1 text-[12px] font-semibold text-[#d83d3d]">
        <AlertTriangle size={12} strokeWidth={2.5} />
        {text}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-[#fde1d7] px-2.5 py-1 text-[12px] font-semibold text-[#ef5b2b]">
      {text}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Assigned: "bg-[#e8e7e4] text-[#444]",
    "In progress": "bg-[#fde1d7] text-[#e95b2c]",
    Resolved: "bg-[#dff1e5] text-[#2d7543]",
    Closed: "bg-[#e8e7e4] text-[#666]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[12px] font-medium ${
        styles[status] || "bg-[#e8e7e4] text-[#555]"
      }`}
    >
      {status}
    </span>
  );
}
