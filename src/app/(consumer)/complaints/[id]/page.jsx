// Server Component — no "use client"
// force-static: Next.js prerenders the shell at build time.
// Data fetches client-side inside ComplaintDetailClient.
export const dynamic = "force-static";

import { ComplaintDetailClient } from "./_components";

export default function ComplaintDetailPage() {
  return <ComplaintDetailClient />;
}
