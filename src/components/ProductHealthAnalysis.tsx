import React from 'react';
import { ProductHealthChart } from './product-health/ProductHealthChart';
import { CategoryDescriptions } from './product-health/CategoryDescriptions';
import { ErrorDisplay } from './product-health/ErrorDisplay';
import { useProductAnalysisData } from './product-health/useProductAnalysisData';
import { useRealtimeUpdates } from './product-health/useRealtimeUpdates';

const ProductHealthAnalysis = () => {
  const [retryCount, setRetryCount] = React.useState(0);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useProductAnalysisData(retryCount);

  useRealtimeUpdates(refetch);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    refetch();
  };

  if (isError && error instanceof Error) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
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