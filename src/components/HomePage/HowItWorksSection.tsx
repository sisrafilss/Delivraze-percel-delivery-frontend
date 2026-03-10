import { Card, CardContent } from "@/components/ui/card";
import { steps } from "@/data/landingData";

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
            Step-by-step
          </p>
          <h2 className="text-3xl font-bold">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground">
            Move from signup to delivery confirmation in a few smooth steps.
          </p>
        </div>
        <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-1/2 top-4 hidden h-[calc(100%-64px)] w-1 rounded-full bg-primary/30 md:block" />
          {steps.map((step, index) => (
            <Card
              key={step.step}
              className="border border-border/60 bg-card/90 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-primary-foreground shadow-md">
                    {step.step}
                  </div>
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                      Step {step.step}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {step.title}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
