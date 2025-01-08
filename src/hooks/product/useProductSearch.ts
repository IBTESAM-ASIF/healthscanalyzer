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
    currentPage: number,
    retries = 3
  ) => {
    try {
      setLoading(true);
      console.log('Fetching products with params:', { searchQuery, activeCategory, currentPage, retries });

      let countQuery = supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (searchQuery) {
        countQuery = countQuery.ilike('name', `%${searchQuery}%`);
      } else {
        countQuery = countQuery.eq('category', activeCategory);
      }

      const { count, error: countError } = await countQuery;
      
      if (countError) {
        console.error('Count query error:', countError);
        if (countError.message?.includes('JWT')) {
          throw new Error('Authentication expired. Please refresh the page.');
        }
        throw countError;
      }
      
      const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
      const validatedPage = Math.min(Math.max(1, currentPage), totalPages || 1);
      
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
        console.error('Data fetch error:', error);
        if (retries > 0) {
          console.log(`Retrying fetch... (${retries} attempts remaining)`);
          setTimeout(() => {
            fetchProducts(searchQuery, activeCategory, currentPage, retries - 1);
          }, 1000);
          return;
        }
        if (error.message?.includes('JWT')) {
          throw new Error('Authentication expired. Please refresh the page.');
        }
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
          const categoryProducts = (placeholderProducts[activeCategory] || [])
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
        const typedData = data as unknown as Product[];
        setProducts(typedData);
        setTotalItems(count || 0);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch products. Please try again later.",
        variant: "destructive",
      });
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    products,
    loading,
    totalItems,
    fetchProducts
  };
};