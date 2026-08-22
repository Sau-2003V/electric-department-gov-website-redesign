"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Search,
  Filter,
  ArrowRight,
  PhoneCall,
  Scale,
  ShieldCheck,
  Building2,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { STATUTORY_AUTHORITIES } from "@/lib/complaints-data";

export default function ConsumerComplaintsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const mockComplaints = [
    {
      id: "UP-DISCOM-2026-89421",
      category: "Supply Quality & Outages",
      title: "Frequent power cuts / unscheduled load shedding",
      registeredOn: "22 Aug 2026, 04:15 PM",
      status: "In Progress",
      statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
      urgency: "High",
      urgencyBadge: "bg-orange-50 text-orange-700 border-orange-200",
      authority: "DISCOM (Sub-Division SDO / Breakdown Team)",
      escalation: "CGRF Lucknow Bench",
      slaTarget: "4 Hours (Urban SOP Standard)",
      address: "12/3 Gomti Nagar, Lucknow 226010",
      notes:
        "Field lineman assigned: Vinod Kumar (Crew ID #412). Line patrolling active.",
    },
    {
      id: "UP-DISCOM-2026-77291",
      category: "Billing Issues",
      title: "Inflated electricity bill with wrong tariff multiplier",
      registeredOn: "18 Aug 2026, 11:30 AM",
      status: "Under Review",
      statusBadge: "bg-purple-50 text-purple-700 border-purple-200",
      urgency: "Medium",
      urgencyBadge: "bg-blue-50 text-blue-700 border-blue-200",
      authority: "DISCOM (Revenue Officer / Commercial Desk)",
      escalation: "CGRF Tier-2",
      slaTarget: "7 Days",
      address: "B-42 Sector 4, Gomti Nagar, Lucknow",
      notes:
        "Meter reading audit requested. Reading log file verified with photo image.",
    },
    {
      id: "UP-DISCOM-2026-51204",
      category: "Meter Problems",
      title: "Faulty / Burnt meter replacement request",
      registeredOn: "10 Aug 2026, 02:45 PM",
      status: "Resolved",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      urgency: "High",
      urgencyBadge: "bg-orange-50 text-orange-700 border-orange-200",
      authority: "DISCOM (Meter & Testing Division)",
      escalation: "Closed Satisfactorily",
      slaTarget: "Completed in 22 Hours",
      address: "Flat 302, Royal Residency, Gomti Nagar",
      notes:
        "New Smart Meter #SM-902148 installed and synchronized with cloud billing.",
    },
  ];

  const filtered = mockComplaints.filter((item) => {
    const matchesStatus =
      filterStatus === "all" ||
      item.status.toLowerCase().replace(" ", "-") === filterStatus;
    const matchesQuery =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner with Stats & CTA */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e6e2dc] bg-white p-6 shadow-sm sm:p-8 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#ff5600] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5600]"></span>
            CONSUMER GRIEVANCE DESK
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Complaints & Service Redressal
          </h1>
          <p className="mt-1 max-w-xl text-xs text-gray-600 sm:text-sm">
            Track active dockets, review Standard of Performance (SOP)
            resolution SLA timelines, or register a new grievance.
          </p>
        </div>

        <Link
          href="/complaints/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#ff5600] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#ff5600]/30 transition-all hover:bg-[#e04c00]"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Register New Complaint</span>
        </Link>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Active Grievances",
            value: "2",
            color: "text-[#ff5600]",
            bg: "bg-orange-50",
          },
          {
            label: "Under Investigation",
            value: "1",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Resolved This Year",
            value: "14",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Guaranteed SLA Rate",
            value: "98.4%",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-[#e6e2dc] bg-white p-4 shadow-sm"
          >
            <span className="text-xs font-semibold text-gray-500">
              {stat.label}
            </span>
            <div className={`mt-1 text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#e6e2dc] bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative w-full sm:w-80">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search docket number, issue, or keyword..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-xs focus:ring-2 focus:ring-[#ff5600] focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex w-full items-center gap-1.5 overflow-x-auto sm:w-auto">
          {[
            { id: "all", label: "All Grievances" },
            { id: "in-progress", label: "In Progress" },
            { id: "under-review", label: "Under Review" },
            { id: "resolved", label: "Resolved" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                filterStatus === tab.id
                  ? "bg-[#111111] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List Cards */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="space-y-4 rounded-3xl border border-[#e6e2dc] bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            {/* Header row */}
            <div className="flex flex-col justify-between gap-3 border-b border-gray-100 pb-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-xs font-bold text-[#ff5600]">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">
                      {item.id}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.statusBadge}`}
                    >
                      {item.status}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.urgencyBadge}`}
                    >
                      {item.urgency} Urgency
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-gray-500">
                    Registered on: {item.registeredOn}
                  </div>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="block text-[10px] font-semibold text-gray-400 uppercase">
                  Target SLA
                </span>
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  {item.slaTarget}
                </span>
              </div>
            </div>

            {/* Grievance Details */}
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-gray-600">{item.notes}</p>
            </div>

            {/* Meta tags & Routing Info */}
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-gray-200/80 bg-gray-50/70 p-3.5 pt-2 text-xs text-gray-700 sm:grid-cols-3">
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">
                  Primary Authority
                </span>
                <span className="mt-0.5 flex items-center gap-1 font-semibold text-gray-900">
                  <Building2 className="h-3.5 w-3.5 text-[#ff5600]" />
                  {item.authority}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">
                  Escalation Channel
                </span>
                <span className="mt-0.5 flex items-center gap-1 font-semibold text-purple-800">
                  <Scale className="h-3.5 w-3.5 text-purple-600" />
                  {item.escalation}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">
                  Fault Address
                </span>
                <span className="mt-0.5 flex items-center gap-1 truncate font-medium text-gray-700">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  {item.address}
                </span>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between pt-1">
              <span className="flex items-center gap-1 text-[11px] text-gray-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Regulated under SOP Redressal Code
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href="/complaints/new"
                  className="flex items-center gap-1 text-xs font-bold text-[#ff5600] hover:underline"
                >
                  <span>Re-open / Escalate to CGRF</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statutory 4-Tier Redressal Hierarchy Explainer */}
      <div className="space-y-6 rounded-3xl border border-[#e6e2dc] bg-white p-6 shadow-sm sm:p-8">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#ff5600] uppercase">
            <Scale className="h-4 w-4" />
            STATUTORY REDRESSAL HIERARCHY
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Consumer Grievance Redressal Architecture
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            If your grievance is not resolved by the DISCOM Sub-division within
            the Standard of Performance (SOP) timeline, you are legally entitled
            to escalate through the statutory quasi-judicial framework under the
            Electricity Act, 2003.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATUTORY_AUTHORITIES.map((tier) => (
            <div
              key={tier.tier}
              className="flex flex-col justify-between space-y-3 rounded-2xl border border-[#e2ddd5] bg-[#f5f1ec]/60 p-4"
            >
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-[#ff5600] uppercase">
                    {tier.tier}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 text-[9px] font-semibold ${tier.badgeColor}`}
                  >
                    {tier.badge}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-gray-900">{tier.name}</h3>
                <p className="mt-1 text-[11px] text-gray-600">{tier.scope}</p>
              </div>

              <div className="border-t border-[#e2ddd5] pt-2 text-[10px] font-bold text-emerald-800">
                Time Limit: {tier.timeLimit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
