import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ProductCardProps {
  product: {
    name: string;
    health_score: number;
    ingredients: string[];
    pros: string[];
    cons: string[];
    category: 'healthy' | 'restricted' | 'harmful';
  };
}

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'healthy':
      return {
        icon: Check,
        color: 'emerald',
        gradient: 'from-emerald-500/20 to-emerald-500/5'
      };
    case 'restricted':
      return {
        icon: ShieldAlert,
        color: 'amber',
        gradient: 'from-amber-500/20 to-amber-500/5'
      };
    case 'harmful':
      return {
        icon: AlertTriangle,
        color: 'red',
        gradient: 'from-red-500/20 to-red-500/5'
      };
    default:
      return {
        icon: Check,
        color: 'emerald',
        gradient: 'from-emerald-500/20 to-emerald-500/5'
      };
  }
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const config = getCategoryConfig(product.category);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`
        relative overflow-hidden rounded-xl p-6
        bg-gradient-to-b ${config.gradient}
        border border-${config.color}-500/20
        backdrop-blur-sm
        transition-all duration-300
        hover:border-${config.color}-500/30
        hover:shadow-lg hover:shadow-${config.color}-500/10
      `}
    >
      <div className="absolute top-0 right-0 p-4">
        <Icon className={`w-6 h-6 text-${config.color}-400`} />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2 pr-8">
            {product.name}
          </h3>
          <div className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-sm
            bg-${config.color}-500/20 text-${config.color}-400
          `}>
            Health Score: {product.health_score}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className={`
                  px-2 py-1 rounded-md text-xs
                  bg-${config.color}-500/10
                  text-${config.color}-400
                  border border-${config.color}-500/20
                `}
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-emerald-400 mb-2">Pros:</h4>
            <ul className="space-y-1">
              {product.pros.map((pro, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-red-400 mb-2">Cons:</h4>
            <ul className="space-y-1">
              {product.cons.map((con, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};