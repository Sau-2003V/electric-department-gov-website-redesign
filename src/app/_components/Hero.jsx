"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall, HelpCircle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const urgentSlides = [
  {
    tag: "Immediate redressal",
    title: "Facing a power outage or transformer failure?",
    desc: "Register your emergency breakdown online for rapid lineman dispatch.",
    cta: "Lodge supply complaint",
    href: "/complaints/new",
  },
  {
    tag: "Citizen advisory",
    title: "Burnt meter, wire sparking, or a live safety hazard?",
    desc: "Report life-threatening electrical faults immediately — portal or 24x7 toll-free 1912.",
    cta: "Report hazard now",
    href: "/complaints/new",
  },
  {
    tag: "Consumer scheme",
    title: "OTS 2026 — 100% surcharge waiver available",
    desc: "Submit billing dispute or apply for the one-time settlement under OTS guidelines.",
    cta: "File dispute online",
    href: "/complaints/new",
  },
];

export default function Hero() {
  return (
    <section className="bg-canvas w-full px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Advisory carousel */}
        <div className="mb-8">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 3500,
              }),
            ]}
            className="w-full"
          >
            <div className="relative">
              <CarouselContent>
                {urgentSlides.map((slide, i) => (
                  <CarouselItem key={i}>
                    <div
                      className={cn(
                        "border-hairline bg-surface-card shadow-subtle flex flex-col justify-between rounded-lg border p-5 sm:flex-row sm:items-center sm:p-6"
                      )}
                    >
                      <div className="mb-4 sm:mb-0 sm:pr-6">
                        <h2 className="text-title-sm text-ink font-semibold">
                          {slide.title}
                        </h2>
                        <p className="text-body-sm text-muted-text mt-1">
                          {slide.desc}
                        </p>
                      </div>
                      <Link href={slide.href} className="inline-flex shrink-0">
                        <Button
                          variant="secondary"
                          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                        >
                          <span>{slide.cta}</span>
                        </Button>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </Carousel>
        </div>

        {/* Main action grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Complaint Registration Hub */}
          <div className="border-hairline bg-canvas shadow-subtle flex flex-col justify-between rounded-xl border p-6 sm:p-8 lg:col-span-8">
            <div>
              {/* Welcome Header */}
              <div>
                <span className="text-caption text-muted-text font-medium tracking-wide uppercase">
                  Welcome to Vidhyut Portal
                </span>
                <h1 className="text-display-md sm:text-display-lg lg:text-display-xl text-ink mt-2">
                  Register electricity complaints &amp; grievances
                </h1>
                <p className="text-body-md text-muted-text mt-3 max-w-2xl leading-relaxed">
                  Welcome to the state electricity grievance redressal portal.
                  File complaints for power outages, low voltage, burnt
                  transformers, meter defects, or billing issues. Every
                  complaint is assigned an instant tracking docket and
                  dispatched directly to local subdivision field engineers.
                </p>

                {/* Dual Action Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/complaints/new" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      <span>Register complaint</span>
                    </Button>
                  </Link>
                  <Link href="/how-it-works" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                      leftIcon={
                        <HelpCircle
                          className="text-ink h-4 w-4"
                          strokeWidth={1.5}
                        />
                      }
                    >
                      <span>How It Works</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Emergency contacts & Quick Links */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            {/* 24x7 emergency */}
            <div className="border-surface-dark-elevated bg-surface-dark text-on-dark shadow-subtle flex flex-col justify-between rounded-xl border p-6">
              <div>
                <h3 className="text-title-lg text-on-dark mt-2">
                  Call toll-free 1912
                </h3>
                <p className="text-body-sm text-on-dark-soft mt-1">
                  Immediate emergency, sparking line, fuse-off, or transformer
                  failure.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2.5">
                <a href="tel:1912" className="inline-flex w-full">
                  <Button
                    variant="primary"
                    size="default"
                    className="bg-on-dark text-surface-dark hover:bg-on-dark/90 w-full justify-center"
                    leftIcon={
                      <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
                    }
                  >
                    <span>Call 1912 — toll free</span>
                  </Button>
                </a>
                <a href="tel:18001801912" className="inline-flex w-full">
                  <Button
                    variant="secondary"
                    size="default"
                    className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark hover:bg-surface-dark-elevated/80 w-full justify-center"
                  >
                    <span>1800-180-1912</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
