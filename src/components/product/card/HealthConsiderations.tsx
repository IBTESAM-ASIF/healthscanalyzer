import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface HealthConsiderationsProps {
  allergyRisks?: string[];
  drugInteractions?: string[];
}

export const HealthConsiderations = ({ 
  allergyRisks, 
  drugInteractions 
}: HealthConsiderationsProps) => {
  if (!allergyRisks?.length && !drugInteractions?.length) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300"
    >
      <h4 className="text-sm font-medium text-amber-400 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Health Considerations
      </h4>
      
      {allergyRisks && allergyRisks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-amber-300">Allergy Risks:</p>
          <ScrollArea className="h-[60px]">
            <div className="flex flex-wrap gap-2">
              {allergyRisks.map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-amber-950/50 group-hover:bg-amber-950/70 transition-all duration-300 transform group-hover:scale-105"
                  >
                    {risk}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {drugInteractions && drugInteractions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-amber-300">Drug Interactions:</p>
          <ScrollArea className="h-[60px]">
            <div className="flex flex-wrap gap-2">
              {drugInteractions.map((interaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-amber-950/50 group-hover:bg-amber-950/70 transition-all duration-300 transform group-hover:scale-105"
                  >
                    {interaction}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </motion.div>
  );
};