import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatCardProps {
  stat: {
    title: string;
    value: string;
    icon: any;
    color: string;
    iconColor: string;
  };
}

export const StatCard = ({ stat }: StatCardProps) => {
  const Icon = stat.icon;

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
        <div className="h-1 w-full bg-gray-800/20 mt-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${stat.iconColor.replace('text', 'bg')}/20`}
          />
        </div>
      </div>
    </Card>
  );
};