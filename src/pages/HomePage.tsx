import AboutSection from "@/components/HomePage/AboutSection";
import CallToActionSection from "@/components/HomePage/CallToActionSection";
import FeaturesSection from "@/components/HomePage/FeaturesSection";
import HeroSection from "@/components/HomePage/Hero";
import HowItWorksSection from "@/components/HomePage/HowItWorksSection";
import WhyChooseUsSection from "@/components/HomePage/WhyChooseUsSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <CallToActionSection />
    </main>
  );
};

export default HomePage;
