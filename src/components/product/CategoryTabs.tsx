import React from 'react';
import { Sparkles, ShieldAlert, AlertTriangle, Leaf, AlertCircle, Shield, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      gradient: 'from-emerald-500/20 to-emerald-500/5',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
    },
    {
      id: 'restricted',
      label: 'Restricted Use',
      icon: ShieldAlert,
      secondaryIcon: AlertCircle,
      color: 'amber',
      description: 'Moderate consumption advised',
      gradient: 'from-amber-500/20 to-amber-500/5',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)'
    },
    {
      id: 'harmful',
      label: 'Harmful Products',
      icon: AlertTriangle,
      secondaryIcon: Shield,
      color: 'red',
      description: 'Use with caution',
      gradient: 'from-red-500/20 to-red-500/5',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mb-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {categories.map((category) => {
            const Icon = category.icon;
            const SecondaryIcon = category.secondaryIcon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative p-8 rounded-2xl transition-all duration-500",
                  "backdrop-blur-sm border-2",
                  "group overflow-hidden",
                  isActive 
                    ? `bg-gradient-to-br ${category.gradient} border-${category.color}-500/50 shadow-lg shadow-${category.color}-500/10` 
                    : 'bg-background/50 border-border/50 hover:bg-background/80'
                )}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  backgroundImage: isActive ? category.pattern : 'none'
                }}
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ backgroundImage: category.pattern }} />
                
                {/* Content */}
                <div className="relative flex flex-col items-center gap-4 text-center">
                  {/* Icons Container with 3D Effect */}
                  <div className="relative w-16 h-16 mb-2">
                    <motion.div
                      initial={false}
                      animate={{ 
                        scale: isActive ? [1, 1.2, 1] : 1,
                        rotateY: isActive ? 180 : 0,
                        opacity: isActive ? 0 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center transform"
                    >
                      <Icon className={cn(
                        "w-12 h-12 transition-all duration-500",
                        isActive ? `text-${category.color}-400` : 'text-muted-foreground'
                      )} />
                    </motion.div>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        scale: isActive ? 1 : 0.8,
                        rotateY: isActive ? 0 : -180,
                        opacity: isActive ? 1 : 0
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center transform"
                    >
                      <SecondaryIcon className={`w-12 h-12 text-${category.color}-400`} />
                    </motion.div>
                  </div>

                  {/* Title with Gradient Effect */}
                  <h3 className={cn(
                    "text-xl font-bold transition-colors duration-500",
                    isActive 
                      ? `bg-gradient-to-r from-${category.color}-400 to-${category.color}-600 bg-clip-text text-transparent` 
                      : 'text-foreground'
                  )}>
                    {category.label}
                  </h3>

                  {/* Description with Enhanced Typography */}
                  <p className={cn(
                    "text-sm transition-colors duration-500 leading-relaxed",
                    isActive ? `text-${category.color}-400/90` : 'text-muted-foreground'
                  )}>
                    {category.description}
                  </p>

                  {/* Active Indicator */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.8,
                      y: isActive ? 0 : 10
                    }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1"
                  >
                    <Star className={`w-4 h-4 text-${category.color}-500/70`} />
                    <div className={cn(
                      "h-1 w-12 rounded-full",
                      `bg-${category.color}-500/50`
                    )} />
                    <Star className={`w-4 h-4 text-${category.color}-500/70`} />
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};