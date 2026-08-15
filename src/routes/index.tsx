import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/site/SiteShell";
import { Hero } from "@/site/sections/Hero";
import { RateBoard } from "@/site/sections/RateBoard";
import { Recovery } from "@/site/sections/Recovery";
import { Services } from "@/site/sections/Services";
import { Promise as PromiseSection } from "@/site/sections/Promise";
import { AppShowcase } from "@/site/sections/AppShowcase";
import { Stories } from "@/site/sections/Stories";
import { ContactStrip } from "@/site/sections/ContactStrip";
import { ClaimLookup } from "@/site/ClaimLookup";
import { SectionHeading } from "@/site/SectionHeading";
import { Reveal } from "@/site/Reveal";
import { getSiteSettings } from "@/lib/settings.functions";

export const Route = createFileRoute("/")({
  loader: () => getSiteSettings(),
  head: () => ({
    meta: [
      { title: "Restitute Banking | Refund Recovery & Everyday Banking" },
      {
        name: "description",
        content:
          "File a refund claim in five minutes, track every stage in real time and pay nothing until your money is returned. Banking built around recovery.",
      },
      { property: "og:title", content: "Restitute Banking | Refund Recovery & Everyday Banking" },
      {
        property: "og:description",
        content:
          "Refund recovery with no upfront fees, live claim tracking and a named specialist on every file.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const settings = Route.useLoaderData();

  return (
    <SiteShell>
      <Hero settings={settings} />

      <section className="relative bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Already filed?"
              title="Check exactly where your money is."
              intro="No login needed. Your reference code and the email on the claim are enough to see the live stage, the amount recovered so far and every note we have published."
            />
          </div>
          <Reveal direction="right" delay={120}>
            <ClaimLookup />
          </Reveal>
        </div>
      </section>

      <RateBoard settings={settings} />
      <Recovery />
      <Services />
      <PromiseSection />
      <AppShowcase />
      <Stories />
      <ContactStrip settings={settings} />
    </SiteShell>
  );
}
