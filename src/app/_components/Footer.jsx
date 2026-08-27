import Link from "next/link";
import Image from "next/image";
import { PhoneCall, Mail, MapPin, ShieldAlert } from "lucide-react";

const footerColumns = [
  {
    title: "REGIONAL DISCOMS (DEMO)",
    links: [
      { label: "Northern Electricity Utility (Demo)", href: "/how-it-works" },
      { label: "Southern Power Distribution (Demo)", href: "/how-it-works" },
      { label: "Central Grid Distribution (Demo)", href: "/how-it-works" },
      { label: "Eastern Electricity Utility (Demo)", href: "/how-it-works" },
      { label: "Metro Power Supply Corp (Demo)", href: "/how-it-works" },
    ],
  },
  {
    title: "CONSUMER SERVICES",
    links: [
      { label: "Grievance Redressal Desk", href: "/complaints" },
      { label: "Register New Complaint", href: "/complaints/new" },
      { label: "Track Complaint Status", href: "/complaints" },
      { label: "Consumer Dashboard", href: "/dashboard" },
      { label: "Smart Metering Help", href: "/help" },
      { label: "OTS Surcharge Scheme", href: "/notices" },
    ],
  },
  {
    title: "NOTICES & CIRCULARS",
    links: [
      { label: "Public Outage Notices", href: "/notices" },
      { label: "Active Tenders & Bidding (Demo)", href: "/notices" },
      { label: "Material Specifications", href: "/notices" },
      { label: "Tariff Orders & Circulars", href: "/notices" },
      { label: "Corrigendum & Addendums", href: "/notices" },
    ],
  },
  {
    title: "ORGANIZATION",
    links: [
      { label: "Department Leadership", href: "/team" },
      { label: "Staff & Engineers Portal", href: "/staff/login" },
      { label: "Workflow & Citizen SLAs", href: "/how-it-works" },
      { label: "Energy Conservation Cell", href: "/help" },
      { label: "Regulatory Guidelines", href: "/help" },
    ],
  },
  {
    title: "PUBLIC INFORMATION",
    links: [
      { label: "RTI Information Manual", href: "/help" },
      { label: "Public Information Officers", href: "/team" },
      { label: "First Appellate Authority", href: "/support" },
      { label: "Proactive Disclosures", href: "/notices" },
      { label: "Escalation Matrix", href: "/support" },
    ],
  },
];

const relatedPortals = [
  { label: "State Citizen Portal (Demo)", href: "/how-it-works" },
  { label: "National Energy Hub (Demo)", href: "/help" },
  { label: "Digital Services Hub", href: "/dashboard" },
  { label: "Rooftop Solar Program", href: "/help" },
  { label: "Grid Outage Tracker", href: "/notices" },
];

const legalLinks = [
  { label: "Copyright Policy", href: "/help" },
  { label: "Hyperlinking Policy", href: "/help" },
  { label: "Terms & Conditions", href: "/help" },
  { label: "Privacy Policy", href: "/help" },
  { label: "Accessibility Statement", href: "/help" },
  { label: "Disclaimer", href: "/help" },
  { label: "Help & FAQs", href: "/help" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft text-body-sm w-full font-sans">
      {/* Top Footer with Logo and Corporate Info */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="border-surface-dark-elevated grid grid-cols-1 gap-8 border-b pb-10 lg:grid-cols-12 lg:gap-8">
          {/* Logo & Office Details */}
          <div className="flex flex-col items-start pr-4 lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/image/logo.svg"
                alt="Vidhyut Logo"
                width={40}
                height={40}
                className="size-10 rounded-md bg-white object-contain p-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-on-dark-soft text-caption font-medium tracking-wider uppercase">
                    Electric Department
                  </p>
                  <span className="rounded-xs bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400 uppercase">
                    DEMO
                  </span>
                </div>
                <p className="text-on-dark text-title-md font-medium">
                  Vidhyut Portal
                </p>
              </div>
            </div>

            <p className="text-on-dark-soft text-body-sm mb-4 leading-relaxed">
              Centralized electricity grievance redressal &amp; consumer
              services UI redesign demo prototype.
            </p>

            <div className="text-on-dark-soft text-body-sm space-y-1.5">
              <p className="flex items-center gap-2">
                <PhoneCall
                  className="text-on-dark h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.5}
                />
                <Link
                  href="/support"
                  className="hover:text-on-dark transition-colors"
                >
                  24x7 Demo Hotline: 1800-123-4567
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <Mail
                  className="text-on-dark h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.5}
                />
                <a
                  href="mailto:support@vidhyut-demo.local"
                  className="hover:text-on-dark transition-colors"
                >
                  Email: support@vidhyut-demo.local
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin
                  className="text-on-dark h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.5}
                />
                <span>
                  Reg. Office: Demo Vidyut Bhawan, Sector 0, Demo City - 000001
                </span>
              </p>
            </div>
          </div>

          {/* 5 Footer Columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h4 className="text-on-dark text-caption mb-3 font-medium tracking-wider uppercase">
                  {col.title}
                </h4>
                <ul className="text-body-sm space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-on-dark-soft hover:text-on-dark block leading-tight transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Related Portals Row */}
        <div className="border-surface-dark-elevated border-b py-6">
          <p className="text-on-dark text-caption mb-2.5 font-medium tracking-wider uppercase">
            Demo Related Modules:
          </p>
          <div className="text-body-sm flex flex-wrap gap-2">
            {relatedPortals.map((portal) => (
              <Link
                key={portal.label}
                href={portal.href}
                className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark text-button rounded-md border px-3 py-1 font-medium transition-colors active:scale-[0.98]"
              >
                {portal.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal Links & Disclaimer */}
        <div className="flex flex-col gap-4 pt-6">
          <div className="border-surface-dark-elevated text-on-dark-soft text-caption flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-4">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-on-dark transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="text-on-dark-soft text-caption flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Vidhyut Portal (Demo Prototype). All
              rights reserved.
            </p>
            <p>
              Designed &amp; Developed for UI/UX Demonstration &amp; Simulation
            </p>
          </div>

          <div className="text-caption rounded-md border border-amber-500/20 bg-amber-500/10 p-3 leading-relaxed text-amber-300/90">
            <p className="flex items-center gap-1.5 font-medium text-amber-200">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400" />
              <span>Demo Project Notice:</span>
            </p>
            <p className="text-on-dark-soft/80 mt-1">
              This website is an independent UI/UX redesign demonstration
              prototype. It is{" "}
              <strong>NOT an official government website</strong> and is not
              affiliated with, authorized by, or associated with any government
              department, ministry, or electricity distribution company. All
              data, contact details, circulars, and entities displayed on this
              portal are mock simulated data created solely for demonstration
              purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
