import { useState } from 'react';
import { initialStats } from '@/components/stats/initialStats';
import { Stat } from '@/types/stats';

export const useStatsData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stat[]>(initialStats);

  return {
    stats,
    setStats,
    isLoading,
    setIsLoading
  };
};