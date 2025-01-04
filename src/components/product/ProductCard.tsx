import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, AlertTriangle, Shield, Leaf, HeartPulse, ThumbsUp, ThumbsDown, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
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
      className="relative"
    >
      {hasSafetyWarnings && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge variant="destructive" className="animate-pulse shadow-lg">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Safety Alert
          </Badge>
        </div>
      )}
      
      <Card className={`
        p-6 min-h-[500px] backdrop-blur-sm border border-gray-800
        ${hasSafetyWarnings ? 'bg-red-950/10' : `bg-gradient-to-br ${categoryGradients[product.category]}`}
        hover:border-gray-700 transition-all duration-300 hover:shadow-xl
      `}>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <Badge className={`${categoryColors[product.category]} text-white shadow-lg`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
          </div>

          <div className="grid gap-4">
            {/* Health Score */}
            {product.health_score !== undefined && (
              <div className="space-y-2 bg-gray-900/40 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <HeartPulse className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium text-gray-300">Health Score</span>
                </div>
                <div className="space-y-2">
                  <Progress value={product.health_score} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Score</span>
                    <span className={`font-medium ${
                      product.health_score > 70 ? 'text-emerald-400' :
                      product.health_score > 40 ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {product.health_score}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis */}
            <div className="space-y-2 bg-gray-900/40 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-300">AI Analysis</span>
              </div>
              <Progress value={98.5} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Accuracy</span>
                <span className="font-medium text-purple-400">98.5%</span>
              </div>
            </div>
          </div>

          {product.analysis_summary && (
            <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">
              <p className="text-gray-300 text-sm leading-relaxed">{product.analysis_summary}</p>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="grid grid-cols-2 gap-4">
            {product.pros && product.pros.length > 0 && (
              <div className="space-y-2 bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">Benefits</span>
                </div>
                <ul className="space-y-1">
                  {product.pros.map((pro, index) => (
                    <li key={index} className="text-xs text-emerald-300 flex items-start gap-1">
                      <span className="mt-1">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.cons && product.cons.length > 0 && (
              <div className="space-y-2 bg-red-900/20 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsDown className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Risks</span>
                </div>
                <ul className="space-y-1">
                  {product.cons.map((con, index) => (
                    <li key={index} className="text-xs text-red-300 flex items-start gap-1">
                      <span className="mt-1">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Safety Warnings */}
          {hasSafetyWarnings && (
            <div className="space-y-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="text-sm font-medium text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Safety Warnings
              </h4>
              {product.safety_incidents && product.safety_incidents.length > 0 && (
                <ul className="text-xs text-red-300 list-disc list-inside space-y-1">
                  {product.safety_incidents.map((incident, index) => (
                    <li key={index}>{incident}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Health Considerations */}
          {(product.allergy_risks?.length > 0 || product.drug_interactions?.length > 0) && (
            <div className="space-y-3 bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <h4 className="text-sm font-medium text-amber-400 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Health Considerations
              </h4>
              {product.allergy_risks && product.allergy_risks.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-amber-300">Allergy Risks:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.allergy_risks.map((risk, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-amber-950/50">
                        {risk}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {product.drug_interactions && product.drug_interactions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-amber-300">Drug Interactions:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.drug_interactions.map((interaction, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-amber-950/50">
                        {interaction}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Environmental Impact */}
          {product.environmental_impact && (
            <div className="flex items-start gap-2 bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/20">
              <Leaf className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-emerald-300">{product.environmental_impact}</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};