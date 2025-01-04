import { Button } from "./ui/button";
import { ArrowDown, Star, Sparkles, Zap, Shield, Brain } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState('10:00');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const nextCycleMinutes = 10 - (minutes % 10);
      const nextCycleSeconds = 60 - seconds;
      
      if (nextCycleMinutes === 10 && nextCycleSeconds === 60) {
        setTimeLeft('10:00');
      } else {
        const displayMinutes = nextCycleMinutes - (nextCycleSeconds === 60 ? 0 : 1);
        const displaySeconds = nextCycleSeconds === 60 ? 0 : nextCycleSeconds;
        setTimeLeft(`${displayMinutes}:${displaySeconds.toString().padStart(2, '0')}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProducts = () => {
    const productsSection = document.getElementById('product-explorer');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Enhanced Background Effects */}
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
        className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl"
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Enhanced Launch Badge */}
          <motion.div 
            variants={itemVariants}
            className="glass-effect px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 border border-purple-500/20 group cursor-pointer"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-purple-200/90">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              Launching Q1 2025
              <span className="bg-primary/20 text-primary px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide group-hover:bg-primary/30 transition-colors">
                Coming Soon
              </span>
            </span>
          </motion.div>

          {/* Enhanced Main Title */}
          <motion.div variants={itemVariants} className="space-y-6 max-w-4xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-fade-in">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 animate-gradient pb-2">
                HEALTH SCANALYZER
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl text-purple-300/90 font-light">
              <Brain className="w-8 h-8 text-pink-500/90 animate-float" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                AI-Powered Food Analysis
              </span>
              <Shield className="w-8 h-8 text-purple-500/90 animate-float" />
            </div>
          </motion.div>

          {/* Enhanced Description */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-purple-200/80 max-w-3xl leading-relaxed font-light"
          >
            Discover the truth about your food with our advanced AI-powered ingredient analysis system. 
            Making healthy choices has never been easier with{" "}
            <span className="text-blue-400/90 font-medium">real-time insights</span> and{" "}
            <span className="text-green-400/90 font-medium">comprehensive health scores</span>.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 mt-12"
          >
            <Button 
              variant="default"
              size="lg"
              className="rounded-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all duration-300"
              onClick={handleLearnMore}
            >
              <span className="relative z-10 flex items-center gap-2 text-lg font-medium">
                Learn More
                <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </span>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full group relative overflow-hidden border-purple-500/50 hover:border-purple-500 transition-all duration-300"
              onClick={handleViewProducts}
            >
              <span className="relative z-10 flex items-center gap-2 text-lg font-medium group-hover:text-purple-200">
                View Products
                <Star className="ml-2 h-5 w-5 transition-transform group-hover:rotate-45" />
              </span>
            </Button>
          </motion.div>

          {/* Enhanced Timer */}
          <motion.div 
            variants={itemVariants}
            className="text-purple-200/70 text-sm mt-8 glass-effect px-6 py-2 rounded-full"
          >
            <span className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-medium">Next product analysis in: </span>
              <span className="text-primary font-mono">{timeLeft}</span>
            </span>
          </motion.div>

          {/* Enhanced Feature Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl mt-12"
          >
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
              >
                <div className="glass-effect rounded-xl p-8 h-full border border-purple-500/10 
                               bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl 
                               overflow-hidden shadow-lg hover:border-purple-500/30 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 
                                 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 
                                  transition-colors duration-300 w-16 h-16 mx-auto flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-purple-400 group-hover:scale-110 
                                             transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-100 mb-3 
                                 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-purple-200/70 text-sm leading-relaxed 
                                group-hover:text-purple-100/90 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex items-center justify-center space-x-4"
          >
            <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500/20 to-violet-500/20 
                           rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-purple-400 to-violet-400 
                            rounded-full relative animate-pulse">
                <div className="absolute inset-0 bg-white/20 animate-shimmer -translate-x-full transform-gpu" />
              </div>
            </div>
            <span className="text-sm font-medium text-purple-200/60">Progress</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};