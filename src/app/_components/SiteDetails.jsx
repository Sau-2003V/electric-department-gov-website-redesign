import Link from "next/link";
import { Zap, ArrowUpRight } from "lucide-react";

const statutoryColumns = [
  {
    title: "Demo Portals & Network",
    links: [
      { label: "State Power Grid (Demo)", href: "/help" },
      { label: "Zone 1 DISCOM (Northern)", href: "/how-it-works" },
      { label: "Zone 2 DISCOM (Southern)", href: "/how-it-works" },
      { label: "Zone 3 DISCOM (Eastern)", href: "/how-it-works" },
      { label: "Zone 4 DISCOM (Western)", href: "/how-it-works" },
      { label: "Transmission Utility (Demo)", href: "/notices" },
    ],
  },
  {
    title: "General Information",
    links: [
      { label: "Citizen's Charter (Demo)", href: "/how-it-works" },
      { label: "Consumer Grievance Cell", href: "/complaints" },
      { label: "RTI Information Desk", href: "/help" },
      { label: "Whistle Blower Policy", href: "/support" },
      { label: "Tariff Orders & Directives", href: "/notices" },
      { label: "Safety SOPs & Guidelines", href: "/help" },
    ],
  },
  {
    title: "Consumer Help Desk",
    links: [
      { label: "24x7 Demo Helpdesk", href: "/support" },
      { label: "Online Chat & Support", href: "/support" },
      { label: "Bill & Tariff Calculator", href: "/help" },
      { label: "Energy Conservation Guide", href: "/help" },
      { label: "Smart Metering FAQs", href: "/help" },
      { label: "Digital Payment Guide", href: "/help" },
    ],
  },
  {
    title: "Statutory & Reports",
    links: [
      { label: "Annual Financial Summary", href: "/notices" },
      { label: "Statutory Auditor Reports", href: "/notices" },
      { label: "Compliance Filings (Sample)", href: "/notices" },
      { label: "Public Disclosures (Demo)", href: "/notices" },
      { label: "Discom Board Resolutions", href: "/notices" },
      { label: "Regulatory Petitions", href: "/notices" },
    ],
  },
  {
    title: "Corporate Information",
    links: [
      { label: "Board of Directors", href: "/team" },
      { label: "Key Management Personnel", href: "/team" },
      { label: "Organization Structure", href: "/team" },
      { label: "Vigilance Administration", href: "/support" },
      { label: "Jurisdiction & Circles", href: "/team" },
      { label: "Annual Operational Reports", href: "/notices" },
    ],
  },
  {
    title: "Portal Policies",
    links: [
      { label: "Hyperlinking Policy", href: "/help" },
      { label: "Copyright Policy", href: "/help" },
      { label: "Privacy Statement", href: "/help" },
      { label: "Terms & Conditions", href: "/help" },
      { label: "Accessibility Statement", href: "/help" },
      { label: "Disclaimer Policy", href: "/help" },
    ],
  },
];

const quickPills = [
  {
    label: "State Load Despatch Center (Demo)",
    href: "/notices",
  },
  {
    label: "National Citizen Portal (Demo)",
    href: "/how-it-works",
  },
  {
    label: "Cyber Security Advisory (Demo)",
    href: "/help",
  },
  {
    label: "Solar Rooftop Subsidy Program",
    href: "/help",
  },
  {
    label: "Outage Management System (Demo)",
    href: "/notices",
  },
  {
    label: "Electricity Regulatory Portal (Demo)",
    href: "/support",
  },
];

export default function SiteDetails() {
  return (
    <section className="border-hairline bg-canvas w-full border-t px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="bg-surface-card border-hairline text-muted-text rounded-xs border px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase">
              Demo Showcase
            </span>
          </div>
          <h2 className="text-display-sm sm:text-display-md text-ink mt-2">
            Site Directory &amp; Demo Statutory Information
          </h2>
          <p className="text-body-sm text-muted-text mt-1 max-w-3xl">
            Sample statutory notifications, simulated directives, regulatory
            directory, and consumer assistance modules.
          </p>
        </div>

        {/* 6 Directory Columns */}
        <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {statutoryColumns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="border-hairline text-ink text-caption mb-3 border-b pb-1.5 font-medium tracking-wider uppercase">
                {col.title}
              </h3>
              <ul className="text-body-sm space-y-1.5">
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
              className="group border-hairline bg-surface-card hover:bg-surface-soft shadow-subtle flex items-center justify-between rounded-lg border px-4 py-2.5 transition-all active:scale-[0.98]"
            >
              <span className="text-ink text-button flex items-center gap-2 truncate font-medium transition-opacity group-hover:opacity-80">
                <Zap
                  className="text-ink h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.5}
                />
                <span className="truncate">{pill.label}</span>
              </span>
              <ArrowUpRight
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
