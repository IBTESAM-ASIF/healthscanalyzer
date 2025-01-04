import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Shield, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] -z-10" />
      <div className="absolute inset-0 bg-gradient-cosmic -z-10" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">
            Automated Health Analysis Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-gradient glow">
            AI-Powered Product Health Analysis
          </h1>

          <p className="max-w-[700px] text-zinc-400 md:text-xl dark:text-zinc-400">
            Instantly analyze food and skincare products for health impacts. 
            Updated every 10 minutes with new product analyses from Amazon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl flex items-center gap-2 text-lg transition-all hover:scale-105"
              onClick={() => document.getElementById('product-explorer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            <div className="glass-effect p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-purple-400" />
                <h3 className="font-semibold text-lg">Real-time Analysis</h3>
              </div>
              <p className="text-zinc-400">Updates every 10 minutes with new product analyses</p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-purple-400" />
                <h3 className="font-semibold text-lg">Health Categories</h3>
              </div>
              <p className="text-zinc-400">Clear classification into Healthy, Restricted, or Harmful</p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-6 h-6 text-purple-400" />
                <h3 className="font-semibold text-lg">Product Database</h3>
              </div>
              <p className="text-zinc-400">Extensive collection of analyzed Amazon products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};