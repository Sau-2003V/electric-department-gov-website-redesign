import Link from "next/link";
import { CreditCard, Zap, Activity, ShieldAlert, ChevronRight } from "lucide-react";

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
    <section className="w-full bg-canvas px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative flex flex-col justify-between rounded-xl border border-hairline bg-surface-1 p-6 shadow-2xs transition-all duration-150 hover:border-hairline hover:bg-surface-1 active:scale-[0.96]"
              >
                <div>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface-2 text-fin-orange transition-colors group-hover:bg-fin-orange group-hover:text-on-primary">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-medium text-ink transition-colors group-hover:text-fin-orange">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    {action.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-medium text-fin-orange">
                  <span>Proceed</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" strokeWidth={2} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
