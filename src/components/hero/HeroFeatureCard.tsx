import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface HeroFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export const HeroFeatureCard = ({ icon: Icon, title, description, gradient }: HeroFeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group cursor-pointer"
    >
      <div className={`glass-effect rounded-xl p-6 sm:p-8 h-full border border-purple-500/10 
                     bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl 
                     overflow-hidden shadow-lg hover:border-purple-500/30 transition-all duration-300`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative z-10">
          <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 
                        transition-colors duration-300 w-14 h-14 mx-auto flex items-center justify-center mb-4">
            <Icon className="w-7 h-7 text-purple-400 group-hover:scale-110 
                         transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-purple-100 mb-2 
                       group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-purple-200/70 text-sm leading-relaxed 
                      group-hover:text-purple-100/90 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};