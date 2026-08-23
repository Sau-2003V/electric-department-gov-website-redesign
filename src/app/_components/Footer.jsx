import Link from "next/link";
import { PhoneCall, Mail, MapPin } from "lucide-react";

const footerColumns = [
  {
    title: "DISCOM ENTITIES",
    links: [
      { label: "PVVNL (Meerut DISCOM)", href: "https://pvvnl.org" },
      { label: "DVVNL (Agra DISCOM)", href: "https://dvvnl.org" },
      { label: "MVVNL (Lucknow DISCOM)", href: "https://mvvnl.in" },
      { label: "PuVVNL (Varanasi DISCOM)", href: "https://puvvnl.up.gov.in" },
      { label: "KESCO (Kanpur Electricity)", href: "https://kesco.co.in" },
    ],
  },
  {
    title: "CONSUMER SUPPORT",
    links: [
      { label: "1912 Grievance Desk", href: "/complaints" },
      { label: "Register New Complaint", href: "/complaints/new" },
      { label: "Track Application Status", href: "/complaints" },
      { label: "Online Bill Payment (BBPS)", href: "/bill/pay" },
      { label: "Self Meter Bill Generation", href: "/bill/self" },
      { label: "OTS Surcharge Waiver 2024", href: "/complaints" },
    ],
  },
  {
    title: "TENDERS & CONTRACTS",
    links: [
      { label: "E-Tendering Portal (eTender UP)", href: "/tenders" },
      { label: "Active NITs & Bidding", href: "/tenders" },
      { label: "Vendor Empanelment SOP", href: "/tenders" },
      { label: "Material Specifications", href: "/tenders" },
      { label: "Corrigendum & Addendums", href: "/tenders" },
    ],
  },
  {
    title: "DEPARTMENT",
    links: [
      {
        label: "Ministry of Power (Govt of India)",
        href: "https://powermin.gov.in",
      },
      { label: "Energy Department UP", href: "https://upenergy.in" },
      { label: "UPERC Regulatory Commission", href: "https://uperc.org" },
      {
        label: "Central Electricity Authority (CEA)",
        href: "https://cea.nic.in",
      },
      {
        label: "Bureau of Energy Efficiency (BEE)",
        href: "https://beeindia.gov.in",
      },
    ],
  },
  {
    title: "RIGHT TO INFORMATION",
    links: [
      { label: "RTI Act & Rules 2005", href: "/rti" },
      { label: "Public Information Officers (PIO)", href: "/rti/officers" },
      { label: "First Appellate Authority", href: "/rti/appellate" },
      { label: "Suo-Motu Section 4 Disclosure", href: "/rti/disclosure" },
      { label: "Online RTI Request Portal", href: "/rti/apply" },
    ],
  },
];

const legalLinks = [
  { label: "Copyright Policy", href: "/policy/copyright" },
  { label: "Hyperlinking Policy", href: "/policy/hyperlinking" },
  { label: "Terms & Conditions", href: "/policy/terms" },
  { label: "Privacy Policy", href: "/policy/privacy" },
  { label: "Accessibility Statement", href: "/policy/accessibility" },
  { label: "Disclaimer", href: "/policy/disclaimer" },
  { label: "Help", href: "/help" },
];

export default function Footer() {
  return (
    <footer className="bg-inverse-canvas text-inverse-ink-muted w-full font-sans text-xs">
      {/* Top Footer with Logo and Corporate Info */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-inverse-surface-1 grid grid-cols-1 gap-8 border-b pb-10 lg:grid-cols-12 lg:gap-8">
          {/* Logo & Office Details */}
          <div className="flex flex-col items-start pr-4 lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-fin-orange text-on-primary flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold">
                ⚡
              </div>
              <div>
                <p className="text-fin-orange text-[10px] font-semibold tracking-wider uppercase">
                  Electric Department
                </p>
                <p className="text-inverse-ink text-base font-bold">
                  Vidhyut Portal
                </p>
              </div>
            </div>

            <p className="text-inverse-ink-muted mb-4 text-xs leading-relaxed">
              Official centralized grievance redressal and electricity consumer
              services portal.
            </p>

            <div className="text-inverse-ink-muted space-y-1.5 text-xs">
              <p className="flex items-center gap-2">
                <PhoneCall
                  className="text-fin-orange h-3.5 w-3.5"
                  strokeWidth={2}
                />
                <span>24x7 Toll Free: 1800-180-1912 / 1912</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail
                  className="text-fin-orange h-3.5 w-3.5"
                  strokeWidth={1.5}
                />
                <span>Email: grievance@vidhyutportal.gov.in</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin
                  className="text-fin-orange h-3.5 w-3.5"
                  strokeWidth={1.5}
                />
                <span>Reg. Office: Vidyut Bhawan, Lucknow - 226001</span>
              </p>
            </div>
          </div>

          {/* 5 Footer Columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h4 className="text-inverse-ink mb-3 text-xs font-semibold tracking-wider uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-inverse-ink-muted hover:text-fin-orange block leading-tight transition-colors"
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
        <div className="border-inverse-surface-1 border-b py-6">
          <p className="text-inverse-ink mb-2.5 text-xs font-semibold tracking-wider uppercase">
            Related Portals:
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="https://up.gov.in"
              className="border-inverse-surface-1 bg-inverse-surface-1/50 text-inverse-ink-muted hover:text-fin-orange rounded-md border px-3 py-1 transition-colors active:scale-[0.96]"
            >
              Uttar Pradesh State Portal
            </Link>
            <Link
              href="https://india.gov.in"
              className="border-inverse-surface-1 bg-inverse-surface-1/50 text-inverse-ink-muted hover:text-fin-orange rounded-md border px-3 py-1 transition-colors active:scale-[0.96]"
            >
              National Portal of India
            </Link>
            <Link
              href="https://digitalindia.gov.in"
              className="border-inverse-surface-1 bg-inverse-surface-1/50 text-inverse-ink-muted hover:text-fin-orange rounded-md border px-3 py-1 transition-colors active:scale-[0.96]"
            >
              Digital India
            </Link>
            <Link
              href="https://pmsuryaghar.gov.in"
              className="border-inverse-surface-1 bg-inverse-surface-1/50 text-inverse-ink-muted hover:text-fin-orange rounded-md border px-3 py-1 transition-colors active:scale-[0.96]"
            >
              PM Surya Ghar
            </Link>
            <Link
              href="https://urjamitra.in"
              className="border-inverse-surface-1 bg-inverse-surface-1/50 text-inverse-ink-muted hover:text-fin-orange rounded-md border px-3 py-1 transition-colors active:scale-[0.96]"
            >
              Urja Mitra
            </Link>
          </div>
        </div>

        {/* Legal Links & Disclaimer */}
        <div className="flex flex-col gap-4 pt-6">
          <div className="border-inverse-surface-1 text-inverse-ink-muted flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-4 text-xs">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-fin-orange transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="text-inverse-ink-muted flex flex-col justify-between gap-2 text-xs sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Vidhyut Portal. All rights reserved.
              Government of Uttar Pradesh.
            </p>
            <p>Designed & Developed for DISCOM Consumer & Grievance Services</p>
          </div>

          <p className="text-inverse-ink-muted/70 text-[10px] leading-relaxed">
            Disclaimer: This is the official portal of Vidhyut Portal, an
            undertaking of the Department of Energy, Government of Uttar
            Pradesh. Content on this website is published and managed by the
            DISCOM IT Division. For any technical query regarding this portal,
            please contact the Web Information Manager.
          </p>
        </div>
      </div>
    </footer>
  );
}
