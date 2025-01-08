import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

export const fetchAnalysisData = async (retryCount: number) => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 10);

    console.log('Attempting to fetch data with date range:', {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      retryAttempt: retryCount
    });

    const { data: products, error } = await supabase
      .from('products')
      .select('category, created_at')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) throw error;

    if (!products || !Array.isArray(products)) {
      console.log('No products found or invalid response');
      return [];
    }

    console.log('Successfully fetched products:', products.length);

    const dailyData = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      
      const dayProducts = products.filter(p => 
        new Date(p.created_at).toDateString() === date.toDateString()
      );

      dailyData.unshift({
        date: dateStr,
        healthy: dayProducts.filter(p => p.category === 'healthy').length,
        restricted: dayProducts.filter(p => p.category === 'restricted').length,
        harmful: dayProducts.filter(p => p.category === 'harmful').length,
      });
    }

    return dailyData;
  } catch (error) {
    console.error('Error in fetchAnalysisData:', error);
    if (error.message?.includes('JWT')) {
      throw new Error('Authentication expired. Please refresh the page.');
    } else if (error.message?.includes('timeout')) {
      throw new Error(`Connection timeout. Please try again. (Attempt ${retryCount + 1})`);
    } else if (error.message === 'Failed to fetch') {
      throw new Error('Network connection lost. Please check your internet connection.');
    }
    throw error;
  }
};

export const useProductAnalysisData = (retryCount: number) => {
  return useQuery({
    queryKey: ['productAnalysis', retryCount],
    queryFn: () => fetchAnalysisData(retryCount),
    refetchInterval: 30000,
    staleTime: 25000,
    retry: 5,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorMessage: 'Failed to load product analysis data'
    }
  });
};