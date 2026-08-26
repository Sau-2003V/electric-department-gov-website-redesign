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
  Zap,
  Building2,
  PhoneCall,
  CheckCircle2,
  Clock3,
  Search,
  Radio,
  FileCheck2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "How It Works · Vidhyut Electricity Portal",
  description:
    "Step-by-step guide to registering complaints, tracking lineman dispatch, confirming resolution, and accessing consumer services on Vidhyut Portal.",
};

const consumerSteps = [
  {
    step: "01",
    title: "Sign in or register",
    heading: "Verify connection via instant OTP",
    icon: UserRound,
    badge: "Step 01",
    badgeVariant: "accent-subtle",
    description:
      "Log in using your account details. Your account is automatically created when your electricity connection is set up.",
    highlight:
      "No separate signup needed — just verify with an OTP sent to your registered mobile number.",
  },
  {
    step: "02",
    title: "Lodge your grievance",
    heading: "Select category & precise location",
    icon: FileText,
    badge: "Step 03",
    badgeVariant: "destructive-subtle",
    description:
      "File a new complaint with all required details, including location, images, and attachments.",
    highlight:
      "Every submission instantly generates a unique SMS Tracking Docket ID and alerts the local subdivision Junior Engineer (JE).",
  },
  {
    step: "03",
    title: "Smart dispatch & tracking",
    heading: "Lineman dispatched in real-time",
    icon: Clock,
    badge: "Step 04",
    badgeVariant: "badge-orange",
    description:
      "Once registered, your complaint is automatically assigned to a supervisor with a set response time. If there is no response, it is automatically assigned to an available electrician.",
    highlight:
      "Substation feeder monitoring systems automatically cross-verify if the issue is local or an upstream 33kV/11kV grid outage.",
  },
  {
    step: "04",
    title: "On-site repair & alerts",
    heading: "Live SMS & portal progress notes",
    icon: MessageSquare,
    badge: "Step 05",
    badgeVariant: "secondary",
    description:
      "The electrician handles the issue and updates the complaint status.",
    highlight:
      "All inspection observations, replaced hardware serials, and lineman logs remain permanently stored on your ticket audit trail.",
  },
];

