// Issue definitions with DB-mapped priority values.
// `priority` maps to the `priority` enum in public.complaints:
//   normal | imp | vimp

export const ISSUES = [
  {
    id: "outage",
    title: "Power Outage",
    desc: "Complete blackout or frequent tripping",
    urgency: "High",
    priority: "imp",
    authority: "Sub-Division SDO & Breakdown Crew",
  },
  {
    id: "voltage",
    title: "Voltage Fluctuation",
    desc: "Low or spiking voltage tripping appliances",
    urgency: "High",
    priority: "imp",
    authority: "Sub-Station Maintenance Team",
  },
  {
    id: "hazard",
    title: "Sparking & Hazard",
    desc: "Transformer blast, snapped wire, fire risk",
    urgency: "Critical",
    priority: "vimp",
    authority: "Emergency Breakdown Cell",
    isEmergency: true,
  },
  {
    id: "meter",
    title: "Meter Fault",
    desc: "Burnt, blank, fast, or defective meter",
    urgency: "Normal",
    priority: "normal",
    authority: "Meter & Testing (M&T) Division",
  },
  {
    id: "billing",
    title: "Billing Dispute",
    desc: "Inflated bill, wrong reading, double billing",
    urgency: "Medium",
    priority: "normal",
    authority: "Revenue Wing / Billing Desk",
  },
  {
    id: "connection",
    title: "New Connection / Load",
    desc: "Delay in meter sanction or load enhancement",
    urgency: "Normal",
    priority: "normal",
    authority: "Commercial Division Officer",
  },
];

export const STEPS = [
  { num: 1, label: "Select Issue" },
  { num: 2, label: "Location Details" },
  { num: 3, label: "Review & Submit" },
];
