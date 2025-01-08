import { Brain, Shield, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { HeroFeatureCard } from "./hero/HeroFeatureCard";
import { HeroTimer } from "./hero/HeroTimer";
import { HeroButtons } from "./hero/HeroButtons";
import { scrollToSection } from "./navbar/NavMenuItems";
import { Button } from "./ui/button";

export const Hero = () => {
  const handleLearnMore = () => {
    scrollToSection('features');
  };

  const handleViewProducts = () => {
    scrollToSection('product-explorer');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Advanced ingredient scanning with real-time results",
      gradient: "from-pink-500/20 to-purple-500/20",
    },
    {
      icon: Shield,
      title: "Health Score",
      description: "Comprehensive safety ratings and analysis",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Sparkles,
      title: "Real-time Results",
      description: "Instant health insights and recommendations",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Zap,
      title: "Smart Alerts",
      description: "Proactive notifications about health risks",
      gradient: "from-orange-500/20 to-amber-500/20",
    },
  ];

  return (
    <section id="hero" className="min-h-[90vh] flex items-center justify-center py-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-violet-500/5 to-background/90" />
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="h-full w-full bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-background/5 blur-3xl" />
        </div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container relative z-10 mx-auto max-w-6xl px-4"
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect px-3 py-1.5 rounded-full transform hover:scale-105 transition-all duration-300 border border-purple-500/20 group cursor-pointer"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-purple-200/90">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              Coming soon $HSAI Token
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 max-w-3xl text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter animate-fade-in">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 animate-gradient">
                HEALTH SCANALYZER
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl md:text-3xl text-purple-300/90 font-light">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500/90 animate-float" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                AI-Powered Food Analysis
              </span>
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500/90 animate-float" />
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg sm:text-xl md:text-2xl text-purple-200/80 max-w-2xl leading-relaxed font-light text-center"
          >
            Discover the truth about your food with our advanced AI-powered ingredient analysis system. 
            Making healthy choices has never been easier with{" "}
            <span className="text-blue-400/90 font-medium">real-time insights</span> and{" "}
            <span className="text-green-400/90 font-medium">comprehensive health scores</span>.
          </motion.p>

          <HeroButtons onLearnMore={handleLearnMore} onViewProducts={handleViewProducts} />
          <HeroTimer />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-6xl mt-6"
          >
            {features.map((feature, index) => (
              <HeroFeatureCard key={index} {...feature} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};