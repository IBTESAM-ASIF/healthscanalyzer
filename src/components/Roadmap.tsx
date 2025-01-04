import { Milestone, Calendar, Rocket, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";

export const Roadmap = () => {
  const milestones = [
    {
      quarter: "Q3 2024",
      title: "Development Phase",
      description: "Initial development of AI-powered food analysis system and health scoring algorithm",
      icon: <Milestone className="w-6 h-6 text-purple-400" />,
    },
    {
      quarter: "Q4 2024",
      title: "Beta Testing",
      description: "Private beta launch with selected users and comprehensive product database development",
      icon: <Calendar className="w-6 h-6 text-blue-400" />,
    },
    {
      quarter: "Q1 2025",
      title: "Official Launch",
      description: "Public launch of HealthScanalyzer platform with complete feature set and Solana token integration",
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
    },
  ];

  return (
    <section id="roadmap" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-cosmic opacity-30" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Project Roadmap
          </h2>
          <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
            Our journey to revolutionize food safety and health analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {milestones.map((milestone, index) => (
            <Card
              key={milestone.quarter}
              className="glass-effect p-6 hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4">
                {milestone.icon}
              </div>
              
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                  {milestone.quarter}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors">
                {milestone.title}
              </h3>
              
              <p className="text-purple-200/70 text-sm leading-relaxed">
                {milestone.description}
              </p>

              {index < milestones.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary/50" />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block glass-effect p-6 hover-lift">
            <h4 className="text-lg font-semibold mb-2 text-primary">Token Launch</h4>
            <p className="text-purple-200/70 text-sm">
              Native Solana-based token enabling governance and rewards within the HealthScanalyzer ecosystem
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};