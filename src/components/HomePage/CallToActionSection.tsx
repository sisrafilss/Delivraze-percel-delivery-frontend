import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function CallToActionSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent/40" />
      <div className="container mx-auto px-6 text-center">
        <h2 className="relative text-3xl font-bold">Ready to Get Started?</h2>
        <p className="relative mt-4 max-w-xl mx-auto text-primary-foreground/90">
          Join thousands of Bangladeshis already using Delivraze for secure and
          fast parcel delivery. Register today and experience hassle-free
          logistics.
        </p>
        <div className="relative mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Link to="/register?role=sender">Register as Sender</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/70 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link to="/register?role=receiver">Register as Receiver</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
