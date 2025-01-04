import React, { useState, useEffect } from 'react';
import { Search, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from './product/ProductCard';
import { ProductList } from './product/ProductList';
import { SearchBar } from './product/SearchBar';
import { CategoryTabs } from './product/CategoryTabs';

const ProductExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('healthy');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium">
            Product Analysis
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-500">
            Explore Our Products
          </h2>
          <p className="text-gray-400 text-lg">
            Search and explore products categorized by their health impact
          </p>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <ProductList products={products} loading={loading} />
      </div>
    </section>
  );
};

export default ProductExplorer;