import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Backlog", value: "48", trend: "-12%" },
  { label: "Completed", value: "126", trend: "+9%" },
  { label: "Pending review", value: "24", trend: "-3" },
  { label: "Escalations", value: "7", trend: "+2" },
];

const requests = [
  {
    id: "SR-1164",
    issue: "Streetlight outage",
    zone: "North Wing",
    status: "Queued",
  },
  {
    id: "SR-1168",
    issue: "Line fault",
    zone: "Central Market",
    status: "Inspecting",
  },
  {
    id: "SR-1173",
    issue: "Meter issue",
    zone: "Riverside",
    status: "Resolved",
  },
];

export default function SubdivisionSection() {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="text-3xl font-semibold text-slate-900">
                  {item.value}
                </span>
                <span className="text-xs font-semibold text-emerald-700">
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
