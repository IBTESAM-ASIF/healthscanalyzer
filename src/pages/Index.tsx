import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HealthCategories } from "@/components/HealthCategories";
import { Mission } from "@/components/Mission";
import Navbar from "@/components/Navbar";
import Statistics from "@/components/Statistics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Statistics />
        <Features />
        <HealthCategories />
        <Mission />
      </div>
    </div>
  );
};

export default Index;