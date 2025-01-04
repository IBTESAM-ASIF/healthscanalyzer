import { Brain, Shield, Zap, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

export const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI algorithms provide real-time ingredient analysis, helping you make informed decisions about product safety and health impacts.",
      gradient: "from-violet-500/20 via-purple-500/20 to-indigo-500/20",
      iconClass: "text-violet-500",
      benefits: ["Real-time processing", "Deep learning models", "Accurate results"],
    },
    {
      icon: Shield,
      title: "Health Score Rating",
      description:
        "Each product receives a comprehensive health score based on multiple factors including ingredients, certifications, and scientific research.",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      iconClass: "text-emerald-500",
      benefits: ["Comprehensive scoring", "Scientific backing", "Clear indicators"],
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get immediate insights about your food choices with our lightning-fast analysis system powered by cutting-edge technology.",
      gradient: "from-amber-500/20 via-orange-500/20 to-yellow-500/20",
      iconClass: "text-amber-500",
      benefits: ["Quick analysis", "Instant feedback", "Easy to understand"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80 -z-10" />
      <div className="absolute inset-0 bg-gradient-cosmic opacity-30 -z-10" />

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium tracking-wider uppercase">
            Features & Benefits
            <Star className="w-4 h-4 ml-2 animate-pulse" />
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
            How It Works
          </h2>
          
          <p className="max-w-[900px] text-zinc-400 md:text-lg lg:text-xl">
            Discover how our platform helps you make better health decisions through advanced
            AI analysis and real-time insights
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative group h-full hover:scale-105 transition-transform duration-300 border-0 bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <CardContent className="relative flex flex-col items-center text-center p-8 space-y-6 h-full">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl border border-purple-500/20 ${feature.iconClass} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-200">
                        {feature.title}
                      </h3>
                      
                      <p className="text-zinc-400 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <ul className="space-y-3 pt-4">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-zinc-300">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-6">
                      <button className="group/btn inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};