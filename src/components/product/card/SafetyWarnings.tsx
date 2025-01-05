import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface SafetyWarningsProps {
  hasFatalIncidents: boolean;
  hasSeriousAdverseEvents: boolean;
  safetyIncidents?: string[];
}

export const SafetyWarnings = ({ 
  hasFatalIncidents, 
  hasSeriousAdverseEvents, 
  safetyIncidents 
}: SafetyWarningsProps) => {
  if (!hasFatalIncidents && !hasSeriousAdverseEvents) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all duration-300"
    >
      <h4 className="text-sm font-medium text-red-400 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        Critical Safety Warnings
      </h4>
      {safetyIncidents && safetyIncidents.length > 0 && (
        <ScrollArea className="h-[80px]">
          <ul className="text-xs text-red-300 space-y-2">
            {safetyIncidents.map((incident, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 bg-red-500/5 p-2 rounded-md"
              >
                <span className="mt-1">•</span>
                <span className="flex-1">{incident}</span>
              </motion.li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </motion.div>
  );
};