// Comprehensive Indian Electricity Regulatory Commission (SERC/CERC Standard of Performance)
// Complaints and Redressal Authority Catalog

export const COMPLAINT_CATEGORIES = [
  {
    id: "supply-quality",
    name: "Supply Quality & Outages",
    shortName: "Supply Quality",
    icon: "Zap",
    color: "amber",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    description:
      "Power cuts, voltage fluctuations, transformer breakdowns, and line faults",
    defaultUrgency: "High",
  },
  {
    id: "transformer-safety",
    name: "Transformer / Wire Damage & Safety",
    shortName: "Safety & Hazard",
    icon: "AlertTriangle",
    color: "red",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    description:
      "Sparking wires, fallen poles, transformer blast, live conductor hazard",
    defaultUrgency: "Critical",
  },
  {
    id: "meter-problems",
    name: "Meter Problems",
    shortName: "Meter Issues",
    icon: "Gauge",
    color: "blue",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description:
      "Faulty, fast, burnt meters, smart meter glitches, testing delays",
    defaultUrgency: "Medium",
  },
  {
    id: "billing-issues",
    name: "Billing Issues",
    shortName: "Billing Dispute",
    icon: "ReceiptText",
    color: "purple",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    description:
      "Inflated bills, wrong readings, double billing, arrears, security deposits",
    defaultUrgency: "Medium",
  },
  {
    id: "new-connection",
    name: "New Connection & Load Change",
    shortName: "New Connection",
    icon: "PlugZap",
    color: "emerald",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description:
      "Delays in sanction/installation, load enhancement/reduction, name transfer",
    defaultUrgency: "Normal",
  },
  {
    id: "disconnection-issues",
    name: "Disconnection & Reconnection",
    shortName: "Disconnection",
    icon: "PowerOff",
    color: "rose",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    description:
      "Unauthorized disconnection, lack of notice period, delayed reconnection",
    defaultUrgency: "High",
  },
  {
    id: "theft-unauthorized",
    name: "Theft & Unauthorized Use",
    shortName: "Theft / Hooking",
    icon: "ShieldAlert",
    color: "orange",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    description:
      "Power theft reporting (confidential), false tampering allegations",
    defaultUrgency: "High",
  },
  {
    id: "service-redressal",
    name: "Service, Helpline & Escalations",
    shortName: "Service Redressal",
    icon: "Headphones",
    color: "indigo",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    description:
      "Unresolved complaints, lack of compensation, CGRF/Ombudsman escalations",
    defaultUrgency: "Normal",
  },
];

