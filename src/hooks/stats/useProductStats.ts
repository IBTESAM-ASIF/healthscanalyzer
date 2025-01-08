import { supabase } from "@/integrations/supabase/client";
import { ProductStats } from "@/types/stats";

export const fetchProductCounts = async (): Promise<ProductStats> => {
  const [
    totalCountResult,
    healthyCountResult,
    harmfulCountResult,
    restrictedCountResult
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('category', 'healthy'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('category', 'harmful'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('category', 'restricted')
  ]);

  // Check for errors in count queries
  if (totalCountResult.error) throw totalCountResult.error;
  if (healthyCountResult.error) throw healthyCountResult.error;
  if (harmfulCountResult.error) throw harmfulCountResult.error;
  if (restrictedCountResult.error) throw restrictedCountResult.error;

  return {
    total: totalCountResult.count || 0,
    healthy: healthyCountResult.count || 0,
    harmful: harmfulCountResult.count || 0,
    restricted: restrictedCountResult.count || 0
  };
};

export const fetchDetailedProducts = async () => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return products;
};