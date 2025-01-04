import React, { useState } from 'react';
import { Search, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const products = [
  {
    id: 1,
    name: 'GreenVital 176',
    healthScore: 91,
    analysisCost: 4.38,
    ingredients: ['Acids', 'Potassium', 'Minerals', 'Salt'],
    pros: [
      'Supports immune system',
      'Low in calories',
      'Heart-healthy',
      'No artificial additives'
    ],
    cons: [
      'Limited availability',
      'Limited flavor options',
      'May spoil quickly',
      'Higher price point'
    ]
  },
  {
    id: 2,
    name: 'FreshChoice 638',
    healthScore: 84,
    analysisCost: 2.97,
    ingredients: ['Thickeners', 'Water', 'Phosphorus', 'Zinc'],
    pros: [
      'Promotes digestive health',
      'Good source of fiber',
      'Contains antioxidants'
    ],
    cons: [
      'Limited flavor options',
      'Texture may vary'
    ]
  },
  {
    id: 3,
    name: 'Vital Boost 679',
    healthScore: 92,
    analysisCost: 2.70,
    ingredients: ['Iron', 'Niacin', 'Riboflavin', 'Sweeteners', 'Thickeners'],
    pros: [
      'Rich in vitamins',
      'High in nutrients',
      'Good source of fiber',
      'Low in calories'
    ],
    cons: [
      'Limited flavor options',
      'Texture may vary'
    ]
  }
];

const ProductExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('healthy');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        {/* Header */}
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

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a product..."
              className="w-full bg-background/50 border-purple-500/20 pl-4 pr-12 py-6 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-500/10"
              >
                <Settings2 className="h-5 w-5 text-purple-400" />
              </Button>
              <Button
                variant="secondary"
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 flex gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-center gap-4 p-1 rounded-lg bg-background/50">
            <button
              className={`px-6 py-2 rounded-md transition-all ${
                activeCategory === 'healthy'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
              onClick={() => setActiveCategory('healthy')}
            >
              Healthy Products
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-all ${
                activeCategory === 'restricted'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
              onClick={() => setActiveCategory('restricted')}
            >
              Restricted Use
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-all ${
                activeCategory === 'harmful'
                  ? 'bg-red-500/20 text-red-400'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
              onClick={() => setActiveCategory('harmful')}
            >
              Harmful Products
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="glass-effect rounded-xl p-6 hover:bg-white/5 transition-all"
            >
              {/* Product Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  {product.name}
                  <span className="text-yellow-400">✨</span>
                </h3>
              </div>

              {/* Health Score & Analysis Cost */}
              <div className="flex gap-4 mb-6">
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                  Health Score: {product.healthScore}
                </div>
                <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                  Analysis Cost: ${product.analysisCost}
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h4 className="text-gray-400 mb-2">Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pros */}
              <div className="mb-4">
                <h4 className="flex items-center gap-2 text-emerald-400 mb-2">
                  <span className="text-lg">👍</span> Pros:
                </h4>
                <ul className="space-y-1 text-gray-300">
                  {product.pros.map((pro, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="flex items-center gap-2 text-red-400 mb-2">
                  <span className="text-lg">👎</span> Cons:
                </h4>
                <ul className="space-y-1 text-gray-300">
                  {product.cons.map((con, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-red-400"></span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductExplorer;