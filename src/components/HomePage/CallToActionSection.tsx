import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CallToActionSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-primary/90 to-secondary/80 px-6 py-16 text-primary-foreground shadow-2xl shadow-primary/40 md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
          Ready to Get Started?
        </h2>
        <p className="mx-auto max-w-2xl text-base text-primary-foreground/90 md:text-lg">
          Join thousands of Bangladeshis already using Delivraze for secure and
          fast parcel delivery. Register today and experience hassle-free
          logistics.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full border border-white/40 bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:border-white hover:bg-white"
          >
            <Link to="/register?role=sender">
              Register as Sender
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:border-white"
          >
            <Link to="/register?role=receiver">Register as Receiver</Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-[0.4em] text-primary-foreground/80">
          <span>Free to Register</span>
          <span>No Hidden Fees</span>
          <span>Quick Setup</span>
        </div>
      </div>
    </section>
  );
}
