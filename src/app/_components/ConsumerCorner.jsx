import Link from "next/link";
import {
  CreditCard,
  Zap,
  FileText,
  ShieldCheck,
  Cpu,
  Wrench,
  Info,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    icon: CreditCard,
    title: "Bill Services & Payment",
    items: [
      { text: "View / Print Bill History", href: "/dashboard" },
      { text: "Bill Payment (BBPS / Online)", href: "/dashboard" },
      {
        text: "Update Mobile & Aadhaar (eKYC)",
        href: "/settings",
        badge: "NEW",
      },
      {
        text: "Update Bank Account Details",
        href: "/settings",
        badge: "NEW",
      },
      { text: "Register for SMS Alert & e-Bill", href: "/settings" },
      { text: "Payment and Consumption History", href: "/dashboard" },
      { text: "Self Bill Generation (Smart Meter)", href: "/dashboard" },
      { text: "Self Bill Generation for PVVNL / DVVNL", href: "/dashboard" },
    ],
  },
  {
    icon: Zap,
    title: "Connection Services",
    items: [
      { text: "Apply for New Connection (Jhatpat)", href: "/complaints/new" },
      {
        text: "Load Extension, Reduction & Category Change",
        href: "/complaints/new",
      },
      {
        text: "Name Transfer / Ownership Transfer",
        href: "/complaints/new",
      },
      { text: "Change in Address (Premises)", href: "/settings" },
      {
        text: "Commercial / Industrial & Institutional Load",
        href: "/complaints/new",
      },
    ],
  },
  {
    icon: FileText,
    title: "Service Request",
    items: [
      { text: "Bill Correction Request", href: "/complaints/new" },
      { text: "Meter Defective / Burnt Replacement", href: "/complaints/new" },
      { text: "Address Correction Request", href: "/settings" },
      { text: "Mobile Number & Email Update", href: "/settings" },
      { text: "Bill & Disconnection Dispute", href: "/complaints" },
      { text: "Voltage / Phase Issue", href: "/complaints" },
      { text: "OTS / Rebate Related Query", href: "/complaints" },
      {
        text: "Permanent Disconnection Request (PDOC)",
        href: "/complaints/new",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Complaints & Redressal",
    items: [
      { text: "Register Online Complaint", href: "/complaints/new" },
      { text: "Track Complaint Registration", href: "/complaints" },
      { text: "View Complaint History / Status", href: "/complaints" },
      { text: "Escalation to Grievance Forum (CGRF)", href: "/support" },
      { text: "Electricity Theft Report", href: "/complaints/new" },
      {
        text: "Vigilance / Misconduct Report",
        href: "/complaints/new",
        badge: "NEW",
      },
    ],
  },
  {
    icon: Cpu,
    title: "Smart Metering",
    items: [
      { text: "Smart Meter FAQ & Directives", href: "/help" },
      { text: "Real-Time Consumption Portal", href: "/dashboard" },
      { text: "Quick Prepaid Meter Recharge", href: "/dashboard" },
      { text: "Energy Savings & Efficiency Tips", href: "/help" },
      { text: "Demand / Solar Net-Metering Schedule", href: "/help" },
      { text: "Installation Process & Guidelines", href: "/help" },
    ],
  },
  {
    icon: Wrench,
    title: "Services",
    items: [
      { text: "Tariff Schedule & Slab Rates", href: "/notices" },
      { text: "Disconnection & Reconnection Orders", href: "/notices" },
      { text: "Schedule of Power Outages / Shutdowns", href: "/notices" },
      { text: "Electricity Safety & Precaution Manual", href: "/help" },
      { text: "Regulatory Orders & Discom Policies", href: "/notices" },
      { text: "Citizen's Charter & Service Guidelines", href: "/how-it-works" },
    ],
  },
  {
    icon: Info,
    title: "Other",
    items: [
      { text: "Feedback & Citizen Suggestions", href: "/support" },
      { text: "Right to Information (RTI) Portal & Form", href: "/help" },
      { text: "Form Library (Offline Application Forms)", href: "/help" },
      { text: "Download Forms (Category, Name, Arrear)", href: "/help" },
      { text: "Discom Official Circulars & Notices", href: "/notices" },
      { text: "Vendor / Contractor Registration", href: "/notices" },
    ],
  },
];

function CategoryCard({ icon: Icon, title, items }) {
  return (
    <div className="border-hairline bg-canvas hover:border-hairline shadow-subtle flex flex-col overflow-hidden rounded-lg border transition-all duration-150">
      {/* Card Header */}
      <div className="border-hairline-soft bg-surface-soft flex items-center justify-between border-b px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="border-hairline bg-canvas text-ink flex h-9 w-9 shrink-0 items-center justify-center rounded-md border">
            <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
          </div>
          <h3 className="text-ink text-title-sm leading-tight font-medium">
            {title}
          </h3>
        </div>
        <ChevronRight className="text-muted-soft h-4 w-4" strokeWidth={1.5} />
      </div>

      {/* Item list */}
      <ul className="divide-hairline-soft divide-y">
        {items.map((item) => (
          <li key={item.text}>
            <Link
              href={item.href}
              className="group hover:bg-surface-soft text-body-sm flex items-start gap-2.5 px-5 py-3 transition-colors active:scale-[0.98]"
            >
              <span className="bg-muted-soft mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-125" />
              <span className="text-ink flex-1 leading-snug font-normal transition-colors group-hover:underline">
                {item.text}
              </span>
              {item.badge && (
                <span className="bg-primary text-on-primary shrink-0 rounded-xs px-1.5 py-0.5 text-[10px] font-medium tracking-wider uppercase">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ConsumerCorner() {
  return (
    <section
      id="consumer-services"
      className="border-hairline bg-surface-card w-full border-t px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-caption text-muted-text font-medium tracking-wide uppercase">
              Consumer Services Directory
            </span>
            <h2 className="text-display-sm sm:text-display-md text-ink mt-1">
              Consumer Corner
            </h2>
          </div>
        </div>

        {/* 7 Categorized Cards Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
