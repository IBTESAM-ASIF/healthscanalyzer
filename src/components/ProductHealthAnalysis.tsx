import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProductHealthAnalysis = () => {
  const { toast } = useToast();

  const fetchAnalysisData = async () => {
    try {
      // Calculate date range for the last 10 days
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 10);

      console.log('Fetching data with date range:', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });

      const { data: products, error } = await supabase
        .from('products')
        .select('category, created_at')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
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
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
        () => {
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

  if (isError) {
    console.error('Query error:', error);
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>
          Failed to fetch analysis data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading analysis data...</p>
    </div>
  );

  const LoadingCard = () => (
    <div className="glass-effect rounded-xl p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );

  return (
    <section id="product-analysis" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      <div className="relative container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
          Product Health Analysis
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading ? (
            <LoadingCard />
          ) : (
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">10-Day Product Distribution</h3>
              <div className="h-[300px] w-full">
                {data && data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.5)' }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.5)' }}
                      />
                      <Bar 
                        dataKey="healthy" 
                        stackId="a" 
                        fill="#4ade80" 
                        name="Healthy Products"
                      />
                      <Bar 
                        dataKey="restricted" 
                        stackId="a" 
                        fill="#fbbf24" 
                        name="Restricted Use"
                      />
                      <Bar 
                        dataKey="harmful" 
                        stackId="a" 
                        fill="#f87171" 
                        name="Harmful Products"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">No data available for the selected period</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Categories Description */}
          <div className="space-y-6">
            {/* Healthy Products */}
            <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">
                Healthy Products
              </h3>
              <p className="text-gray-300">
                Products that are safe and beneficial for daily consumption, with high nutritional value.
              </p>
            </div>

            {/* Restricted Use */}
            <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
              <h3 className="text-2xl font-semibold mb-2 text-amber-400">
                Restricted Use
              </h3>
              <p className="text-gray-300">
                Products that should be consumed in moderation or with certain precautions.
              </p>
            </div>

            {/* Harmful Products */}
            <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">
                Harmful Products
              </h3>
              <p className="text-gray-300">
                Products that may pose health risks and should be avoided or used with extreme caution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHealthAnalysis;