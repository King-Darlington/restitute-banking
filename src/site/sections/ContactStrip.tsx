import { Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { Reveal } from "../Reveal";
import type { SiteSettings } from "@/lib/settings.functions";

export function ContactStrip({ settings }: { settings: SiteSettings }) {
  const items = [
    {
      icon: Clock,
      title: "Recovery desk hours",
      lines: ["Mon–Fri: 8AM–8PM", "Sat: 9AM–1PM", "Sun: Closed"],
    },
    {
      icon: PhoneCall,
      title: "Phone support",
      lines: ["Available 24/7", settings["support_phone"] ?? "1-800-RESTITUTE", "Intl: +1-555-0123"],
    },
    {
      icon: Mail,
      title: "Email support",
      lines: ["Response within 24hrs", settings["support_email"] ?? "claims@restitutebanking.com"],
    },
    {
      icon: MapPin,
      title: "Visit us",
      lines: ["118 Recovery Row", "Financial District", "New York, NY 10001"],
    },
  ];

  return (
    <section className="bg-secondary py-14">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <div className="lift h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary-deep">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-foreground">{item.title}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {item.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
