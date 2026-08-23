import { Bell, Grid2X2, HelpCircle, Plus, Ticket } from "lucide-react";

/**
 * Main navigation items for the Consumer application.
 * Reused across Sidebar, BottomNavbar, and other navigation components.
 */
export const CONSUMER_NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    shortLabel: "Dashboard",
    href: "/dashboard",
    icon: Grid2X2,
  },
  {
    id: "complaints",
    label: "Complaints",
    shortLabel: "Complaints",
    href: "/complaints",
    icon: Ticket,
  },
  {
    id: "new-complaint",
    label: "New complaint",
    shortLabel: "New complaint",
    href: "/complaints/new",
    icon: Plus,
    isAction: true,
  },
  {
    id: "notices",
    label: "Notices",
    shortLabel: "Notices",
    href: "/notices",
    icon: Bell,
  },
  {
    id: "help",
    label: "Help",
    shortLabel: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

/**
 * Standard sidebar links (excluding primary action buttons which are rendered separately as CTAs).
 */
export const CONSUMER_SIDEBAR_LINKS = CONSUMER_NAV_ITEMS.filter(
  (item) => !item.isAction
);

/**
 * Bottom navigation bar links (all consumer tabs with icons and short labels).
 */
export const CONSUMER_BOTTOM_NAV_LINKS = CONSUMER_NAV_ITEMS;
