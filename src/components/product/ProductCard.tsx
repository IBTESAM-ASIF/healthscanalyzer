import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, ShieldAlert, Brain, Skull, AlertOctagon } from 'lucide-react';

interface ProductCardProps {
  product: {
    name: string;
    health_score: number;
    ingredients: string[];
    pros: string[];
    cons: string[];
    category: 'healthy' | 'restricted' | 'harmful';
    analysis_summary?: string;
    has_fatal_incidents?: boolean;
    has_serious_adverse_events?: boolean;
    allergy_risks?: string[];
    drug_interactions?: string[];
    special_population_warnings?: string[];
    environmental_impact?: string;
    safety_incidents?: string[];
  };
}

const getCategoryConfig = (category: string, hasFatalIncidents: boolean) => {
  const baseConfig = {
    healthy: {
      icon: Check,
      color: 'emerald',
      gradient: 'from-emerald-500/20 to-emerald-500/5',
      borderHover: 'hover:border-emerald-500/30',
      iconBg: 'bg-emerald-500/20',
      scoreColor: 'text-emerald-400',
      accuracy: 98.5
    },
    restricted: {
      icon: ShieldAlert,
      color: 'amber',
      gradient: 'from-amber-500/20 to-amber-500/5',
      borderHover: 'hover:border-amber-500/30',
      iconBg: 'bg-amber-500/20',
      scoreColor: 'text-amber-400',
      accuracy: 97.2
    },
    harmful: {
      icon: AlertTriangle,
      color: 'red',
      gradient: 'from-red-500/20 to-red-500/5',
      borderHover: 'hover:border-red-500/30',
      iconBg: 'bg-red-500/20',
      scoreColor: 'text-red-400',
      accuracy: 99.1
    }
  };

  if (hasFatalIncidents) {
    return {
      icon: Skull,
      color: 'red',
      gradient: 'from-red-900/30 to-red-900/10',
      borderHover: 'hover:border-red-900/40',
      iconBg: 'bg-red-900/30',
      scoreColor: 'text-red-500',
      accuracy: 99.8
    };
  }

  return baseConfig[category] || baseConfig.healthy;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const config = getCategoryConfig(product.category, product.has_fatal_incidents || false);
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
        min-h-[600px]
      `}
    >
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <div className={`${config.iconBg} p-2.5 rounded-full`}>
          <Icon className={`w-6 h-6 text-${config.color}-400`} />
        </div>
        <div className={`${config.iconBg} p-2.5 rounded-full`}>
          <Brain className={`w-6 h-6 text-${config.color}-400`} />
        </div>
        {product.has_fatal_incidents && (
          <div className="bg-red-900/30 p-2.5 rounded-full">
            <Skull className="w-6 h-6 text-red-500" />
          </div>
        )}
        {product.has_serious_adverse_events && (
          <div className="bg-red-700/30 p-2.5 rounded-full">
            <AlertOctagon className="w-6 h-6 text-red-400" />
          </div>
        )}
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

        {product.safety_incidents && product.safety_incidents.length > 0 && (
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
            <h4 className="text-sm font-medium text-red-400 mb-2">Safety Incidents:</h4>
            <ul className="space-y-2">
              {product.safety_incidents.map((incident, index) => (
                <li key={index} className="text-sm text-red-300 flex items-start gap-2">
                  <span className="min-w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></span>
                  {incident}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Chemical Composition:</h4>
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

        {product.allergy_risks && product.allergy_risks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-amber-400 mb-2">Allergy Risks:</h4>
            <ul className="space-y-2">
              {product.allergy_risks.map((risk, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.drug_interactions && product.drug_interactions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-purple-400 mb-2">Drug Interactions:</h4>
            <ul className="space-y-2">
              {product.drug_interactions.map((interaction, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-purple-400" />
                  {interaction}
                </li>
              ))}
            </ul>
          </div>
        )}

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

        {product.special_population_warnings && product.special_population_warnings.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-blue-400 mb-2">Special Population Warnings:</h4>
            <ul className="space-y-2">
              {product.special_population_warnings.map((warning, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-blue-400" />
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.environmental_impact && (
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2">Environmental Impact:</h4>
            <p className="text-sm text-muted-foreground">
              {product.environmental_impact}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};