"use client";

import { useState, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Save,
  Hash,
  Building2,
  Globe2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Fields backed by public.users: phone, address, pincode, district, state, sub_division
export default function PersonalDetailsTab({ profile }) {
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    pincode: "",
    district: "",
    state: "",
    sub_division: "",
  });

  // Hydrate form when profile data arrives from the query
  useEffect(() => {
    if (!profile) return;
    setFormData({
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      pincode: profile.pincode ?? "",
      district: profile.district ?? "",
      state: profile.state ?? "",
      sub_division: profile.sub_division ?? "",
    });
  }, [profile]);

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated", {
        description: "Your contact and address details have been saved.",
      });
    }, 800);
  };

  return (
    <form
      onSubmit={handleSave}
      className="border-hairline bg-canvas shadow-subtle space-y-6 rounded-xl border p-5 sm:p-7"
    >
      <div>
        <h3 className="text-title-md text-ink font-medium">
          Contact & Address
        </h3>
        <p className="text-body-sm text-muted-text mt-0.5">
          Update your registered phone number and service premises address.
        </p>
      </div>

      <div className="border-hairline grid grid-cols-1 gap-5 border-t pt-5 sm:grid-cols-2">
        {/* Phone */}
        <Input
          label="Registered Mobile Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          leadingIcon={Phone}
          placeholder="+91 00000 00000"
          helperText="Receives OTPs and outage alerts."
          required
        />

        {/* Pincode */}
        <Input
          label="Postal Pincode"
          value={formData.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
          leadingIcon={Hash}
          placeholder="6-digit PIN code"
          required
        />

        {/* Address (full width) */}
        <div className="sm:col-span-2">
          <Input
            label="Service Premises Address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            leadingIcon={MapPin}
            placeholder="Plot/Flat no, Street, Landmark"
            required
          />
        </div>

        {/* District */}
        <Input
          label="District"
          value={formData.district}
          onChange={(e) => handleChange("district", e.target.value)}
          leadingIcon={Building2}
          placeholder="District name"
        />

        {/* State */}
        <Input
          label="State"
          value={formData.state}
          onChange={(e) => handleChange("state", e.target.value)}
          leadingIcon={Globe2}
          placeholder="State name"
        />

        {/* Sub-division */}
        <div className="sm:col-span-2">
          <Input
            label="Sub Division"
            value={formData.sub_division}
            onChange={(e) => handleChange("sub_division", e.target.value)}
            leadingIcon={User}
            placeholder="Electrical sub-division"
          />
        </div>
      </div>

      <div className="border-hairline flex items-center justify-end border-t pt-5">
        <Button
          type="submit"
          variant="primary"
          loading={isSaving}
          icon={Save}
          className="w-full sm:w-auto"
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}
