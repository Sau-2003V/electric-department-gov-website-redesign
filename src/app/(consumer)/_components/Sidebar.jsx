"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Grid2X2,
  HelpCircle,
  LogOut,
  Plus,
  Ticket,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Grid2X2,
  },
  {
    label: "My complaints",
    href: "/complaints",
    icon: Ticket,
  },
  {
    label: "Notices",
    href: "/notices",
    icon: Bell,
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-hairline bg-surface-1 fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r">
      {/* Brand Header */}
      <div className="border-hairline-soft flex h-14 items-center gap-3 border-b px-4">
        <div className="bg-ink text-on-primary flex size-8 shrink-0 items-center justify-center rounded-full">
          <Zap
            size={16}
            strokeWidth={2.2}
            className="text-on-primary fill-current"
          />
        </div>

        <div className="min-w-0 flex-1 leading-none">
          <p className="text-ink truncate text-sm font-medium tracking-tight">
            Vidhyut Vitran Nigam
          </p>
        </div>
      </div>

      {/* Action CTA & Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {/* New Complaint CTA Button */}
        <div>
          <Button
            asChild
            variant="primary"
            size="default"
            shape="default"
            className="w-full justify-center gap-2 font-medium shadow-xs hover:shadow-sm transition-all active:scale-[0.99]"
          >
            <Link href="/complaints/new" aria-label="Register a new complaint">
              <Plus size={16} strokeWidth={2.5} className="shrink-0" />
              <span>New complaint</span>
            </Link>
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
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
                className={`flex h-9 items-center gap-2.5 rounded-md px-3 text-sm transition-colors ${
                  isActive
                    ? "bg-surface-2 text-ink font-medium"
                    : "text-ink-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <Icon size={16} strokeWidth={1.8} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile & Actions */}
      <div className="border-hairline-soft space-y-2 border-t p-3">
        {/* Sign Out Button */}
        <button
          type="button"
          className="text-ink-muted hover:bg-surface-2 hover:text-ink flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-md px-3 text-sm transition-colors"
        >
          <LogOut size={16} strokeWidth={1.8} className="shrink-0" />
          <span>Sign out</span>
        </button>
        {/* User Card */}
        <div className="border-hairline-soft bg-surface-2 rounded-lg border p-3">
          <p className="text-ink truncate text-xs font-medium">Ramesh Kumar</p>
          <p className="text-ink-subtle mt-0.5 truncate text-xs">
            Meter 1234567890
          </p>
        </div>
      </div>
    </aside>
  );
}
