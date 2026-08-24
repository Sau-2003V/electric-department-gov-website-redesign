"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  Clock3,
  Headphones,
  MessageSquareText,
  Phone,
  Search,
  ShieldCheck,
  Ticket,
  Zap,
} from "lucide-react";

const supportHighlights = [
  {
    title: "Power outages",
    description:
      "Report a fault, track restoration progress, and check nearby outage updates.",
    href: "/help",
    icon: Zap,
  },
  {
    title: "Billing & payments",
    description:
      "Review bill issues, payment confirmation, and duplicate invoice requests.",
    href: "/help",
    icon: Ticket,
  },
  {
    title: "Service requests",
    description:
      "Track new connection requests, meter changes, and disconnection queries.",
    href: "/complaints/new",
    icon: BookOpenText,
  },
];

const supportChannels = [
  {
    title: "Emergency helpline",
    detail: "1912",
    description:
      "Available for power outages, public safety concerns, and immediate assistance.",
    icon: Phone,
  },
  {
    title: "Customer care",
    detail: "Mon–Sat · 8:00 AM – 8:00 PM",
    description:
      "Speak with a representative for billing, metering, and service requests.",
    icon: Headphones,
  },
  {
    title: "Digital support",
    detail: "Online inquiry",
    description:
      "Share a complaint, monitor progress, and receive service updates online.",
    icon: MessageSquareText,
  },
];

const faqItems = [
  {
    question: "How do I report a power outage or emergency fault?",
    answer:
      "Use the emergency helpline at 1912 or submit a complaint through the portal. After registration, you will receive an acknowledgment number and live status updates.",
  },
  {
    question: "Can I check the status of my complaint online?",
    answer:
      "Yes. The complaint dashboard and status tracker allow consumers to view active cases, dispatch details, and estimated resolution timelines.",
  },
  {
    question: "What should I do if my bill looks incorrect?",
    answer:
      "Raise a billing query through the support desk or complaint form. Include your consumer number, bill reference, and the discrepancy details so the team can review it quickly.",
  },
  {
    question: "How quickly will a request be acknowledged?",
    answer:
      "Standard service requests are acknowledged within a working day, while urgent outage and safety concerns are prioritized for rapid response.",
  },
];

