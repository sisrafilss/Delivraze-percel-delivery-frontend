import { Card, CardContent } from "@/components/ui/card";
import { steps } from "@/data/landingData";

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.step}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
