"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./constants";
import { HelpCircle } from "lucide-react";

export default function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-surface-card border-hairline shadow-subtle rounded-lg border p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-2.5">
        <div>
          <h2
            id="faq-heading"
            className="text-title-lg text-ink font-semibold tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-body-sm text-muted-text mt-0.5">
            Instant answers for consumer services, billing, and hazard
            reporting.
          </p>
        </div>
      </div>

      <Accordion className="divide-hairline-soft divide-y">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-none py-1"
          >
            <AccordionTrigger className="text-body text-ink hover:text-ink/80 focus-visible:ring-ring py-3.5 text-left font-medium hover:no-underline focus-visible:ring-1">
              <span className="pr-4">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-body-sm text-muted-text pt-0.5 pr-6 pb-3 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
