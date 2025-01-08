import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useStatsData } from './useStatsData';
import { useStatsSubscription } from './useStatsSubscription';
import { useAnalysisTrigger } from '@/components/stats/useAnalysisTrigger';
import { fetchProductCounts, fetchDetailedProducts } from './useProductStats';
import { calculateProductStatistics, mapStatsToValues } from './calculateStatistics';

export const useStats = () => {
  const { stats, setStats, isLoading, setIsLoading } = useStatsData();
  const { toast } = useToast();
  const { triggerInitialAnalysis } = useAnalysisTrigger();

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching stats - started');
      
      // Get product counts
      const counts = await fetchProductCounts();
      console.log('Category counts fetched successfully:', counts);

      // Fetch detailed product data
      const products = await fetchDetailedProducts();
      
      if (!products || products.length === 0) {
        console.log('No products found, triggering initial analysis');
        setStats(prev => prev.map(stat => ({ ...stat, value: '0' })));
        await triggerInitialAnalysis();
        return;
      }

      console.log(`Processing ${products.length} products for statistics`);

      // Calculate statistics
      const calculatedStats = calculateProductStatistics(products);
      console.log('Calculated metrics:', calculatedStats);

      // Update stats with new values
      setStats(prev => mapStatsToValues(prev, calculatedStats, counts));
      console.log('Statistics updated successfully');
    } catch (error) {
      console.error('Error in fetchStats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch statistics. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { subscribeToStats } = useStatsSubscription(fetchStats);

  useEffect(() => {
    console.log('Setting up stats subscription...');
    fetchStats();
    const cleanup = subscribeToStats();
    return () => {
      console.log('Cleaning up stats subscription...');
      cleanup();
    };
  }, []);

  return { stats, isLoading };
};