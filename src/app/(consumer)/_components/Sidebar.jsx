"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONSUMER_SIDEBAR_LINKS } from "@/constants/nav-links";
import { useGetUser, useInvalidateUser } from "@/database/query/getUser";
import { supabase } from "@/database/supabase/supabase";
import { cn } from "@/lib/utils";

export default function Sidebar({ mobileOpen = false, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();
  const invalidateUser = useInvalidateUser();

  const appMetadata = user?.app_metadata || user?.raw_app_meta_data || {};
  const name =
    appMetadata.name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Consumer";
  const meterNumber =
    appMetadata.meter_number || user?.user_metadata?.meter_number || null;

  const initials =
    name
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
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-hairline bg-canvas transition-transform duration-200 ease-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-hairline-soft px-4">
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center gap-3"
          onClick={() => onClose?.()}
        >
          <img
            src="/image/logo.svg"
            alt="Vidhyut Portal Logo"
            className="h-8 w-8 object-contain"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-ink">
              Vidhyut Portal
            </p>
            <p className="text-[11px] text-muted">Consumer Portal</p>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => onClose?.()}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-card hover:text-ink md:hidden"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* CTA Button & Navigation Links */}
      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        <div>
          <Button
            asChild
            variant="default"
            size="default"
            shape="default"
            className="w-full justify-center"
          >
            <Link
              href="/complaints/new"
              onClick={() => onClose?.()}
              aria-label="Register a new complaint"
              className="flex items-center justify-center gap-2"
            >
              <Plus size={16} strokeWidth={2.5} className="shrink-0" />
              <span>New complaint</span>
            </Link>
          </Button>
        </div>

        <nav className="space-y-1" aria-label="Consumer Navigation">
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
                onClick={() => onClose?.()}
                className={cn(
                  "flex h-10 items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
                  isActive
                    ? "bg-surface-card font-medium text-ink"
                    : "text-muted hover:bg-surface-soft hover:text-ink"
                )}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className="shrink-0"
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer: Sign out & User Profile Box */}
      <div className="space-y-2 border-t border-hairline-soft p-3">
        {/* Sign out Action */}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-md px-3 text-sm text-muted transition-colors hover:bg-surface-card hover:text-error"
        >
          <LogOut size={16} strokeWidth={1.8} className="shrink-0" />
          <span>Sign out</span>
        </button>

        {/* User Card */}
        <div className="rounded-xl border border-hairline-soft bg-surface-card p-3">
          {isLoading ? (
            <div className="flex animate-pulse items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-surface-strong" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-24 rounded bg-surface-strong" />
                <div className="h-3 w-16 rounded bg-surface-strong" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{name}</p>
                <p className="truncate text-xs text-muted">
                  {meterNumber ? `Meter ${meterNumber}` : "Meter not linked"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
