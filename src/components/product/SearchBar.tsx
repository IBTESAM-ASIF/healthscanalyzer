import React from 'react';
import { Search, Settings2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
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
  );
};