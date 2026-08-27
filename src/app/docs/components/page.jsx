import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tag,
  SquareSquare,
  ArrowRight,
  Sliders,
  ToggleLeft,
  Layers,
  MessageSquare,
  ListFilter,
  ChevronsUpDown,
  Loader2,
} from "lucide-react";

export const metadata = {
  title: "Components · Design System · Vidhyut Portal",
  description:
    "Explore the component library, UI building blocks, and design tokens for the Vidhyut electricity portal.",
};

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-8">
      <div className="border-hairline border-b pb-6">
        <h1 className="text-display-md text-ink font-medium tracking-tight">
          Components
        </h1>
        <p className="text-body text-muted-text mt-1.5">
          Browse the component library built for the design system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Spinner Card */}
        <Link
          href="/docs/components/spinner"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <Loader2 className="text-brand-accent size-5 animate-spin" />
              </div>
              <Badge variant="accent" size="sm" shape="tag">
                Updated
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Spinner
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Circular loaders, pulsing dot rhythms, 5-step sizing ladder, and
              status color tokens.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
            <span>Explore 6+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Select Card */}
        <Link
          href="/docs/components/select"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <ChevronsUpDown className="text-brand-accent size-5" />
              </div>
              <Badge variant="accent" size="sm" shape="tag">
                Updated
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Select
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Form dropdowns with proximity hover glow, spring physics, check
              indicators, and group labels.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
            <span>Explore 4+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Dropdown Card */}
        <Link
          href="/docs/components/dropdown"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <ListFilter className="text-brand-accent size-5" />
              </div>
              <Badge variant="accent" size="sm" shape="tag">
                Updated
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Dropdown Menu
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Floating action menus, item shortcuts, destructive states, and
              proximity hover highlights.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
            <span>Explore 4+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Dialog Card */}
        <Link
          href="/docs/components/dialog"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <MessageSquare className="text-brand-accent size-5" />
              </div>
              <Badge variant="accent" size="sm" shape="tag">
                Updated
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Dialog
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Modal dialogs and overlays with calibrated canvas/surface cards,
              hairline borders, and spring physics.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
            <span>Explore 4+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Tabs Card */}
        <Link
          href="/docs/components/tabs"
          className="group border-hairline bg-surface-card hover:border-ink shadow-subtle relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline flex size-10 items-center justify-center rounded-xl border">
                <Layers className="text-brand-accent size-5" />
              </div>
              <Badge variant="accent" size="sm" shape="tag">
                Signature
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Tabs & Nav-Pill-Group
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Cal.com&apos;s signature interactive pill switcher with proximity
              hover glow, spring physics, and underline bars.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
            <span>Explore 5+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

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
                Updated
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Switch
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Tactile toggle controls with fluid spring micro-motion, drag
              gestures, all color variants, sizes, and squircle shapes.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
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
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Badge
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Status tags, category pills, indicators, and chips featuring the
              full pastel ramp, semantic tokens, and shape radiuses.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
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
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Button
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Action buttons with all design system variants (primary,
              secondary, outline, accent, semantic), size ladder, and spinner.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
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
                Updated
              </Badge>
            </div>
            <h2 className="text-title-md text-ink group-hover:text-brand-accent mt-4 font-medium transition-colors">
              Input
            </h2>
            <p className="text-body-sm text-muted-text mt-1">
              Text inputs and form controls featuring surface tokens, hairline
              borders, icon adornments, prefixes/suffixes, and validation
              states.
            </p>
          </div>

          <div className="border-hairline text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-medium">
            <span>Explore 10+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
