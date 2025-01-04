import { Brain, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI algorithms provide real-time ingredient analysis, helping you make informed decisions about product safety and health impacts.",
      gradient: "from-purple-500/20 via-violet-500/20 to-indigo-500/20",
      iconClass: "text-purple-400",
      borderGlow: "group-hover:shadow-purple-500/25",
    },
    {
      icon: Shield,
      title: "Health Score Rating",
      description:
        "Each product receives a comprehensive health score based on multiple factors including ingredients, certifications, and scientific research.",
      gradient: "from-violet-500/20 via-fuchsia-500/20 to-purple-500/20",
      iconClass: "text-violet-400",
      borderGlow: "group-hover:shadow-violet-500/25",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get immediate insights about your food choices with our lightning-fast analysis system powered by cutting-edge technology.",
      gradient: "from-fuchsia-500/20 via-purple-500/20 to-violet-500/20",
      iconClass: "text-fuchsia-400",
      borderGlow: "group-hover:shadow-fuchsia-500/25",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] -z-10" />
      <div className="absolute inset-0 bg-gradient-cosmic -z-10" />

      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-sm font-medium tracking-wider text-purple-400 uppercase animate-fade-in">
            Features & Benefits
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 animate-fade-in-up">
            How It Works
          </h3>
          <p className="max-w-[900px] text-zinc-400 md:text-lg lg:text-xl animate-fade-in">
            Discover how our platform helps you make better health decisions through advanced
            AI analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className={`group relative hover:scale-105 transition-all duration-300 overflow-hidden border-0 
                bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl 
                hover:shadow-2xl ${feature.borderGlow} animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/90 to-background/95" />
                <CardContent className="relative flex flex-col items-center text-center p-8 space-y-6 h-full">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-b from-background/50 to-background/80 
                    backdrop-blur-xl border border-purple-500/20 ${feature.iconClass} 
                    group-hover:scale-110 transition-transform duration-300 
                    group-hover:border-purple-500/40 shadow-lg`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-400">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 via-violet-500/50 to-fuchsia-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};