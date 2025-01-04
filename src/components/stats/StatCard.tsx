import { motion } from 'framer-motion';

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
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
      <div className={`
        relative p-6 rounded-xl backdrop-blur-sm 
        bg-gray-900/60 border border-gray-800
        transition-all duration-300 
        hover:border-gray-700 hover:bg-gray-900/80
        flex items-start gap-4
      `}>
        <div className={`${stat.color} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${stat.iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
        </div>
      </div>
    </motion.div>
  );
};