import React from 'react';

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, setActiveCategory }: CategoryTabsProps) => {
  return (
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
  );
};