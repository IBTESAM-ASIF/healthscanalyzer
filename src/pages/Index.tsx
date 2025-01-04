import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import Navbar from "@/components/Navbar";
import Statistics from "@/components/Statistics";
import { HealthAnalysis } from "@/components/HealthAnalysis";
import ProductHealthAnalysis from "@/components/ProductHealthAnalysis";
import ProductExplorer from "@/components/ProductExplorer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Statistics />
        <Features />
        <HealthAnalysis />
        <ProductHealthAnalysis />
        <ProductExplorer />
      </div>
    </div>
  );
};

export default Index;