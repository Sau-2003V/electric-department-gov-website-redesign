"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Send,
  Trash2,
  Check,
  Plus,
  Zap,
  Download,
  Share2,
} from "lucide-react";

export default function ButtonDocsPage() {
  const [loadingState, setLoadingState] = useState(false);

  const allVariants = [
    // Core & Surface
    { name: "primary", label: "Primary (Default)", icon: ArrowRight },
    { name: "secondary", label: "Secondary", icon: Plus },
    { name: "tertiary", label: "Tertiary", icon: null },
    { name: "outline", label: "Outline", icon: Share2 },
    { name: "ghost", label: "Ghost", icon: null },
    { name: "link", label: "Link Style", icon: ArrowRight },
    { name: "inverse", label: "Inverse", icon: null },

    // Accent & Brand
    { name: "accent", label: "Accent (Fin)", icon: Sparkles },
    { name: "accent-subtle", label: "Accent Subtle", icon: Sparkles },
    { name: "brand", label: "Brand Blue", icon: Zap },
    { name: "brand-subtle", label: "Brand Subtle", icon: Zap },

    // Semantic Statuses
    { name: "success", label: "Success", icon: Check },
    { name: "success-subtle", label: "Success Subtle", icon: Check },
    { name: "destructive", label: "Destructive", icon: Trash2 },
    { name: "destructive-subtle", label: "Destructive Subtle", icon: Trash2 },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <h1 className="text-ink text-3xl font-semibold tracking-tight">
          Button
        </h1>
        <p className="text-ink-muted text-sm">
          Interactive action buttons with all design system variants, size
          ladder, shapes, icon slots, and loading states.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-1 text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Button &#125; from &quot;@/components/ui/button&quot;;
          </code>
        </div>
      </div>

      {/* All Available Variants */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">All Variants</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allVariants.map(({ name, label, icon: Icon }) => (
            <div
              key={name}
              className="border-hairline bg-surface-1 flex items-center justify-between rounded-xl border p-3.5 shadow-xs"
            >
              <code className="text-ink-muted font-mono text-xs font-medium">
                variant=&quot;{name}&quot;
              </code>
              <Button variant={name} trailingIcon={Icon} size="default">
                {label}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">Size Ladder</h2>
        <div className="border-hairline bg-surface-1 flex flex-wrap items-center gap-6 rounded-xl border p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              size=&quot;compact&quot; (28px)
            </code>
            <Button variant="primary" size="compact" leadingIcon={Sparkles}>
              Compact
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              size=&quot;default&quot; (36px)
            </code>
            <Button variant="primary" size="default" leadingIcon={Sparkles}>
              Default
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              size=&quot;lg&quot; (44px)
            </code>
            <Button variant="primary" size="lg" leadingIcon={Sparkles}>
              Large
            </Button>
          </div>
        </div>
      </section>

      {/* Shapes (Border Radii) */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">Shapes</h2>
        <div className="border-hairline bg-surface-1 flex flex-wrap items-center gap-6 rounded-xl border p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;rounded&quot; (8px / md)
            </code>
            <Button variant="secondary" shape="rounded">
              Rounded (Default)
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;pill&quot;
            </code>
            <Button variant="secondary" shape="pill">
              Pill
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;tag&quot; (6px)
            </code>
            <Button variant="secondary" shape="tag">
              Tag
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;xs&quot; (4px)
            </code>
            <Button variant="secondary" shape="xs">
              Small Radius
            </Button>
          </div>
        </div>
      </section>

      {/* Icon & Loading States */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">
          Icons & Interactive States
        </h2>
        <div className="border-hairline bg-surface-1 flex flex-wrap items-center gap-6 rounded-xl border p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <Button
              variant="accent"
              loading={loadingState}
              onClick={() => {
                setLoadingState(true);
                setTimeout(() => setLoadingState(false), 2000);
              }}
              leadingIcon={Send}
            >
              {loadingState ? "Sending..." : "Click for Loading"}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" aria-label="Download">
              <Download className="size-4" />
            </Button>
            <Button variant="outline" size="icon-compact" aria-label="Add">
              <Plus className="size-3.5" />
            </Button>
            <Button variant="accent" size="icon-lg" aria-label="Sparkles">
              <Sparkles className="size-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" disabled leadingIcon={Trash2}>
              Disabled
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
