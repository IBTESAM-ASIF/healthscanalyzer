import { Button } from "./ui/button";
import { ArrowDown, Star } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Enhanced Grid Background with Fade Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-cosmic opacity-30" />
      </div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="glass-effect px-6 py-2 rounded-full transform hover:scale-105 transition-transform duration-300 border border-purple-500/20">
            <span className="flex items-center gap-3 text-sm font-medium text-purple-200/90">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
              Launching Q1 2025
              <span className="bg-primary/20 text-primary px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide">
                Coming Soon
              </span>
            </span>
          </div>

          {/* Enhanced Main Title with Dynamic Gradient */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter glow animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 animate-gradient">
                Health Harmony
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl text-purple-300/90 font-light">
              <span className="text-pink-500/90">🧠</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                AI-Powered Food Analysis
              </span>
              <span className="text-purple-500/90">🛡️</span>
            </div>
          </div>

          {/* Enhanced Description with Better Typography */}
          <p className="text-xl md:text-2xl text-purple-200/80 max-w-3xl leading-relaxed font-light">
            Discover the truth about your food with our advanced AI-powered ingredient analysis system. 
            Making healthy choices has never been easier with{" "}
            <span className="text-blue-400/90 font-medium">real-time insights</span> and{" "}
            <span className="text-green-400/90 font-medium">comprehensive health scores</span>.
          </p>

          {/* Enhanced CTA Buttons with Better Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2 text-lg font-medium">
                Learn More
                <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              className="bg-background/20 backdrop-blur-sm border border-purple-500/30 hover:bg-background/30 text-white px-8 py-6 rounded-full group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2 text-lg font-medium">
                View Products
                <Star className="ml-2 h-5 w-5 transition-transform group-hover:rotate-45" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Enhanced Timer with Better Visual Feedback */}
          <div className="text-purple-200/70 text-sm mt-8 glass-effect px-6 py-2 rounded-full">
            <span className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-medium">Next product analysis in: </span>
              <span className="text-primary font-mono">2:07</span>
            </span>
          </div>

          {/* Enhanced Feature Cards with Better Visual Hierarchy */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl mt-12">
            {[
              {
                icon: "🧠",
                title: "AI Analysis",
                description: "Advanced ingredient scanning with real-time results",
                bgColor: "from-pink-500/20 to-purple-500/20",
              },
              {
                icon: "🛡️",
                title: "Health Score",
                description: "Comprehensive safety ratings and analysis",
                bgColor: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: "🚀",
                title: "Real-time Results",
                description: "Instant health insights and recommendations",
                bgColor: "from-green-500/20 to-emerald-500/20",
              },
              {
                icon: "⚡",
                title: "Smart Alerts",
                description: "Proactive notifications about health risks",
                bgColor: "from-orange-500/20 to-amber-500/20",
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-effect rounded-xl p-8 hover-lift border border-purple-500/10 group transition-all duration-300 hover:border-purple-500/30 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-white/5 backdrop-blur-sm border border-white/10">
                    <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200/70 text-sm leading-relaxed group-hover:text-purple-100/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
