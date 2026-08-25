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
      "Enter your 10-digit Consumer Account (CA) number or registered mobile number to receive a secure one-time passcode (OTP).",
    highlight:
      "New consumers are enrolled automatically upon first OTP verification—zero passwords, paperwork, or physical registration required.",
  },
  {
    step: "02",
    title: "View your connection",
    heading: "Unified consumer dashboard",
    icon: LayoutDashboard,
    badge: "Step 02",
    badgeVariant: "secondary",
    description:
      "Access your real-time account summary to inspect connection sanction status, recent billed units, payment history, and substation feed details.",
    highlight:
      "Seamlessly switch between multiple domestic, commercial, agricultural, or industrial meters linked to your account.",
  },
  {
    step: "03",
    title: "Lodge your grievance",
    heading: "Select category & precise location",
    icon: FileText,
    badge: "Step 03",
    badgeVariant: "destructive-subtle",
    description:
      "Select your issue category—such as power breakdown, low voltage, sparking line, defective meter, or incorrect billing assessment.",
    highlight:
      "Every submission instantly generates a unique SMS Tracking Docket ID and alerts the local subdivision Junior Engineer (JE).",
  },
  {
    step: "04",
    title: "Smart dispatch & tracking",
    heading: "Lineman dispatched in real-time",
    icon: Clock,
    badge: "Step 04",
    badgeVariant: "badge-orange",
    description:
      "The system routes your ticket to the nearest field lineman van. View assigned technician details, contact number, and live status updates.",
    highlight:
      "Substation feeder monitoring systems automatically cross-verify if the issue is local or an upstream 33kV/11kV grid outage.",
  },
  {
    step: "05",
    title: "On-site repair & alerts",
    heading: "Live SMS & portal progress notes",
    icon: MessageSquare,
    badge: "Step 05",
    badgeVariant: "secondary",
    description:
      "Receive real-time text notifications as the technical team inspects the pole, replaces damaged jumpers, or repairs the distribution transformer.",
    highlight:
      "All inspection observations, replaced hardware serials, and lineman logs remain permanently stored on your ticket audit trail.",
  },
  {
    step: "06",
    title: "Confirm resolution",
    heading: "Consumer verification & OTP close",
    icon: CheckCircle,
    badge: "Step 06",
    badgeVariant: "success-subtle",
    description:
      "Once physical repairs are concluded, confirm supply restoration. Tickets cannot be closed without consumer confirmation or field inspection audit.",
    highlight:
      "If dissatisfied, reopen your docket with one click within 72 hours for direct review by the Divisional Executive Engineer (XEN).",
  },
  {
    step: "07",
    title: "Citizen rating & feedback",
    heading: "Rate service quality & speed",
    icon: Star,
    badge: "Step 07",
    badgeVariant: "accent-subtle",
    description:
      "Rate response promptness and technician conduct. Citizen feedback is directly factored into contractor appraisal and departmental audits.",
    highlight:
      "Empowering transparent public service delivery in strict compliance with the State Electricity Regulatory Commission charter.",
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

const faqs = [
  {
    q: "Can I report an emergency power breakdown without logging in?",
    a: "Yes. Emergency outages, live wire hazards, and transformer sparking can be reported instantly by dialing 24x7 toll-free 1912 or submitting a quick complaint docket on the portal without prior login.",
  },
  {
    q: "What is a Docket Number and why is it important?",
    a: "A Docket Number (e.g. DOC-98421) is a permanent, cryptographically verifiable tracking identifier issued via SMS immediately upon complaint registration. It is used to track live progress, escalate delays, and cite cases before the Consumer Grievance Redressal Forum (CGRF).",
  },
  {
    q: "What happens if a technician marks my complaint resolved, but power is still out?",
    a: "You have a 72-hour protection window to click 'Reopen Ticket' on your dashboard. Reopened tickets automatically escalate to Level 2 (Divisional Executive Engineer) and are highlighted as priority SLA violations.",
  },
  {
    q: "How are the resolution SLA timelines enforced?",
    a: "Under the State Citizen Charter, urban supply must be restored within 4 hours, and rural within 12 hours. Any unresolved ticket exceeding the statutory timeline triggers automated alerts to circle leadership.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="border-hairline bg-surface-card/60 relative overflow-hidden border-b py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="accent-subtle" size="pill" className="mx-auto mb-4 gap-1.5">
            <ShieldCheck className="size-3.5" />
            <span>Transparent Citizen Redressal Flow</span>
          </Badge>

          <h1 className="text-display-md sm:text-display-lg lg:text-display-xl text-ink font-semibold tracking-tight">
            How the electricity grievance system works
          </h1>

          <p className="text-body-md text-muted-text mx-auto mt-4 max-w-2xl leading-relaxed">
            From lodging an urgent outage to automated lineman dispatch, SMS tracking, and verified supply restoration—explore our 7-step citizen resolution lifecycle.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/complaints/new">
              <Button
                variant="primary"
                size="lg"
                shape="pill"
                rightIcon={<ArrowRight className="size-4" />}
              >
                <span>Register a Complaint</span>
              </Button>
            </Link>

            <Link href="/support">
              <Button
                variant="secondary"
                size="lg"
                shape="pill"
                leftIcon={<Search className="size-4" />}
              >
                <span>Track Active Docket</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 7-STEP CONSUMER WORKFLOW TIMELINE */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-caption text-muted-text font-medium uppercase tracking-wider">
            Step-By-Step Process
          </span>
          <h2 className="text-display-md text-ink font-semibold tracking-tight mt-1">
            The 7-step citizen journey
          </h2>
          <p className="text-body-sm text-muted-text mt-2 max-w-xl mx-auto">
            Designed for complete visibility, zero paperwork, and guaranteed time-bound accountability.
          </p>
        </div>

        <div className="space-y-6">
          {consumerSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="border-hairline bg-surface-card hover:bg-canvas shadow-subtle hover:shadow-card relative rounded-2xl border p-6 transition-all duration-150 sm:p-8 md:grid md:grid-cols-12 md:gap-8 items-center"
              >
                {/* Left: Step Meta & Icon */}
                <div className="flex flex-col items-start md:col-span-4 md:border-r md:border-hairline-soft md:pr-6">
                  <div className="flex w-full items-center justify-between">
                    <div className="border-hairline bg-canvas text-ink flex size-12 items-center justify-center rounded-xl border shadow-subtle">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </div>
                    <Badge variant={step.badgeVariant} size="sm" shape="pill">
                      {step.badge}
                    </Badge>
                  </div>

                  <h3 className="text-title-md text-ink font-semibold mt-4">
                    {step.title}
                  </h3>

                  <div className="text-caption text-muted-soft mt-2 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="size-3.5 text-success" />
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
                    <p className="text-caption text-body font-medium leading-relaxed">
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
      <section className="border-y border-hairline bg-surface-soft py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="secondary" size="pill">
              Behind The Scenes
            </Badge>
            <h2 className="text-display-md text-ink font-semibold tracking-tight mt-2">
              How the department resolves issues
            </h2>
            <p className="text-body-sm text-muted-text mt-2">
              From automated SCADA trip detection to field crew safety protocols, here is how our technical network responds to emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {operationsSteps.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="border-hairline bg-canvas shadow-subtle rounded-xl border p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="border-hairline bg-surface-soft text-ink flex size-10 items-center justify-center rounded-lg border">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-caption text-muted-soft font-mono font-medium">
                        {stage.step}
                      </span>
                    </div>

                    <h3 className="text-title-sm text-ink font-semibold">
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-hairline">
            <div>
              <span className="text-caption text-brand-accent font-semibold uppercase tracking-wider">
                Statutory Redressal Standards
              </span>
              <h3 className="text-title-lg text-ink font-semibold mt-1">
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
              <div className="text-caption text-muted-soft">Urban Power Outages</div>
              <div className="text-title-md text-ink font-semibold mt-1">Max 4 Hours</div>
              <div className="text-caption text-muted-text mt-1">Fuse-off / feeder restoration</div>
            </div>

            <div className="border-hairline bg-surface-card rounded-xl border p-4">
              <div className="text-caption text-muted-soft">Rural Power Outages</div>
              <div className="text-title-md text-ink font-semibold mt-1">Max 12 Hours</div>
              <div className="text-caption text-muted-text mt-1">Feeder breakdown &amp; line patrol</div>
            </div>

            <div className="border-hairline bg-surface-card rounded-xl border p-4">
              <div className="text-caption text-muted-soft">Burnt / Defective Meter</div>
              <div className="text-title-md text-ink font-semibold mt-1">Max 7 Days</div>
              <div className="text-caption text-muted-text mt-1">Replacement &amp; seal verification</div>
            </div>

            <div className="border-hairline bg-surface-card rounded-xl border p-4">
              <div className="text-caption text-muted-soft">Billing Discrepancy</div>
              <div className="text-title-md text-ink font-semibold mt-1">3-5 Working Days</div>
              <div className="text-caption text-muted-text mt-1">Audit &amp; amended adjustment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS ON REDRESSAL PROCESS */}
      <section className="border-t border-hairline bg-surface-card/40 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-caption text-muted-text font-medium uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-display-md text-ink font-semibold tracking-tight mt-1">
              Grievance portal FAQs
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            className="border-hairline bg-canvas shadow-subtle rounded-xl border divide-y divide-hairline"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="px-5 py-1.5">
                <AccordionTrigger className="text-title-sm text-ink font-medium py-3 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-body-sm text-muted-text pb-4 leading-relaxed pr-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 6. BOTTOM CTA CARD */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border p-8 sm:p-10">
          <div className="max-w-xl">
            <span className="text-caption text-muted-text font-medium uppercase tracking-wider">
              Ready to report an issue?
            </span>
            <h3 className="text-display-sm text-ink font-semibold mt-1">
              Register your complaint in under two minutes
            </h3>
            <p className="text-body-sm text-muted-text mt-2 leading-relaxed">
              Lodge emergency breakdowns, report faulty equipment, or track your active tickets directly across all subdivisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/complaints/new">
              <Button
                variant="primary"
                size="lg"
                shape="pill"
                rightIcon={<ArrowRight className="size-4" />}
              >
                <span>Register a Complaint</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button
                variant="secondary"
                size="lg"
                shape="pill"
              >
                <span>Sign in to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
