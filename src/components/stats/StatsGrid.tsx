import { StatCard } from './StatCard';
import { motion } from 'framer-motion';

interface StatsGridProps {
  stats: Array<{
    title: string;
    value: string;
    icon: any;
    color: string;
    iconColor: string;
  }>;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <StatCard stat={stat} />
        </motion.div>
      ))}
    </div>
  );
};