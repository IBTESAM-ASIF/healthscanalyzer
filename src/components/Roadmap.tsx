import { Rocket, Star, Infinity, Sun } from "lucide-react";
import { Card } from "./ui/card";

export const Roadmap = () => {
  const milestones = [
    {
      quarter: "Q4 2024",
      title: "R&D and Development Phase",
      description: "Initial research and development of cutting-edge AI algorithms for food analysis. Building core infrastructure and establishing partnerships with food industry leaders.",
      features: [
        "AI Algorithm Development",
        "Core Infrastructure Setup",
        "Industry Partnerships",
        "Initial Testing Phase"
      ],
      icon: <Star className="w-8 h-8 text-purple-400 animate-pulse" />,
    },
    {
      quarter: "Q1 2025",
      title: "Platform Launch & Token Integration",
      description: "Official launch of HealthScanalyzer platform and native Solana token. Introducing revolutionary health scoring system and comprehensive product analysis.",
      features: [
        "Platform Launch",
        "Solana Token Launch",
        "Health Scoring System",
        "Mobile App Beta"
      ],
      icon: <Rocket className="w-8 h-8 text-pink-400 animate-float" />,
    },
    {
      quarter: "Q2 2025",
      title: "Ecosystem Expansion",
      description: "Expanding platform capabilities with advanced features and global partnerships. Integration with major food retailers and health platforms.",
      features: [
        "Global Partnership Network",
        "Advanced Analytics Suite",
        "Community Governance",
        "Retail Integration"
      ],
      icon: <Infinity className="w-8 h-8 text-blue-400 animate-pulse" />,
    },
    {
      quarter: "Q3 2025",
      title: "Global Innovation Hub",
      description: "Transforming into a global hub for health innovation. Launching decentralized governance and advanced AI features.",
      features: [
        "Decentralized Governance",
        "Advanced AI Features",
        "Global Health Index",
        "Research Partnerships"
      ],
      icon: <Sun className="w-8 h-8 text-yellow-400 animate-spin-slow" />,
    }
  ];

  return (
    <section id="roadmap" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
        <div className="absolute inset-0 cosmic-purple-gradient opacity-40" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient">
            Vision & Roadmap
          </h2>
          <p className="text-xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed">
            Pioneering the future of health analysis through revolutionary technology and innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          {milestones.map((milestone, index) => (
            <Card
              key={milestone.quarter}
              className="glass-effect p-8 hover-lift relative overflow-hidden group border border-purple-500/20"
            >
              <div className="absolute top-4 right-4 animate-float">
                {milestone.icon}
              </div>
              
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30">
                  {milestone.quarter}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                {milestone.title}
              </h3>
              
              <p className="text-purple-200/70 text-sm leading-relaxed mb-6">
                {milestone.description}
              </p>

              <ul className="space-y-2">
                {milestone.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-purple-200/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Card className="inline-block glass-effect p-8 hover-lift max-w-2xl mx-auto border border-purple-500/20">
            <h4 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Revolutionary Token Economics
            </h4>
            <p className="text-purple-200/70 text-lg leading-relaxed">
              Native Solana-based token powering the future of health analysis. Enabling community governance, rewards, and ecosystem growth through innovative tokenomics.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
