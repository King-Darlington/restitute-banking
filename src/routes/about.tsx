import { createFileRoute } from "@tanstack/react-router";
import { Compass, HeartHandshake, Scale, Users } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { FeatureGrid, StatBand, CtaBanner } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import teamImage from "@/assets/team-office.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Restitute Banking | Member-Owned Refund Recovery" },
      {
        name: "description",
        content:
          "Restitute Banking is member-owned and built around a recovery desk. Meet the people, the principles and the numbers behind the claims we win.",
      },
      { property: "og:title", content: "About Restitute Banking" },
      {
        property: "og:description",
        content: "Member-owned banking with a dedicated refund recovery desk at its centre.",
      },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2016", title: "Founded as a credit union", body: "Twelve members pooled deposits after a local payments processor collapsed owing them money." },
  { year: "2019", title: "The recovery desk opens", body: "We hired our first dispute specialists rather than outsourcing claims to a call centre." },
  { year: "2022", title: "Live claim tracking ships", body: "Members stopped calling to ask 'any update?' because the answer was already on screen." },
  { year: "2026", title: "$412M returned", body: "Over sixty-one thousand claims resolved, with an 87% recovery rate across all categories." },
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        image={teamImage}
        eyebrow="About us"
        title={<>We are the bank that fights to get your money back.</>}
        intro="Restitute Banking exists because the institutions holding people's money are rarely the ones willing to chase it. We put both jobs under one roof, owned by the members we serve."
        breadcrumb="About"
      >
        <CtaButton to="/claims/new">Start a claim</CtaButton>
        <CtaButton to="/contact" variant="ghost">
          Talk to a specialist
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: "$412M", label: "Recovered for members" },
          { value: "61,840", label: "Claims resolved" },
          { value: "87%", label: "Recovery rate" },
          { value: "19 days", label: "Median resolution" },
        ]}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal direction="left">
            <img
              src={teamImage}
              alt="Restitute Banking specialists working through a claim file"
              loading="lazy"
              width={1600}
              height={1008}
              className="rounded-3xl border border-border object-cover shadow-lift"
            />
          </Reveal>
          <Reveal direction="right" delay={110}>
            <SectionHeading
              align="left"
              eyebrow="Our mission"
              title="Owned by members, not shareholders."
              intro="Every surplus we make is reinvested into better rates, faster recoveries and hardship grants. There is no external investor waiting to be paid before you are."
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              We are regulated as a full-service financial institution and hold deposits under
              federal insurance limits. Our recovery specialists are trained on card scheme rules,
              payment services regulations and ombudsman procedure — because winning a claim is a
              matter of filing correctly, not of shouting loudly.
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureGrid
        eyebrow="What we stand for"
        title="Three principles we will not trade away"
        items={[
          {
            icon: Scale,
            title: "Fee only on success",
            body: "We never invoice a member for a claim that did not recover money. There is no retainer, no admin charge, no exit fee.",
          },
          {
            icon: Compass,
            title: "Visible at every stage",
            body: "You can see the exact stage, the named owner and the last action on your file at any hour, without asking us.",
          },
          {
            icon: HeartHandshake,
            title: "Support while you wait",
            body: "Hardship grants and bridging credit exist so a pending claim never becomes a missed rent payment.",
          },
        ]}
      />

      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="Our history" title="From twelve members to a national desk" />
          <ol className="mt-14 space-y-4">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 90} direction={index % 2 ? "right" : "left"}>
                <li className="lift flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 shadow-soft sm:flex-row sm:items-center">
                  <span className="w-24 shrink-0 font-mono text-lg font-bold text-primary">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FeatureGrid
        eyebrow="The team"
        title="Who actually works your file"
        tone="dark"
        columns={4}
        items={[
          { icon: Users, title: "Intake analysts", body: "Verify identity and build the transaction trail within one business day." },
          { icon: Scale, title: "Dispute specialists", body: "File under the correct scheme rules and drive the counterparty response." },
          { icon: Compass, title: "Escalation counsel", body: "Take unresolved claims to the ombudsman or regulator on your behalf." },
          { icon: HeartHandshake, title: "Member care", body: "Handle grants, bridging credit and anything else the wait creates." },
        ]}
      />

      <CtaBanner
        title="Bank with the people who chase it down"
        body="Open an account in minutes, or file a claim first and open the account when your funds land."
        primary={{ label: "Open an account", to: "/register" }}
        secondary={{ label: "File a claim", to: "/claims/new" }}
      />
    </SiteShell>
  );
}
