import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Timer,
  TrendingUp,
  AlertTriangle,
  Bolt,
  Award,
  Users,
  Brain,
  Shield,
  Leaf
} from "lucide-react";

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: products, error } = await supabase
          .from('products')
          .select('category, health_score');
        
        if (error) throw error;

        const totalAnalyzed = products.length;
        const healthyProducts = products.filter(p => p.category === 'healthy').length;
        const harmfulProducts = products.filter(p => p.category === 'harmful').length;
        const moderateRisk = products.filter(p => p.category === 'restricted').length;
        const avgHealthScore = products.reduce((acc, curr) => acc + (curr.health_score || 0), 0) / totalAnalyzed;

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
      }
    };

    fetchStats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-400 bg-blue-950/40 rounded-full">
            Analytics Overview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
            Platform Statistics
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time insights into our platform's performance and impact
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
                <div className={`
                  relative p-6 rounded-xl backdrop-blur-sm 
                  bg-gray-900/60 border border-gray-800
                  transition-all duration-300 
                  hover:border-gray-700 hover:bg-gray-900/80
                  flex items-start gap-4
                `}>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
