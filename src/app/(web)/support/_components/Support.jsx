"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabItem, TabPanel } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  FileText,
  Gauge,
  Headphones,
  HelpCircle,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  PhoneCall,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Ticket,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Category definitions for triage and quick filtering
const helpCategories = [
  {
    id: "outages",
    title: "Power Outages & Faults",
    badge: "24x7 Priority",
    badgeVariant: "destructive-subtle",
    description:
      "Report area blackout, transformer breakdown, or view estimated feeder restoration schedule.",
    icon: Zap,
    actionLabel: "Report Outage",
    actionHref: "/complaints/new?category=outage",
    quickLinks: [
      { label: "Live Outage Map", href: "/help" },
      { label: "Transformer Failure", href: "/complaints/new" },
      { label: "Streetlight Issue", href: "/complaints/new" },
    ],
  },
  {
    id: "billing",
    title: "Billing & Tariffs",
    badge: "Dispute Redressal",
    badgeVariant: "accent-subtle",
    description:
      "Raise high-bill disputes, request payment reconciliation, or download authenticated duplicate invoices.",
    icon: Ticket,
    actionLabel: "Billing Query",
    actionHref: "/complaints/new?category=billing",
    quickLinks: [
      { label: "OTS Surcharge Scheme", href: "/help" },
      { label: "Tariff Slab Guide", href: "/help" },
      { label: "Online Receipt Issue", href: "/complaints/new" },
    ],
  },
  {
    id: "connections",
    title: "New Connection & Load",
    badge: "Fast Track",
    badgeVariant: "success-subtle",
    description:
      "Apply for domestic/commercial LT/HT power connection, load enhancement, or tariff category migration.",
    icon: Building2,
    actionLabel: "New Application",
    actionHref: "/complaints/new?category=connection",
    quickLinks: [
      { label: "Load Extension (kW)", href: "/complaints/new" },
      { label: "Name / Ownership Transfer", href: "/complaints/new" },
      { label: "Solar Net-Metering (Rooftop)", href: "/complaints/new" },
    ],
  },
  {
    id: "meters",
    title: "Smart Meter & Defects",
    badge: "Testing & Swap",
    badgeVariant: "badge-orange",
    description:
      "Request smart meter diagnostic check, report burnt/tampered/stopped meters, or check daily reading logs.",
    icon: Gauge,
    actionLabel: "Meter Support",
    actionHref: "/complaints/new?category=meter",
    quickLinks: [
      { label: "Burnt Meter Replacement", href: "/complaints/new" },
      { label: "Meter Accuracy Test", href: "/complaints/new" },
      { label: "Smart Meter Sync Query", href: "/help" },
    ],
  },
  {
    id: "safety",
    title: "Safety & Emergency Line",
    badge: "Critical Alert",
    badgeVariant: "destructive-subtle",
    description:
      "Immediate reporting for live snapping wires, pole accidents, sparking cables, or hazardous clearances.",
    icon: ShieldAlert,
    actionLabel: "Emergency Support",
    actionHref: "/complaints/new",
    quickLinks: [
      { label: "Sparking Cable Alert", href: "/complaints/new" },
      { label: "Tilted Pole Hazard", href: "/complaints/new" },
      { label: "Clearance Violation", href: "/complaints/new" },
    ],
  },
  {
    id: "grievance",
    title: "CGRF & Ombudsman",
    badge: "Statutory Appeal",
    badgeVariant: "secondary",
    description:
      "Escalate unresolved complaints to Consumer Grievance Redressal Forum (CGRF) and Electricity Ombudsman.",
    icon: ShieldCheck,
    actionLabel: "View Escalation Matrix",
    actionHref: "#escalation-matrix",
    quickLinks: [
      { label: "Download CGRF Form", href: "/help" },
      { label: "Ombudsman Guidelines", href: "/help" },
      { label: "Citizen Charter SLA", href: "/help" },
    ],
  },
];

