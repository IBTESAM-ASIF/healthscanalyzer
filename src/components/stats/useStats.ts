import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { debounce } from 'lodash';

export const useStats = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      title: "Total Analyzed",
      value: "0",
      icon: BarChart3,
      color: "bg-blue-600/10",
      iconColor: "text-blue-600"
    },
    {
      title: "Healthy Products",
      value: "0",
      icon: CheckCircle,
      color: "bg-green-600/10",
      iconColor: "text-green-600"
    },
    {
      title: "Harmful Products",
      value: "0",
      icon: XCircle,
      color: "bg-red-600/10",
      iconColor: "text-red-600"
    },
    {
      title: "Moderate Risk",
      value: "0",
      icon: Timer,
      color: "bg-yellow-600/10",
      iconColor: "text-yellow-600"
    },
    {
      title: "Average Health Score",
      value: "0%",
      icon: TrendingUp,
      color: "bg-purple-600/10",
      iconColor: "text-purple-600"
    },
    {
      title: "High Risk Products",
      value: "0",
      icon: AlertTriangle,
      color: "bg-orange-600/10",
      iconColor: "text-orange-600"
    },
    {
      title: "Avg Analysis Cost",
      value: "$0.00",
      icon: Bolt,
      color: "bg-teal-600/10",
      iconColor: "text-teal-600"
    },
    {
      title: "Top Performers",
      value: "0",
      icon: Award,
      color: "bg-cyan-600/10",
      iconColor: "text-cyan-600"
    },
    {
      title: "Active Users",
      value: "0",
      icon: Users,
      color: "bg-indigo-600/10",
      iconColor: "text-indigo-600"
    },
    {
      title: "Daily Scans",
      value: "0",
      icon: Brain,
      color: "bg-pink-600/10",
      iconColor: "text-pink-600"
    },
    {
      title: "Accuracy Rate",
      value: "0%",
      icon: Shield,
      color: "bg-emerald-600/10",
      iconColor: "text-emerald-600"
    },
    {
      title: "Total Ingredients",
      value: "0",
      icon: Leaf,
      color: "bg-violet-600/10",
      iconColor: "text-violet-600"
    }
  ]);

  const triggerInitialAnalysis = async () => {
    try {
      const response = await fetch(
        'https://bwuvybxxfpcxoqtsfjgs.supabase.co/functions/v1/auto-product-analysis',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ trigger: 'initial' }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to trigger analysis');
      }

      toast({
        title: "Analysis Started",
        description: "Initial product analysis has been triggered. Data will appear shortly.",
      });
    } catch (error) {
      console.error('Error triggering analysis:', error);
      toast({
        title: "Error",
        description: "Failed to trigger initial analysis. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const { data: products, error } = await supabase
        .from('products')
        .select('category, health_score');
      
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
        description: "The statistics have been updated with new data.",
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
  }, [toast]);

  return { stats, isLoading };
};
