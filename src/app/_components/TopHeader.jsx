"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Eye, Menu, X, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [fontSize, setFontSize] = useState(100);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Register Complaint", href: "/complaints/new" },
    { label: "Track Complaint", href: "/complaints" },
    { label: "Consumer Services", href: "#consumer-services" },
    { label: "Video Guides", href: "#video-guides" },
    { label: "Updates", href: "#notices" },
    { label: "Support", href: "/support" },
  ];

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
      {/* 1. Top Accessibility & Emergency Helpline Bar */}
      <div className="border-surface-dark-elevated bg-surface-dark text-on-dark-soft border-b px-4 py-1.5 text-caption">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <PhoneCall
                className="text-on-dark h-3.5 w-3.5 shrink-0"
                strokeWidth={1.5}
              />
              <span className="truncate">
                <span className="hidden sm:inline">
                  24x7 Emergency Outage & Complaint Helpline:{" "}
                </span>
                <span className="sm:hidden">24x7 Helpline: </span>
                <a
                  href="tel:1912"
                  className="text-on-dark font-semibold hover:underline"
                >
                  1912
                </a>
                <span className="xs:inline hidden"> / </span>
                <a
                  href="tel:18001801912"
                  className="text-on-dark xs:inline hidden font-semibold hover:underline"
                >
                  1800-180-1912
                </a>
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Selector */}
            <div className="relative flex items-center gap-1">
              <Globe
                className="text-on-dark-soft h-3.5 w-3.5"
                strokeWidth={1.5}
              />
              <label htmlFor="language-select" className="sr-only">
                Language
              </label>
              <select
                id="language-select"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="text-on-dark cursor-pointer bg-transparent text-caption focus:outline-none"
              >
                <option
                  value="English"
                  className="bg-surface-dark-elevated text-on-dark"
                >
                  English
                </option>
                <option
                  value="Hindi"
                  className="bg-surface-dark-elevated text-on-dark"
                >
                  हिन्दी (Hindi)
                </option>
              </select>
            </div>

            <div className="bg-surface-dark-elevated hidden h-3 w-px sm:block" />

            {/* Font Resizing */}
            <div className="hidden items-center gap-1 sm:flex">
              <button
                type="button"
                onClick={() => handleFontChange(-1)}
                className="text-on-dark-soft hover:bg-surface-dark-elevated hover:text-on-dark rounded-xs px-1.5 py-0.5 transition-colors active:scale-[0.98]"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontChange(0)}
                className="text-on-dark-soft hover:bg-surface-dark-elevated hover:text-on-dark rounded-xs px-1.5 py-0.5 transition-colors active:scale-[0.98]"
                title="Reset font size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleFontChange(1)}
                className="text-on-dark-soft hover:bg-surface-dark-elevated hover:text-on-dark rounded-xs px-1.5 py-0.5 transition-colors active:scale-[0.98]"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <div className="bg-surface-dark-elevated hidden h-3 w-px sm:block" />

            {/* Screen Reader */}
            <button
              type="button"
              className="hover:text-on-dark flex items-center gap-1 transition-colors active:scale-[0.98]"
              title="Screen Reader Access"
            >
              <Eye className="text-on-dark h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="hidden md:inline">Screen Reader</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="border-hairline bg-canvas/95 sticky top-0 z-50 border-b backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Org Title */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-ink text-title-md font-semibold tracking-tight transition-opacity group-hover:opacity-80">
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
                  "rounded-md px-3 py-1.5 text-nav-link font-medium transition-colors active:scale-[0.98]",
                  item.highlight
                    ? "bg-primary text-on-primary hover:bg-primary-active"
                    : item.active
                      ? "bg-surface-card text-ink font-semibold shadow-subtle"
                      : "text-muted-text hover:bg-surface-card hover:text-ink"
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
              className="text-ink hover:bg-surface-card border-hairline bg-canvas focus-visible:ring-primary relative flex h-10 w-10 items-center justify-center rounded-md border shadow-subtle transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
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
              className="border-hairline bg-canvas/98 overflow-hidden border-t backdrop-blur-md lg:hidden"
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
                className="mx-auto flex max-w-7xl flex-col space-y-1.5 px-4 pt-3 pb-5"
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
                        "flex items-center justify-between rounded-md px-3.5 py-2.5 text-nav-link font-medium transition-all active:scale-[0.98]",
                        item.highlight
                          ? "bg-primary text-on-primary hover:bg-primary-active"
                          : item.active
                            ? "bg-surface-card text-ink border-hairline border font-semibold"
                            : "text-muted-text hover:bg-surface-card hover:text-ink"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.highlight && (
                        <span className="bg-on-primary/20 text-on-primary rounded-pill px-2 py-0.5 text-caption font-semibold">
                          Quick Action
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}

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
                  className="border-hairline mt-2.5 border-t pt-3"
                >
                  <div className="bg-surface-dark text-on-dark flex items-center justify-between rounded-lg p-3 shadow-subtle">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-8 w-8 shrink-0 items-center justify-center rounded-md border">
                        <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <div className="truncate">
                        <p className="text-on-dark mt-0.5 text-caption leading-tight font-semibold">
                          1912 / 1800-180-1912
                        </p>
                      </div>
                    </div>
                    <a
                      href="tel:1912"
                      className="bg-primary text-on-primary ml-2 shrink-0 rounded-md px-3 py-1.5 text-button font-medium transition-transform active:scale-[0.98]"
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
