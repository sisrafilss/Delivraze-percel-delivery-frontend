import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">About Delivraze</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          We are a Bangladeshi parcel delivery company dedicated to connecting
          people with fast, secure, and reliable logistics solutions. Whether
          you are a sender or a receiver, our platform empowers you with
          complete control over your parcel journey.
        </p>
        <Card className="mt-10 mx-auto max-w-3xl">
          <CardContent className="p-6">
            <p className="text-lg font-medium">
              “Delivering trust, one parcel at a time.”
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
