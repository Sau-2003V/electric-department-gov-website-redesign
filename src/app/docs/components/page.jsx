import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag, SquareSquare, ArrowRight, Sliders } from "lucide-react";

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-8">
      <div className="border-hairline border-b pb-6">
        <h1 className="text-display-md text-ink font-semibold tracking-tight">
          Components
        </h1>
        <p className="text-body text-ink-muted mt-1.5">
          Browse the component library built for the design system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Badge Card */}
        <Link
          href="/docs/components/badge"
          className="group border-hairline bg-surface-1 hover:border-ink relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-xs transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline-soft flex size-10 items-center justify-center rounded-xl border">
                <Tag className="text-fin-orange size-5" />
              </div>
              <Badge variant="accent" size="sm">
                Updated
              </Badge>
            </div>
            <h2 className="text-headline text-ink group-hover:text-fin-orange mt-4 font-semibold transition-colors">
              Badge
            </h2>
            <p className="text-body-sm text-ink-muted mt-1">
              Status tags, indicators, and chips featuring the full report
              palette, Fin AI accents, and shape radiuses.
            </p>
          </div>

          <div className="border-hairline-soft text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold">
            <span>Explore 20+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Button Card */}
        <Link
          href="/docs/components/button"
          className="group border-hairline bg-surface-1 hover:border-ink relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-xs transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline-soft flex size-10 items-center justify-center rounded-xl border">
                <Sliders className="text-ink size-5" />
              </div>
              <Badge variant="accent" size="sm">
                Updated
              </Badge>
            </div>
            <h2 className="text-headline text-ink group-hover:text-fin-orange mt-4 font-semibold transition-colors">
              Button
            </h2>
            <p className="text-body-sm text-ink-muted mt-1">
              Action buttons with all design system variants (primary,
              secondary, outline, accent, brand, destructive), size ladder, and
              spinner.
            </p>
          </div>

          <div className="border-hairline-soft text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold">
            <span>Explore 15+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Input Card */}
        <Link
          href="/docs/components/input"
          className="group border-hairline bg-surface-1 hover:border-ink relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-xs transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-canvas border-hairline-soft flex size-10 items-center justify-center rounded-xl border">
                <SquareSquare className="text-ink size-5" />
              </div>
              <Badge variant="accent" size="sm">
                Updated
              </Badge>
            </div>
            <h2 className="text-headline text-ink group-hover:text-fin-orange mt-4 font-semibold transition-colors">
              Input
            </h2>
            <p className="text-body-sm text-ink-muted mt-1">
              Text inputs and form controls featuring surface tokens, hairline
              borders, icon adornments, prefixes/suffixes, and validation
              states.
            </p>
          </div>

          <div className="border-hairline-soft text-ink mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold">
            <span>Explore 10+ variants</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
