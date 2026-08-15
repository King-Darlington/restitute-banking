import { createFileRoute } from "@tanstack/react-router";
import { Bell, Fingerprint, LineChart, Radar, Send, Smartphone } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { CtaBanner, FaqList, FeatureGrid, StatBand } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import mobileImage from "@/assets/mobile-banking.jpg";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Restitute Mobile App | Claims, Cards & Alerts" },
      {
        name: "description",
        content:
          "Track claims, freeze cards, message your specialist and get real-time alerts. The Restitute app puts the recovery desk in your pocket.",
      },
      { property: "og:title", content: "Restitute Mobile App" },
      {
        property: "og:description",
        content: "Claim tracking, instant card controls and real-time alerts in one app.",
      },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  return (
    <SiteShell>
      <PageHero
        image={mobileImage}
        eyebrow="Mobile app"
        title={<>Your claim, your cards and your specialist — in one place.</>}
        intro="The app is not a shrunken website. It is the fastest route to the two things that matter in a loss: freezing the card and opening the file."
        breadcrumb="Mobile app"
      >
        <CtaButton to="/register">Create your login</CtaButton>
        <CtaButton to="/claims/track" variant="ghost">
          Track without an account
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: "4.9", label: "Average store rating" },
          { value: "60 sec", label: "Freeze to dispute" },
          { value: "Face ID", label: "Biometric login" },
          { value: "Real time", label: "Transaction alerts" },
        ]}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal direction="left">
            <img
              src={mobileImage}
              alt="Restitute Banking mobile app showing a claim timeline"
              loading="lazy"
              width={1400}
              height={1400}
              className="rounded-3xl border border-border object-cover shadow-lift"
            />
          </Reveal>
          <Reveal direction="right" delay={110}>
            <SectionHeading
              align="left"
              eyebrow="Designed for the bad day"
              title="Built for the moment you notice the money is gone"
              intro="Most banking apps optimise for balance-checking. We optimised for the panic minute: three taps from opening the app to a frozen card and a live claim."
            />
            <ol className="mt-8 space-y-4">
              {[
                "Open the app — biometric login, no password to remember",
                "Tap the transaction and freeze the card instantly",
                "Press dispute; merchant, amount and date are already filled",
                "Watch the stage change as your specialist works the file",
              ].map((step, index) => (
                <Reveal key={step} delay={index * 80} as="li" className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-relaxed text-foreground/85">{step}</span>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <FeatureGrid
        eyebrow="In the app"
        title="Everything the desk can see, you can see"
        tone="dark"
        items={[
          { icon: LineChart, title: "Live claim timeline", body: "Stage, owner, last action and next expected step, updated as it happens." },
          { icon: Send, title: "Message your specialist", body: "Reply in-thread and attach documents straight from your camera roll." },
          { icon: Bell, title: "Alerts that matter", body: "Authorisations, stage changes and evidence requests — nothing else." },
          { icon: Radar, title: "Subscription radar", body: "Spot price rises and zombie subscriptions before they cost you again." },
          { icon: Fingerprint, title: "Biometric security", body: "Face and fingerprint login, with device binding and session alerts." },
          { icon: Smartphone, title: "Offline receipts", body: "Snap and store evidence even without signal; it syncs when you reconnect." },
        ]}
      />

      <FaqList
        eyebrow="App FAQ"
        title="Getting started"
        items={[
          { q: "Do I need an account to use the app?", a: "Yes for the full app, but anyone can track an existing claim on the web with a reference code and email." },
          { q: "Which devices are supported?", a: "iOS 15 and later, and Android 10 and later, on phone and tablet." },
          { q: "Is my data safe on a shared device?", a: "Sessions are bound to the device and time out automatically. You can revoke any device instantly from settings." },
          { q: "Does it work outside the country?", a: "Yes, including card controls and claim tracking. Travel mode reduces false declines abroad." },
        ]}
      />

      <CtaBanner
        title="Set it up before you need it"
        body="Creating a login takes two minutes. It is the difference between a frozen card in seconds and a phone queue at midnight."
        primary={{ label: "Create your login", to: "/register" }}
        secondary={{ label: "See card controls", to: "/cards" }}
      />
    </SiteShell>
  );
}
