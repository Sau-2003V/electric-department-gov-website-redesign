import Link from "next/link";
import {
  UserRound,
  LayoutDashboard,
  FileText,
  Clock,
  MessageSquare,
  CheckCircle,
  Star,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import TopHeader from "@/app/_components/TopHeader";
import Footer from "@/app/_components/Footer";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "How It Works · Vidhyut Electricity Portal",
  description:
    "Step-by-step guide to registering complaints, tracking lineman dispatch, confirming resolution, and accessing consumer services on Vidhyut Portal.",
};

const steps = [
  {
    title: "Sign in or register",
    icon: UserRound,
    heading: "Verify your consumer connection",
    badge: "Step 01",
    description:
      "Enter your 10-digit consumer connection number (CA number) and registered mobile number to receive a one-time passcode (OTP).",
    secondDescription:
      "New consumers are registered automatically upon their first verified OTP login—no passwords or physical paperwork required.",
  },
  {
    title: "Open your dashboard",
    icon: LayoutDashboard,
    heading: "View all active connections",
    badge: "Step 02",
    description:
      "Access your unified consumer dashboard to view current connection status, recent electricity bills, and previous service history.",
    secondDescription:
      "Manage multiple domestic, commercial, or agricultural meters under a single registered phone number.",
  },
  {
    title: "Lodge a complaint",
    icon: FileText,
    heading: "Select the issue category",
    badge: "Step 03",
    description:
      "Choose your issue type—such as supply outage, transformer fault, burnt meter, or billing dispute—and add your location or landmark.",
    secondDescription:
      "Every submission generates an instant tracking docket number and automatically alerts your local distribution substation.",
  },
  {
    title: "Track lineman dispatch",
    icon: Clock,
    heading: "Follow progress in real time",
    badge: "Step 04",
    description:
      "Track your complaint docket on the portal. View assigned Junior Engineer (JE) contact details, lineman dispatch, and estimated restoration time.",
    secondDescription:
      "You will receive SMS notifications as field teams update the status directly from the inspection site.",
  },
  {
    title: "Receive official updates",
    icon: MessageSquare,
    heading: "Get real-time SMS and portal alerts",
    badge: "Step 05",
    description:
      "Receive live notifications as linemen diagnose and repair the issue. If additional site access is required, the team will contact you directly.",
    secondDescription:
      "All inspection notes, supervisor remarks, and communication history remain permanently recorded on your docket log.",
  },
  {
    title: "Confirm resolution",
    icon: CheckCircle,
    heading: "Review and verify the repair",
    badge: "Step 06",
    description:
      "Once field repairs are completed, review the technician's resolution summary and verify that your power supply or billing correction is fully restored.",
    secondDescription:
      "If you are not satisfied with the resolution, you can reopen the ticket or escalate it to the Executive Engineer within 72 hours.",
  },
  {
    title: "Share service feedback",
    icon: Star,
    heading: "Submit your rating",
    badge: "Step 07",
    description:
      "Rate the response speed, lineman conduct, and overall resolution quality to help maintain public service standards.",
    secondDescription:
      "Citizen ratings directly determine contractor performance evaluations and departmental service quality audits.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-canvas text-ink selection:bg-fin-orange selection:text-on-primary flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Page Hero Header */}
        <section className="border-hairline/60 bg-surface-1/50 border-b px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-eyebrow text-fin-orange font-medium">
              Consumer guide
            </span>

            <h1 className="text-display-md text-ink sm:text-display-lg mt-3 font-medium tracking-tight">
              How the grievance portal works
            </h1>

            <div className="bg-fin-orange mx-auto mt-4 h-0.5 w-16 rounded-full" />

            <p className="text-body text-ink-muted mx-auto mt-6 max-w-2xl leading-relaxed">
              From lodging an urgent outage to tracking field repairs and
              verifying resolution, here is how your service request moves
              through the electricity department.
            </p>
          </div>
        </section>

        {/* Workflow Steps Section */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="border-hairline bg-surface-1 hover:border-hairline/80 rounded-2xl border p-6 shadow-2xs transition-all duration-200 sm:p-8 md:grid md:grid-cols-12 md:gap-8"
                >
                  {/* Left Column: Icon + Step Badge + Title */}
                  <div className="md:border-hairline/60 flex flex-col items-start md:col-span-4 md:border-r md:pr-6">
                    <div className="flex w-full items-center justify-between">
                      <div className="border-hairline/60 bg-surface-2 text-ink flex size-12 items-center justify-center rounded-xl border">
                        <Icon className="size-6" strokeWidth={1.8} />
                      </div>
                      <span className="border-fin-orange/20 bg-fin-orange/10 text-fin-orange text-caption rounded-full border px-2.5 py-0.5 font-medium">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-card-title text-ink mt-4 font-medium">
                      {step.title}
                    </h3>

                    <div className="bg-fin-orange/40 mt-3 h-0.5 w-10 rounded-full" />

                    <div className="text-caption text-ink-subtle mt-4 flex items-center gap-1.5">
                      <ShieldCheck className="text-fin-orange size-3.5" />
                      <span>Verified DISCOM protocol</span>
                    </div>
                  </div>

                  {/* Right Column: Detailed Headings & Description */}
                  <div className="mt-6 flex flex-col justify-center md:col-span-8 md:mt-0 md:pl-2">
                    <h2 className="text-headline text-ink font-medium">
                      {step.heading}
                    </h2>

                    <p className="text-body text-ink-muted mt-3 leading-relaxed">
                      {step.description}
                    </p>

                    <p className="text-body-sm text-ink-muted/90 mt-3 leading-relaxed">
                      {step.secondDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Card */}
          <div className="border-hairline bg-surface-1 mt-12 rounded-2xl border p-8 text-center shadow-2xs sm:p-12">
            <span className="text-eyebrow text-fin-orange font-medium">
              Ready to get started?
            </span>
            <h2 className="text-headline text-ink mt-2 font-medium">
              Register a complaint in under two minutes
            </h2>
            <p className="text-body text-ink-muted mx-auto mt-3 w-full max-w-2xl leading-relaxed">
              Lodge emergency breakdowns, report faulty equipment, or sign in to
              track existing tickets across your supply subdivision.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/complaints/new" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  <span>Register a complaint</span>
                </Button>
              </Link>

              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>Sign in to dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Portal Footer */}
      <Footer />
    </div>
  );
}
