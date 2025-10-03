import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    const timer = setTimeout(() => setIsLoading(false), 1000); // simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    console.log(data);
    setSubmitted(true);
    reset(); // clear form
    setTimeout(() => setSubmitted(false), 3000); // Hide success overlay
  };

  return (
    <div className="py-12 px-4 md:px-16 lg:px-32 text-slate-900 dark:text-slate-100 space-y-16">
      {/* Header */}
      <section className="space-y-4 text-center">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-60 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Have questions or feedback? Fill out the form below, and our team
              will get back to you shortly.
            </p>
          </>
        )}
      </section>

      {/* Inquiry Form */}
      <section className="max-w-3xl mx-auto relative">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        ) : (
          <Card className="bg-white dark:bg-slate-800 shadow-md">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
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
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
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
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
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
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>

              {submitted && (
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex flex-col items-center justify-center space-y-2 animate-fadeIn rounded-md">
                  <svg
                    className="w-16 h-16 text-green-600 dark:text-green-400 animate-bounce"
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
                  <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                    Thank you! Your message has been sent.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </section>

      {/* Company Info */}
      <section className="max-w-3xl mx-auto space-y-2 text-center">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-40 mx-auto" />
            <Skeleton className="h-4 w-60 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
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
                href="tel:+1234567890"
                className="text-primary hover:underline"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p>Address: 123 Urban Street, Metropolis City, USA</p>
          </>
        )}
      </section>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
