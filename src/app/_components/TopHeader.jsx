"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Eye, Menu, X, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [fontSize, setFontSize] = useState(100);

  const navLinks = [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about" },
    { label: "Consumer Services", href: "/consumer" },
    { label: "Pay Bill", href: "/bill/pay" },
    { label: "Apply Connection", href: "/connection/apply" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Contact Us", href: "/contact" },
  ];

  const handleFontChange = (delta) => {
    if (delta === 0) {
      setFontSize(100);
      document.documentElement.style.fontSize = "100%";
    } else {
      const newSize = Math.max(85, Math.min(115, fontSize + delta * 5));
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  return (
    <header className="w-full font-sans">
      {/* 1. Top Accessibility & Language Bar */}
      <div className="bg-inverse-canvas px-4 py-1.5 text-xs text-inverse-ink-muted border-b border-inverse-surface-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <PhoneCall className="h-3.5 w-3.5 text-fin-orange" strokeWidth={2} />
              <span>
                24x7 Toll Free Helpline:{" "}
                <strong className="font-semibold text-inverse-ink">1912</strong> /{" "}
                <strong className="font-semibold text-inverse-ink">1800-180-1912</strong>
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-inverse-ink-muted" strokeWidth={1.5} />
              <label htmlFor="language-select" className="sr-only">
                Language
              </label>
              <select
                id="language-select"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="cursor-pointer bg-transparent text-xs text-inverse-ink focus:outline-none"
              >
                <option value="English" className="bg-inverse-surface-1 text-inverse-ink">
                  English
                </option>
                <option value="Hindi" className="bg-inverse-surface-1 text-inverse-ink">
                  हिन्दी (Hindi)
                </option>
              </select>
            </div>

            <div className="hidden h-3 w-px bg-inverse-surface-1 sm:block" />

            {/* Font Resizing */}
            <div className="hidden items-center gap-1.5 sm:flex">
              <button
                type="button"
                onClick={() => handleFontChange(-1)}
                className="rounded-xs px-1.5 py-0.5 text-inverse-ink-muted transition-colors hover:bg-inverse-surface-1 hover:text-inverse-ink active:scale-[0.96]"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontChange(0)}
                className="rounded-xs px-1.5 py-0.5 text-inverse-ink-muted transition-colors hover:bg-inverse-surface-1 hover:text-inverse-ink active:scale-[0.96]"
                title="Reset font size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleFontChange(1)}
                className="rounded-xs px-1.5 py-0.5 text-inverse-ink-muted transition-colors hover:bg-inverse-surface-1 hover:text-inverse-ink active:scale-[0.96]"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <div className="hidden h-3 w-px bg-inverse-surface-1 sm:block" />

            {/* Screen Reader */}
            <button
              type="button"
              className="flex items-center gap-1 transition-colors hover:text-inverse-ink active:scale-[0.96]"
              title="Screen Reader Access"
            >
              <Eye className="h-3.5 w-3.5 text-fin-orange" strokeWidth={1.5} />
              <span className="hidden md:inline">Screen Reader</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-hairline bg-canvas/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Org Title */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fin-orange/20 bg-fin-orange/10 font-sans text-xl font-bold text-fin-orange shadow-xs transition-transform group-hover:scale-105">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-fin-orange uppercase">
                Govt. of Uttar Pradesh • DISCOM
              </span>
              <span className="text-base font-bold tracking-tight text-ink transition-colors group-hover:text-fin-orange sm:text-lg">
                Vidyut Vitran Nigam Limited
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors active:scale-[0.96]",
                  item.active
                    ? "bg-surface-2 font-semibold text-ink shadow-2xs"
                    : "text-ink-muted hover:bg-surface-2 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-ink hover:bg-surface-2 focus:outline-none active:scale-[0.96]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-hairline bg-canvas px-4 pt-3 pb-6 lg:hidden">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-surface-2 font-semibold text-ink"
                      : "text-ink-muted hover:bg-surface-2 hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
