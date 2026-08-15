export type NavLink = { label: string; to: string; description?: string };
export type NavGroup = { label: string; to?: string; links?: NavLink[] };

export const navGroups: NavGroup[] = [
  { label: "Home", to: "/" },
  {
    label: "Refunds",
    links: [
      { label: "File a claim", to: "/claims/new", description: "Start a recovery file in under 5 minutes" },
      { label: "Track a claim", to: "/claims/track", description: "Check progress with your reference code" },
      { label: "How recovery works", to: "/how-it-works", description: "The six stages of every claim" },
      { label: "Grants & aid", to: "/grants", description: "Hardship support while you wait" },
    ],
  },
  {
    label: "Banking",
    links: [
      { label: "Personal banking", to: "/personal-banking", description: "Everyday accounts with refund cover" },
      { label: "Business banking", to: "/business-banking", description: "Chargeback defence for merchants" },
      { label: "Loans & credit", to: "/loans", description: "Bridging funds against pending claims" },
      { label: "Cards", to: "/cards", description: "Cards with instant dispute controls" },
    ],
  },
  { label: "Mobile app", to: "/app" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const footerColumns = [
  {
    title: "Refunds",
    links: [
      { label: "File a claim", to: "/claims/new" },
      { label: "Track a claim", to: "/claims/track" },
      { label: "How recovery works", to: "/how-it-works" },
      { label: "Grants & aid", to: "/grants" },
    ],
  },
  {
    title: "Banking",
    links: [
      { label: "Personal banking", to: "/personal-banking" },
      { label: "Business banking", to: "/business-banking" },
      { label: "Loans & credit", to: "/loans" },
      { label: "Cards", to: "/cards" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Mobile app", to: "/app" },
      { label: "Contact", to: "/contact" },
      { label: "Member login", to: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of service", to: "/terms" },
      { label: "Open an account", to: "/register" },
      { label: "Staff console", to: "/admin" },
    ],
  },
] as const;
