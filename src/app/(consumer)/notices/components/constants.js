import {
  AlertTriangle,
  Flame,
  Info,
  Sparkles,
} from "lucide-react";

export const TABS_CONFIG = [
  { id: "all", label: "All Notices" },
  { id: "power", label: "Power" },
  { id: "emergency_outage", label: "Emergency Outages" },
  { id: "advisory", label: "Public Advisories" },
];

export const PRIORITY_CONFIG = {
  critical: {
    variant: "destructive",
    icon: AlertTriangle,
  },

  warning: {
    variant: "warning",
    icon: Flame,
  },

  info: {
    variant: "info",
    icon: Info,
  },

  success: {
    variant: "success",
    icon: Sparkles,
  },
};

export const STATUS_CONFIG = {
  Active: {
    variant: "success",
    dot: "bg-success",
  },

  Scheduled: {
    variant: "info",
    dot: "bg-brand-accent",
  },

  "Expiring Soon": {
    variant: "warning",
    dot: "bg-warning",
  },

  Archived: {
    variant: "secondary",
    dot: "bg-muted-text",
  },
};