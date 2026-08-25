"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./_components/Sidebar";
import BottomNavbar from "./_components/BottomNavbar";

export default function ConsumerLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="text-ink min-h-screen">
      {/* Mobile Drawer Trigger */}
      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        className="border-hairline bg-canvas/90 fixed top-4 left-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg border shadow-xs backdrop-blur-sm md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Desktop & Mobile Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Surface */}
      <div className="relative flex min-h-screen flex-col pb-20 md:pl-72 md:pb-0">
        <main className="flex flex-1 flex-col">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}
