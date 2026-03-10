/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { reasons } from "@/data/landingData";
import * as Icons from "lucide-react";

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold">
              Why Choose <span className="text-primary">Us</span>
            </h2>
            <p className="text-muted-foreground">
              We blend local insight, modern tracking, and people-first
              customer service to deliver parcels and peace of mind.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = (Icons as any)[reason.icon];
              const accent =
                index === 1
                  ? "from-secondary"
                  : index === 2
                    ? "from-accent"
                    : "from-primary";

              return (
                <Card
                  key={reason.title}
                  className="border border-border/60 bg-white/80 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CardContent className="space-y-4">
                    <div
                      className={`inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br ${accent} to-white/80 px-4 py-2 text-sm font-semibold text-foreground shadow-lg`}
                    >
                      <Icon className="h-5 w-5 text-foreground" />
                      {reason.title}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