// All 33 standard complaints faced by Indian electricity consumers mapped to authorities and auto-urgency
export const ALL_COMPLAINTS = [
  // 1. New Connection Related
  {
    id: 1,
    categoryId: "new-connection",
    categoryName: "New Connection Related",
    title: "Delay in getting a new connection sanctioned / installed",
    description:
      "Connection not energized within statutory Standard of Performance (SOP) timeline after payment of demand note.",
    urgency: "Normal",
    sla: "7-15 Days (Urban) / 30 Days (Rural)",
    primaryAuthority: "DISCOM (Sub-Divisional Officer / Commercial)",
    escalationAuthority: "CGRF (Consumer Grievance Redressal Forum)",
    legalProvision:
      "Section 43 of Electricity Act, 2003 (Duty to Supply on Request)",
    compensationEligible: true,
    compensationRate: "₹100/day of delay beyond SOP",
  },
  {
    id: 2,
    categoryId: "new-connection",
    categoryName: "New Connection Related",
    title: "Delay in load enhancement or reduction requests",
    description:
      "Application for load increase or reduction pending inspection or feasibility approval beyond 15 days.",
    urgency: "Normal",
    sla: "15 Days",
    primaryAuthority: "DISCOM (Executive Engineer / Commercial)",
    escalationAuthority: "CGRF",
    legalProvision: "Supply Code Regulations",
    compensationEligible: true,
    compensationRate: "₹50/day of delay",
  },
  {
    id: 3,
    categoryId: "new-connection",
    categoryName: "New Connection Related",
    title: "Excessive or unjustified service line charges",
    description:
      "Estimates inflated beyond SERC approved Cost Data Book or unauthorized infrastructure fee demand.",
    urgency: "Normal",
    sla: "10 Days",
    primaryAuthority: "DISCOM (Superintending Engineer / Cost Audit)",
    escalationAuthority: "CGRF / Electricity Ombudsman",
    legalProvision: "SERC Cost Data Book Regulations",
    compensationEligible: false,
  },
  {
    id: 4,
    categoryId: "new-connection",
    categoryName: "New Connection Related",
    title: "Connection not given as per sanctioned load",
    description:
      "Physical infrastructure/transformer cable restricted to lower load despite sanctioning higher capacity.",
    urgency: "Medium",
    sla: "7 Days",
    primaryAuthority: "DISCOM (Junior Engineer / Sub-Division)",
    escalationAuthority: "CGRF",
    legalProvision: "SERC Standard of Performance Regulations",
    compensationEligible: true,
  },
  {
    id: 5,
    categoryId: "new-connection",
    categoryName: "New Connection Related",
    title: "Issues with 'clubbing' of multiple connections",
    description:
      "Incorrect merging of separate family or commercial premises meter accounts leading to higher tariff slab.",
    urgency: "Normal",
    sla: "15 Days",
    primaryAuthority: "DISCOM (Revenue / SDO)",
    escalationAuthority: "CGRF",
    legalProvision: "SERC Tariff Order & Supply Code",
    compensationEligible: false,
  },
  {
    id: 6,
    categoryId: "new-connection",
    categoryName: "New Connection Related",
    title: "Delay in name transfer / change of ownership on connection",
    description:
      "Ownership mutation pending despite submission of registered sale deed or succession certificate.",
    urgency: "Normal",
    sla: "7 Working Days",
    primaryAuthority: "DISCOM (Commercial Section)",
    escalationAuthority: "CGRF",
    legalProvision: "Standard Terms and Conditions of Supply",
    compensationEligible: true,
    compensationRate: "₹50/day of delay",
  },

  // 2. Billing Issues
  {
    id: 7,
    categoryId: "billing-issues",
    categoryName: "Billing Issues",
    title: "Inflated or wrong electricity bills",
    description:
      "Abnormal surge in bill amount without corresponding consumption jump or arithmetic calculation error.",
    urgency: "Medium",
    sla: "7 Days (Within next billing cycle)",
    primaryAuthority: "DISCOM (Revenue Wing / Billing Desk)",
    escalationAuthority: "CGRF",
    legalProvision: "Electricity Supply Code (Billing Dispute Resolution)",
    compensationEligible: true,
    compensationRate: "Rebate on disputed amount if held unjustified",
  },
  {
    id: 8,
    categoryId: "billing-issues",
    categoryName: "Billing Issues",
    title: "Double billing",
    description:
      "Same consumption period billed twice or uncredited online payment showing as pending arrears.",
    urgency: "Medium",
    sla: "3-5 Working Days",
    primaryAuthority: "DISCOM (Accounts & IT Desk)",
    escalationAuthority: "CGRF",
    legalProvision: "Payment Reconciliation Norms",
    compensationEligible: true,
  },
  {
    id: 9,
    categoryId: "billing-issues",
    categoryName: "Billing Issues",
    title: "Wrong meter readings",
    description:
      "Provisional / assessed bill (MU/NA status) issued despite working meter, or reading punched incorrectly by meter reader.",
    urgency: "Medium",
    sla: "3 Working Days",
    primaryAuthority: "DISCOM (Meter Reading Agency / SDO)",
    escalationAuthority: "CGRF",
    legalProvision: "SERC SOP on Reading Verification",
    compensationEligible: true,
  },
  {
    id: 10,
    categoryId: "billing-issues",
    categoryName: "Billing Issues",
    title: "Delayed bill delivery",
    description:
      "Physical or SMS/e-bill received with less than mandatory 15-day payment window before due date.",
    urgency: "Normal",
    sla: "Immediate / 5 Days",
    primaryAuthority: "DISCOM (Billing Section)",
    escalationAuthority: "CGRF",
    legalProvision: "Supply Code (Minimum 15 Days notice for payment)",
    compensationEligible: false,
  },
  {
    id: 11,
    categoryId: "billing-issues",
    categoryName: "Billing Issues",
    title: "Back-billing (sudden huge arrears billed at once)",
    description:
      "Retrospective charges billed for past months/years without statutory notice or justification.",
    urgency: "High",
    sla: "15 Days (Hearing & Adjustment)",
    primaryAuthority: "DISCOM (Superintending Engineer - Audit)",
    escalationAuthority: "CGRF / Electricity Ombudsman",
    legalProvision:
      "Section 56(2) of Electricity Act (2-year limitation period on recovery)",
    compensationEligible: true,
  },
  {
    id: 12,
    categoryId: "billing-issues",
    categoryName: "Billing Issues",
    title: "Non-refund of excess security deposit",
    description:
      "Security deposit interest not credited annually or excess deposit not refunded after load reduction/closure.",
    urgency: "Normal",
    sla: "30 Days",
    primaryAuthority: "DISCOM (Finance & Accounts Officer)",
    escalationAuthority: "CGRF",
    legalProvision:
      "Section 47(4) of Electricity Act (Bank rate interest on security deposit)",
    compensationEligible: true,
    compensationRate: "Statutory interest at RBI Bank Rate",
  },
  {
    id: 13,
    categoryId: "billing-issues",
    categoryName: "Billing Issues",
    title: "Bill amount not matching actual consumption",
    description:
      "Tariff slab wrongly applied (e.g., Commercial rate applied to Domestic connection) or fixed charges miscalculated.",
    urgency: "Medium",
    sla: "7 Days",
    primaryAuthority: "DISCOM (Commercial Wing)",
    escalationAuthority: "CGRF",
    legalProvision: "State Electricity Tariff Schedule",
    compensationEligible: true,
  },

  // 3. Meter Problems
  {
    id: 14,
    categoryId: "meter-problems",
    categoryName: "Meter Problems",
    title: "Faulty, burnt, slow, or fast-running meters",
    description:
      "Meter display blank, dial running without load (creep), burnt terminal block, or erratic recording.",
    urgency: "High",
    sla: "24 Hours (Burnt) / 3 Days (Testing & Replacement)",
    primaryAuthority: "DISCOM (Meter & Testing / M&T Division)",
    escalationAuthority: "CGRF",
    legalProvision: "CEA (Installation and Operation of Meters) Regulations",
    compensationEligible: true,
    compensationRate: "₹50/day after 3 days",
  },
  {
    id: 15,
    categoryId: "meter-problems",
    categoryName: "Meter Problems",
    title: "Delay in meter testing or replacement",
    description:
      "Testing fee paid but NABL/accredited test bench inspection not conducted within statutory timeline.",
    urgency: "Normal",
    sla: "7 Days",
    primaryAuthority: "DISCOM (Executive Engineer - Testing)",
    escalationAuthority: "CGRF",
    legalProvision: "SERC Meter Testing Rules",
    compensationEligible: true,
  },
  {
    id: 16,
    categoryId: "meter-problems",
    categoryName: "Meter Problems",
    title: "False accusations of meter tampering",
    description:
      "Vigilance notice alleging seal breakage or bypass without laboratory forensic testing or videography.",
    urgency: "High",
    sla: "15 Days (Formal Hearing & Assessment)",
    primaryAuthority: "DISCOM (Assessing Officer - Section 126)",
    escalationAuthority: "CGRF / Electricity Ombudsman / Appellate Authority",
    legalProvision: "Section 126 & Section 127 of Electricity Act, 2003",
    compensationEligible: true,
  },
  {
    id: 17,
    categoryId: "meter-problems",
    categoryName: "Meter Problems",
    title: "Meter not installed despite connection approval",
    description:
      "Sanction letter issued and charges paid, but physical smart/electronic meter not supplied or fitted.",
    urgency: "Normal",
    sla: "7 Days",
    primaryAuthority: "DISCOM (Sub-Divisional Officer)",
    escalationAuthority: "CGRF",
    legalProvision: "Duty to Supply Regulations",
    compensationEligible: true,
  },
  {
    id: 18,
    categoryId: "meter-problems",
    categoryName: "Meter Problems",
    title:
      "Complaints regarding new smart meters (readings, malfunction, installation delays)",
    description:
      "Smart meter communication failure, prepaid balance deduction mismatch, or unnotified sudden disconnection.",
    urgency: "Medium",
    sla: "48 Hours",
    primaryAuthority:
      "DISCOM (Smart Meter PMU / Advanced Metering Infrastructure Cell)",
    escalationAuthority: "CGRF",
    legalProvision: "Ministry of Power RDSS Smart Metering Guidelines",
    compensationEligible: true,
  },

  // 4. Supply Quality
  {
    id: 19,
    categoryId: "supply-quality",
    categoryName: "Supply Quality",
    title: "Frequent power cuts / outages",
    description:
      "Repeated unnotified tripping, feeder breakdowns, or extended blackouts in the area.",
    urgency: "High",
    sla: "4 Hours (Urban) / 8 Hours (Rural)",
    primaryAuthority: "DISCOM (24x7 Breakdown Call Centre & SDO)",
    escalationAuthority: "Executive Engineer / CGRF",
    legalProvision: "Standard of Performance (Reliability Indices SAIFI/SAIDI)",
    compensationEligible: true,
    compensationRate: "₹50 to ₹100 per outage hour beyond SOP",
  },
  {
    id: 20,
    categoryId: "supply-quality",
    categoryName: "Supply Quality",
    title: "Low or fluctuating voltage",
    description:
      "Voltage dropping below 200V or spiking above 250V causing home appliances to fail or trip.",
    urgency: "High",
    sla: "24 Hours (Tap setting / Phase balance) / 10 Days (Capacitor/Line upgrade)",
    primaryAuthority: "DISCOM (Distribution Sub-Station & Maintenance Team)",
    escalationAuthority: "CGRF",
    legalProvision: "Indian Electricity Rules (Voltage tolerance limits ±6%)",
    compensationEligible: true,
  },
  {
    id: 21,
    categoryId: "supply-quality",
    categoryName: "Supply Quality",
    title: "Unscheduled load shedding",
    description:
      "Power cut without prior public press release, SMS notification, or statutory maintenance roster.",
    urgency: "High",
    sla: "Immediate / 2 Hours",
    primaryAuthority: "DISCOM (State Load Despatch / Operations)",
    escalationAuthority: "CGRF / SERC",
    legalProvision: "SERC Grid Code & SOP Regulations",
    compensationEligible: true,
  },
  {
    id: 22,
    categoryId: "transformer-safety",
    categoryName: "Supply Quality / Safety",
    title: "Line faults and transformer failures",
    description:
      "Distribution transformer (DTR) burnt, oil leakage, overhead wire snapped or pole leaning dangerously.",
    urgency: "Critical",
    sla: "12 Hours (Urban) / 24 Hours (Rural replacement)",
    primaryAuthority: "DISCOM (Emergency Breakdown Crew & Workshop Division)",
    escalationAuthority: "Superintending Engineer / CGRF",
    legalProvision: "Disaster and Breakdown Protocol (SOP)",
    compensationEligible: true,
    compensationRate: "₹200/day of extended delay",
  },
  {
    id: 23,
    categoryId: "transformer-safety",
    categoryName: "Supply Quality / Safety",
    title: "Long restoration time after supply failure / storm damage",
    description:
      "Prolonged blackout following storm, lightning strike, or substation breakdown without restoration updates.",
    urgency: "Critical",
    sla: "Priority / Rapid Action Protocol",
    primaryAuthority:
      "DISCOM (Disaster Management Cell / Chief Engineer Operations)",
    escalationAuthority: "SERC / Energy Ministry Taskforce",
    legalProvision: "State Disaster Management & Electricity Reliability Rules",
    compensationEligible: true,
  },

  // 5. Disconnection Issues
  {
    id: 24,
    categoryId: "disconnection-issues",
    categoryName: "Disconnection Issues",
    title: "Wrongful or unauthorized disconnection",
    description:
      "Power supply cut despite all bills being cleared on time, without any outstanding dues or intimation.",
    urgency: "Critical",
    sla: "4-6 Hours",
    primaryAuthority: "DISCOM (Sub-Divisional Officer / Assistant Engineer)",
    escalationAuthority: "CGRF / Electricity Ombudsman",
    legalProvision: "Section 56(1) of Electricity Act, 2003",
    compensationEligible: true,
    compensationRate: "₹250/day + Reconnection charge waiver",
  },
  {
    id: 25,
    categoryId: "disconnection-issues",
    categoryName: "Disconnection Issues",
    title: "Disconnection without the legally mandated notice period",
    description:
      "Supply cut abruptly without serving 15 clear days mandatory written/SMS disconnection notice.",
    urgency: "High",
    sla: "12 Hours (Immediate Restoration on Undertaking)",
    primaryAuthority: "DISCOM (Commercial Section / SDO)",
    escalationAuthority: "CGRF / Ombudsman",
    legalProvision: "Section 56(1) proviso (Mandatory 15-day notice)",
    compensationEligible: true,
  },
  {
    id: 26,
    categoryId: "disconnection-issues",
    categoryName: "Disconnection Issues",
    title: "Disconnection despite a bill being under dispute",
    description:
      "Power disconnected while dispute application is actively under review with CGRF or Disputed Bill Committee.",
    urgency: "High",
    sla: "12 Hours",
    primaryAuthority: "DISCOM (Revenue Wing / SDO)",
    escalationAuthority: "CGRF / Ombudsman (Injunction & Restoration)",
    legalProvision:
      "Section 56(1) proviso 2 (No disconnection if admitted sum deposited)",
    compensationEligible: true,
  },
  {
    id: 27,
    categoryId: "disconnection-issues",
    categoryName: "Disconnection Issues",
    title: "Delay in reconnection after bill payment",
    description:
      "Dues cleared and reconnection fee paid, but physical supply not restored within SOP timeline.",
    urgency: "High",
    sla: "4 Hours (Urban) / 12 Hours (Rural)",
    primaryAuthority: "DISCOM (Cash Counter / Line Crew)",
    escalationAuthority: "CGRF",
    legalProvision: "SERC Standards of Performance",
    compensationEligible: true,
    compensationRate: "₹100/day of delay",
  },

  // 6. Theft & Unauthorized Use
  {
    id: 28,
    categoryId: "theft-unauthorized",
    categoryName: "Theft & Unauthorized Use",
    title: "Complaints against electricity theft / hooking by others",
    description:
      "Direct hooking from distribution lines, bypassed meters, or illegal commercial tapping in neighborhood.",
    urgency: "High",
    sla: "24-48 Hours (Strictly Confidential Investigation)",
    primaryAuthority: "DISCOM (Anti-Power Theft Police / Vigilance Squad)",
    escalationAuthority: "Special Electricity Court / DG Vigilance",
    legalProvision:
      "Section 135 of Electricity Act, 2003 (Theft of Electricity)",
    compensationEligible: false,
  },
  {
    id: 29,
    categoryId: "theft-unauthorized",
    categoryName: "Theft & Unauthorized Use",
    title: "Wrongful theft / tampering allegations against genuine consumers",
    description:
      "Malicious vigilance raid report, extortion, or compounding notice served without physical seizure or videography.",
    urgency: "High",
    sla: "7 Days (Provisional Assessment Review)",
    primaryAuthority: "DISCOM (Designated Assessing Officer / SE Legal)",
    escalationAuthority:
      "Special Electricity Court / CGRF (if no theft case filed)",
    legalProvision: "Section 126/135 Procedural Safeguards",
    compensationEligible: true,
  },

  // 7. Service & Redressal
  {
    id: 30,
    categoryId: "service-redressal",
    categoryName: "Service & Redressal",
    title: "Poor response from customer care / helpline (1912)",
    description:
      "Helpline calls unattended, IVR loops, tickets auto-closed without physical visit or resolution.",
    urgency: "Normal",
    sla: "24 Hours",
    primaryAuthority: "DISCOM (Customer Care GM / IT Nodal Officer)",
    escalationAuthority: "CGRF",
    legalProvision: "Citizen Charter & Customer Care Guidelines",
    compensationEligible: false,
  },
  {
    id: 31,
    categoryId: "service-redressal",
    categoryName: "Service & Redressal",
    title: "Complaint not resolved despite multiple follow-ups",
    description:
      "DISCOM sub-division failed to resolve grievance within statutory SOP limits despite multiple docket IDs.",
    urgency: "High",
    sla: "30-45 Days (Formal CGRF Hearing & Binding Order)",
    primaryAuthority:
      "CGRF (Consumer Grievance Redressal Forum - Judicial Member)",
    escalationAuthority: "Electricity Ombudsman",
    legalProvision: "Section 42(5) of Electricity Act, 2003",
    compensationEligible: true,
    compensationRate: "Judicial compensation + Cost of litigation",
  },
  {
    id: 32,
    categoryId: "service-redressal",
    categoryName: "Service & Redressal",
    title: "No compensation despite proven deficiency in service",
    description:
      "DISCOM acknowledged SOP violation (e.g. prolonged outage/meter delay) but failed to credit automatic compensation in bill.",
    urgency: "High",
    sla: "30 Days",
    primaryAuthority: "CGRF / SERC (Standard of Performance Redressal)",
    escalationAuthority: "Electricity Ombudsman",
    legalProvision:
      "Section 57 of Electricity Act (Standards of performance of licensee)",
    compensationEligible: true,
    compensationRate: "Direct compensation order against DISCOM",
  },
  {
    id: 33,
    categoryId: "service-redressal",
    categoryName: "Service & Redressal",
    title: "Difficulty escalating complaints to CGRF / Ombudsman",
    description:
      "Sub-division refusing to provide docket escalation details, or CGRF hearing delayed beyond 45 days.",
    urgency: "High",
    sla: "Direct Ombudsman Hearing",
    primaryAuthority: "Electricity Ombudsman / SERC Secretariat",
    escalationAuthority:
      "Appellate Tribunal for Electricity (APTEL) / High Court",
    legalProvision: "Section 42(6) & 42(7) of Electricity Act, 2003",
    compensationEligible: true,
  },
];

