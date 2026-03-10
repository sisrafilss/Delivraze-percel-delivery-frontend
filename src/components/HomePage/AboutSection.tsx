import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              About <span className="text-primary">Delivraze</span>
            </h2>
            <div className="w-20 rounded-full border border-border/40 bg-muted/40 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              Built in Bangladesh
            </div>
            <p className="text-lg text-muted-foreground/90 leading-relaxed">
              Delivraze is a Bangladeshi parcel delivery partner that brings
              courier-grade reliability to every doorstep. We blend local
              knowledge with modern tracking technology to keep you informed
              through each step of the delivery journey.
            </p>
            <p className="text-lg text-muted-foreground/90 leading-relaxed">
              Whether you are sending a business document or a personal parcel,
              our team is trained to handle every item with care and transparency.
              Every action is logged, every parcel insured, and every promise delivered.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border border-border/80 bg-card/80 shadow-xl">
                <CardContent className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground/70">
                    Trust Score
                  </p>
                  <h3 className="text-xl font-bold text-primary">4.9/5</h3>
                  <p className="text-sm text-muted-foreground">
                    Verified reviews from thousands of senders and receivers.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/80 bg-card/80 shadow-xl">
                <CardContent className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground/70">
                    Coverage
                  </p>
                  <h3 className="text-xl font-bold text-primary">64 Districts</h3>
                  <p className="text-sm text-muted-foreground">
                    Updated routing ensures express delivery to urban &amp;
                    rural hubs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6 rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 shadow-2xl backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-foreground">Our Promise</h3>
            <p className="text-sm text-muted-foreground/80">
              We do not just deliver parcels — we deliver peace of mind with
              precise communications, insured handling, and accountable
              couriers assigned to you.
            </p>
            <div className="space-y-4">
              <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                  24/7 Support
                </p>
                <p className="text-lg font-semibold text-primary">Always reachable</p>
                <p className="text-sm text-muted-foreground">
                  Live chat, call, and email follow-ups for every request.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                  Secure Handling
                </p>
                <p className="text-lg font-semibold text-primary">
                  Insurance + Dashboards
                </p>
                <p className="text-sm text-muted-foreground">
                  Continuous scans and verification prevent any surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
