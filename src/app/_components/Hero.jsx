"use client";

import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const urgentSlides = [
  {
    tag: "Immediate redressal",
    title: "Facing a power outage or transformer failure?",
    desc: "Register your emergency breakdown online for rapid lineman dispatch.",
    cta: "Lodge supply complaint",
    href: "/complaints/new",
    accentBorder: "border-fin-orange/30",
  },
  {
    tag: "Citizen advisory",
    title: "Burnt meter, wire sparking, or a live safety hazard?",
    desc: "Report life-threatening electrical faults immediately — portal or 24x7 toll-free 1912.",
    cta: "Report hazard now",
    href: "/complaints/new",
    accentBorder: "border-semantic-error/30",
  },
  {
    tag: "Consumer scheme",
    title: "OTS 2026 — 100% surcharge waiver available",
    desc: "Submit billing dispute or apply for the one-time settlement under OTS guidelines.",
    cta: "File dispute online",
    href: "/complaints/new",
    accentBorder: "border-brand-blue/30",
  },
];

export default function Hero() {
  return (
    <section className="bg-canvas w-full px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Advisory carousel */}
        <div className="mb-8">
          <Carousel opts={{ loop: true }} className="w-full">
            <div className="relative">
              <CarouselContent>
                {urgentSlides.map((slide, i) => (
                  <CarouselItem key={i}>
                    <div
                      className={cn(
                        "bg-surface-1 flex flex-col justify-between rounded-xl border p-5 shadow-2xs sm:flex-row sm:items-center sm:p-6",
                        slide.accentBorder
                      )}
                    >
                      <div className="mb-4 sm:mb-0 sm:pr-6">
                        <h2 className="text-headline text-ink">
                          {slide.title}
                        </h2>
                        <p className="text-body-sm text-ink-muted mt-1">
                          {slide.desc}
                        </p>
                      </div>
                      <Link
                        href={slide.href}
                        className="bg-fin-orange text-on-primary inline-flex shrink-0 items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold shadow-xs transition-all hover:brightness-110 active:scale-[0.96]"
                      >
                        {slide.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <div className="hidden sm:block">
                <CarouselPrevious className="bg-surface-1 text-ink hover:bg-surface-2 top-1/2 -left-4 -translate-y-1/2 shadow-xs" />
                <CarouselNext className="bg-surface-1 text-ink hover:bg-surface-2 top-1/2 -right-4 -translate-y-1/2 shadow-xs" />
              </div> */}
            </div>
          </Carousel>
        </div>

        {/* Main action grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Complaint Registration Hub */}
          <div className="border-hairline bg-surface-1 flex flex-col justify-between rounded-2xl border p-6 shadow-2xs sm:p-8 lg:col-span-8">
            <div>
              {/* Welcome Header */}
              <div>
                <span className="text-eyebrow text-fin-orange font-semibold tracking-wide uppercase">
                  Welcome to Vidhyut Portal
                </span>
                <h1 className="text-display-md text-ink mt-2">
                  Register electricity complaints &amp; grievances
                </h1>
                <p className="text-body text-ink-muted mt-3 max-w-2xl leading-relaxed">
                  Welcome to the state electricity grievance redresal portal.
                  File complaints for power outages, low voltage, burnt
                  transformers, meter defects, or billing issues. Every
                  complaint is assigned an instant tracking docket and
                  dispatched directly to local subdivision field engineers.
                </p>

                {/* Dual Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/complaints/new"
                    className="bg-fin-orange text-on-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-xs transition-all hover:brightness-110 active:scale-[0.96]"
                  >
                    <span>Register complaint</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#video-guides"
                    className="border-hairline bg-surface-1 text-ink hover:bg-surface-2 inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition-colors active:scale-[0.96]"
                  >
                    <HelpCircle className="text-fin-orange h-4 w-4" />
                    <span>Video guides &amp; help</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Emergency contacts & Quick Links */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            {/* 24x7 emergency */}
            <div className="border-inverse-surface-1 bg-inverse-canvas text-inverse-ink flex flex-col justify-between rounded-2xl border p-6 shadow-xs">
              <div>
                <h3 className="text-headline text-inverse-ink mt-2">
                  Call toll-free 1912
                </h3>
                <p className="text-body-sm text-inverse-ink-muted mt-1">
                  Immediate emergency, sparking line, fuse-off, or transformer
                  failure.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href="tel:1912"
                  className="bg-fin-orange text-on-primary inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold shadow-xs transition-all hover:brightness-110 active:scale-[0.96]"
                >
                  <PhoneCall className="h-4 w-4" strokeWidth={2} />
                  Call 1912 — toll free
                </a>
                <a
                  href="tel:18001801912"
                  className="border-inverse-surface-1 bg-inverse-surface-1 text-inverse-ink hover:bg-inverse-surface-1/80 inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-colors active:scale-[0.96]"
                >
                  Alt: 1800-180-1912
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
