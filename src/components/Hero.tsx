import { Button } from "./ui/button";
import { ArrowDown, Star } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-30" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Launch Badge */}
          <div className="glass-effect px-4 py-2 rounded-full">
            <span className="flex items-center gap-2 text-sm text-purple-200/90">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Launching Q1 2025
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">Coming Soon</span>
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter glow text-gradient">
              Health Harmony
            </h1>
            <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl text-purple-400">
              <span className="text-pink-500">🧠</span>
              AI-Powered Food Analysis
              <span className="text-purple-500">🛡️</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-purple-200/90 max-w-[800px]">
            Discover the truth about your food with our advanced AI-powered ingredient analysis system. 
            Making healthy choices has never been easier with{" "}
            <span className="text-blue-400">real-time insights</span> and{" "}
            <span className="text-green-400">comprehensive health scores</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full group"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button 
              className="bg-background/20 backdrop-blur-sm border border-purple-500/30 hover:bg-background/30 text-white px-8 py-6 rounded-full group"
            >
              View Products
              <Star className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          </div>

          {/* Timer */}
          <div className="text-purple-200/70 text-sm mt-8">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Next product analysis in: 2:07
            </span>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl mt-16">
            <div className="glass-effect rounded-xl p-6 hover-lift border border-purple-500/10">
              <div className="bg-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Analysis</h3>
              <p className="text-purple-200/70 text-sm">Advanced ingredient scanning with real-time results</p>
            </div>
            <div className="glass-effect rounded-xl p-6 hover-lift border border-purple-500/10">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Health Score</h3>
              <p className="text-purple-200/70 text-sm">Comprehensive safety ratings and analysis</p>
            </div>
            <div className="glass-effect rounded-xl p-6 hover-lift border border-purple-500/10">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Results</h3>
              <p className="text-purple-200/70 text-sm">Instant health insights and recommendations</p>
            </div>
            <div className="glass-effect rounded-xl p-6 hover-lift border border-purple-500/10">
              <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Alerts</h3>
              <p className="text-purple-200/70 text-sm">Proactive notifications about health risks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};