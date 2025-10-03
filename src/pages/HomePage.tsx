import AboutSection from "@/components/HomePage/AboutSection";
import CallToActionSection from "@/components/HomePage/CallToActionSection";
import FeaturesSection from "@/components/HomePage/FeaturesSection";
import HeroSection from "@/components/HomePage/Hero";
import HowItWorksSection from "@/components/HomePage/HowItWorksSection";
import WhyChooseUsSection from "@/components/HomePage/WhyChooseUsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const HomePage = () => {
  // Simulate loading for skeleton effect
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // simulate data loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="space-y-12">
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
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <HowItWorksSection />
          <WhyChooseUsSection />
          <CallToActionSection />
        </>
      )}
    </main>
  );
};

export default HomePage;
