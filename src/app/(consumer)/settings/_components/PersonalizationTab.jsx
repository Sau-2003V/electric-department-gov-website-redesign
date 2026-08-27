"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop, Globe, Check, Save, Languages } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { INDIAN_LANGUAGES } from "@/constants/country";

export default function PersonalizationTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (langName) => {
    setSelectedLang(langName);
    const matched = INDIAN_LANGUAGES.find((l) => l.name === langName);
    toast.success(`Language updated to ${langName}`, {
      description: matched?.nativeName
        ? `Portal set to ${matched.nativeName}.`
        : "Display language updated.",
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Preferences saved");
    }, 500);
  };

  const themes = [
    {
      key: "light",
      label: "Light",
      description: "White canvas, dark text.",
      icon: Sun,
      preview: (
        <div className="mb-3 flex h-16 w-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-2 shadow-xs">
          <div className="h-2 w-10 rounded bg-gray-900" />
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded bg-gray-100" />
            <div className="h-1.5 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      ),
    },
    {
      key: "dark",
      label: "Dark",
      description: "Deep surfaces for low-light.",
      icon: Moon,
      preview: (
        <div className="mb-3 flex h-16 w-full flex-col justify-between rounded-lg border border-zinc-800 bg-[#101010] p-2 shadow-xs">
          <div className="h-2 w-10 rounded bg-zinc-100" />
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded bg-zinc-800" />
            <div className="h-1.5 w-3/4 rounded bg-zinc-700" />
          </div>
        </div>
      ),
    },
    {
      key: "system",
      label: "System",
      description: "Follows OS preference.",
      icon: Laptop,
      preview: (
        <div className="mb-3 flex h-16 w-full flex-col justify-between rounded-lg border border-gray-300 bg-gradient-to-r from-gray-100 to-zinc-900 p-2 shadow-xs">
          <div className="h-2 w-10 rounded bg-gray-800" />
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded bg-white/60" />
            <div className="h-1.5 w-3/4 rounded bg-zinc-700/80" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Theme */}
      <div className="border-hairline bg-canvas shadow-subtle space-y-5 rounded-xl border p-5 sm:p-7">
        <div>
          <h3 className="text-title-md text-ink font-medium">Color Mode</h3>
          <p className="text-body-sm text-muted-text mt-0.5">
            Choose how the portal looks on your device.
          </p>
        </div>

        <div className="border-hairline grid grid-cols-3 gap-3 border-t pt-5">
          {themes.map(({ key, label, description, icon: Icon, preview }) => {
            const active = mounted && theme === key;
            return (
              <div
                key={key}
                onClick={() => setTheme(key)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-150 ${
                  active
                    ? "border-primary bg-surface-card ring-primary/20 shadow-subtle ring-2"
                    : "border-hairline bg-canvas hover:border-ink/40 hover:bg-surface-soft"
                }`}
              >
                {preview}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon className="text-muted-text size-3.5" />
                    <span className="text-ink text-sm font-medium">
                      {label}
                    </span>
                  </div>
                  {active && (
                    <span className="bg-primary text-on-primary flex size-4 items-center justify-center rounded-full">
                      <Check className="size-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-muted-text mt-0.5 text-[11px]">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Language */}
      <div className="border-hairline bg-canvas shadow-subtle space-y-5 rounded-xl border p-5 sm:p-7">
        <div>
          <h3 className="text-title-md text-ink font-medium">
            Display Language
          </h3>
          <p className="text-body-sm text-muted-text mt-0.5">
            Choose your preferred language for notices, bills, and the
            dashboard.
          </p>
        </div>

        <div className="border-hairline grid grid-cols-1 gap-5 border-t pt-5 sm:grid-cols-2">
          {/* Dropdown */}
          <div className="space-y-1.5">
            <label className="text-ink text-xs font-medium">Language</label>
            <Select
              value={selectedLang}
              onValueChange={handleLanguageChange}
              size="default"
            >
              <SelectTrigger
                variant="default"
                size="default"
                icon={Globe}
                placeholder="Choose Language"
                className="w-full"
                aria-label="Select Language"
              />
              <SelectContent className="z-[100] max-h-72 w-full">
                {INDIAN_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.name}>
                    <div className="flex w-full items-center justify-between">
                      <span>{lang.name}</span>
                      {lang.nativeName && (
                        <span className="text-muted-soft ml-2 text-[11px] font-normal">
                          {lang.nativeName}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick language chips */}
          <div className="space-y-1.5">
            <label className="text-ink text-xs font-medium">
              Common Languages
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: "English", native: "English" },
                { name: "Hindi", native: "हिन्दी" },
                { name: "Bengali", native: "বাংলা" },
                { name: "Telugu", native: "తెలుగు" },
                { name: "Marathi", native: "मराठी" },
                { name: "Tamil", native: "தமிழ்" },
              ].map((lang) => (
                <button
                  key={lang.name}
                  type="button"
                  onClick={() => handleLanguageChange(lang.name)}
                  className={`flex flex-col rounded-md border p-2 text-left text-xs transition-all ${
                    selectedLang === lang.name
                      ? "border-ink bg-surface-card text-ink ring-ink font-medium ring-1"
                      : "border-hairline bg-canvas text-muted-text hover:bg-surface-soft hover:text-ink"
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-muted-soft text-[10px] font-normal">
                    {lang.native}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-hairline flex items-center justify-end border-t pt-4">
          <Button
            type="button"
            variant="primary"
            loading={isSaving}
            onClick={handleSave}
            icon={Languages}
          >
            Save preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
