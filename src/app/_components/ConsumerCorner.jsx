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
      { text: "View / Print Bill History", href: "/bill/history" },
      { text: "Bill Payment (BBPS / Online)", href: "/bill/pay" },
      {
        text: "Update Mobile & Aadhaar (eKYC)",
        href: "/profile/ekyc",
        badge: "NEW",
      },
      {
        text: "Update Bank Account Details",
        href: "/profile/bank",
        badge: "NEW",
      },
      { text: "Register for SMS Alert & e-Bill", href: "/services/sms" },
      { text: "Payment and Consumption History", href: "/bill/history" },
      { text: "Self Bill Generation (Smart Meter)", href: "/bill/self" },
      { text: "Self Bill Generation for PVVNL / DVVNL", href: "/bill/self" },
    ],
  },
  {
    icon: Zap,
    title: "Connection Services",
    items: [
      { text: "Apply for New Connection (Jhatpat)", href: "/connection/apply" },
      {
        text: "Load Extension, Reduction & Category Change",
        href: "/connection/modify",
      },
      {
        text: "Name Transfer / Ownership Transfer",
        href: "/connection/transfer",
      },
      { text: "Change in Address (Premises)", href: "/connection/address" },
      {
        text: "Commercial / Industrial & Institutional Load",
        href: "/connection/commercial",
      },
    ],
  },
  {
    icon: FileText,
    title: "Service Request",
    items: [
      { text: "Bill Correction Request", href: "/requests/bill-correction" },
      { text: "Meter Defective / Burnt Replacement", href: "/requests/meter" },
      { text: "Address Correction Request", href: "/requests/address" },
      { text: "Mobile Number & Email Update", href: "/profile" },
      { text: "Bill & Disconnection Dispute", href: "/complaints" },
      { text: "Voltage / Phase Issue", href: "/complaints" },
      { text: "OTS / Rebate Related Query", href: "/complaints" },
      {
        text: "Permanent Disconnection Request (PDOC)",
        href: "/requests/disconnection",
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
      { text: "Escalation to Grievance Forum (CGRF)", href: "/cgrf" },
      { text: "Electricity Theft Report", href: "/theft-report" },
      {
        text: "Vigilance / Misconduct Report",
        href: "/theft-report",
        badge: "NEW",
      },
    ],
  },
  {
    icon: Cpu,
    title: "Smart Metering",
    items: [
      { text: "Smart Meter FAQ & Directives", href: "/smart-meter" },
      { text: "Real-Time Consumption Portal", href: "/smart-meter" },
      { text: "Quick Prepaid Meter Recharge", href: "/bill/pay" },
      { text: "Energy Savings & Efficiency Tips", href: "/energy-tips" },
      { text: "Demand / Solar Net-Metering Schedule", href: "/solar" },
      { text: "Installation Process & Guidelines", href: "/smart-meter" },
    ],
  },
  {
    icon: Wrench,
    title: "Services",
    items: [
      { text: "Tariff Schedule & Slab Rates", href: "/tariff" },
      { text: "Disconnection & Reconnection Orders", href: "/orders" },
      { text: "Schedule of Power Outages / Shutdowns", href: "/outages" },
      { text: "Electricity Safety & Precaution Manual", href: "/safety" },
      { text: "Regulatory Orders & Discom Policies", href: "/orders" },
      { text: "Citizen's Charter & Service Guidelines", href: "/charter" },
    ],
  },
  {
    icon: Info,
    title: "Other",
    items: [
      { text: "Feedback & Citizen Suggestions", href: "/feedback" },
      { text: "Right to Information (RTI) Portal & Form", href: "/rti" },
      { text: "Form Library (Offline Application Forms)", href: "/forms" },
      { text: "Download Forms (Category, Name, Arrear)", href: "/forms" },
      { text: "Discom Official Circulars & Notices", href: "/notices" },
      { text: "Vendor / Contractor Registration", href: "/tenders" },
    ],
  },
];

function CategoryCard({ icon: Icon, title, items }) {
  return (
    <div className="border-hairline bg-surface-1 hover:border-hairline flex flex-col overflow-hidden rounded-xl border shadow-2xs transition-all duration-150 hover:shadow-xs">
      {/* Card Header */}
      <div className="border-hairline-soft bg-surface-2/30 flex items-center justify-between border-b px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="bg-surface-2 text-fin-orange flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Icon className="h-4.5 w-4.5" strokeWidth={2} />
          </div>
          <h3 className="text-ink text-sm leading-tight font-medium">
            {title}
          </h3>
        </div>
        <ChevronRight className="text-ink-tertiary h-4 w-4" strokeWidth={1.5} />
      </div>

      {/* Item list */}
      <ul className="divide-hairline-soft divide-y">
        {items.map((item) => (
          <li key={item.text}>
            <Link
              href={item.href}
              className="group hover:bg-surface-2/50 flex items-start gap-2.5 px-5 py-3 text-xs transition-colors active:scale-[0.98]"
            >
              <span className="bg-fin-orange/60 mt-1 h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-125" />
              <span className="text-ink group-hover:text-fin-orange flex-1 leading-snug font-normal transition-colors">
                {item.text}
              </span>
              {item.badge && (
                <span className="bg-fin-orange text-on-primary shrink-0 rounded-xs px-1.5 py-0.5 text-[9px] font-medium tracking-wider uppercase">
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
      className="border-hairline bg-canvas w-full border-t px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-fin-orange text-xs font-semibold tracking-wide uppercase">
              Consumer Services Directory
            </span>
            <h2 className="text-ink mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
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
