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
    <section className="mb-lg sm:mb-xl">
      {/* Greeting row */}
      <div className="mb-md flex items-start justify-between">
        <div>
          <p className="text-eyebrow text-ink-subtle uppercase">Namaste</p>

          {isLoading ? (
            <div className="mt-xs space-y-xs animate-pulse">
              <div className="bg-surface-2 h-8 w-48 rounded-lg" />
              <div className="bg-surface-2 h-4 w-36 rounded-md" />
            </div>
          ) : (
            <>
              <h1 className="mt-xxs text-headline text-ink sm:text-display-md font-medium">
                {name}
              </h1>
              <div className="mt-xs gap-xs text-body-sm text-ink-muted flex items-center">
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
                    className="text-ink-muted hover:bg-surface-2 hover:text-ink focus-visible:ring-ink/20 relative focus-visible:ring-1"
                    aria-label={
                      copied ? "Copied meter number" : "Copy meter number"
                    }
                    title={copied ? "Copied" : "Copy meter number"}
                  >
                    <span
                      className={`inline-flex items-center justify-center transition-all duration-150 ${
                        copied
                          ? "text-semantic-success scale-100 opacity-100"
                          : "absolute scale-0 opacity-0"
                      }`}
                    >
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span
                      className={`inline-flex items-center justify-center transition-all duration-150 ${
                        copied
                          ? "absolute scale-0 opacity-0"
                          : "text-ink-muted group-hover:text-ink scale-100 opacity-100"
                      }`}
                    >
                      <Copy className="size-3.5" strokeWidth={2} />
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
