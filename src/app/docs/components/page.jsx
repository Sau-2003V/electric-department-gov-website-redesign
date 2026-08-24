import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tag,
  SquareSquare,
  ArrowRight,
  Sliders,
  ToggleLeft,
} from "lucide-react";

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-8">
      <div className="border-hairline border-b pb-6">
        <h1 className="text-display-md text-ink font-semibold tracking-tight">
          Components
        </h1>
        <p className="text-body text-muted-text mt-1.5">
          Browse the component library built for the design system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Switch Card */}
        <Link
          href="/docs/components/switch"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <ToggleLeft className="text-brand-accent size-5" />
              </div>
              <Badge variant="accent" size="sm" shape="tag">
                New v2.0
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-semibold transition-colors">
              Switch
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Tactile toggle controls with fluid spring micro-motion, drag
              gestures, all color variants, sizes, and squircle shapes.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold">
            <span>Explore 9+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Badge Card */}
        <Link
          href="/docs/components/badge"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <Tag className="text-badge-orange size-5" />
              </div>
              <Badge variant="badge-orange" size="sm" shape="tag">
                Updated
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-semibold transition-colors">
              Badge
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Status tags, category pills, indicators, and chips featuring the
              full pastel ramp, semantic tokens, and shape radiuses.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold">
            <span>Explore 20+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Button Card */}
        <Link
          href="/docs/components/button"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <Sliders className="text-ink size-5" />
              </div>
              <Badge variant="secondary" size="sm" shape="tag">
                Ready
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-semibold transition-colors">
              Button
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Action buttons with all design system variants (primary,
              secondary, outline, accent, semantic), size ladder, and spinner.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold">
            <span>Explore 15+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Input Card */}
        <Link
          href="/docs/components/input"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <SquareSquare className="text-ink size-5" />
              </div>
              <Badge variant="secondary" size="sm" shape="tag">
                Ready
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-semibold transition-colors">
              Input
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Text inputs and form controls featuring surface tokens, hairline
              borders, icon adornments, prefixes/suffixes, and validation
              states.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold">
            <span>Explore 10+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
