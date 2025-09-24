import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useSendContactMessageMutation } from "@/redux/features/contact/contact.api"; // Example RTK query hook
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
  //   const [sendMessage, { isLoading }] = useSendContactMessageMutation(); // RTK Query mutation hook

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      //   await sendMessage(data).unwrap(); // Send data to backend via RTK Query
      console.log(data);
      setSubmitted(true);
      reset(); // clear form
      setTimeout(() => setSubmitted(false), 3000); // Hide success overlay after 3s
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="py-12 px-4 md:px-16 lg:px-32 text-slate-900 dark:text-slate-100 space-y-16">
      {/* Header */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Have questions or feedback? Fill out the form below, and our team will
          get back to you shortly.
        </p>
      </section>

      {/* Inquiry Form */}
      <section className="max-w-3xl mx-auto relative">
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
              {/* <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Message"}
              </Button> */}
            </form>
          </CardContent>

          {/* Animated success overlay */}
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
        </Card>
      </section>

      {/* Company Info */}
      <section className="max-w-3xl mx-auto space-y-2 text-center">
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
          <a href="tel:+1234567890" className="text-primary hover:underline">
            +1 (234) 567-890
          </a>
        </p>
        <p>Address: 123 Urban Street, Metropolis City, USA</p>
      </section>

      {/* Tailwind animation */}
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
