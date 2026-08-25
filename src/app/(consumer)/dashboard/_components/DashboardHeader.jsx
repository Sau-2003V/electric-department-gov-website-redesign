"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useGetUser } from "@/database/query/getUser";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const { data: user, isLoading } = useGetUser();
  const [copied, setCopied] = useState(false);

  const appMetadata = user?.app_metadata || user?.raw_app_meta_data || {};

  const name =
    appMetadata.name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Consumer";

  const meterNumber =
    appMetadata.meter_number || user?.user_metadata?.meter_number || null;

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "C";

  const handleCopy = async () => {
    if (!meterNumber) return;
    try {
      await navigator.clipboard.writeText(meterNumber);
      setCopied(true);
      toast.success("Meter number copied to clipboard", {
        description: meterNumber,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy meter number");
    }
  };

  return (
    <section className="mb-6 sm:mb-8">
      {/* Greeting row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-caption text-muted-text font-medium tracking-wider uppercase">
            Namaste,
          </p>

          {isLoading ? (
            <div className="mt-2 animate-pulse space-y-2">
              <div className="bg-surface-card h-10 w-64 rounded-md sm:h-12 sm:w-80" />
              <div className="bg-surface-card h-5 w-44 rounded-md" />
            </div>
          ) : (
            <>
              <h1 className="text-display-md text-ink sm:text-display-lg mt-1 font-medium">
                {name}
              </h1>
              <div className="text-body-sm sm:text-body text-muted-text mt-2 flex items-center gap-2 font-normal">
                <span>Meter No.</span>
                <span className="text-ink font-medium">
                  {meterNumber ?? "—"}
                </span>
                {meterNumber && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-compact"
                    onClick={handleCopy}
                    className="text-muted-text hover:bg-surface-soft hover:text-ink relative"
                    aria-label={
                      copied ? "Copied meter number" : "Copy meter number"
                    }
                    title={copied ? "Copied" : "Copy meter number"}
                  >
                    <span
                      className={`inline-flex items-center justify-center transition-all duration-150 ${
                        copied
                          ? "text-success scale-100 opacity-100"
                          : "absolute scale-0 opacity-0"
                      }`}
                    >
                      <Check className="size-4" strokeWidth={2.5} />
                    </span>
                    <span
                      className={`inline-flex items-center justify-center transition-all duration-150 ${
                        copied
                          ? "absolute scale-0 opacity-0"
                          : "text-muted-text group-hover:text-ink scale-100 opacity-100"
                      }`}
                    >
                      <Copy className="size-4" strokeWidth={2} />
                    </span>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        {/* User Icon Avatar (Visible ONLY on mobile: md:hidden) */}
        {isLoading ? (
          <div className="bg-surface-card border-hairline mt-1 size-10 shrink-0 animate-pulse rounded-full border md:hidden" />
        ) : (
          <Link
            href="/settings"
            className="bg-primary text-on-primary shadow-subtle border-hairline mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-all hover:opacity-90 active:scale-95 md:hidden"
            aria-label="Go to Account Settings"
            title="Account Settings"
          >
            {initials}
          </Link>
        )}
      </div>
    </section>
  );
}
