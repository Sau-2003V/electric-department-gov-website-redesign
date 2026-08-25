import DashboardHeader from "./_components/DashboardHeader";
import SubdivisionSection from "./_components/SubdivisionSection";
import OutageAlert from "./_components/OutageAlert";
import RecentComplaints from "./_components/RecentComplaints";
import RecentNotices from "./_components/RecentNotices";
import { getUser } from "@/database/query/getUser";

export async function generateMetadata() {
  const user = await getUser();

  const appMetadata = user?.app_metadata || user?.raw_app_meta_data || {};

  const name =
    appMetadata.name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Consumer";

  const meterNumber =
    appMetadata.meter_number || user?.user_metadata?.meter_number || null;

  const title = meterNumber
    ? `Dashboard — ${name} (${meterNumber}) · VVNL Portal`
    : `Dashboard — ${name} · VVNL Portal`;

  const description = meterNumber
    ? `Welcome back, ${name}. View your electricity usage, bills, complaints and notices for meter ${meterNumber}.`
    : `Welcome back, ${name}. View your electricity usage, bills, recent complaints and notices on the VVNL Consumer Portal.`;

  return {
    title,
    description,
  };
}

export default function DashboardPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:space-y-8 sm:px-6">
        {/* Greeting + quick stats (client component — fetches user itself) */}
        <DashboardHeader />

        {/* Outage banner — full width */}
        <OutageAlert />

        {/* Subdivision contacts — full width */}
        <SubdivisionSection />

        {/* Complaints + Notices — side-by-side on large screens */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentComplaints />
          <RecentNotices />
        </div>
      </div>
    </div>
  );
}
