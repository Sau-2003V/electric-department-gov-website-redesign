"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Globe, Lock, Save, CheckCircle2, Building, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function PersonalDetailsTab({ user }) {
  const appMetadata = user?.app_metadata || user?.raw_app_meta_data || {};
  const userMetadata = user?.user_metadata || {};

  const [formData, setFormData] = useState({
    fullName: appMetadata.name || userMetadata.name || "Aditya Sharma",
    email: user?.email || "aditya.sharma@example.gov.in",
    phone: appMetadata.phone || userMetadata.phone || "+91 98765 43210",
    alternatePhone: "+91 98123 45678",
    address: "House No. 42B, Shanti Nagar, Shivpur Road",
    city: "Varanasi",
    pincode: "221002",
    language: "en",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile information updated successfully", {
        description: "Your contact details and premises address have been synced.",
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Form Container */}
      <form onSubmit={handleSave} className="border border-hairline bg-canvas rounded-xl p-5 sm:p-7 shadow-subtle space-y-6">
        <div>
          <h3 className="text-title-md text-ink font-semibold">
            Consumer Profile Information
          </h3>
          <p className="text-body-sm text-muted-text mt-0.5">
            Update your contact preferences, personal particulars, and billing delivery address.
          </p>
        </div>

        <div className="border-t border-hairline pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <Input
            label="Full Name (as per electricity records)"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            leadingIcon={User}
            placeholder="Enter full name"
            helperText="Matches identity in government billing ledger."
            required
          />

          {/* Email Address */}
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            leadingIcon={Mail}
            placeholder="consumer@domain.com"
            helperText="Used for monthly e-bills, payment receipts, and advisories."
            required
          />

          {/* Primary Phone */}
          <Input
            label="Registered Mobile Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            leadingIcon={Phone}
            placeholder="+91 00000 00000"
            helperText="Receives OTPs and critical outage alerts via SMS."
            required
          />

          {/* Alternate Contact */}
          <Input
            label="Alternate Contact Number"
            type="tel"
            value={formData.alternatePhone}
            onChange={(e) => handleChange("alternatePhone", e.target.value)}
            leadingIcon={Phone}
            placeholder="+91 00000 00000"
            helperText="Secondary contact for emergency lineman visits."
          />

          {/* Street Address */}
          <div className="sm:col-span-2">
            <Input
              label="Service Premises / Connection Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              leadingIcon={MapPin}
              placeholder="Plot/Flat no, Street, Landmark"
              required
            />
          </div>

          {/* City */}
          <Input
            label="City / Town"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            leadingIcon={Building}
            placeholder="City name"
            required
          />

          {/* Postal Pincode */}
          <Input
            label="Postal Pincode"
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            placeholder="6-digit PIN code"
            required
          />
        </div>

        {/* Save CTA Row */}
        <div className="border-t border-hairline pt-5 flex items-center justify-between">
          <p className="text-caption text-muted-soft hidden sm:block">
            Last profile verification: 14 Jan 2026
          </p>
          <Button
            type="submit"
            variant="primary"
            loading={isSaving}
            icon={Save}
            className="w-full sm:w-auto"
          >
            Save profile changes
          </Button>
        </div>
      </form>

      {/* Read-Only Technical Connection Record Card */}
      <div className="border border-hairline bg-surface-card rounded-xl p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-title-sm text-ink font-semibold">
                Sanctioned Grid Specifications
              </h3>
              <Badge variant="surface" size="sm" leadingIcon={Lock} text="Official Record" />
            </div>
            <p className="text-body-sm text-muted-text mt-0.5">
              Technical parameters verified by the Department Electrical Inspector.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toast.info("To request load alteration or meter shift, submit a new Service Request through the portal.")}
          >
            Apply for Load Change
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-hairline text-body-sm">
          <div className="bg-canvas p-3.5 rounded-lg border border-hairline">
            <p className="text-caption text-muted-soft">Sanctioned Load & Phase</p>
            <p className="font-semibold text-ink mt-0.5">5.00 kW · 1-Phase (230V)</p>
            <p className="text-[11px] text-muted-text mt-1">Connected to Feeder F-04 Shivpur</p>
          </div>

          <div className="bg-canvas p-3.5 rounded-lg border border-hairline">
            <p className="text-caption text-muted-soft">Smart Electronic Meter ID</p>
            <p className="font-mono font-semibold text-ink mt-0.5">MTR-8829410-GENUS</p>
            <p className="text-[11px] text-muted-text mt-1">Installed & Sealed: 10 Nov 2024</p>
          </div>

          <div className="bg-canvas p-3.5 rounded-lg border border-hairline">
            <p className="text-caption text-muted-soft">Transformer (DTR) Code</p>
            <p className="font-mono font-semibold text-ink mt-0.5">DTR-250kVA-SHV-09</p>
            <p className="text-[11px] text-muted-text mt-1">Pole No: P-14/B Shivpur Main</p>
          </div>
        </div>
      </div>
    </div>
  );
}
