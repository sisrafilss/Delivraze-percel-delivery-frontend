/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/landingData";
import * as Icons from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
              Delivraze tools
            </p>
            <h2 className="text-3xl font-bold">
              Our <span className="text-primary">Features</span>
            </h2>
            <p className="text-muted-foreground">
              Streamlined parcel handling, clear communication, and automated
              status updates keep you in control throughout the journey.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = (Icons as any)[feature.icon];
              const color =
                index === 1
                  ? "from-secondary"
                  : index === 2
                    ? "from-accent"
                    : "from-primary";

              return (
                <Card
                  key={feature.title}
                  className="border border-border/60 bg-card/70 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CardContent className="space-y-4">
                    <div
                      className={`inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br ${color} to-white/80 px-4 py-2 text-sm font-semibold text-foreground shadow-lg`}
                    >
                      <Icon className="h-5 w-5 text-foreground" />
                      {feature.title}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
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
