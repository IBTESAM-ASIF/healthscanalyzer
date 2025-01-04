import { Button } from "@/components/ui/button";
import { ArrowDown, Star } from "lucide-react";
import { motion } from "framer-motion";

interface HeroButtonsProps {
  onLearnMore: () => void;
  onViewProducts: () => void;
}

export const HeroButtons = ({ onLearnMore, onViewProducts }: HeroButtonsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
    >
      <Button 
        variant="default"
        size="lg"
        className="rounded-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all duration-300 min-w-[160px]"
        onClick={onLearnMore}
      >
        <span className="relative z-10 flex items-center gap-2 text-base sm:text-lg font-medium">
          Learn More
          <ArrowDown className="ml-1 h-4 w-4 transition-transform group-hover:translate-y-1" />
        </span>
      </Button>
      <Button 
        variant="outline"
        size="lg"
        className="rounded-full group relative overflow-hidden border-purple-500/50 hover:border-purple-500 transition-all duration-300 min-w-[160px]"
        onClick={onViewProducts}
      >
        <span className="relative z-10 flex items-center gap-2 text-base sm:text-lg font-medium group-hover:text-purple-200">
          View Products
          <Star className="ml-1 h-4 w-4 transition-transform group-hover:rotate-45" />
        </span>
      </Button>
    </motion.div>
  );
};