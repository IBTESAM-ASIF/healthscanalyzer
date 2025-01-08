import { LucideIcon } from "lucide-react";

export interface StatType {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
}

export interface ProductStats {
  total: number;
  healthy: number;
  harmful: number;
  restricted: number;
}