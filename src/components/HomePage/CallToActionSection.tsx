import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4 max-w-xl mx-auto">
          Join thousands of Bangladeshis already using Delivraze for secure and
          fast parcel delivery. Register today and experience hassle-free
          logistics.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Register as Sender
          </Button>
          <Button size="lg" variant="outline" className="bg-background">
            Register as Receiver
          </Button>
        </div>
      </div>
    </section>
  );
}
