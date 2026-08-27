"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Mail,
  Lock,
  Sparkles,
  Zap,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Phone,
  Hash,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function InputDocsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const coreVariants = [
    {
      name: "default",
      label: "Default / Canvas",
      desc: "White canvas with hairline border",
      placeholder: "e.g. consumer@demo-vidhyut.local",
    },
    {
      name: "surface",
      label: "Surface (Card)",
      desc: "Light-gray card surface background",
      placeholder: "e.g. MTR-9823412",
    },
    {
      name: "secondary",
      label: "Secondary / Soft",
      desc: "Soft surface with transparent border",
      placeholder: "e.g. Jaipur North Zone",
    },
    {
      name: "outline",
      label: "Outline",
      desc: "Transparent background with hairline border",
      placeholder: "Search accounts...",
    },
    {
      name: "ghost",
      label: "Ghost",
      desc: "Minimal borderless field",
      placeholder: "Click to enter value...",
    },
    {
      name: "inverse",
      label: "Inverse / Dark",
      desc: "Dark surface elevated background",
      placeholder: "Dark theme input...",
    },
  ];

  const brandSemanticVariants = [
    {
      name: "accent",
      label: "Brand Accent (Blue)",
      desc: "#3b82f6 brand accent focus",
      placeholder: "Search documentation...",
    },
    {
      name: "success",
      label: "Semantic Success",
      desc: "#10b981 emerald verified state",
      placeholder: "Verified account ID...",
    },
    {
      name: "warning",
      label: "Semantic Warning",
      desc: "#f59e0b warning notification state",
      placeholder: "Pending review field...",
    },
    {
      name: "destructive",
      label: "Destructive / Error",
      desc: "#ef4444 validation error state",
      placeholder: "Invalid consumer ID...",
    },
  ];

  const pastelVariants = [
    {
      name: "badge-orange",
      label: "Pastel Orange",
      desc: "#fb923c pastel accent focus",
      placeholder: "Category tag value...",
    },
    {
      name: "badge-pink",
      label: "Pastel Pink",
      desc: "#ec4899 pastel accent focus",
      placeholder: "Project label...",
    },
    {
      name: "badge-violet",
      label: "Pastel Violet",
      desc: "#8b5cf6 pastel accent focus",
      placeholder: "Workflow trigger...",
    },
    {
      name: "badge-emerald",
      label: "Pastel Emerald",
      desc: "#34d399 pastel accent focus",
      placeholder: "Automation status...",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-medium tracking-tight">
            Input
          </h1>
          <Badge variant="accent" size="sm" shape="tag">
            Updated v2.0
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          Form text fields crafted to Cal.com design system specifications —
          featuring canvas and surface card backgrounds, hairline borders, size
          ladders, and validation feedback.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Input &#125; from &quot;@/components/ui/input&quot;;
          </code>
        </div>
      </div>

      {/* 1. Core Surfaces */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            1. Core Surfaces & Monochrome
          </h2>
          <p className="text-muted-text text-xs">
            Canvas (#ffffff), surface card (#f5f5f5), soft backgrounds, and dark
            inverse variants.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {coreVariants.map(({ name, label, desc, placeholder }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-3 rounded-xl border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-ink text-sm font-medium">{label}</span>
                  <div className="text-muted-text text-[11px]">{desc}</div>
                </div>
                <code className="text-muted-text font-mono text-xs">
                  variant=&quot;{name}&quot;
                </code>
              </div>
              <Input variant={name} placeholder={placeholder} />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Brand & Semantic */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            2. Brand Accent & Semantic Statuses
          </h2>
          <p className="text-muted-text text-xs">
            Cal brand blue and semantic feedback indicators.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {brandSemanticVariants.map(({ name, label, desc, placeholder }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-3 rounded-xl border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-ink text-sm font-medium">{label}</span>
                  <div className="text-muted-text text-[11px]">{desc}</div>
                </div>
                <code className="text-muted-text font-mono text-xs">
                  variant=&quot;{name}&quot;
                </code>
              </div>
              <Input variant={name} placeholder={placeholder} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Badge Pastel Ramps */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            3. Badge Pastel Themed Focus Ramps
          </h2>
          <p className="text-muted-text text-xs">
            Inputs featuring pastel accent borders aligned to category tags (
            {`--badge-orange`}, {`--badge-pink`}, {`--badge-violet`},{" "}
            {`--badge-emerald`}).
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pastelVariants.map(({ name, label, desc, placeholder }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-3 rounded-xl border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-ink text-sm font-medium">{label}</span>
                  <div className="text-muted-text text-[11px]">{desc}</div>
                </div>
                <code className="text-muted-text font-mono text-xs">
                  variant=&quot;{name}&quot;
                </code>
              </div>
              <Input variant={name} placeholder={placeholder} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sizes Ladder */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">4. Size Ladder</h2>
        <div className="border-hairline bg-surface-card shadow-subtle space-y-5 rounded-xl border p-6">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-medium">Compact</span>
              <code className="text-muted-text font-mono text-xs">
                size=&quot;compact&quot; (32px / h-8)
              </code>
            </div>
            <Input
              size="compact"
              placeholder="Compact input for dense toolbars and filter tables"
              leadingIcon={Search}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-medium">
                Default (Standard Touch Target)
              </span>
              <code className="text-muted-text font-mono text-xs">
                size=&quot;default&quot; (40px / h-10)
              </code>
            </div>
            <Input
              size="default"
              placeholder="Standard 40px height form control"
              leadingIcon={Mail}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-medium">Large</span>
              <code className="text-muted-text font-mono text-xs">
                size=&quot;lg&quot; (48px / h-12)
              </code>
            </div>
            <Input
              size="lg"
              placeholder="Prominent hero search or authentication input"
              leadingIcon={Search}
            />
          </div>
        </div>
      </section>

      {/* 5. Shapes (Border Radii) */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">
          5. Shapes & Border Radii
        </h2>
        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-4 rounded-xl border p-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;default&quot; / &quot;md&quot; (8px)
            </code>
            <Input shape="default" placeholder="Default control radius (8px)" />
          </div>

          <div className="space-y-1.5">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;sm&quot; / &quot;tag&quot; (6px)
            </code>
            <Input shape="sm" placeholder="Compact tag radius (6px)" />
          </div>

          <div className="space-y-1.5">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;lg&quot; (12px)
            </code>
            <Input shape="lg" placeholder="Card match radius (12px)" />
          </div>

          <div className="space-y-1.5">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;pill&quot; (9999px)
            </code>
            <Input shape="pill" placeholder="Pill search bar (rounded-full)" />
          </div>
        </div>
      </section>

      {/* 6. Icons, Prefixes, Suffixes & Labels */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">
          6. Icons, Prefixes, Suffixes & Labels
        </h2>
        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-5 rounded-xl border p-6 sm:grid-cols-2">
          <Input
            label="Consumer Phone Number"
            type="tel"
            placeholder="9876543210"
            leadingIcon={Phone}
            helperText="Enter 10-digit mobile number registered with electricity board"
          />

          <Input
            label="Consumer Meter ID"
            placeholder="MTR-88231"
            leadingIcon={Hash}
            suffix=".gov"
          />

          <Input
            label="Substation Portal URL"
            placeholder="substation-north"
            prefix="https://"
            suffix=".power.gov"
          />

          <div className="relative">
            <Input
              label="Portal Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your secret password"
              leadingIcon={Lock}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-muted-soft hover:text-ink absolute top-8.5 right-3 flex cursor-pointer items-center justify-center transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 7. Validation & Disabled States */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">
          7. Validation & Disabled States
        </h2>
        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-5 rounded-xl border p-6 sm:grid-cols-2">
          <Input
            label="Meter Number (Validation Error)"
            defaultValue="ABC-123"
            leadingIcon={AlertCircle}
            error="Meter number must be exactly 10 numeric digits."
          />

          <Input
            label="Service Connection ID"
            defaultValue="CONN-982103"
            disabled
            leadingIcon={Building}
            helperText="Connection ID is locked during active billing cycle."
          />
        </div>
      </section>
    </div>
  );
}
