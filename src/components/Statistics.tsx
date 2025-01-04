import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart3, CheckCircle, XCircle, Timer,
  TrendingUp, AlertTriangle, Bolt, Award,
  Users, Brain, Shield, Leaf
} from "lucide-react";
import { StatCard } from './stats/StatCard';
import { StatsHeader } from './stats/StatsHeader';
import { StatsGrid } from './stats/StatsGrid';
import { useToast } from './ui/use-toast';
import { debounce } from 'lodash';

const Statistics = () => {
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
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: products, error } = await supabase
          .from('products')
          .select('category, health_score');
        
        if (error) throw error;

        // Handle empty state
        if (!products || products.length === 0) {
          toast({
            title: "No Data Available",
            description: "Waiting for product analysis data...",
          });
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
      }
    };

    fetchStats();

    // Subscribe to real-time updates with debouncing
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

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      <div className="relative container mx-auto px-4">
        <StatsHeader />
        <StatsGrid stats={stats} />
      </div>
    </section>
  );
};

export default Statistics;