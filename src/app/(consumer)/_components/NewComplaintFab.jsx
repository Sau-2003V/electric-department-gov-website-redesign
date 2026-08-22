"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewComplaintFab() {
  const pathname = usePathname();

  // Hide button if user is already on the new complaint page
  if (pathname === "/complaints/new") {
    return null;
  }

  return (
    <div className="pointer-events-none sticky bottom-6 z-30 mt-auto mr-6 self-end">
      <Button
        asChild
        variant="primary"
        shape="full"
        size="default"
        className="pointer-events-auto h-11 px-4.5 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95"
      >
        <Link href="/complaints/new" aria-label="Register a new complaint">
          <Plus size={16} strokeWidth={2.5} />
          <span>New complaint</span>
        </Link>
      </Button>
    </div>
  );
}
