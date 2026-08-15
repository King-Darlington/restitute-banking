import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock3 } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero } from "@/site/PageHero";
import { FeatureGrid, CtaBanner } from "@/site/blocks";
import { ClaimLookup } from "@/site/ClaimLookup";
import heroImage from "@/assets/customer-support.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Restitute recovery desk" },
      { name: "description", content: "Speak to a Restitute Banking recovery specialist by phone, email or secure message — seven days a week." },
      { property: "og:title", content: "Contact the Restitute recovery desk" },
      { property: "og:description", content: "Speak to a Restitute Banking recovery specialist by phone, email or secure message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Contact"
        title={<>Talk to a specialist, not a script.</>}
        intro="Every message reaches a named recovery specialist. Urgent fraud is handled around the clock, and existing claims are answered inside one business day."
        breadcrumb="Contact"
      />
      <FeatureGrid
        eyebrow="Reach us"
        title="Four direct lines into the recovery desk"
        items={[
          { icon: Phone, title: "24/7 fraud line", body: "1-800-RESTITUTE — report unauthorised movement the moment you see it.", meta: "Always open" },
          { icon: Mail, title: "Claims email", body: "claims@restitutebanking.com — attach evidence and quote your RB reference.", meta: "Reply < 24h" },
          { icon: Clock3, title: "Recovery desk", body: "Mon–Fri 8AM–8PM, Sat 9AM–1PM. Callback slots bookable inside your dashboard." },
          { icon: MapPin, title: "Registered office", body: "1200 Harbour Exchange, Suite 400, Wilmington, DE 19801." },
        ]}
        columns={4}
      />
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">Already filed with us?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Check the live status of any claim without signing in. You only need the RB reference
              from your confirmation email and the address the claim was filed under.
            </p>
          </div>
          <ClaimLookup compact />
        </div>
      </section>
      <CtaBanner
        title="Money missing? Start the file now."
        body="Filing takes five minutes and costs nothing. You only pay if we recover your funds."
        primary={{ label: "Request a refund", to: "/claims/new" }}
        secondary={{ label: "How recovery works", to: "/how-it-works" }}
      />
    </SiteShell>
  );
}
