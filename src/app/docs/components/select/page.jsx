"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Clock,
  Calendar,
  Sparkles,
  Shield,
  Layers,
  MapPin,
  Check,
} from "lucide-react";

export default function SelectDocsPage() {
  const [tz, setTz] = useState("est");
  const [plan, setPlan] = useState("pro");
  const [sizeVal, setSizeVal] = useState("default");

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-semibold tracking-tight">
            Select
          </h1>
          <Badge variant="accent" size="sm" shape="tag">
            Updated v2.0
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          Form select dropdowns with proximity hover glow, spring micro-motion,
          check indicators, label groups, and size ladders.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Select, SelectTrigger, SelectContent, SelectItem,
            SelectGroup, SelectLabel, SelectSeparator &#125; from
            &quot;@/components/ui/select&quot;;
          </code>
        </div>
      </div>

      {/* 1. Interactive Selects */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">
            1. Interactive Selects
          </h2>
          <p className="text-muted-text text-xs">
            Click any trigger to open the options popover.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-6 rounded-2xl border p-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Timezone Selector */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-semibold">
                Timezone Selector
              </h3>
              <p className="text-muted-text text-xs">
                Standard select trigger with leading icon.
              </p>
            </div>
            <div>
              <Select value={tz} onValueChange={setTz}>
                <SelectTrigger
                  icon={Globe}
                  label="Select Timezone"
                  placeholder="Choose timezone…"
                />
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem index={0} value="est">
                      Eastern Time (US & Canada)
                    </SelectItem>
                    <SelectItem index={1} value="cst">
                      Central Time (US & Canada)
                    </SelectItem>
                    <SelectItem index={2} value="pst">
                      Pacific Time (US & Canada)
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Europe & Asia</SelectLabel>
                    <SelectItem index={3} value="gmt">
                      London (GMT +0)
                    </SelectItem>
                    <SelectItem index={4} value="cet">
                      Central European Time (CET)
                    </SelectItem>
                    <SelectItem index={5} value="ist">
                      India Standard Time (IST)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subscription Tier */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-semibold">Plan Level</h3>
              <p className="text-muted-text text-xs">
                Surface card background with category tiers.
              </p>
            </div>
            <div>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger
                  variant="card"
                  label="Subscription Plan"
                  placeholder="Select a plan…"
                />
                <SelectContent>
                  <SelectItem index={0} value="starter">
                    Starter — $12/seat/mo
                  </SelectItem>
                  <SelectItem index={1} value="pro">
                    Pro Team — $29/seat/mo
                  </SelectItem>
                  <SelectItem index={2} value="enterprise">
                    Enterprise Custom
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Validation Error State */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-semibold">
                Validation State
              </h3>
              <p className="text-muted-text text-xs">
                Error border and feedback message display.
              </p>
            </div>
            <div>
              <Select defaultValue="">
                <SelectTrigger
                  label="Billing Currency"
                  placeholder="Choose currency…"
                  error="Please select a valid payment currency"
                />
                <SelectContent>
                  <SelectItem index={0} value="usd">
                    USD ($)
                  </SelectItem>
                  <SelectItem index={1} value="eur">
                    EUR (€)
                  </SelectItem>
                  <SelectItem index={2} value="gbp">
                    GBP (£)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Size Ladder */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">2. Size Ladder</h2>
          <p className="text-muted-text text-xs">
            Select triggers scale through 32px compact, 40px standard, and 48px
            large.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-end gap-6 rounded-2xl border p-6">
          <div className="w-56">
            <Select defaultValue="compact">
              <SelectTrigger size="compact" label="Compact (32px)" />
              <SelectContent>
                <SelectItem index={0} value="compact">
                  Compact Option
                </SelectItem>
                <SelectItem index={1} value="opt2">
                  Secondary Option
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-64">
            <Select defaultValue="default">
              <SelectTrigger size="default" label="Default (40px)" />
              <SelectContent>
                <SelectItem index={0} value="default">
                  Standard Option
                </SelectItem>
                <SelectItem index={1} value="opt2">
                  Secondary Option
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-72">
            <Select defaultValue="large">
              <SelectTrigger size="lg" label="Large (48px)" />
              <SelectContent>
                <SelectItem index={0} value="large">
                  Large Option
                </SelectItem>
                <SelectItem index={1} value="opt2">
                  Secondary Option
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
}
