export const CONTACT_CHANNELS = [
  {
    id: "helpline",
    title: "1800-123-4567",
    label: "24×7 Demo Helpline",
    badge: "24×7 Active",
    badgeVariant: "accent-subtle",
    description:
      "Urgent power outages, high-tension wire snap, transformer sparks, or electric hazards.",
    icon: "PhoneCall",
    href: "tel:18001234567",
    actionLabel: "Call Helpline",
    copyValue: "1800-123-4567",
    isEmergency: true,
  },
  {
    id: "toll-free",
    title: "1800-000-0000",
    label: "Demo Customer Support",
    badge: "Toll Free",
    badgeVariant: "secondary",
    description:
      "Billing inquiries, meter verification, new connection tracking, and tariff clarification.",
    icon: "Phone",
    href: "tel:18000000000",
    actionLabel: "Call Support",
    copyValue: "1800-000-0000",
    isEmergency: false,
  },
  {
    id: "email",
    title: "support@vidhyut-demo.local",
    label: "Consumer Support Email",
    badge: "Demo Support",
    badgeVariant: "surface",
    description:
      "Written disputes, formal escalations, document submission, and simulated correspondence.",
    icon: "Mail",
    href: "mailto:support@vidhyut-demo.local",
    actionLabel: "Send Email",
    copyValue: "support@vidhyut-demo.local",
    isEmergency: false,
  },
  {
    id: "whatsapp",
    title: "WhatsApp Assistant",
    label: "Automated Self-Service",
    badge: "Coming Soon",
    badgeVariant: "canvas",
    description:
      "Instant bill PDF download, live area outage status, and automated complaint booking.",
    icon: "MessageSquare",
    href: null,
    actionLabel: "Coming Soon",
    copyValue: null,
    isComingSoon: true,
  },
];

export const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "How soon will my complaint be resolved?",
    answer:
      "Safety hazards (sparking, live conductor snaps, burning meter panels) are prioritized for emergency dispatch within 2 hours. Local area distribution outages are typically resolved within 4–12 hours. Billing disputes and meter testing requests are investigated within 3–5 working days.",
  },
  {
    id: "faq-2",
    question: "What qualifies as a safety-critical complaint?",
    answer:
      "Any incident involving fallen high-tension wires, transformer explosions or heavy smoke, flooded electrical panels, or live current leakage in public areas is classified as safety-critical. These trigger priority alerts to the nearest quick-response repair van.",
  },
  {
    id: "faq-3",
    question: "Can I track a complaint without signing in?",
    answer:
      "Yes. You can track any registered complaint in real-time by entering its alphanumeric reference ID on the Complaints page search bar or by calling the demo helpline and quoting your complaint ticket number to the operator.",
  },
  {
    id: "faq-4",
    question: "How do I dispute an incorrect electricity bill?",
    answer:
      "Visit the Billing section in the portal, select the disputed billing cycle, and click 'Dispute Bill'. You can upload a clear photo of your physical meter dial with current reading to initiate instant re-metering and billing adjustment.",
  },
  {
    id: "faq-5",
    question: "How do I apply for a new electricity connection?",
    answer:
      "Submit an online application through the 'New Connection' section. You will need proof of property ownership (or registered rent agreement), government-issued photo ID (Aadhaar / Voter ID / PAN), and your required load in kW.",
  },
  {
    id: "faq-6",
    question: "How do I report an unscheduled power cut?",
    answer:
      "You can call the demo helpline directly or register an outage ticket under the Complaints tab on this portal with your 10-digit consumer account number or meter serial number for automatic sub-station tracking.",
  },
];
