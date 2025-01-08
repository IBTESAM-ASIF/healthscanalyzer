import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, AlertTriangle, ShieldAlert } from 'lucide-react';
import { ProductCategory } from '@/types/product';
import { useIsMobile } from '@/hooks/use-mobile';

interface CategoryTabsProps {
  activeCategory: ProductCategory;
  setActiveCategory: (category: ProductCategory) => void;
}

export const CategoryTabs = ({ activeCategory, setActiveCategory }: CategoryTabsProps) => {
  const isMobile = useIsMobile();
  
  const categories = [
    { 
      id: 'healthy' as ProductCategory, 
      label: 'Healthy Products',
      icon: Heart,
      color: 'emerald',
      description: 'Safe and beneficial products',
      gradient: 'from-emerald-500/20 via-emerald-500/10 to-emerald-500/5'
    },
    { 
      id: 'restricted' as ProductCategory, 
      label: 'Restricted Use',
      icon: ShieldAlert,
      color: 'amber',
      description: 'Use with caution',
      gradient: 'from-amber-500/20 via-amber-500/10 to-amber-500/5'
    },
    { 
      id: 'harmful' as ProductCategory, 
      label: 'Harmful Products',
      icon: AlertTriangle,
      color: 'red',
      description: 'Known health risks',
      gradient: 'from-red-500/20 via-red-500/10 to-red-500/5'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <AnimatePresence mode="wait">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  relative p-4 sm:p-5 rounded-xl border-2 transition-all duration-300
                  backdrop-blur-sm
                  ${isActive 
                    ? `bg-gradient-to-br ${category.gradient} border-${category.color}-500/50 shadow-lg shadow-${category.color}-500/10` 
                    : 'bg-gray-900/20 border-gray-800/50 hover:border-gray-700/80'
                  }
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : 0.7
                  }}
                  className="flex flex-col items-center gap-2 text-center"
                  layout
                >
                  <motion.div
                    className={`
                      p-2 rounded-full 
                      ${isActive ? `bg-${category.color}-500/20` : 'bg-gray-800/30'}
                      transition-colors duration-300
                    `}
                    layout
                  >
                    <Icon className={`
                      w-6 h-6 
                      ${isActive ? `text-${category.color}-400` : 'text-gray-400'}
                      transition-colors duration-300
                    `} />
                  </motion.div>
                  
                  <h3 className={`
                    font-semibold text-base sm:text-lg
                    ${isActive ? 'text-white' : 'text-gray-200'}
                    transition-colors duration-300
                  `}>
                    {category.label}
                  </h3>
                  
                  <p className={`
                    text-sm 
                    ${isActive ? `text-${category.color}-200` : 'text-gray-400'}
                    transition-colors duration-300
                    line-clamp-2
                  `}>
                    {category.description}
                  </p>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`
                        absolute bottom-0 left-0 w-full h-1 
                        bg-${category.color}-500/70
                        rounded-b-xl
                      `}
                      transition={{ 
                        type: "spring", 
                        bounce: 0.2, 
                        duration: 0.6 
                      }}
                    />
                  )}
                </motion.div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};