import deliveryIllustration from "@/assets/images/delivery-illustration.svg";
import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Link } from "react-router";

const heroStats = [
  { label: "Parcels Delivered", value: "50K+" },
  { label: "Happy Customers", value: "12K+" },
  { label: "Covered Districts", value: "64" },
];

export default function HeroSection() {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(11,111,242,0.2),_transparent_55%),_radial-gradient(circle_at_20%_30%,_rgba(29,211,176,0.25),_transparent_50%)]">
      <div className="container mx-auto flex min-h-[80vh] flex-col justify-center gap-12 px-6 py-16 lg:flex-row lg:items-center">
        <div className="w-full space-y-6 lg:w-6/12">
          <div className="inline-flex items-center rounded-full bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
            Bangladeshi Logistics
          </div>
          <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-primary">Fast & Reliable</span> Parcel Delivery
            Across Bangladesh
          </h1>
          <p className="text-lg text-muted-foreground/80">
            Delivraze brings you transparent, trackable, and stress-free
            delivery from pickup to drop-off. Send parcels, monitor live
            locations, and stay informed every step of the way.
          </p>

          <div className="flex flex-wrap gap-3">
            {!isLoading && userInfo?.role === "SENDER" && (
              <Button
                size="lg"
                asChild
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-xl shadow-primary/25 transition hover:shadow-2xl"
              >
                <Link to="/sender/parcel-request">
                  Send a Parcel
                </Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full border-primary/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition hover:border-primary hover:text-primary"
            >
              <Link to="/track-parcel">Track a Parcel</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/70 bg-card/80 p-4 text-center shadow-lg shadow-primary/10 backdrop-blur"
              >
                <p className="text-2xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-5/12">
          <div className="relative h-full rounded-[2.25rem] border border-border/60 bg-card/80 p-6 text-left shadow-2xl shadow-primary/10 backdrop-blur">
            <div className="absolute -top-8 right-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary-foreground shadow-xl">
              Live Tracking
            </div>
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Next Parcel Pickup
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  Dhaka to Chattogram
                </h3>
                <p className="text-sm text-muted-foreground/80">
                  We schedule pickups within 90 minutes in Greater Dhaka.
                </p>
              </div>
              <div className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-4 text-sm font-semibold text-foreground">
                <div>
                  <p className="text-xs">Pickup Window</p>
                  <p className="text-lg">09:00 - 11:00</p>
                </div>
                <div>
                  <p className="text-xs">Progress</p>
                  <p className="text-lg text-primary">68%</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-muted/10">
                <img
                  src={deliveryIllustration}
                  alt="Parcel delivery illustration"
                  className="h-60 w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="surface-glow absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-secondary/30 blur-3xl" />
          <div className="surface-glow absolute -top-10 -left-10 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
