"use client";

import { useState } from "react";
import { Search, Play, X, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const allVideos = [
  {
    id: "v1",
    category: "Billing",
    title: "Bijli ka Bill Mobile se Kaise Bhare (Online Payment)",
    description: "Step-by-step Hindi tutorial for paying UPPCL/DISCOM electricity bill via mobile portal.",
    duration: "4:12",
    views: "12.4k views",
    timeAgo: "2 weeks ago",
    accentColor: "from-amber-700 to-orange-900",
    hindiTag: "बिजली का बिल मोबाइल से",
    subTag: "घर बैठे 2 मिनट में",
  },
  {
    id: "v2",
    category: "Status",
    title: "UPPCL New Connection Status Check Online (Jhatpat)",
    description: "How to track your new connection application and inspection status in real time.",
    duration: "5:45",
    views: "8.1k views",
    timeAgo: "1 month ago",
    accentColor: "from-blue-800 to-slate-950",
    hindiTag: "UPPCL स्थिति जाने",
    subTag: "आवेदन की स्थिति ऑनलाइन",
  },
  {
    id: "v3",
    category: "New Connection",
    title: "Jhatpat Portal Electricity Connection Apply Online",
    description: "Complete guide to applying for domestic single-phase & three-phase LT electricity connections.",
    duration: "8:20",
    views: "45.2k views",
    timeAgo: "3 months ago",
    accentColor: "from-emerald-800 to-teal-950",
    hindiTag: "नया बिजली कनेक्शन 2024",
    subTag: "Step by Step आवेदन",
  },
  {
    id: "v4",
    category: "New Connection",
    title: "Commercial & Industrial Load Application Tutorial",
    description: "How to register and apply for HT/commercial load above 5kW on the departmental portal.",
    duration: "6:15",
    views: "6.7k views",
    timeAgo: "2 weeks ago",
    accentColor: "from-neutral-800 to-neutral-950",
    hindiTag: "Jhatpat Portal Commercial",
    subTag: "औद्योगिक / व्यावसायिक कनेक्शन",
  },
  {
    id: "v5",
    category: "Complaints",
    title: "How to Register & Track Complaints on 1912 Helpline",
    description: "Learn how to lodge complaints regarding supply outage, low voltage, burnt transformer & meter issues.",
    duration: "3:50",
    views: "19.8k views",
    timeAgo: "4 months ago",
    accentColor: "from-purple-900 to-slate-950",
    hindiTag: "1912 पर शिकायत",
    subTag: "24x7 टोल फ्री सेवा",
  },
  {
    id: "v6",
    category: "Smart Meter",
    title: "Prepaid vs Postpaid Smart Meter Recharge Guide",
    description: "Understanding daily meter deductions, emergency credit balance, and instant online recharge.",
    duration: "7:10",
    views: "31.5k views",
    timeAgo: "1 month ago",
    accentColor: "from-rose-900 to-neutral-950",
    hindiTag: "प्रीपेड स्मार्ट मीटर गाइड",
    subTag: "बैलेंस एवं रिचार्ज कैसे करें",
  },
  {
    id: "v7",
    category: "Smart Meter",
    title: "How to Read Your Digital Electricity Meter Step by Step",
    description: "Decoding kWh (units), kW (maximum demand), Power Factor (PF), and date/time parameters.",
    duration: "5:30",
    views: "54.1k views",
    timeAgo: "5 months ago",
    accentColor: "from-cyan-900 to-slate-950",
    hindiTag: "How to Read Meter",
    subTag: "डिजिटल मीटर रीडिंग सीखें",
  },
  {
    id: "v8",
    category: "Billing",
    title: "What is a kWh / Connected Load Calculation Guide",
    description: "Clear explanation of energy units, how units add up to the monthly bill, and how to lower cost.",
    duration: "9:05",
    views: "22.3k views",
    timeAgo: "6 months ago",
    accentColor: "from-blue-900 to-neutral-950",
    hindiTag: "What is a kWh?",
    subTag: "यूनिट व बिलिंग की पूरी जानकारी",
  },
];

const categories = ["All", "Billing", "New Connection", "Complaints", "Smart Meter"];

export default function VideoGuides() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = allVideos.filter((v) => {
    const matchesTab =
      activeTab === "All" ||
      v.category.toLowerCase() === activeTab.toLowerCase() ||
      (activeTab === "New Connection" && v.category === "New Connection");
    const matchesQuery =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <section className="w-full border-t border-hairline bg-canvas px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header & Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-medium tracking-wide text-fin-orange uppercase">
              Media & Awareness
            </span>
            <h2 className="mt-1 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Video Guides
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search video guides..."
              className="w-full rounded-md border border-hairline bg-surface-1 py-2 pr-4 pl-10 text-xs font-normal text-ink placeholder-ink-tertiary shadow-2xs focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={cn(
                "cursor-pointer rounded-md px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.96]",
                activeTab === cat
                  ? "bg-ink text-on-primary shadow-xs"
                  : "border border-hairline bg-surface-1 text-ink-muted hover:bg-surface-2 hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid (4 columns) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-2xs transition-all duration-150 hover:border-hairline hover:shadow-xs active:scale-[0.98]"
            >
              {/* Thumbnail Container */}
              <div
                className={cn(
                  "relative flex h-40 w-full flex-col justify-between p-4 bg-gradient-to-br text-inverse-ink outline outline-1 outline-black/10",
                  video.accentColor
                )}
              >
                {/* Header overlay */}
                <div className="flex items-start justify-between">
                  <span className="rounded-xs bg-black/50 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase backdrop-blur-xs">
                    {video.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-xs bg-black/50 px-1.5 py-0.5 font-mono text-[10px] font-medium backdrop-blur-xs">
                    <Clock className="h-3 w-3" strokeWidth={1.5} />
                    {video.duration}
                  </span>
                </div>

                <div className="my-auto text-center">
                  <p className="text-base font-bold tracking-tight drop-shadow-xs">
                    {video.hindiTag}
                  </p>
                  <p className="text-xs font-normal text-inverse-ink/80">
                    {video.subTag}
                  </p>
                </div>

                {/* Play Button Overlay */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-inverse-ink/70">DISCOM Official</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fin-orange text-on-primary shadow-xs transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <span className="inline-block rounded-xs bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-ink uppercase">
                    {video.category}
                  </span>
                  <h3 className="mt-1.5 text-xs font-medium leading-snug text-ink transition-colors group-hover:text-fin-orange line-clamp-2">
                    {video.title}
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-hairline-soft pt-2.5 text-xs text-ink-muted">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" strokeWidth={1.5} />
                    {video.views}
                  </span>
                  <span>{video.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="rounded-xl border border-hairline bg-surface-1 p-8 text-center text-xs text-ink-muted">
            No video guides found matching your search. Try another query or category.
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-xl border border-inverse-surface-1 bg-inverse-canvas p-6 text-inverse-ink shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 rounded-md p-1.5 text-inverse-ink-muted hover:bg-inverse-surface-1 hover:text-inverse-ink active:scale-[0.96]"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div
              className={cn(
                "mt-4 flex h-64 w-full flex-col items-center justify-center rounded-lg bg-gradient-to-br p-6 text-center outline outline-1 outline-white/10",
                selectedVideo.accentColor
              )}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fin-orange text-on-primary shadow-lg animate-pulse">
                <Play className="ml-1 h-8 w-8 fill-current" strokeWidth={2} />
              </div>
              <p className="mt-4 text-xl font-bold">{selectedVideo.hindiTag}</p>
              <p className="text-sm text-inverse-ink/80">{selectedVideo.title}</p>
              <span className="mt-2 rounded-md bg-black/50 px-3 py-1 font-mono text-xs">
                Duration: {selectedVideo.duration}
              </span>
            </div>

            <div className="mt-4">
              <span className="rounded-xs bg-fin-orange/20 px-2 py-0.5 text-xs font-medium text-fin-orange uppercase">
                {selectedVideo.category}
              </span>
              <h3 className="mt-2 text-base font-medium">{selectedVideo.title}</h3>
              <p className="mt-1 text-xs text-inverse-ink-muted">{selectedVideo.description}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="rounded-md bg-surface-1 px-5 py-2 text-xs font-medium text-ink hover:bg-surface-2 active:scale-[0.96]"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
