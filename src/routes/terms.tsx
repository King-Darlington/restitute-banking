import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/site/SiteShell";
import { PageHero } from "@/site/PageHero";
import { ProseSection } from "@/site/blocks";
import heroImage from "@/assets/secure-banking.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Restitute Banking" },
      { name: "description", content: "The terms that govern Restitute Banking accounts, refund recovery claims and our no-win-no-fee success fee." },
      { property: "og:title", content: "Terms of service — Restitute Banking" },
      { property: "og:description", content: "Account terms, claim handling rules and our no-win-no-fee structure." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Legal"
        title="Terms of service"
        intro="Plain terms for a service built on trust: what we do, what we charge, and what we will not promise."
        breadcrumb="Terms"
      />
      <ProseSection title="1. The service">
        <p>
          Restitute Banking provides everyday deposit accounts and a refund recovery service. We act
          as your representative in raising disputes with paying institutions. We are not a law firm
          and do not provide legal advice.
        </p>
      </ProseSection>
      <ProseSection title="2. Fees">
        <p>
          Filing a claim is free. If, and only if, funds are recovered, a success fee of 15% of the
          recovered amount is deducted before payout. No recovery, no fee, no hidden charges.
        </p>
      </ProseSection>
      <ProseSection title="3. Your responsibilities">
        <p>
          You confirm that the information and evidence you submit is accurate and that you are the
          rightful owner of the funds claimed. Knowingly false claims are reported to the relevant
          authorities and terminate your account.
        </p>
      </ProseSection>
      <ProseSection title="4. Outcomes">
        <p>
          We do not guarantee recovery. Scheme rules, time limits and the counterparty's solvency all
          affect outcomes. We will always tell you in writing why a claim was declined.
        </p>
      </ProseSection>
      <ProseSection title="5. Closing your file">
        <p>
          You may withdraw a claim at any time before settlement at no cost. Accounts can be closed
          on written request once no claim is active.
        </p>
      </ProseSection>
    </SiteShell>
  );
}