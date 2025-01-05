import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { HealthScore } from './card/HealthScore';
import { AIAnalysis } from './card/AIAnalysis';
import { ProsConsSection } from './card/ProsConsSection';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductHeader } from './card/ProductHeader';
import { SafetyWarnings } from './card/SafetyWarnings';
import { HealthConsiderations } from './card/HealthConsiderations';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    company?: string;
    category: 'healthy' | 'restricted' | 'harmful';
    ingredients?: string[];
    health_score?: number;
    analysis_summary?: string;
    pros?: string[];
    cons?: string[];
    has_fatal_incidents?: boolean;
    has_serious_adverse_events?: boolean;
    allergy_risks?: string[];
    drug_interactions?: string[];
    special_population_warnings?: string[];
    environmental_impact?: string;
    safety_incidents?: string[];
    analysis_cost?: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const categoryGradients = {
    healthy: 'from-emerald-500/20 to-emerald-500/5',
    restricted: 'from-amber-500/20 to-amber-500/5',
    harmful: 'from-red-500/20 to-red-500/5'
  };

  const hasSafetyWarnings = product.has_fatal_incidents || product.has_serious_adverse_events;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {hasSafetyWarnings && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-3 -right-3 z-10"
        >
          <Badge variant="destructive" className="animate-pulse shadow-lg shadow-red-500/20">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Safety Alert
          </Badge>
        </motion.div>
      )}
      
      <Card className={`
        p-6 min-h-[500px] backdrop-blur-sm border-2 
        ${hasSafetyWarnings ? 'bg-red-950/10 border-red-500/30' : `bg-gradient-to-br ${categoryGradients[product.category]} border-gray-800/50`}
        hover:border-gray-700/80 transition-all duration-500 
        hover:shadow-xl hover:shadow-primary/5
        group-hover:-translate-y-1
      `}>
        <div className="space-y-6">
          <ProductHeader 
            name={product.name}
            company={product.company}
            category={product.category}
          />

          <div className="grid gap-4">
            <HealthScore score={product.health_score} />
            <AIAnalysis analysisCost={product.analysis_cost} />
          </div>

          {product.analysis_summary && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/40 p-4 rounded-lg border border-gray-800/50 hover:border-gray-700/80 transition-all duration-300"
            >
              <ScrollArea className="h-[80px]">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {product.analysis_summary}
                </p>
              </ScrollArea>
            </motion.div>
          )}

          <ProsConsSection pros={product.pros} cons={product.cons} />

          <SafetyWarnings 
            hasFatalIncidents={product.has_fatal_incidents || false}
            hasSeriousAdverseEvents={product.has_serious_adverse_events || false}
            safetyIncidents={product.safety_incidents}
          />

          <HealthConsiderations 
            allergyRisks={product.allergy_risks}
            drugInteractions={product.drug_interactions}
          />

          {product.environmental_impact && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300"
            >
              <Leaf className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
              <ScrollArea className="h-[60px]">
                <p className="text-sm text-emerald-300">{product.environmental_impact}</p>
              </ScrollArea>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};