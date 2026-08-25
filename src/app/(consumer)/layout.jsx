"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./_components/Sidebar";
import BottomNavbar from "./_components/BottomNavbar";

export default function ConsumerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="text-ink min-h-screen">
      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-background/90 shadow-sm backdrop-blur-sm md:hidden"
        aria-label="Open dashboard navigation"
      >
        <Menu size={18} />
      </button>

      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close dashboard navigation"
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileToggle={() => setMobileSidebarOpen((prev) => !prev)}
      />
      {/* Main Content Surface */}
      <div
        className={`relative flex min-h-screen flex-col pb-20 transition-all duration-300 md:pb-0 ${
          sidebarOpen ? "md:pl-72" : "md:pl-20"
        }`}
      >
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
      {/* Mobile Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}
