"use client";

import { useState } from "react";
import { Leaf, CreditCard, Sun, Award, Landmark, CheckCircle, Save, ShieldCheck, ArrowUpRight } from "lucide-react";
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
        description: "Your invoice delivery mode and payment mandate settings have been saved.",
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Billing Preferences Card */}
      <div className="border border-hairline bg-canvas rounded-xl p-5 sm:p-7 shadow-subtle space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-ink font-semibold">
              Invoice Delivery & Auto-Settlement
            </h3>
            <Badge variant="badge-emerald" size="sm" text="Green Tariff Active" />
          </div>
          <p className="text-body-sm text-muted-text mt-0.5">
            Manage paperless rebate options, recurring auto-debit mandates, and rooftop solar billing.
          </p>
        </div>

        <div className="border-t border-hairline divide-y divide-hairline">
          {/* Green Bill Paperless Rebate */}
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-semibold">
                    Paperless Green Bill (Opt-in)
                  </p>
                  <Badge variant="success-solid" size="sm" text="₹20 / Month Rebate" />
                </div>
                <p className="text-body-sm text-muted-text">
                  Discontinue paper delivery by meter-readers. Receive authenticated digital PDF invoices on WhatsApp and Email to save trees and earn monthly bill discounts.
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
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-ink shrink-0 mt-0.5">
                <CreditCard className="size-4.5 text-brand-accent" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-semibold">
                    e-NACH / UPI Auto-Pay Mandate
                  </p>
                  <Badge variant="secondary" size="sm" text="Active · State Bank of India" />
                </div>
                <p className="text-body-sm text-muted-text">
                  Automatically settle monthly energy consumption charges 2 days before the due date. Avoid late payment surcharges (LPS) and disconnection notices.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-muted-soft font-mono">
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
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                <Sun className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-semibold">
                    Rooftop Solar Export Credit Integration
                  </p>
                  <Badge variant="badge-orange" size="sm" text="3.0 kW Plant Linked" />
                </div>
                <p className="text-body-sm text-muted-text">
                  Display bi-directional import/export power generation units on monthly bills and carry forward surplus kilowatt credits to subsequent billing cycles.
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
          <div className="py-4.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-ink shrink-0 mt-0.5">
                <Award className="size-4.5 text-badge-violet" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-title-sm text-ink font-semibold">
                    Government Domestic Tariff Subsidy
                  </p>
                  <Badge variant="badge-violet" size="sm" text="DBT Linked" />
                </div>
                <p className="text-body-sm text-muted-text">
                  Direct Benefit Transfer (DBT) credit of ₹1.50/unit for consumption under 200 kWh/month under State Clean Energy & Domestic Welfare scheme.
                </p>
                <div className="pt-1 text-[11px] text-muted-soft font-mono">
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
        <div className="pt-4 border-t border-hairline">
          <h4 className="text-title-sm text-ink font-semibold mb-3">
            Default Instant Payment Route
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => setBillingConfig((prev) => ({ ...prev, preferredGateway: "upi" }))}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                billingConfig.preferredGateway === "upi"
                  ? "border-ink bg-surface-card text-ink font-semibold ring-1 ring-ink"
                  : "border-hairline bg-canvas text-muted-text hover:border-hairline/80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase tracking-wider font-mono text-muted-soft">Fastest</span>
                {billingConfig.preferredGateway === "upi" && <CheckCircle className="size-3.5 text-success" />}
              </div>
              <p className="text-sm">UPI / QR Code</p>
              <p className="text-[11px] text-muted-text font-normal">Google Pay, PhonePe, BHIM (Zero Fee)</p>
            </div>

            <div
              onClick={() => setBillingConfig((prev) => ({ ...prev, preferredGateway: "netbanking" }))}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                billingConfig.preferredGateway === "netbanking"
                  ? "border-ink bg-surface-card text-ink font-semibold ring-1 ring-ink"
                  : "border-hairline bg-canvas text-muted-text hover:border-hairline/80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Landmark className="size-3.5 text-muted-soft" />
                {billingConfig.preferredGateway === "netbanking" && <CheckCircle className="size-3.5 text-success" />}
              </div>
              <p className="text-sm">Net Banking</p>
              <p className="text-[11px] text-muted-text font-normal">SBI, HDFC, ICICI, PNB + 54 Banks</p>
            </div>

            <div
              onClick={() => setBillingConfig((prev) => ({ ...prev, preferredGateway: "cards" }))}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                billingConfig.preferredGateway === "cards"
                  ? "border-ink bg-surface-card text-ink font-semibold ring-1 ring-ink"
                  : "border-hairline bg-canvas text-muted-text hover:border-hairline/80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <CreditCard className="size-3.5 text-muted-soft" />
                {billingConfig.preferredGateway === "cards" && <CheckCircle className="size-3.5 text-success" />}
              </div>
              <p className="text-sm">Debit / Credit Card</p>
              <p className="text-[11px] text-muted-text font-normal">RuPay, Visa, Mastercard via BBPS</p>
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
            Save billing settings
          </Button>
        </div>
      </div>
    </div>
  );
}
