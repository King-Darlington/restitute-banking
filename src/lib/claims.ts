export const CLAIM_STATUSES = [
  "submitted",
  "under_review",
  "evidence_requested",
  "filed",
  "negotiation",
  "approved",
  "disbursed",
  "declined",
] as const;

export type ClaimStatus = (typeof CLAIM_STATUSES)[number];

export const statusMeta: Record<
  ClaimStatus,
  { label: string; blurb: string; tone: string; step: number }
> = {
  submitted: {
    label: "Submitted",
    blurb: "Your claim is logged and queued for a recovery specialist.",
    tone: "bg-primary-soft text-primary-deep border-primary/25",
    step: 1,
  },
  under_review: {
    label: "Under review",
    blurb: "A specialist is verifying the transaction trail and your evidence.",
    tone: "bg-primary-soft text-primary-deep border-primary/25",
    step: 2,
  },
  evidence_requested: {
    label: "Evidence requested",
    blurb: "We need one more document from you before we can file.",
    tone: "bg-warn/15 text-warn-foreground border-warn/40",
    step: 2,
  },
  filed: {
    label: "Filed with counterparty",
    blurb: "The dispute has been formally raised with the paying institution.",
    tone: "bg-accent text-accent-foreground border-primary/25",
    step: 3,
  },
  negotiation: {
    label: "In negotiation",
    blurb: "We are pressing the counterparty for a full settlement.",
    tone: "bg-accent text-accent-foreground border-primary/25",
    step: 4,
  },
  approved: {
    label: "Recovery approved",
    blurb: "The refund has been agreed and is being scheduled for payout.",
    tone: "bg-action-soft text-action border-action/35",
    step: 5,
  },
  disbursed: {
    label: "Funds returned",
    blurb: "Your money has been released to your nominated account.",
    tone: "bg-action-soft text-action border-action/35",
    step: 6,
  },
  declined: {
    label: "Declined",
    blurb: "This claim could not be recovered. Your case notes explain why.",
    tone: "bg-destructive/10 text-destructive border-destructive/30",
    step: 6,
  },
};

export const LOSS_TYPES = [
  { value: "unauthorized_transaction", label: "Unauthorised transaction" },
  { value: "merchant_dispute", label: "Merchant did not deliver" },
  { value: "wire_fraud", label: "Wire / transfer fraud" },
  { value: "card_chargeback", label: "Card chargeback" },
  { value: "investment_loss", label: "Investment or broker loss" },
  { value: "duplicate_charge", label: "Duplicate charge" },
  { value: "subscription_billing", label: "Unwanted subscription billing" },
  { value: "other", label: "Something else" },
] as const;

export type LossType = (typeof LOSS_TYPES)[number]["value"];

export const CURRENCIES = ["USD", "GBP", "EUR", "CAD", "AUD", "NGN", "ZAR"] as const;

export const RECOVERY_STAGES = [
  {
    title: "Report",
    body: "Tell us what happened, how much left your account and who took it. Five minutes, no account required.",
  },
  {
    title: "Verify",
    body: "A specialist confirms your identity and matches the transaction trail against the counterparty's records.",
  },
  {
    title: "Evidence",
    body: "We tell you exactly which documents strengthen the file, and chase nothing you do not need.",
  },
  {
    title: "File",
    body: "Your dispute is raised formally under the correct scheme rules and time limits.",
  },
  {
    title: "Negotiate",
    body: "We push for the full amount, escalate to the ombudsman where warranted, and keep the timeline visible.",
  },
  {
    title: "Return",
    body: "Recovered funds are paid to your nominated account and the file is closed with a written outcome.",
  },
];
