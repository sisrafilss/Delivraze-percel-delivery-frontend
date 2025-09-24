/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/landingData";
// import { features } from "@/data/landingData";
import * as Icons from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Our Features</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = (Icons as any)[feature.icon];
            return (
              <Card key={feature.title} className="text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
