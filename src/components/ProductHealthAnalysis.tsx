import React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductHealthChart } from './product-health/ProductHealthChart';
import { CategoryDescriptions } from './product-health/CategoryDescriptions';
import { AlertCircle, DatabaseIcon } from 'lucide-react';

const ProductHealthAnalysis = () => {
  const { toast } = useToast();

  const fetchAnalysisData = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 10);

      console.log('Fetching data with date range:', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });

      // First check auth status
      const { data: session, error: authError } = await supabase.auth.getSession();
      if (authError) {
        console.error('Auth error:', authError);
        throw new Error('Authentication service unavailable. Please try again later.');
      }

      const { data: products, error } = await supabase
        .from('products')
        .select('category, created_at')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (error) {
        console.error('Supabase query error:', error);
        if (error.message?.includes('JWT')) {
          throw new Error('Authentication error. Please sign in again.');
        }
        throw new Error(
          error.message === 'Failed to fetch' 
            ? 'Unable to connect to the database. Please check your connection and try again.'
            : error.message || 'Failed to fetch products data'
        );
      }

      if (!products) {
        console.log('No products found');
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
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productAnalysis'],
    queryFn: fetchAnalysisData,
    refetchInterval: 30000,
    staleTime: 25000,
    retry: 5,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorMessage: 'Failed to load product analysis data'
    }
  });

  React.useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Received database change:', payload);
          toast({
            title: "Data Updated",
            description: "Product distribution chart has been updated with new data.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  if (isError && error instanceof Error) {
    const isAuthError = error.message.includes('Authentication') || error.message.includes('JWT');
    
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{isAuthError ? 'Authentication Error' : 'Connection Error'}</AlertTitle>
        <AlertDescription className="mt-2">
          {error.message || 'Failed to fetch analysis data. Please try again later.'}
          {isAuthError && (
            <div className="mt-2">
              <button 
                onClick={() => window.location.reload()} 
                className="text-white underline hover:no-underline"
              >
                Refresh page
              </button>
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section id="product-analysis" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      <div className="relative container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
          Product Health Analysis
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-effect rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">10-Day Product Distribution</h3>
            <ProductHealthChart 
              data={data} 
              isLoading={isLoading}
              isError={isError}
            />
          </div>

          <CategoryDescriptions />
        </div>
      </div>
    </section>
  );
};

export default ProductHealthAnalysis;