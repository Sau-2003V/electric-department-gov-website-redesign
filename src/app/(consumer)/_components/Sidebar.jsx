"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Plus,
  UserCircle2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { CONSUMER_SIDEBAR_LINKS } from "@/constants/nav-links";
import { useGetUser, useInvalidateUser } from "@/database/query/getUser";
import { supabase } from "@/database/supabase/supabase";
import { useState } from "react";

export default function Sidebar({
  isOpen = true,
  onToggle,
  mobileOpen = false,
  onMobileToggle,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();
  const invalidateUser = useInvalidateUser();
  const [profileOpen, setProfileOpen] = useState(false);

  const appMetadata = user?.app_metadata || user?.raw_app_meta_data || {};

  const name =
    appMetadata.name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Consumer";

  const email = user?.email || "No email on file";
  const meterNumber =
    appMetadata.meter_number || user?.user_metadata?.meter_number || null;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "C";

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      invalidateUser();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <aside
      className={`border-hairline bg-background fixed inset-y-0 left-0 z-40 flex flex-col border-r shadow-md transition-all duration-300 ease-out ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } ${isOpen ? "w-[82vw] max-w-[18rem] md:w-72" : "w-[82vw] max-w-[18rem] md:w-20"}`}
    >
      {/* Brand Header */}
      <div className="border-hairline-soft flex h-16 items-center justify-between border-b px-3">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3">
          {isOpen && (
            <div className="min-w-0 leading-none">
              <p className="text-ink truncate text-sm font-semibold tracking-tight">
                Vidhyut Vitran Nigam
              </p>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={() => {
            const isMobileViewport =
              typeof window !== "undefined" && window.innerWidth < 768;

            if (isMobileViewport && onMobileToggle) {
              onMobileToggle();
            } else if (onToggle) {
              onToggle();
            }
          }}
          className="text-ink-muted hover:bg-surface-2 hover:text-ink flex h-8 w-8 items-center justify-center rounded-md transition-colors"
          aria-label={
            typeof window !== "undefined" && window.innerWidth < 768
              ? "Close sidebar"
              : isOpen
                ? "Collapse sidebar"
                : "Expand sidebar"
          }
        >
          {typeof window !== "undefined" && window.innerWidth < 768 ? (
            <ChevronLeft size={16} />
          ) : isOpen ? (
            <ChevronLeft size={16} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-0.75">
              <img
                src="/image/button.png"
                alt="Vidhyut Vitran Nigam Logo"
                className="h-8 w-8"
              />
            </div>
          )}
        </button>
      </div>

      <div className="border-hairline-soft px-3 pt-3">
        <div className="bg-surface-2 border-hairline-soft rounded-xl border p-3 shadow-sm">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="bg-surface-3 h-10 w-10 rounded-full" />
              <div className="bg-surface-3 h-3.5 w-20 rounded" />
              <div className="bg-surface-3 h-3 w-24 rounded" />
            </div>
          ) : (
            <div className={`flex items-center ${isOpen ? "gap-3" : "justify-center"}`}>
              <div className="bg-ink text-on-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {initials}
              </div>
              {isOpen && (
                <div className="min-w-0">
                  <p className="text-ink truncate text-sm font-semibold">{name}</p>
                  <p className="text-ink-subtle mt-0.5 truncate text-xs">
                    {meterNumber ? `Meter ${meterNumber}` : "Meter not linked"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action CTA & Navigation Links */}
      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        <div>
          <Button
            asChild
            variant="accent"
            size="default"
            shape="default"
            className={`w-full ${isOpen ? "justify-center" : "justify-center px-0"}`}
          >
            <Link
              href="/complaints/new"
              aria-label="Register a new complaint"
              className={`${isOpen ? "gap-2" : "gap-0"}`}
            >
              <Plus size={16} strokeWidth={2.5} className="shrink-0" />
              {isOpen && <span>New complaint</span>}
            </Link>
          </Button>
        </div>

        <nav className="space-y-1">
          {CONSUMER_SIDEBAR_LINKS.map((item) => {
            const Icon = item.icon;
            const isExactMatch = pathname === item.href;
            const isChildMatch =
              item.href !== "/dashboard" &&
              item.href !== "/complaints" &&
              pathname?.startsWith(`${item.href}/`);
            const isActive = isExactMatch || isChildMatch;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-10 items-center rounded-md text-sm transition-colors ${
                  isOpen ? "gap-2.5 px-3" : "justify-center px-0"
                } ${
                  isActive
                    ? "bg-surface-1 text-ink font-medium"
                    : "text-ink-muted hover:bg-surface-1 hover:text-ink"
                }`}
                title={isOpen ? undefined : item.label}
              >
                <Icon size={16} strokeWidth={1.8} className="shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-hairline-soft relative space-y-2 border-t p-3">
        <button
          type="button"
          onClick={handleSignOut}
          className={`text-ink-muted hover:bg-surface-2 hover:text-ink flex h-10 cursor-pointer items-center rounded-md text-sm transition-colors ${
            isOpen ? "w-full gap-2.5 px-3" : "w-full justify-center px-0"
          }`}
          title={isOpen ? undefined : "Sign out"}
        >
          <LogOut size={16} strokeWidth={1.8} className="shrink-0" />
          {isOpen && <span>Sign out</span>}
        </button>

        {isOpen && (
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="border-hairline-soft bg-surface-2 w-full rounded-lg border p-3 text-left transition-colors hover:bg-surface-1"
          >
          </button>
        )}

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, x: 12, y: 6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 12, y: 6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="bg-background border-hairline-soft absolute -right-72 bottom-3 z-50 w-64 rounded-xl border p-4 shadow-xl"
            >
              <div className="flex items-center gap-3 border-b border-hairline-soft pb-3">
                <div className="bg-ink text-on-primary flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-ink truncate text-sm font-semibold">{name}</p>
                  <p className="text-ink-subtle text-[11px]">Consumer profile</p>
                </div>
              </div>

              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-subtle">Email</dt>
                  <dd className="text-ink max-w-42 text-right wrap-break-word font-medium">
                    {email}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-subtle">Meter</dt>
                  <dd className="text-ink font-medium">
                    {meterNumber || "Not linked"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-subtle">Status</dt>
                  <dd className="text-success font-medium">Active</dd>
                </div>
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
