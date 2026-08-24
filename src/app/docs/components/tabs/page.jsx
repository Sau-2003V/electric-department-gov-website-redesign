"use client";

import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabItem,
  TabPanel,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Users,
  Building2,
  Calendar,
  Clock,
  Sparkles,
  Zap,
  Shield,
  Activity,
  Layers,
  FileText,
  CreditCard,
  Settings,
  Bell,
} from "lucide-react";

export default function TabsDocsPage() {
  const [activeSegment, setActiveSegment] = useState("teams");
  const [billingCycle, setBillingCycle] = useState("annual");

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-semibold tracking-tight">
            Tabs & Nav-Pill-Group
          </h1>
          <Badge variant="accent" size="sm" shape="tag">
            Signature Component
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          Cal.com&apos;s signature interactive switcher featuring fluid spring
          physics, proximity hover glow, pill-in-pill active lifts, and
          underline tab bars.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Tabs, TabsList, TabItem, TabPanel &#125; from
            &quot;@/components/ui/tabs&quot;;
          </code>
        </div>
      </div>

      {/* 1. Signature Nav-Pill-Group Demo */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">
            1. Signature Nav-Pill-Group (Product Switcher)
          </h2>
          <p className="text-muted-text text-xs">
            The system&apos;s signature interactive pill wrapper (
            {`bg-surface-soft`} #f8f9fa with white canvas active pill).
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle flex flex-col items-center justify-center gap-6 rounded-2xl border p-8">
          <Tabs
            value={activeSegment}
            onValueChange={setActiveSegment}
            className="flex flex-col items-center"
          >
            <TabsList variant="nav-pill-group" size="default">
              <TabItem value="personal" icon={User} label="Personal" />
              <TabItem
                value="teams"
                icon={Users}
                label="Teams"
                badge="Popular"
              />
              <TabItem value="enterprise" icon={Building2} label="Enterprise" />
            </TabsList>

            {/* Tab Panels */}
            <div className="w-full max-w-lg pt-4">
              <TabPanel value="personal">
                <div className="bg-canvas border-hairline shadow-subtle rounded-xl border p-6 text-center">
                  <div className="bg-brand-accent/10 text-brand-accent mx-auto mb-2 flex size-10 items-center justify-center rounded-full">
                    <User className="size-5" />
                  </div>
                  <h3 className="text-ink text-base font-semibold">
                    Personal Scheduling
                  </h3>
                  <p className="text-muted-text mt-1 text-xs">
                    Free forever for individuals booking 1-on-1 meetings,
                    calendar sync, and video calls.
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Button variant="primary" size="compact">
                      Get Started Free
                    </Button>
                    <Button variant="secondary" size="compact">
                      Learn More
                    </Button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="teams">
                <div className="bg-canvas border-hairline shadow-subtle rounded-xl border p-6 text-center">
                  <div className="bg-badge-orange/15 mx-auto mb-2 flex size-10 items-center justify-center rounded-full text-orange-600">
                    <Users className="size-5" />
                  </div>
                  <h3 className="text-ink text-base font-semibold">
                    Team Scheduling & Round-Robin
                  </h3>
                  <p className="text-muted-text mt-1 text-xs">
                    Collective meetings, round-robin assignment, routing forms,
                    and shared availability pools.
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Button variant="primary" size="compact">
                      Start Team Trial
                    </Button>
                    <Button variant="secondary" size="compact">
                      View Pricing
                    </Button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="enterprise">
                <div className="bg-canvas border-hairline shadow-subtle rounded-xl border p-6 text-center">
                  <div className="bg-badge-violet/15 mx-auto mb-2 flex size-10 items-center justify-center rounded-full text-violet-600">
                    <Building2 className="size-5" />
                  </div>
                  <h3 className="text-ink text-base font-semibold">
                    Enterprise Deployment
                  </h3>
                  <p className="text-muted-text mt-1 text-xs">
                    SSO/SAML, SCIM provisioning, custom domain white-labeling,
                    audit logs, and 99.99% SLA.
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Button variant="primary" size="compact">
                      Contact Enterprise Sales
                    </Button>
                    <Button variant="secondary" size="compact">
                      Security Whitepaper
                    </Button>
                  </div>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </section>

      {/* 2. Visual Variants */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">2. Visual Variants</h2>
          <p className="text-muted-text text-xs">
            Pill, segmented squircle, surface card, and underline tab bars.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Segmented Squircle */}
          <div className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-semibold">
                Segmented / Squircle
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                variant=&quot;segmented&quot;
              </code>
            </div>
            <Tabs defaultValue="month">
              <TabsList variant="segmented">
                <TabItem value="day" label="Day" />
                <TabItem value="week" label="Week" />
                <TabItem value="month" label="Month" />
                <TabItem value="year" label="Year" />
              </TabsList>
            </Tabs>
          </div>

          {/* Underline Line */}
          <div className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-semibold">
                Underline Bar
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                variant=&quot;underline&quot;
              </code>
            </div>
            <Tabs defaultValue="overview">
              <TabsList variant="underline">
                <TabItem value="overview" label="Overview" />
                <TabItem value="analytics" label="Analytics" />
                <TabItem value="reports" label="Reports" />
                <TabItem value="settings" label="Settings" />
              </TabsList>
            </Tabs>
          </div>

          {/* Surface Card */}
          <div className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-semibold">
                Surface Card Wrapper
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                variant=&quot;surface&quot;
              </code>
            </div>
            <Tabs defaultValue="incoming">
              <TabsList variant="surface">
                <TabItem value="incoming" label="Incoming" badge="12" />
                <TabItem value="processed" label="Processed" />
                <TabItem value="archived" label="Archived" />
              </TabsList>
            </Tabs>
          </div>

          {/* Ghost / Minimal */}
          <div className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <span className="text-ink text-sm font-semibold">
                Ghost Minimal
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                variant=&quot;ghost&quot;
              </code>
            </div>
            <Tabs defaultValue="grid">
              <TabsList variant="ghost">
                <TabItem value="grid" icon={Layers} label="Grid View" />
                <TabItem value="list" icon={FileText} label="List View" />
                <TabItem value="activity" icon={Activity} label="Activity" />
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* 3. Size Ladder */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">3. Size Ladder</h2>
          <p className="text-muted-text text-xs">
            Compact (28px), Default (36px), and Large (44px) control heights.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle space-y-6 rounded-xl border p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-ink text-xs font-semibold">
                Compact (28px height / text 12px)
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                size=&quot;compact&quot;
              </code>
            </div>
            <Tabs defaultValue="tab1">
              <TabsList size="compact" variant="pill">
                <TabItem value="tab1" label="All Records" />
                <TabItem value="tab2" label="Pending" badge="3" />
                <TabItem value="tab3" label="Completed" />
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-ink text-xs font-semibold">
                Default (36px height / text 14px)
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                size=&quot;default&quot;
              </code>
            </div>
            <Tabs defaultValue="tab1">
              <TabsList size="default" variant="pill">
                <TabItem value="tab1" label="All Records" />
                <TabItem value="tab2" label="Pending" badge="3" />
                <TabItem value="tab3" label="Completed" />
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-ink text-xs font-semibold">
                Large (44px height / text 15px)
              </span>
              <code className="text-muted-text font-mono text-[11px]">
                size=&quot;lg&quot;
              </code>
            </div>
            <Tabs defaultValue="tab1">
              <TabsList size="lg" variant="pill">
                <TabItem value="tab1" label="All Records" />
                <TabItem value="tab2" label="Pending" badge="3" />
                <TabItem value="tab3" label="Completed" />
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* 4. Pricing / Billing Switcher Example */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">
            4. Billing Period Toggle Pattern
          </h2>
          <p className="text-muted-text text-xs">
            Standard SaaS pricing toggle with annual discount badge pill.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
          <Tabs value={billingCycle} onValueChange={setBillingCycle}>
            <TabsList variant="nav-pill-group" size="default">
              <TabItem value="monthly" label="Monthly Billing" />
              <TabItem
                value="annual"
                label="Annual Billing"
                badge={
                  <Badge variant="badge-emerald" size="sm" shape="pill">
                    Save 20%
                  </Badge>
                }
              />
            </TabsList>
          </Tabs>
          <p className="text-muted-text text-xs">
            Selected cycle:{" "}
            <span className="text-ink font-semibold capitalize">
              {billingCycle}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
