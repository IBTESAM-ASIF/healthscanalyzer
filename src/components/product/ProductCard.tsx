import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Leaf, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { HealthScore } from './card/HealthScore';
import { AIAnalysis } from './card/AIAnalysis';
import { ProsConsSection } from './card/ProsConsSection';
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const categoryColors = {
    healthy: 'bg-emerald-500',
    restricted: 'bg-amber-500',
    harmful: 'bg-red-500'
  };

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
          {/* Product Name Section with Enhanced Typography */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <ScrollArea className="h-[60px] w-full">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold text-white leading-tight hover:text-primary/90 transition-colors duration-300"
                >
                  {product.name}
                </motion.h3>
              </ScrollArea>
              
              {product.company && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <Building2 className="w-4 h-4 flex-shrink-0" />
                  <ScrollArea className="h-[24px] w-full">
                    <span className="font-medium hover:text-white transition-colors duration-300">
                      {product.company}
                    </span>
                  </ScrollArea>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge className={`
                  ${categoryColors[product.category]} text-white shadow-lg 
                  shadow-${product.category}-500/20 self-start px-3 py-1
                `}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* Health Score and Analysis Sections */}
          <div className="grid gap-4">
            <HealthScore score={product.health_score} />
            <AIAnalysis analysisCost={product.analysis_cost} />
          </div>

          {/* Analysis Summary with Enhanced Styling */}
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

          {/* Safety Warnings with Enhanced Visual Hierarchy */}
          {hasSafetyWarnings && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all duration-300"
            >
              <h4 className="text-sm font-medium text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Safety Warnings
              </h4>
              {product.safety_incidents && product.safety_incidents.length > 0 && (
                <ScrollArea className="h-[80px]">
                  <ul className="text-xs text-red-300 list-disc list-inside space-y-1">
                    {product.safety_incidents.map((incident, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {incident}
                      </motion.li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </motion.div>
          )}

          {/* Health Considerations with Improved Visual Feedback */}
          {(product.allergy_risks?.length > 0 || product.drug_interactions?.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300"
            >
              <h4 className="text-sm font-medium text-amber-400 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Health Considerations
              </h4>
              {product.allergy_risks && product.allergy_risks.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-amber-300">Allergy Risks:</p>
                  <ScrollArea className="h-[60px]">
                    <div className="flex flex-wrap gap-1">
                      {product.allergy_risks.map((risk, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge variant="outline" className="text-xs bg-amber-950/50 hover:bg-amber-950/70 transition-colors duration-300">
                            {risk}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
              {product.drug_interactions && product.drug_interactions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-amber-300">Drug Interactions:</p>
                  <ScrollArea className="h-[60px]">
                    <div className="flex flex-wrap gap-1">
                      {product.drug_interactions.map((interaction, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge variant="outline" className="text-xs bg-amber-950/50 hover:bg-amber-950/70 transition-colors duration-300">
                            {interaction}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </motion.div>
          )}

          {/* Environmental Impact with Enhanced Visual Appeal */}
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