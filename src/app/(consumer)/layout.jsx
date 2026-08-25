"use client";

import Sidebar from "./_components/Sidebar";
import BottomNavbar from "./_components/BottomNavbar";

export default function ConsumerLayout({ children }) {
  return (
    <div className="text-ink min-h-screen">
      {/* Desktop & Mobile Sidebar */}
      <Sidebar />

      {/* Main Content Surface */}
      <div className="relative flex min-h-screen flex-col pb-20 md:pb-0 md:pl-72">
        <main className="flex flex-1 flex-col">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}
