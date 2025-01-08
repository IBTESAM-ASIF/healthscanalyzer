import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from 'lucide-react';

interface ChartData {
  date: string;
  healthy: number;
  restricted: number;
  harmful: number;
}

interface ProductHealthChartProps {
  data: ChartData[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const ProductHealthChart = ({ data, isLoading, isError }: ProductHealthChartProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading analysis data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-red-400">Error loading chart data. Please try again later.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-400">No data available for the selected period</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)' }}
          />
          <Bar 
            dataKey="healthy" 
            stackId="a" 
            fill="#4ade80" 
            name="Healthy Products"
          />
          <Bar 
            dataKey="restricted" 
            stackId="a" 
            fill="#fbbf24" 
            name="Restricted Use"
          />
          <Bar 
            dataKey="harmful" 
            stackId="a" 
            fill="#f87171" 
            name="Harmful Products"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};