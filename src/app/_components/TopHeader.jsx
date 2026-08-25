"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Globe, SunMoon, Type, Menu, X, PhoneCall } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { INDIAN_LANGUAGES } from "@/constants/country";

export default function TopHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [fontSize, setFontSize] = useState("100");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Register Complaint", href: "/complaints/new" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Team", href: "/team" },
    { label: "Support", href: "/support" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleFontSizeChange = (val) => {
    setFontSize(val);
    document.documentElement.style.fontSize = `${val}%`;
  };

  return (
    <header className="w-full font-sans">
      {/* 1. Top Utility & Accessibility Bar */}
      <div className="border-hairline bg-surface-soft text-caption dark:border-hairline dark:bg-surface-dark-elevated border-b px-4 py-1.5 max-sm:hidden sm:py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left: Emblem */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/image/emblem.png"
              alt="Government of India Emblem"
              width={20}
              height={20}
              className="h-5 w-auto object-contain dark:brightness-110"
            />
            <span className="text-ink text-caption dark:text-on-dark font-medium tracking-wide">
              <span className="hidden sm:inline">Government of India / </span>
              <span className="text-muted-text dark:text-on-dark-soft sm:text-caption text-xs">
                भारत सरकार
              </span>
            </span>
          </div>

          {/* Right: Language, Font Size, Theme */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Language Selector */}
            <Select
              value={selectedLang}
              onValueChange={setSelectedLang}
              size="compact"
            >
              <SelectTrigger
                variant="ghost"
                size="compact"
                icon={Globe}
                className="text-muted-text hover:bg-surface-card hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark dark:hover:text-on-dark h-7 min-w-[110px] border-none px-2 text-xs font-medium focus:ring-0"
                aria-label="Select Language"
              />
              <SelectContent className="z-[100] max-h-72 min-w-[170px]">
                {INDIAN_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.name}>
                    {lang.name}
                    {lang.name !== lang.nativeName
                      ? ` (${lang.nativeName})`
                      : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="bg-hairline dark:bg-surface-strong h-3 w-px" />

            {/* Font Size Selector */}
            <Select
              value={fontSize}
              onValueChange={handleFontSizeChange}
              size="compact"
            >
              <SelectTrigger
                variant="ghost"
                size="compact"
                icon={Type}
                className="text-muted-text hover:bg-surface-card hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark dark:hover:text-on-dark h-7 min-w-[105px] border-none px-2 text-xs font-medium focus:ring-0"
                aria-label="Select Font Size"
              />
              <SelectContent className="z-[100] min-w-[140px]">
                <SelectItem value="90">Small (90%)</SelectItem>
                <SelectItem value="100">Default (100%)</SelectItem>
                <SelectItem value="110">Large (110%)</SelectItem>
                <SelectItem value="120">Extra (120%)</SelectItem>
              </SelectContent>
            </Select>

            <div className="bg-hairline dark:bg-surface-strong h-3 w-px" />

            {/* Theme Selector */}
            <Select
              value={mounted ? theme : "system"}
              onValueChange={(val) => setTheme(val)}
              size="compact"
            >
              <SelectTrigger
                variant="ghost"
                size="compact"
                icon={SunMoon}
                className="text-muted-text hover:bg-surface-card hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark dark:hover:text-on-dark h-7 min-w-[95px] border-none px-2 text-xs font-medium capitalize focus:ring-0"
                aria-label="Select Theme"
              />
              <SelectContent className="z-[100] min-w-[130px]">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="border-hairline bg-canvas/95 dark:bg-surface-dark/95 sticky top-0 z-50 border-b px-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
          {/* Logo & Org Title */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/image/logo.svg"
              alt="Vidhyut Logo"
              width={40}
              height={40}
              className="h-10 w-auto rounded-md bg-transparent object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-ink text-title-md dark:text-on-dark font-semibold tracking-tight transition-opacity group-hover:opacity-80">
                Vidhyut Portal
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
                  "text-nav-link rounded-md px-3 py-1.5 font-medium transition-colors active:scale-[0.98]",
                  item.highlight
                    ? "bg-primary text-on-primary hover:bg-primary-active shadow-subtle ml-1 font-semibold"
                    : item.active
                      ? "bg-surface-card text-ink dark:bg-surface-dark-elevated dark:text-on-dark shadow-subtle font-semibold"
                      : "text-muted-text hover:bg-surface-card hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark-elevated dark:hover:text-on-dark"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-ink hover:bg-surface-card border-hairline bg-canvas focus-visible:ring-brand-accent dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark dark:hover:bg-surface-dark shadow-subtle relative flex h-10 w-10 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                    className="inline-flex items-center justify-center"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                    className="inline-flex items-center justify-center"
                  >
                    <Menu className="h-5 w-5" strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* 3. Mobile Navigation Dropdown Animated with Motion */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { duration: 0.28, ease: [0.2, 0, 0, 1] },
                  opacity: { duration: 0.22, ease: "easeOut" },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  height: { duration: 0.2, ease: [0.2, 0, 0, 1] },
                  opacity: { duration: 0.16, ease: "easeOut" },
                },
              }}
              className="border-hairline bg-canvas/98 dark:bg-surface-dark/98 overflow-hidden border-t backdrop-blur-md lg:hidden"
            >
              <motion.div
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.04,
                    },
                  },
                  hidden: {},
                }}
                initial="hidden"
                animate="show"
                className="mx-auto flex max-w-7xl flex-col space-y-1.5 px-4 pt-3 pb-5 sm:px-6"
              >
                {navLinks.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, y: -6 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.2, ease: [0.2, 0, 0, 1] },
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-nav-link flex items-center justify-between rounded-md px-3.5 py-2.5 font-medium transition-all active:scale-[0.98]",
                        item.highlight
                          ? "bg-primary text-on-primary hover:bg-primary-active shadow-subtle font-semibold"
                          : item.active
                            ? "bg-surface-card text-ink dark:bg-surface-dark-elevated dark:text-on-dark border-hairline border font-semibold"
                            : "text-muted-text hover:bg-surface-card hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark-elevated dark:hover:text-on-dark"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.highlight && (
                        <span className="bg-on-primary/20 text-on-primary rounded-pill text-caption px-2 py-0.5 font-semibold">
                          Quick Action
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Preferences: Language, Font Size, Theme */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -6 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.2, ease: [0.2, 0, 0, 1] },
                    },
                  }}
                  className="border-hairline mt-2 border-t pt-3"
                >
                  <p className="text-muted-text dark:text-on-dark-soft px-1 pb-2 text-[11px] font-semibold tracking-wider uppercase">
                    Preferences & Accessibility
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {/* Language Selector */}
                    <div className="bg-surface-card dark:bg-surface-dark-elevated border-hairline shadow-subtle flex items-center justify-between rounded-lg border p-1.5 pl-3">
                      <div className="text-ink dark:text-on-dark flex items-center gap-2 text-xs font-medium">
                        <Globe className="text-muted-text h-4 w-4 shrink-0" />
                        <span>Language</span>
                      </div>
                      <Select
                        value={selectedLang}
                        onValueChange={setSelectedLang}
                        size="compact"
                      >
                        <SelectTrigger
                          variant="secondary"
                          size="compact"
                          className="h-8 min-w-[115px] text-xs font-medium"
                          aria-label="Select Language"
                        />
                        <SelectContent className="z-[100] max-h-72 min-w-[170px]">
                          {INDIAN_LANGUAGES.map((lang) => (
                            <SelectItem key={lang.code} value={lang.name}>
                              {lang.name}
                              {lang.name !== lang.nativeName
                                ? ` (${lang.nativeName})`
                                : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Font Size Selector */}
                    <div className="bg-surface-card dark:bg-surface-dark-elevated border-hairline shadow-subtle flex items-center justify-between rounded-lg border p-1.5 pl-3">
                      <div className="text-ink dark:text-on-dark flex items-center gap-2 text-xs font-medium">
                        <Type className="text-muted-text h-4 w-4 shrink-0" />
                        <span>Font Size</span>
                      </div>
                      <Select
                        value={fontSize}
                        onValueChange={handleFontSizeChange}
                        size="compact"
                      >
                        <SelectTrigger
                          variant="secondary"
                          size="compact"
                          className="h-8 min-w-[105px] text-xs font-medium"
                          aria-label="Select Font Size"
                        />
                        <SelectContent className="z-[100] min-w-[140px]">
                          <SelectItem value="90">Small (90%)</SelectItem>
                          <SelectItem value="100">Default (100%)</SelectItem>
                          <SelectItem value="110">Large (110%)</SelectItem>
                          <SelectItem value="120">Extra (120%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Theme Selector */}
                    <div className="bg-surface-card dark:bg-surface-dark-elevated border-hairline shadow-subtle flex items-center justify-between rounded-lg border p-1.5 pl-3">
                      <div className="text-ink dark:text-on-dark flex items-center gap-2 text-xs font-medium">
                        <SunMoon className="text-muted-text h-4 w-4 shrink-0" />
                        <span>Theme</span>
                      </div>
                      <Select
                        value={mounted ? theme : "system"}
                        onValueChange={(val) => setTheme(val)}
                        size="compact"
                      >
                        <SelectTrigger
                          variant="secondary"
                          size="compact"
                          className="h-8 min-w-[95px] text-xs font-medium capitalize"
                          aria-label="Select Theme"
                        />
                        <SelectContent className="z-[100] min-w-[130px]">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Quick Emergency Contact Card */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -6 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.2, ease: [0.2, 0, 0, 1] },
                    },
                  }}
                  className="border-hairline mt-1 border-t pt-3"
                >
                  <div className="bg-surface-card border-hairline text-ink dark:bg-surface-dark-elevated dark:border-hairline dark:text-on-dark shadow-subtle flex items-center justify-between rounded-lg border p-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="border-hairline bg-canvas dark:bg-surface-dark dark:border-hairline text-ink dark:text-on-dark flex h-8 w-8 shrink-0 items-center justify-center rounded-md border">
                        <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <div className="truncate">
                        <p className="text-muted-text dark:text-on-dark-soft text-[11px] font-medium tracking-wide uppercase">
                          24x7 Helpline
                        </p>
                        <p className="text-ink text-caption dark:text-on-dark mt-0.5 font-mono leading-tight font-semibold">
                          1912 / 1800-180-1912
                        </p>
                      </div>
                    </div>
                    <a
                      href="tel:1912"
                      className="bg-primary text-on-primary hover:bg-primary-active text-button shadow-subtle ml-2 shrink-0 rounded-md px-3 py-1.5 font-medium transition-transform active:scale-[0.98]"
                    >
                      Call
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
