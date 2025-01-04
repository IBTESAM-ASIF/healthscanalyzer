import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { debounce } from 'lodash';
import { initialStats } from './initialStats';
import { useAnalysisTrigger } from './useAnalysisTrigger';

export const useStats = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(initialStats);
  const { triggerInitialAnalysis } = useAnalysisTrigger();

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const { data: products, error } = await supabase
        .from('products')
        .select('category, health_score, analysis_cost')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      if (!products || products.length === 0) {
        setStats(prev => prev.map(stat => ({ ...stat, value: '0' })));
        await triggerInitialAnalysis();
        return;
      }

      const totalAnalyzed = products.length;
      const healthyProducts = products.filter(p => p.category === 'healthy').length;
      const harmfulProducts = products.filter(p => p.category === 'harmful').length;
      const moderateRisk = products.filter(p => p.category === 'restricted').length;
      const avgHealthScore = products.length > 0 
        ? products.reduce((acc, curr) => acc + (curr.health_score || 0), 0) / totalAnalyzed 
        : 0;
      const avgAnalysisCost = products.length > 0
        ? products.reduce((acc, curr) => acc + (curr.analysis_cost || 0), 0) / totalAnalyzed
        : 0;

      setStats(prev => prev.map(stat => {
        switch(stat.title) {
          case "Total Analyzed":
            return { ...stat, value: totalAnalyzed.toString() };
          case "Healthy Products":
            return { ...stat, value: healthyProducts.toString() };
          case "Harmful Products":
            return { ...stat, value: harmfulProducts.toString() };
          case "Moderate Risk":
            return { ...stat, value: moderateRisk.toString() };
          case "Average Health Score":
            return { ...stat, value: `${Math.round(avgHealthScore)}%` };
          case "Avg Analysis Cost":
            return { ...stat, value: `$${avgAnalysisCost.toFixed(6)}` };
          default:
            return stat;
        }
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
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
      debouncedFetchStats.cancel();
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, isLoading };
};