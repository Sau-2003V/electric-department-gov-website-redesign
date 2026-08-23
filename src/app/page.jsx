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

export const metadata = {
  title: "Vidhyut Portal — Electric Department Grievance & Consumer Services",
  description:
    "Official electricity complaint registration, real-time tracking, bill payment, and consumer services for UP DISCOM consumers. Register a complaint online or call 1912.",
};

export default function Home() {
  return (
    <div className="bg-canvas text-ink selection:bg-fin-orange selection:text-on-primary flex min-h-screen flex-col">
      {/* Accessibility bar + sticky nav */}
      <TopHeader />

      <main className="flex-1">
        {/* 1. Complaint registration hub + emergency contacts */}
        <Hero />
        <QuickServices />

        {/* 2. Real-time analytics dashboard — status charts & KPIs */}
        <ComplaintAnalytics />

        {/* 3. Live filterable complaints feed */}
        <LiveComplaintsSection />

        {/* 4. Quick action cards — bill, connection, outages, OTS */}

        {/* 5. Full consumer services directory */}
        <ConsumerCorner />

        {/* 6. Citizen tutorial videos */}
        <VideoGuides />

        {/* 7. Notices, tenders & regulatory updates */}
        <LatestUpdates />

        {/* 8. Statutory & statutory directory */}
        <SiteDetails />

        {/* 9. Contact bar */}
        <HelplineBar />
      </main>

      <Footer />
    </div>
  );
}
