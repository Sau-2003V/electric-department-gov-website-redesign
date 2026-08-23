import TopHeader from "./_components/TopHeader";
import Hero from "./_components/Hero";
import QuickServices from "./_components/QuickServices";
import ConsumerCorner from "./_components/ConsumerCorner";
import VideoGuides from "./_components/VideoGuides";
import LatestUpdates from "./_components/LatestUpdates";
import SiteDetails from "./_components/SiteDetails";
import HelplineBar from "./_components/HelplineBar";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink selection:bg-fin-orange selection:text-on-primary">
      {/* 1. Header with Language & Accessibility Controls */}
      <TopHeader />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        <Hero />
        <QuickServices />
        <ConsumerCorner />
        <VideoGuides />
        <LatestUpdates />
        <SiteDetails />
        <HelplineBar />
      </main>

      {/* 3. Full Corporate Footer */}
      <Footer />
    </div>
  );
}
