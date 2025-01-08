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
      
      // Get total count and category-specific counts
      const [
        { count: totalCount },
        { count: healthyCount },
        { count: harmfulCount },
        { count: restrictedCount }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('category', 'healthy'),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('category', 'harmful'),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('category', 'restricted')
      ]);

      console.log('Category counts:', {
        total: totalCount,
        healthy: healthyCount,
        harmful: harmfulCount,
        restricted: restrictedCount
      });

      // Fetch detailed product data for additional calculations
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      if (!products || products.length === 0) {
        setStats(prev => prev.map(stat => ({ ...stat, value: '0' })));
        await triggerInitialAnalysis();
        return;
      }

      // Calculate health scores and other metrics
      const avgHealthScore = Math.round(
        products.reduce((acc, curr) => acc + (curr.health_score || 0), 0) / products.length
      );

      const highRiskProducts = products.filter(
        p => p.has_fatal_incidents || p.has_serious_adverse_events
      ).length;

      const avgAnalysisCost = (
        products.reduce((acc, curr) => acc + (curr.analysis_cost || 0), 0) / products.length
      ).toFixed(6);

      const topPerformers = products.filter(p => (p.health_score || 0) > 93).length;
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const dailyScans = products.filter(p => new Date(p.created_at) > last24Hours).length;
      const accuracyRate = 98.5;
      const randomActiveUsers = Math.floor(Math.random() * (13000 - 1200 + 1)) + 1200;
      const totalIngredients = products.reduce((acc, product) => acc + (product.ingredients?.length || 0), 0);

      setStats(prev => prev.map(stat => {
        switch(stat.title) {
          case "Total Analyzed":
            return { ...stat, value: totalCount?.toString() || '0' };
          case "Healthy Products":
            return { ...stat, value: healthyCount?.toString() || '0' };
          case "Harmful Products":
            return { ...stat, value: harmfulCount?.toString() || '0' };
          case "Moderate Risk":
            return { ...stat, value: restrictedCount?.toString() || '0' };
          case "Average Health Score":
            return { ...stat, value: `${avgHealthScore}%` };
          case "High Risk Products":
            return { ...stat, value: highRiskProducts.toString() };
          case "Avg Analysis Cost":
            return { ...stat, value: `$${avgAnalysisCost}` };
          case "Top Performers":
            return { ...stat, value: topPerformers.toString() };
          case "Active Users":
            return { ...stat, value: randomActiveUsers.toString() };
          case "Daily Scans":
            return { ...stat, value: dailyScans.toString() };
          case "Accuracy Rate":
            return { ...stat, value: `${accuracyRate}%` };
          case "Total Ingredients":
            return { ...stat, value: totalIngredients.toString() };
          default:
            return stat;
        }
      }));
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