import React from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, ShieldAlert } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, setActiveCategory }: CategoryTabsProps) => {
  const categories = [
    { 
      id: 'healthy', 
      label: 'Healthy Products',
      icon: Heart,
      color: 'emerald',
      description: 'Safe and beneficial products'
    },
    { 
      id: 'restricted', 
      label: 'Restricted Use',
      icon: ShieldAlert,
      color: 'amber',
      description: 'Use with caution'
    },
    { 
      id: 'harmful', 
      label: 'Harmful Products',
      icon: AlertTriangle,
      color: 'red',
      description: 'Known health risks'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                ${isActive 
                  ? `bg-${category.color}-500/10 border-${category.color}-500/50` 
                  : 'bg-gray-900/20 border-gray-800/50 hover:border-gray-700/80'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.7
                }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <Icon className={`w-6 h-6 text-${category.color}-500`} />
                <h3 className="font-semibold text-white">{category.label}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0 left-0 w-full h-1 bg-${category.color}-500 rounded-b-xl`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};