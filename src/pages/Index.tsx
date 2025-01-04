import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import Navbar from "@/components/Navbar";
import Statistics from "@/components/Statistics";
import { HealthAnalysis } from "@/components/HealthAnalysis";
import ProductHealthAnalysis from "@/components/ProductHealthAnalysis";
import ProductExplorer from "@/components/ProductExplorer";
import { Roadmap } from "@/components/Roadmap";
import { FAQ } from "@/components/FAQ";
import { JoinEcosystem } from "@/components/JoinEcosystem";

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
        <Roadmap />
        <FAQ />
        <JoinEcosystem />
      </div>
    </div>
  );
};

export default Index;