// Statutory Authorities Hierarchy Matrix Definitions
export const STATUTORY_AUTHORITIES = [
  {
    tier: "Tier 1",
    name: "DISCOM (Distribution Licensee)",
    officers:
      "Junior Engineer (JE) -> Sub-Divisional Officer (SDO) -> Executive Engineer (EE)",
    scope:
      "Day-to-day operational issues, power outages, billing corrections, meter replacement, new connections, voltage stabilization.",
    timeLimit: "Immediate to 15 Days",
    appealWindow:
      "If unresolved in 15 days or aggrieved by response, escalate to CGRF.",
    badge: "Primary Responder",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    tier: "Tier 2",
    name: "CGRF (Consumer Grievance Redressal Forum)",
    officers:
      "Independent 3-member forum (Judicial/Legal Member, Technical Member, Consumer Representative)",
    scope:
      "Monetary disputes, tariff errors, persistent service failures, compensation under SOP, wrong disconnection, harassment.",
    timeLimit: "Mandatory Order within 45 Days",
    appealWindow:
      "Appeal to Electricity Ombudsman within 30 days of CGRF order.",
    badge: "Quasi-Judicial Forum",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    tier: "Tier 3",
    name: "Electricity Ombudsman",
    officers: "Statutory Authority appointed by SERC under Section 42(6)",
    scope:
      "Appeals against non-implementation of CGRF orders, unaddressed CGRF grievances, regulatory non-compliance by DISCOM.",
    timeLimit: "Order within 60 Days",
    appealWindow:
      "Final administrative level; next step is APTEL or High Court (Writ Jurisdiction).",
    badge: "Statutory Appellate Authority",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    tier: "Tier 4",
    name: "SERC (State Electricity Regulatory Commission) & Special Courts",
    officers:
      "State Commission Bench / Designated Special Electricity Courts (Sec 153)",
    scope:
      "Policy violations, licensee license revocation, penalty under Section 142/146, criminal theft trials (Section 135).",
    timeLimit: "Commission / Court Schedule",
    appealWindow: "Appellate Tribunal for Electricity (APTEL), New Delhi.",
    badge: "Regulatory Apex / Judicial",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
];

// Helper: Calculate automatic urgency and SLA given category & complaint ID
export function getAutoUrgencyAndSLA(categoryId, complaintId) {
  if (complaintId) {
    const matched = ALL_COMPLAINTS.find((c) => c.id === Number(complaintId));
    if (matched) {
      return {
        urgency: matched.urgency,
        sla: matched.sla,
        authority: matched.primaryAuthority,
        escalation: matched.escalationAuthority,
        legalProvision: matched.legalProvision,
        compensationEligible: matched.compensationEligible,
      };
    }
  }

  const cat = COMPLAINT_CATEGORIES.find((c) => c.id === categoryId);
  return {
    urgency: cat ? cat.defaultUrgency : "Normal",
    sla: "Standard SOP (24-72 Hours)",
    authority: "DISCOM Sub-Division",
    escalation: "CGRF",
    legalProvision: "Electricity Act, 2003",
    compensationEligible: false,
  };
}

// Helper: Search complaints by query
export function searchComplaints(query) {
  if (!query || !query.trim()) return ALL_COMPLAINTS;
  const q = query.toLowerCase().trim();
  return ALL_COMPLAINTS.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.categoryName.toLowerCase().includes(q) ||
      c.primaryAuthority.toLowerCase().includes(q)
  );
}
