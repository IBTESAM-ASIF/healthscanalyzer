import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface StatCardProps {
  stat: {
    title: string;
    value: string;
    icon: any;
    color: string;
    iconColor: string;
  };
}

export const StatCard = ({ stat }: StatCardProps) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
      
      {/* Card Content */}
      <div className={cn(`
        relative p-6 rounded-xl backdrop-blur-sm 
        bg-gray-900/60 border border-gray-800
        transition-all duration-300 
        hover:border-gray-700 hover:bg-gray-900/80
        group-hover:translate-y-[-2px]
        group-hover:shadow-lg group-hover:shadow-purple-500/10
      `)}>
        {/* Top Section */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            stat.color,
            "p-3 rounded-lg transition-transform duration-300 group-hover:scale-110"
          )}>
            <Icon className={cn(
              stat.iconColor,
              "w-6 h-6 transition-transform duration-300 group-hover:rotate-12"
            )} />
          </div>
          
          {/* Value with animated counting effect */}
          <motion.p 
            className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {stat.value}
          </motion.p>
        </div>

        {/* Bottom Section */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">
            {stat.title}
          </p>
          
          {/* Animated progress bar */}
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className={cn(
                "h-full rounded-full",
                stat.color.replace("bg-", "bg-opacity-50 bg-")
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};