"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const outages = [
  {
    area: "Gomti Nagar Sector 4",
    description: "Planned maintenance of the 33/11 kV feeder.",
    location: "Lucknow Central",
    type: "planned",
    status: "scheduled",
    start: "24 Aug 2026, 7:06 am",
    end: "24 Aug 2026, 11:06 am",
  },
  {
    area: "Alambagh Ward 6",
    description: "Cable fault under repair, restoration expected shortly.",
    location: "Lucknow South",
    type: "unplanned",
    status: "ongoing",
    start: "23 Aug 2026, 8:06 am",
    end: "23 Aug 2026, 12:06 pm",
  },
  {
    area: "Aminabad Market",
    description: "Transformer fuse blown, supply restored.",
    location: "Lucknow South",
    type: "unplanned",
    status: "restored",
    start: "22 Aug 2026, 5:06 am",
    end: "22 Aug 2026, 9:06 am",
  },
];

const tabs = ["All", "Planned", "Unplanned"];

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredOutages =
    activeTab === "All"
      ? outages
      : outages.filter((item) => item.type === activeTab.toLowerCase());

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

      <section className="mx-auto max-w-[1315px] px-5 py-8">
        <div className="mb-6">
          <p className="mb-1 text-[13px] font-bold uppercase tracking-wide text-[#ef5b28]">
            Supply Status
          </p>

          <h1 className="text-[30px] font-bold leading-none tracking-tight">
            Outages
          </h1>

          <p className="mt-2 text-[14px] text-[#777]">
            Areas currently affected and scheduled maintenance windows.
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-[14px] font-medium ${
                activeTab === tab
                  ? "border-[#171717] bg-[#171717] text-white"
                  : "border-[#d9d6d0] bg-[#fffdfa] text-[#666]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="flex flex-col gap-3">
            {filteredOutages.map((outage) => (
              <OutageCard key={outage.area} outage={outage} />
            ))}
          </div>

          <div className="rounded-[18px] border border-[#ddd9d2] bg-[#fffdfa] p-5">
            <h2 className="mb-4 text-[14px] font-bold text-[#222]">
              OUTAGE MAP
            </h2>

            <div className="rounded-[16px] bg-[#f5f3ef] p-3.5">
              <MapLocation name="Lucknow Central" />
              <MapLocation name="Lucknow South" />
            </div>

            <p className="mt-3 text-[13px] leading-5 text-[#777]">
              A live geographic map is planned once the outage management
              system feed is connected.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function OutageCard({ outage }) {
  const statusStyles = {
    scheduled: "bg-[#fde1d7] text-[#ef5b2b]",
    ongoing: "bg-[#f8dddd] text-[#d43c45]",
    restored: "bg-[#d8f3e4] text-[#26734a]",
  };

  return (
    <div className="rounded-[18px] border border-[#ddd9d2] bg-[#fffdfa] px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[15px] font-semibold text-[#222]">
          {outage.area}
        </h2>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${statusStyles[outage.status]}`}
        >
          {outage.status}
        </span>
      </div>

      <p className="mt-3 text-[14px] text-[#666]">
        {outage.description}
      </p>

      <p className="mt-2 text-[12px] text-[#777]">
        {outage.location} · {outage.type} · {outage.start} → {outage.end}
      </p>
    </div>
  );
}

function MapLocation({ name }) {
  return (
    <div className="flex items-center justify-between rounded-[13px] border border-[#ddd9d2] bg-[#fffdfa] px-4 py-3">
      <div className="flex items-center gap-2">
        <MapPin size={17} className="text-[#ef5b2b]" />
        <span className="text-[14px] font-medium text-[#444]">{name}</span>
      </div>

      <span className="text-[12px] font-semibold text-[#d43c45]">
        1 active
      </span>
    </div>
  );
}