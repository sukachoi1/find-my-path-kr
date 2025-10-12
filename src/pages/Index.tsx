import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ExploreSection } from "@/components/ExploreSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <ExploreSection />
    </div>
  );
};

export default Index;
