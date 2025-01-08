import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Product, ProductCategory } from '@/types/product';
import { placeholderProducts } from '@/components/product/placeholderData';
import _ from 'lodash';
import { ITEMS_PER_PAGE, getPaginatedData } from '@/utils/pagination';

export const useProductSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const { toast } = useToast();

  const fetchProducts = useCallback(async (
    searchQuery: string,
    activeCategory: ProductCategory,
    currentPage: number
  ) => {
    try {
      setLoading(true);
      
      // First, get the total count for all categories
      const { count: totalCount, error: totalCountError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (totalCountError) throw totalCountError;

      // Get count for current category or search
      let countQuery = supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (searchQuery) {
        countQuery = countQuery.ilike('name', `%${searchQuery}%`);
      } else {
        countQuery = countQuery.eq('category', activeCategory);
      }

      const { count, error: countError } = await countQuery;
      
      if (countError) throw countError;
      
      console.log(`Total products across all categories: ${totalCount}`);
      console.log(`Products in current view: ${count}`);
      
      const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
      const validatedPage = Math.min(Math.max(1, currentPage), totalPages || 1);
      
      // Now fetch the actual data with validated page number
      let query = supabase
        .from('products')
        .select('*');

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      } else {
        query = query.eq('category', activeCategory);
      }

      const from = (validatedPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.log('No data found, using placeholders');
        if (searchQuery) {
          const allPlaceholders = [
            ...placeholderProducts.healthy,
            ...placeholderProducts.restricted,
            ...placeholderProducts.harmful
          ]
          .filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.ingredients && product.ingredients.some(ing => 
              ing.toLowerCase().includes(searchQuery.toLowerCase())
            ))
          )
          .map(product => ({
            ...product,
            created_at: new Date().toISOString(),
            category: product.category as ProductCategory
          }));

          const sortedPlaceholders = _.orderBy(allPlaceholders, ['created_at'], ['desc']);
          setProducts(getPaginatedData(sortedPlaceholders, validatedPage));
          setTotalItems(allPlaceholders.length);
        } else {
          const categoryProducts = (placeholderProducts[activeCategory as keyof typeof placeholderProducts] || [])
            .map(product => ({
              ...product,
              created_at: new Date().toISOString(),
              category: product.category as ProductCategory
            }));
          const sortedCategoryProducts = _.orderBy(categoryProducts, ['created_at'], ['desc']);
          setProducts(getPaginatedData(sortedCategoryProducts, validatedPage));
          setTotalItems(categoryProducts.length);
        }
      } else {
        console.log('Data fetched successfully:', data.length, 'items');
        setProducts(data);
        setTotalItems(count || 0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again later.",
        variant: "destructive",
      });
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    totalItems,
    fetchProducts
  };
};