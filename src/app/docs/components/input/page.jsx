"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
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
  Send,
  Building,
} from "lucide-react";

export default function InputDocsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const allVariants = [
    {
      name: "default",
      label: "Default / Surface",
      placeholder: "e.g. consumer@vidhyut.gov.in",
    },
    {
      name: "canvas",
      label: "Canvas (Cream)",
      placeholder: "e.g. MTR-9823412",
    },
    {
      name: "secondary",
      label: "Secondary / Filled",
      placeholder: "e.g. Jaipur North Zone",
    },
    {
      name: "outline",
      label: "Outline",
      placeholder: "Search accounts...",
    },
    {
      name: "ghost",
      label: "Ghost",
      placeholder: "Click to enter value...",
    },
    {
      name: "accent",
      label: "Accent (Fin AI)",
      placeholder: "Ask Fin AI assistant...",
    },
    {
      name: "brand",
      label: "Brand Blue",
      placeholder: "Gov service reference...",
    },
    {
      name: "destructive",
      label: "Destructive / Error",
      placeholder: "Invalid input...",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <h1 className="text-ink text-3xl font-semibold tracking-tight">
          Input
        </h1>
        <p className="text-ink-muted text-sm">
          Form input field crafted with Intercom&apos;s editorial design system
          specifications — featuring surface tokens, hairline borders, size
          ladder, shape radiuses, icon slots, and validation states.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-1 text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Input &#125; from &quot;@/components/ui/input&quot;;
          </code>
        </div>
      </div>

      {/* All Available Variants */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">All Variants</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allVariants.map(({ name, label, placeholder }) => (
            <div
              key={name}
              className="border-hairline bg-surface-1 flex flex-col justify-between gap-3 rounded-xl border p-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-ink text-sm font-medium">{label}</span>
                <code className="text-ink-muted font-mono text-xs">
                  variant=&quot;{name}&quot;
                </code>
              </div>
              <Input variant={name} placeholder={placeholder} />
            </div>
          ))}
        </div>
      </section>

      {/* Sizes Ladder */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">Size Ladder</h2>
        <div className="border-hairline bg-surface-1 space-y-4 rounded-xl border p-6 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-medium">Compact</span>
              <code className="text-ink-muted font-mono text-xs">
                size=&quot;compact&quot; (32px / h-8)
              </code>
            </div>
            <Input
              size="compact"
              placeholder="Compact input for toolbars and filters"
              leadingIcon={Search}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-medium">
                Default (Touch Target &ge;44px)
              </span>
              <code className="text-ink-muted font-mono text-xs">
                size=&quot;default&quot; (40px–44px / h-10–h-11)
              </code>
            </div>
            <Input
              size="default"
              placeholder="Standard form input"
              leadingIcon={Mail}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-medium">Large</span>
              <code className="text-ink-muted font-mono text-xs">
                size=&quot;lg&quot; (48px / h-12)
              </code>
            </div>
            <Input
              size="lg"
              placeholder="Prominent hero search or auth input"
              leadingIcon={Search}
            />
          </div>
        </div>
      </section>

      {/* Shapes (Border Radii) */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">Shapes</h2>
        <div className="border-hairline bg-surface-1 grid grid-cols-1 gap-4 rounded-xl border p-6 shadow-xs sm:grid-cols-2">
          <div className="space-y-1.5">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;default&quot; / &quot;md&quot; (8px)
            </code>
            <Input shape="default" placeholder="Default rounded-md (8px)" />
          </div>

          <div className="space-y-1.5">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;lg&quot; (12px)
            </code>
            <Input shape="lg" placeholder="Card match rounded-lg (12px)" />
          </div>

          <div className="space-y-1.5">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;xl&quot; (16px)
            </code>
            <Input shape="xl" placeholder="Mockup tile rounded-xl (16px)" />
          </div>

          <div className="space-y-1.5">
            <code className="text-ink-muted font-mono text-xs">
              shape=&quot;pill&quot;
            </code>
            <Input shape="pill" placeholder="Pill rounded-full" />
          </div>
        </div>
      </section>

      {/* Icons, Prefixes, Suffixes & Labels */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">
          Icons, Prefixes, Suffixes & Labels
        </h2>
        <div className="border-hairline bg-surface-1 grid grid-cols-1 gap-5 rounded-xl border p-6 shadow-xs sm:grid-cols-2">
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
              className="text-ink-subtle hover:text-ink absolute top-8.5 right-3 flex items-center justify-center transition-colors"
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

      {/* Validation & Error States */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">
          Validation & Disabled States
        </h2>
        <div className="border-hairline bg-surface-1 grid grid-cols-1 gap-5 rounded-xl border p-6 shadow-xs sm:grid-cols-2">
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
