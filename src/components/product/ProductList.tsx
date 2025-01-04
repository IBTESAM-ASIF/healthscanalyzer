import React from 'react';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: any[];
  loading: boolean;
}

export const ProductList = ({ products, loading }: ProductListProps) => {
  if (loading) {
    return (
      <div className="text-center text-gray-400">
        Loading products...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};