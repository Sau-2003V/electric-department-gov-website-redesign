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
                className="group border-hairline bg-surface-card hover:bg-surface-soft relative flex flex-col justify-between rounded-lg border p-6 shadow-subtle transition-all duration-150 active:scale-[0.98]"
              >
                <div>
                  <div className="border-hairline bg-canvas text-ink group-hover:bg-primary group-hover:text-on-primary mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-ink text-title-sm font-semibold transition-opacity group-hover:opacity-80">
                    {action.title}
                  </h3>
                  <p className="text-muted-text mt-1 text-body-sm leading-relaxed">
                    {action.description}
                  </p>
                </div>

                <div className="text-muted-text group-hover:text-ink mt-6 flex items-center gap-1 text-button font-medium transition-colors">
                  <span>Proceed</span>
                  <ChevronRight
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1"
                    strokeWidth={1.5}
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
