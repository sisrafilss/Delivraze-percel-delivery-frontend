import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Type inferred from Zod schema
type ContactFormValues = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Simulated loading

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async () => {
    setSubmitted(true);
    reset(); // clear form
    setTimeout(() => setSubmitted(false), 3000); // Hide success overlay
  };

  return (
    <main className="page-enter space-y-12 px-4 py-12 sm:px-8 lg:px-16">
      <section className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
          Reach out
        </p>
        <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
        <p className="text-sm text-muted-foreground">
          Have questions or feedback? Fill out the form below, and our team will
          get back to you shortly.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="relative rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-2xl">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
          ) : (
            <>
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Tell us how we can help and we will respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Inquiry about delivery services"
                      {...register("subject")}
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      rows={5}
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full rounded-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="p-0 text-sm text-muted-foreground">
                We aim to reply within 24 hours and soonest for urgent requests.
              </CardFooter>
            </>
          )}

          {submitted && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-[2rem] bg-white/80 text-center text-sm font-semibold text-foreground shadow-lg">
              <svg
                className="h-12 w-12 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Thank you! Your message has been received.
            </div>
          )}
        </Card>

        <div className="space-y-6 rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6 shadow-xl">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
              Contact details
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Other Ways to Reach Us
            </h2>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Email:{" "}
              <a
                href="mailto:support@delivraze.com"
                className="text-primary hover:underline"
              >
                support@delivraze.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+8801812345678"
                className="text-primary hover:underline"
              >
                +88 0181 234 5678
              </a>
            </p>
            <p>Address: 123 Urban Street, Dhaka, Bangladesh</p>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-4 text-sm text-muted-foreground shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
              Front desk
            </p>
            <p className="text-foreground">Mon - Sat · 8:00 AM - 8:00 PM</p>
            <p className="text-muted-foreground/80">
              Sundays reserved for urgent logistics support.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
