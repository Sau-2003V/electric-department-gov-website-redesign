import {
  Inbox,
  Clock,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export const INITIAL_COMPLAINTS = [
  {
    id: "VVNL-240001",
    priority: "Safety critical",
    priorityType: "critical",
    title: "Sparking / safety hazard",
    description:
      "Live wire sparking near the school gate, heavy sparking every few minutes.",
    date: "22 Aug 2026, 3:02 pm",
    status: "Assigned",
    sla: "SLA breached",
    category: "Hazard",
    isMine: true,
  },
  {
    id: "VVNL-240002",
    priority: "High",
    priorityType: "high",
    title: "Power outage",
    description: "No supply in the entire block since last night.",
    date: "22 Aug 2026, 4:02 am",
    status: "In progress",
    sla: "SLA breached",
    category: "Outage",
    isMine: true,
  },
  {
    id: "VVNL-240005",
    title: "Street light",
    description: "Street lights on the main road stay off all night.",
    date: "17 Aug 2026, 6:02 pm",
    status: "Closed",
    sla: "SLA met",
    category: "Street Light",
    isMine: false,
  },
  {
    id: "VVNL-240007",
    title: "Voltage fluctuation",
    description: "Severe voltage fluctuation, appliances tripping repeatedly.",
    date: "21 Aug 2026, 2:02 am",
    status: "Assigned",
    sla: "SLA breached",
    category: "Voltage",
    isMine: false,
  },
  {
    id: "VVNL-240009",
    title: "Meter display blank",
    description:
      "Digital smart meter screen is unresponsive after power surge.",
    date: "14 Aug 2026, 11:15 am",
    status: "Resolved",
    sla: "SLA met",
    category: "Meter",
    isMine: true,
  },
];

export const TABS_CONFIG = [
  { id: "my", label: "My Complaints" },
  { id: "all", label: "All Complaints" },
  { id: "progress", label: "Progress Complaints" },
  { id: "resolved", label: "Resolved Complaints" },
  { id: "closed", label: "Closed Complaints" },
];

export const STATUS_CONFIG = {
  Registered: {
    icon: Inbox,
    variant: "canvas",
    dot: "bg-ink-tertiary",
  },
  Assigned: {
    icon: Clock,
    variant: "info",
    dot: "bg-report-blue",
  },
  "In progress": {
    icon: Loader2,
    variant: "warning",
    dot: "bg-report-orange",
  },
  Resolved: {
    icon: CheckCircle2,
    variant: "success",
    dot: "bg-semantic-success",
  },
  Closed: {
    icon: CheckCircle2,
    variant: "secondary",
    dot: "bg-ink-muted",
  },
};
