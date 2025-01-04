import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mb-8"
    >
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products across all categories..."
          className="w-full bg-background/50 border-purple-500/20 pl-12 pr-20 py-6 rounded-xl backdrop-blur-sm
                   focus:border-purple-500/40 focus:ring-purple-500/20 transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="h-5 w-5 text-purple-400" />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-purple-500/10"
          >
            <SlidersHorizontal className="h-5 w-5 text-purple-400" />
          </Button>
          <Button
            variant="secondary"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4"
          >
            Search
          </Button>
        </div>
      </div>
    </motion.div>
  );
};