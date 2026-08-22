"use client";

import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplaintHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-headline text-ink font-medium tracking-tight">
          Register a complaint
        </h1>
        <p className="text-body-sm text-ink-muted mt-0.5">
          Official grievance intake with statutory SLA tracking under UPERC
          guidelines.
        </p>
      </div>

      <a href="tel:1912" className="shrink-0">
        <Button
          variant="accent"
          size="compact"
          shape="md"
          leftIcon={<PhoneCall />}
        >
          <span>Call 1912 (Emergency)</span>
        </Button>
      </a>
    </div>
  );
}