// 3-Tier Escalation Matrix for Citizens
const escalationTiers = [
  {
    level: "Tier 1",
    role: "Subdivision SDO & Field Engineer",
    timeline: "Resolves within 24 to 48 Hours",
    description:
      "Handles first-line outage restoration, fuse replacement, meter burn reports, and initial billing clarifications.",
    contact: "Subdivision Helpdesk / Demo Support",
    sla: "Standard Service SLA",
  },
  {
    level: "Tier 2",
    role: "Executive Engineer (XEN) / Circle SE",
    timeline: "Within 7 Working Days",
    description:
      "For persistent delays, incorrect billing revisions, HT line work, transformer augmentation, or procedural disputes.",
    contact: "Divisional Grievance Cell",
    sla: "Divisional Hearing",
  },
  {
    level: "Tier 3",
    role: "Consumer Grievance Redressal Forum (CGRF)",
    timeline: "Statutory 30 to 45 Days",
    description:
      "Independent judicial authority created under the Electricity Act for consumer rights, compensation, and unresolved claims.",
    contact: "Zonal CGRF Bench & Ombudsman",
    sla: "Binding Statutory Order",
  },
];

// Comprehensive FAQs with topic tags
const supportFaqs = [
  {
    category: "outages",
    categoryLabel: "Outages",
    question:
      "How do I report a sudden power outage or fuse-off fault in my locality?",
    answer:
      "You can immediately lodge an outage report online through the 'Register Complaint' button or call the 24x7 demo helpline 1800-123-4567. An automated SMS docket number is issued instantly, notifying the on-duty Junior Engineer and local feeder control room.",
  },
  {
    category: "outages",
    categoryLabel: "Outages",
    question:
      "How can I track the live restoration progress of my logged outage complaint?",
    answer:
      "Visit the complaint tracking portal and enter your 10-digit Docket ID or 12-digit Consumer Account (CA) number. You will see the assigned lineman's contact, field dispatch status, and estimated restoration time (ETR).",
  },
  {
    category: "billing",
    categoryLabel: "Billing",
    question:
      "My electricity bill is unusually high or shows incorrect meter reading. How to correct it?",
    answer:
      "Submit a 'Billing Discrepancy' request online along with a clear photograph of your current meter display. Our billing verification cell compares previous consumption history and issues an amended provisional bill or reading audit within 3 working days.",
  },
  {
    category: "billing",
    categoryLabel: "Billing",
    question: "What is the One-Time Settlement (OTS) Surcharge Waiver Scheme?",
    answer:
      "Under the government's OTS scheme, eligible domestic and agricultural consumers with past unpaid dues can avail up to 100% late payment surcharge (LPS) waiver upon clearing the principal assessment. You can verify your eligibility directly through the portal.",
  },
  {
    category: "meters",
    categoryLabel: "Meters",
    question:
      "What should I do if my meter is burnt, stopped, or displaying an error (e.g. DEF, rEv)?",
    answer:
      "Report a burnt/defective meter immediately to prevent assessment on average load. The lineman is dispatched within 24 hours for inspection, and meter replacement is carried out within the statutory period of 7 days.",
  },
  {
    category: "connections",
    categoryLabel: "Connections",
    question:
      "What documents are required to apply for a new electricity connection?",
    answer:
      "You need: (1) Proof of Ownership or Tenancy Agreement, (2) Government Photo ID (Aadhaar / Voter ID / PAN), (3) NOC from the building owner if applicable, and (4) Test report signed by a licensed electrical contractor for sanction of load above 5 kW.",
  },
  {
    category: "connections",
    categoryLabel: "Connections",
    question: "What is a Docket Number and why is it important?",
    answer:
      "A Docket Number (e.g. DOC-98421) is a permanent, cryptographically verifiable tracking identifier issued via SMS immediately upon complaint registration. It is used to track live progress, escalate delays, and cite cases before the Consumer Grievance Redressal Forum (CGRF).",
  },
  {
    category: "safety",
    categoryLabel: "Safety",
    question:
      "How do I report a life-threatening electrical emergency (live wire, sparking transformer)?",
    answer:
      "Call emergency demo helpline 1800-123-4567 immediately. Emergency lines take top dispatch priority, triggering instant feeder trip and dispatching the emergency rapid-response mobile van to the site.",
  },
  {
    category: "safety",
    categoryLabel: "Safety",
    question:
      "Can I report an emergency power breakdown without logging in?" +
      " How do I report a life-threatening electrical emergency (live wire, sparking transformer)?",
    answer:
      "Yes. Emergency outages, live wire hazards, and transformer sparking can be reported instantly by calling 24x7 demo helpline 1800-123-4567 or submitting a quick complaint docket on the portal without prior login.",
  },
  {
    category: "grievance",
    categoryLabel: "Rights & CGRF",
    question:
      "What is the timeline for consumer grievance redressal if the local subdivision does not respond?",
    answer:
      "Under the Citizen Charter, supply restoration is mandatory within 4-12 hours depending on urban/rural classification. If unresolved after Tier 1 escalation, you can file a formal complaint before the Consumer Grievance Redressal Forum (CGRF) for compensation.",
  },
  {
    category: "grievance",
    categoryLabel: "Rights & CGRF",
    question:
      "What happens if a technician marks my complaint resolved, but power is still out?",
    answer:
      "You have a 72-hour protection window to click 'Reopen Ticket' on your dashboard. Reopened tickets automatically escalate to Level 2 (Divisional Executive Engineer) and are highlighted as priority SLA violations for immediate field re-dispatch.",
  },
  {
    category: "grievance",
    categoryLabel: "Rights & CGRF",
    question: "How are the resolution SLA timelines enforced?",
    answer:
      "Under the State Citizen Charter, urban supply must be restored within 4 hours, and rural within 12 hours. Any unresolved ticket exceeding the statutory timeline triggers automated alerts to circle leadership.",
  },
];

