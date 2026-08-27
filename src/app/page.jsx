import { createAdminClient } from "@/database/supabase/admin";
import TopHeader from "./_components/TopHeader";
import Hero from "./_components/Hero";
import ComplaintAnalytics from "./_components/ComplaintAnalytics";
import LiveComplaintsSection from "./_components/LiveComplaintsSection";
import QuickServices from "./_components/QuickServices";
import ConsumerCorner from "./_components/ConsumerCorner";
import VideoGuides from "./_components/VideoGuides";
import LatestUpdates from "./_components/LatestUpdates";
import SiteDetails from "./_components/SiteDetails";
import HelplineBar from "./_components/HelplineBar";
import Footer from "./_components/Footer";

// ponytail: ISR 4 h; upgrade to on-demand revalidatePath when admin CMS panel ships
export const revalidate = 14400;

export const metadata = {
  title:
    "Vidhyut Portal — Electric Department Grievance & Consumer Services (Demo)",
  description:
    "Simulated electricity complaint registration, real-time tracking, and consumer services prototype. Register a complaint online or use the demo helpdesk.",
};

/* ── DB enum → display label maps ──────────────────────────────────────── */
const STATUS_LABEL = {
  registered: "Registered",
  assigned: "Assigned",
  in_progress: "In progress",
  resolved: "Resolved",
  closed: "Closed",
};

const PRIORITY_LABEL = {
  normal: "Low",
  high: "High",
  critical: "Safety critical",
};

/* ── Fallback shape returned when DB is unreachable ─────────────────────── */
const EMPTY_ANALYTICS = {
  todayCount: 0,
  todayDelta: "",
  staffActive: 0,
  statusDist: [
    { label: "Resolved", value: 0, color: "bg-ink", stroke: "#111111" },
    {
      label: "In progress",
      value: 0,
      color: "bg-muted-text",
      stroke: "#6b7280",
    },
    {
      label: "Pending",
      value: 100,
      color: "bg-surface-strong",
      stroke: "#e5e7eb",
    },
  ],
  categoryData: [],
  trendPoints: Array(7).fill(0),
};

