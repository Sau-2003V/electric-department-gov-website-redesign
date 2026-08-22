import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Check,
  AlertTriangle,
  XCircle,
  Info,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Badge Component - Design System",
  description:
    "All available variants, sizes, and shapes for the Badge component.",
};

const allVariants = [
  // Brand & Surfaces
  { name: "default", label: "Default", icon: null },
  { name: "primary", label: "Primary", icon: null },
  { name: "secondary", label: "Secondary", icon: null },
  { name: "surface", label: "Surface", icon: null },
  { name: "canvas", label: "Canvas", icon: null },
  { name: "outline", label: "Outline", icon: null },
  { name: "outline-muted", label: "Outline Muted", icon: null },
  { name: "ghost", label: "Ghost", icon: null },
  { name: "link", label: "Link", icon: null },
  { name: "inverse", label: "Inverse", icon: null },

  // Brand Accents & Colors
  { name: "accent", label: "Accent", icon: Sparkles },
  { name: "accent-subtle", label: "Accent Subtle", icon: Sparkles },
  { name: "brand", label: "Brand Blue", icon: Zap },
  { name: "brand-subtle", label: "Brand Subtle", icon: Zap },

  // Semantic Statuses
  { name: "success", label: "Success", icon: Check },
  { name: "success-solid", label: "Success Solid", icon: Check },
  { name: "warning", label: "Warning", icon: AlertTriangle },
  { name: "warning-solid", label: "Warning Solid", icon: AlertTriangle },
  { name: "destructive", label: "Destructive", icon: XCircle },
  { name: "destructive-solid", label: "Destructive Solid", icon: XCircle },
  { name: "error", label: "Error", icon: XCircle },
  { name: "error-solid", label: "Error Solid", icon: XCircle },
  { name: "info", label: "Info", icon: Info },
  { name: "info-solid", label: "Info Solid", icon: Info },

  // In-Product Report Palette
  { name: "report-blue", label: "Report Blue", icon: null },
  { name: "report-green", label: "Report Green", icon: null },
  { name: "report-pink", label: "Report Pink", icon: null },
  { name: "report-lime", label: "Report Lime", icon: null },
  { name: "report-cyan", label: "Report Cyan", icon: null },
  { name: "report-orange", label: "Report Orange", icon: null },
];

export default function BadgeDocsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <h1 className="text-ink text-3xl font-semibold tracking-tight">
          Badge
        </h1>
        <p className="text-ink-muted text-sm">
          All available visual variants, sizes, and shapes for the Badge
          component.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-1 text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Badge &#125; from &quot;@/components/ui/badge&quot;;
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
              <Badge variant={name}>
                {Icon && <Icon className="size-3" />}
                <span>{label}</span>
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">Sizes</h2>
        <div className="border-hairline bg-surface-1 flex flex-wrap items-center gap-6 rounded-xl border p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              size=&quot;sm&quot;
            </code>
            <Badge variant="accent" size="sm">
              <Sparkles className="size-2.5" />
              Small (16px)
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              size=&quot;default&quot;
            </code>
            <Badge variant="accent" size="default">
              <Sparkles className="size-3" />
              Default (20px)
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              size=&quot;lg&quot;
            </code>
            <Badge variant="accent" size="lg">
              <Sparkles className="size-3.5" />
              Large (24px)
            </Badge>
          </div>
        </div>
      </section>

      {/* Shapes */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">
          Shapes (Border Radius)
        </h2>
        <div className="border-hairline bg-surface-1 flex flex-wrap items-center gap-6 rounded-xl border p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;pill&quot;
            </code>
            <Badge variant="default" shape="pill">
              Pill (Default)
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;rounded&quot;
            </code>
            <Badge variant="default" shape="rounded">
              Rounded (4px)
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;tag&quot;
            </code>
            <Badge variant="default" shape="tag">
              Tag (6px)
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;md&quot;
            </code>
            <Badge variant="default" shape="md">
              Medium (8px)
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
}
