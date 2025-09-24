import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

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
  return (
    <div className="space-y-20 py-12 px-4 md:px-16 lg:px-32 text-slate-900 dark:text-slate-100">
      {/* Service Description */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">About Delivraze</h1>
        <p className="text-lg max-w-3xl">
          Delivraze is a next-generation delivery platform that connects
          customers with reliable local couriers. Our goal is to provide fast,
          safe, and affordable delivery services while keeping you updated in
          real-time. From small parcels to urgent documents, we handle it all.
        </p>
      </section>

      {/* Mission Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <p className="text-lg max-w-3xl">
          At Delivraze, our mission is to simplify urban logistics by leveraging
          technology and a network of trusted couriers. We strive to make
          deliveries faster, safer, and stress-free for both businesses and
          individuals. Sustainability, reliability, and innovation are at the
          core of everything we do.
        </p>
      </section>

      {/* Team Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="bg-white dark:bg-slate-800 shadow-md"
            >
              <CardHeader className="space-y-2 text-center">
                <Avatar className="mx-auto h-20 w-20">
                  <AvatarImage src={member.image} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
