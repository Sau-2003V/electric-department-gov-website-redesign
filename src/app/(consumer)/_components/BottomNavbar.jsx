"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONSUMER_BOTTOM_NAV_LINKS } from "@/constants/nav-links";
import { cn } from "@/lib/utils";

export default function BottomNavbar() {
  const pathname = usePathname();

  const isItemActive = (item) => {
    if (item.href === "/dashboard") {
      return pathname === "/dashboard";
    }
    if (item.href === "/complaints") {
      return (
        pathname === "/complaints" ||
        (pathname?.startsWith("/complaints/") && pathname !== "/complaints/new")
      );
    }
    if (item.href === "/complaints/new") {
      return pathname === "/complaints/new";
    }
    return pathname === item.href || pathname?.startsWith(`${item.href}/`);
  };

  return (
    <nav
      aria-label="Bottom Navigation"
      className="bg-canvas/95 border-hairline fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-2 py-1.5">
        {CONSUMER_BOTTOM_NAV_LINKS.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-w-0 flex-1 flex-col items-center justify-center py-0.5 transition-transform select-none active:scale-95"
            >
              {/* Icon Container / Active Pill */}
              <div
                className={cn(
                  "flex h-8 w-14 items-center justify-center rounded-full transition-all duration-200",
                  isActive
                    ? "bg-surface-soft text-ink shadow-subtle font-semibold"
                    : "text-muted-text group-hover:bg-surface-soft/80 group-hover:text-ink"
                )}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 1.8}
                  className={cn(
                    "shrink-0 transition-all duration-150",
                    isActive
                      ? "text-ink"
                      : "text-muted-text group-hover:text-ink"
                  )}
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  "mt-1 block w-full truncate px-0.5 text-center text-[11px] leading-tight tracking-tight transition-colors duration-150",
                  isActive ? "text-ink" : "text-muted-text group-hover:text-ink"
                )}
              >
                {item.shortLabel || item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
