import Link from "next/link";
import {
  CreditCard,
  Zap,
  Activity,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

const quickActions = [
  {
    icon: CreditCard,
    title: "Pay Electricity Bill",
    description: "Instant & secure online payment",
    href: "/bill/pay",
  },
  {
    icon: Zap,
    title: "Apply for New Connection",
    description: "Quick 4-step digital process (Jhatpat)",
    href: "/connection/apply",
  },
  {
    icon: Activity,
    title: "Check Power Status",
    description: "Real-time feeder & outage updates",
    href: "/outages",
  },
  {
    icon: ShieldAlert,
    title: "Customer Grievance / OTS 2024",
    description: "One-time settlement & grievance redressal",
    href: "/complaints",
  },
];

export default function QuickServices() {
  return (
    <section className="bg-canvas w-full px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group border-hairline bg-surface-card hover:bg-surface-soft shadow-subtle relative flex flex-col justify-between rounded-lg border p-6 transition-all duration-150 active:scale-[0.98]"
              >
                <span className="block">
                  <span className="border-hairline bg-canvas text-ink group-hover:bg-primary group-hover:text-on-primary mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="block text-ink text-title-sm font-semibold transition-opacity group-hover:opacity-80">
                    {action.title}
                  </span>
                  <span className="block text-muted-text text-body-sm mt-1 leading-relaxed">
                    {action.description}
                  </span>
                </span>

                <span className="text-muted-text group-hover:text-brand-accent text-button mt-6 flex items-center gap-1 font-medium transition-colors">
                  <span>Proceed</span>
                  <ChevronRight
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
