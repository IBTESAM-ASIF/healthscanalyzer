import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { debounce } from 'lodash';
import { initialStats } from '@/components/stats/initialStats';
import { useAnalysisTrigger } from '@/components/stats/useAnalysisTrigger';
import { calculateStats } from './useStatsCalculation';

export const useStats = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(initialStats);
  const { triggerInitialAnalysis } = useAnalysisTrigger();

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching stats...');
      
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Fetched products:', products?.length);

      if (!products || products.length === 0) {
        setStats(prev => prev.map(stat => ({ ...stat, value: '0' })));
        await triggerInitialAnalysis();
        return;
      }

      const calculatedStats = calculateStats(products);
      
      if (calculatedStats) {
        console.log('Calculated new stats:', calculatedStats);
        setStats(prev => prev.map(stat => {
          switch(stat.title) {
            case "Total Analyzed":
              return { ...stat, value: calculatedStats.totalAnalyzed.toString() };
            case "Healthy Products":
              return { ...stat, value: calculatedStats.healthyProducts.toString() };
            case "Harmful Products":
              return { ...stat, value: calculatedStats.harmfulProducts.toString() };
            case "Moderate Risk":
              return { ...stat, value: calculatedStats.moderateRisk.toString() };
            case "Average Health Score":
              return { ...stat, value: `${calculatedStats.avgHealthScore}%` };
            case "High Risk Products":
              return { ...stat, value: calculatedStats.highRiskProducts.toString() };
            case "Avg Analysis Cost":
              return { ...stat, value: `$${calculatedStats.avgAnalysisCost}` };
            case "Top Performers":
              return { ...stat, value: calculatedStats.topPerformers.toString() };
            case "Active Users":
              return { ...stat, value: calculatedStats.randomActiveUsers.toString() };
            case "Daily Scans":
              return { ...stat, value: calculatedStats.dailyScans.toString() };
            case "Accuracy Rate":
              return { ...stat, value: `${calculatedStats.accuracyRate}%` };
            case "Total Ingredients":
              return { ...stat, value: calculatedStats.totalIngredients.toString() };
            default:
              return stat;
          }
        }));
      }
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

  useEffect(() => {
    console.log('Setting up stats subscription...');
    fetchStats();
    
    const debouncedFetchStats = debounce(() => {
      fetchStats();
      toast({
        title: "Statistics Updated",
        description: "New product analysis data is available.",
      });
    }, 1000);

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        debouncedFetchStats
      )
      .subscribe();

    return () => {
      console.log('Cleaning up stats subscription...');
      debouncedFetchStats.cancel();
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, isLoading };
};