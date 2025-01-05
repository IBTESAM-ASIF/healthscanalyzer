import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Brain, Leaf, Rocket, Shield, Sparkles } from "lucide-react";

export const Mission = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms decode complex ingredient lists for clear insights"
    },
    {
      icon: Shield,
      title: "Health Protection",
      description: "Identifying potential risks and health impacts in food products"
    },
    {
      icon: Leaf,
      title: "Natural Focus",
      description: "Emphasis on natural ingredients and sustainable choices"
    },
    {
      icon: Rocket,
      title: "Future Ready",
      description: "Continuously evolving with latest food science research"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container relative px-4 md:px-6"
      >
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div 
            {...fadeInUp} 
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold text-purple-300 
                       bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Our Mission
          </motion.div>

          <motion.h2 
            {...fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 
                       tracking-tight leading-tight"
          >
            Revolutionizing Food Health Analysis
          </motion.h2>

          <motion.p 
            {...fadeInUp}
            className="text-lg md:text-xl text-purple-200/70 leading-relaxed max-w-3xl mx-auto"
          >
            We harness state-of-the-art GPT-4 and advanced machine learning technologies to revolutionize food analysis. 
            Our mission is to provide real-time, comprehensive ingredient analysis powered by the latest AI advancements, 
            making complex nutritional information instantly accessible and actionable.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Card className="relative overflow-hidden border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 animate-gradient" />
            <CardContent className="relative p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="h-full border border-purple-500/10 bg-gradient-to-b from-background/50 
                                     to-background/80 backdrop-blur-xl overflow-hidden shadow-lg 
                                     hover:border-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
                        <CardContent className="p-6 flex flex-col items-start space-y-4">
                          <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 
                                        transition-colors duration-300">
                            <Icon className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-purple-100 mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-purple-200/70 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 flex items-center justify-center space-x-4">
                <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full relative animate-pulse">
                    <div className="absolute inset-0 bg-white/20 animate-shimmer -translate-x-full transform-gpu" />
                  </div>
                </div>
                <span className="text-sm font-medium text-purple-200/60">Progress</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};