const searchKeywords = [
  "Power Outage",
  "Bill Discrepancy",
  "Burnt Meter",
  "New Connection",
  "Demo Helpline",
  "Solar Net-Metering",
  "CGRF Redressal",
];

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState("all");

  // Track docket status mock widget state
  const [docketInput, setDocketInput] = useState("");
  const [trackerResult, setTrackerResult] = useState(null);
  const [isSearchingDocket, setIsSearchingDocket] = useState(false);

  const handleDocketSearch = (e) => {
    e.preventDefault();
    if (!docketInput.trim()) return;

    setIsSearchingDocket(true);
    setTimeout(() => {
      setIsSearchingDocket(false);
      setTrackerResult({
        docketId: docketInput.toUpperCase(),
        status: "Technician Dispatched",
        stage: "Field Resolution",
        category: "Supply Breakdown / Outage",
        assignedTo: "Lineman Team #4 (Substation Sub-08)",
        slaTime: "Estimated resolution in ~35 mins",
        timestamp: "Logged Today at 11:24 AM",
      });
    }, 600);
  };

  // Filter FAQs based on category tab and search text
  const filteredFaqs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return supportFaqs.filter((faq) => {
      const matchesCategory =
        selectedFaqCategory === "all" || faq.category === selectedFaqCategory;

      if (!term) return matchesCategory;

      const matchesTerm =
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.categoryLabel.toLowerCase().includes(term);

      return matchesCategory && matchesTerm;
    });
  }, [searchTerm, selectedFaqCategory]);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      {/* 1. TOP HERO SECTION */}
      <section className="border-hairline bg-surface-card/60 relative overflow-hidden border-b py-12 md:py-16">
        {/* Subtle grid pattern background */}
        <div className="background-size:[24px_24px] pointer-events-none absolute inset-0 bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] opacity-60" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <Badge variant="accent-subtle" size="pill" className="gap-2">
              <span>Consumer Redressal &amp; Support Hub</span>
            </Badge>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl text-ink font-medium tracking-tight">
              How can we assist your electricity service today?
            </h1>

            <p className="text-body-md text-muted-text max-w-3xl leading-relaxed">
              Official assistance desk for power outages, billing disputes,
              smart meter diagnostics, new connections, and consumer rights
              under the State Electricity Regulatory Commission.
            </p>
          </div>

          {/* Search Bar & Quick Suggestion Pills */}
          <div className="mt-8 max-w-3xl">
            <div className="border-hairline bg-canvas shadow-subtle focus-within:ring-brand-accent/30 focus-within:border-brand-accent flex items-center rounded-full border p-1.5 focus-within:ring-2">
              <div className="text-muted-soft pr-2.5 pl-3.5">
                <Search className="size-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search outage solutions, billing rules, meter errors, or tariff guides..."
                className="text-ink placeholder:text-muted-soft text-body-sm w-full bg-transparent py-2 pr-4 font-sans outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  text="sm"
                  onClick={() => setSearchTerm("")}
                  className="text-muted-soft hover:text-ink mr-4 p-1.5"
                >
                  X
                </button>
              )}
            </div>

            {/* Keyword Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-caption text-muted-soft font-medium">
                Popular:
              </span>
              {searchKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => setSearchTerm(keyword)}
                  className="border-hairline bg-canvas text-muted-text hover:text-ink hover:bg-surface-soft text-caption rounded-full border px-2.5 py-1 font-medium transition-all"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* 24x7 EMERGENCY STRIP BANNER */}
          <div className="border-hairline bg-canvas shadow-card mt-10 rounded-xl border p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="border-error/20 bg-error/10 text-error flex size-12 shrink-0 items-center justify-center rounded-xl border">
                  <PhoneCall className="size-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-title-md text-ink font-medium">
                      24x7 Demo Emergency Hotline:{" "}
                      <span className="text-error">1800-123-4567</span>
                    </h3>
                    <Badge variant="destructive-subtle" size="sm" shape="pill">
                      Demo Support
                    </Badge>
                  </div>
                  <p className="text-body-sm text-muted-text mt-1">
                    Simulated dispatch for power breakdowns, burning
                    transformers, line sparking, and safety hazards.
                  </p>
                </div>
              </div>

              <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="tel:18001234567" className="w-full sm:w-auto">
                    <Button
                      variant="accent"
                      size="md"
                      className="w-full sm:w-auto"
                      leftIcon={<Phone className="size-4" />}
                    >
                      <span>Call 1800-123-4567</span>
                    </Button>
                  </Link>
                  <Link href="/complaints/new" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                      leftIcon={
                        <AlertTriangle className="text-warning size-4" />
                      }
                    >
                      <span>Lodge Online Complaint</span>
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/help" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                      leftIcon={
                        <MessageSquareText className="size-4 text-emerald-600" />
                      }
                    >
                      <span>Demo Helpdesk</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICE & TRIAGE CARDS (6-GRID) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-caption text-muted-text font-medium tracking-wider uppercase">
              Assistance Categories
            </span>
            <h2 className="text-display-md text-ink mt-1 font-medium tracking-tight">
              Select your service domain
            </h2>
          </div>
          <p className="text-body-sm text-muted-text max-w-md">
            Directly access specialized resolution desks for rapid handling and
            assigned docket tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {helpCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="border-hairline bg-surface-card shadow-subtle hover:border-hairline/60 hover:bg-canvas flex flex-col justify-between rounded-xl border p-6 transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="border-hairline bg-canvas text-ink shadow-subtle flex size-11 items-center justify-center rounded-lg border">
                      <Icon className="size-5" />
                    </div>
                    <Badge
                      variant={category.badgeVariant}
                      size="sm"
                      shape="pill"
                    >
                      {category.badge}
                    </Badge>
                  </div>

                  <h3 className="text-title-md text-ink mt-4 font-medium">
                    {category.title}
                  </h3>
                  <p className="text-body-sm text-muted-text mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="border-hairline-soft mt-6 border-t pt-4">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {category.quickLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="text-caption text-muted-text hover:text-brand-accent inline-flex items-center gap-1 font-medium hover:underline"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="size-3 opacity-60" />
                      </Link>
                    ))}
                  </div>

                  {category.isExternal ? (
                    <a
                      href={category.actionHref}
                      className="inline-flex w-full"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full justify-between"
                        rightIcon={<ExternalLink className="size-3.5" />}
                      >
                        <span>{category.actionLabel}</span>
                      </Button>
                    </a>
                  ) : (
                    <Link
                      href={category.actionHref}
                      className="inline-flex w-full"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full justify-between"
                        rightIcon={<ArrowRight className="size-3.5" />}
                      >
                        <span>{category.actionLabel}</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE SELF-SERVICE & DOCKET STATUS TRACKER */}
      <section className="border-hairline bg-surface-soft border-y py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left: Interactive Docket / Case Tracking Widget */}
            <div className="border-hairline bg-canvas shadow-card rounded-xl border p-6 sm:p-8 lg:col-span-7">
              <div className="border-hairline flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-caption text-brand-accent font-medium tracking-wide uppercase">
                    Live Grievance Redressal
                  </span>
                  <h3 className="text-title-lg text-ink mt-0.5 font-medium">
                    Track Complaint or Outage Docket
                  </h3>
                </div>
                <Badge variant="accent-subtle" size="sm" shape="pill">
                  Instant Status
                </Badge>
              </div>

              <p className="text-body-sm text-muted-text mt-3">
                Enter your 10-digit complaint docket number or 12-digit Consumer
                Account (CA) number to inspect real-time resolution status and
                engineer notes.
              </p>

              <form
                onSubmit={handleDocketSearch}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Input
                    type="text"
                    value={docketInput}
                    onChange={(e) => setDocketInput(e.target.value)}
                    placeholder="e.g. DOC-98421 or 2000847192"
                    leadingIcon={Search}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  loading={isSearchingDocket}
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  <span>Track Status</span>
                </Button>
              </form>

              {/* Sample Quick Demo Dockets */}
              <div className="text-caption text-muted-soft mt-3 flex items-center gap-2">
                <span>Try sample docket:</span>
                <button
                  type="button"
                  onClick={() => setDocketInput("DOC-78419")}
                  className="hover:text-ink underline"
                >
                  DOC-78419
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setDocketInput("CA-10048291")}
                  className="hover:text-ink underline"
                >
                  CA-10048291
                </button>
              </div>

              {/* Status Search Results Box */}
              <AnimatePresence>
                {trackerResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-hairline bg-surface-card shadow-subtle mt-6 rounded-lg border p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-title-sm text-ink font-medium">
                          Docket: {trackerResult.docketId}
                        </span>
                        <Badge variant="success-subtle" size="sm" shape="pill">
                          {trackerResult.status}
                        </Badge>
                      </div>
                      <span className="text-caption text-muted-soft">
                        {trackerResult.timestamp}
                      </span>
                    </div>

                    <div className="text-body-sm mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="border-hairline bg-canvas rounded-md border p-3">
                        <span className="text-caption text-muted-soft block">
                          Issue Type
                        </span>
                        <span className="text-ink font-medium">
                          {trackerResult.category}
                        </span>
                      </div>
                      <div className="border-hairline bg-canvas rounded-md border p-3">
                        <span className="text-caption text-muted-soft block">
                          Assigned Unit
                        </span>
                        <span className="text-ink font-medium">
                          {trackerResult.assignedTo}
                        </span>
                      </div>
                    </div>

                    <div className="border-brand-accent/20 bg-brand-accent/10 mt-4 flex items-center gap-3 rounded-md border p-3">
                      <Clock3 className="text-brand-accent size-4 shrink-0" />
                      <span className="text-body-sm text-ink font-medium">
                        {trackerResult.slaTime}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Key Support Metrics & Officer Directory */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="border-hairline bg-canvas shadow-subtle rounded-xl border p-6">
                <h4 className="text-title-sm text-ink flex items-center gap-2 font-medium">
                  <Clock3 className="text-brand-accent size-4" />
                  <span>Citizen Charter Resolution SLA</span>
                </h4>
                <div className="mt-4 space-y-3">
                  <div className="border-hairline-soft flex items-center justify-between border-b pb-2">
                    <span className="text-body-sm text-muted-text">
                      Urban Outage Restoration
                    </span>
                    <span className="text-body-sm text-ink font-medium">
                      Within 4 Hours
                    </span>
                  </div>
                  <div className="border-hairline-soft flex items-center justify-between border-b pb-2">
                    <span className="text-body-sm text-muted-text">
                      Rural Outage Restoration
                    </span>
                    <span className="text-body-sm text-ink font-medium">
                      Within 12 Hours
                    </span>
                  </div>
                  <div className="border-hairline-soft flex items-center justify-between border-b pb-2">
                    <span className="text-body-sm text-muted-text">
                      Burnt Meter Replacement
                    </span>
                    <span className="text-body-sm text-ink font-medium">
                      Within 7 Days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-muted-text">
                      Billing Dispute Assessment
                    </span>
                    <span className="text-body-sm text-ink font-medium">
                      3-5 Working Days
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-surface-dark-elevated bg-surface-dark text-on-dark shadow-card rounded-xl border p-6">
                <span className="text-caption text-brand-accent font-medium tracking-wider uppercase">
                  Direct Escalation
                </span>
                <h4 className="text-title-md text-on-dark mt-1 font-medium">
                  Need Help from Subdivision Officer?
                </h4>
                <p className="text-body-sm text-on-dark-soft mt-2 leading-relaxed">
                  Locate your Junior Engineer (JE) and Sub-Divisional Officer
                  (SDO) phone directory for your local feeding substation.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Link href="/contact" className="inline-flex w-full">
                    <Button
                      variant="accent"
                      size="md"
                      className="bg-on-dark text-surface-dark hover:bg-on-dark/90 w-full justify-center"
                      leftIcon={<Building2 className="size-4" />}
                    >
                      <span>Subdivision Directory</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3-TIER ESCALATION MATRIX */}
      <section
        id="escalation-matrix"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      >
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="secondary" size="pill">
            Statutory Transparency
          </Badge>
          <h2 className="text-display-md text-ink mt-3 font-medium tracking-tight">
            Consumer Grievance Escalation Matrix
          </h2>
          <p className="text-body-md text-muted-text mt-2">
            If your grievance is not resolved within the standard service SLA,
            you have the statutory right to escalate under the Electricity Act,
            2003.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {escalationTiers.map((tier, idx) => (
            <div
              key={tier.level}
              className="border-hairline bg-canvas shadow-subtle hover:shadow-card relative flex flex-col justify-between rounded-xl border p-6 transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="accent-subtle" size="sm" shape="pill">
                    {tier.level}
                  </Badge>
                  <span className="text-caption text-muted-soft font-mono font-medium">
                    Step 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-title-md text-ink mt-4 font-medium">
                  {tier.role}
                </h3>
                <div className="border-brand-accent/20 bg-brand-accent/10 text-brand-accent text-caption mt-2 inline-block rounded px-2 py-0.5 font-medium">
                  {tier.timeline}
                </div>

                <p className="text-body-sm text-muted-text mt-3 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="border-hairline-soft mt-6 border-t pt-4">
                <div className="text-caption text-muted-soft">
                  Designated Authority:
                </div>
                <div className="text-body-sm text-ink mt-0.5 font-medium">
                  {tier.contact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CATEGORIZED FAQ SECTION (FILTERABLE TABS + ACCORDION) */}
      <section className="border-hairline bg-surface-card/40 border-t py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-caption text-muted-text font-medium tracking-wider uppercase">
              Frequently Answered Questions
            </span>
            <h2 className="text-display-md text-ink mt-1 font-medium tracking-tight">
              Find quick answers to common queries
            </h2>
            <p className="text-body-sm text-muted-text mt-2">
              Browse by domain or use the search bar above to filter answers.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-8 flex justify-center">
            <div className="border-hairline bg-surface-soft shadow-subtle flex flex-wrap items-center justify-center gap-1.5 rounded-full border p-1">
              {[
                { id: "all", label: "All Questions" },
                { id: "outages", label: "Outages" },
                { id: "billing", label: "Billing" },
                { id: "meters", label: "Meters" },
                { id: "connections", label: "Connections" },
                { id: "safety", label: "Safety & CGRF" },
              ].map((tab) => {
                const isActive = selectedFaqCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedFaqCategory(tab.id)}
                    className={cn(
                      "text-caption rounded-full px-3.5 py-1.5 font-medium transition-all",
                      isActive
                        ? "bg-canvas text-ink shadow-subtle font-medium"
                        : "text-muted-text hover:text-ink"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion Component */}
          {filteredFaqs.length === 0 ? (
            <div className="border-hairline bg-canvas shadow-subtle rounded-xl border p-8 text-center">
              <HelpCircle className="text-muted-soft mx-auto mb-2 size-8" />
              <h4 className="text-title-sm text-ink font-medium">
                No matching support topics found
              </h4>
              <p className="text-body-sm text-muted-text mt-1">
                Try searching for another query such as "outage", "reading",
                "bill", or "meter".
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFaqCategory("all");
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="border-hairline bg-canvas shadow-subtle divide-hairline divide-y rounded-xl border"
            >
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="px-5 py-1.5"
                >
                  <AccordionTrigger className="text-title-sm text-ink py-3 font-medium hover:no-underline">
                    <div className="flex items-center gap-2.5 text-left">
                      <Badge variant="secondary" size="sm" shape="pill">
                        {faq.categoryLabel}
                      </Badge>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm text-muted-text pr-6 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* 6. BOTTOM ACTION CTA STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-col items-center justify-between gap-6 rounded-2xl border p-8 sm:p-10 md:flex-row">
          <div className="max-w-xl">
            <span className="text-caption text-muted-text font-medium tracking-wider uppercase">
              Still Need Help?
            </span>
            <h3 className="text-display-sm text-ink mt-1 font-medium">
              File a formal grievance or request an officer callback
            </h3>
            <p className="text-body-sm text-muted-text mt-2 leading-relaxed">
              Our consumer support team is committed to prompt grievance
              redressal and transparent status updates at every stage.
            </p>
          </div>

          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/complaints/new" className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="size-4" />}
              >
                <span>Register Complaint</span>
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Building2 className="size-4" />}
              >
                <span>Find Subdivisiont</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
