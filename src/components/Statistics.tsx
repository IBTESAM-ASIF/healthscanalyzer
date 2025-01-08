import { 
  BarChart3, CheckCircle, XCircle, Timer,
  TrendingUp, AlertTriangle, Bolt, Award,
  Users, Brain, Shield, Leaf
} from "lucide-react";
import { StatCard } from './stats/StatCard';
import { StatsHeader } from './stats/StatsHeader';
import { StatsGrid } from './stats/StatsGrid';
import { useStats } from './stats/useStats';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from "@/components/ui/skeleton";

const StatsLoadingFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="p-6 rounded-xl bg-gray-900/60 border border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
    ))}
  </div>
);

const StatsErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div className="text-center py-12">
    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">Error Loading Statistics</h3>
    <p className="text-gray-400 mb-4">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const StatisticsContent = () => {
  const { stats, isLoading } = useStats();

  if (isLoading) {
    return <StatsLoadingFallback />;
  }

  return <StatsGrid stats={stats} />;
};

const Statistics = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      <div className="relative container mx-auto px-4">
        <StatsHeader />
        <ErrorBoundary
          FallbackComponent={StatsErrorFallback}
          onReset={() => window.location.reload()}
        >
          <StatisticsContent />
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default Statistics;