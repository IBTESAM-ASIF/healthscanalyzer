import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { memo } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  stat: {
    title: string;
    value: string;
    icon: any;
    color: string;
    iconColor: string;
    description?: string;
  };
  isLoading?: boolean;
}

export const StatCard = memo(({ stat, isLoading }: StatCardProps) => {
  const Icon = stat.icon;

  if (isLoading) {
    return (
      <Card className="p-6 glass-card relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-2 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${stat.color} border-none glass-card relative overflow-hidden group hover:scale-[1.02] transition-transform duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${stat.color}`}>
          <Icon className={`h-6 w-6 ${stat.iconColor}`} />
        </div>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className={`text-2xl font-bold ${stat.iconColor}`}
        >
          {stat.value}
        </motion.div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </p>
        {stat.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {stat.description}
          </p>
        )}
        <div className="h-1 w-full bg-gray-800/20 mt-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${stat.iconColor?.replace('text', 'bg') || ''}/20`}
          />
        </div>
      </div>
    </Card>
  );
});

StatCard.displayName = 'StatCard';