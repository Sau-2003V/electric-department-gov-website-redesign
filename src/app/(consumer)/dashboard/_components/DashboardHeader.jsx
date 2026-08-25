"use client";

import { useState } from "react";
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
      <div className="flex items-start justify-between">
        <div>
          <p className="text-caption font-semibold tracking-wider uppercase text-muted-text">
            Namaste,
          </p>

          {isLoading ? (
            <div className="mt-2 space-y-2 animate-pulse">
              <div className="bg-surface-card h-10 w-64 rounded-md sm:h-12 sm:w-80" />
              <div className="bg-surface-card h-5 w-44 rounded-md" />
            </div>
          ) : (
            <>
              <h1 className="mt-1 text-display-md text-ink sm:text-display-lg font-semibold">
                {name}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-body-sm sm:text-body text-muted-text font-normal">
                <span>Meter No.</span>
                <span className="text-ink font-semibold">
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
      </div>
    </section>
  );
}
