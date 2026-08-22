// Primary issues with statutory SLAs and auto-assigned authorities
export const ISSUES = [
  {
    id: "outage",
    title: "Power Outage",
    desc: "Complete blackout or frequent tripping",
    urgency: "High",
    sla: "4 Hours (Urban SOP)",
    authority: "Sub-Division SDO & Breakdown Crew",
  },
  {
    id: "voltage",
    title: "Voltage Fluctuation",
    desc: "Low or spiking voltage tripping appliances",
    urgency: "High",
    sla: "24 Hours (Transformer Tap Setting)",
    authority: "Sub-Station Maintenance Team",
  },
  {
    id: "hazard",
    title: "Sparking & Hazard",
    desc: "Transformer blast, snapped wire, fire risk",
    urgency: "Critical",
    sla: "Immediate / 2 Hours",
    authority: "Emergency Breakdown Cell",
    isEmergency: true,
  },
  {
    id: "meter",
    title: "Meter Fault",
    desc: "Burnt, blank, fast, or defective meter",
    urgency: "Normal",
    sla: "3 Days (Testing & Replacement)",
    authority: "Meter & Testing (M&T) Division",
  },
  {
    id: "billing",
    title: "Billing Dispute",
    desc: "Inflated bill, wrong reading, double billing",
    urgency: "Medium",
    sla: "7 Days (Next Billing Cycle)",
    authority: "Revenue Wing / Billing Desk",
  },
  {
    id: "connection",
    title: "New Connection / Load",
    desc: "Delay in meter sanction or load enhancement",
    urgency: "Normal",
    sla: "7-15 Days",
    authority: "Commercial Division Officer",
  },
];

export const STEPS = [
  { num: 1, label: "Select Issue" },
  { num: 2, label: "Location Details" },
  { num: 3, label: "Review & Submit" },
];
