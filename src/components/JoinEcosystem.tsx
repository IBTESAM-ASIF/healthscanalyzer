import { User, Shield, Share2 } from "lucide-react";
import { Button } from "./ui/button";

export const JoinEcosystem = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background/95 to-background/90 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-cosmic opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full mb-6">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-purple-200/90">Join Our Community</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 animate-gradient">
            Join Our Ecosystem
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be part of our revolutionary platform that's transforming food health analysis
            through advanced AI technology and community-driven insights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <User className="size-8" />,
              title: "Community Driven",
              description: "Join a growing community of health-conscious individuals shaping the future of food analysis",
              iconBg: "bg-blue-500/20",
              iconColor: "text-blue-400",
            },
            {
              icon: <Shield className="size-8" />,
              title: "Secure Platform",
              description: "Advanced security measures ensuring your data and transactions are always protected",
              iconBg: "bg-purple-500/20",
              iconColor: "text-purple-400",
            },
            {
              icon: <Share2 className="size-8" />,
              title: "Token Utility",
              description: "Access premium features and contribute to platform governance through token ownership",
              iconBg: "bg-orange-500/20",
              iconColor: "text-orange-400",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 hover-lift border border-purple-500/10 group transition-all duration-300 hover:border-purple-500/30"
            >
              <div className={`${feature.iconBg} ${feature.iconColor} size-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-purple-100/90 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2 text-lg font-medium">
              Join Waitlist
              <svg 
                className="size-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Early access coming soon. Be the first to know!
          </p>
        </div>
      </div>
    </section>
  );
};