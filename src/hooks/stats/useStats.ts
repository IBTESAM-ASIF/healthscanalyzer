import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useStatsData } from './useStatsData';
import { calculateStats } from './useStatsCalculation';
import { useStatsSubscription } from './useStatsSubscription';
import { useAnalysisTrigger } from '@/components/stats/useAnalysisTrigger';

export const useStats = () => {
  const { stats, setStats, isLoading, setIsLoading } = useStatsData();
  const { toast } = useToast();
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

      // Log any potentially miscategorized products
      const potentialIssues = products.filter(p => {
        const hasWarnings = p.has_fatal_incidents || p.has_serious_adverse_events;
        const isHealthy = p.category === 'healthy';
        return hasWarnings && isHealthy;
      });

      if (potentialIssues.length > 0) {
        console.warn('Found potentially miscategorized products:', potentialIssues);
        toast({
          title: "Warning",
          description: "Found products marked as healthy but with safety warnings. Please review.",
          variant: "destructive",
        });
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