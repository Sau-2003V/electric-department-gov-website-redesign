import {
  CreditCard,
  Zap,
  FileText,
  ShieldCheck,
  Link2,
  Wrench,
  Info,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: CreditCard,
    title: "Bill Generation and Payment",
    items: [
      { text: "NEFT / RTGS Form" },
      { text: "Bill Payment (Urban)" },
      { text: "Multi-Story Recharge (Radius)" },
      { text: "Multi-Story Recharge (Capital)" },
      { text: "Prepaid Recharge (Genus Meters)" },
      { text: "Prepaid Recharge App (Keypad Based)" },
      { text: "Prepaid Recharge (Smart Meter)" },
      { text: "Net-Meter Self Bill Generation (Urban)" },
      { text: "Self Bill Generation (Urban) up to 9 kW" },
    ],
  },
  {
    icon: Zap,
    title: "Connection Services",
    items: [
      { text: "Apply for New Electricity Connection (Jhatpat)" },
      { text: "Ready reckoner for line charges beyond 40 meter" },
      { text: "Apply for New Connection for Private Tube Well" },
      { text: "Change in Ownership through Property Registration" },
      { text: "Commercial, Industrial & Institutional Connection" },
    ],
  },
  {
    icon: FileText,
    title: "Service Request",
    items: [
      { text: "Bill Correction Request" },
      { text: "Name Correction" },
      { text: "Address Correction" },
      { text: "Mobile Number and Email Updation" },
      { text: "Load Change Request" },
      { text: "Category Change" },
      { text: "Meter Related Requests" },
      { text: "Permanent Disconnection (PD) Request" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Complaints / Status",
    items: [
      { text: "CGRF Complaint Portal" },
      { text: "1912 Complaint Registration" },
      { text: "1912 Complaint Tracking" },
      { text: "Compensation for Electrical Accidents" },
      { text: "COEC Status Report" },
      { text: "Notified Regulations" },
    ],
  },
  {
    icon: Link2,
    title: "Important Links",
    items: [
      { text: "State Electricity Regulatory Commission" },
      { text: "Minimum Wage for Outsourced Personnel" },
      { text: "Janhit Guarantee Act" },
      { text: "Energy Savings Tips" },
      { text: "Consumption Calculator" },
      { text: "Application Processing Fee Rates" },
    ],
  },
  {
    icon: Wrench,
    title: "Services",
    items: [
      { text: "SMS Services" },
      { text: "Download Forms" },
      { text: "Find Common Service Centre (VLE)" },
      { text: "Pending Arrear (Urban)" },
      { text: "Pending Arrear (Rural)" },
      { text: "Correction Request" },
    ],
  },
  {
    icon: Info,
    title: "Other",
    items: [
      { text: "Vigilance Teams and Police Stations" },
      { text: "Assessment and Compounding in Theft" },
      { text: "Smart Meter Online Feedback Form" },
      { text: "Scheduled Outages of Feeders" },
      { text: "Monthly Outage of Feeders" },
      { text: "Outsourced Personnel Complaint" },
    ],
  },
];

function CategoryCard({ icon: Icon, title, count, items }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-3 border-b border-neutral-100 px-5 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
          <Icon className="h-4.5 w-4.5 text-orange-500" strokeWidth={2} />
        </div>
        <h3 className="flex-1 text-[15px] font-medium text-neutral-900">
          {title}
        </h3>
        <span className="text-sm text-neutral-400">{count}</span>
      </div>

      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.text}>
            <button className="flex w-full items-start gap-2 border-b border-neutral-50 px-5 py-3 text-left transition-colors last:border-b-0 hover:bg-neutral-50">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
              <span className="flex-1 text-[13.5px] leading-snug text-neutral-600">
                {item.text}
              </span>
              {item.badge && (
                <span className="shrink-0 rounded bg-orange-500 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-white uppercase">
                  {item.badge}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ConsumerCorner() {
  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] px-10 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="mb-1.5 text-xs font-medium tracking-[0.15em] text-neutral-500 uppercase">
            Self Service
          </p>
          <h1 className="text-2xl font-normal text-neutral-900">
            Consumer Corner
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
            Register
          </button>
          <Link
            href="/login"
            className="rounded-full border border-neutral-200 bg-orange-400 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </div>
  );
}
