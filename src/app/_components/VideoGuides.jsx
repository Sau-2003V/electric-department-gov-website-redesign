"use client";

import { useState } from "react";
import { Search, Play, X, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const allVideos = [
  {
    id: "v1",
    category: "Billing",
    title: "Bijli ka Bill Mobile se Kaise Bhare (Online Payment)",
    description:
      "Step-by-step Hindi tutorial for paying UPPCL/DISCOM electricity bill via mobile portal.",
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
    description:
      "How to track your new connection application and inspection status in real time.",
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
    description:
      "Complete guide to applying for domestic single-phase & three-phase LT electricity connections.",
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
    description:
      "How to register and apply for HT/commercial load above 5kW on the departmental portal.",
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
    description:
      "Learn how to lodge complaints regarding supply outage, low voltage, burnt transformer & meter issues.",
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
    description:
      "Understanding daily meter deductions, emergency credit balance, and instant online recharge.",
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
    description:
      "Decoding kWh (units), kW (maximum demand), Power Factor (PF), and date/time parameters.",
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
    description:
      "Clear explanation of energy units, how units add up to the monthly bill, and how to lower cost.",
    duration: "9:05",
    views: "22.3k views",
    timeAgo: "6 months ago",
    accentColor: "from-blue-900 to-neutral-950",
    hindiTag: "What is a kWh?",
    subTag: "यूनिट व बिलिंग की पूरी जानकारी",
  },
];

const categories = [
  "All",
  "Billing",
  "New Connection",
  "Complaints",
  "Smart Meter",
];

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
    <section
      id="video-guides"
      className="border-hairline bg-canvas w-full border-t px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header & Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-fin-orange text-xs font-medium tracking-wide uppercase">
              Media & Awareness
            </span>
            <h2 className="text-ink mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
              Video Guides
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              className="text-ink-muted absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search video guides..."
              className="border-hairline bg-surface-1 text-ink placeholder-ink-tertiary focus:border-ink w-full rounded-md border py-2 pr-4 pl-10 text-xs font-normal shadow-2xs focus:outline-none"
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
                  : "border-hairline bg-surface-1 text-ink-muted hover:bg-surface-2 hover:text-ink border"
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
              className="group border-hairline bg-surface-1 hover:border-hairline flex cursor-pointer flex-col overflow-hidden rounded-xl border shadow-2xs transition-all duration-150 hover:shadow-xs active:scale-[0.98]"
            >
              {/* Thumbnail Container */}
              <div
                className={cn(
                  "text-inverse-ink relative flex h-40 w-full flex-col justify-between bg-gradient-to-br p-4 outline outline-1 outline-black/10",
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
                  <p className="text-inverse-ink/80 text-xs font-normal">
                    {video.subTag}
                  </p>
                </div>

                {/* Play Button Overlay */}
                <div className="flex items-center justify-between">
                  <span className="text-inverse-ink/70 text-[10px]">
                    DISCOM Official
                  </span>
                  <div className="bg-fin-orange text-on-primary flex h-8 w-8 items-center justify-center rounded-full shadow-xs transition-transform group-hover:scale-110">
                    <Play
                      className="ml-0.5 h-4 w-4 fill-current"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <span className="bg-surface-2 text-ink inline-block rounded-xs px-2 py-0.5 text-[10px] font-medium uppercase">
                    {video.category}
                  </span>
                  <h3 className="text-ink group-hover:text-fin-orange mt-1.5 line-clamp-2 text-xs leading-snug font-medium transition-colors">
                    {video.title}
                  </h3>
                </div>

                <div className="border-hairline-soft text-ink-muted mt-3 flex items-center justify-between border-t pt-2.5 text-xs">
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
          <div className="border-hairline bg-surface-1 text-ink-muted rounded-xl border p-8 text-center text-xs">
            No video guides found matching your search. Try another query or
            category.
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="border-inverse-surface-1 bg-inverse-canvas text-inverse-ink relative w-full max-w-2xl rounded-xl border p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="text-inverse-ink-muted hover:bg-inverse-surface-1 hover:text-inverse-ink absolute top-4 right-4 rounded-md p-1.5 active:scale-[0.96]"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div
              className={cn(
                "mt-4 flex h-64 w-full flex-col items-center justify-center rounded-lg bg-gradient-to-br p-6 text-center outline outline-1 outline-white/10",
                selectedVideo.accentColor
              )}
            >
              <div className="bg-fin-orange text-on-primary flex h-16 w-16 animate-pulse items-center justify-center rounded-full shadow-lg">
                <Play className="ml-1 h-8 w-8 fill-current" strokeWidth={2} />
              </div>
              <p className="mt-4 text-xl font-bold">{selectedVideo.hindiTag}</p>
              <p className="text-inverse-ink/80 text-sm">
                {selectedVideo.title}
              </p>
              <span className="mt-2 rounded-md bg-black/50 px-3 py-1 font-mono text-xs">
                Duration: {selectedVideo.duration}
              </span>
            </div>

            <div className="mt-4">
              <span className="bg-fin-orange/20 text-fin-orange rounded-xs px-2 py-0.5 text-xs font-medium uppercase">
                {selectedVideo.category}
              </span>
              <h3 className="mt-2 text-base font-medium">
                {selectedVideo.title}
              </h3>
              <p className="text-inverse-ink-muted mt-1 text-xs">
                {selectedVideo.description}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="bg-surface-1 text-ink hover:bg-surface-2 rounded-md px-5 py-2 text-xs font-medium active:scale-[0.96]"
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
