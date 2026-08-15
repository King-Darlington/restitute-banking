import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/site/SiteShell";
import { PageHero } from "@/site/PageHero";
import { ProseSection } from "@/site/blocks";
import heroImage from "@/assets/data-privacy.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Restitute Banking" },
      { name: "description", content: "How Restitute Banking collects, uses and protects the personal and financial data you share when filing a refund claim." },
      { property: "og:title", content: "Privacy policy — Restitute Banking" },
      { property: "og:description", content: "How Restitute Banking collects, uses and protects your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Legal"
        title="Privacy policy"
        intro="We only collect what a recovery genuinely requires, we tell you why, and we delete it on schedule."
        breadcrumb="Privacy"
      />
      <ProseSection title="What we collect">
        <p>
          Identity details (name, date of birth, address), contact details, and the transaction
          evidence you attach to a claim. Where a scheme requires proof of identity we collect a
          government document reference, never the full document image beyond the retention window.
        </p>
      </ProseSection>
      <ProseSection title="Why we use it">
        <p>
          To verify you are the account holder, to raise disputes with the paying institution under
          the correct scheme rules, and to meet anti-money-laundering obligations. We never sell
          personal data and we do not use claim evidence for marketing.
        </p>
      </ProseSection>
      <ProseSection title="Who sees it">
        <p>
          Your assigned recovery specialist, the counterparty institution strictly as needed to file
          the dispute, and regulators or an ombudsman when a case is escalated.
        </p>
      </ProseSection>
      <ProseSection title="How long we keep it">
        <p>
          Claim files are retained for six years after closure, as required for financial dispute
          records. Uploaded identity documents are purged 90 days after verification.
        </p>
      </ProseSection>
      <ProseSection title="Your rights">
        <p>
          You can request a copy, correction or erasure of your data at any time by emailing
          privacy@restitutebanking.com. We respond within 30 days.
        </p>
      </ProseSection>
    </SiteShell>
  );
}