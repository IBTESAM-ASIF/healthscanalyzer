import { useState } from 'react';
import { initialStats } from '@/components/stats/initialStats';
import { StatType } from '@/types/stats';

export const useStatsData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatType[]>(initialStats);

  return {
    stats,
    setStats,
    isLoading,
    setIsLoading
  };
};