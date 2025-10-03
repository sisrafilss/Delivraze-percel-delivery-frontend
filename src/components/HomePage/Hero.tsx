import deliveryIllustration from "@/assets/images/delivery-illustration.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Fast & Reliable Parcel Delivery in Bangladesh
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Delivraze Parcel Delivery makes sending and receiving parcels easy,
            transparent, and hassle-free.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg">Send a Parcel</Button>
            <Button size="lg" variant="outline">
              <Link to="track-parcel">Track a Parcel</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={deliveryIllustration}
            alt="Delivery Illustration"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
