import { Card, CardContent } from "@/components/ui/card";
import { reasons } from "@/data/landingData";
import * as Icons from "lucide-react";

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Why Choose Us?</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (Icons as any)[reason.icon];
            return (
              <Card key={reason.title}>
                <CardContent className="p-6 flex flex-col items-center">
                  <Icon className="h-10 w-10 text-secondary mb-4" />
                  <h3 className="text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {reason.description}
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
