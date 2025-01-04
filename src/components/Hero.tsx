import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient py-24">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-30" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl/none glow text-gradient">
              Health Harmony
            </h1>
            <p className="text-xl md:text-2xl text-purple-200/90 font-light max-w-[800px] mx-auto">
              AI-powered food analysis for a healthier tomorrow
            </p>
            <p className="mx-auto max-w-[700px] text-purple-200/70 md:text-lg">
              Using advanced AI to analyze ingredients and empower healthier choices. We make complex food labels simple and transparent.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
            <div className="glass-effect rounded-xl p-6 hover-lift">
              <div className="text-primary text-2xl font-bold mb-2">1.2K+</div>
              <div className="text-purple-200/70 text-sm">Products Analyzed</div>
            </div>
            <div className="glass-effect rounded-xl p-6 hover-lift">
              <div className="text-primary text-2xl font-bold mb-2">98%</div>
              <div className="text-purple-200/70 text-sm">Accuracy Rate</div>
            </div>
            <div className="glass-effect rounded-xl p-6 hover-lift">
              <div className="text-primary text-2xl font-bold mb-2">24/7</div>
              <div className="text-purple-200/70 text-sm">Analysis Running</div>
            </div>
            <div className="glass-effect rounded-xl p-6 hover-lift">
              <div className="text-primary text-2xl font-bold mb-2">500+</div>
              <div className="text-purple-200/70 text-sm">Daily Updates</div>
            </div>
          </div>
          <div className="space-x-4">
            <Button className="group bg-primary/20 hover:bg-primary/30 text-primary-foreground border border-primary/30">
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};