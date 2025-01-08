import { useState } from 'react';
import { supabase, handleSupabaseError } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductCategory } from '@/types/product';

export const useProductSearch = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const { toast } = useToast();

  const fetchProducts = async (
    searchQuery: string,
    category: ProductCategory,
    page: number,
    retryCount = 0
  ) => {
    try {
      setLoading(true);
      console.log('Fetching products with params:', { searchQuery, category, page });

      // Calculate pagination
      const itemsPerPage = 6;
      const offset = (page - 1) * itemsPerPage;

      // Build query
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      // Apply category filter
      if (category) {
        query = query.eq('category', category);
      }

      // Apply search filter if present
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      // Add ordering and pagination
      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + itemsPerPage - 1);

      // Log the generated query for debugging
      console.log('Generated Supabase query:', query);

      // Execute query with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 15000); // Increased timeout to 15 seconds
      });

      const { data, error, count } = await Promise.race([
        query,
        timeoutPromise
      ]) as any;

      if (error) throw error;

      console.log('Products fetched successfully:', {
        count,
        resultsCount: data?.length,
        page,
        category
      });

      setProducts(data || []);
      setTotalItems(count || 0);

    } catch (error: any) {
      console.error('Error fetching products:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });

      // Retry logic for network errors with exponential backoff
      if (retryCount < 3 && (error.message === "Failed to fetch" || error.message === "Request timeout")) {
        console.log(`Retrying fetch attempt ${retryCount + 1}/3...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
        return fetchProducts(searchQuery, category, page, retryCount + 1);
      }

      const errorMessage = handleSupabaseError(error);
      toast({
        title: "Error Loading Products",
        description: errorMessage,
        variant: "destructive",
      });

      // Set empty state on error
      setProducts([]);
      setTotalItems(0);

    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    totalItems,
    fetchProducts,
  };
};