import React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductHealthChart } from './product-health/ProductHealthChart';
import { CategoryDescriptions } from './product-health/CategoryDescriptions';
import { AlertCircle, DatabaseIcon, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const ProductHealthAnalysis = () => {
  const { toast } = useToast();
  const [retryCount, setRetryCount] = React.useState(0);

  const fetchAnalysisData = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 10);

      console.log('Attempting to fetch data with date range:', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        retryAttempt: retryCount
      });

      // First check auth status with timeout
      const authPromise = new Promise(async (resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Authentication service timeout'));
        }, 5000);

        try {
          const { data: session, error: authError } = await supabase.auth.getSession();
          clearTimeout(timeout);
          if (authError) throw authError;
          resolve(session);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });

      await authPromise;

      // Fetch products with timeout
      const productsPromise = new Promise(async (resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Database connection timeout'));
        }, 5000);

        try {
          const { data: products, error } = await supabase
            .from('products')
            .select('category, created_at')
            .gte('created_at', startDate.toISOString())
            .lte('created_at', endDate.toISOString());

          clearTimeout(timeout);
          
          if (error) throw error;
          resolve(products);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });

      const products = await productsPromise;

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
      // Enhance error handling with specific error types
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

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['productAnalysis', retryCount],
    queryFn: fetchAnalysisData,
    refetchInterval: 30000,
    staleTime: 25000,
    retry: 5,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorMessage: 'Failed to load product analysis data'
    }
  });

  // Enhanced real-time subscription
  React.useEffect(() => {
    console.log('Setting up real-time subscription...');
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
          refetch();
          toast({
            title: "Data Updated",
            description: "Product distribution chart has been updated with new data.",
          });
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to real-time updates');
        }
      });

    return () => {
      console.log('Cleaning up real-time subscription...');
      supabase.removeChannel(channel);
    };
  }, [toast, refetch]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    refetch();
  };

  if (isError && error instanceof Error) {
    const isAuthError = error.message.includes('Authentication') || error.message.includes('JWT');
    const isConnectionError = error.message.includes('timeout') || error.message.includes('Failed to fetch');
    
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          {isAuthError ? 'Authentication Error' : isConnectionError ? 'Connection Error' : 'Error'}
        </AlertTitle>
        <AlertDescription className="mt-2">
          {error.message || 'Failed to fetch analysis data. Please try again later.'}
          <div className="mt-4 flex items-center gap-2">
            <Button 
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </Button>
            {isAuthError && (
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                size="sm"
              >
                Refresh Page
              </Button>
            )}
          </div>
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