import {
  HelpHeader,
  ContactGrid,
  FaqSection,
  PlannedChannelsNotice,
} from "./components";

export const metadata = {
  title: "Help & Emergency Support · VVNL Portal",
  description:
    "24×7 emergency helpline, consumer support contacts, and frequently asked questions for VVNL consumers.",
};

export default function HelpPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        {/* Page Header with Action CTAs */}
        <HelpHeader />

        {/* 4 Contact Cards Grid */}
        <ContactGrid />

        {/* Interactive FAQ Accordion */}
        <FaqSection />
      </div>
    </div>
  );
}
