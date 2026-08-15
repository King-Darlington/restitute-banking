import { Quote, Star } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const stories = [
  {
    quote:
      "£4,300 vanished to a fake invoice. Restitute filed the dispute the same afternoon and I had the money back inside three weeks.",
    name: "Sarah Morris",
    role: "Verified member · Wire fraud claim",
    amount: "£4,300 recovered",
  },
  {
    quote:
      "As a merchant I used to lose every chargeback by default. Their evidence packs flipped that — we now win about four in five.",
    name: "John Davis",
    role: "Business banking · Chargeback defence",
    amount: "78% win rate",
  },
  {
    quote:
      "Someone cloned my card on holiday. The app froze it in a tap and the claim opened itself. I never sat on hold once.",
    name: "Emily Johnson",
    role: "Personal banking · Card claim",
    amount: "$1,180 recovered",
  },
];

export function Stories() {
  return (
    <section className="relative bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Member outcomes"
          title="Hear from people who got their money back"
          intro="Every quote below comes from a member whose claim reached the funds-returned stage."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stories.map((story, index) => (
            <Reveal key={story.name} delay={index * 110} direction="scale">
              <figure className="lift relative flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="h-7 w-7 text-primary/25" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                  “{story.quote}”
                </blockquote>
                <div className="mt-6 flex gap-1 text-warn">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{story.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{story.role}</p>
                  <p className="mt-3 inline-flex rounded-full bg-action-soft px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-action">
                    {story.amount}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
