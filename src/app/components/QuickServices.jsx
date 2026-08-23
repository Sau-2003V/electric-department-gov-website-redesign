import {
  CreditCard,
  Zap,
  ShieldCheck,
  FileText,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Pay Electricity Bill",
    subtitle: "Instant online payment",
  },
  {
    icon: Zap,
    title: "Apply for New Connection",
    subtitle: "Jhatpat / regular service",
  },
  {
    icon: ShieldCheck,
    title: "Report Power Theft",
    subtitle: "Confidential reporting",
  },
  {
    icon: FileText,
    title: "Settlement Scheme 2025-26",
    subtitle: "One-time OTS relief",
  },
];

function ServiceCard({ icon: Icon, title, subtitle }) {
  return (
    <div className="min-w-220px flex flex-1 flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
        <Icon className="h-5 w-5 text-orange-500" strokeWidth={2} />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500">{subtitle}</p>
      </div>

      <button className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600">
        Proceed
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function QuickServices() {
  return (
    <div className="w-full bg-[#F4F1EA] px-8 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-2px w-8 bg-orange-400" />
        <h2 className="text-xs font-semibold tracking-[0.15em] text-neutral-600 uppercase">
          Quick Services
        </h2>
        <span className="h-px flex-1 bg-neutral-300" />
      </div>

      <div className="flex flex-wrap gap-5">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}
