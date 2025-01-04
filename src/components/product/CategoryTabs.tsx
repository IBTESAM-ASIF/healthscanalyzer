import React from 'react';
import { Sparkles, ShieldAlert, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

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
      color: 'emerald',
      description: 'Natural and nutritious choices'
    },
    {
      id: 'restricted',
      label: 'Restricted Use',
      icon: ShieldAlert,
      color: 'amber',
      description: 'Moderate consumption advised'
    },
    {
      id: 'harmful',
      label: 'Harmful Products',
      icon: AlertTriangle,
      color: 'red',
      description: 'Use with caution'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-4 rounded-xl transition-all duration-300
                ${isActive ? `bg-${category.color}-500/20 border-${category.color}-500/30` : 'bg-background/50 border-border/50'}
                border backdrop-blur-sm
                hover:bg-${category.color}-500/10 hover:border-${category.color}-500/20
              `}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <Icon className={`w-6 h-6 ${isActive ? `text-${category.color}-400` : 'text-muted-foreground'}`} />
                <h3 className={`font-semibold ${isActive ? `text-${category.color}-400` : 'text-foreground'}`}>
                  {category.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};