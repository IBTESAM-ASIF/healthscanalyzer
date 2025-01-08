import { LucideIcon } from 'lucide-react';

export interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  description: string;
}

export type StatType = Stat;

export interface StatsGridProps {
  stats: Stat[];
}