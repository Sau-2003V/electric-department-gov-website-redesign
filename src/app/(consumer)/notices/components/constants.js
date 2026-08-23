import {
  FileText,
  AlertTriangle,
  Flame,
  Zap,
  Info,
  Calendar,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export const INITIAL_NOTICES = [
  {
    id: "NOT-2026-089",
    title:
      "Revised Tariff Schedule & Fuel Surcharge Adjustment (FSA) FY 2026-27",
    description:
      "Statutory public notification of revised tariff rates approved by the State Electricity Regulatory Commission for domestic (LT-1), commercial (LT-2), and institutional consumers.",
    date: "22 Aug 2026",
    effectiveDate: "01 Sep 2026",
    category: "tariff",
    categoryLabel: "Tariff & Billing",
    department: "Commercial & Regulatory Wing",
    priority: "Statutory",
    priorityType: "critical",
    fileSize: "1.4 MB",
    fileType: "PDF",
    isNew: true,
    status: "Active",
  },
  {
    id: "NOT-2026-084",
    title:
      "Monsoon Public Safety Advisory & Inundation Precautionary Directives",
    description:
      "Mandatory safety precautions regarding earthing verification, waterlogged electrical installations, staying away from sagging lines, and immediate reporting of tree branch entanglements.",
    date: "20 Aug 2026",
    effectiveDate: "Immediate",
    category: "advisory",
    categoryLabel: "Public Safety",
    department: "Safety & Disaster Management Cell",
    priority: "High Alert",
    priorityType: "warning",
    fileSize: "680 KB",
    fileType: "PDF",
    isNew: true,
    status: "Active",
  },
  {
    id: "NOT-2026-078",
    title:
      "Scheduled 33/11 kV Grid Substation Maintenance & Feeder Augmentation",
    description:
      "Planned shutdown notice for Gomti Nagar Sectors 4, 5, 6 and Indira Nagar feeder lines for deployment of higher capacity power transformers and automated vacuum circuit breakers.",
    date: "18 Aug 2026",
    effectiveDate: "24 Aug 2026 (07:00 AM - 11:00 AM)",
    category: "maintenance",
    categoryLabel: "Scheduled Outage",
    department: "Transmission & Substation Division",
    priority: "Planned Work",
    priorityType: "info",
    fileSize: "420 KB",
    fileType: "PDF",
    isNew: false,
    status: "Scheduled",
  },
  {
    id: "NOT-2026-072",
    title:
      "PM Surya Ghar: Muft Bijli Yojana - Enhanced Rooftop Solar Subsidy Window",
    description:
      "Direct central financial assistance up to ₹78,000 for residential rooftop solar plant installations. Fast-track net-metering approval window open for domestic consumers.",
    date: "15 Aug 2026",
    effectiveDate: "Valid till 31 Dec 2026",
    category: "schemes",
    categoryLabel: "Subsidies & Schemes",
    department: "Renewable Energy & Solar Cell",
    priority: "Beneficiary Scheme",
    priorityType: "success",
    fileSize: "2.1 MB",
    fileType: "PDF",
    isNew: false,
    status: "Active",
  },
  {
    id: "NOT-2026-065",
    title: "Phase-3 AMI Smart Prepaid Meter Deployment & Remote Connect Policy",
    description:
      "Public notice to consumers in Alambagh, Aminabad, and Charbagh zones regarding statutory replacement of electromechanical meters with BIS-compliant smart prepaid meters.",
    date: "10 Aug 2026",
    effectiveDate: "15 Aug 2026 onwards",
    category: "metering",
    categoryLabel: "Smart Metering",
    department: "Smart Grid & IT Operations",
    priority: "Rollout Notice",
    priorityType: "info",
    fileSize: "950 KB",
    fileType: "PDF",
    isNew: false,
    status: "Active",
  },
  {
    id: "NOT-2026-058",
    title:
      "One-Time Settlement (OTS) Scheme for Surcharge Waiver on Outstanding Dues",
    description:
      "100% waiver on delayed payment surcharge (DPS) for domestic (up to 2kW) and agricultural consumers clearing pending electricity dues in full or 3 equal monthly installments.",
    date: "02 Aug 2026",
    effectiveDate: "Deadline: 31 Aug 2026",
    category: "schemes",
    categoryLabel: "Subsidies & Schemes",
    department: "Revenue & Recovery Division",
    priority: "Expiring Soon",
    priorityType: "warning",
    fileSize: "1.1 MB",
    fileType: "PDF",
    isNew: false,
    status: "Expiring Soon",
  },
  {
    id: "NOT-2026-049",
    title:
      "Right of Way (RoW) Clearance along 132 kV High Tension Overhead Corridors",
    description:
      "Public directive prohibiting unauthorized construction, heavy hoarding erection, and tree plantation exceeding permissible heights within statutory safety distances of extra high voltage corridors.",
    date: "28 Jul 2026",
    effectiveDate: "Immediate",
    category: "advisory",
    categoryLabel: "Statutory Directive",
    department: "Civil & Transmission Works",
    priority: "Statutory",
    priorityType: "critical",
    fileSize: "540 KB",
    fileType: "PDF",
    isNew: false,
    status: "Active",
  },
];

export const TABS_CONFIG = [
  { id: "all", label: "All Notices" },
  { id: "tariff", label: "Tariff & Billing" },
  { id: "advisory", label: "Public Advisories" },
  { id: "maintenance", label: "Scheduled Outages" },
  { id: "schemes", label: "Schemes & Subsidies" },
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
    dot: "bg-semantic-success",
  },
  Scheduled: {
    variant: "info",
    dot: "bg-report-blue",
  },
  "Expiring Soon": {
    variant: "warning",
    dot: "bg-report-orange",
  },
  Archived: {
    variant: "secondary",
    dot: "bg-ink-muted",
  },
};
