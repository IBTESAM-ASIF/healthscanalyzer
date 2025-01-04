import { User, Shield, Share2 } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";

export const JoinEcosystem = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background/95 to-background/90 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-cosmic opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full mb-4">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-purple-200/90">Join Our Community</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 animate-gradient">
            Join Our Ecosystem
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be part of our revolutionary platform that's transforming food health analysis
            through advanced AI technology and community-driven insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
              className="glass-effect rounded-2xl p-6 hover-lift border border-purple-500/10 group transition-all duration-300 hover:border-purple-500/30"
            >
              <div className={`${feature.iconBg} ${feature.iconColor} size-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-purple-100/90 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <WaitlistForm />
          <p className="mt-3 text-sm text-muted-foreground">
            Early access coming soon. Be the first to know!
          </p>
        </div>
      </div>
    </section>
  );
};