/* ── Single server-side fetch — 8 parallel queries ──────────────────────── */
async function fetchHomeData() {
  try {
    const db = createAdminClient();

    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);

    const yesterdayUTC = new Date(todayUTC);
    yesterdayUTC.setUTCDate(yesterdayUTC.getUTCDate() - 1);

    const sevenDaysAgo = new Date(todayUTC);
    sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 6);

    const thirtyDaysAgo = new Date(todayUTC);
    thirtyDaysAgo.setUTCDate(thirtyDaysAgo.getUTCDate() - 29);

    const [
      { count: todayCount },
      { count: yesterdayCount },
      { count: staffActive },
      { data: statusRows },
      { data: categoryRows },
      { data: trendRows },
      { data: rawComplaints },
      { data: rawNotices },
    ] = await Promise.all([
      // 1. Today's complaint count
      db
        .from("complaints")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayUTC.toISOString()),

      // 2. Yesterday's complaint count (for delta)
      db
        .from("complaints")
        .select("id", { count: "exact", head: true })
        .gte("created_at", yesterdayUTC.toISOString())
        .lt("created_at", todayUTC.toISOString()),

      // 3. Active staff
      db
        .from("staff")
        .select("id", { count: "exact", head: true })
        .eq("is_available", true),

      // 4. Status distribution — last 30 days
      db
        .from("complaints")
        .select("status")
        .gte("created_at", thirtyDaysAgo.toISOString()),

      // 5. Issue category counts — today only
      db
        .from("complaints")
        .select("issue")
        .gte("created_at", todayUTC.toISOString()),

      // 6. 7-day sparkline timestamps
      db
        .from("complaints")
        .select("created_at")
        .gte("created_at", sevenDaysAgo.toISOString()),

      // 7. Live complaints feed — last 20
      db
        .from("complaints")
        .select(
          "id, issue, description, created_at, status, priority, location, address"
        )
        .order("created_at", { ascending: false })
        .limit(20),

      // 8. Latest public notices — all public records regardless of status
      db
        .from("outage_notices")
        .select("id, title, sub_type, category, status, priority, updated_at")
        .eq("is_public", true)
        .order("updated_at", { ascending: false })
        .limit(5),
    ]);

    /* ── Derive analytics values ─────────────────────────────────────── */

    // Status distribution (donut)
    const sc = {};
    for (const r of statusRows ?? []) sc[r.status] = (sc[r.status] ?? 0) + 1;
    const stTotal = Object.values(sc).reduce((a, v) => a + v, 0) || 1;
    const stResolved = (sc.resolved ?? 0) + (sc.closed ?? 0);
    const stInProgress = sc.in_progress ?? 0;
    const stPending = stTotal - stResolved - stInProgress;
    const statusDist = [
      {
        label: "Resolved",
        value: +((stResolved / stTotal) * 100).toFixed(1),
        color: "bg-ink",
        stroke: "#111111",
      },
      {
        label: "In progress",
        value: +((stInProgress / stTotal) * 100).toFixed(1),
        color: "bg-muted-text",
        stroke: "#6b7280",
      },
      {
        label: "Pending",
        value: +((stPending / stTotal) * 100).toFixed(1),
        color: "bg-surface-strong",
        stroke: "#e5e7eb",
      },
    ];

    // Top-5 issue categories today
    const cc = {};
    for (const r of categoryRows ?? []) cc[r.issue] = (cc[r.issue] ?? 0) + 1;
    const topCats = Object.entries(cc)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const maxCat = topCats[0]?.[1] ?? 1;
    const categoryData = topCats.map(([label, count]) => ({
      label,
      count,
      max: maxCat,
    }));

    // 7-day sparkline (index 0 = 6 days ago, index 6 = today)
    const dc = {};
    for (const r of trendRows ?? []) {
      const day = r.created_at.slice(0, 10);
      dc[day] = (dc[day] ?? 0) + 1;
    }
    const trendPoints = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sevenDaysAgo);
      d.setUTCDate(d.getUTCDate() + i);
      return dc[d.toISOString().slice(0, 10)] ?? 0;
    });

    // Today vs yesterday delta string
    const today = todayCount ?? 0;
    const yesterday = yesterdayCount ?? 0;
    const todayDelta =
      yesterday > 0
        ? `${today >= yesterday ? "+" : ""}${Math.round(((today - yesterday) / yesterday) * 100)}% vs yesterday`
        : "";

    /* ── Shape complaints for live feed ──────────────────────────────── */
    const fmt = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const complaints = (rawComplaints ?? []).map((c) => ({
      // ponytail: short ID until /complaints/[id] detail page ships; ceiling = full UUID routing
      id: `#${c.id.slice(0, 8).toUpperCase()}`,
      _uuid: c.id,
      title: c.issue,
      description: c.description ?? "",
      date: fmt.format(new Date(c.created_at)),
      status: STATUS_LABEL[c.status] ?? c.status,
      priority: PRIORITY_LABEL[c.priority] ?? "Low",
      // ponytail: skip c.location — it's a coord string ("12.34° N, …"); use plain address only
      category: c.address ?? "",
      sla: null, // ponytail: SLA needs resolved_at timestamp; not in schema yet
    }));

    /* ── Shape notices ───────────────────────────────────────────────── */
    const notices = (rawNotices ?? []).map((n) => {
      const d = new Date(n.updated_at);
      // Derive a human-readable badge from the category enum
      const badgeLabel =
        {
          notice: "Notice",
          outage: "Outage",
          tender: "Tender",
          advisory: "Advisory",
          circular: "Circular",
        }[n.category] ??
        n.category ??
        "Notice";

      return {
        day: String(d.getUTCDate()).padStart(2, "0"),
        month: d.toLocaleString("en-US", { month: "short" }),
        title: n.title,
        category: n.sub_type ?? badgeLabel,
        badge: badgeLabel,
        status: n.status,
        priority: n.priority,
        href: "/notices",
        count: null,
      };
    });

    return {
      analyticsData: {
        todayCount: today,
        todayDelta,
        staffActive: staffActive ?? 0,
        statusDist,
        categoryData,
        trendPoints,
      },
      complaints,
      notices,
    };
  } catch (err) {
    console.error("[fetchHomeData]", err?.message ?? err);
    return { analyticsData: EMPTY_ANALYTICS, complaints: [], notices: [] };
  }
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default async function Home() {
  const { analyticsData, complaints, notices } = await fetchHomeData();

  return (
    <div className="bg-canvas text-ink selection:bg-primary selection:text-on-primary flex min-h-screen flex-col">
      {/* Accessibility bar + sticky nav */}
      <TopHeader />

      <main className="flex-1">
        {/* 1. Complaint registration hub + emergency contacts */}
        <Hero />
        <QuickServices />

        {/* 2. Real-time analytics dashboard — status charts & KPIs */}
        <ComplaintAnalytics data={analyticsData} />

        {/* 3. Live filterable complaints feed */}
        <LiveComplaintsSection initialComplaints={complaints} />

        {/* 4. Full consumer services directory */}
        <ConsumerCorner />

        {/* 5. Citizen tutorial videos */}
        <VideoGuides />

        {/* 6. Notices, tenders & regulatory updates */}
        <LatestUpdates notices={notices} />

        {/* 7. Statutory directory */}
        <SiteDetails />

        {/* 8. Contact bar */}
        <HelplineBar />
      </main>

      <Footer />
    </div>
  );
}
