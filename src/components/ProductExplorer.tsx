import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from './product/ProductCard';
import { ProductList } from './product/ProductList';
import { SearchBar } from './product/SearchBar';
import { CategoryTabs } from './product/CategoryTabs';
import { Pagination } from './product/Pagination';
import { motion } from 'framer-motion';
import { getTotalPages } from '@/utils/pagination';
import { useProductSearch } from '@/hooks/product/useProductSearch';
import { useToast } from './ui/use-toast';
import _ from 'lodash';

const ProductExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('healthy');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, totalItems, fetchProducts } = useProductSearch();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts(searchQuery, activeCategory, currentPage);

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        _.debounce(() => {
          fetchProducts(searchQuery, activeCategory, currentPage);
          toast({
            title: "Products Updated",
            description: "New product analysis data available.",
          });
        }, 1000)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeCategory, searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="product-explorer" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
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