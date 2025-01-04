import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from './product/ProductCard';
import { ProductList } from './product/ProductList';
import { SearchBar } from './product/SearchBar';
import { CategoryTabs } from './product/CategoryTabs';
import { motion } from 'framer-motion';

// Sample placeholder data
const placeholderProducts = {
  healthy: [
    {
      id: 'h1',
      name: 'Organic Green Tea',
      health_score: 95,
      ingredients: ['Green Tea Leaves', 'Natural Antioxidants'],
      pros: ['Rich in antioxidants', 'Boosts metabolism', 'Natural energy'],
      cons: ['Contains caffeine'],
      category: 'healthy',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'A highly beneficial beverage with numerous health benefits.'
    },
    {
      id: 'h2',
      name: 'Quinoa Bowl',
      health_score: 90,
      ingredients: ['Quinoa', 'Vegetables', 'Olive Oil'],
      pros: ['High protein', 'Rich in fiber', 'Complete protein'],
      cons: ['May contain traces of saponin'],
      category: 'healthy',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Nutrient-dense superfood great for daily consumption.'
    }
  ],
  restricted: [
    {
      id: 'r1',
      name: 'Dark Chocolate Bar',
      health_score: 65,
      ingredients: ['Cocoa Mass', 'Sugar', 'Cocoa Butter'],
      pros: ['Contains antioxidants', 'May improve mood'],
      cons: ['High in calories', 'Contains sugar'],
      category: 'restricted',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Moderate consumption recommended due to sugar content.'
    },
    {
      id: 'r2',
      name: 'Greek Yogurt',
      health_score: 70,
      ingredients: ['Milk', 'Live Cultures'],
      pros: ['High protein', 'Probiotics'],
      cons: ['Contains lactose', 'High in saturated fat'],
      category: 'restricted',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Good in moderation, especially for those without lactose intolerance.'
    }
  ],
  harmful: [
    {
      id: 'ha1',
      name: 'Processed Energy Drink',
      health_score: 20,
      ingredients: ['Caffeine', 'Sugar', 'Artificial Colors'],
      pros: ['Quick energy boost'],
      cons: ['High sugar content', 'Artificial additives', 'May cause jitters'],
      category: 'harmful',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'High in artificial ingredients and sugar, not recommended for regular consumption.'
    },
    {
      id: 'ha2',
      name: 'Ultra-Processed Snack',
      health_score: 15,
      ingredients: ['Refined Flour', 'Artificial Flavors', 'Preservatives'],
      pros: ['Convenient'],
      cons: ['No nutritional value', 'Contains harmful additives', 'High in sodium'],
      category: 'harmful',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Contains multiple harmful ingredients, best avoided.'
    }
  ]
};

const ProductExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('healthy');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();

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
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      } else if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // If no data from database, use placeholder data
      if (!data || data.length === 0) {
        if (searchQuery) {
          // When searching, combine all placeholder products and filter by search query
          const allPlaceholders = [
            ...placeholderProducts.healthy,
            ...placeholderProducts.restricted,
            ...placeholderProducts.harmful
          ].filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
          );
          setProducts(allPlaceholders);
        } else {
          // When no search query, show placeholders for active category
          setProducts(placeholderProducts[activeCategory] || []);
        }
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
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
      </motion.div>
    </section>
  );
};

export default ProductExplorer;