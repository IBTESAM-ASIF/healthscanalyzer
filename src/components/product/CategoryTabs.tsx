import React from 'react';
import { Sparkles, ShieldAlert, AlertTriangle, Leaf, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, setActiveCategory }: CategoryTabsProps) => {
  const categories = [
    {
      id: 'healthy',
      label: 'Healthy Products',
      icon: Sparkles,
      secondaryIcon: Leaf,
      color: 'emerald',
      description: 'Natural and nutritious choices',
      gradient: 'from-emerald-500/20 to-emerald-500/5'
    },
    {
      id: 'restricted',
      label: 'Restricted Use',
      icon: ShieldAlert,
      secondaryIcon: AlertCircle,
      color: 'amber',
      description: 'Moderate consumption advised',
      gradient: 'from-amber-500/20 to-amber-500/5'
    },
    {
      id: 'harmful',
      label: 'Harmful Products',
      icon: AlertTriangle,
      secondaryIcon: Shield,
      color: 'red',
      description: 'Use with caution',
      gradient: 'from-red-500/20 to-red-500/5'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const SecondaryIcon = category.secondaryIcon;
          const isActive = activeCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative p-6 rounded-xl transition-all duration-300",
                "backdrop-blur-sm border",
                "hover:shadow-lg hover:shadow-primary/5",
                isActive ? `bg-gradient-to-br ${category.gradient} border-${category.color}-500/30` 
                        : 'bg-background/50 border-border/50 hover:bg-background/80',
                "group overflow-hidden"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-white/5 opacity-10" />
              
              {/* Content */}
              <div className="relative flex flex-col items-center gap-3 text-center">
                {/* Icons Container */}
                <div className="relative w-12 h-12">
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 0 : 1
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Icon className={cn(
                      "w-8 h-8 transition-colors duration-300",
                      isActive ? `text-${category.color}-400` : 'text-muted-foreground'
                    )} />
                  </motion.div>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 1 : 0
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <SecondaryIcon className={`w-8 h-8 text-${category.color}-400`} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className={cn(
                  "font-semibold text-lg transition-colors duration-300",
                  isActive ? `text-${category.color}-400` : 'text-foreground'
                )}>
                  {category.label}
                </h3>

                {/* Description */}
                <p className={cn(
                  "text-sm transition-colors duration-300",
                  isActive ? `text-${category.color}-400/80` : 'text-muted-foreground'
                )}>
                  {category.description}
                </p>

                {/* Active Indicator */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.8
                  }}
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full",
                    `bg-${category.color}-500/50`
                  )}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};