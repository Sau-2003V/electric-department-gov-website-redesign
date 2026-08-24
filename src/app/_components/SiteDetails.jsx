import Link from "next/link";
import { Zap, ExternalLink } from "lucide-react";

const statutoryColumns = [
  {
    title: "Important Portals & Links",
    links: [
      { label: "UPPCL Official Portal", href: "https://www.upenergy.in" },
      { label: "Paschimanchal DISCOM (PVVNL)", href: "https://pvvnl.org" },
      { label: "Dakshinanchal DISCOM (DVVNL)", href: "https://dvvnl.org" },
      { label: "Madhyanchal DISCOM (MVVNL)", href: "https://mvvnl.in" },
      { label: "Purvanchal DISCOM (PuVVNL)", href: "https://puvvnl.up.gov.in" },
      { label: "UPPTCL Transmission", href: "https://upptcl.org" },
    ],
  },
  {
    title: "General Information",
    links: [
      { label: "Citizen's Charter", href: "/charter" },
      { label: "Consumer Grievance Cell", href: "/complaints" },
      { label: "RTI Cell & Officers", href: "/rti" },
      { label: "Whistle Blower Policy", href: "/policy" },
      { label: "Tariff Orders & Directives", href: "/tariff" },
      { label: "Safety SOPs & Guidelines", href: "/safety" },
    ],
  },
  {
    title: "Consumer Help Desk",
    links: [
      { label: "1912 24x7 Helpline", href: "/contact" },
      { label: "Online Chat & Support", href: "/contact" },
      { label: "Bill & Tariff Calculator", href: "/calculator" },
      { label: "Energy Conservation Guide", href: "/energy-tips" },
      { label: "Smart Metering FAQs", href: "/smart-meter" },
      { label: "Payment Channels (BBPS)", href: "/bill/pay" },
    ],
  },
  {
    title: "Statutory Audit",
    links: [
      { label: "Annual Financial Statements", href: "/audit" },
      { label: "Statutory Auditor Reports", href: "/audit" },
      { label: "Compliance Filings", href: "/compliance" },
      { label: "CAG Audit Statements", href: "/audit" },
      { label: "Discom Board Resolutions", href: "/corporate" },
      { label: "Regulatory Petitions", href: "/notices" },
    ],
  },
  {
    title: "Corporate Information",
    links: [
      { label: "Board of Directors", href: "/corporate/board" },
      { label: "Key Management Personnel", href: "/corporate/management" },
      { label: "Organization Structure", href: "/corporate/structure" },
      { label: "Vigilance Administration", href: "/vigilance" },
      { label: "Jurisdiction & Circles", href: "/corporate/circles" },
      { label: "Annual Discom Reports", href: "/reports" },
    ],
  },
  {
    title: "Portal Policies",
    links: [
      { label: "Hyperlinking Policy", href: "/policy/hyperlinking" },
      { label: "Copyright Policy", href: "/policy/copyright" },
      { label: "Privacy Statement", href: "/policy/privacy" },
      { label: "Terms & Conditions", href: "/policy/terms" },
      { label: "Accessibility Statement", href: "/policy/accessibility" },
      { label: "Disclaimer Policy", href: "/policy/disclaimer" },
    ],
  },
];

const quickPills = [
  { label: "State Load Despatch Centre (SLDC)", href: "#" },
  { label: "National Portal of India (india.gov.in)", href: "#" },
  { label: "National Cyber Crime Reporting Portal", href: "#" },
  { label: "PM Surya Ghar: Muft Bijli Yojana", href: "#" },
  { label: "Urja Mitra (Outage Management)", href: "#" },
  { label: "Central Electricity Regulatory Commission", href: "#" },
];

export default function SiteDetails() {
  return (
    <section className="border-hairline bg-canvas w-full border-t px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-display-sm sm:text-display-md text-ink">
            Site Details & Statutory Information
          </h2>
          <p className="text-body-sm text-muted-text mt-1 max-w-3xl">
            Statutory notifications, directives, regulatory links, grievance
            cells and state electricity undertakings.
          </p>
        </div>

        {/* 6 Directory Columns */}
        <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {statutoryColumns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="border-hairline text-ink mb-3 border-b pb-1.5 text-caption font-semibold tracking-wider uppercase">
                {col.title}
              </h3>
              <ul className="space-y-1.5 text-body-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-text hover:text-ink block py-0.5 leading-tight transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Links Pill Buttons Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickPills.map((pill) => (
            <Link
              key={pill.label}
              href={pill.href}
              className="group border-hairline bg-surface-card hover:bg-surface-soft flex items-center justify-between rounded-lg border px-4 py-2.5 shadow-subtle transition-all active:scale-[0.98]"
            >
              <span className="text-ink group-hover:opacity-80 flex items-center gap-2 truncate text-button font-medium transition-opacity">
                <Zap
                  className="text-ink h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.5}
                />
                <span className="truncate">{pill.label}</span>
              </span>
              <ExternalLink
                className="text-muted-soft group-hover:text-ink ml-2 h-3.5 w-3.5 shrink-0 transition-colors"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
