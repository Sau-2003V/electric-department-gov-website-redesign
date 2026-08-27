"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONSUMER_SIDEBAR_LINKS } from "@/constants/nav-links";
import { useGetUser, useInvalidateUser } from "@/database/query/getUser";
import { supabase } from "@/database/supabase/supabase";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();
  const invalidateUser = useInvalidateUser();
  const [signOutOpen, setSignOutOpen] = useState(false);

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
        "border-hairline bg-canvas fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r duration-200 ease-out md:flex"
      )}
    >
      <div className="border-hairline-soft flex h-16 items-center justify-between border-b px-4">
        <Link
          href="/"
          aria-label="Vidhyut Portal Home"
          className="flex min-w-0 items-center gap-3"
        >
          <Image
            src="/image/logo.svg"
            alt="Vidhyut Portal Logo"
            className="h-8 w-8 object-contain"
            width={48}
            height={48}
          />
          <div className="min-w-0">
            <p className="text-ink truncate text-sm font-medium tracking-tight">
              Vidhyut Portal
            </p>
            <p className="text-muted text-[11px]">Consumer Portal</p>
          </div>
        </Link>
      </div>

      {/* CTA Button & Navigation Links */}
      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        <div>
          <Button
            asChild
            variant="accent"
            size="default"
            shape="default"
            className="w-full justify-center"
          >
            <Link
              href="/complaints/new"
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
                className={cn(
                  "flex h-10 items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
                  isActive
                    ? "bg-surface-card text-ink font-medium"
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
      <div className="border-hairline-soft space-y-2 border-t p-3">
        {/* Sign out Action */}
        <Dialog open={signOutOpen} onOpenChange={setSignOutOpen}>
          <DialogTrigger
            render={
              <button
                type="button"
                className="text-muted hover:bg-surface-card hover:text-error flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-md px-3 text-sm transition-colors"
              >
                <LogOut size={16} strokeWidth={1.8} className="shrink-0" />
                <span>Sign out</span>
              </button>
            }
          />
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Sign out</DialogTitle>
              <DialogDescription>
                Are you sure you want to sign out of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost">Cancel</Button>} />
              <Button variant="destructive" onClick={handleSignOut}>
                Sign out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* User Card */}
        <Link
          href="/settings"
          className="border-hairline-soft bg-surface-card hover:bg-surface-soft block rounded-xl border p-3 transition-colors"
          title="Account Settings"
        >
          {isLoading ? (
            <div className="flex animate-pulse items-center gap-3">
              <div className="bg-surface-strong h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <div className="bg-surface-strong h-3.5 w-24 rounded" />
                <div className="bg-surface-strong h-3 w-16 rounded" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-primary text-on-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-ink truncate text-sm font-medium">{name}</p>
                <p className="text-muted truncate text-xs">
                  {meterNumber ? `Meter ${meterNumber}` : "Meter not linked"}
                </p>
              </div>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
