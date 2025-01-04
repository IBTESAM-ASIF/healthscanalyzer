import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from './product/ProductCard';
import { ProductList } from './product/ProductList';
import { SearchBar } from './product/SearchBar';
import { CategoryTabs } from './product/CategoryTabs';
import { Pagination } from './product/Pagination';
import { motion } from 'framer-motion';
import { ITEMS_PER_PAGE, getPaginatedData, getTotalPages } from '@/utils/pagination';
import { placeholderProducts } from './product/placeholderData';

const ProductExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('healthy');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchProducts();
    setCurrentPage(1); // Reset to first page when category or search changes

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
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      } else if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      // Add pagination to the query
      query = query.range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

      const { data, error, count } = await query;
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        if (searchQuery) {
          const allPlaceholders = [
            ...placeholderProducts.healthy,
            ...placeholderProducts.restricted,
            ...placeholderProducts.harmful
          ].filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
          );
          setProducts(getPaginatedData(allPlaceholders, currentPage));
          setTotalItems(allPlaceholders.length);
        } else {
          const categoryProducts = placeholderProducts[activeCategory] || [];
          setProducts(getPaginatedData(categoryProducts, currentPage));
          setTotalItems(categoryProducts.length);
        }
      } else {
        setProducts(data);
        setTotalItems(count || 0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative container mx-auto px-4"
      >
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            Product Analysis
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            Explore Our Products
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Discover products categorized by their health impact, backed by thorough analysis
          </motion.p>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <ProductList products={products} loading={loading} />
        <Pagination 
          currentPage={currentPage}
          totalPages={getTotalPages(totalItems)}
          onPageChange={handlePageChange}
        />
      </motion.div>
    </section>
  );
};

export default ProductExplorer;