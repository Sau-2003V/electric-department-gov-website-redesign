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
    <section className="bg-canvas w-full px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group bg-surface-1 hover:bg-surface-1 relative flex flex-col justify-between rounded-xl p-6 transition-all duration-150 active:scale-[0.96]"
              >
                <div>
                  <div className="bg-surface-2 text-fin-orange group-hover:bg-fin-orange group-hover:text-on-primary mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-ink group-hover:text-fin-orange text-base font-medium transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-ink-muted mt-1 text-xs leading-relaxed">
                    {action.description}
                  </p>
                </div>

                <div className="text-fin-orange mt-6 flex items-center gap-1 text-xs font-medium">
                  <span>Proceed</span>
                  <ChevronRight
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
