"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Laptop,
  Globe,
  Type,
  Sparkles,
  Check,
  Save,
  Eye,
  Sliders,
  Languages,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const [fontSize, setFontSize] = useState("100");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read current font size if previously modified on document root
    const rootSize = document.documentElement.style.fontSize;
    if (rootSize && rootSize.includes("%")) {
      setFontSize(rootSize.replace("%", ""));
    }
  }, []);

  const handleFontSizeChange = (val) => {
    setFontSize(val);
    document.documentElement.style.fontSize = `${val}%`;
    toast.success(`Font size adjusted to ${val}%`, {
      description:
        val === "100"
          ? "Standard readability scale applied."
          : "Custom zoom level applied across portal.",
    });
  };

  const handleLanguageChange = (langName) => {
    setSelectedLang(langName);
    const matched = INDIAN_LANGUAGES.find((l) => l.name === langName);
    toast.success(`Language updated to ${langName}`, {
      description: matched?.nativeName
        ? `Portal interface set to ${matched.nativeName}.`
        : "Display language updated.",
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Personalization preferences saved", {
        description:
          "Theme, font scaling, and language preferences are synced.",
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* 1. Theme & Color Mode */}
      <div className="border-hairline bg-canvas shadow-subtle space-y-5 rounded-xl border p-5 sm:p-7">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-ink font-semibold">
              Interface Theme & Color Mode
            </h3>
            <Badge
              variant="surface"
              size="sm"
              leadingIcon={Sparkles}
              text="Appearance"
            />
          </div>
          <p className="text-body-sm text-muted-text mt-0.5">
            Select your preferred visual style or allow the portal to follow
            your operating system settings.
          </p>
        </div>

        <div className="border-hairline grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-3">
          {/* Light Theme Card */}
          <div
            onClick={() => setTheme("light")}
            className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-150 ${
              mounted && theme === "light"
                ? "border-primary bg-surface-card ring-primary/20 shadow-subtle ring-2"
                : "border-hairline bg-canvas hover:border-ink/40 hover:bg-surface-soft"
            }`}
          >
            {/* Visual Preview Box */}
            <div className="mb-3 flex h-20 w-full flex-col justify-between rounded-lg border border-gray-200 bg-[#ffffff] p-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-12 rounded bg-gray-900" />
                <div className="flex gap-1">
                  <div className="size-2 rounded-full bg-gray-300" />
                  <div className="size-2 rounded-full bg-gray-300" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-gray-100" />
                <div className="h-2 w-3/4 rounded bg-gray-200" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="text-warning size-4" />
                <span className="text-ink text-sm font-semibold">
                  Light Mode
                </span>
              </div>
              {mounted && theme === "light" && (
                <span className="bg-primary text-on-primary flex size-4.5 items-center justify-center rounded-full">
                  <Check className="size-3 stroke-[3]" />
                </span>
              )}
            </div>
            <p className="text-muted-text mt-1 text-[11px]">
              Crisp white canvas with dark high-contrast typography.
            </p>
          </div>

          {/* Dark Theme Card */}
          <div
            onClick={() => setTheme("dark")}
            className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-150 ${
              mounted && theme === "dark"
                ? "border-primary bg-surface-card ring-primary/20 shadow-subtle ring-2"
                : "border-hairline bg-canvas hover:border-ink/40 hover:bg-surface-soft"
            }`}
          >
            {/* Visual Preview Box */}
            <div className="mb-3 flex h-20 w-full flex-col justify-between rounded-lg border border-zinc-800 bg-[#101010] p-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-12 rounded bg-zinc-100" />
                <div className="flex gap-1">
                  <div className="size-2 rounded-full bg-zinc-700" />
                  <div className="size-2 rounded-full bg-zinc-700" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-zinc-800" />
                <div className="h-2 w-3/4 rounded bg-zinc-700" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="text-brand-accent size-4" />
                <span className="text-ink text-sm font-semibold">
                  Dark Mode
                </span>
              </div>
              {mounted && theme === "dark" && (
                <span className="bg-primary text-on-primary flex size-4.5 items-center justify-center rounded-full">
                  <Check className="size-3 stroke-[3]" />
                </span>
              )}
            </div>
            <p className="text-muted-text mt-1 text-[11px]">
              Deep obsidian surfaces designed for night usage and low eye
              strain.
            </p>
          </div>

          {/* System Theme Card */}
          <div
            onClick={() => setTheme("system")}
            className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-150 ${
              mounted && theme === "system"
                ? "border-primary bg-surface-card ring-primary/20 shadow-subtle ring-2"
                : "border-hairline bg-canvas hover:border-ink/40 hover:bg-surface-soft"
            }`}
          >
            {/* Visual Preview Box */}
            <div className="border-hairline mb-3 flex h-20 w-full flex-col justify-between rounded-lg border bg-gradient-to-r from-gray-100 via-gray-300 to-zinc-900 p-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-12 rounded bg-gray-900 dark:bg-zinc-100" />
                <Laptop className="text-ink size-3" />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-white/70 backdrop-blur-xs" />
                <div className="h-2 w-3/4 rounded bg-zinc-800/80" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop className="text-muted-text size-4" />
                <span className="text-ink text-sm font-semibold">
                  System Sync
                </span>
              </div>
              {mounted && theme === "system" && (
                <span className="bg-primary text-on-primary flex size-4.5 items-center justify-center rounded-full">
                  <Check className="size-3 stroke-[3]" />
                </span>
              )}
            </div>
            <p className="text-muted-text mt-1 text-[11px]">
              Automatically switches between light and dark according to OS
              schedule.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Font Size & Accessibility Scale */}
      <div className="border-hairline bg-canvas shadow-subtle space-y-5 rounded-xl border p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-title-md text-ink font-semibold">
                Text Scaling & Font Size
              </h3>
              <Badge
                variant="secondary"
                size="sm"
                leadingIcon={Type}
                text="Accessibility (WCAG 2.1)"
              />
            </div>
            <p className="text-body-sm text-muted-text mt-0.5">
              Enlarge or reduce typography across all consumer portal pages for
              optimal readability.
            </p>
          </div>

          {/* Quick Stepper Buttons */}
          <div className="bg-surface-soft border-hairline flex shrink-0 items-center gap-1 rounded-lg border p-1">
            <button
              type="button"
              onClick={() => handleFontSizeChange("90")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                fontSize === "90"
                  ? "bg-canvas text-ink shadow-subtle"
                  : "text-muted-text hover:text-ink"
              }`}
              title="Small Text (A-)"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => handleFontSizeChange("100")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                fontSize === "100"
                  ? "bg-canvas text-ink shadow-subtle"
                  : "text-muted-text hover:text-ink"
              }`}
              title="Default Text (A)"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => handleFontSizeChange("110")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                fontSize === "110"
                  ? "bg-canvas text-ink shadow-subtle"
                  : "text-muted-text hover:text-ink"
              }`}
              title="Large Text (A+)"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => handleFontSizeChange("120")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                fontSize === "120"
                  ? "bg-canvas text-ink shadow-subtle"
                  : "text-muted-text hover:text-ink"
              }`}
              title="Extra Large (A++)"
            >
              A++
            </button>
          </div>
        </div>

        <div className="border-hairline grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-4">
          {[
            {
              value: "90",
              label: "Compact",
              percent: "90%",
              desc: "Dense view for high-res monitors",
            },
            {
              value: "100",
              label: "Default",
              percent: "100%",
              desc: "Standard 16px base font size",
            },
            {
              value: "110",
              label: "Large",
              percent: "110%",
              desc: "Enhanced readability (+10%)",
            },
            {
              value: "120",
              label: "Extra Large",
              percent: "120%",
              desc: "Maximum accessibility scale",
            },
          ].map((item) => (
            <div
              key={item.value}
              onClick={() => handleFontSizeChange(item.value)}
              className={`cursor-pointer rounded-lg border p-3.5 transition-all ${
                fontSize === item.value
                  ? "border-primary bg-surface-card text-ink ring-primary font-semibold ring-1"
                  : "border-hairline bg-canvas text-muted-text hover:border-hairline/80 hover:bg-surface-soft"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-muted-soft font-mono text-xs tracking-wider uppercase">
                  {item.percent}
                </span>
                {fontSize === item.value && (
                  <Check className="text-primary size-3.5" />
                )}
              </div>
              <p className="text-ink text-sm font-semibold">{item.label}</p>
              <p className="text-muted-text mt-0.5 text-[11px]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Live Preview Sample */}
        <div className="bg-surface-card border-hairline rounded-lg border p-4">
          <p className="text-caption text-muted-soft mb-1 font-semibold tracking-wider uppercase">
            Live Typography Preview:
          </p>
          <p className="text-body-md text-ink font-medium">
            Electricity consumption for meter MTR-8829410 is recorded at 248.50
            kWh this cycle.
          </p>
          <p className="text-body-sm text-muted-text mt-1">
            Department notifications and bills will automatically adapt to this
            font size across all devices.
          </p>
        </div>
      </div>

      {/* 3. Language & Regional Dialect */}
      <div className="border-hairline bg-canvas shadow-subtle space-y-5 rounded-xl border p-5 sm:p-7">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-ink font-semibold">
              Portal Language & Script
            </h3>
            <Badge
              variant="accent-subtle"
              size="sm"
              leadingIcon={Languages}
              text="22 Official Languages"
            />
          </div>
          <p className="text-body-sm text-muted-text mt-0.5">
            Choose your preferred language for bills, notice circulars,
            dashboard metrics, and SMS broadcasts.
          </p>
        </div>

        <div className="border-hairline grid grid-cols-1 gap-5 border-t pt-5 sm:grid-cols-2">
          {/* Main Language Selector */}
          <div className="space-y-1.5">
            <label className="text-ink text-xs font-semibold">
              Active Display Language
            </label>
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
            <p className="text-muted-text text-[11px]">
              Applies across all service notices, complaint forms, and bill
              PDFs.
            </p>
          </div>

          {/* Quick Language Chips */}
          <div className="space-y-1.5">
            <label className="text-ink text-xs font-semibold">
              Frequently Used Languages
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                      ? "border-ink bg-surface-card text-ink ring-ink font-semibold ring-1"
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

        {/* Save Bar */}
        <div className="border-hairline flex items-center justify-end border-t pt-5">
          <Button
            type="button"
            variant="primary"
            loading={isSaving}
            onClick={handleSave}
            icon={Save}
          >
            Save preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
