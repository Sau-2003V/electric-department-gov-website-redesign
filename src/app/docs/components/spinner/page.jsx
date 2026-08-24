"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  RefreshCw,
  Clock,
  Layers,
  Shield,
  Download,
} from "lucide-react";

export default function SpinnerDocsPage() {
  const [loading, setLoading] = useState(false);

  const triggerMockLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-semibold tracking-tight">
            Spinner
          </h1>
          <Badge variant="accent" size="sm" shape="tag">
            Updated v2.0
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          Loading indicators, circular ring spinners, and pulsing dots tailored
          with the design token color ramp and sizing ladder.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Spinner &#125; from
            &quot;@/components/ui/spinner&quot;;
          </code>
        </div>
      </div>

      {/* 1. Size Ladder */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">1. Sizing Ladder</h2>
          <p className="text-muted-text text-xs">
            Spinners scale through 5 steps from 12px inline badges to 40px
            dashboard loaders.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-8 rounded-2xl border p-6">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xs" variant="default" />
            <span className="text-muted-text font-mono text-[11px]">
              xs (12px)
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" variant="default" />
            <span className="text-muted-text font-mono text-[11px]">
              sm (16px)
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="default" variant="default" />
            <span className="text-muted-text font-mono text-[11px]">
              md (20px)
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" variant="default" />
            <span className="text-muted-text font-mono text-[11px]">
              lg (28px)
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" variant="default" />
            <span className="text-muted-text font-mono text-[11px]">
              xl (40px)
            </span>
          </div>
        </div>
      </section>

      {/* 2. Color Variants */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">2. Color Variants</h2>
          <p className="text-muted-text text-xs">
            Available in monochrome, brand accent blue, status colors, and
            pastel badge tones.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-2 gap-4 rounded-2xl border p-6 sm:grid-cols-4 lg:grid-cols-6">
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center gap-2.5 rounded-xl border p-4">
            <Spinner variant="default" size="default" />
            <span className="text-ink text-xs font-medium">Default Ink</span>
          </div>

          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center gap-2.5 rounded-xl border p-4">
            <Spinner variant="accent" size="default" />
            <span className="text-ink text-xs font-medium">Brand Accent</span>
          </div>

          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center gap-2.5 rounded-xl border p-4">
            <Spinner variant="success" size="default" />
            <span className="text-ink text-xs font-medium">Success</span>
          </div>

          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center gap-2.5 rounded-xl border p-4">
            <Spinner variant="warning" size="default" />
            <span className="text-ink text-xs font-medium">Warning</span>
          </div>

          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center gap-2.5 rounded-xl border p-4">
            <Spinner variant="error" size="default" />
            <span className="text-ink text-xs font-medium">Error</span>
          </div>

          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center gap-2.5 rounded-xl border p-4">
            <Spinner variant="badge-orange" size="default" />
            <span className="text-ink text-xs font-medium">Pastel Orange</span>
          </div>
        </div>
      </section>

      {/* 3. Animation Types */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">3. Animation Types</h2>
          <p className="text-muted-text text-xs">
            Smooth continuous circular ring loader vs staggered pulsing dots.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-6 rounded-2xl border p-6 sm:grid-cols-2">
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center justify-center gap-3 rounded-xl border p-6">
            <Spinner type="ring" size="lg" variant="accent" />
            <div className="text-center">
              <div className="text-ink text-sm font-semibold">
                Smooth Ring (type=&quot;ring&quot;)
              </div>
              <div className="text-muted-text text-xs">
                Continuous circular stroke with trailing head
              </div>
            </div>
          </div>

          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center justify-center gap-3 rounded-xl border p-6">
            <Spinner type="dots" size="lg" variant="accent" />
            <div className="text-center">
              <div className="text-ink text-sm font-semibold">
                Pulsing Dots (type=&quot;dots&quot;)
              </div>
              <div className="text-muted-text text-xs">
                Staggered 3-dot pulse rhythm for chat and processing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Practical In-Context Usages */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">
            4. In-Context Usages
          </h2>
          <p className="text-muted-text text-xs">
            Spinners embedded inside buttons and card loading states.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-6 rounded-2xl border p-6 sm:grid-cols-2">
          {/* Button Loading State */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-semibold">
                Button Async Action
              </h3>
              <p className="text-muted-text text-xs">
                Click to preview loading button state.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={triggerMockLoad}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" variant="white" />
                    <span>Syncing Schedule…</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4" />
                    <span>Sync Calendars</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Centered Card Loading State */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col items-center justify-center gap-2 rounded-xl border p-6 text-center">
            <Spinner
              size="lg"
              variant="accent"
              label="Generating booking link…"
              labelPosition="bottom"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