const searchSuggestions = ["Outage", "Billing", "Complaints", "New connection"];

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return faqItems;

    return faqItems.filter(({ question, answer }) => {
      const text = `${question} ${answer}`.toLowerCase();
      return text.includes(term);
    });
  }, [searchTerm]);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <section className="border-hairline bg-surface-1/95 border-b backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-ink flex items-center gap-2">
              <span className="bg-fin-orange/10 text-fin-orange flex size-9 items-center justify-center rounded-lg">
                <Search className="size-4" />
              </span>
              <div>
                <p className="text-body-sm text-ink-muted">
                  Search support topics
                </p>
                <p className="text-card-title font-medium">
                  Frequently asked questions
                </p>
              </div>
            </div>

            <div className="relative w-full">
              <Search className="text-ink-subtle pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <input
                aria-label="Search support topics"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search outages, billing, connections..."
                className="border-hairline bg-surface-2 text-ink placeholder:text-ink-subtle focus:border-ink focus:ring-ink h-12 w-full rounded-full border pr-4 pl-11 text-sm transition outline-none focus:ring-1"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {searchSuggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSearchTerm(item)}
                className="border-hairline bg-surface-2 text-ink-muted hover:bg-surface-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-eyebrow text-ink-muted">
            Frequently asked questions
          </p>
          <h2 className="text-display-md text-ink mt-2 font-medium tracking-[-0.04em]">
            Answers to common questions
          </h2>
        </div>

        {filteredFaqItems.length === 0 ? (
          <div className="border-hairline bg-surface-1 rounded-2xl border p-6 text-center shadow-sm">
            <p className="text-card-title text-ink font-medium">
              No matching support topics found.
            </p>
            <p className="text-body-sm text-ink-muted mt-2">
              Try another keyword such as outage, billing, complaint, or
              connection.
            </p>
          </div>
        ) : (
          <Accordion
            className="border-hairline bg-surface-1 rounded-2xl border p-2 shadow-sm"
            type="single"
            collapsible
          >
            {filteredFaqItems.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="rounded-xl border-none px-2"
              >
                <AccordionTrigger className="text-body text-ink py-4 text-left font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-body-sm text-ink-muted pr-8 pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="border-hairline bg-surface-1 text-ink-muted mb-6 inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm">
          Consumer support centre
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.45fr_0.85fr]">
          <div>
            <h1 className="text-display-lg text-ink max-w-2xl font-medium tracking-[-0.04em]">
              Support for billing, outages, and service requests
            </h1>
            <p className="text-body-lg text-ink-muted mt-4 leading-relaxed">
              Need help with your electricity connection, a complaint, or a
              safety emergency? The support team is here to help you resolve
              issues quickly and keep your service running smoothly.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="tel:1912" className="inline-flex">
                <Button
                  variant="primary"
                  size="lg"
                  shape="pill"
                  leftIcon={<Phone className="size-4" />}
                >
                  Call 1912
                </Button>
              </a>

              <Link href="/complaints/new" className="inline-flex">
                <Button
                  variant="secondary"
                  size="lg"
                  shape="pill"
                  leftIcon={<AlertTriangle className="size-4" />}
                >
                  Register complaint
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="border-hairline bg-surface-1 rounded-xl border p-4 shadow-sm">
                <div className="text-body-sm text-ink-muted">
                  Average response
                </div>
                <div className="text-card-title text-ink mt-2 flex items-center gap-2 font-medium">
                  <Clock3 className="text-fin-orange size-4" />
                  15 mins
                </div>
              </div>

              <div className="border-hairline bg-surface-1 rounded-xl border p-4 shadow-sm">
                <div className="text-body-sm text-ink-muted">
                  Issue tracking
                </div>
                <div className="text-card-title text-ink mt-2 flex items-center gap-2 font-medium">
                  <ShieldCheck className="text-fin-orange size-4" />
                  Live status
                </div>
              </div>

              <div className="border-hairline bg-surface-1 rounded-xl border p-4 shadow-sm">
                <div className="text-body-sm text-ink-muted">Self service</div>
                <div className="text-card-title text-ink mt-2 flex items-center gap-2 font-medium">
                  <BookOpenText className="text-fin-orange size-4" />
                  Guides
                </div>
              </div>
            </div>
          </div>

          <aside className="border-hairline bg-surface-1 rounded-2xl border p-5 shadow-sm">
            <p className="text-body-sm text-ink-muted font-medium tracking-[0.08em] uppercase">
              Need a quick answer?
            </p>
            <div className="mt-5 space-y-4">
              <div className="border-hairline-soft flex items-start gap-3 border-b pb-3">
                <div className="bg-fin-orange/10 text-fin-orange flex size-9 items-center justify-center rounded-lg">
                  <Phone className="size-4" />
                </div>
                <div>
                  <div className="text-card-title text-ink font-medium">
                    Emergency line
                  </div>
                  <div className="text-body-sm text-ink-muted">1912</div>
                </div>
              </div>

              <div className="border-hairline-soft flex items-start gap-3 border-b pb-3">
                <div className="bg-brand-blue/10 text-brand-blue flex size-9 items-center justify-center rounded-lg">
                  <MessageSquareText className="size-4" />
                </div>
                <div>
                  <div className="text-card-title text-ink font-medium">
                    Portal support
                  </div>
                  <div className="text-body-sm text-ink-muted">
                    Track complaint updates
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-semantic-success/10 text-semantic-success flex size-9 items-center justify-center rounded-lg">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <div className="text-card-title text-ink font-medium">
                    Priority service
                  </div>
                  <div className="text-body-sm text-ink-muted">
                    Critical outages and safety concerns
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow text-ink-muted">Popular assistance</p>
            <h2 className="text-display-md text-ink mt-2 font-medium tracking-[-0.04em]">
              Common support needs
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {supportHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group border-hairline bg-surface-1 rounded-2xl border p-5 shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="bg-surface-2 text-ink flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-card-title text-ink mt-4 font-medium tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="text-body-sm text-ink-muted mt-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-body-sm text-ink mt-4 inline-flex items-center gap-2 font-medium">
                  Get help
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="border-hairline bg-surface-1 rounded-2xl border p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-eyebrow text-ink-muted">Support channels</p>
            <h2 className="text-display-md text-ink mt-2 font-medium tracking-[-0.04em]">
              Contact the right team
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {supportChannels.map((channel) => {
              const Icon = channel.icon;

              return (
                <div
                  key={channel.title}
                  className="border-hairline bg-canvas rounded-xl border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-surface-2 text-ink flex size-10 items-center justify-center rounded-lg">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h3 className="text-card-title text-ink font-medium">
                        {channel.title}
                      </h3>
                      <p className="text-body-sm text-fin-orange font-medium">
                        {channel.detail}
                      </p>
                    </div>
                  </div>
                  <p className="text-body-sm text-ink-muted mt-4 leading-relaxed">
                    {channel.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
