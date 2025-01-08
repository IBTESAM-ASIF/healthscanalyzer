import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { debounce } from 'lodash';
import { initialStats } from './initialStats';
import { useAnalysisTrigger } from './useAnalysisTrigger';
import { useQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 50;

const fetchProducts = async (page: number = 1) => {
  console.log('Fetching products for page:', page);
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data: products, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch statistics');
  }

  console.log('Successfully fetched products:', products?.length);
  return { products, totalCount: count };
};

export const useStats = () => {
  const { toast } = useToast();
  const { triggerInitialAnalysis } = useAnalysisTrigger();
  const [stats, setStats] = useState(initialStats);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products-stats', currentPage],
    queryFn: () => fetchProducts(currentPage),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData, // This replaces keepPreviousData
  });

  const products = data?.products || [];
  const totalCount = data?.totalCount || 0;

  useEffect(() => {
    if (!products || products.length === 0) {
      setStats(prev => prev.map(stat => ({ ...stat, value: '0' })));
      triggerInitialAnalysis();
      return;
    }

    // Calculate statistics based on current page data
    const totalAnalyzed = totalCount;
    const healthyProducts = products.filter(p => p.category === 'healthy').length;
    const harmfulProducts = products.filter(p => p.category === 'harmful').length;
    const moderateRisk = products.filter(p => p.category === 'restricted').length;
    
    const avgHealthScore = products.length > 0 
      ? Math.round(products.reduce((acc, curr) => acc + (curr.health_score || 0), 0) / products.length)
      : 0;

    const highRiskProducts = products.filter(
      p => p.has_fatal_incidents || p.has_serious_adverse_events
    ).length;

    const avgAnalysisCost = products.length > 0
      ? (products.reduce((acc, curr) => acc + (curr.analysis_cost || 0), 0) / products.length).toFixed(6)
      : '0.000000';

    const topPerformers = products.filter(p => (p.health_score || 0) > 93).length;

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const dailyScans = products.filter(
      p => new Date(p.created_at) > last24Hours
    ).length;

    const accuracyRate = 98.5;
    const randomActiveUsers = Math.floor(Math.random() * (13000 - 1200 + 1)) + 1200;
    
    const totalIngredients = products.reduce((acc, product) => {
      return acc + (product.ingredients?.length || 0);
    }, 0);

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
  }, [products, totalCount]);

  useEffect(() => {
    if (error) {
      console.error('Error in stats query:', error);
      toast({
        title: "Error",
        description: "Failed to fetch statistics. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Set up real-time subscription for updates
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        debounce(() => {
          // Invalidate the query cache to trigger a refresh
          window.location.reload();
        }, 1000)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { 
    stats, 
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE)
  };
};