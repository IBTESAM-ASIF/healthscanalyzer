import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

interface DailyData {
  date: string;
  healthy: number;
  restricted: number;
  harmful: number;
}

export const fetchAnalysisData = async (retryCount: number): Promise<DailyData[]> => {
  try {
    console.log('Attempting to fetch ALL products for analysis, retry attempt:', retryCount);

    const { data: products, error } = await supabase
      .from('products')
      .select('category, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!products || !Array.isArray(products)) {
      console.log('No products found or invalid response');
      return [];
    }

    const typedProducts = products as unknown as Pick<Product, 'category' | 'created_at'>[];
    console.log('Successfully fetched ALL products for analysis:', typedProducts.length);

    // Group products by date for the last 10 days
    const endDate = new Date();
    const dailyData: DailyData[] = [];
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      
      const dayProducts = typedProducts.filter(p => 
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
    if (error instanceof Error) {
      if (error.message?.includes('JWT')) {
        throw new Error('Authentication expired. Please refresh the page.');
      } else if (error.message?.includes('timeout')) {
        throw new Error(`Connection timeout. Please try again. (Attempt ${retryCount + 1})`);
      } else if (error.message === 'Failed to fetch') {
        throw new Error('Network connection lost. Please check your internet connection.');
      }
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