import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

const teamMembers = [
  {
    name: "Sofia Martinez",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Sofia leads Delivraze with a vision to revolutionize fast, reliable delivery services across urban cities.",
  },
  {
    name: "James Lee",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    bio: "James ensures our platform is scalable, secure, and always online for our customers and partners.",
  },
  {
    name: "Aisha Khan",
    role: "Head of Operations",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    bio: "Aisha manages day-to-day operations and ensures smooth delivery coordination across all locations.",
  },
];

const About: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="page-enter space-y-16 px-4 py-12 sm:px-8 lg:px-16">
      <section className="mx-auto max-w-4xl space-y-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
          Our story
        </p>
        <h1 className="text-4xl font-bold text-foreground">About Delivraze</h1>
        <p className="text-lg text-muted-foreground">
          Delivraze is a next-generation delivery platform that connects
          customers with reliable local couriers. Our goal is to provide fast,
          safe, and affordable delivery services while keeping you updated in
          real-time. From small parcels to urgent documents, we handle it all.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 rounded-[2.5rem] border border-border/60 bg-card/90 p-6 shadow-2xl md:p-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
            <p className="text-sm text-muted-foreground">
              At Delivraze, our mission is to simplify urban logistics by
              leveraging technology and a network of trusted couriers. We strive
              to make deliveries faster, safer, and stress-free for both
              businesses and individuals. Sustainability, reliability, and
              innovation are at the core of everything we do.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Our Vision</h2>
            <p className="text-sm text-muted-foreground">
              To become the most trusted and transparent delivery partner in
              Bangladesh by building technology that delights senders and
              receivers equally.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/20 to-secondary/20 p-4 text-center shadow-lg">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/70">
              Metrics
            </p>
            <p className="text-3xl font-bold text-primary">64+</p>
            <p className="text-sm text-muted-foreground">Districts served</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/20 to-primary/20 p-4 text-center shadow-lg">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/70">
              Availability
            </p>
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground">Support team</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/20 to-primary/20 p-4 text-center shadow-lg">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/70">
              Satisfaction
            </p>
            <p className="text-3xl font-bold text-primary">4.9/5</p>
            <p className="text-sm text-muted-foreground">Average rating</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
            Meet our team
          </p>
          <h2 className="text-3xl font-semibold text-foreground">Meet Our Team</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/90 p-6 shadow-xl"
                >
                  <Skeleton className="mx-auto h-24 w-24 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </Card>
              ))
            : teamMembers.map((member) => (
                <Card
                  key={member.name}
                  className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/90 p-6 shadow-xl"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={member.image} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {member.role}
                    </CardDescription>
                  </div>
                  <CardContent className="text-sm text-muted-foreground">
                    {member.bio}
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>
    </main>
  );
};

export default About;
