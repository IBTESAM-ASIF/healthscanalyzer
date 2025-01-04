import { Brain, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI algorithms provide real-time ingredient analysis, helping you make informed decisions about product safety and health impacts.",
      gradient: "from-blue-500/20 to-indigo-500/20",
      iconClass: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Health Score Rating",
      description:
        "Each product receives a comprehensive health score based on multiple factors including ingredients, certifications, and scientific research.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconClass: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get immediate insights about your food choices with our lightning-fast analysis system powered by cutting-edge technology.",
      gradient: "from-red-500/20 to-pink-500/20",
      iconClass: "text-red-500",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] -z-10" />
      <div className="absolute inset-0 bg-gradient-cosmic -z-10" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-sm font-medium tracking-wider text-purple-400 uppercase">
            Features & Benefits
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            How It Works
          </h3>
          <p className="max-w-[900px] text-zinc-400 md:text-lg">
            Discover how our platform helps you make better health decisions through advanced
            AI analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="relative group hover-lift overflow-hidden border-0 bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <CardContent className="relative flex flex-col items-center text-center p-6 space-y-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl border border-purple-500/20 ${feature.iconClass}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    {feature.title}
                    <span className="text-purple-400">✨</span>
                  </h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};