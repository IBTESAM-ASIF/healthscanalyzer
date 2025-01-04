import { StatCard } from './StatCard';

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
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};