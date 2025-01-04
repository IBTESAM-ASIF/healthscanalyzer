import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HealthCategories } from "@/components/HealthCategories";
import { Mission } from "@/components/Mission";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <Hero />
        <Features />
        <HealthCategories />
        <Mission />
      </div>
    </div>
  );
};

export default Index;