"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Check,
  AlertTriangle,
  AlertOctagon,
  Info,
  Zap,
  Tag,
  ShieldCheck,
  Clock,
  CircleDot,
  Radio,
  ExternalLink,
} from "lucide-react";

export default function BadgeDocsPage() {
  const [selectedTag, setSelectedTag] = useState("all");

  const coreVariants = [
    { name: "default", label: "Default / Primary", icon: null },
    { name: "secondary", label: "Secondary (Card)", icon: null },
    { name: "surface", label: "Surface (Hairline)", icon: null },
    { name: "canvas", label: "Canvas Muted", icon: null },
    { name: "outline", label: "Outline", icon: null },
    { name: "outline-muted", label: "Outline Muted", icon: null },
    { name: "ghost", label: "Ghost", icon: null },
    { name: "link", label: "Link Style", icon: null },
    { name: "inverse", label: "Inverse / Dark", icon: null },
  ];

  const brandVariants = [
    { name: "accent", label: "Accent Blue", icon: Sparkles },
    { name: "accent-subtle", label: "Accent Subtle", icon: Sparkles },
    { name: "brand", label: "Brand Blue", icon: Zap },
    { name: "brand-subtle", label: "Brand Subtle", icon: Zap },
  ];

  const semanticVariants = [
    { name: "success", label: "Success Subtle", icon: Check },
    { name: "success-solid", label: "Success Solid", icon: Check },
    { name: "warning", label: "Warning Subtle", icon: AlertTriangle },
    { name: "warning-solid", label: "Warning Solid", icon: AlertTriangle },
    { name: "destructive", label: "Destructive Subtle", icon: AlertOctagon },
    {
      name: "destructive-solid",
      label: "Destructive Solid",
      icon: AlertOctagon,
    },
    { name: "info", label: "Info Subtle", icon: Info },
    { name: "info-solid", label: "Info Solid", icon: Info },
  ];

  const pastelVariants = [
    { name: "badge-orange", label: "Pastel Orange", hex: "#fb923c" },
    { name: "badge-orange-solid", label: "Orange Solid", hex: "#fb923c" },
    { name: "badge-pink", label: "Pastel Pink", hex: "#ec4899" },
    { name: "badge-pink-solid", label: "Pink Solid", hex: "#ec4899" },
    { name: "badge-violet", label: "Pastel Violet", hex: "#8b5cf6" },
    { name: "badge-violet-solid", label: "Violet Solid", hex: "#8b5cf6" },
    { name: "badge-emerald", label: "Pastel Emerald", hex: "#34d399" },
    { name: "badge-emerald-solid", label: "Emerald Solid", hex: "#34d399" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-medium tracking-tight">
            Badge
          </h1>
          <Badge variant="badge-orange" size="sm" shape="tag">
            Updated v2.0
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          Status tags, category pills, counters, and indicators aligned to the
          Cal.com design system with full pastel & semantic color ramps.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Badge &#125; from &quot;@/components/ui/badge&quot;;
          </code>
        </div>
      </div>

      {/* 1. Core & Surfaces */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            1. Core Surfaces & Monochrome
          </h2>
          <p className="text-muted-text text-xs">
            Clean, neutral surfaces that respect page context and hierarchy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreVariants.map(({ name, label }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex items-center justify-between rounded-xl border p-3.5"
            >
              <code className="text-muted-text font-mono text-xs font-medium">
                variant=&quot;{name}&quot;
              </code>
              <Badge variant={name}>{label}</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Brand Accent */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            2. Brand Accent (Cal Blue)
          </h2>
          <p className="text-muted-text text-xs">
            Used sparingly for feature tags and key callouts ({`--brand-accent`}{" "}
            #3b82f6).
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {brandVariants.map(({ name, label, icon: Icon }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex items-center justify-between rounded-xl border p-3.5"
            >
              <code className="text-muted-text font-mono text-xs font-medium">
                &quot;{name}&quot;
              </code>
              <Badge variant={name} icon={Icon}>
                {label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Badge Pastels */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            3. Badge Pastel Palette (from design.md)
          </h2>
          <p className="text-muted-text text-xs">
            Signature Cal.com pastel ramps for category badges, tags, and
            product UI chips.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pastelVariants.map(({ name, label, hex }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex items-center justify-between rounded-xl border p-3.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full shadow-xs"
                  style={{ backgroundColor: hex }}
                />
                <code className="text-muted-text font-mono text-xs font-medium">
                  &quot;{name}&quot;
                </code>
              </div>
              <Badge variant={name}>{label}</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Semantic Statuses */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            4. Semantic Statuses
          </h2>
          <p className="text-muted-text text-xs">
            Subtle background tints with matching borders or solid emphasis
            fills.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {semanticVariants.map(({ name, label, icon: Icon }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex items-center justify-between rounded-xl border p-3.5"
            >
              <code className="text-muted-text font-mono text-xs font-medium">
                &quot;{name}&quot;
              </code>
              <Badge variant={name} icon={Icon}>
                {label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Size Ladder */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">5. Size Ladder</h2>
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-6 rounded-xl border p-6">
          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              size=&quot;sm&quot; (16px)
            </code>
            <Badge variant="accent-subtle" size="sm" icon={Sparkles}>
              Small Chip
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              size=&quot;default&quot; (20px)
            </code>
            <Badge variant="accent-subtle" size="default" icon={Sparkles}>
              Default Tag
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              size=&quot;lg&quot; (24px)
            </code>
            <Badge variant="accent-subtle" size="lg" icon={Sparkles}>
              Large Indicator
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              size=&quot;pill&quot; (24px caption)
            </code>
            <Badge variant="badge-orange" size="pill">
              Design Spec Pill
            </Badge>
          </div>
        </div>
      </section>

      {/* 6. Shapes (Border Radius Scale) */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">
          6. Shapes & Border Radii
        </h2>
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-6 rounded-xl border p-6">
          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;pill&quot; (9999px)
            </code>
            <Badge variant="primary" shape="pill">
              Pill (Default)
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;rounded&quot; (4px / xs)
            </code>
            <Badge variant="secondary" shape="rounded">
              Rounded 4px
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;tag&quot; (6px / sm)
            </code>
            <Badge variant="accent-subtle" shape="tag">
              Tag 6px
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;md&quot; (8px / md)
            </code>
            <Badge variant="surface" shape="md">
              Control Radius 8px
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;lg&quot; (12px / lg)
            </code>
            <Badge variant="surface" shape="lg">
              Card Radius 12px
            </Badge>
          </div>
        </div>
      </section>

      {/* 7. Indicators, Dots, and Statuses */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">
          7. Live Status Indicators & Dots
        </h2>
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-6 rounded-xl border p-6">
          <Badge variant="success" dot size="default">
            System Operational
          </Badge>
          <Badge variant="warning" dot size="default">
            Maintenance Scheduled
          </Badge>
          <Badge variant="destructive" dot size="default">
            Incident Reported
          </Badge>
          <Badge variant="badge-violet" dot size="default">
            Fin AI Synthesizing
          </Badge>
          <Badge variant="outline" dot size="default">
            Draft
          </Badge>
        </div>
      </section>

      {/* 8. Interactive Filter Pills */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            8. Interactive Filter Tags
          </h2>
          <p className="text-muted-text text-xs">
            Clickable badge chips for category switching.
          </p>
        </div>
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-2.5 rounded-xl border p-6">
          {[
            { id: "all", label: "All Items" },
            { id: "product", label: "Product Updates" },
            { id: "engineering", label: "Engineering" },
            { id: "security", label: "Security & Compliance" },
            { id: "press", label: "Press Releases" },
          ].map((tag) => {
            const isSelected = selectedTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className="cursor-pointer focus:outline-none"
              >
                <Badge
                  variant={isSelected ? "primary" : "secondary"}
                  size="default"
                  shape="pill"
                  className={isSelected ? "shadow-sm" : "hover:border-hairline"}
                >
                  {tag.label}
                </Badge>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
