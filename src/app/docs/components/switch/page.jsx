"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Moon,
  Sun,
  Shield,
  Zap,
  Check,
  Flame,
  Volume2,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

export default function SwitchDocsPage() {
  const [demoChecked, setDemoChecked] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [colorStates, setColorStates] = useState({
    primary: true,
    accent: true,
    success: true,
    warning: true,
    destructive: true,
    "badge-orange": true,
    "badge-pink": true,
    "badge-violet": true,
    "badge-emerald": true,
  });

  const toggleColorState = (key) => {
    setColorStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const variantsList = [
    {
      name: "primary",
      label: "Primary (Monochrome)",
      desc: "Signature #111111 ink toggle",
    },
    {
      name: "accent",
      label: "Brand Accent (Blue)",
      desc: "#3b82f6 brand accent blue",
    },
    {
      name: "success",
      label: "Semantic Success",
      desc: "#10b981 emerald state",
    },
    {
      name: "warning",
      label: "Semantic Warning",
      desc: "#f59e0b amber warning state",
    },
    {
      name: "destructive",
      label: "Semantic Destructive",
      desc: "#ef4444 critical/error state",
    },
    {
      name: "badge-orange",
      label: "Pastel Orange",
      desc: "#fb923c pastel orange",
    },
    {
      name: "badge-pink",
      label: "Pastel Pink",
      desc: "#ec4899 pastel pink",
    },
    {
      name: "badge-violet",
      label: "Pastel Violet",
      desc: "#8b5cf6 pastel violet",
    },
    {
      name: "badge-emerald",
      label: "Pastel Emerald",
      desc: "#34d399 pastel emerald",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-medium tracking-tight">
            Switch
          </h1>
          <Badge variant="accent" size="sm" shape="tag">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          A tactile toggle switch for binary preferences, featuring damped
          spring micro-motion, drag gestures, all design tokens, and size
          ladders.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Switch &#125; from &quot;@/components/ui/switch&quot;;
          </code>
        </div>
      </div>

      {/* Interactive Hero Playground */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">
          Live Interactive Playground
        </h2>
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-col items-center justify-between gap-6 rounded-2xl border p-8 sm:flex-row">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <h3 className="text-ink text-base font-medium">
                Dynamic Spring Physics
              </h3>
              <Badge variant={demoChecked ? "success" : "secondary"} size="sm">
                {demoChecked ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <p className="text-muted-text text-xs">
              Supports click, touch tap, and fluid pointer dragging with
              velocity damping.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Switch
              size="lg"
              variant="primary"
              checked={demoChecked}
              onCheckedChange={setDemoChecked}
              label={demoChecked ? "Active State" : "Inactive State"}
              description="Click or drag thumb to toggle"
            />
          </div>
        </div>
      </section>

      {/* 1. All Color Variants */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            1. Color Variants & Brand Tokens
          </h2>
          <p className="text-muted-text text-xs">
            Variants mapped to primary ink, brand accent blue, semantic
            statuses, and pastel badges.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {variantsList.map(({ name, label, desc }) => (
            <div
              key={name}
              className="border-hairline bg-surface-card shadow-subtle flex items-center justify-between rounded-xl border p-4"
            >
              <div className="space-y-0.5">
                <div className="text-ink text-xs font-medium">{label}</div>
                <code className="text-muted-text font-mono text-[11px]">
                  variant=&quot;{name}&quot;
                </code>
              </div>
              <Switch
                variant={name}
                checked={colorStates[name]}
                onCheckedChange={() => toggleColorState(name)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Size Ladder */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">2. Size Ladder</h2>
          <p className="text-muted-text text-xs">
            Sized for compact toolbars, standard dialogs, and high-emphasis
            settings cards.
          </p>
        </div>
        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-6 rounded-xl border p-6 md:grid-cols-3">
          {/* Compact */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ink text-xs font-medium">
                Compact (28px)
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                size=&quot;compact&quot;
              </code>
            </div>
            <div className="bg-canvas border-hairline rounded-lg border p-3">
              <Switch
                size="compact"
                variant="primary"
                defaultChecked={true}
                label="Compact Mode"
                description="Dense surface filter bar"
              />
            </div>
          </div>

          {/* Default */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ink text-xs font-medium">
                Default (36px)
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                size=&quot;default&quot;
              </code>
            </div>
            <div className="bg-canvas border-hairline rounded-lg border p-3">
              <Switch
                size="default"
                variant="primary"
                defaultChecked={true}
                label="Standard Control"
                description="Default 16px thumb size"
              />
            </div>
          </div>

          {/* Large */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ink text-xs font-medium">Large (44px)</span>
              <code className="text-muted-text font-mono text-[11px]">
                size=&quot;lg&quot;
              </code>
            </div>
            <div className="bg-canvas border-hairline rounded-lg border p-3">
              <Switch
                size="lg"
                variant="accent"
                defaultChecked={true}
                label="Prominent Setting"
                description="High emphasis touch target"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shapes: Pill vs Squircle Rounded */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            3. Shapes & Border Radii
          </h2>
          <p className="text-muted-text text-xs">
            Choose between traditional organic pill or modern squircle geometry.
          </p>
        </div>
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-6 rounded-xl border p-6">
          <div className="flex items-center gap-4">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;pill&quot; (Default)
            </code>
            <Switch
              shape="pill"
              variant="primary"
              defaultChecked={true}
              label="Pill Geometry"
            />
          </div>

          <div className="flex items-center gap-4">
            <code className="text-muted-text font-mono text-xs">
              shape=&quot;rounded&quot; (Squircle 8px)
            </code>
            <Switch
              shape="rounded"
              variant="accent"
              defaultChecked={true}
              label="Rounded Squircle"
            />
          </div>
        </div>
      </section>

      {/* 4. Real-world Settings Card Pattern */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            4. Form & Preferences Settings Card
          </h2>
          <p className="text-muted-text text-xs">
            Using Switch with left or right label placement and descriptive
            helper text.
          </p>
        </div>
        <div className="border-hairline bg-canvas divide-hairline shadow-subtle divide-y overflow-hidden rounded-2xl border">
          {/* Row 1 */}
          <div className="hover:bg-surface-card/40 flex items-center justify-between p-4.5 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="bg-surface-card border-hairline flex size-9 items-center justify-center rounded-lg border">
                <Bell className="text-ink size-4" />
              </div>
              <div>
                <div className="text-ink text-sm font-medium">
                  Push Notifications
                </div>
                <div className="text-muted-text text-xs">
                  Receive real-time alerts on booking changes
                </div>
              </div>
            </div>
            <Switch
              variant="primary"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          {/* Row 2 */}
          <div className="hover:bg-surface-card/40 flex items-center justify-between p-4.5 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="bg-surface-card border-hairline flex size-9 items-center justify-center rounded-lg border">
                <Shield className="text-brand-accent size-4" />
              </div>
              <div>
                <div className="text-ink text-sm font-medium">
                  Two-Factor Authentication
                </div>
                <div className="text-muted-text text-xs">
                  Require OTP confirmation for sensitive operations
                </div>
              </div>
            </div>
            <Switch
              variant="accent"
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
          </div>

          {/* Row 3 */}
          <div className="hover:bg-surface-card/40 flex items-center justify-between p-4.5 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="bg-surface-card border-hairline flex size-9 items-center justify-center rounded-lg border">
                <Volume2 className="text-muted-text size-4" />
              </div>
              <div>
                <div className="text-ink text-sm font-medium">
                  Sound Effects
                </div>
                <div className="text-muted-text text-xs">
                  Play chime on meeting start and alert pings
                </div>
              </div>
            </div>
            <Switch
              variant="primary"
              checked={soundEffects}
              onCheckedChange={setSoundEffects}
            />
          </div>

          {/* Row 4 */}
          <div className="hover:bg-surface-card/40 flex items-center justify-between p-4.5 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="bg-surface-card border-hairline flex size-9 items-center justify-center rounded-lg border">
                <Zap className="size-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-ink text-sm font-medium">
                  Automatic Availability Sync
                </div>
                <div className="text-muted-text text-xs">
                  Instantly sync Google and Outlook calendars
                </div>
              </div>
            </div>
            <Switch
              variant="success"
              checked={autoUpdate}
              onCheckedChange={setAutoUpdate}
            />
          </div>
        </div>
      </section>

      {/* 5. Disabled State */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-medium">5. Disabled States</h2>
        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-6 rounded-xl border p-6">
          <Switch
            disabled
            defaultChecked={false}
            label="Disabled (Unchecked)"
            description="Interaction locked by admin policy"
          />
          <Switch
            disabled
            defaultChecked={true}
            variant="primary"
            label="Disabled (Checked)"
            description="Interaction locked"
          />
        </div>
      </section>
    </div>
  );
}
