import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
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

      // Execute query
      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      console.log('Products fetched successfully:', {
        count,
        resultsCount: data?.length,
        page,
        category
      });

      setProducts(data || []);
      setTotalItems(count || 0);

    } catch (error: any) {
      console.error('Error fetching products:', error);

      // Retry logic for network errors
      if (retryCount < 3 && error.message === "Failed to fetch") {
        console.log(`Retrying fetch attempt ${retryCount + 1}/3...`);
        setTimeout(() => {
          fetchProducts(searchQuery, category, page, retryCount + 1);
        }, 1000 * (retryCount + 1)); // Exponential backoff
        return;
      }

      // Show user-friendly error message
      toast({
        title: "Error Loading Products",
        description: "We're having trouble connecting to our servers. Please check your internet connection and try again.",
        variant: "destructive",
      });

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