import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, ShieldAlert, Brain } from 'lucide-react';

interface ProductCardProps {
  product: {
    name: string;
    health_score: number;
    ingredients: string[];
    pros: string[];
    cons: string[];
    category: 'healthy' | 'restricted' | 'harmful';
    analysis_summary?: string;
  };
}

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'healthy':
      return {
        icon: Check,
        color: 'emerald',
        gradient: 'from-emerald-500/20 to-emerald-500/5',
        borderHover: 'hover:border-emerald-500/30',
        iconBg: 'bg-emerald-500/20',
        scoreColor: 'text-emerald-400',
        accuracy: 98.5
      };
    case 'restricted':
      return {
        icon: ShieldAlert,
        color: 'amber',
        gradient: 'from-amber-500/20 to-amber-500/5',
        borderHover: 'hover:border-amber-500/30',
        iconBg: 'bg-amber-500/20',
        scoreColor: 'text-amber-400',
        accuracy: 97.2
      };
    case 'harmful':
      return {
        icon: AlertTriangle,
        color: 'red',
        gradient: 'from-red-500/20 to-red-500/5',
        borderHover: 'hover:border-red-500/30',
        iconBg: 'bg-red-500/20',
        scoreColor: 'text-red-400',
        accuracy: 99.1
      };
    default:
      return {
        icon: Check,
        color: 'emerald',
        gradient: 'from-emerald-500/20 to-emerald-500/5',
        borderHover: 'hover:border-emerald-500/30',
        iconBg: 'bg-emerald-500/20',
        scoreColor: 'text-emerald-400',
        accuracy: 98.5
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
        relative overflow-hidden rounded-xl p-8
        bg-gradient-to-b ${config.gradient}
        border border-${config.color}-500/20
        backdrop-blur-sm
        transition-all duration-300
        ${config.borderHover}
        hover:shadow-lg hover:shadow-${config.color}-500/10
        min-h-[500px]
      `}
    >
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <div className={`${config.iconBg} p-2.5 rounded-full`}>
          <Icon className={`w-6 h-6 text-${config.color}-400`} />
        </div>
        <div className={`${config.iconBg} p-2.5 rounded-full`}>
          <Brain className={`w-6 h-6 text-${config.color}-400`} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-3 pr-24">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <div className={`
              inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium
              ${config.iconBg} ${config.scoreColor}
            `}>
              Health Score: {product.health_score}
            </div>
            <div className={`
              inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium
              bg-primary/10 text-primary
            `}>
              AI Accuracy: {config.accuracy}%
            </div>
          </div>
        </div>

        {product.analysis_summary && (
          <p className="text-sm text-muted-foreground">
            {product.analysis_summary}
          </p>
        )}

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className={`
                  px-3 py-1.5 rounded-md text-sm
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-emerald-400 mb-3">Benefits:</h4>
            <ul className="space-y-2">
              {product.pros.map((pro, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-red-400 mb-3">Concerns:</h4>
            <ul className="space-y-2">
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