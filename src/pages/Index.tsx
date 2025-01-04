import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HealthCategories } from "@/components/HealthCategories";
import { Mission } from "@/components/Mission";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <HealthCategories />
      <Mission />
    </div>
  );
};

export default Index;