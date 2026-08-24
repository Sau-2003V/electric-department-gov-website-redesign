"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/dropdown";
import { MenuItem } from "@/components/ui/menu-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  User,
  Settings,
  CreditCard,
  LogOut,
  Calendar,
  Copy,
  Trash2,
  Sparkles,
  Shield,
  Layers,
  Check,
  MoreHorizontal,
  ExternalLink,
  Share2,
} from "lucide-react";

export default function DropdownDocsPage() {
  const [selectedRole, setSelectedRole] = useState(0);
  const [themeMode, setThemeMode] = useState(0);

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-semibold tracking-tight">
            Dropdown Menu
          </h1>
          <Badge variant="accent" size="sm" shape="tag">
            Updated v2.0
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          Floating action menus and select popups with proximity hover glow, spring micro-motion, keyboard roving focus, and design token surfaces.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; DropdownMenu, DropdownTrigger, DropdownContent, DropdownLabel, DropdownSeparator &#125; from &quot;@/components/ui/dropdown&quot;;
          </code>
        </div>
      </div>

      {/* 1. Interactive Demos */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-semibold">1. Interactive Menus</h2>
          <p className="text-muted-text text-xs">
            Click any trigger below to preview popover menus.
          </p>
        </div>

        <div className="border-hairline bg-surface-card grid grid-cols-1 gap-6 rounded-2xl border p-6 shadow-subtle sm:grid-cols-2 lg:grid-cols-3">
          {/* User Account Menu */}
          <div className="bg-canvas border-hairline flex flex-col justify-between gap-4 rounded-xl border p-5 shadow-subtle">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-semibold">Account & Navigation</h3>
              <p className="text-muted-text text-xs">Standard profile dropdown with icons and shortcuts.</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownTrigger asChild>
                  <Button variant="secondary" trailingIcon={ChevronDown}>
                    My Account
                  </Button>
                </DropdownTrigger>
                <DropdownContent align="start">
                  <DropdownLabel>Signed in as alex@cal.com</DropdownLabel>
                  <DropdownSeparator />
                  <MenuItem icon={User} label="Profile & Bio" shortcut="⌘P" />
                  <MenuItem icon={Calendar} label="Availability Schedules" badge="3" />
                  <MenuItem icon={Settings} label="Preferences" shortcut="⌘," />
                  <MenuItem icon={CreditCard} label="Billing & Invoices" />
                  <DropdownSeparator />
                  <MenuItem
                    icon={LogOut}
                    label="Log out"
                    destructive
                    shortcut="⇧⌘Q"
                  />
                </DropdownContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Radio Item Selection */}
          <div className="bg-canvas border-hairline flex flex-col justify-between gap-4 rounded-xl border p-5 shadow-subtle">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-semibold">Radio Select Menu</h3>
              <p className="text-muted-text text-xs">Single-choice selection with animated check indicator.</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownTrigger asChild>
                  <Button variant="primary" trailingIcon={ChevronDown}>
                    {["Owner Role", "Admin Access", "Member Seat"][selectedRole]}
                  </Button>
                </DropdownTrigger>
                <DropdownContent checkedIndex={selectedRole} align="start">
                  <DropdownLabel>Workspace Role</DropdownLabel>
                  <DropdownSeparator />
                  <MenuItem
                    index={0}
                    checked={selectedRole === 0}
                    onSelect={() => setSelectedRole(0)}
                    label="Owner Role"
                    description="Full administrative & billing control"
                  />
                  <MenuItem
                    index={1}
                    checked={selectedRole === 1}
                    onSelect={() => setSelectedRole(1)}
                    label="Admin Access"
                    description="Manage team schedules & integrations"
                  />
                  <MenuItem
                    index={2}
                    checked={selectedRole === 2}
                    onSelect={() => setSelectedRole(2)}
                    label="Member Seat"
                    description="Individual booking link only"
                  />
                </DropdownContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Quick Actions Menu */}
          <div className="bg-canvas border-hairline flex flex-col justify-between gap-4 rounded-xl border p-5 shadow-subtle">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-semibold">Row Actions Context</h3>
              <p className="text-muted-text text-xs">Compact icon trigger for table rows and cards.</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownTrigger asChild>
                  <Button variant="secondary" size="icon" aria-label="More actions">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownContent align="end">
                  <MenuItem icon={Copy} label="Duplicate Link" shortcut="⌘D" />
                  <MenuItem icon={Share2} label="Share Booking Page" />
                  <MenuItem icon={ExternalLink} label="Preview in New Tab" />
                  <DropdownSeparator />
                  <MenuItem icon={Trash2} label="Delete Event Type" destructive />
                </DropdownContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
