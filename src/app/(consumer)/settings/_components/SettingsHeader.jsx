"use client";

import { Badge } from "@/components/ui/badge";
import { Sliders } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Badge
          variant="secondary"
          size="sm"
          shape="pill"
          leadingIcon={Sliders}
          text="Account & Preferences"
        />
        <Badge
          variant="success"
          size="sm"
          shape="pill"
          dot
          text="Portal v2.4"
        />
      </div>

      <h1 className="text-display-sm sm:text-display-md text-ink font-semibold tracking-tight">
        Settings
      </h1>
      <p className="text-body-sm sm:text-body text-muted-text mt-1 max-w-2xl">
        Manage your electricity consumer profile, communication alerts, billing preferences, and account security.
      </p>
    </div>
  );
}
