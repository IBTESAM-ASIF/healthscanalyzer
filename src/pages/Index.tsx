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
import { LogoGenerator } from "@/components/LogoGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <main className="relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
        <Hero />
        <Statistics />
        <Features />
        <HealthAnalysis />
        <ProductHealthAnalysis />
        <ProductExplorer />
        <LogoGenerator />
        <Roadmap />
        <FAQ />
        <JoinEcosystem />
      </main>
    </div>
  );
};

export default Index;