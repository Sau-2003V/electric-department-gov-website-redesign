// Server Component — no "use client"
// force-static: Next.js prerenders the shell at build time.
// Data fetches client-side inside ComplaintDetailClient.
export const dynamic = "force-static";

import { ComplaintDetailClient } from "./_components";

export const metadata = {
  title: "Complaint Details & Live Tracking · Vidhyut Portal",
  description:
    "View real-time status updates, field engineer assignment, evidence attachments, and resolution timeline for your registered complaint.",
};

export default function ComplaintDetailPage() {
  return <ComplaintDetailClient />;
}