const operationsSteps = [
  {
    step: "Stage A",
    title: "Automated Grid Triage",
    desc: "SCADA & substation telemetry sensors detect feeder trips, initiating automated outage advisories before consumers even report.",
    icon: Zap,
  },
  {
    step: "Stage B",
    title: "Intelligent Work-Order Dispatch",
    desc: "The portal GIS engine assigns tickets to on-duty substation teams, optimizing lineman routes and spare part allocations.",
    icon: Radio,
  },
  {
    step: "Stage C",
    title: "Field Execution & Safety Protocols",
    desc: "Linemen implement mandatory permit-to-work (PTW) earthings, perform repair work, and log photos directly from the mobile app.",
    icon: ShieldCheck,
  },
  {
    step: "Stage D",
    title: "SLA Compliance & CGRF Audit",
    desc: "Every resolved case is recorded against statutory citizen charter deadlines, preventing unmonitored delays.",
    icon: FileCheck2,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="border-hairline bg-surface-card/60 relative overflow-hidden border-b py-12 md:py-16">
        <div className="background-size:[24px_24px] pointer-events-none absolute inset-0 bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] opacity-60" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Badge
            variant="accent-subtle"
            size="pill"
            className="mx-auto mb-4 gap-1.5"
          >
            <span>Transparent Citizen Redressal Flow</span>
          </Badge>

          <h1 className="text-display-md sm:text-display-lg lg:text-display-xl text-ink font-medium tracking-tight">
            How the electricity grievance system works
          </h1>

          <p className="text-body-md text-muted-text mx-auto mt-4 max-w-2xl leading-relaxed">
            From lodging an urgent outage to automated lineman dispatch, SMS
            tracking, and verified supply restoration—explore our 7-step citizen
            resolution lifecycle.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/complaints/new" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  <span>Register complaint</span>
                </Button>
              </Link>
              <Link href="/support" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  leftIcon={<Search className="size-4" />}
                >
                  <span>Track active Docket</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 7-STEP CONSUMER WORKFLOW TIMELINE */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-caption text-muted-text font-medium tracking-wider uppercase">
            Step-By-Step Process
          </span>
          <h2 className="text-display-md text-ink mt-1 font-medium tracking-tight">
            The 7-step citizen journey
          </h2>
          <p className="text-body-sm text-muted-text mx-auto mt-2 max-w-xl">
            Designed for complete visibility, zero paperwork, and guaranteed
            time-bound accountability.
          </p>
        </div>

        <div className="space-y-6">
          {consumerSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="border-hairline bg-surface-card hover:bg-canvas shadow-subtle hover:shadow-card relative items-center rounded-2xl border p-6 transition-all duration-150 sm:p-8 md:grid md:grid-cols-12 md:gap-8"
              >
                {/* Left: Step Meta & Icon */}
                <div className="md:border-hairline-soft flex flex-col items-start md:col-span-4 md:border-r md:pr-6">
                  <div className="flex w-full items-center justify-between">
                    <div className="border-hairline bg-canvas text-ink shadow-subtle flex size-12 items-center justify-center rounded-xl border">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </div>
                    <Badge variant={step.badgeVariant} size="sm" shape="pill">
                      {step.badge}
                    </Badge>
                  </div>

                  <h3 className="text-title-md text-ink mt-4 font-medium">
                    {step.title}
                  </h3>

                  <div className="text-caption text-muted-soft mt-2 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="text-success size-3.5" />
                    <span>Verified DISCOM Protocol</span>
                  </div>
                </div>

                {/* Right: Detailed Narrative */}
                <div className="mt-5 flex flex-col justify-center md:col-span-8 md:mt-0 md:pl-2">
                  <h4 className="text-title-md text-ink font-medium">
                    {step.heading}
                  </h4>

                  <p className="text-body-sm text-muted-text mt-2 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="border-hairline-soft bg-canvas mt-3 rounded-lg border p-3">
                    <p className="text-caption text-body leading-relaxed font-medium">
                      💡 {step.highlight}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. BEHIND THE SCENES: GRID OPERATIONS */}
      <section className="border-hairline bg-surface-soft border-y py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge variant="secondary" size="pill">
              Behind The Scenes
            </Badge>
            <h2 className="text-display-md text-ink mt-2 font-medium tracking-tight">
              How the department resolves issues
            </h2>
            <p className="text-body-sm text-muted-text mt-2">
              From automated SCADA trip detection to field crew safety
              protocols, here is how our technical network responds to
              emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {operationsSteps.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="border-hairline bg-canvas shadow-subtle flex flex-col justify-between rounded-xl border p-6"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="border-hairline bg-surface-soft text-ink flex size-10 items-center justify-center rounded-lg border">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-caption text-muted-soft font-mono font-medium">
                        {stage.step}
                      </span>
                    </div>

                    <h3 className="text-title-sm text-ink font-medium">
                      {stage.title}
                    </h3>
                    <p className="text-body-sm text-muted-text mt-2 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SLA CITIZEN CHARTER METRICS */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="border-hairline bg-canvas shadow-card rounded-2xl border p-6 sm:p-10">
          <div className="border-hairline flex flex-col gap-6 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-caption text-brand-accent font-medium tracking-wider uppercase">
                Statutory Redressal Standards
              </span>
              <h3 className="text-title-lg text-ink mt-1 font-medium">
                Citizen Charter SLA Guarantees
              </h3>
            </div>
            <Link href="/support">
              <Button variant="outline" size="sm" shape="pill">
                <span>View Full Escalation Matrix</span>
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-hairline bg-surface-card rounded-xl border p-4">
              <div className="text-caption text-muted-soft">
                Urban Power Outages
              </div>
              <div className="text-title-md text-ink mt-1 font-medium">
                Max 4 Hours
              </div>
              <div className="text-caption text-muted-text mt-1">
                Fuse-off / feeder restoration
              </div>
            </div>

            <div className="border-hairline bg-surface-card rounded-xl border p-4">
              <div className="text-caption text-muted-soft">
                Rural Power Outages
              </div>
              <div className="text-title-md text-ink mt-1 font-medium">
                Max 12 Hours
              </div>
              <div className="text-caption text-muted-text mt-1">
                Feeder breakdown &amp; line patrol
              </div>
            </div>

            <div className="border-hairline bg-surface-card rounded-xl border p-4">
              <div className="text-caption text-muted-soft">
                Burnt / Defective Meter
              </div>
              <div className="text-title-md text-ink mt-1 font-medium">
                Max 7 Days
              </div>
              <div className="text-caption text-muted-text mt-1">
                Replacement &amp; seal verification
              </div>
            </div>

            <div className="border-hairline bg-surface-card rounded-xl border p-4">
              <div className="text-caption text-muted-soft">
                Billing Discrepancy
              </div>
              <div className="text-title-md text-ink mt-1 font-medium">
                3-5 Working Days
              </div>
              <div className="text-caption text-muted-text mt-1">
                Audit &amp; amended adjustment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA CARD */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-col items-center justify-between gap-6 rounded-2xl border p-8 sm:p-10 md:flex-row">
          <div className="max-w-xl">
            <span className="text-caption text-muted-text font-medium tracking-wider uppercase">
              Ready to report an issue?
            </span>
            <h3 className="text-display-sm text-ink mt-1 font-medium">
              Register your complaint in under two minutes
            </h3>
            <p className="text-body-sm text-muted-text mt-2 leading-relaxed">
              Lodge emergency breakdowns, report faulty equipment, or track your
              active tickets directly across all subdivisions.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/complaints/new" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  <span>Register complaint</span>
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>Sign in to Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
