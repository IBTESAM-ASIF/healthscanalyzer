import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-gradient">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-30" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none glow text-gradient">
              Health Harmony
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 font-light max-w-[800px] mx-auto">
              AI-powered food analysis for a healthier tomorrow
            </p>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Using advanced AI to analyze ingredients and empower healthier choices. We make complex food labels simple and transparent.
            </p>
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