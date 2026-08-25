"use client";

import { useState } from "react";
import {
  Leaf,
  CreditCard,
  Sun,
  Award,
  Landmark,
  CheckCircle,
  Save,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function BillingTab() {
  const [billingConfig, setBillingConfig] = useState({
    greenBill: true,
    autoPay: true,
    solarExportCredits: true,
    lifelineSubsidy: true,
    preferredGateway: "upi",
  });

  const [isSaving, setIsSaving] = useState(false);

  const toggleConfig = (key) => {
    setBillingConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Billing preferences updated", {
        description:
          "Your invoice delivery mode and payment mandate settings have been saved.",
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Billing Preferences Card */}
      <div className="border-hairline bg-canvas shadow-subtle space-y-6 rounded-xl border p-5 sm:p-7">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-ink font-medium">
              Invoice Delivery & Auto-Settlement
            </h3>
            <Badge
              variant="badge-emerald"
              size="sm"
              text="Green Tariff Active"
            />
          </div>
          <p className="text-body-sm text-muted-text mt-0.5">
            Manage paperless rebate options, recurring auto-debit mandates, and
            rooftop solar billing.
          </p>
        </div>

        <div className="border-hairline divide-hairline divide-y border-t">
          {/* Green Bill Paperless Rebate */}
          <div className="flex items-start justify-between gap-4 py-4.5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Leaf className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-medium">
                    Paperless Green Bill (Opt-in)
                  </p>
                  <Badge
                    variant="success-solid"
                    size="sm"
                    text="₹20 / Month Rebate"
                  />
                </div>
                <p className="text-body-sm text-muted-text">
                  Discontinue paper delivery by meter-readers. Receive
                  authenticated digital PDF invoices on WhatsApp and Email to
                  save trees and earn monthly bill discounts.
                </p>
              </div>
            </div>
            <Switch
              checked={billingConfig.greenBill}
              onCheckedChange={() => toggleConfig("greenBill")}
              aria-label="Toggle Paperless Green Bill"
            />
          </div>

          {/* Auto-Debit Mandate (e-NACH / UPI) */}
          <div className="flex items-start justify-between gap-4 py-4.5">
            <div className="flex items-start gap-3">
              <div className="bg-surface-card border-hairline text-ink mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border">
                <CreditCard className="text-brand-accent size-4.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-medium">
                    e-NACH / UPI Auto-Pay Mandate
                  </p>
                  <Badge
                    variant="secondary"
                    size="sm"
                    text="Active · State Bank of India"
                  />
                </div>
                <p className="text-body-sm text-muted-text">
                  Automatically settle monthly energy consumption charges 2 days
                  before the due date. Avoid late payment surcharges (LPS) and
                  disconnection notices.
                </p>
                <div className="text-muted-soft flex items-center gap-2 pt-1 font-mono text-[11px]">
                  <span>Mandate Ref: UMRN-SBIN-892019482</span>
                  <span>•</span>
                  <span>Limit: Up to ₹15,000/mo</span>
                </div>
              </div>
            </div>
            <Switch
              checked={billingConfig.autoPay}
              onCheckedChange={() => toggleConfig("autoPay")}
              aria-label="Toggle Auto-Pay"
            />
          </div>

          {/* Rooftop Solar Net Metering */}
          <div className="flex items-start justify-between gap-4 py-4.5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
                <Sun className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-medium">
                    Rooftop Solar Export Credit Integration
                  </p>
                  <Badge
                    variant="badge-orange"
                    size="sm"
                    text="3.0 kW Plant Linked"
                  />
                </div>
                <p className="text-body-sm text-muted-text">
                  Display bi-directional import/export power generation units on
                  monthly bills and carry forward surplus kilowatt credits to
                  subsequent billing cycles.
                </p>
              </div>
            </div>
            <Switch
              checked={billingConfig.solarExportCredits}
              onCheckedChange={() => toggleConfig("solarExportCredits")}
              aria-label="Toggle Solar Export Credits"
            />
          </div>

          {/* Government Tariff Subsidy Scheme */}
          <div className="flex items-start justify-between gap-4 py-4.5">
            <div className="flex items-start gap-3">
              <div className="bg-surface-card border-hairline text-ink mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border">
                <Award className="text-badge-violet size-4.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-medium">
                    Government Domestic Tariff Subsidy
                  </p>
                  <Badge variant="badge-violet" size="sm" text="DBT Linked" />
                </div>
                <p className="text-body-sm text-muted-text">
                  Direct Benefit Transfer (DBT) credit of ₹1.50/unit for
                  consumption under 200 kWh/month under State Clean Energy &
                  Domestic Welfare scheme.
                </p>
                <div className="text-muted-soft pt-1 font-mono text-[11px]">
                  Beneficiary Aadhar Token: *******4892 · Status: Verified
                </div>
              </div>
            </div>
            <Switch
              checked={billingConfig.lifelineSubsidy}
              onCheckedChange={() => toggleConfig("lifelineSubsidy")}
              aria-label="Toggle Tariff Subsidy"
            />
          </div>
        </div>

        {/* Preferred Payment Gateway */}
        <div className="border-hairline border-t pt-4">
          <h4 className="text-title-sm text-ink mb-3 font-medium">
            Default Instant Payment Route
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div
              onClick={() =>
                setBillingConfig((prev) => ({
                  ...prev,
                  preferredGateway: "upi",
                }))
              }
              className={`cursor-pointer rounded-lg border p-3.5 transition-all ${
                billingConfig.preferredGateway === "upi"
                  ? "border-ink bg-surface-card text-ink ring-ink font-medium ring-1"
                  : "border-hairline bg-canvas text-muted-text hover:border-hairline/80"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-muted-soft font-mono text-xs tracking-wider uppercase">
                  Fastest
                </span>
                {billingConfig.preferredGateway === "upi" && (
                  <CheckCircle className="text-success size-3.5" />
                )}
              </div>
              <p className="text-sm">UPI / QR Code</p>
              <p className="text-muted-text text-[11px] font-normal">
                Google Pay, PhonePe, BHIM (Zero Fee)
              </p>
            </div>

            <div
              onClick={() =>
                setBillingConfig((prev) => ({
                  ...prev,
                  preferredGateway: "netbanking",
                }))
              }
              className={`cursor-pointer rounded-lg border p-3.5 transition-all ${
                billingConfig.preferredGateway === "netbanking"
                  ? "border-ink bg-surface-card text-ink ring-ink font-medium ring-1"
                  : "border-hairline bg-canvas text-muted-text hover:border-hairline/80"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <Landmark className="text-muted-soft size-3.5" />
                {billingConfig.preferredGateway === "netbanking" && (
                  <CheckCircle className="text-success size-3.5" />
                )}
              </div>
              <p className="text-sm">Net Banking</p>
              <p className="text-muted-text text-[11px] font-normal">
                SBI, HDFC, ICICI, PNB + 54 Banks
              </p>
            </div>

            <div
              onClick={() =>
                setBillingConfig((prev) => ({
                  ...prev,
                  preferredGateway: "cards",
                }))
              }
              className={`cursor-pointer rounded-lg border p-3.5 transition-all ${
                billingConfig.preferredGateway === "cards"
                  ? "border-ink bg-surface-card text-ink ring-ink font-medium ring-1"
                  : "border-hairline bg-canvas text-muted-text hover:border-hairline/80"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <CreditCard className="text-muted-soft size-3.5" />
                {billingConfig.preferredGateway === "cards" && (
                  <CheckCircle className="text-success size-3.5" />
                )}
              </div>
              <p className="text-sm">Debit / Credit Card</p>
              <p className="text-muted-text text-[11px] font-normal">
                RuPay, Visa, Mastercard via BBPS
              </p>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="border-hairline flex items-center justify-end border-t pt-5">
          <Button
            type="button"
            variant="primary"
            loading={isSaving}
            onClick={handleSave}
            icon={Save}
          >
            Save billing settings
          </Button>
        </div>
      </div>
    </div>
  );
}
