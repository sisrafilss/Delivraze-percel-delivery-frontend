import AboutSection from "@/components/HomePage/AboutSection";
import CallToActionSection from "@/components/HomePage/CallToActionSection";
import FeaturesSection from "@/components/HomePage/FeaturesSection";
import HeroSection from "@/components/HomePage/Hero";
import HowItWorksSection from "@/components/HomePage/HowItWorksSection";
import WhyChooseUsSection from "@/components/HomePage/WhyChooseUsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useRef, useState } from "react";

const HomePage = () => {
  // Simulate loading for skeleton effect
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>(
    {},
  );
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const sections = useMemo(
    () => [
      { key: "hero", node: <HeroSection /> },
      { key: "about", node: <AboutSection /> },
      { key: "features", node: <FeaturesSection /> },
      { key: "how-it-works", node: <HowItWorksSection /> },
      { key: "why-choose-us", node: <WhyChooseUsSection /> },
      { key: "call-to-action", node: <CallToActionSection /> },
    ],
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // simulate data loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setVisibleSections((prev) =>
            prev[index] ? prev : { ...prev, [index]: true },
          );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <main className="page-enter relative space-y-12 overflow-hidden">
      <div className="ambient-drift pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      <div
        className="ambient-drift pointer-events-none absolute top-1/3 -right-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        style={{ animationDelay: "1.6s" }}
      />
      <div
        className="ambient-drift pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
        style={{ animationDelay: "800ms" }}
      />

      {isLoading ? (
        <div className="space-y-12 p-4">
          <Skeleton className="h-64 w-full rounded-lg" /> {/* Hero */}
          <Skeleton className="h-48 w-full rounded-lg" /> {/* About */}
          <Skeleton className="h-48 w-full rounded-lg" /> {/* Features */}
          <Skeleton className="h-48 w-full rounded-lg" /> {/* How It Works */}
          <Skeleton className="h-48 w-full rounded-lg" /> {/* Why Choose Us */}
          <Skeleton className="h-32 w-full rounded-lg" /> {/* Call To Action */}
        </div>
      ) : (
        <>
          {sections.map((section, index) => (
            <section
              key={section.key}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              data-index={index}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={[
                "transform-gpu transition-all duration-850 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
                visibleSections[index]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0",
              ].join(" ")}
            >
              {section.node}
            </section>
          ))}
        </>
      )}
    </main>
  );
};

export default HomePage;
