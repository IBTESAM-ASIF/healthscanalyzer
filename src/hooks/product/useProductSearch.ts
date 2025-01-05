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
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      } else {
        query = query.eq('category', activeCategory);
      }

      query = query.range(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE - 1
      );

      const { data, error, count } = await query;
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        if (searchQuery) {
          const allPlaceholders = [
            ...placeholderProducts.healthy,
            ...placeholderProducts.restricted,
            ...placeholderProducts.harmful
          ]
          .filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.ingredients.some(ing => 
              ing.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
          .map(product => ({
            ...product,
            created_at: new Date().toISOString(),
            category: product.category as ProductCategory
          }));

          const sortedPlaceholders = _.orderBy(allPlaceholders, ['created_at'], ['desc']);
          setProducts(getPaginatedData(sortedPlaceholders, currentPage));
          setTotalItems(allPlaceholders.length);
        } else {
          const categoryProducts = (placeholderProducts[activeCategory as keyof typeof placeholderProducts] || [])
            .map(product => ({
              ...product,
              created_at: new Date().toISOString(),
              category: product.category as ProductCategory
            }));
          const sortedCategoryProducts = _.orderBy(categoryProducts, ['created_at'], ['desc']);
          setProducts(getPaginatedData(sortedCategoryProducts, currentPage));
          setTotalItems(categoryProducts.length);
        }
      } else {
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