import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Discover the Truth About Your Food
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Using AI to analyze ingredients and empower healthier choices. We make complex food labels simple and transparent.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="group">
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};