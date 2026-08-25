"use client";

import { useState } from "react";
import { Bell, ZapOff, ReceiptText, TrendingUp, ShieldAlert, MessageSquare, Mail, PhoneCall, Check, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function NotificationsTab() {
  const [preferences, setPreferences] = useState({
    outageSms: true,
    billReminders: true,
    highConsumption: true,
    paymentReceipts: true,
    emergencyBroadcasts: true,
    channelSms: true,
    channelWhatsapp: true,
    channelEmail: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Notification preferences updated", {
        description: "Your alert subscriptions and preferred channels are active.",
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Alert Subscription Options */}
      <div className="border border-hairline bg-canvas rounded-xl p-5 sm:p-7 shadow-subtle space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-ink font-semibold">
              Outage & Billing Notification Channels
            </h3>
            <Badge variant="accent-subtle" size="sm" text="Real-time Feed" />
          </div>
          <p className="text-body-sm text-muted-text mt-0.5">
            Configure how and when the Department notifies you regarding grid status, maintenance, and bills.
          </p>
        </div>

        <div className="border-t border-hairline divide-y divide-hairline">
          {/* Item 1: Planned Maintenance Outages */}
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-ink shrink-0 mt-0.5">
                <ZapOff className="size-4.5 text-warning" />
              </div>
              <div className="space-y-0.5">
                <p className="text-title-sm text-ink font-semibold">
                  Scheduled Maintenance Outage Alerts
                </p>
                <p className="text-body-sm text-muted-text">
                  Get notified 24 to 48 hours prior to scheduled feeder shutdowns, pole maintenance, and transformer overhauls.
                </p>
                <span className="inline-block text-[11px] text-muted-soft font-mono">
                  Channels: SMS · WhatsApp · Email
                </span>
              </div>
            </div>
            <Switch
              checked={preferences.outageSms}
              onCheckedChange={() => togglePreference("outageSms")}
              aria-label="Toggle Scheduled Maintenance Outage Alerts"
            />
          </div>

          {/* Item 2: Bill Generation & Due Dates */}
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-ink shrink-0 mt-0.5">
                <ReceiptText className="size-4.5 text-brand-accent" />
              </div>
              <div className="space-y-0.5">
                <p className="text-title-sm text-ink font-semibold">
                  Bill Generation & Due Date Reminders
                </p>
                <p className="text-body-sm text-muted-text">
                  Instant notice when your monthly bill is calculated, followed by reminders 7 days and 2 days before the due date.
                </p>
                <span className="inline-block text-[11px] text-muted-soft font-mono">
                  Channels: WhatsApp · SMS · Email
                </span>
              </div>
            </div>
            <Switch
              checked={preferences.billReminders}
              onCheckedChange={() => togglePreference("billReminders")}
              aria-label="Toggle Bill Generation & Due Date Reminders"
            />
          </div>

          {/* Item 3: High Consumption Spike Warning */}
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-ink shrink-0 mt-0.5">
                <TrendingUp className="size-4.5 text-badge-orange" />
              </div>
              <div className="space-y-0.5">
                <p className="text-title-sm text-ink font-semibold">
                  High Consumption & Surge Alert
                </p>
                <p className="text-body-sm text-muted-text">
                  Automated smart-meter alert if month-to-date kilowatt-hour consumption exceeds your historical 3-month baseline by 25%.
                </p>
                <span className="inline-block text-[11px] text-muted-soft font-mono">
                  Smart Meter Feature
                </span>
              </div>
            </div>
            <Switch
              checked={preferences.highConsumption}
              onCheckedChange={() => togglePreference("highConsumption")}
              aria-label="Toggle High Consumption Alerts"
            />
          </div>

          {/* Item 4: Instant Payment Receipt */}
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-ink shrink-0 mt-0.5">
                <Check className="size-4.5 text-success" />
              </div>
              <div className="space-y-0.5">
                <p className="text-title-sm text-ink font-semibold">
                  Instant Payment Confirmation & PDF Receipt
                </p>
                <p className="text-body-sm text-muted-text">
                  Receive verifiable digital receipts with transaction reference numbers immediately upon online or counter settlement.
                </p>
                <span className="inline-block text-[11px] text-muted-soft font-mono">
                  Channels: WhatsApp · Email
                </span>
              </div>
            </div>
            <Switch
              checked={preferences.paymentReceipts}
              onCheckedChange={() => togglePreference("paymentReceipts")}
              aria-label="Toggle Payment Receipts"
            />
          </div>

          {/* Item 5: Emergency Feeder Tripping */}
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-ink shrink-0 mt-0.5">
                <ShieldAlert className="size-4.5 text-error" />
              </div>
              <div className="space-y-0.5">
                <p className="text-title-sm text-ink font-semibold">
                  Grid Breakdown & Restoration Broadcasts
                </p>
                <p className="text-body-sm text-muted-text">
                  Real-time status updates when substation circuit breakers trip or unexpected weather hazards cause widespread outage.
                </p>
                <span className="inline-block text-[11px] text-muted-soft font-mono">
                  High Priority SMS Broadcast
                </span>
              </div>
            </div>
            <Switch
              checked={preferences.emergencyBroadcasts}
              onCheckedChange={() => togglePreference("emergencyBroadcasts")}
              aria-label="Toggle Emergency Grid Broadcasts"
            />
          </div>
        </div>

        {/* Channel Deliverability Hub */}
        <div className="pt-4 border-t border-hairline">
          <h4 className="text-title-sm text-ink font-semibold mb-3">
            Active Delivery Gateways
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => togglePreference("channelWhatsapp")}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                preferences.channelWhatsapp
                  ? "border-success bg-success/5 text-ink"
                  : "border-hairline bg-surface-card text-muted-text opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <MessageSquare className="size-4 text-success" />
                <span className="text-xs font-semibold">
                  {preferences.channelWhatsapp ? "Active" : "Paused"}
                </span>
              </div>
              <p className="font-semibold text-sm">WhatsApp Gateway</p>
              <p className="text-[11px] text-muted-text">Direct PDF & status cards</p>
            </div>

            <div
              onClick={() => togglePreference("channelSms")}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                preferences.channelSms
                  ? "border-brand-accent bg-brand-accent/5 text-ink"
                  : "border-hairline bg-surface-card text-muted-text opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <PhoneCall className="size-4 text-brand-accent" />
                <span className="text-xs font-semibold">
                  {preferences.channelSms ? "Active" : "Paused"}
                </span>
              </div>
              <p className="font-semibold text-sm">Official SMS Gateway</p>
              <p className="text-[11px] text-muted-text">Header: GOV-ELECIN</p>
            </div>

            <div
              onClick={() => togglePreference("channelEmail")}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                preferences.channelEmail
                  ? "border-ink bg-surface-card text-ink"
                  : "border-hairline bg-surface-card text-muted-text opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Mail className="size-4 text-ink" />
                <span className="text-xs font-semibold">
                  {preferences.channelEmail ? "Active" : "Paused"}
                </span>
              </div>
              <p className="font-semibold text-sm">Email Invoicing</p>
              <p className="text-[11px] text-muted-text">Monthly detailed e-statements</p>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="border-t border-hairline pt-5 flex items-center justify-end">
          <Button
            type="button"
            variant="primary"
            loading={isSaving}
            onClick={handleSave}
            icon={Save}
          >
            Save notification preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
