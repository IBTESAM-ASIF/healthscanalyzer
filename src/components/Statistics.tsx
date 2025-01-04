import { 
  BarChart3, CheckCircle, XCircle, Timer,
  TrendingUp, AlertTriangle, Bolt, Award,
  Users, Brain, Shield, Leaf
} from "lucide-react";
import { StatCard } from './stats/StatCard';
import { StatsHeader } from './stats/StatsHeader';
import { StatsGrid } from './stats/StatsGrid';
import { useStats } from './stats/useStats';

const Statistics = () => {
  const { stats, isLoading } = useStats();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      <div className="relative container mx-auto px-4">
        <StatsHeader />
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <StatsGrid stats={stats} />
        )}
      </div>
    </section>
  );
};

export default Statistics;