import { AlertOctagon, BarChart2, Clock, Heart, Brain, Shield, Database, Leaf } from "lucide-react";

export const HealthAnalysis = () => {
  const topFeatures = [
    {
      icon: AlertOctagon,
      title: "2024 Impact",
      description: "Comprehensive research identified critical food safety concerns affecting millions",
      color: "bg-red-500/20",
      iconColor: "text-red-500"
    },
    {
      icon: BarChart2,
      title: "Consumer Trust",
      description: "40% of consumers encountered questionable ingredients in 2024",
      color: "bg-blue-500/20",
      iconColor: "text-blue-500"
    },
    {
      icon: Clock,
      title: "Real-time Analysis",
      description: "Instant ingredient scanning and health risk assessment",
      color: "bg-green-500/20",
      iconColor: "text-green-500"
    },
    {
      icon: Heart,
      title: "Health Focus",
      description: "Prioritizing consumer well-being through advanced analysis",
      color: "bg-pink-500/20",
      iconColor: "text-pink-500"
    }
  ];

  const bottomFeatures = [
    {
      icon: Brain,
      title: "AI Analysis",
      description: "State-of-the-art 2024 AI technology automatically scans product labels, reviewing ingredients for potential health risks, allergens, and controversial chemicals.",
      color: "bg-purple-500/20",
      iconColor: "text-purple-500"
    },
    {
      icon: Shield,
      title: "Health Protection",
      description: "Advanced algorithms identify ingredients linked to health risks, backed by latest 2024 medical research.",
      color: "bg-orange-500/20",
      iconColor: "text-orange-500"
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description: "Real-time access to 2024's most current scientific research for accurate ingredient safety assessment.",
      color: "bg-teal-500/20",
      iconColor: "text-teal-500"
    },
    {
      icon: Leaf,
      title: "Natural Focus",
      description: "Emphasis on identifying natural, beneficial ingredients while flagging synthetic concerns.",
      color: "bg-emerald-500/20",
      iconColor: "text-emerald-500"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-purple-400 bg-purple-950/40 rounded-full">
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 text-transparent bg-clip-text">
            Revolutionizing Food Health Analysis
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            In today's complex food landscape, consumers face overwhelming choices with potential health impacts. 
            Our latest 2024 research revealed multiple high-profile food recalls affecting millions worldwide due to undisclosed allergens and contamination.
          </p>
        </div>

        {/* Top Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {topFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
                <div className={`
                  relative p-8 rounded-xl backdrop-blur-sm 
                  bg-gray-900/60 border border-gray-800
                  transition-all duration-300 
                  hover:border-gray-700 hover:bg-gray-900/80
                  flex flex-col items-center text-center gap-4
                  h-full
                `}>
                  <div className={`${feature.color} p-4 rounded-lg`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {bottomFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
                <div className={`
                  relative p-8 rounded-xl backdrop-blur-sm 
                  bg-gray-900/60 border border-gray-800
                  transition-all duration-300 
                  hover:border-gray-700 hover:bg-gray-900/80
                  flex items-start gap-6
                  h-full
                `}>
                  <div className={`${feature.color} p-4 rounded-lg flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
