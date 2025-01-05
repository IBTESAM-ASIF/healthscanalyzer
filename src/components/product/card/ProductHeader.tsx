import React from 'react';
import { Building2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

interface ProductHeaderProps {
  name: string;
  company?: string;
  category: 'healthy' | 'restricted' | 'harmful';
}

const categoryColors = {
  healthy: 'bg-emerald-500',
  restricted: 'bg-amber-500',
  harmful: 'bg-red-500'
};

export const ProductHeader = ({ name, company, category }: ProductHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <ScrollArea className="h-[60px] w-full">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-white leading-tight hover:text-primary/90 transition-colors duration-300"
          >
            {name}
          </motion.h3>
        </ScrollArea>
        
        {company && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 transition-colors">
              <Building2 className="w-4 h-4 flex-shrink-0 text-primary" />
              <ScrollArea className="h-[24px] w-full">
                <span className="font-medium hover:text-white transition-colors duration-300">
                  {company}
                </span>
              </ScrollArea>
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="flex gap-2 flex-wrap"
        >
          <Badge className={`
            ${categoryColors[category]} text-white shadow-lg 
            shadow-${category}-500/20 self-start px-3 py-1
          `}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </motion.div>
      </div>
    </div>
  );
};