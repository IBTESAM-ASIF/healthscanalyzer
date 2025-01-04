import React from 'react';
import { Card } from '../ui/card';

interface ProductCardProps {
  product: {
    name: string;
    health_score: number;
    ingredients: string[];
    pros: string[];
    cons: string[];
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="glass-effect rounded-xl p-6 hover:bg-white/5 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          {product.name}
          <span className="text-yellow-400">✨</span>
        </h3>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
          Health Score: {product.health_score}
        </div>
      </div>

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
  );
};